(function () {
  'use strict';

  angular
    .module('products')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(Menus) {
  /*sonlt::not use product dropdown, use admin  
    // Set top bar menu items
    Menus.addMenuItem('topbar', {
      title: 'Products',
      state: 'products',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'products', {
      title: 'Create Product',
      state: 'products.create',
      roles: ['user']
    });
 */   
    // Add the product item of admin
    Menus.addSubMenuItem('topbar', 'admin', {
      title: '  Sản phẩm',
      state: 'products.list',
      roles: ['admin']
    });    
  }
})();
