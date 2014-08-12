(function(){
  'use strict';

  angular.module('grid5000Reference').controller('sitesViewController', function(storeService, utils){
    var sitesViewCtrl = this;

    sitesViewCtrl.utils = utils;

    sitesViewCtrl.sites = function(){
      return storeService.nodesGroupBySites.top(Infinity);
    };

  });

})();
