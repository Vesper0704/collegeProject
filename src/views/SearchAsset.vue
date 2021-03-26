<template>
  <section class="section section-shaped section-lg my-1">
    <div class="shape shape-dark bg-gradient-default">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
    <div class="container pt-lg-md" width="200px">
      <div class="row justify-content-center">
        <div class="col-lg-5">
          <card type="danger" shadow
                header-classes="bg-white pb-5"
                body-classes="px-lg-5 py-lg-5"
                class="border-0"

                style="width: 600px">
            <template>
              <div class="text-center mb-3" style="font-family: 'Comic Sans MS';font-size:20px;color:whitesmoke">
                <i class="ni ni-folder-17"></i><large> Asset Research</large>
                <br/><br/>
              </div>
              <div class="text-center mb-3" style="font-family: 'Comic Sans MS';font-size:15px;color:whitesmoke">
                <large>Enter the IPFS Hash to retrieve the Image</large>
              </div>

              <div class="text-center mb-3" style="font-family: 'Comic Sans MS';font-size:15px">
              <i class="ni ni-send" style="color: darkseagreen"></i>
                <a href="http://localhost:5001/webui" target="_blank" style="color:darkseagreen"><b>
                  Learn More about IPFS?</b></a>
              </div>

            </template>
            <br/>


            <template>

              <form role="form"
                    ref="checkForm"
                    :model="checkForm">

                <base-input alternative
                            class="mb-3"
                            placeholder="hash required"
                            addon-left-icon="ni ni-compass-04"
                            v-model="checkForm.hash">
                </base-input>
                <br/>
                <div class="text-center">
                  <base-button type="default" class="my-2"
                               @click.native.prevent="search()" data-toggle="modal"
                               data-target="#modal-notification"
                               style="background-color: green">
                    Search
                  </base-button>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <base-button type="primary"
                               class="my-xl-1"
                               @click="goBack()"
                               style="background-color:grey ">
                    Back</base-button>
                </div>
              </form>
            </template>
          </card>
        </div>

      </div>
    </div>

  </section>
</template>
<script>
import axios from 'axios'
import BaseIdentify  from '../components/BaseIdentify.vue'
import Modal from '../components/Modal'
import {login} from "@/api/user";

export default {
  components: {
    BaseIdentify,
    Modal
  },
  data() {
    return {
      imageInfo:[],
      // code: this.refreshCode(4),
      checkForm: {
        //   username: '',
        hash: ''
        // password: '',
        // repeatPassword: '',
        // verification: ''
      },

    }
  },
  methods: {
    search(){
      console.log(this.checkForm.hash)
      let hash = this.checkForm.hash
      if(hash.startsWith('Qm')) {
        axios.post('http://localhost:3000/search', {hash: hash})
             .then(res => {
              if(res.data.state){
               console.log('success');
               console.log(res.data.data.url)
               var imageInfo=res.data.data
               var res=[]

            res.push([
              {
                name: 'Picture ID',
                value: imageInfo._id
              },
              {
                name: 'Picture name',
                value: '.png'
              },
              {
                name: 'IPFS hash_value',
                value: imageInfo.ipfs_hash
              },
              {
                name: 'url',
                value: imageInfo.url
              }])

          localStorage.setItem('imageInfo',JSON.stringify(res))

          this.$router.push('/ShowPic')

          }else{
            this.$message.error('Fail to Retrieve the Resource')
          }
        })
      }
      else{
        this.$message.error('Wrong Format of the Input :(')
      }
    },
  goBack() {
      this.$router.push({path:'/'})
    },

  }
};
</script>
<style lang="scss">
.mailHint {
  font-size: 0.8em;
  margin: 0 auto;
  color: #a2233b;
}
</style>
