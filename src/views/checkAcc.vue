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
    <div class="container pt-lg-md" >
      <div class="row justify-content-center">
        <div class="col-lg-5">
          <card type="danger" shadow
                header-classes="bg-white pb-5"
                body-classes="px-lg-5 py-lg-5"
                class="border-0">
            <template>
                <div class="text-center mb-3" style="font-family: 'Comic Sans MS';font-size:20px;color:whitesmoke">
                  <i class="el-icon-add-location"></i><large> Password Recovery :)</large>
                  <br/><br/>
                </div>
              <div class="text-center mb-3" style="font-family: 'Comic Sans MS';font-size:15px;color:whitesmoke">
                <large>Step 1 - Check your Account</large>

              </div>
<!--                <div class="btn-wrapper text-center">-->
<!--                    <base-button type="neutral">-->
<!--                        <img slot="icon" src="img/icons/common/github.svg">-->
<!--                        Github-->
<!--                    </base-button>-->

<!--                    <base-button type="neutral">-->
<!--                        <img slot="icon" src="img/icons/common/google.svg">-->
<!--                        Google-->
<!--                    </base-button>-->
<!--                </div>-->
            </template>
            <template>

              <form role="form"
                    ref="checkForm"
                    :model="checkForm">
<!--                <base-input alternative-->
<!--                            class="mb-3"-->
<!--                            placeholder="username"-->
<!--                            addon-left-icon="ni ni-circle-08"-->
<!--                            v-model="registerForm.username">-->
<!--                </base-input>-->
                <base-input alternative
                            class="mb-3"
                            placeholder="E-mail address"
                            addon-left-icon="ni ni-email-83"
                            v-model="checkForm.email">
                </base-input>
                <p class="mailHint" v-if="mailHint" style="font-family: 'Comic Sans MS';color: #2bffc6">
                  {{ hint }}
                </p>
<!--                <base-input alternative-->
<!--                            type="password"-->
<!--                            placeholder="password"-->
<!--                            addon-left-icon="ni ni-lock-circle-open"-->
<!--                            v-model="registerForm.password">-->
<!--                </base-input>-->
<!--                <base-input alternative-->
<!--                            type="password"-->
<!--                            placeholder="Enter password again"-->
<!--                            addon-left-icon="ni ni-lock-circle-open"-->
<!--                            v-model="registerForm.repeatPassword">-->
<!--                </base-input>-->
<!--                <p class="mailHint" v-if="passwordHint" style="font-family: 'Comic Sans MS';color: #2bffc6">The two passwords are different,-->
<!--                  please re-enter</p>-->


<!--                <base-input alternative-->
<!--                            type="text"-->
<!--                            placeholder="verify-code"-->
<!--                            addon-left-icon="ni ni-tag"-->
<!--                            v-model="registerForm.verification">-->

<!--                </base-input>-->
<!--                <p class="mailHint" v-if="verificationHint" style="font-family: 'Comic Sans MS';color: #2bffc6">Please input correct the verification code</p>-->
<!--                <base-identify-->
<!--                    @click.native="newCode()"-->
<!--                    :identifyCode="identifyCode">-->
<!--                </base-identify>-->
                <!-- <div class="text-muted font-italic">
                    <small>password strength:
                        <span class="text-success font-weight-700">strong</span>
                    </small>
                </div> -->
<!--                <base-checkbox style="color: whitesmoke" class="mb-3" v-model="checked">-->
<!--                                    <span>I agree to the-->
<!--                                      <a href="http://www.ccopyright.com.cn/" target="_blank" style="color: whitesmoke"><b> privacy policy. </b></a>-->
<!--                                    </span>-->
<!--                </base-checkbox>-->



                <div class="text-center">
                  <base-button type="default" class="my-2"
                               @click.native.prevent="checkAccount()" data-toggle="modal"
                               data-target="#modal-notification"
                               style="background-color: green">
                    Check Account
                  </base-button>
                  </div>
                <div class="text-lg-center">
                  <br/>
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
    <!--        <div class="modal fade" id="modal-notification" tabindex="-1" role="dialog" aria-labelledby="modal-notification" aria-hidden="true">-->
    <!--            <div class="modal-dialog modal-danger modal-dialog-centered modal-" role="document">-->
    <!--                <div class="modal-content bg-gradient-danger">-->

    <!--                    <div class="modal-header">-->
    <!--                        <h6 class="modal-title" id="modal-title-notification">Your attention is required</h6>-->
    <!--                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">-->
    <!--                            <span aria-hidden="true">×</span>-->
    <!--                        </button>-->
    <!--                    </div>-->

    <!--                    <div class="modal-body">-->

    <!--                        <div class="py-3 text-center">-->
    <!--                            <i class="ni ni-bell-55 ni-3x"></i>-->
    <!--                            <h4 class="heading mt-4">You should read this!</h4>-->
    <!--                            <p>A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>-->
    <!--                        </div>-->

    <!--                    </div>-->

    <!--                    <div class="modal-footer">-->
    <!--                        <button type="button" class="btn btn-white">Ok, Got it</button>-->
    <!--                        <button type="button" class="btn btn-link text-white ml-auto" data-dismiss="modal">Close</button>-->
    <!--                    </div>-->

    <!--                </div>-->
    <!--            </div>-->
    <!--        </div>-->
<!--    <modal :show.sync="canRegister"-->
<!--           gradient="dark"-->
<!--           modal-classes="modal-danger modal-dialog-centered">-->
<!--      <h6 slot="header" class="modal-title" id="modal-title-notification"-->
<!--          style="color:antiquewhite;font-family:'Comic Sans MS'">Note</h6>-->

<!--      <div class="py-3 text-center">-->
<!--        <i class="ni ni-button-play ni-3x"></i>-->
<!--        <h4 class="heading mt-4" style="color:antiquewhite;font-family:'Comic Sans MS'">-->
<!--          <br/> Nope !-->
<!--          <br/>-->
<!--          <br>Please fill in the form as instructed :)</h4>-->

<!--      </div>-->

<!--      <template slot="footer">-->
<!--        <base-button type="white" @click="canRegister=false">Ok, Got it!</base-button>-->
<!--        &lt;!&ndash;                <base-button type="link"&ndash;&gt;-->
<!--        &lt;!&ndash;                                text-color="white"&ndash;&gt;-->
<!--        &lt;!&ndash;                                class="ml-auto"&ndash;&gt;-->
<!--        &lt;!&ndash;                                @click="canRegister=false">&ndash;&gt;-->
<!--        &lt;!&ndash;                    关闭&ndash;&gt;-->
<!--        &lt;!&ndash;                </base-button>&ndash;&gt;-->
<!--      </template>-->
<!--    </modal>-->
  </section>
</template>
<script>
import axios from 'axios'
import BaseIdentify  from '../components/BaseIdentify.vue'
import Modal from '../components/Modal'
import _ from 'lodash'
export default {
  components: {
    BaseIdentify,
    Modal
  },
  watch: {
    checkForm: {
      handler(newValue, oldValue) {
        const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

        if(reg.test(newValue.email)) {
          this.mailHint = 0
        //  console.log('ok')
        } else {
          this.mailHint = 1
        //  console.log('wrong')
        }
      },
      deep: true
    },
    mailHint: function(newValue) {
      // if the format of email is not correct
      if(this.mailHint === 1) {
        this.hint = 'Please input the Email in the correct format'
      }
    }
  },
  data() {
    return {
      // code: this.refreshCode(4),
      checkForm: {
      //   username: '',
        email: ''
        // password: '',
        // repeatPassword: '',
        // verification: ''
      },
      mailHint: 0,
      hint: '',
    }
  },
  methods: {
    // refreshCode(length) {
    //   let randomNum = 0
    //   while(randomNum < Math.pow(10, length - 1)) {
    //     randomNum = Math.floor(Math.random() * Math.pow(10, length))
    //   }
    //   return randomNum.toString()
    // },
    // newCode() {
    //   this.code = this.refreshCode(4)
    // },
    checkAccount(){
      //合理的邮箱
      if(!this.mailHint && this.checkForm.email!='') {
        let mail = this.checkForm.email
        console.log(this.checkForm.email)
        axios.post('http://127.0.0.1:3000/users/getAccount',{email:this.checkForm.email}).then(res=>{
          console.log(res)
          //找到了该用户
          if(res.data.status){
                this.$message.success('Successfully Retrieve your account :)')
            localStorage.setItem('Account_change_password',mail)
             this.$router.push({path:'/changePassword'})
          }else{
            this.$message.error('User Not Found :(')
            this.checkForm.email=''
          }
        })
      }

      else{
        console.log('invalid format')
        this.$message.error('Invalid Email :( Please try again')
        this.checkForm.email=''
      }
    },
    goBack() {
      this.$router.push({path:'/login'})
    },
    // createAccount() {
    //   for(let item in this.registerForm) {
    //     if(this.registerForm[item] === '') {
    //       this.canRegister = true
    //     }
    //   }
    //   if(!this.checked){
    //     this.$message.warning('Please select Agree to the privacy policy')
    //   }
    //   if(this.checked&&this.canRegister === false && this.usedName === false && this.passwordHint === false && this.verificationHint === false) {
    //     this.$message.success('Register Success :)')
    //     this.$store.dispatch('user/register', this.registerForm).then(data => {
    //       console.log(data)
    //       this.$store.dispatch('user/getInfo')
    //           .then(info => {
    //             console.log(info)
    //           })
    //       this.$router.push({ path:'/', query: this.otherQuery })
    //     })
    //   } else {
    //     this.canRegister = true
    //   }
    //
    // },
    // whetherRegister() {
    //   this.$store.dispatch('user/whetherRegister', this.registerForm.mail)
    //       .then(value => {
    //         if(value) {
    //           this.mailHint = 2
    //         }
    //       }).catch(err => {
    //     this.mailHint = 0
    //   })
    // }
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
