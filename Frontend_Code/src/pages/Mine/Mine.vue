<template>
  <div class="app-content">
    <!-- 头部布局 -->
    <div class="head-container" :style="{height: imageHeight+'px'}">
      <img class="head-bg" src="../../assets/images/bg.jpg" alt="head_bg">
      <div class="person-info-wrap">
        <img v-if="userId" class="avatar" src="../../assets/images/mine-selected.png" alt="avatar">
        <img v-else class="avatar" src="../../assets/images/mine-selected.png" alt="avatar">
        <div v-if="userId">
          <div class="user-name-login">用户{{ peopleTel }}</div>
          <!-- <div class="user-status-login">已皈依</div> -->
        </div>
        <div v-else @click="gotoLogin">
          <div class="user-name-unlogin">点击登录</div>
          <div class="user-status-unlogin">登录查看更多</div>
        </div>
      </div>
      <!--      <div class="menu-container">-->
      <!--        <div class="menu-item" v-for="(item,index) in menuList" :key="index" @click="menuItemClick(index)">-->
      <!--          <img :src="item.imgUrl" alt="img">-->
      <!--          <div>-->
      <!--            <div class="item-title">{{ item.title }}</div>-->
      <!--            <div class="item-desc">{{ item.desc }}</div>-->
      <!--          </div>-->
      <!--        </div>-->
      <!--      </div>-->
    </div>

    <!-- 我的订单 -->
    <div class="my-order-container">
      <div class="order-title">我的保单</div>
      <div class="order-item-wrap">
        <div class="order-item" v-for="(item,index) in orderMenuList" :key="index" @click="orderItemClick(index)">
          <img :src="item.imgUrl" alt="img">
          <div class="item-title">{{ item.title }}</div>
        </div>
      </div>
    </div>

    <!-- 常用功能 -->
    <div class="common-functions-container">
      <div class="functions-title">常用功能</div>
      <div class="functions-item-wrap">
        <div class="functions-item" v-for="(item,index) in commonFunctionsList"
             :key="index" v-if="index < (userId? commonFunctionsList.length: 1)" @click="funItemClick(index)">
          <img :src="item.imgUrl" alt="img">
          <div class="item-title">{{ item.title }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Mine',
  data: function () {
    return {
      imageHeight: 0,
      // 菜单数据
      menuList: [
        {
          imgUrl: require('../../assets/images/ordermenu_02.png'),
          title: "近期法会",
          desc: "报名的法会"
        },
        {
          imgUrl: require('../../assets/images/ordermenu_03.png'),
          title: "敬神功德",
          desc: "我的功德"
        },
        // {
        //   imgUrl: require('../../assets/images/ordermenu_04.png'),
        //   title: "祈福灯",
        //   desc: "我的祈福灯"
        // }
      ],

      orderMenuList: [
        {
          imgUrl: require('../../assets/images/order-all.png'),
          title: "全部",
        },
        {
          imgUrl: require('../../assets/images/order-unpaid.png'),
          title: "待核保",
        },
        {
          imgUrl: require('../../assets/images/order-untrip.png'),
          title: "待处理",
        },
        {
          imgUrl: require('../../assets/images/order-refund.png'),
          title: "售后",
        },
        {
          imgUrl: require('../../assets/images/order-completed.png'),
          title: "已完成",
        }
      ],

      commonFunctionsList: [
        {
          imgUrl: require('../../assets/images/myicon_01.png'),
          title: "常用信息"
        },
        // {
        //   imgUrl: require('../../assets/images/myicon_02.png'),
        //   title: "我的收藏"
        // },
        // {
        //   imgUrl: require('../../assets/images/myicon_03.png'),
        //   title: "意见反馈"
        // },
        {
          imgUrl: require('../../assets/images/myicon_04.png'),
          title: "退出登录"
        }
      ]
    }
  },

  created() {
    document.title = '我的';
    let iframe = document.createElement('iframe');
    iframe.style.visibility = 'hidden';
    iframe.style.width = '1px';
    iframe.style.height = '1px';
    iframe.onload = function () {
      setTimeout(function () {
        document.body.removeChild(iframe);
      }, 0);
    };
    document.body.appendChild(iframe);
  },

  computed: {
    peopleTel() {
      return this.$store.getters.userTelEscape
    },

    userId() {
      return this.$store.getters.userID
    }
  },

  methods: {
    // 登录
    gotoLogin() {
      this.$router.push({name: 'Login', query: {nextPage: 'Mine'}})
    },

    // 菜单项点击
    menuItemClick: function (index) {
      // 如果未登录，跳转登录页,否则跳转相关订单页
      if (!this.userId) {
        this.$router.push({name: 'Login', query: {nextPage: 'Mine'}})
        return
      }

      if (index === 0) { // 法会活动
        this.$router.push({name: 'OrderList', query: {type: "2",lock:"1"}})
      } else if (index === 1) { // 敬神功德
        this.$router.push({name: 'OrderList', query: {type: "4",lock:"1"}})
      } else if (index === 2) { // 祈福灯
        this.$router.push({name: 'MyLightList'})
      }
    },

    // 订单项点击
    orderItemClick: function (index) {
      // 如果未登录，跳转登录页,否则跳转相关订单页
      // if (!this.userId) {
      //   this.$router.push({name: 'Login', query: {nextPage: 'Mine'}})
      //   return
      // }
      // if (index === 0) { // 全部
      //   this.$router.push('/OrderList')
      //   this.$router.push({name: 'OrderList', query: {status: '0'}})
      // } else if (index === 1) { // 待支付
      //
      // } else if (index === 2) { // 待出行
      //
      // } else if (index === 3) { // 退款/售后
      //
      // } else if (index === 4) { // 已完成
      //
      // }
      this.$router.push({name: 'OrderList', query: {status: index + ''}})
    },

    // 功能项点击
    funItemClick: function (index) {
      if (index === 0) { // 常用信息
        if (!this.userId) {
          this.$router.push({name: 'Login', query: {nextPage: 'ContactList'}})
        } else {
          this.$router.push({name: 'ContactList'})
        }
      } else if (index === 1) { // 我的收藏
        // 隐藏两个模块后，退出登录的index是1
        this.$store.commit('logout')
      } else if (index === 2) { // 意见反馈

      } else if (index === 3) { // 退出登录
        // this.$store.commit('logout')
      }
    },
  },

  mounted: function () {
    document.querySelector(".head-bg").addEventListener("load", (event) => {
      // this.imageHeight = event.target.offsetHeight
      this.imageHeight = 160
    })
  },
}
</script>

<style scoped>
.app-content {
  padding-bottom: 75px;
}

.head-container {
  position: relative;
  /*margin-bottom: 46px;*/
  margin-bottom: -46px;
}

.head-container .head-bg {
  width: 100%;
  top: -15px;
  left: 0;
  position: absolute;
  z-index: -1;
}

.head-container .person-info-wrap {
  display: flex;
  align-items: center;
  padding: 24px 32px 16px;
}

.head-container .person-info-wrap .avatar {
  width: 72px;
  height: 72px;
  margin-right: 16px;
}

.head-container .person-info-wrap .user-name-login {
  font-size: 18px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: bold;
  color: #000000;
}

.head-container .person-info-wrap .user-name-unlogin {
  font-size: 20px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: bold;
  color: #000000;
}

.head-container .person-info-wrap .user-status-login {
  font-size: 12px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: bold;
  color: #007AAA;
  display: inline-block;
  padding: 0 4px 1px;
  background-color: rgba(255, 255, 255, 0.14);
  border-radius: 2px;
  margin-top: 8px;
  border: 1px solid #007AAA;
}

.head-container .person-info-wrap .user-status-unlogin {
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #000000;
  margin-top: 8px;
}

.head-container .menu-container {
  background-color: #FFFFFF;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  display: flex;
  align-items: center;
  padding: 19px 0;
  position: absolute;
  bottom: -30px;
  left: 16px;
  right: 16px;
}

.head-container .menu-container .menu-item {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.head-container .menu-container .menu-item:not(:last-child) {
  border-right: 1px solid rgba(0, 0, 0, 0.1);
}

.head-container .menu-container .menu-item img {
  width: 36px;
  height: 36px;
  margin-right: 8px;
}

.head-container .menu-container .menu-item .item-title {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.8);
}

.head-container .menu-container .menu-item .item-desc {
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.6);
}

.my-order-container {
  background-color: #FFFFFF;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  margin: 0 16px;
}

.my-order-container .order-title {
  font-size: 16px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: bold;
  color: #000000;
  padding: 12px 0 0 16px;
}

.my-order-container .order-item-wrap {
  display: flex;
  align-items: center;
}

.my-order-container .order-item-wrap .order-item {
  flex: 1;
  text-align: center;
  padding: 16px 0;
}

.my-order-container .order-item-wrap .order-item img {
  width: 24px;
  height: 24px;
}

.my-order-container .order-item-wrap .order-item .item-title {
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.8);
  margin-top: 8px;
}

.common-functions-container {
  background-color: #FFFFFF;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  margin: 16px 16px 0;
}

.common-functions-container .functions-title {
  font-size: 16px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: bold;
  color: #000000;
  line-height: 22px;
  padding: 12px 16px 8px;
}

.common-functions-container .functions-item-wrap {
  padding: 0 16px 8px;
}

.common-functions-container .functions-item-wrap .functions-item {
  display: flex;
  align-items: center;
  line-height: 48px;
}

.common-functions-container .functions-item-wrap .functions-item img {
  width: 20px;
  height: 20px;
  margin-right: 8px;
}

.common-functions-container .functions-item-wrap .functions-item .item-title {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.6);
  flex-grow: 1;
  height: 100%;
}

.common-functions-container .functions-item-wrap .functions-item:not(:last-child) .item-title {
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
</style>
