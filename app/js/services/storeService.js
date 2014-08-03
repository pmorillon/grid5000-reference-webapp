(function(){
  'use strict';

  angular.module('grid5000Reference').service('storeService', function($http){
    var store = this;
    store.sites = {};
    store.nodes = crossfilter([]);

    var nodesBySites = store.nodes.dimension(function(d){
      return d.site.uid;
    });

    var nodesByClusters = store.nodes.dimension(function(d){
      return d.cluster;
    });

    store.nodesGroupBySites = nodesBySites.group();
    store.nodesGroupByClusters = nodesByClusters.group();

    // HTTP request sites
    $http.get('/g5kapi/sites.json').success(function(s_datas){
      // Iterate on each sites
      $.each(s_datas.items, function(s_index, s_value){
        store.sites[s_value.uid] = s_value;

        // HTTP request clusters per sites
        $http.get('/g5kapi/sites/' + s_value.uid + '/clusters.json').success(function(c_datas){

          // Iterate on each clusters
          $.each(c_datas.items, function(c_index, c_value){

            // HTTP request nodes per clusters
            $http.get('/g5kapi/sites/' + s_value.uid + '/clusters/' + c_value.uid + '/nodes.json').success(function(n_datas){

              // Add some datas to nodes items
              n_datas.items.forEach(function(d,i){
                d.site = s_value;
                d.cluster = c_value.uid;

                // Manage network adapters
                var net_temp = d.network_adapters;
                d.network_adapters = {};
                net_temp.forEach(function(n,y){
                  d.network_adapters[n.device] = n;
                  if (n.mounted && n.interface == 'Ethernet') {
                    d.prod_net_interface = n.device;
                  };
                });
              });
              store.nodes.add(n_datas.items);
            });

          });
        });

      });
    });
  });

})();

