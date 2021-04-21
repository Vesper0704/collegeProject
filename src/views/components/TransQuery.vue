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
                <i class="ni ni-folder-17"></i><large> Transaction Query</large>
                <br/><br/>
              </div>

              <div class="text-center mb-3" style="font-family: 'Comic Sans MS';font-size:15px;color:whitesmoke">
                <large>Enter the Transaction ID to Query the Details</large>
              </div>

              <div class="text-center mb-3" style="font-family: 'Comic Sans MS';font-size:15px">
                <i class="ni ni-send" style="color: darkseagreen"></i>
                <a href="https://www.bigchaindb.com/developers/guide/key-concepts-of-bigchaindb/" target="_blank" style="color:darkseagreen"><b>
                  Learn More about Transaction</b></a>
              </div>

            </template>
            <br/>


            <template>

              <form role="form"
                    ref="checkForm"
                    :model="checkForm">

                <base-input alternative
                            class="mb-3"
                            placeholder="Transaction ID required"
                            addon-left-icon="ni ni-compass-04"
                            v-model="checkForm.transId">
                </base-input>
                <br/>
                <div class="text-center">
                  <base-button type="default" class="my-2"
                               @click.native.prevent="search()"
                               data-toggle="modal"
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
import BaseIdentify  from '../../components/BaseIdentify.vue'
import Modal from '../../components/Modal'

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
        transId: ''
      },

    }
  },
  methods: {
    search(){
      console.log(this.checkForm.transId)
      let id = this.checkForm.transId
      if(id.length>20) {
        // axios.get(`http://localhost:9984/api/v1/transactions/${id}`)
        //     .then(res=>{
        //       console.log(res);
        //       console.log(typeof res.status);
        //       if(res.status != 200){
        //         this.$message.error('Fail to Retrieve the Transaction !')
        //       }
        //     })
        window.open(`http://localhost:9984/api/v1/transactions/${id}`,'_blank')
        this.checkForm.transId=''
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
