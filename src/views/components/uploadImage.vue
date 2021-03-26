<template>
  <div class="container mt--300 text-center">
    <br/><br/><br/><br/><br/><br/><br/><br/>
    <i class="ni ni-cloud-download-95 " style="color: whitesmoke"></i><h3  class="display-3" style="font-family: 'Comic Sans MS';
    font-size: 30px;
    color:navajowhite">
      --Upload your picture here--<br/>
    </h3>
    <br/>
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
    <base-button type="danger" class="upload-button" @click="submitUpload">upload</base-button>
    <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
    <span></span>
    <base-button type="dark" class="upload-button" @click="goback">back</base-button>

    <image-detail v-for="(info,index) in imageInfo" :key="index" :tableData="info"></image-detail>
  </div>

</template>
<script>
import axios from 'axios'
import ImageDetail from '../components/imageDetail'
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
      imageInfo: []
    };
  },
  created: function() {
    const info = JSON.parse(localStorage.getItem('user-info'))
    this.params = { 'mail': info.mail }
  },
  methods: {
    handleRemove(file, fileList) {

    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    submitUpload() {
      // console.log(this.params)
      this.$refs.uploadForm.submit()
      const info = JSON.parse(localStorage.getItem('user-info'))
      const formData = new FormData()
      const headerConfig = { headers: { 'Content-Type': 'multipart/form-data' } }
      this.fileList.forEach(file => {
        formData.append('files', file)
      })
      //加上用户的邮箱
      formData.append('mail', info.mail)

      //发送请求
      axios.post('http://127.0.0.1:3000/users/multiUpload', formData, headerConfig).then(res => {
        const data = res.data.data //从后端接收到的相关信息
        console.log(res)
        if(data.upload) {
          this.$message({
            type: 'success',
            //上传成功
            message: 'Upload success :)'
          })
          console.log(data)
          data.imageInfos.forEach(imageInfo => {
            this.imageInfo.push([
              {
                name: 'Picture ID',
                value: imageInfo._id
              },
              {
                name: 'Picture name',
                value: imageInfo.title
              },
              {
                name: 'IPFS hash_value',
                value: imageInfo.ipfs_hash
              },
              {
                name: 'Owner',
                value: imageInfo.owner
              },
              {
                name: 'Transaction ID',
                value: imageInfo.otherInfo.id
              },
              {
                name: 'Transaction type',
                value: imageInfo.otherInfo.operation
              }
            ])
          })
          return this.$store.dispatch('user/getInfo')
        }
        //上传失败
        else {
          if(typeof(data['message']) !== 'undefined') {
            this.$message({
              type:'error',
              message:data['message']+'<br/><br/><div> Fail to upload :( </div>',
              dangerouslyUseHTMLString: true,
            })

          }
          else {
             this.$message.error('Upload Failure')
          }
        }

      })
      .then(data => {

      })
      .catch(err => {
        console.log(err)
      })
    },

    beforeUpload(file) {
      this.fileList.push(file)
    },
    goback() {
      //返回上一个页面
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="scss" scoped>
.upload-button{
  margin: 2vh auto;
}
</style>
