<template>
  <div class="claim-audit">
    <div class="title">审核进度</div>
    <div class="tab-wrap">
      <span class="tab-item" :class="{'activied': item.type === tabIndex}" v-for="(item, index) in tabList" :key="index">{{item.name}}</span>
    </div>
    <div class="content-wrap">
      <div class="content-item" v-for="(item, index) in contentList" :key="index">
        <div class="left"></div>
        <div class="center">
          <div class="name">{{item.name}}</div>
          <div class="time">提交时间：{{item.time}}</div>
        </div>
        <div class="right">{{item.auditStatus === 0 ? '审核中': item.auditStatus === 1 ? '审核成功': '审核失败'}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ClaimAudit',
    data() {
      return {
        tabIndex: 1,
        tabList: [
          {type: 1, name: '审核中'},
          {type: 2, name: '审核成功'},
          {type: 3, name: '审核失败'},
        ],
        contentList: [
          {name: '作物1', time: '05/20 09:00', auditStatus: 0},
        ],
      }
    }
  }
</script>

<style scoped>

  .claim-audit {
    width: 100%;
    height: 100%;
    padding: 16px;
    box-sizing: border-box;
  }

  .title {
    font-size: 22px;
    font-weight: bold;
  }

  .tab-wrap {
    margin: 20px 0;
  }

  .tab-wrap .tab-item {
    display: inline-block;
    padding: 3px 6px;
    color: #000;
    border: 1px solid #000;
    border-radius: 16px;
    background-color: #fff;
    margin-right: 10px;
  }

  .tab-wrap .tab-item.activied {
    color: #fff;
    background-color: #000;
  }

  .content-item {
    width: 100%;
    display: flex;
    position: relative;
  }

  .content-item .left {
    width: 60px;
    height: 40px;
    background-color: #999;
    margin-right: 10px;
  }

  .content-item .time {
    color: #999;
    font-size: 12px;
  }

  .content-item .right {
    padding: 3px 6px;
    border: 1px solid #ddd;
    color: #ddd;
    border-radius: 10px;
    position: absolute;
    top: 0;
    right: 0;
  }

</style>