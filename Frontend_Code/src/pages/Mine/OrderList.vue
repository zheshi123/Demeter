<template>
  <div class="app-content" :style="{height: listHeight + 'px'}">
    <div class="title"></div>
    <!--  搜索栏  -->
    <div v-if="selectedOrderIndex === '2' && isLock === '1' " class="search-bar">近期法会</div>
    <div v-else-if="selectedOrderIndex === '4' && isLock === '1' " class="search-bar">敬神功德</div>
    <div v-if="isLock === '0'" class="search-bar" @click="changeOrderType">
      <span>{{ orderTypeList[selectedOrderIndex] }}</span>
      <img src="../../assets/images/searchBar-icon.png" v-bind:class="[isShowOrderTypeList?'order-type-unfold':'order-type-fold']">
    </div>

    <!--  列表无订单  -->
    <div class="noData" :style="{height: listHeight + 'px'}" v-if="orderList.length === 0">
      <img class="noDatap" src="../../assets/images/order_null.png"/>
      <div class="noDataw">您没有相关的订单</div>
    </div>

    <!--  列表有订单  -->
    <div v-else>
      <!--  订单列表  -->
      <div class="order_container">
        <div class="order_block" v-for="order in orderList" :key="order.orderId" @click="go2detail(order)">
          <div class="perItem">

            <!--    订单类型icon   -->
            <div class="inline">
              <div class="perItemName">
                <div v-if="order.orderType === 1 || order.orderType === 2" class="light">
                  <div class="orderType" :class="order.css_grey === 1? 'grey':''">{{order.orderType === 1 ? '种植险': '养殖险'}}</div>
                </div>
              </div>

              <!--    订单状态   -->
              <div class="orderStatus" :class="order.css_grey === 1? 'grey':''">{{formatOrderStatus(order)}}</div>
            </div>

            <!--    订单第二行    -->
            <div class="inline" style="margin-top: 8px">
              <div v-if="order.orderType === 3 || order.orderType === 4" class="bookName" :class="order.css_grey === 1? 'grey':''">{{order.orderBigType}}</div>
              <div v-else class="bookName" :class="order.css_grey === 1? 'grey':''">{{order.orderName}}</div>
              <div class="orderPrice" :class="order.css_grey === 1? 'grey':''">
                <span style="font-size: 14px; margin-right: -4px">￥</span>
                {{order.orderPrice/100}}</div>
            </div>

            <div v-if="order.orderType === 3" class="placeName">{{order.orderName}}</div>

            <!--    订单第三行    -->
            <div class="inline_1">
              <div v-if="order.orderType === 2" class="bookTime" :class="order.css_grey === 1? 'grey':''">保单有效期 {{order.showBeginTime}} 至 {{order.showEndTime}}</div>
              <div v-if="order.orderType === 3 && order.showEndTime !== null" class="bookTime" :class="order.css_grey === 1? 'grey':''">
              </div>
            </div>

            <!-- 门票按钮判断 不展示退款进度按钮 -->
            <div class="button_container">
              <div class="button" @click="showDialog($event,1, order)">查看详情</div>
              <div v-if="order.orderStatus === 1" class="button-blue" @click="requestSpotsOrderPay($event, order)">立即支付</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--  搜索弹窗  -->
    <div class="price-detail-mask" v-bind:style="{display: (isShowOrderTypeList? 'block':'none')}" v-on:click="changeOrderType" @touchmove.prevent></div>
    <div class="orderTypeList" v-bind:style="{display: (isShowOrderTypeList? 'block':'none')}">
      <div v-if="status === '2' || status === '3' " class="cell" v-for="(item,index) in orderSelectedList" :key="index" v-on:click="orderTypeClick(index)">
        <div v-bind:class="{'order-item-selected': selectedOrderIndex === index}">{{item}}</div>
        <div v-bind:class="{'checkbox-selected': selectedOrderIndex === index}"></div>
      </div>

      <!-- 全量筛选列表  -->
      <div v-if="status === '0' || status === '1' || status === '4'"  class="cell" v-for="(item,index) in orderTypeList" :key="index" v-on:click="orderTypeClick(index)">
        <div v-bind:class="{'order-item-selected': selectedOrderIndex === index}">{{item}}</div>
        <div v-bind:class="{'checkbox-selected': selectedOrderIndex === index}"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrderList',
  data () {
    return {
      order: [],
      isMore: false,
      isLock: 0, // 0-不展示类型筛选列表
      orderList:[
        {
          orderBigType: "种植险",
          orderBookTime: "2021-06-25 10:55:02",
          orderName: "果树虫害险",
          orderNo: "D2106251055026940001",
          orderPrice: 5000000,
          orderShowStatus: 14,
          orderStatus: 18,
          orderType: 2,
          orderUserId: "13511111111",
          showBeginTime: "2021-06-25",
          showEndTime: "2022-06-25",
          ticketNum: 1
        },
        {
          orderBigType: "种植险",
          orderBookTime: "2021-06-25 10:55:02",
          orderName: "果树虫害险",
          orderNo: "D2106251055026940001",
          orderPrice: 5000000,
          orderShowStatus: 14,
          orderStatus: 18,
          orderType: 2,
          orderUserId: "13511111111",
          showBeginTime: "2021-06-25",
          showEndTime: "2022-06-25",
          ticketNum: 1
        },{
          orderBigType: "种植险",
          orderBookTime: "2021-06-25 10:55:02",
          orderName: "果树虫害险",
          orderNo: "D2106251055026940001",
          orderPrice: 5000000,
          orderShowStatus: 14,
          orderStatus: 18,
          orderType: 2,
          orderUserId: "13511111111",
          showBeginTime: "2021-06-25",
          showEndTime: "2022-06-25",
          ticketNum: 1
        },{
          orderBigType: "种植险",
          orderBookTime: "2021-06-25 10:55:02",
          orderName: "果树虫害险",
          orderNo: "D2106251055026940001",
          orderPrice: 5000000,
          orderShowStatus: 14,
          orderStatus: 18,
          orderType: 2,
          orderUserId: "13511111111",
          showBeginTime: "2021-06-25",
          showEndTime: "2022-06-25",
          ticketNum: 1
        },
      ],
      orderNums: 0, // 列表总数
      // orderTypeList:["全部订单","预约入观","近期法会","祈福灯","敬神功德"],
      orderTypeList:["全部保单","待核保","待处理","售后",'已完成'],
      orderSelectedList:["全部保单","待核保","待处理","售后",'已完成'],
      pageSize: 10,
      pageNo: 1,
      isShowOrderTypeList:false,
      listHeight:'',
      selectedOrderIndex:0, //选中类型
      type: 0, // 0全部 1门票 2法会
      status: 0, //0-所有 1-待支付 2-待出行 3-退款/售后 4-已完成
    }
  },
  created() {
    this.status = this.$route.query.status ? this.$route.query.status : '0'
    this.selectedOrderIndex = this.$route.query.type ? this.$route.query.type : '0'
    this.isLock = this.$route.query.lock ? this.$route.query.lock : '0'
    console.log('this.status',this.status)
    console.log('this.status',typeof (this.status))
    console.log('this.selectedOrderIndex', this.selectedOrderIndex)
    console.log('this.isLock',this.isLock)
    console.log("========== OrderList created =========")
    // this.queryOrderList()
  },
  activated() {
    console.log("========== OrderList activated =========")
    // this.queryOrderList()
  },
  mounted() {
    // window.addEventListener("scroll",this.scrollHandle)
    this.listHeight = document.documentElement.clientHeight;
  },
  methods: {
    // 打开/关闭业务类型列表
    changeOrderType:function (){
      this.isShowOrderTypeList = !this.isShowOrderTypeList
    },

    orderTypeClick(index){
      this.orderList = []
      this.orderNums = 0
      this.selectedOrderIndex = index
      this.pageNo = 1
      this.changeOrderType()
    },

    //再次预定
    reservationAgain: function (event,orderType) {
      event.stopPropagation()
      let status = parseInt(orderType)
      switch (status) {
        case 1:
          this.$router.push('/BookingInstructions')
          break
        case 2:
          this.$router.push('/RecentCommunionList')
          break
        case 3:
          this.$router.push('/LightIntro')
          break
        case 4:
          this.$router.push('/Donation')
          break
      }
    },

    // 进入详情页
    go2detail: function (order) {
        this.$router.push('/OrderDetail')
    },

    // 判断该门票订单是否能查询退款详情
    showRefund (order) {
      if (order.orderStatus === 4 && order.orderPrice !== 0 && order.payTime !== '') {
        return true
      } else if (order.orderStatus === 5 || order.orderStatus === 11 || order.orderStatus === 14) {
        return true
      } else {
        return false
      }
    },

    // 滚动翻页
    infinite: function (done) {
      let vm = this
      if (vm.isMore) {
        vm.$refs.myscroller.finishInfinite(true)
        setTimeout(() => {
          done(true)
          vm.infinite = undefined
        }, 1500)
        return
      }
      setTimeout(() => {
        vm.queryOrderList().then(() => {
          if (!vm.isMore) {
            setTimeout(() => {
              done()
            })
          } else {
            vm.$refs.myscroller.finishInfinite(true)
          }
        })
      }, 1000)
    },

    // 查询订单列表
    // queryOrderList () {
    //   // 隐藏祈福灯后，敬神功德的index需要手动修复为4
    //   const option = {
    //     pageNo: this.pageNo,
    //     pageSize: this.pageSize,
    //     // orderType: this.selectedOrderIndex,
    //     orderType: this.selectedOrderIndex == 3 ? 4: this.selectedOrderIndex,
    //     orderQueryType: this.status
    //   }
    //   return queryOrderList(option).then(res => {
    //     console.log('1',res)
    //     this.orderNums = res.data.orderNums
    //     let list = res.data.orderList
    //
    //     if (list.length < 10) {
    //       this.isMore = true
    //     }
    //     for (let i in list) {
    //       //判断某个状态的订单样式置灰
    //       if(list[i].orderType === 1){
    //         if (list[i].orderStatus === 3  || list[i].orderStatus === 4 ) {
    //           list[i].css_grey = 1
    //         } else {
    //           list[i].css_grey = 0
    //         }
    //       }else{
    //         if (list[i].orderShowStatus === 1 || list[i].orderShowStatus === 7 || list[i].orderShowStatus === 8 ) {
    //           list[i].css_grey = 1
    //         } else {
    //           list[i].css_grey = 0
    //         }
    //       }
    //     }
    //     this.pageNo ++
    //     let list2 = this.orderList
    //     this.orderList = list2.concat(list)
    //     console.log('orderList',this.orderList)
    //   })
    // },

    // 截取时间
    subTime: function (timeStr) {
      if (timeStr && timeStr.length > 10) {
        return timeStr.substring(0, 16)
      }
    },

    // 截取门票时间
    subTicketTime: function (showBeginTime, showEndTime) {
      let tempTime
      const beginDate = showBeginTime.split(' ')
      const endDate = showEndTime.split(' ')
      tempTime = (beginDate[1].substring(0, 5) == '00:00' && endDate[1].substring(0, 5) == '23:59') ? beginDate[0] : beginDate[0] + ' ' + beginDate[1].substring(0, 5) + '-' + endDate[1].substring(0, 5)
      return tempTime
    },

    // 定义订单状态
    formatOrderStatus:function (orderInfo) {
      let orderStatusStr = ''
      if(orderInfo.orderType === 1){
        //判断是门票
        let status = parseInt(orderInfo.orderStatus)
        switch (status) {
          case 1:
            orderStatusStr = '待支付'
            break
          case 2:
            orderStatusStr = '预订成功' // 已支付
            break
          case 3:
            orderStatusStr = '已取消' // 超时未支付
            break
          case 4:
            orderStatusStr = '已取消' // 超时未支付
            break
          case 5:
          case 15:
            orderStatusStr = '退款中'
            break
          case 6:
            orderStatusStr = '支付中'
            break
          case 7:
            orderStatusStr = '预订失败'// 付款失败
            break
          case 8:
          case 16:
            orderStatusStr = '退款失败'
            break
          case 9:
            orderStatusStr = '已完成'
            break
          case 10:
            orderStatusStr = '出票中'
            break
          case 11:
            orderStatusStr = '出票失败'
            break
          case 12:
            orderStatusStr = '退票中'
            break
          case 13:
            orderStatusStr = '退票失败'
            break
          case 14:
            orderStatusStr = '退票成功'
            break
          case 17:
            orderStatusStr = '已退款'   //todo 区分观庙门票已退款与已取消 4-已取消 17-已退款
            break
        }
      }else{
        let status = parseInt(orderInfo.orderShowStatus)
        switch (status) {
          case 0:
            orderStatusStr = '待支付'
            break
          case 1:
            orderStatusStr = '已取消'
            break
          case 2:
            orderStatusStr = '支付失败'
            break
          case 3:
            orderStatusStr = '支付中'
            break
          case 4:
            orderStatusStr = '出票中'
            break
          case 5:
            orderStatusStr = orderInfo.orderType === 4 ? "支付成功" : "预定成功"
            break
          case 6:
            orderStatusStr = '预订失败'
            break
          case 7:
            orderStatusStr = '已取消'
            break
          case 8:
            orderStatusStr = '已取消'
            break
          case 9:
            orderStatusStr = '退款中'
            break
          case 10:
            orderStatusStr = '退款完成'
            break
          case 11:
            orderStatusStr = '退款失败'
            break
          case 12:
            orderStatusStr = '退款中'
            break
          case 13:
            orderStatusStr = '退款失败'
            break
          case 14:
            orderStatusStr = '已完成'
            break
        }
      }
      return orderStatusStr
    }
  },
}
</script>

<style scoped>
.app-content{
  background: rgba(237,237,237,0.90);
}

.search-bar{
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 40px;
  font-weight: 400;
  background: #FFFFFF;
  z-index: 400;
  border-bottom: 0.5px solid rgba(0,0,0,.1);
  font-family: PingFangSC-Regular;
  font-size: 16px;
  color: #007AAA;
  font-weight: 400;
}
.noData {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
}

.noDatap {
  width: 180px;
  height: 180px;
  position: relative;
  margin-top: 150px;
}

.noDataw {
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: rgba(0,0,0,0.80);
  text-align: center;
  font-weight: 400;
  margin-top: 40px;
}

.order_container{
  padding-top: 46px;
}

.ticketIcon{
  width: 24px;
  height: 24px;
  margin: -3px 8px 0 0;
  background-image: url('../../assets/images/ticketIcon.png');
  background-size: cover;
}
.communionIcon{
  width: 24px;
  height: 24px;
  margin: -3px 8px 0 0;
  background-image: url('../../assets/images/communionIcon.png');
  background-size: cover;
}
.lightIcon{
  width: 24px;
  height: 24px;
  margin: -3px 8px 0 0;
  background-image: url('../../assets/images/lightIcon.png');
  background-size: cover;
}
.donationIcon{
  width: 24px;
  height: 24px;
  margin: -3px 8px 0 0;
  background-image: url('../../assets/images/donationIcon.png');
  background-size: cover;
}
.order_block{
  border-radius: 8px;
  margin: 16px;
  background: #FFFFFF;
}
.perItem{
  padding:12px 16px;
}
.perItemName{
  display: flex;
  flex-direction: row;
}
.orderType{
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #000000;
  letter-spacing: 0;
  font-weight: 400;
}
.orderStatus{
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: rgba(0,0,0,0.80);
  text-align: right;
  font-weight: 400;
}
.inline{
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.bookName{
  font-family: PingFangSC-Semibold;
  font-size: 16px;
  color: #000000;
  letter-spacing: 0;
  font-weight: 600;
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 77%;
}
.orderPrice{
  font-family: HelveticaNeue-Bold;
  font-size: 20px;
  color: #E65C2E;
  letter-spacing: 0;
  font-weight: 700;
}
.inline_1{
  margin: 4px 8px 0 0;
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: rgba(0,0,0,0.60);
  font-weight: 400;
  display: flex;
  flex-direction: row;
  margin-top: 8px;
  line-height: 20px;
  flex-grow: 1;
}
.button_container{
  margin-top: 8px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end
}

.button-blue,
.button{
  background: #FFFFFF;
  border-radius: 22px;
  font-family: PingFangSC-Regular;
  font-size: 12px;
  letter-spacing: 0;
  text-align: center;
  font-weight: 400;
  margin-left: 8px;
  width: 70px;
  height: 23px;
  line-height: 23px;
}

.button{
  border: 1px solid rgba(0,0,0,0.40);
  color: rgba(0,0,0,0.60);
}

.button-blue{
  border:1px solid #007AAA;
  color:#007AAA;
}

.price-detail-mask {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 200;
  overflow: hidden;
}

.orderTypeList{
  width: 92%;
  position: fixed;
  top:40px;
  left:0;
  background: #FFFFFF;
  z-index: 400;
  padding: 0 16px;
}
.cell{
  display: flex;
  flex-direction: row;
  height: 40px;
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #000000;
  font-weight: 400;
  line-height: 40px;
  border-bottom: 0.5px solid rgba(0,0,0,0.10);
}

.order-item-selected{
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #007AAA;
  font-weight: 400;
  display: inline-block;
  width: 91%;
}

.checkbox-selected{
  margin: 13px 0;
  width: 14px;
  height: 6px;
  display: inline-block;
  border: 1px solid #007AAA;
  border-width: 0 0 1px 1px;
  transform: rotate(-45deg);
  -ms-transform: rotate(-45deg);
  -moz-transform: rotate(-45deg);
  -webkit-transform: rotate(-45deg);
  -o-transform: rotate(-45deg);
  vertical-align: baseline;
}

.order-type-unfold{
  height: 7px;
  width: 11px;
  margin-left: 5px;
  transform: rotate(180deg);
}

.order-type-fold{
  height: 7px;
  width: 11px;
  margin-left: 5px;
  transform: rotate(0deg);
}

.placeName{
  margin: 8px 8px 0 0;
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: rgba(0,0,0,0.60);
  font-weight: 400;
}
.grey{
  color:rgba(0,0,0,0.4);
}

.light{
  display: flex;
  flex-direction: row
}
</style>

