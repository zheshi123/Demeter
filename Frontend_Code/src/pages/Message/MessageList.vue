<template>
  <div class="message-list">
    <div class="page-title">通知公告</div>
    <div class="list-wrap">
      <div class="list-item" v-for="(item, index) in list" :key="index">
        <div class="part-left"></div>
        <div class="part-right">
          <div class="right-top">
            <span v-if="item.isNew" class="red-dot"></span>
            <span class="item-name" :class="{'high-light': item.isNew}">{{item.name}}</span>
            <span class="item-time">{{item.time}}</span>
          </div>
          <div class="right-bottom">{{item.title}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'MessageList', 
    data() {
      return {
        list: [
          {name: '自动理赔通知', title: '您有一条新的理赔可发起', time: '05/20 12:00', isNew: true},
          {name: '自动理赔通知', title: '您申请的自动理赔已受理', time: '05/20 12:00', isNew: false},
          {name: '自动理赔通知', title: '您申请的自动理赔已通过', time: '05/20 12:00', isNew: false},
        ]
      }
    },
  }
</script>

<style scoped>
  .message-list {
    width: 100%;
    height: 100%;
    padding: 16px;
    box-sizing: border-box;
  }

  .page-title {
    font-size: 22px;
    font-weight: bold;
    color: #000;
    margin-bottom: 30px;
  }

  .list-wrap .list-item {
    margin-bottom: 20px;
    display: flex;
    box-shadow: 0px 0px 8px 0px rgb(0 0 0 / 6%);
    padding: 10px;
    border-radius: 8px;
  }

  .list-wrap .list-item .part-left {
    width: 50px;
    height: 50px;
    background-color: #ddd;
    border-radius: 50%;
    margin-right: 18px;
  }

  .list-wrap .list-item .part-right {
    width: calc(100% - 50px);
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .list-wrap .list-item .right-top {
    position: relative;
  }

  .list-wrap .list-item .right-top .red-dot {
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: red;
  }

  .list-wrap .list-item .right-top .item-name {
    font-size: 16px;
    font-weight: bold;
  }

  .list-wrap .list-item .right-top .item-name.high-light {
    color: rgb(4 163 155);
  }

  .list-wrap .list-item .right-top .item-time {
    color: #999;
    font-size: 10px;
    position: absolute;
    right: 0;
  }

  .list-wrap .list-item .right-bottom {
    color: #999;
    font-size: 14px;
  }

</style>