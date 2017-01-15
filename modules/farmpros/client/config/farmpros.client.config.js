(function () {
  'use strict';

/* sonlt disable
// Configuring the Chat module
angular.module('chat').run(['Menus',
  function (Menus) {
    // Set top bar menu items
    Menus.addMenuItem('topbar', {
      title: 'Chat',
      state: 'chat'
    });
  }
]);
*/

  angular
    .module('farmpros')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(Menus) {
    // Set top bar menu items
    Menus.addMenuItem('topbar', {
      title: 'My Farm',
      state: 'farmpros',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'farmpros', {
      title: 'Setting',
      state: 'farmpros.setting',
      roles: ['user', 'admin']
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'farmpros', {
      title: 'List Crop',
      state: 'crops.list',
      roles: ['user', 'admin']
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'farmpros', {
      title: 'Create Crop',
      state: 'crops.create',
      roles: ['user', 'admin']
    });
    
    // Add the dropdown list item
    // Menus.addSubMenuItem('topbar', 'farmpros', {
    //   title: 'List Harvest',
    //   state: 'harvests.list',
    //   roles: ['user', 'admin']
    // });
    
    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'farmpros', {
      title: 'Create Harvest',
      state: 'harvests.create',
      roles: ['user', 'admin']
    });    
  }
}());
