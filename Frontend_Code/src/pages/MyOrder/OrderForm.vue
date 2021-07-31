<template>
  <div class="app-content">
    <!-- 顶部背景 -->
    <img src="../../assets/images/home_banner.jpeg" style="width:100%;height:162px">
    <!--申请人信息-->
    <div class="applicant-container">
      <div class="applicant-title">申请人信息</div>
      <div class="cell">
        <label class="label" for="applicantName">姓名</label>
        <input id="applicantName" class="applicant-info-input"
          placeholder="请输入"
          v-model="form.applicantName"
        />
      </div>
      <div class="cell">
        <label class="label" for="applicantPhone">手机号码</label>
        <input id="applicantPhone" class="applicant-info-input"
          placeholder="请输入"
          type="tel" maxlength="11" v-model="form.applicantPhone"
        />
      </div>
      <div class="cell">
        <label class="label" for="id">身份证号</label>
        <input id="id" class="applicant-info-input"
          placeholder="请输入"
          maxlength="18"
          v-model="form.applicantID"
        />
      </div>
    </div>
    <!-- 理赔定损 -->
    <div class="applicant-container">
      <div class="applicant-title">工作人员定损记录</div>
      <div class="cell">
        <label class="label" for="applicantName">姓名</label>
        <input id="applicantName" class="applicant-info-input"
          placeholder="请输入"
          v-model="form.applicantName"
        />
      </div>
      <div class="cell">
        <label class="label" for="applicantPhone">手机号码</label>
        <input id="applicantPhone" class="applicant-info-input"
          placeholder="请输入"
          type="tel" maxlength="11" v-model="form.applicantPhone"
        />
      </div>
      <div class="cell">
        <label class="label" for="id">身份证号</label>
        <input id="id" class="applicant-info-input"
          placeholder="请输入"
          maxlength="18"
          v-model="form.applicantID"
        />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'LightOrder',
  data: function () {
    return {
      form: {
        applicantName: '',
        applicantPhone: '',
        applicantID: ''
      }
    }
  },
  created () {
    document.title = '祈福灯';
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
    goTosDetail(){
      this.$router.push({ path: './LightOrderDetail'})
    }
  }

}
</script>
<style scoped>
.app-content{
  width: 100%;
  height: 100%;
  padding-bottom: 300px;
  /* background-color:#F3F4F5; */
}

.applicant-container {
  margin: 16px 12px 0;
  background-color: #FFFFFF;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 16px 12px 8px;
}

.applicant-container .applicant-title {
  font-size: 16px;
  color: #000000;
  font-weight: bold;
  font-family: PingFangSC-Medium, PingFang SC;
  display: inline-block;
  z-index: 2;
}

.applicant-container .cell {
  line-height: 48px;
  display: flex;
  font-weight: 400;
}

.applicant-container .cell:not(:last-of-type){
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.applicant-container .cell .label {
  width: 68px;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.6);
  font-family: PingFangSC-Regular, PingFang SC;
}

.applicant-container .cell .applicant-info-input {
  font-size: 14px;
  color: #000000;
  margin-left: 20px;
  flex-grow: 1;
  font-family: PingFangSC-Regular, PingFang SC;
}
</style>
