<style lang="scss" scoped>
.headerWrapper {
  height: 70px;
}

#v3-banner {
  background-color: #409eff;
  min-height: 30px;
  padding: 5px 60px;
  z-index: 19;
  box-sizing: border-box;
  text-align: center;
  color: #eee;
}

#v3-banner a {
  color: #fff;
  font-weight: bold;
}

.header {
  height: 70px;
  background-color: #fff;
  color: #fff;
  top: 0;
  left: 0;
  width: 100%;
  line-height: 70px;
  z-index: 100;
  position: relative;

  .container {
    height: 100%;
    box-sizing: border-box;
    border-bottom: 1px solid #dcdfe6;
    .site-name {
      font-size: 1.3rem;
      font-weight: 600;
      color: #2c3e50;
      position: relative;
    }
  }

  .nav-lang-spe {
    color: #888;
  }

  h1 {
    margin: 0;
    float: left;
    font-size: 32px;
    font-weight: normal;

    a {
      color: #333;
      text-decoration: none;
      display: block;
    }

    span {
      font-size: 12px;
      display: inline-block;
      width: 34px;
      height: 18px;
      border: 1px solid rgba(255, 255, 255, 0.5);
      text-align: center;
      line-height: 18px;
      vertical-align: middle;
      margin-left: 10px;
      border-radius: 3px;
    }
  }

  .nav {
    float: right;
    height: 100%;
    line-height: 70px;
    background: transparent;
    padding: 0;
    margin: 0;
    &::before,
    &::after {
      display: table;
      content: '';
    }
    &::after {
      clear: both;
    }
  }

  .nav-gap {
    position: relative;
    width: 1px;
    height: 70px;
    padding: 0 20px;

    &::before {
      content: '';
      position: absolute;
      top: calc(50% - 8px);
      width: 1px;
      height: 16px;
      background: #ebebeb;
    }
  }

  .nav-logo,
  .nav-logo-small {
    vertical-align: sub;
  }

  .nav-logo-small {
    display: none;
  }

  .nav-item {
    margin: 0;
    float: left;
    list-style: none;
    position: relative;
    cursor: pointer;

    &.nav-algolia-search {
      cursor: default;
    }

    a {
      text-decoration: none;
      color: #1989fa;
      opacity: 0.5;
      display: block;
      padding: 0 22px;

      &.active,
      &:hover {
        opacity: 1;
      }

      &.active::after {
        content: '';
        display: inline-block;
        position: absolute;
        bottom: 0;
        left: calc(50% - 15px);
        width: 30px;
        height: 2px;
        background: #409eff;
      }
    }
  }
}

.nav-dropdown {
  margin-bottom: 6px;
  padding-left: 18px;
  width: 100%;

  span {
    display: block;
    width: 100%;
    font-size: 16px;
    color: #888;
    line-height: 40px;
    transition: 0.2s;
    padding-bottom: 6px;
    user-select: none;

    &:hover {
      cursor: pointer;
    }
  }

  i {
    transition: 0.2s;
    font-size: 12px;
    color: #979797;
    transform: translateY(-2px);
  }

  .is-active {
    span,
    i {
      color: #409eff;
    }
    i {
      transform: rotateZ(180deg) translateY(3px);
    }
  }

  &:hover {
    span,
    i {
      color: #409eff;
    }
  }
}

.nav-dropdown-list {
  width: auto;
}

@media (max-width: 850px) {
  .header {
    .nav-logo {
      display: none;
    }
    .nav-logo-small {
      display: inline-block;
    }
    .nav-item {
      margin-left: 6px;

      a {
        padding: 0 5px;
      }
    }
    .nav-theme-switch,
    .nav-algolia-search {
      display: none;
    }
  }
}

@media (max-width: 700px) {
  .header {
    .container {
      padding: 0 12px;
    }
    .nav-item {
      a {
        font-size: 12px;
        vertical-align: top;
      }
    }
    .nav-dropdown {
      padding: 0;
      span {
        font-size: 12px;
      }
    }
    .nav-gap {
      padding: 0 8px;
    }
    .nav-versions {
      display: none;
    }
  }
}
</style>
<template>
  <div class="headerWrapper">
    <header class="header" ref="header">
      <div class="container">
        <h1>
          <router-link :to="`/`">
            <slot>
              <div class="site-name">d5c-code</div>
            </slot>
          </router-link>
        </h1>
        <ul class="nav">
          <li class="nav-item">
            <router-link active-class="active" :to="`/d5Comp`">
              组件
            </router-link>
          </li>
          <li class="nav-item">
            <router-link active-class="active" :to="`/map`"> 地图 </router-link>
          </li>
          <li class="nav-item">
            <router-link active-class="active" :to="`/sdk`">
              IM-sdk
            </router-link>
          </li>
        </ul>
      </div>
    </header>
  </div>
</template>
<script>
export default {
  name: 'd-header',
  data() {
    return {};
  },

  components: {},
  computed: {},
  mounted() {},
  methods: {},

  created() {}
};
</script>
