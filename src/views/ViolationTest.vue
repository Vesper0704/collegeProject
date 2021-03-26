<template>
  <div class="profile-page">
    <section class="section-profile-cover section-shaped my-1">
      <div class="shape shape-style-2 shape-dark alpha-4" style="height:1000px">

        <span></span>
        <span></span>
        <span></span>
        <span></span>

      </div>
    </section>
  <div class="container mt--300 text-center">
    <i class="ni ni-cloud-download-95 " style="color: whitesmoke"></i>
    <h3  class="display-3" style="font-family: 'Comic Sans MS';
    font-size: 30px;
    color:navajowhite">
    --Violation Check--<br/>
    </h3>
<!--    <h5 style="color: rosybrown ;font-family: AppleGothic;font-size:20px ">-->
<!--      Please notice that your behavior is under supervision AND<br>-->
<!--      any form of infringement will be perceived.</h5>-->
    <base-checkbox style="color: whitesmoke" class="mb-3" v-model="checked">
        <span>I agree to the
          <a  @click="handlePolicy"   style="color: whitesmoke"><b> supervision policy. </b></a>
        </span>
    </base-checkbox>

    <!--    上传按钮 el-upload组件-->
    <el-upload
        :before-upload="beforeUpload"
        action="#"
        ref="uploadForm"
        :auto-upload="false"
        list-type="picture-card"
        :file-list="fileList"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
    >
      <i class="el-icon-add-location"></i>
    </el-upload>

    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
    <br/>

    <base-button style="font-family: 'Comic Sans MS'" type="danger" class="upload-button"
                 @click="submitUpload">check</base-button>
    <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
    <span></span>
    <base-button type="primary"  style="font-family: 'Comic Sans MS'" class="upload-button" @click="goback">back</base-button>

    <image-detail v-for="(info,index) in imageInfo" :key="index" :tableData="info"></image-detail>
  </div>
  </div>

</template>
<script>
import axios from 'axios'
import ImageDetail from './components/imageDetail'
export default {
  components: {
    ImageDetail
  },
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      fileList: [],
      params: {},
      imageInfo: [],
      checked:false
    };
  },
  created: function() {
    const info = JSON.parse(localStorage.getItem('user-info'))
    this.params = { 'mail': info.mail }
  },
  methods: {
    handlePolicy(){
      this.$message.warning({
        message:`Please notice that your behavior is under supervision<br/> AND
                 any form of infringement will be perceived`,
        dangerouslyUseHTMLString:true
      })
    },
    handleRemove(file, fileList) {

    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    submitUpload() {
      // console.log(this.params)
      console.log(this.fileList.length);


      if(!this.checked){
      return  this.$message.error({
          message:`Please select the Supervision Policy `,
          dangerouslyUseHTMLString:true
        })
      }

      this.$refs.uploadForm.submit()

      const info = JSON.parse(localStorage.getItem('user-info'))
      console.log(info.mail);

      const formData = new FormData()
     // formData.append('test','test')
      // const headerConfig = { headers: { 'Content-Type': 'multipart/form-data' } }
      console.log(this.fileList)
      this.fileList.forEach(file => {
       // console.log(file)
        console.log('add');
        formData.append('files', file)
      })
      //加上用户的邮箱
      formData.append('mail', info.mail)

      //console.log(formData)
      console.log(formData.getAll('mail'));
      console.log(formData.getAll('files'));
     let checkLength = formData.getAll('files').length
      if(checkLength===0 || checkLength>=2 ){
        this.fileList=[]
        return  this.$message.error({
          message:`Please choose only 1 image at one time :)`,
          dangerouslyUseHTMLString:true
      })}


      axios.post('http://localhost:3000/users/violationCheck',formData)
      .then(res=>{
        let data = res.data
        if(!data.violation){
          this.$message.success('You have permission to register the copyright :)')
        }else{
          this.$message.error({
            message:'Permission Denied :( <br/> You will be punished for infringement if you INSIST !',
            dangerouslyUseHTMLString:true
          })
        }
        this.fileList=[]
      })

    },




    beforeUpload(file) {
      this.fileList.push(file)
    },
    goback() {
      //返回上一个页面
      this.$router.push({path:'/'})
    }
  }
}
</script>
<style lang="scss" scoped>
.upload-button{
  margin: 2vh auto;
}
</style>
