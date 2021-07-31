<template>
  <div class="claim-launch">
    <div class="part-top">
      <div class="img-avatar"></div>
      <div class="right">
        <div class="name">猪</div>
        <div class="number">NO.XXXXXX</div>
      </div>
    </div>
    <div class="part-center">
      <div class="item-wrap">
        <div class="title">HashID <span>*</span></div>
        <div class="content">XXXXXX</div>
      </div>
      <div class="item-wrap">
        <div class="title">状态 <span>*</span></div>
        <div class="content">病死</div>
      </div>
      <div class="item-wrap">
        <div class="title">联系电话 <span>*</span></div>
        <div class="content">13000000000</div>
      </div>
      <div class="item-wrap">
        <div class="title">银行卡号 <span>*</span></div>
        <div class="content">XXXXXXXXXXXXXXX</div>
      </div>
      <!-- <textarea class="textarea" placeholder="备注" name="" id="" cols="30" rows="10"></textarea> -->
      <mt-field class="textarea" placeholder="备注" type="textarea" rows="4" :attr="{ maxlength: 10 }"></mt-field>
      <div class="button" @click="goAudit">提交订单</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ClaimLaunch',
    data() {
      return {

      }
    },
    methods: {
      goAudit() {
        this.$router.push('ClaimAudit')
      }
    },
  }
</script>

<style scoped>

  .claim-launch {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
  }

  .part-top {
    display: flex;
    margin-top: 30px;
    padding: 16px;
  }

  .part-top .img-avatar {
    width: 100px;
    height: 60px;
    background-color: #ddd;
    margin-right: 16px;
  }

  .part-top .right {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .part-top .name {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 5px;
  }

  .part-top .number {
    color: #333;
    font-size: 16px;
  }

  .part-center {
    
  }

  .part-center .item-wrap {
    border-top: 1px solid #ececec;
    padding: 16px;
  }

  .part-center .item-wrap .title {
    font-size: 12px;
    color: #666;
  }

  .part-center .item-wrap .title span {
    color: red;
    font-size: 14px;
  }

  .textarea {
    /* width: calc(100% - 32px);
    margin: 0 16px; */
    padding: 10px;
    box-sizing: border-box;
    background-color: #ececec;
  }

  .button {
    width: calc(100% - 32px);
    height: 40px;
    line-height: 40px;
    text-align: center;
    color: #fff;
    background-color: rgb(4 163 155);
    margin: 20px auto 0;
  }

</style>