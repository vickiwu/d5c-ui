<style scoped lang="scss">
.banner {
  text-align: center;
  margin-bottom: 20px;
}
.banner-desc {
  padding-top: 50px;

  h1 {
    font-size: 34px;
    margin: 0;
    line-height: 48px;
    color: #555;
  }

  p {
    font-size: 18px;
    line-height: 28px;
    color: #888;
    margin: 10px 0 5px;
  }
}
.sponsors {
  display: flex;
  justify-content: center;
}
.sponsor {
  margin: 0 20px 50px;
  display: inline-flex;
  width: 300px;
  height: 100px;
  justify-content: center;

  img {
    margin-right: 20px;
  }

  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  p {
    margin: 0;
    line-height: 1.8;
    color: #999;
    font-size: 14px;
  }
}
.cards {
  margin: 0 auto 110px;
  width: 1140px;

  .container {
    padding: 0;
    margin: 0 -11px;
    width: auto;
    &::before,
    &::after {
      display: table;
      content: '';
    }
    &::after {
      clear: both;
    }
  }

  li {
    width: 33%;
    padding: 0 19px;
    box-sizing: border-box;
    float: left;
    list-style: none;
  }

  img {
    width: 160px;
    height: 120px;
  }
}
.card {
  height: 450px;
  width: 100%;
  background: #ffffff;
  border: 1px solid #eaeefb;
  border-radius: 5px;
  box-sizing: border-box;
  text-align: center;
  position: relative;
  transition: all 0.3s ease-in-out;
  bottom: 0;

  img {
    margin: 66px auto 60px;
  }
  h3 {
    margin: 0;
    font-size: 18px;
    color: #1f2f3d;
    font-weight: normal;
  }
  p {
    font-size: 14px;
    color: #99a9bf;
    padding: 0 25px;
    line-height: 20px;
  }
  a {
    height: 53px;
    line-height: 52px;
    font-size: 14px;
    color: #409eff;
    text-align: center;
    border: 0;
    border-top: 1px solid #eaeefb;
    padding: 0;
    cursor: pointer;
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    background-color: #fff;
    border-radius: 0 0 5px 5px;
    transition: all 0.3s;
    text-decoration: none;
    display: block;

    &:hover {
      color: #fff;
      background: #409eff;
    }
  }
  &:hover {
    bottom: 6px;
    box-shadow: 0 6px 18px 0 rgba(232, 237, 250, 0.5);
  }
}
@media (max-width: 1140px) {
  .cards {
    width: 100%;
    .container {
      width: 100%;
      margin: 0;
    }
  }
  .banner .container {
    width: 100%;
    box-sizing: border-box;
  }
  .banner img {
    right: 0;
  }
}

@media (max-width: 1000px) {
  .banner .container {
    img {
      display: none;
    }
  }
}

@media (max-width: 768px) {
  .cards {
    li {
      width: 80%;
      margin: 0 auto 20px;
      float: none;
    }
    .card {
      height: auto;
      padding-bottom: 54px;
    }
  }
  .banner-stars {
    display: none;
  }
  .banner-desc {
    #line2 {
      display: none;
    }
    h2 {
      font-size: 32px;
    }
    p {
      width: auto;
    }
  }
}
.theme-intro-b {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 200;
  .intro-banner {
    position: absolute;
  }
  img {
    width: 300px;
  }
  .title {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    color: #fff;
    text-align: center;
    font-weight: bold;
    font-size: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    p {
      padding: 0;
      margin: 10px 0;
    }
  }
}
.theme-intro-a {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 200;
  .mask {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: #000;
    opacity: 0.5;
  }
  .intro-banner {
    top: 50%;
    left: 50%;
    position: fixed;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    box-sizing: border-box;
    text-align: center;
    z-index: 100;
    img {
      width: 100%;
    }
    .intro-text {
      position: absolute;
      top: 50%;
      left: 0;
      right: 0;
      p {
        padding: 0;
        margin: 0;
        font-size: 48px;
        font-weight: bold;
        color: #fff;
      }
    }
  }
}
</style>
<template>
  <div>
    <div class="banner">
      <div class="banner-desc">
        <h1>五城组件库</h1>
        <p>
          d5c-code，五城业务组件，地图sdk，webIM
          sdk文档说明，demo展示,便于快速开发
        </p>
      </div>
    </div>

    <div class="cards">
      <ul class="container">
        <!-- <li>
          <div class="card">
            <img src="~examples/assets/images/guide.png" alt="" />
            <h3>说明</h3>
            <p>业务组件，地图sdk，webIM sdk文档说明，demo展示</p>
            <router-link active-class="active" to="/design" exact>
              查看详情
            </router-link>
          </div>
        </li> -->
        <li>
          <div class="card">
            <img src="~examples/assets/images/component.png" alt="" />
            <h3>组件</h3>
            <p>
              跃云，星耀，旭阳等业务系统开发过程中的，业务组件，基础组件二次封装等
            </p>
            <router-link active-class="active" to="/d5Comp" exact>
              查看详情
            </router-link>
          </div>
        </li>
        <li>
          <div class="card">
            <img src="~examples/assets/images/theme-index-icon.svg" alt="" />
            <h3>地图</h3>
            <p>
              运输线路地图相关。包含规划线路，线路轨迹，轨迹回放，车辆实时位置展示等
            </p>
            <router-link active-class="active" to="/map" exact>
              查看详情
            </router-link>
          </div>
        </li>
        <li>
          <div class="card">
            <img src="~examples/assets/images/resource.png" alt="" />
            <h3>IM-sdk</h3>
            <p>
              webIM,消息中台相关；包含单聊，发送表情，本地缓存数据，发送文件等内容。
            </p>
            <router-link active-class="active" to="/sdk" exact
              >查看详情
            </router-link>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
// import throttle from 'throttle-debounce/throttle';

export default {
  name: 'd-index',
  created() {},
  methods: {},
  data() {
    return {
      lang: this.$route.meta.lang,
      mainImgOffset: 0
    };
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.throttledHandleScroll);
  },
  mounted() {
    window.addEventListener('scroll', this.throttledHandleScroll);
  }
};
</script>
