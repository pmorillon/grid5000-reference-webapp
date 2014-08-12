(function(){
  'use strict';

  angular.module('grid5000Reference').controller('mapViewController', function($scope, storeService){

    $scope.watched_markers = function(){
      var marks = {};
      storeService.nodesGroupBySites.all().forEach(function(d,i){
        if (d.value != 0) {
          marks[d.key] = {
            'lat': storeService.sites[d.key].latitude,
            'lng': storeService.sites[d.key].longitude,
            'message': storeService.sites[d.key].name
          }
        };
      });
      return marks;
    };

    $scope.$watch('watched_markers()', function(newVal, oldVal){
      $scope.markers = $scope.watched_markers();
    }, true);

    angular.extend($scope, {
      centre: {
        lat: 47.284142,
        lng: 2.519552,
        zoom: 5
      },
      markers: {},
      defaults: {
        //tileLayer: "http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png",
        tileLayer: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
        //tileLayer: "http://c.tile.stamen.com/watercolor/{z}/{x}/{y}.jpg",
        //tileLayer: "http://toolserver.org/tiles/hikebike/{z}/{x}/{y}.png",
        tileLayerOptions: {
          opacity: 0.9,
          detectRetina: true,
          reuseTiles: true,
        },
        scrollWheelZoom: false
      }
    });
  });

})();

