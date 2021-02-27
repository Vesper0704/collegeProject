<template>
  <section class="section section-shaped section-lg my-1">
    <div class="shape shape-primary bg-gradient-default">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>

    <div class="text-center">
      <base-button type="primary"
                   style=" background-color:indianred;font-family: 'Comic Sans MS';font-size: 16px"
                   class="my-4"
      @click="showUrl">
        Retrieval Result
      </base-button>
    </div>

    <div class="text-center">
      <img :src="url" width="400px"/>
    </div>
    <br/>
    <div align="center" style="font-family: 'Comic Sans MS';color: coral;font-size: 25px">
      <i class="ni ni-sound-wave" style="color:coral"></i> Info
    </div>
    <div align="center">
  <image-detail v-for="(info,index) in imageInfo" :key="index" :tableData="info" style="width: 80%;color: #2b2b58"></image-detail>
    </div>
    <div class="text-center">
      <base-button type="primary" style=" background-color:coral;font-family: 'Comic Sans MS';font-size: 16px" class="my-4" @click.native.prevent="back">BACK</base-button>
    </div>
  </section>
</template>

<script>
import  ImageDetail from './components/imageDetail'
export default {

name: "ShowPic",
  methods:{
  back(){
    localStorage.setItem('imageInfo','undefined')
    this.$router.go(-1)
  },
    showUrl(){
    console.log(this.imageInfo[0][3].value)
    }
  },

  data(){
  return{
    imageInfo:JSON.parse(localStorage.getItem('imageInfo')),
    url:JSON.parse(localStorage.getItem('imageInfo'))[0][3].value
    //url:`http://localhost:8080/ipfs/${JSON.parse(localStorage.getItem('imageInfo'))[0][2].value}`
  }
  },
  components:{
  ImageDetail
  }

}
</script>

<style scoped>

</style>
