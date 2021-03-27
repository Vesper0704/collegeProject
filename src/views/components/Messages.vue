<template>
  <section class="container message mt--300">
    <div class="row justify-content-md-center">
      <single-message
          style="font-family: 'Comic Sans MS'"
      v-if="articles.length>=1" v-for="(article, index) in articles"
      :key="index"
      :title="article.title"
      :imgurl="article.cover"
      :url="url"
      :date="article.date.toString()"
      :brief_intro="article.brief"
      :id="article._id"
      >
      </single-message>
      <single-message v-else-if="articles.length===0"
                      brief_intro="No Notifications yet"
                      :date=currentDate
                      :imgurl="noUrl">
      </single-message>
      <base-button type="danger" @click="goback" class="goback-button">Return</base-button>
    </div>
  </section>
</template>
<script>
import SingleMessage from './singleMessage.vue';
import TinyMise from './tinymise'
export default {
  components: {
    SingleMessage,
    TinyMise
  },
  created: function() {
    const info = JSON.parse(localStorage.getItem('user-info'))
    this.articles = info.articles
    console.log('ARTICLES:' + info.articles)
    // this.articles.push({
    //   title: 'Infringement detected :(',
    //   brief: 'Copyright violation has occurred ——  ',
    //   date: new Date(),
    //   cover: 'http://localhost:3000/avatar/avatar.svg',
    //   to: 'drj',
    //   author: 'Copyright System',
    // });
  },
  data() {
    return {
      noUrl: `http://localhost:3000/avatar/avatar.svg`,
      currentDate:new Date(),
      title: "",
      imgurl: "",
      url: "",
      date: "",
      brief_intro: "",
      articles: []
    }
  },
  methods: {
    goback() {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="scss" scoped>
.message {
  .message-wrapper {
    padding: 2rem;
    border-radius: .25rem;
    box-shadow: 0 15px 35px rgba(50,50,93,.1), 0 5px 15px rgba(0,0,0,.07);
    .image-wrapper {
      .message-image {
        width: 30%;
        float: right;
      }
    }
  }
}
.goback-button {
    margin-top: 10vh;
  }
</style>
