<template>
    <div class="amap-page-container">
      <el-amap vid="amapDemo"  :center="center" :map-manager="amapManager" :zoom="zoom" :events="events" class="amap-demo">
      </el-amap>
    </div>
  </template>

  <style>
    .amap-demo {
      height: 300px;
    }
  </style>
  <script>
    // NPM 方式
    import { AMapManager } from 'vue-amap';
    // CDN 方式
    // let amapManager = new VueAMap.AMapManager();
    // let amapManager 
    export default {
      data() {
        return {
          zoom: 12,
          center: [121.59996, 31.197646],
          amapManager,
          events: {
            init(map) {
              AMapUI.loadUI(['overlay/SimpleMarker'], function(SimpleMarker) {
                const marker = new SimpleMarker({
                  iconLabel: 'A',
                  iconStyle: 'red',
                  map: map,
                  position: map.getCenter()
                });
              });
            }
          }
        };
      }
    };
</script>