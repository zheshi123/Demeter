<template>
  <div class="app-content">
    <div class="head">
      <div class="sub-head">
        <img src="../../assets/images/mine-selected.png" alt="" style="width:50px; height:50px;position:absolute;left:16px;top:20px">
        <div class="light-head">
          <div style="font-family: PingFangSC-Medium;font-size: 18px;color: #000000;">保单已生效</div>
          <div style="font-family: PingFangSC-Regular;font-size: 14px;color: #000000; margin-top:8px">到期时间：2022-12-31</div>
        </div>
      </div>
    </div>
    <div style="margin-top:16px;margin-left:16px;font-family: PingFangSC-Semibold;font-size: 18px;color: #000000;">产品信息</div>
    <div class="light-info">
      <div style="margin-left:16px;font-family: PingFangSC-Medium;font-size: 16px;display:flex;justify-content:flex-start">
        养殖险
      </div>
      <div class="sub-lightinfo" v-for="(item,index) in lightInfo" :key="index">
        <div class="left-title">{{item.title}}</div>
        <div  class="right-content">{{item.content}}</div>
      </div>
    </div>
    <div style="margin-left:16px;font-family: PingFangSC-Medium;font-size: 16px;display:flex;justify-content:flex-start">
      保险人
    </div>
    <!--   请购人信息-->
    <div class="sub-lightinfo" v-for="(item,index) in personInfo" :key="index">
      <div class="left-title">{{item.title}}</div>
      <div  class="right-content">{{item.content}}</div>
    </div>
    <!--   分割线-->
    <div style="background-color:rgba(51,51,51,0.10);margin:16px;height:1px;"></div>
    <!--   功德经资信息-->
    <div style="margin-left:16px;font-family: PingFangSC-Medium;font-size: 16px;display:flex;justify-content:flex-start">
      金额
    </div>
    <div style="margin: 8px 16px 16px 16px;display:flex;justify-content: space-between">
      <div style="font-family: PingFangSC-Regular;font-size: 14px;color: rgba(0,0,0,0.60);">养殖险-黑毛猪</div>
      <div style="font-family: PingFangSC-Regular;font-size: 14px;color: #000000;">×1</div>
      <div style="font-family: PingFangSC-Regular;font-size: 14px;color: #000000;">¥100</div>
    </div>
    <!--   分割线-->
    <div style="background-color:rgba(51,51,51,0.10);margin:12px 16px;height:1px;"></div>
    <div style="margin: 16px;text-align:right">
      <span style="font-family: PingFangSC-Semibold;font-size: 16px;color: #000000;">实付金额</span>
      <span style="font-family: PingFangSC-Semibold;font-size: 16px;color: #007AAA;">¥100</span>
    </div>
    <!--   分割线-->
    <div style="background-color:#F3F4F5;margin:16px 0;height:8px;"></div>
    <!--   订单信息-->
    <div style="margin: 0 16px;font-family: PingFangSC-Medium;font-size: 16px;color: #333333;">订单信息</div>
    <div style="display:inline-block; font-family: PingFangSC-Regular;font-size: 12px;color: rgba(0,0,0,0.60);margin-left:16px;margin-top: 12px;">订单编号：1457827526210352319</div>
    <img style="width:12px;height:12px;" src="../../assets/images/copyicon.png" alt="" @click="copyOrderNo">
    <div style="font-family: PingFangSC-Regular;font-size: 12px;color: rgba(0,0,0,0.60);margin-left:16px;margin-top: 4px;">下单时间：2020-12-21 16:07:02</div>
    <div style="font-family: PingFangSC-Regular;font-size: 12px;color: rgba(0,0,0,0.60);margin-left:16px;margin-top: 4px;">支付时间：2020-12-21 16:07:02</div>

    <!--   分割线-->
    <div style="background-color:rgba(51,51,51,0.10);margin:32px 0 0 0;height:1px;"></div>

    <!--   是否续期-->
    <div  class="btn-class">去续期</div>
  </div>
</template>
<script>
import {Toast} from "mint-ui";
import VueClipboard from 'vue-clipboard2'
import Vue from "vue";
Vue.use(VueClipboard)
export default {
  name: 'OrderDetail',
  data: function () {
    return {
      orderNo:"1457827526210352319",
      lightInfo: [{title:"产品名称",content:"养殖险-黑毛猪"},
        {title:"数量",content:"一份"},
        {title:"保单时长",content:"1年"},
        {title:"产品编号",content:"100861001"}],
      personInfo: [{title:"姓名",content:"小甜甜"},
        {title:"手机号码",content:"180****2198"},
        {title:"年龄",content:"21岁"},
        {title:"性别",content:"男"},
        {title:"详细地址",content:"上海 上海市 浦东新区 唐镇 卡园二路288号 卡园二路"}]
    }
  },
  created () {
    document.title = '订单详情';
    var iframe = document.createElement('iframe');
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

  methods: {

    copyOrderNo: function () {
      this.$copyText(this.orderNo).then(function (e) {
        Toast('复制成功')
        console.log(e)
      }, function (e) {
        Toast('复制失败')
        console.log(e)
      })
    }
  }

}
</script>
<style scoped>
.app-content{
  width: 100%;
  height: 100%;
  /* padding-bottom: 55px; */
  /*background-color:#F3F4F5;*/
  background-color:white;
}
.head{
  width:100%;
  height:110px;
  background: #0e932e;
}
.sub-head{
  position:relative;
  width:calc(100% - 24px);
  margin-top:16px;
  margin-left:12px;
  height:81px;
  background: #FFFFFF;
  box-shadow: 0 0 8px 0 rgba(0,0,0,0.10);
  border-radius: 8px;
}
/*伪元素解决外边距坍塌问题*/
.head:before{
  content:"";
  display:table;
  clear:both;
}
.light-head{
  position: absolute;
  display:flex;
  justify-content: space-between;
  flex-direction: column;
  align-items:left;
  left:74px;
  top: 16px;
}
.light-info{
  padding:16px 0;
  width:calc(100% - 32px);
  margin:16px;
  background: #FFFFFF;
  box-shadow: 0 0 8px 0 rgba(0,0,0,0.10);
  border-radius: 8px;
  background:url("../../assets/images/bg.jpg") no-repeat center top;
  background-size: cover;
  /*padding-bottom:25px;*/
}
.sub-lightinfo{
  /*vertical-align:top;*/
}
.left-title{
  vertical-align:top;
  margin-left:16px;
  margin-top: 10px;
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: rgba(0,0,0,0.60);
  width:80px;
  display:inline-block;
}
.right-content{
  vertical-align:top;
  margin-left:16px;
  margin-top: 10px;
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #000000;
  width:calc(100% - 125px);;
  display:inline-block;
}
.btn-class{
  width:128px;
  height:32px;
  background: #0e932e;
  border-radius: 22px;
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #FFFFFF;
  text-align: center;
  line-height:32px;
  margin: 12px 0;
  float: right;
  margin-right:24px;
  box-shadow: 0 0 8px 0 rgba(19,190,191,0.20);

}
</style>

