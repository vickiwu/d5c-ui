<template>
  <div v-loading="loading" class="map-container">
    <div :id="mid" class="map" />
    <div v-if="drivingData && drivingData.hanPanel" id="panel" />
    <!-- <input v-if="hasSearchTip" id="tipinput" type="text" class="inputSearch"> -->
  </div>
</template>

<script>
export default {
  name: 'BgMap',
  components: { },
  filters: {},
  props: {
    searchStr: {
      type: String,
      default: () => {
        return '';
      }
    },
    hasSearchTip: {
      type: Boolean,
      default: () => {
        return false;
      }
    },
    clickMapAddMark: {
      type: [Object, Boolean],
      default: () => {
        // {
        //   icon: "点的图标", // 图标 require('examples/assets/mapImg/car-1.png')
        // }
        return false;
      }
    },
    markPointIcon: {
      type: Boolean,
      default() {
        return false;
      }
    },
    showTrackReplay: {
      type: Boolean,
      default() {
        return false;
      }
    },
    mid: {
      type: String,
      default: 'map'
    },
    track: {
      // 行车轨迹
      type: Array,
      default: () => {
        return undefined;
      }
    },
    dragData: {
      type: Object,
      default: () => {
        // {
        //   policy: AMap.DrivingPolicy.LEAST_TIME, // 策略
        //   showTraffic: false, // 是否展示路况
        //   waypoints: undefined, // [[116.379028, 39.885042]], // 途径点
        //   start: undefined, // [116.379028, 39.865042], // 起点
        //   end: undefined, // [116.427281, 39.903719], // 终点
        //   needChangeColor: false, // 是否需要改变颜色
        //   lineColor: undefined // '#ea283d' 导航线路自定义颜色
        // }
        return undefined;
      }
    },
    drivingData: {
      // 线路规划
      type: Object,
      default: () => {
        // {
        //   policy: AMap.DrivingPolicy.LEAST_TIME, // 策略
        //   showTraffic: false, // 是否展示路况
        //   waypoints: undefined, // [[116.379028, 39.885042]], // 途径点
        //   start: undefined, // [116.379028, 39.865042], // 起点
        //   end: undefined, // [116.427281, 39.903719], // 终点
        //   needChangeColor: false, // 是否需要改变颜色
        //   lineColor: undefined // '#ea283d' 导航线路自定义颜色
        // }
        return undefined;
      }
    },
    showPaths: {
      // 轨迹回放
      type: Array,
      default: () => {
        return undefined;
      }
    },
    markData: {
      type: Array,
      // [
      //   { LngLat: [116.35, 39.89], icon: require('examples/assets/mapImg/car-1.png') ,title:"mark标题尽量保存唯一"},cbData:{msg:返回给click的数据}
      //   { LngLat: [116.38, 39.92] },
      // ]
      default: () => undefined
    },
    replaySpeed: {
      type: Number,
      default: () => {
        return 100;
      }
    }
  },
  data() {
    return {
      zoom: 18,
      map: null,
      loading: true,
      drivingLineObj: null, // 线路导航对象
      dragRouteObj: null, //
      pathsLineObj: null, // 行车轨迹对象
      showLinePathsObj: null, // 轨迹回放对象
      markerListObj: null, // 所有点集合
      geocoder: null,
      currentAddressMark: null,
      autocomplete: null,
      placeSearch: null
    };
  },
  computed: {},
  watch: {
    searchStr: {
      handler(newVal, oldVal) {
        this.autocomplete && this.autocomplete.search(newVal, (type, result) => {
          if (type === 'complete') {
            this.$emit('mapSearchKey', result.tips);
          }
        });
      },
      deep: true
    },
    dragData: { // 线路拖拽
      handler(newVal, oldVal) {
        if (newVal) {
          this.dragRouteObj && this.dragRouteObj.destroy();
          this.dragRouteObj = null;
          Object.keys(newVal).length &&
          (this.dragRouteObj = this.drawDragRoute(newVal));
        }
      },
      deep: true
    },
    drivingData: { // 线路规划
      handler(newVal, oldVal) {
        this.drivingLineObj && this.drivingLineObj.clear();
        this.drivingLineObj = null;
        // 判断起点终点是否存在
        if (newVal && Object.keys(newVal).includes('start') && Object.keys(newVal).includes('end')) {
          if (newVal.start.length > 0 && newVal.end.length > 0) {
            this.drivingLineObj = this.drawDrivingLine(newVal);
          }
        }
      },
      deep: true
    },
    track: {
      handler(newVal, oldVal) {
        // 当前轨迹改变
        if (newVal && newVal.length !== 0 && this.pathsLineObj) {
          this.pathsLineObj.setPath(newVal);
        }
      },
      deep: true
    },
    showPaths: {
      handler(newVal, oldVal) {
        // 回放轨迹改变
        this.showLinePathsObj && this.map.remove(this.showLinePathsObj);
        this.showLinePathsObj = null;
        newVal && (this.showLinePathsObj = this.showDrivingLine(newVal, this.replaySpeed));
      },
      deep: true
    },
    markData: {
      handler(newVal, oldVal) {
        console.log('%c 🥥 newVal, oldVal: ', 'font-size:20px;background-color: #E41A6A;color:#fff;', newVal, oldVal);
        // alert(1)
        // watch 数组监听不了不改变原数组的方法 如push
        // 监听到mark变化 清空点，重新画点
        if (this.markerListObj && this.markerListObj.length !== 0) {
          this.map.remove(this.markerListObj);
        }
        this.markerListObj = null;
        newVal && (newVal.length !== 0) && (this.markerListObj = this.drawMark(newVal));
      },
      deep: true
    }
  },

  created() {},
  beforeDestroy() {
    this.map.destroy();
  },
  destroyed() {

  },
  mounted() {
    this.initMap();
  },
  methods: {
    parseRouteToPath(route) {
      var path = [];
      for (var i = 0, l = route.steps.length; i < l; i++) {
        var step = route.steps[i];
        for (var j = 0, n = step.path.length; j < n; j++) {
          path.push(step.path[j]);
        }
      }
      return path;
    },
    // 初始化地图
    initMap() {
      this.map = new AMap.Map(`${this.mid}`, {
        zoom: 11,
        zooms: [4, 18]
        // mapStyle: 'amap://styles/309d309cff10cae4836a6c8252014039'
      });
      // 加载地理编码服务
      AMap.plugin('AMap.Geocoder', () => {
        this.geocoder = new AMap.Geocoder();
      });

      AMap.plugin(['AMap.Autocomplete', 'AMap.PlaceSearch'], () => {
        // var autoOptions = {
        // // city: "北京", //城市，默认全国
        //   input: 'tipinput'// 使用联想输入的input的id
        // }
        this.autocomplete = new AMap.Autocomplete();

        this.placeSearch = new AMap.PlaceSearch({
          // city: '北京',
          map: this.map,
          pageSize: 1
        });
      });
      this.map.on('complete', () => {
        this.loading = false;
        this.pluginInit();
        // 加载完成绑定click事件
        this.map.on('click', (e) => {
          // 地图的点击事件
          if (this.clickMapAddMark) this.handleMapClick(e.lnglat);
        });

        this.map.setFitView();
      });
    },
    pluginInit() {
      // // 线路规划
      // if (this.drivingData && Object.keys(this.drivingData).includes('start') && Object.keys(this.drivingData).includes('end')) {
      //   if (this.drivingData.start.length > 0 && this.drivingData.end.length > 0) {
      //     this.drivingLineObj = this.drawDrivingLine(this.drivingData)
      //   }
      // }

      // 行车轨迹
      this.track && (this.pathsLineObj = this.drawLine(this.track));
      // 轨迹回放
      // this.showPaths &&
      //   this.showPaths.length > 0 &&
      //   (this.showLinePathsObj = this.showDrivingLine(this.showPaths,this.replaySpeed))
      // 多点绘制
      if (this.markData && (this.markData.length !== 0)) {
        // 清除点
        if (this.markerListObj && this.markerListObj.length !== 0) {
          this.map.remove(this.markerListObj);
        }
        this.markerListObj = null;
        this.markerListObj = this.drawMark(this.markData);
      }
    },
    selectAddress(poi) {
      this.placeSearch.setCity(poi.adcode);
      this.placeSearch.search(poi.name, (status, result) => {
        // 画点 并回调给web端 result.poiList.pois[0].location
        const lngLat = result.poiList.pois[0].location;
        this.handleMapClick(lngLat);
      });
    },
    parsePolicy(Policy) {
      let myPolicy;

      switch (Policy) {
        case 'distance' :
          myPolicy = AMap.DrivingPolicy.LEAST_DISTANCE;
          break;
        case 'fee':
          myPolicy = AMap.DrivingPolicy.LEAST_FEE;
          break;
        case 'time':
          myPolicy = AMap.DrivingPolicy.LEAST_TIME;
          break;
        default:
          myPolicy = AMap.DrivingPolicy.LEAST_TIME;
      }

      return myPolicy;
    },
    handleMapClick(lnglat) {
      const single = (this.clickMapAddMark.isSingle === false) ? this.clickMapAddMark.isSingle : true;
      this.geocoder.getAddress(lnglat, (status, result) => {
        if (status === 'complete' && result.regeocode) {
          const address = result.regeocode.formattedAddress;
          const { province, city, district } = result.regeocode.addressComponent;
          let addressStr;
          if (city) {
            addressStr = `${province}-${city}-${district}`;
          } else {
            addressStr = `${province}-${district}`;
          }
          const lngLatStr = `${lnglat.lng},${lnglat.lat}`;
          if (single) {
            // 判断是否有点
            if (this.currentAddressMark) {
            // 清除点
              this.map.remove(this.currentAddressMark);
              this.currentAddressMark = null;
            }
          }

          this.currentAddressMark = this.drawMark([{ LngLat: [`${lnglat.lng}`, `${lnglat.lat}`], icon: this.clickMapAddMark.icon, cbData: {
            lnglat: `${lnglat.lng},${lnglat.lat}`
          }}]);
          if (!single) {
            if (this.markerListObj !== null) {
              this.markerListObj.push(...this.currentAddressMark);
            } else {
              this.markerListObj = this.currentAddressMark;
            }
          }

          this.map.setFitView();
          // this.map.setZoom(12)
          this.$emit('mapClickGetAddress', {
            address, province, city, district, addressStr, lngLatStr, markObj: this.currentAddressMark
          });
        }
      });
    },

    // 创建图标 图标原始大小必须为25*34 如不符合让设计提供
    initIcon(img) {
      const icon = new AMap.Icon({
        size: new AMap.Size(25, 34),
        image: img
      });
      return icon;
    },
    delMark(mark) {
      this.map && this.map.remove(mark);
    },
    // 创建点
    initMark(LngLat, icon, title = '', cbData) {
      try {
        if (!LngLat || LngLat.length !== 2) {
          throw new Error('经度纬度格式不正确参考 [116.35, 39.89]');
        } else {
          const marker = new AMap.Marker({
            map: this.map,
            position: new AMap.LngLat(...LngLat),
            offset: new AMap.Pixel(-13, -30),
            autoRotation: true,
            // angle: -90,
            icon: icon ? this.initIcon(icon) : undefined, // 添加 Icon 实例
            title: `${title}`
          });
          marker.on('click', (event) => {
            const myCbData = {
              ...cbData,
              markObj: event.target,
              lnglat: `${LngLat[0]},${LngLat[1]}`
            };
            // 给点绑定事件 有cbData则有markerClick事件
            this.$emit('markerClick', myCbData);
          });
          // this.map.add(marker)
          return marker;
        }
      } catch (error) {
        console.log(
          '%c error: ',
          'font-size:18px;background-color: #f30707;color:#fff;',
          error
        );
        throw new Error('initMark创建点出错，请检查');
      }
    },
    // 根据经纬度获取详细地址
    getAddress(LngLat, cb) { // [lng,lat] cb 回调函数返回地址
      this.geocoder.getAddress(LngLat, (status, result) => {
        let address;
        if (status === 'complete' && result.regeocode) {
          address = result.regeocode.formattedAddress;
        } else {
          address = '未知道路';
        }
        cb(address);
      });
    },

    // 线路拖拽
    drawDragRoute(options) {
      try {
        if (!options) {
          throw Error(
            '参数options有错,{policy?,showTraffic?,waypoints?, start,end }'
          );
        }
        if (
          !options.start ||
          options.start.length !== 2 ||
          !options.end ||
          options.end.length !== 2
        ) {
          throw Error('经度纬度格式不正确参考 [116.35, 39.89]');
        }
        let dragRouteObj;
        let allPath;
        if (options.waypoints && options.waypoints instanceof Array && options.waypoints.length !== 0) {
          allPath = [options.start, ...options.waypoints, options.end];
        } else {
          allPath = [options.start, options.end];
        }
        this.map.plugin('AMap.DragRoute', () => {
          dragRouteObj = new AMap.DragRoute(this.map, allPath, this.parsePolicy(options.policy) || AMap.DrivingPolicy.LEAST_TIME, {
            midMarkerOptions: {
              icon: require('examples/assets/mapImg/point.png') // 添加 Icon 图标 URL
            }
          });
          dragRouteObj.search();
          dragRouteObj.on('complete', (e) => {
            if (e.type === 'complete') {
              const resultData = {
                start: [e.data.origin.lng, e.data.origin.lat],
                end: [e.data.destination.lng, e.data.destination.lat],
                waypoints: e.data.waypoints.map((item) => {
                  return [item.location.lng, item.location.lat];
                }),
                allTimes: parseFloat(e.data.routes[0].time / 3600).toFixed(2), // 分钟
                allDistance: parseFloat(e.data.routes[0].distance / 1000).toFixed(2), // 公里数
                tolls: e.data.routes[0].tolls, // 收费
                policy: e.data.routes[0].policy
              };
              this.$emit('dragRoute', resultData);
            }
          });
        });

        return dragRouteObj;
      } catch (error) {
        console.log(
          '%c error: ',
          'font-size:18px;background-color: #f30707;color:#fff;',
          error
        );
        throw new Error('drawDragRoute规划线路出错，请检查');
      }
    },
    // 规划线路
    drawDrivingLine(options) {
      this.drivingLineObj && this.drivingLineObj.clear();
      this.drivingLineObj = null;
      try {
        if (!options) {
          throw Error(
            '参数options有错,{policy?,showTraffic?,waypoints?, start,end,needChangeColor?,lineColor? }'
          );
        }
        if (
          !options.start ||
          options.start.length !== 2 ||
          !options.end ||
          options.end.length !== 2
        ) {
          throw Error('经度纬度格式不正确参考 [116.35, 39.89]');
        }
        const Driving = new AMap.Driving({
          map: this.map,
          extensions: 'all',
          panel: options.hanPanel ? 'panel' : undefined,
          showTraffic: options.showTraffic || false,
          policy: this.parsePolicy(options.policy) || AMap.DrivingPolicy.LEAST_TIME

        });
        // 根据起终点经纬度规划驾车导航路线
        Driving.search(
          options.start,
          options.end,
          {
            waypoints: options.waypoints
          },
          (status, result) => {
            if (status === 'complete') {
              // console.log('绘制驾车路线完成')
              if (result.routes && result.routes.length) {
                const paths = this.parseRouteToPath(result.routes[0]);
                if (options.needChangeColor && !options.lineColor) {
                  throw Error('缺少lineColor，没有颜色值！');
                }
                if (options.needChangeColor && options.lineColor) {
                  this.drawLine(paths, options.lineColor);
                }
                // 返回费用 时长 里程数信息
                const resultData = {
                  allTimes: parseFloat(result.routes[0].time / 3600).toFixed(2), // 分钟
                  allDistance: parseFloat(result.routes[0].distance / 1000).toFixed(2), // 公里数
                  tolls: result.routes[0].tolls, // 收费
                  policy: result.routes[0].policy
                };
                this.$emit('drivingRoute', resultData);
              }
            } else {
              throw Error('高德获取驾车数据失败：' + result);
            }
          }
        );
        return Driving;
      } catch (error) {
        console.log(
          '%c error: ',
          'font-size:18px;background-color: #f30707;color:#fff;',
          error
        );
        throw new Error('drawDrivingLine规划线路出错，请检查');
      }
    },
    // 行车轨迹
    drawLine(PolylineList, strokeColor = '#00BD02') {
      try {
        if (!PolylineList) {
          throw new Error(
            '线路PolylineList不可少，二维数组参考 [[116.35, 39.89],[116.35, 39.89]]'
          );
        }
        const polyline = new AMap.Polyline({
          path: PolylineList,
          showDir: true,
          strokeColor: strokeColor, // 线颜色
          strokeOpacity: 1, // 线透明度
          strokeWeight: 6, // 线宽
          strokeStyle: 'solid', // 线样式
          lineJoin: 'round', // 折线拐点的绘制样式
          zIndex: 999
        });
        this.map.add(polyline);
        return polyline;
      } catch (error) {
        console.log(
          '%c error: ',
          'font-size:18px;background-color: #f30707;color:#fff;',
          error
        );
        throw new Error('initLine创建线出错，请检查');
      }
    },
    addCarMarks(marks) {
      // {carNo:"车牌号",carLngLat:[经度,纬度],angle:角度,icon:icon图标}
      const obj = this.drawCarMark(
        marks.carNo,
        marks.carLngLat,
        marks.angle,
        marks.icon
      );

      return obj;
    },
    drawCarMark(carNo, carLngLat, angle, icon) {
      const markHtml2 = `<div class="bg-car2" >${carNo}</div>`;
      // 创建一个 Icon
      var startIcon = new AMap.Icon({
        // 图标尺寸
        size: new AMap.Size(24, 24),
        // 图标的取图地址
        image: icon,
        // 图标所用图片大小
        imageSize: new AMap.Size(24, 24)
        // 图标取图偏移量
      });
      const marker = new AMap.Marker({
        position: new AMap.LngLat(...carLngLat),
        icon: startIcon, // 添加 Icon 图标 URL
        title: `${carNo}`,
        offset: new AMap.Pixel(-9, -9),
        angle,
        autoRotation: true
      });
      marker.on('click', (e) => {
        // 给点绑定事件
        this.$emit('carClick', carNo);
      });

      // 将 markers 添加到地图
      this.map.add(marker);
      const text = new AMap.Text({
        text: markHtml2,
        position: new AMap.LngLat(...carLngLat),
        anchor: 'top-left'
      });
      text.on('click', (e) => {
        // 给点绑定事件
        this.$emit('carClick', carNo);
      });
      this.map.add(text);
      // 设置label标签
      // marker.setLabel({
      //   content: markHtml, //设置文本标注内容
      //   direction: "top", //设置文本标注方位
      // });
      // this.map.setFitView();
      return [marker, text];
    },
    carMoving(mark, text, carLngLat, speed) {
      const lngLat = new AMap.LngLat(...carLngLat);
      mark.moveTo(lngLat, speed);
      text.moveTo(lngLat, speed);
    },
    speedCarMove(speed) {
      if (this.showLinePathsObj && this.showLinePathsObj.length !== 0) {
        if (speed > 99) {
          this.zoom = 12;
        } else {
          this.zoom = 18;
        }

        const movingMark = this.showLinePathsObj[0];
        movingMark.moveAlong(this.showPaths, this.replaySpeed * speed, undefined, true);
      } else {
        return false;
      }
    },
    startCarMove() {
      if (this.showLinePathsObj && this.showLinePathsObj.length !== 0) {
        const movingMark = this.showLinePathsObj[0];
        movingMark.resumeMove();
      } else {
        return false;
      }
    },
    pauseCarMove() {
      if (this.showLinePathsObj && this.showLinePathsObj.length !== 0) {
        const movingMark = this.showLinePathsObj[0];
        movingMark.pauseMove();
      } else {
        return false;
      }
    },

    // 画点 多个点
    drawMark(PointObj) {
      console.log('%c 🥖 PointObj: ', 'font-size:20px;background-color: #33A5FF;color:#fff;', PointObj);
      if (!PointObj || PointObj.length === 0) return;
      const marks = PointObj.map((item) => {
        return this.initMark(item.LngLat, item.icon, item.title, item.cbData);
      });
      this.map.setFitView();
      return marks;
    },
    // 轨迹回放
    showDrivingLine(PolylineList, replaySpeed) {
      //
      const trackCarMarker = new AMap.Marker({
        map: this.map,
        position: [116.478935, 39.997761],
        icon: 'https://webapi.amap.com/images/car.png',
        offset: new AMap.Pixel(-26, -13),
        autoRotation: true,
        angle: -90
      });
      // 绘制轨迹
      const Polyline = new AMap.Polyline({
        map: this.map,
        path: PolylineList,
        showDir: true,
        strokeColor: '#28F', // 线颜色
        strokeWeight: 6 // 线宽
      });
      const passedPolyline = new AMap.Polyline({
        map: this.map,
        strokeColor: '#AF5', // 线颜色
        strokeWeight: 6 // 线宽
      });
      trackCarMarker.on('moving', (e) => {
        passedPolyline.setPath(e.passedPath);
        // this.map.setCenter(e.target.getPosition(), true)
        this.map.setZoomAndCenter(this.zoom, e.target.getPosition(), true);
      });
      trackCarMarker.moveAlong(PolylineList, replaySpeed, undefined, true);

      this.map.setFitView();
      return [trackCarMarker, Polyline, passedPolyline];
    },
    // 调整视图
    setMapView() {
      this.map.setFitView();
    }
  }
};
</script>

<style lang="scss" scoped>
::v-deep {
  .amap_lib_placeSearch_poi{
    display: none;
  }
  .amap-logo,
  .amap-copyright {
    display: none !important;
  }
  .amap-marker-label {
    border: none;
    background: none;
  }
  .amap-overlay-text-container {
    border: none;
    background: none;
  }
}

.map-container {
   position: relative;
  height: 100%;
  width: 100%;
  .inputSearch{
     position: absolute;
    top: 30px;
    left: 10px;
    width: 278px;
        height: 36px;
    line-height: 36px;
        -webkit-appearance: none;
    background-color: #FFF;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #DCDFE6;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 40px;
    line-height: 40px;
    outline: 0;
    padding: 0 15px;
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
  }
  #panel {
    position: absolute;
    background-color: white;
    max-height: 80%;
    overflow-y: auto;
    top: 70px;
    left: 10px;
    width: 325px;
    padding: 10px;
  }
  .map {
    width: 100%;
    height: 100%;
    min-height: 500px;
  }
}
</style>
