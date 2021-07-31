<template>
  <div id="app">
    <keep-alive :include="include">
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
	  <tab-bar>
		  <tab-bar-item path="/Home" v-if="$route.meta.showTab">
			  <img slot="item-icon" src="./assets/images/home-unselected.png" >
			  <img slot="item-icon-active" src="./assets/images/home-selected.png" alt="">
			  <div slot="item-text">首页</div>
		  </tab-bar-item>

		  <tab-bar-item path="/Mine" v-if="$route.meta.showTab">
			  <img slot="item-icon" src="./assets/images/mine-unselected.png" alt="">
			  <img slot="item-icon-active" src="./assets/images/mine-selected.png" alt="">
			  <div slot="item-text">我的</div>
		  </tab-bar-item>
	  </tab-bar>
  </div>
</template>

<script>
import TabBar from './components/tabbar/Tabbar'
import TabBarItem from './components/tabbar/Item.vue'
export default {
  name: 'App',
  data () {
    return {
      include: []
    }
  },
  watch:{
    $route(to, from) {
      // 如果要to(进入)的页面是需要keepAlive缓存的，把name push进include数组中
      // console.log("to = ",to);
      // console.log("from = ",from);
      if (to.meta.keepAlive) {
        !this.include.includes(to.name) && this.include.push(to.name);
      }
      if (from.meta.keepAlive && from.name ==='OrderList' && (to.name === 'Mine')) {
        const index = this.include.indexOf(from.name);
        index !== -1 && this.include.splice(index, 1);
      }
    }
  },
  components: {
	TabBar,
	TabBarItem
  }
}
</script>

<style>
  #app {
    /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
    /*-webkit-font-smoothing: antialiased;*/
    /*-moz-osx-font-smoothing: grayscale;*/
    /*text-align: center;*/
    /*color: #2c3e50;*/
    /*margin-top: 60px;*/
  }

  /*移除body默认8px margin*/
  body {
    margin: 0;
  }

  /*input placeholder与光标颜色统一设置*/
  * {
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }

  input, button {
    -webkit-appearance: none;
    border-radius: 0;
  }

  input, textarea {
    border: 0;
    outline: none;
    caret-color: #007AAA;
  }

  ::-webkit-input-placeholder { /* WebKit browsers */
    color: rgba(0,0,0,0.20);
  }

  :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color: rgba(0,0,0,0.20);
  }

  ::-moz-placeholder { /* Mozilla Firefox 19+ */
    color: rgba(0,0,0,0.20);
  }

  :-ms-input-placeholder { /* Internet Explorer 10+ */
    color: rgba(0,0,0,0.20);
  }
</style>
