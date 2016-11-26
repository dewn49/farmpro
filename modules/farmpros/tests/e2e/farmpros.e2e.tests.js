'use strict';

describe('Farmpros E2E Tests:', function () {
  describe('Test Farmpros page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/farmpros');
      expect(element.all(by.repeater('farmpro in farmpros')).count()).toEqual(0);
    });
  });
});
