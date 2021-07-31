<template>
  <div class="insurance-list">
    <div class="tab-wrap">
      <div class="tab-item" :class="{'actived': activiedTabId === item.id}" v-for="(item, index) in tabList" :key="index" @click="handleTab(item.id)">{{item.name}}</div>
    </div>
    <div class="main-content">
      <div class="list-wrap" v-for="(item, index) in itemList" :key="index" v-show="activiedTabId === 0 || item.id == activiedTabId">
        <div class="type-name">{{item.typeName}}</div>
        <div class="list-item" v-for ="(innerItem, innerIndex) in item.list" :key="innerIndex" @click="handleItem">
          <div class="part-left">
            <img class="pic-main" :src="innerItem.imgUrl" alt="">
          </div>
          <div class="part-right">
            <div class="title">{{innerItem.title}}</div>
            <div class="sub-title">{{innerItem.subTitle}}</div>
            <div class="price">{{innerItem.initPrice}}<span>{{innerItem.priceUnit}}</span></div>
            <img class="pic-arrow" src="../../assets/rightArrow.png" alt="">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'InsuranceList',
    data() {
      return {
        activiedTabId: 0,
        tabList: [
          {id: 0, name: '全部'},
          {id: 1, name: '保险1'},
          {id: 2, name: '保险2'}
        ],
        itemList: [
          {id:1, typeName: '保险1', list: [
            {
            imgUrl: require('../../assets/OrderBgPic.png'),
            title: '平安奋斗无忧·百万医疗险 ',
            subTitle: '奋斗一路无忧，大病小病平安相伴',
            initPrice: '209',
            priceUnit: '元起',
          },
          {
            imgUrl: require('../../assets/OrderBgPic.png'),
            title: '平安奋斗无忧·百万医疗险 ',
            subTitle: '奋斗一路无忧，大病小病平安相伴',
            initPrice: '209',
            priceUnit: '元起',
          },
          {
            imgUrl: require('../../assets/OrderBgPic.png'),
            title: '平安奋斗无忧·百万医疗险 ',
            subTitle: '奋斗一路无忧，大病小病平安相伴',
            initPrice: '209',
            priceUnit: '元起',
          },
          ]},
          {id: 2, typeName: '保险2', list: [
            {
            imgUrl: require('../../assets/OrderBgPic.png'),
            title: '平安奋斗无忧·百万医疗险 ',
            subTitle: '奋斗一路无忧，大病小病平安相伴',
            initPrice: '209',
            priceUnit: '元起',
          },
          {
            imgUrl: require('../../assets/OrderBgPic.png'),
            title: '平安奋斗无忧·百万医疗险 ',
            subTitle: '奋斗一路无忧，大病小病平安相伴',
            initPrice: '209',
            priceUnit: '元起',
          },
          {
            imgUrl: require('../../assets/OrderBgPic.png'),
            title: '平安奋斗无忧·百万医疗险 ',
            subTitle: '奋斗一路无忧，大病小病平安相伴',
            initPrice: '209',
            priceUnit: '元起',
          },
          ]}
        ],
      }
    },
    methods: {
      // tab页切换
      handleTab(id) {
        if(id === this.activiedTabId) return
        this.activiedTabId = id
        console.log('11:', this.activiedTabId)
      },
      // 前往详情页
      handleItem() {
        this.$router.push('/InsuranceDetail')
      }
    },
  }
</script>

<style scoped>
.insurance-list {
  width: 100%;
  height: 100%;
}

.tab-wrap {
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
}

.tab-wrap .tab-item {
  width: 90px;
  text-align: center;
  position: relative;
}

.tab-wrap .tab-item.actived {
  font-size: 18px;
  font-weight: bold;
}

.tab-wrap .tab-item.actived::before {
  content: '';
  width: 16px;
  height: 4px;
  background-color: #0989F0;
  border-radius: 5px;
  position: absolute;
  left: 0;
  right: 0;
  bottom: -10px;
  margin: auto;
  z-index: 1;
}

.main-content {
  width: 100%;
  background-color: #f7f6f6;
  overflow: hidden;
}

.main-content .list-wrap {
  margin: 12px 16px;
  background-color: #fff;
  overflow: hidden;
}

.main-content .list-wrap .type-name {
  font-size: 18px;
  font-weight: bold;
  margin: 16px 0 4px 16px;
}

.main-content .list-wrap .list-item {
  display: flex;
  padding: 12px;
  margin-bottom: 10px;
}

.main-content .list-wrap .list-item .part-left {
  margin-right: 10px;
}

.main-content .list-wrap .list-item .pic-main {
  width: 90px;
  height: 90px;
  vertical-align: bottom;
}

.main-content .list-wrap .list-item .title {
  font-size: 16px;
  font-weight: bold;
}

.main-content .list-wrap .list-item .sub-title {
  font-size: 12px;
  color: #666;
}

.main-content .list-wrap .list-item .price {
  color: #0989F0;
  font-weight: bold;
}

.main-content .list-wrap .list-item .price span {
  font-size: 10px;
  font-weight: normal;
}

.main-content .list-wrap .list-item .part-right {
  position: relative;
  width: 100%;
}

.main-content .list-wrap .list-item .price {
  position: absolute;
  left: 0;
  bottom: 0;
}

.main-content .list-wrap .list-item .pic-arrow {
  width: 10px;
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
}

</style>