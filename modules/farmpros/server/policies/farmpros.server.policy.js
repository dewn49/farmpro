'use strict';

/**
 * Module dependencies
 */
var acl = require('acl');

// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
 * Invoke Farmpros Permissions
 */
exports.invokeRolesPolicies = function () {
  acl.allow([{
    roles: ['admin'],
    allows: [{
      resources: '/api/farmpros',
      permissions: '*'
    }, {
      resources: '/api/farmpros/:farmproId',
      permissions: '*'
    }]
  }, 
  {
    roles: ['user'],
    allows: [{
      resources: '/api/farmpros',
      permissions: ['get', 'post']
    }, {
      resources: '/api/farmpros/:farmproId',
      permissions: ['get']
    }]
  },
  {
    roles: ['user', 'admin'],
    allows: [{
      resources: '/api/farminfo',
      permissions: ['get', 'put']
    }, {
      resources: '/info',
      permissions: ['get']
    }]
  }, 
  {
    roles: ['guest'],
    allows: [{
      resources: '/api/farmpros',
      permissions: ['get']
    }, {
      resources: '/api/farmpros/:farmproId',
      permissions: ['get']
    }]
  },
  
  
  {
    roles: ['admin'],
    allows: [{
      resources: '/api/crops',
      permissions: '*'
    }, 
    {
      resources: '/api/crops/:cropId',
      permissions: '*'
    },
    {
      resources: '/api/harvests/list/:cropId',
      permissions: '*'
    },
    {
      resources: '/api/harvests',
      permissions: '*'
    }, 
    {
      resources: '/api/harvests/:harvestId',
      permissions: '*'
    }]
  }, 
  
  {
    roles: ['user'],
    allows: [{
      resources: '/api/crops',
      permissions: ['get', 'post']
    },
    {
      resources: '/api/crops/:cropId',
      permissions: '*'
    },     
    {
      resources: '/api/products/:cropId',
      permissions: ['get']
    },
    {
      resources: '/api/harvests/list/:cropId',
      permissions: 'get'
    },     
    {
      resources: '/api/harvests',
      permissions: ['get', 'post']
    },     
    {
      resources: '/api/harvests/:harvestId',
      permissions: ['*']
    }]
  } 
  
  // ,{
  //   roles: ['guest'],
  //   allows: [{
  //     resources: '/api/crops',
  //     permissions: ['get']
  //   }, {
  //     resources: '/api/crops/:cropId',
  //     permissions: ['get']
  //   }]
  // }
  
  ]);
};

/**
 * Check If Farmpros Policy Allows
 */
exports.isAllowed = function (req, res, next) {
  var roles = (req.user) ? req.user.roles : ['guest'];

  // If an Farmpro is being processed and the current user created it then allow any manipulation
  if (req.farmpro && req.user && req.farmpro.user && req.farmpro.user.id === req.user.id) {
    return next();
  }

  // Check for user roles
  acl.areAnyRolesAllowed(roles, req.route.path, req.method.toLowerCase(), function (err, isAllowed) {
    if (err) {
      // An authorization error occurred
      return res.status(500).send('Unexpected authorization error');
    } else {
      if (isAllowed) {
        // Access granted! Invoke next middleware
        return next();
      } else {
        return res.status(403).json({
          message: 'User is not authorized'
        });
      }
    }
  });
};
