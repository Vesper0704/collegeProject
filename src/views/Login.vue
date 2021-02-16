<template>
    <section class="section section-shaped section-hero my-0" style="background-color: #600a3e">

        <div class="container pt-lg-md" style="height:600px">
            <div class="row justify-content-center">
                <div class="col-lg-5">
                    <card type="danger" shadow
                          header-classes="bg-white pb-5"
                          body-classes="px-lg-5 py-lg-5"
                          class="border-0"
                          style="height:400px">
                        <template>
                            <form
                             role="form"
                             ref="loginForm"
                             :model="loginForm"
                             :rules="loginRules"
                             class="login-form"

                             >
                                <base-input alternative
                                            class="mb-3"
                                            placeholder="Email"
                                            addon-left-icon="ni ni-circle-08"
                                            ref="username"
                                            v-model="loginForm.username"
                                            name="username">
                                </base-input>
                                <p class="mailHint" v-if="mailHint" style="font-family: 'Comic Sans MS';color: #2bffc6">{{ hint }}</p>
                                <base-input alternative
                                            type="password"
                                            placeholder="password"
                                            addon-left-icon="ni ni-key-25"
                                            :key="passwordType"
                                            v-model="loginForm.password"
                                            @keyup.enter.native="handleLogin">
                                </base-input>
                                <base-input alternative
                                            type="text"
                                            placeholder="verification code"
                                            addon-left-icon="ni ni-image"
                                            v-model="loginForm.verification">

                                </base-input>
                                <p class="mailHint" v-if="verificationHint" style="font-family: 'Comic Sans MS';color: #2bffc6">{{veriHint}}</p>


                                <base-identify
                                    @click.native="newCode()"
                                    :identifyCode="identifyCode"></base-identify>

                              <!-- 记住当前用户-->
                                <base-checkbox style="color:whitesmoke">
                                    Remember me
                                </base-checkbox>
                                <div class="text-center">
                                    <base-button type="primary" style=" background-color:darkred;font-family: 'Comic Sans MS';font-size: 16px" class="my-4" @click.native.prevent="handleLogin">Log In</base-button>
                                </div>
                            </form>
                        </template>
                    </card>
                    <div class="row mt-3">
                      <!--忘记密码-->

                        <div class="col-6 text-md-center" style="font-size:large">
                          <!--创建新用户-->
                            <a href="#" class="text-light" @click="createAccount()">
                                <small>Create a New Account</small>
                            </a>
                        </div>

                      <div class="col-6 text-md-center" style="font-size:large">
                        <a href="#" class="text-light" @click="changePassword()">
                          <small>Forget your password？</small>
                        </a>
                      </div>
                    </div>
                </div>
            </div>
        </div>


      <!--登录时没有填写正确时弹出提示-->
         <modal :show.sync="canRegister"
                   gradient="dark"
                modal-classes="modal-danger modal-dialog-centered">
            <h6 slot="header" class="modal-title" id="modal-title-notification">Oops!</h6>

            <div class="py-3 text-center">
                <i class="ni ni-pin-3 ni-3x"></i>
                <h4 class="heading mt-4">Note</h4>
                <p>{{ message }}</p>
            </div>

          <template slot="footer">
               <base-button type="white" @click="canRegister=false">Yes, I  understand</base-button>
<!--                <base-button type="link"-->
<!--                                text-color="white"-->
<!--                                class="ml-auto"-->
<!--                                @click="canRegister=false">-->
<!--                    Close-->
<!--               </base-button>-->
           </template>
        </modal>
    </section>
</template>
<script>
import BaseIdentify from '../components/BaseIdentify'
import Modal from '../components/Modal'
export default {
    components: {
        BaseIdentify,
        Modal
    },
    data() {
        const validateUsername = (rule, value, callback) => {
            if (!validUsername(value)) {
                callback(new Error('Plese input the correct username'))
            } else {
                callback()
            }
            }
            const validatePassword = (rule, value, callback) => {
            if (value.length < 6) {
                callback(new Error('The password should be no less than 6 characters!'))
            } else {
                callback()
            }
               }
        return {
            code: this.refreshCode(4),
            loginForm: {
                username: '',
                password: '',
                verification: ''
            },
            loginRules: {
                username: [{ required: true, trigger: 'blur', validator: validateUsername }],
                password: [{ required: true, trigger: 'blur', validator: validatePassword }]
            },
            passwordType: 'password',
            redirect: undefined,
            otherQuery: {},
            canRegister: false,
            usedName: false,
            mailHint: false,
            hint: 'Please input the E-mail in the correct format',
            verificationHint: false,
            veriHint: 'Please input the correct verification code！',
            message: 'Please fill in the information correctly!'
        }
    },
    watch: {
        loginForm: {
            handler(newValue, oldValue) {
                this.message = 'Please fill in the information correctly'
                const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                reg.test(newValue.username)? this.mailHint = false: this.mailHint = true
                newValue.verification === this.code? this.verificationHint = false: this.verificationHint = true
            },
            deep: true
        }
    },
    computed: {
        identifyCode: {
            get: function() {
                return this.code
            },
            set: function() {
                this.code = this.refreshCode()
            }

        }
    },
    methods: {
        checkCapslock({ shiftKey, key } = {}) {
            if (key && key.length === 1) {
                if (shiftKey && (key >= 'a' && key <= 'z') || !shiftKey && (key >= 'A' && key <= 'Z')) {
                this.capsTooltip = true
                } else {
                this.capsTooltip = false
                }
            }
            if (key === 'CapsLock' && this.capsTooltip === true) {
                this.capsTooltip = false
            }
        },
        handleLogin() {
          if(this.verificationHint)
          {
            this.$message.error("Please input the correct verification code!")
          }
            for(let item in this.loginForm) {
                if(this.loginForm[item] === '') {
                    this.canRegister = true
                }
            }
            if(this.canRegister === false && this.mailHint === false && this.verificationHint === false) {
                this.$store.dispatch('user/login', this.loginForm)
                .then((data) => {
                    if(data.login) {

                        this.$router.push({ path:'/', query: this.otherQuery })
                        return this.$store.dispatch('user/getInfo')
                    } else {
                        this.message = 'Wrong username or password! Login Failure!'
                        this.canRegister = true
                        return new Promise((resolve, reject) => {reject('user log in failed')})
                    }
                })
                .then(info => {

                })
                .catch((err) => {
                    console.log(err)
                    console.log('login failed')
                    this.loading = false
                })
            }

        },
        getOtherQuery(query) {
            return Object.keys(query).reduce((acc, cur) => {
                if (cur !== 'redirect') {
                    acc[cur] = query[cur]
                }
                return acc
            }, {})
        },
        createAccount() {
            this.$router.push({path: '/register'})
        },
      changePassword(){
        this.$router.push({path: '/checkAcc'})
      },
        newCode() {
            this.code = this.refreshCode(4)
        },
        refreshCode(length) {
            let randomNum = 0
            while(randomNum < Math.pow(10, length - 1)) {
                randomNum = Math.floor(Math.random() * Math.pow(10, length))
            }
            return randomNum.toString()
        },
    }
};
</script>
<style lang="scss">
.usedName {
    font-size: 0.5em;
    margin: 0 auto;
    color: #f5365c;
}
.mailHint {
    font-size: 0.8em;
    margin: 0 auto;
    color: #f5365c;
}
</style>
