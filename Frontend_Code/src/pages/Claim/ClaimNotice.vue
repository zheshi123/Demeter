<template>
  <div class="claim-notice">
    <div class="title">自动理赔发起通知</div>
    <div class="text">你好，</div>
    <div class="text">小智检测到一笔可发起的保单理赔，具体信息如下：</div>
    <div class="text">作物名称：猪</div>
    <div class="text">作物状态：病死</div>
    <div class="text">作物编号：XXXXXX</div>
    <div class="text">HashID：XXXXXXXX</div>
    <div class="text">是否要发起理赔呢？发起理赔后小智将自动上传您的相关作物状态数据给保险公司，无需额外取证操作。</div>
    <div class="button" @click="goLaunch">点击发起理赔</div>
    <div class="tips">小智提供区块链存证服务</div>
  </div>
</template>

<script>
  export default {
    name: 'ClaimNotice',
    data() {
      return {

      }
    },
    methods: {
      goLaunch() {
        this.$router.push('ClaimLaunch')
      }
    },
  }
</script>

<style scoped>

  .claim-notice {
    width: 100%;
    height: 100vh;
    padding: 16px;
    box-sizing: border-box;
    position: relative;
  }

  .title {
    color: rgb(4 163 155);
    font-size: 22px;
    font-weight: bold;
    margin-bottom: 20px;
  }

  .text {
    font-size: 16px;
    margin-bottom: 16px;
  }

  .button {
    width: 180px;
    height: 36px;
    line-height: 36px;
    background-color: rgb(4 163 155);
    color: #fff;
    margin: 0 auto;
    text-align: center;
  }

  .tips {
    width: 100%;
    font-size: 12px;
    color: #999;
    position: absolute;
    bottom: 16px;
    left: 0;
    text-align: center;
  }

</style>