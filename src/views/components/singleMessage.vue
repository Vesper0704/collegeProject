<template>
  <div class="container" style="font-family: 'Comic Sans MS'; background-color: indianred">
    <div class="row message-wrapper">
      <div class="thumbnail-wrapper col-md-3">
        <img :src="imgurl" alt="" class="thumbnail" />
      </div>
      <div class="message-content col-md-9">
        <h4 style="color:indianred">{{ title }}</h4>
        <p class="brief-introduction">{{ brief_intro }}</p>
        <div class="public-time">
          <span ><i class="ni ni-compass-04"></i></span>&nbsp;
          <p class="date">  {{date}}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    imgurl: String,
    url: String,
    date: String,
    title: String,
    brief_intro: String,
    id: String
  }
}
</script>
<style lang="scss" scoped>
.date {
  display: inline-block;
}
.thumbnail {
  width: 100%;
  height: 13vh;
  margin-top: 1vh;
}
.message-wrapper {
  background: #fff;
  border-bottom: 1px solid rgb(201, 199, 199);
  padding: 15px;
}
</style>
