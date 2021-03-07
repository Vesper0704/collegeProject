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
                class="border-0"
          style="width:500px">
            <template>
              <div class="text-center mb-3" style="font-family: 'Comic Sans MS';font-size:20px;color:whitesmoke">
                <large>Password Recovery :)</large>
                <br/><br/>
              </div>
              <div class="text-center mb-3" style="font-family: 'Comic Sans MS';font-size:15px;color:whitesmoke">
                <large>Step 2 - Reset your Password</large>

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
                            placeholder="Please input your new password"
                            addon-left-icon="ni ni-key-25"
                            v-model="checkForm.password">
                </base-input>
                <p class="mailHint" v-if="passwordHint" style="font-family: 'Comic Sans MS';color: #2bffc6">
                  {{ hint }}
                </p>
                <base-input alternative
                            class="mb-3"
                            placeholder="Double Check"
                            addon-left-icon="ni ni-key-25"
                            v-model="checkForm.password2">
                </base-input>
                <p class="mailHint" v-if="duplicate" style="font-family: 'Comic Sans MS';color: #2bffc6">
                  {{ duplicateHint}}
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
                               @click.native.prevent="modifyPassword()" data-toggle="modal"
                               data-target="#modal-notification"
                               style="background-color: green">
                    Reset Password
                  </base-button>
                </div>
                <div class="text-lg-center">
                  <br/>
                  <base-button type="primary"
                               class="my-xl-1"
                               @click="goBack()"
                               style="background-color:grey ">
                    <i class="ni ni-bold-left"></i> Previous </base-button>
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

        if( newValue.password!='' && newValue.password.length<=10 && newValue.password.length>=6) {
             this.passwordHint = 0
          //  console.log('ok')
        } else {
          this.passwordHint = 1
          //  console.log('wrong')
        }

        if(this.checkForm.password!=this.checkForm.password2){

          this.duplicate=1
          //console.log(this.duplicate)
          this.duplicateHint= 'Please make sure you enter the Same password TWICE'
        }else{
          this.duplicate=0
          this.duplicateHint=''
        }
      },
      deep: true
    },
    passwordHint: function(newValue) {
      // if the format of email is not correct
      if(this.passwordHint === 1) {
        this.hint = 'Please try another password of length 6--10'
      }
    },
    // duplicateHint: function(newValue){
    //   if(this.duplicate === 1) {
    //     this.duplicateHint= 'Please make sure you enter the Same password TWICE'
    //   }
    // }
  },
  data() {
    return {
      // code: this.refreshCode(4),
      checkForm: {
        //   username: '',
        password: '',
        password2:''
        // password: '',
        // repeatPassword: '',
        // verification: ''
      },
      passwordHint: 0,
      hint: '',

      duplicate:0,
      duplicateHint:''
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
    modifyPassword() {
      if(this.checkForm.password===''||this.passwordHint){
        this.$message.error('The length of password should be of [6,10]. Please try again:(')
      }else if(this.duplicate){
        this.$message.error('Please make sure the SAME password is given:(')
      }else{
      if(!this.duplicate && !this.passwordHint) {
        let email = localStorage.getItem('Account_change_password')
        let password = this.checkForm.password

        axios.post('http://127.0.0.1:3000/users/changePassword',{username:email,NewPassword:password})
            .then(res=>{
              console.log(res)
              if(res.data.status){
                this.$message.success('Successfully Reset the password :)')
                localStorage.setItem('Account_change_password','undefined')
                setTimeout(()=>{
                  this.$router.push({path:'/login'})
                },500)
              }else{
                this.$message.error('Something went wrong :(')
              }
      })
      }
    }
      },
    goBack() {
      this.$router.push({path:'/checkAcc'})
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
