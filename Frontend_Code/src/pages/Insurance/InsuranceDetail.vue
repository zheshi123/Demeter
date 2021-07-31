<template>
  <div class="insurance-detail">
    <div class="part part-one">
      <div class="title">保障计划</div>
      <div class="part-item" v-for="(item, index) in guaranteeData" :key="index">
        <div>{{item.title}}</div>
        <div>{{item.count}}</div>
      </div>
      <div class="price">首月16.85元，次月16.85元/月起</div>
    </div>
    <div class="part part-two">
      <div class="title">产品特色</div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        guaranteeData: [
          {id: 1, title: '自然灾害理赔额度', count: '10万元'},
          {id: 2, title: '自然灾害理赔额度', count: '10万元'},
          {id: 3, title: '自然灾害理赔额度', count: '10万元'},
          {id: 4, title: '自然灾害理赔额度', count: '10万元'},
          {id: 5, title: '自然灾害理赔额度', count: '10万元'},
        ],
      }
    }
  }
</script>

<style scoped>
.insurance-detail {
  width: 100%;
  height: 100%;
  background-color: #f7f6f6;
  overflow: hidden;
}

.part {
  margin: 16px;
  padding: 12px;
  margin-bottom: 12px;
  background-color: #fff;
}

.part .title {
  font-size: 18px;
  font-weight: bold;
}

.part-one .part-item {
  color: #333;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
}

.part-one .price {
  font-weight: bold;
  margin-top: 10px;
  padding-top: 4px;
  border-top: 1px solid #eee;
}

</style>