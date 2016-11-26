(function () {
  'use strict';

  angular
    .module('farmpros')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'Farmpros',
      state: 'farmpros',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'farmpros', {
      title: 'List Farmpros',
      state: 'farmpros.list'
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'farmpros', {
      title: 'Create Farmpro',
      state: 'farmpros.create',
      roles: ['user']
    });
  }
}());
