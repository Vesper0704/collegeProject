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

  <image-detail v-for="(info,index) in imageInfo" :key="index" :tableData="info"></image-detail>
  </section>
</template>

<script>
import  ImageDetail from './components/imageDetail'
export default {

name: "ShowPic",
  data(){
  return{
    imageInfo:JSON.parse(localStorage.getItem('imageInfo'))
  }
  },
  components:{
  ImageDetail
  }

}
</script>

<style scoped>

</style>
