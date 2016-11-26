'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Farmpro = mongoose.model('Farmpro'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  farmpro;

/**
 * Farmpro routes tests
 */
describe('Farmpro CRUD tests', function () {

  before(function (done) {
    // Get application
    app = express.init(mongoose);
    agent = request.agent(app);

    done();
  });

  beforeEach(function (done) {
    // Create user credentials
    credentials = {
      username: 'username',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create a new user
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: credentials.username,
      password: credentials.password,
      provider: 'local'
    });

    // Save a user to the test db and create new Farmpro
    user.save(function () {
      farmpro = {
        name: 'Farmpro name'
      };

      done();
    });
  });

  it('should be able to save a Farmpro if logged in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Farmpro
        agent.post('/api/farmpros')
          .send(farmpro)
          .expect(200)
          .end(function (farmproSaveErr, farmproSaveRes) {
            // Handle Farmpro save error
            if (farmproSaveErr) {
              return done(farmproSaveErr);
            }

            // Get a list of Farmpros
            agent.get('/api/farmpros')
              .end(function (farmprosGetErr, farmprosGetRes) {
                // Handle Farmpros save error
                if (farmprosGetErr) {
                  return done(farmprosGetErr);
                }

                // Get Farmpros list
                var farmpros = farmprosGetRes.body;

                // Set assertions
                (farmpros[0].user._id).should.equal(userId);
                (farmpros[0].name).should.match('Farmpro name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Farmpro if not logged in', function (done) {
    agent.post('/api/farmpros')
      .send(farmpro)
      .expect(403)
      .end(function (farmproSaveErr, farmproSaveRes) {
        // Call the assertion callback
        done(farmproSaveErr);
      });
  });

  it('should not be able to save an Farmpro if no name is provided', function (done) {
    // Invalidate name field
    farmpro.name = '';

    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Farmpro
        agent.post('/api/farmpros')
          .send(farmpro)
          .expect(400)
          .end(function (farmproSaveErr, farmproSaveRes) {
            // Set message assertion
            (farmproSaveRes.body.message).should.match('Please fill Farmpro name');

            // Handle Farmpro save error
            done(farmproSaveErr);
          });
      });
  });

  it('should be able to update an Farmpro if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Farmpro
        agent.post('/api/farmpros')
          .send(farmpro)
          .expect(200)
          .end(function (farmproSaveErr, farmproSaveRes) {
            // Handle Farmpro save error
            if (farmproSaveErr) {
              return done(farmproSaveErr);
            }

            // Update Farmpro name
            farmpro.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Farmpro
            agent.put('/api/farmpros/' + farmproSaveRes.body._id)
              .send(farmpro)
              .expect(200)
              .end(function (farmproUpdateErr, farmproUpdateRes) {
                // Handle Farmpro update error
                if (farmproUpdateErr) {
                  return done(farmproUpdateErr);
                }

                // Set assertions
                (farmproUpdateRes.body._id).should.equal(farmproSaveRes.body._id);
                (farmproUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Farmpros if not signed in', function (done) {
    // Create new Farmpro model instance
    var farmproObj = new Farmpro(farmpro);

    // Save the farmpro
    farmproObj.save(function () {
      // Request Farmpros
      request(app).get('/api/farmpros')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Farmpro if not signed in', function (done) {
    // Create new Farmpro model instance
    var farmproObj = new Farmpro(farmpro);

    // Save the Farmpro
    farmproObj.save(function () {
      request(app).get('/api/farmpros/' + farmproObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', farmpro.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Farmpro with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/farmpros/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Farmpro is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Farmpro which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Farmpro
    request(app).get('/api/farmpros/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Farmpro with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Farmpro if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Farmpro
        agent.post('/api/farmpros')
          .send(farmpro)
          .expect(200)
          .end(function (farmproSaveErr, farmproSaveRes) {
            // Handle Farmpro save error
            if (farmproSaveErr) {
              return done(farmproSaveErr);
            }

            // Delete an existing Farmpro
            agent.delete('/api/farmpros/' + farmproSaveRes.body._id)
              .send(farmpro)
              .expect(200)
              .end(function (farmproDeleteErr, farmproDeleteRes) {
                // Handle farmpro error error
                if (farmproDeleteErr) {
                  return done(farmproDeleteErr);
                }

                // Set assertions
                (farmproDeleteRes.body._id).should.equal(farmproSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Farmpro if not signed in', function (done) {
    // Set Farmpro user
    farmpro.user = user;

    // Create new Farmpro model instance
    var farmproObj = new Farmpro(farmpro);

    // Save the Farmpro
    farmproObj.save(function () {
      // Try deleting Farmpro
      request(app).delete('/api/farmpros/' + farmproObj._id)
        .expect(403)
        .end(function (farmproDeleteErr, farmproDeleteRes) {
          // Set message assertion
          (farmproDeleteRes.body.message).should.match('User is not authorized');

          // Handle Farmpro error error
          done(farmproDeleteErr);
        });

    });
  });

  it('should be able to get a single Farmpro that has an orphaned user reference', function (done) {
    // Create orphan user creds
    var _creds = {
      username: 'orphan',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create orphan user
    var _orphan = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'orphan@test.com',
      username: _creds.username,
      password: _creds.password,
      provider: 'local'
    });

    _orphan.save(function (err, orphan) {
      // Handle save error
      if (err) {
        return done(err);
      }

      agent.post('/api/auth/signin')
        .send(_creds)
        .expect(200)
        .end(function (signinErr, signinRes) {
          // Handle signin error
          if (signinErr) {
            return done(signinErr);
          }

          // Get the userId
          var orphanId = orphan._id;

          // Save a new Farmpro
          agent.post('/api/farmpros')
            .send(farmpro)
            .expect(200)
            .end(function (farmproSaveErr, farmproSaveRes) {
              // Handle Farmpro save error
              if (farmproSaveErr) {
                return done(farmproSaveErr);
              }

              // Set assertions on new Farmpro
              (farmproSaveRes.body.name).should.equal(farmpro.name);
              should.exist(farmproSaveRes.body.user);
              should.equal(farmproSaveRes.body.user._id, orphanId);

              // force the Farmpro to have an orphaned user reference
              orphan.remove(function () {
                // now signin with valid user
                agent.post('/api/auth/signin')
                  .send(credentials)
                  .expect(200)
                  .end(function (err, res) {
                    // Handle signin error
                    if (err) {
                      return done(err);
                    }

                    // Get the Farmpro
                    agent.get('/api/farmpros/' + farmproSaveRes.body._id)
                      .expect(200)
                      .end(function (farmproInfoErr, farmproInfoRes) {
                        // Handle Farmpro error
                        if (farmproInfoErr) {
                          return done(farmproInfoErr);
                        }

                        // Set assertions
                        (farmproInfoRes.body._id).should.equal(farmproSaveRes.body._id);
                        (farmproInfoRes.body.name).should.equal(farmpro.name);
                        should.equal(farmproInfoRes.body.user, undefined);

                        // Call the assertion callback
                        done();
                      });
                  });
              });
            });
        });
    });
  });

  afterEach(function (done) {
    User.remove().exec(function () {
      Farmpro.remove().exec(done);
    });
  });
});
