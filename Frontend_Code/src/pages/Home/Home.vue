<template>
  <div class="app-content" >
<!-- 未登录的 -->
	<div class="head-Login">
		<img src="../../assets/images/home_banner.jpeg" style="width:100%;height:162px">
		<ul class="head-menu" >
			 <li style="text-align:center" v-for="(item,index) in menuList" :key="index" @click="toActivity(index)">
				<img style="width:35px;height:30px;" :src="item.imgurl">
				<p style="margin-top: 2px;">{{item.title}}</p>
			</li>
		</ul>

    <div style="margin-left:16px;font-family: PingFangSC-Medium;font-size: 16px;margin-top:20px;display:flex;justify-content:flex-start;margin-bottom: 10px">
      产量预测
    </div>
    <div class="">
      <div id="myChart1" :style="{width: '350px', height: '300px'}"></div>
    </div>

    <van-row>
      <van-col span="24">
        <van-divider />
        <div class="title"></div>
      </van-col>
      <van-col span="24">
        <van-col span="12">
          <van-icon name="https://scpic.chinaz.net/Files/pic/icons128/7707/Dr9.png" size="90" />
        </van-col>
        <van-col span="12">
          <div class="Tdate">2020-8-15</div>
          <div class="Ttemperature">当前：30℃</div>
          <div class="TtemperatureRange">湿度：60%-70%</div>
        </van-col>
      </van-col>
      <br /><br /><br /><br />
    </van-row>

    <van-divider />

		<div style="margin-left:16px;font-family: PingFangSC-Medium;font-size: 16px;margin-top:16px;display:flex;justify-content:flex-start">
			保单购买
		</div>
    <div class="img-introduce">
      <div class="sub_Bigimg">
         <!-- swiper1 Main -->
        <swiper class="swiper-top" :options="swiperOptionTop" ref="swiperTop">
          <swiper-slide v-for="(val, idx) in swiperData" :key="idx">
            <img :src="val.imgUrl" alt="">
          </swiper-slide>
        </swiper>
      </div>
			<div class="sub-contanter-leftimgs">
				<!-- swiper2 Thumbs -->
        <swiper class="swiper-thumbs" :options="swiperOptionThumbs" ref="swiperThumbs">
          <swiper-slide v-for="(val, idx) in swiperData" :key="idx">
            <img :src="val.imgUrl" alt="">
            <div class="activied-frame"></div>
          </swiper-slide>
        </swiper>
			</div>
		</div>
		<div class="detail-info" >
			<div class="introduction" v-bind:class="fold ? 'fold': 'unfold'" :title="introduce" ref="desc" v-html="introduce"></div>
          <div class="show-text" v-if="show">
            <div class="show-full" v-if="fold" @click="showFull">
              <img src="../../assets/images/downicon.png" class="arrow-image" />
              <div class="show-text">展开</div>
            </div>
            <div class="show-full" v-else @click="showFull" style="margin-top:0">
              <img src="../../assets/images/upicon.png" class="arrow-image" />
              <div class="show-text">收起</div>
            </div>
          </div>
      <div v-else style="width: 100%; height: 15px"></div>
		</div>
  </div>

<!-- 已登录的 -->
	<div class="head-unLogin"></div>
</div>
</template>

<script>
import {Solar} from 'lunar-javascript'
import {queryLampList} from "../../api/system";
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
		name: 'Home',
    data: function () {
    	return {
        scrollNum: 0, // 宜忌滚动最小值
        scrollWidth: 0, // 屏幕宽度
    	  allDate:[],
        pageSize: 20,
        pageNo: 1,
        list: [],
        lampTempleData: [],
        bannlist:[],
        orderUserId: this.$store.getters.userID,
			  textheight:'',
			  fold: false,
			  show: false,
			  introduce: '',
        year: '',
        month: '',
        day: '',
        dayJi: '', // 忌
        dayYi: '', // 宜
        daoYear: 0, // 道历年份
        gongli: '', // 公里年份
        ganzhiYear: '', // 干支年年份
        nongliDate:'',//干支年日期
        dateInfo:'',
        // menuList: [{imgurl:require('../../assets/images/menu_01.png'),title:"门票预约"},{imgurl:require('../../assets/images/menu_02.png'),title:"法会活动"},{imgurl:require('../../assets/images/menu_03.png'),title:"敬神功德"},{imgurl:require('../../assets/images/menu_04.png'),title:"祈福灯"}]
        menuList: [{imgurl:require('../../assets/images/conducting-data.png'),title:"质量监控"},{imgurl:require('../../assets/images/forecast.png'),title:"产量预测"},{imgurl:require('../../assets/images/consulting.png'),title:"保单购买"}],
        swiperOptionTop: {
          loop: true,
          loopedSlides: 3, // looped slides should be the same
          spaceBetween: 10,
          autoplay: {
            delay: 2500,
            disableOnInteraction: false
          },
        },
        swiperOptionThumbs: {
          direction: 'vertical',
          loop: true,
          loopedSlides: 3, // looped slides should be the same
          spaceBetween: 10,
          centeredSlides: true,
          slidesPerView: 'auto',
          touchRatio: 0.2,
          slideToClickedSlide: true
        },
        swiperData: [
          {id: 1, imgUrl: require('../../assets/images/banner2.jpeg')},
          {id: 2, imgUrl: require('../../assets/images/banner1.jpeg')},
          {id: 3, imgUrl: require('../../assets/images/banner3.jpeg')}
        ],
		}
		},
    mounted() {
      this.drawLine();
      this.$nextTick(() => {
        const swiperTop = this.$refs.swiperTop.swiper
        const swiperThumbs = this.$refs.swiperThumbs.swiper
        swiperTop.controller.control = swiperThumbs
        swiperThumbs.controller.control = swiperTop
      })
    },
		created () {
      // JS动态修改微信浏览器导航标题 ---待发布测试
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
      this.scrollWidth = document.body.clientWidth || window.innerWidth || document.documentElement.clientWidth
      this.scrollNum = (this.scrollWidth - 90) / 9
          //获取阳历日期
      var d = new Date()
      this.year = d.getFullYear().toString()
      //该方法获取的月份从0开始，因此加1
      this.month = (d.getMonth() + 1).toString()
      this.day = d.getDate().toString()
      this.gongli = this.year + '年' + this.month + '月' + this.day + '日'
      // this.month= d.getMonth() + 1 < 10? "0"+(d.getMonth() + 1).toString():(d.getMonth() + 1).toString();
      // this.day = d.getDate()  < 10? "0"+d.getDate().toString():d.getDate().toString();
      // this.dateInfo =  year +'-'+ month+'-' + day;
      // console.log(month.toString());

      if(!this.$store.getters.userID){
        this.userId = ''
      }else {
        this.userId = this.$store.getters.userID
      }

      //获取阴历日期  干支年
      // let dates = calendar.solar2lunar(this.dateInfo)
      const date = Solar.fromYmd(this.year, this.month, this.day).getLunar()
      this.daoYear = (d.getFullYear() + 2697).toString()
      this.ganzhiYear = date.getYearInGanZhi()
      this.nongliDate = date.getMonthInChinese() + '月' + date.getDayInChinese()
      const dayYi = date.getDayYi()
      const dayJi = date.getDayJi()
      dayYi.forEach((item, index) => {
        if (index < dayYi.length - 1) {
          this.dayYi = this.dayYi + item + ' '
        } else {
          this.dayYi = this.dayYi + item
        }
      })
      dayJi.forEach((item, index) => {
        if (index < dayJi.length - 1) {
          this.dayJi = this.dayJi + item + ' '
        } else {
          this.dayJi = this.dayJi + item
        }
      })
      		// 创建页面时调用
      this.introduce = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;农业银保通致力于为广大农户提供农业资讯、农作物监控、保险、贷款服务。通过传感器采集大量物理数据，AI模块不断地学习和预测如何通过控制光线，调节水分养分生产出最优质的产品，并拍摄每株植物的相机图像，以监控其健康状况。\n<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;通过机器视觉原理以及IOT设备对数据进行收集处理，直观了解每一头动物的健康状况。机器学习可以通过音频数据分析来正确识别用其他方法不可检测的疾病。\n'
      // this.queryLampTempleData(),
      if(this.orderUserId){this.initLampList()}
    },

		methods: {
      drawLine(){
        let myChart1 = this.$echarts.init(document.getElementById('myChart1'))
        // 绘制图表
        myChart1.setOption({
          tooltip: {},
          legend: {
            data: ['桃树', '水稻', '板栗', '小麦']
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              name: '桃树',
              type: 'line',
              stack: '总量',
              data: [120, 132, 101, 134, 90, 230, 210]
            },
            {
              name: '水稻',
              type: 'line',
              stack: '总量',
              data: [220, 182, 191, 234, 290, 330, 310]
            },
            {
              name: '板栗',
              type: 'line',
              stack: '总量',
              data: [150, 232, 201, 154, 190, 330, 410]
            },
            {
              name: '小麦',
              type: 'line',
              stack: '总量',
              data: [320, 332, 301, 334, 390, 330, 320]
            },
          ]
        });
      },

      //展开
			 showFull () {
        		this.fold = !this.fold
      		},
      //跳转相应功能界面
      toActivity:function (index) {
			  switch(index){
          case 0:
            if (!this.$store.getters.userID) {
              this.$router.push({name: 'Login', query: {nextPage: 'BookingInstructions'}})
              return
            } else {
              this.$router.push('BookingInstructions')
            }
            break
          case 1:
            if (!this.$store.getters.userID) {
              this.$router.push({name: 'Login', query: {nextPage: 'RecentCommunionList'}})
              return
            } else {
              this.$router.push('RecentCommunionList')
            }
            break
          case 2:
            if (!this.$store.getters.userID) {
              this.$router.push({name: 'Login', query: {nextPage: 'Donation'}})
              return
            } else {
              this.$router.push('InsuranceList')
            }
            break
        }
      },
      goToDetail(item){
        this.$store.commit('SET_PAGE_INFO', item)
        this.$router.push({ path: './BlessLampPackDetails'})
        console.log(item)
      },

      checkLight() {
        this.$router.push('/MyLightList')
      },
      initLampList:function () {
        let params = {
          // providerId: 234,
          orderUserId: this.$store.getters.userID,
          pageNo: this.pageNo,
          pageSize: this.pageSize,
        }
        queryLampList(params).then(res => {
          if (res.errcode === '00') {
            this.list = res.data.list
            console.log('list' ,this.list)
            for(let i=0;i<this.list.length;i++){
              var beginDate= (/\d{4}-\d{1,2}-\d{1,2}/g.exec(this.list[i].beginTime)).toString()
              var endDate= (/\d{4}-\d{1,2}-\d{1,2}/g.exec(this.list[i].endTime)).toString()
              this.allDate.push({
                beginDate:beginDate,
                endDate:endDate
                })
            }
          console.log(this.allDate)
          }
        }).catch(res => {
          // this.loading(false)
          console.log('list error:',res)
        })

      },
		},
		watch: {
      		'introduce': function () {
       		 this.$nextTick(function () {
          // 判断介绍是否超过五行
          if (!this.$refs.desc) {
            console.log('desc null')
            return
          }
		  let descHeight = window.getComputedStyle(this.$refs.desc).height.replace('px', '')
		//   this.textheight
          console.log('descHeight:' + descHeight)
          console.log('如果 descHeight 超过' + (50) + '就要显示展开按钮')
          if (descHeight > 50) {
            console.log('超过了五行')
            // 显示展开收起按钮
            this.show = true
            this.fold = true
          } else {
            // 不显示展开收起按钮
            this.show = false
            this.fold = false
          }
        }.bind(this))
      }
    },
    components: {
      swiper,
      swiperSlide,
    }
	}

</script>

<style scoped>
.td_inline span{
  display:block;
  overflow:hidden;
  white-space:nowrap;
  text-overflow:ellipsis;
  width:200px;
}
.banner-container {
  height: 210px;
  position: relative;
}

.banner-container >>> .mint-swipe-indicators {
  bottom: 5px;
  position: absolute;
}

.banner-container >>> .mint-swipe-indicator {
  width:6px;
  height:6px;
  background: rgba(0,0,0,0.10);
  opacity: 0.8;
  /*padding: 2px 8px;*/
}
.banner-container >>> .mint-swipe-indicator.is-active{
  background: #007AAA;
  width:6px;
  height:6px;
  border-radius: 3px;
}
.app-content{
  width: 100%;
  height: 100%;
  padding-bottom: 75px;
}
.outer {
  padding-bottom: 75px;
}
.head-Login{
	/* position: relative; */
	width: 100%;
}
ul{
	margin: 0;
	padding: 0;
}
p{
	margin: 0;
	padding: 0;
	font-family: PingFangSC-Regular;
	font-size: 12px;
	color: rgba(0,0,0,0.80);
	letter-spacing: 0;
}
.menu-li{
	text-align: center;
}
.menu-p{
	margin-top: 2px;
}
.menu-img{
	width:30px;height:30px;
}
.head-menu{
	padding-top: 16px;
	display: flex;
	justify-content: space-around;
	list-style: none;
	margin:0 auto;
	align-items: center;
}
.head-notice{
	margin: 16px 16px;
	background: #FFFFFF;
	box-shadow: 0 0 8px 0 rgba(0,0,0,0.10);
	border-radius: 8px;
	list-style: inside;
	padding: 12px 10px;
}
.imgicon{
  width:calc(100vh - 30px);
}

.notice-li{
	font-family: PingFangSC-Regular;
	font-size: 14px;
	color: rgba(0,0,0,0.80);
	overflow: hidden;
 	text-overflow: ellipsis;
 	white-space: nowrap;

}
.head-date{
	width: calc(100vh - 32);
  height: 115px;
	margin: 10px 16px;
	position:relative;
  overflow:hidden;
	box-shadow: 0 -2px 4px 0 rgba(0,0,0,0.10);
	/* box-shadow: 0 -2px 4px 0 rgba(0,0,0,0.10); */
	border-radius: 8px;
}
.head-date-img{
    position: absolute;
    display: block;
    min-width: 100%;
    min-height: 100%;
	  top: 50%;
    left: 50%;
    transform:translate(-50%,-50%);
}
.tipclass{
  width:100%;
  height:136px;
  margin:10px 16px;
  background-color:white;
  width: calc(100% - 32px);
}
.date-content{
	margin-top: -18px;
  background: #FFFFFF;
  box-shadow: 0 0 8px 0 rgba(0,0,0,0.1);
  border-radius: 7px;
  padding: 15px 10px
}
.img-introduce{
	margin: 8px 16px;
	/* background-color: lightblue; */
	height: 130px;
	position: relative;
}
.sub_Bigimg{
	position: absolute;
	width: 80%;
	height: 130px;
	left: 0;
	top: 0;
	/* background-color: red; */
}
.sub-contanter-leftimgs{
	top: 0;
	right: 0;
	bottom: 0;
	width: 17.5%;
	margin-left: 8px;
	position: absolute;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
  overflow: hidden;
}
 .detail-info {
    width: 100%;
    height: fit-content;
  }

 .introduction {
    width: calc(100vw - 32px);
    margin: 8px 16px 0px 16px;
    height: fit-content;
    font-family: PingFangSC-Regular;
    text-align: left;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 25px;
	  font-size: 14px;
	  color: rgba(0,0,0,0.60);
	  letter-spacing: 0;
  }

   .detail-info .fold {
    -webkit-line-clamp: 4;
  }
  .detail-info .unfold {
    -webkit-line-clamp: 500;
  }
  .show-full {
    width: 68px;
    height: 20px;
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #666666;
    text-align: left;
    display: flex;
    justify-content: flex-end;
	  position: absolute;
	  margin-top: -21px;
    right: 16px;
	  background-image: linear-gradient(90deg, rgba(255,255,255,0.00) 0%, #FFFFFF 19%, #FFFFFF 98%);
  }
  .show-text {
    width: fit-content;
	  font-family: PingFangSC-Regular;
	  font-size: 14px;
	  color: #007AAA;
  }
  .arrow-image {
    width: 14px;
    height: 14px;
    margin: 2px 3px;
  }
  .my-light-title{
    margin-left:16px;
    font-size: 16px;
    margin-top:15px;
    justify-content:flex-start;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #000000;
    line-height: 22px;
  }
  .my-light-exanmine{
    right:18px;
    position: absolute;
    margin-top:18px;
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.6);
    line-height: 17px;
  }
  .my-light{
    margin: 12px 16px;
    box-shadow: 0 0 8px 0 rgba(0,0,0,0.10);
    border-radius: 8px;
    width: 92%;
    height: fit-content;

  }
  .light-title{
    margin-left: 16px;
    margin-top: 16px;
    margin-bottom: 10px;
    font-size: 20px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #000000;
    max-width: 70%;
    width: fit-content;
  }
  .light-tik{
    width: 14px;
    height: 14px;
    margin-top: 22px;
    right: 77px;
    position: absolute;
  }
  .light-Pic{
    width: 80px;
    height: 80px;
    margin: 12px 12px 17px 16px;
  }
  .light-state{
    margin-left: 3px;
    margin-top: 19px;
    font-size: 14px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #007AAA;
    right: 30px;
    position: absolute;
  }
  .my-light-down {
    display: flex;
    flex-direction: row;
    position: relative;
  }
  .my-light-detail {
    padding-top: 4px;
  }
  .my-light-address{
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #000000;
    line-height: 22px;
    margin-bottom: 4px;
  }
  .my-light-time{
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.6);
    line-height: 20px;
    margin-bottom: 4px;
  }
  .my-light-right{
    min-width: 150px;
    margin-bottom: 36px;
  }
  .my-light-people{
    margin-top: -2px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.6);
    line-height: 20px;
    margin-bottom: 8px;

  }
  .my-light-check{
    bottom: 12px;
    right: 16px;
    position: absolute;
    width: 70px;
    height: 23px;
    background: #007AAA;
    box-shadow: 0px 0px 8px 0px rgba(0, 122, 170, 0.2);
    border-radius: 22px;
    text-align: center;
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #FFFFFF;
    line-height: 23px;
  }

  .date-yi {
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #000000;
    word-wrap:break-word;
    word-break:normal;
    line-height: 17px;
    margin-left: 5px
  }

  td:first-child{
	  margin:0;
	  padding:0;
	  width:23.3%;
	  font-family: PingFangSC-Regular;
	  font-size: 14px;
	  color: rgba(0,0,0,0.60);
    text-align: left;
  }
  td:last-child{
	width:58.3%;
	font-family: PingFangSC-Regular;
	font-size: 14px;
	color: #000000;
  }
  tr{
	  margin-bottom: 8px;
  }
  div::-webkit-scrollbar {
    display: none;
  }

  /* swiper 带缩略图的轮播图样式 */
  .swiper-top img {
    width: 100%;
	  height: 130px;
  }

  .swiper-thumbs {
    /* margin-top: -90px; */
  }

  .swiper-thumbs .swiper-slide,
  .swiper-thumbs img {
    width:100%;
    height:60px;
  }

  .swiper-thumbs .swiper-slide {
    /* margin-bottom: 8px !important; */
  }

  .swiper-thumbs .swiper-slide-active .activied-frame {
    width: 100%;
    height: 60px;
    border-radius: 4px;
    border: 1px solid #007AAA;
    box-sizing: border-box;
    position: absolute;
    top: 0;
    left: 0;
  }

  .date-area {
    margin: 10px 16px;
    background-color: white;
    width: calc(100% - 32px);
  }

  .date-detail {
    background-image: url('../../assets/images/bg-top.png');
    background-size: 100% 100%;
    border-radius: 8px;
    height: 65px;
    text-align: right;
    padding: 10px;
    box-shadow: 0 0 8px 0 rgba(0,0,0,0.1);
  }

  .date-yi-content {
    display: flex
  }

.title {
  color: rgb(19, 152, 241);
  text-align: center;
}

div {
  text-align: center;
}

img {
  width: 100%;
  max-width: 100%;
}

/* 主显示区样式 一下分别为：日期 ， 当前温度 ， 今日温度范围  */
.Tdate {
  font-size: 18px;
}

.Ttemperature {
  font-size: 25px;
}

.TtemperatureRange {
  font-size: 17px;
}

/* 次显示区样式  以下分别为： 日期  ， 对应日期天气温度 ， 对应日期温度范围 */
.date {
  font-size: 15px;
}

.temperature {
  font-size: 20px;
}

.temperatureRange {
  font-size: 13px;
}

</style>
