
<template>
  <div class="container mt--300" style="background-color: #bc2963">
    <card style="background-color: #bc2963">
      <template v-slot:header style="background-color: #bc2963">
        <div class="text-center">
          <h3 style="font-family: 'Comic Sans MS';font-size: x-large">Edit your picture</h3>
        </div>
        </template>
      <div class="container" style="background-color:#bc2963">
        <div class="row justify-content-center" style="background-color: #bc2963">
          <img :src="url" alt="" class="image">
        </div>

        <div class="row justify-content-center info" style="background-color: #bc2963">
          <image-detail v-for="(info,index) in imageInfo" :key="index"
                        :tableData="info" style="color: red;font-family: 'Comic Sans MS'"></image-detail>
        </div>

        <div class="row justify-content-center transfer">
          <div class="col-lg-5">

          </div>
        </div>

      </div>


      <template v-slot:footer>
        <div class="text-center">
          <base-button type="dark" @click="canTransfer=true">Transfer</base-button>
        <sapn>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</sapn>
<!--          <base-button type="secondary" @click="register">登记</base-button>-->
          <base-button type="danger" @click="monit">{{monitMessage}}</base-button>
          <sapn>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</sapn>
          <base-button type="info" @click="goback">back</base-button>
        </div>
      </template>

    </card>

    <modal :show.sync="canTransfer"
            gradient="default"
            modal-classes="modal-danger modal-dialog-centered">
<!--      请确认版权转让-->
      <h6 slot="header" class="modal-title" id="modal-title-notification">
        <span><i class="ni ni-bell-55" >
          <i style="font-family: 'Comic Sans MS'">
            &nbsp;&nbsp;Please operate <b>VERY</b> carefully
          </i>
        </i></span>
      </h6>

      <div class="py-3 text-center">

          <card type="secondary" shadow
                header-classes="bg-white pb-5"
                body-classes="px-lg-5 py-lg-5"
                class="border-0">
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
                            placeholder="Please input your own public key"
                            addon-left-icon="ni ni-circle-08"
                            ref="publicKey"
                            v-model="loginForm.publicKey"
                            name="publicKey">
                </base-input>
<!--                请输入正确的公钥-->
                <p class="mailHint" v-if="mailHint" style="font-family: 'Comic Sans MS'">Please input the CORRECT pub_K &nbsp;&nbsp;<i class="ni ni-active-40" ></i></p>

                <base-input alternative
                            type="password"
                            placeholder="Please input your own private key"
                            ref="privateKey"
                            name="privateKey"
                            addon-left-icon="ni ni-key-25"
                            :key="passwordType"
                            v-model="loginForm.privateKey">
<!--                            @keyup.enter.native="handleLogin">-->
                </base-input>
                <p class="mailHint" v-if="privateKeyHint" style="font-family: 'Comic Sans MS'">Please input the CORRECT pri_K&nbsp;&nbsp;<i class="ni ni-active-40" ></i></p>

                <base-input alternative
                            type="password"
                            placeholder="Please re-enter your private key"
                            addon-left-icon="ni ni-key-25"
                            ref="privateKeyReenter"
                            name="privateKeyReenter"
                            v-model="loginForm.passwordReenter">
<!--                            @keyup.enter.native="handleLogin">-->
                </base-input>
<!--                检查两次密钥是否一致-->
                <p class="mailHint" v-if="repeatKeyHint" style="font-family: 'Comic Sans MS'">Please ensure the input private key are identical &nbsp;&nbsp;<i class="ni ni-active-40" ></i></p>


                <base-input alternative
                            type="text"
                            placeholder="Please input the public key of the target."
                            addon-left-icon="ni ni-curved-next"
                            v-model="loginForm.target">

                </base-input>
<!--               对方的 正确的公钥地址-->
                <p class="mailHint" v-if="targetAddressHint" style="font-family: 'Comic Sans MS'">Please input the correct public key of the TARGET &nbsp;&nbsp;<i class="ni ni-active-40" ></i></p>

                <base-input alternative
                            type="text"
                            placeholder="verification code"
                            addon-left-icon="ni ni-image"
                            v-model="loginForm.verification">

                </base-input>
<!--                请输入正确的验证码！-->
                <p class="mailHint" v-if="verificationHint" style="font-family: 'Comic Sans MS'">
                  Please input the correct verification code &nbsp;&nbsp;<i class="ni ni-active-40" ></i></p>
                <base-identify
                    @click.native="newCode()"
                    :identifyCode="identifyCode"></base-identify>
              </form>
            </template>
          </card>
      </div>

<!--      确认转账-->
      <template slot="footer">
          <base-button type="danger" @click="transfer"
                       style="font-family: 'Comic Sans MS'">
            Transfer Confirmed
          </base-button>

<!--        取消转账-->
          <base-button type="link"
                          text-color="white"
                          class="ml-auto"
                          @click="canTransfer = false"
                       style="font-family: 'Comic Sans MS'">
              Transfer Cancelled
          </base-button>
      </template>
    </modal>



    <modal :show.sync="whetherMonit"
            gradient="dark"
            modal-classes="modal-danger modal-dialog-centered">
<!--      <h6 slot="header" class="modal-title" id="modal-title-notification">Activate Monitoring</h6>-->

      <div class="py-3 text-center">
          <i class="ni ni-atom ni-5x"></i>
          <p style="font-family: 'Comic Sans MS'">{{ monitHint }}</p>
      </div>

      <template slot="footer">
        <base-button type="white" @click="activeMonit">Confirm</base-button>
        <base-button type="dark"
                     text-color="white"
                     class="ml-auto"
                     @click="whetherMonit=false">
          Maybe Next Time
        </base-button>
      </template>
    </modal>
  </div>
</template>
<script>
import BaseIdentify from '../../components/BaseIdentify'
import Card from '../../components/Card'
import { getImage, transferImage, monitImage, cancelMonit, transferAsset } from '../../api/user'
import ImageDetail from '../components/imageDetail'
import Modal from '../../components/Modal'

export default {
  components: {
    Card,
    ImageDetail,
    BaseIdentify,
    Modal
  },
  methods: {
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
    validatePublic: function(rule, value, callback) {
      if(!value) {
        return callback(new Error('Can not be empty!'))
      }
    },
    validatePrivate: function(rule, value, callback) {
      if(!value) {
        this.$message.error('Can not be empty!');
      }
    },
    transfer() {
      if(!this.mailHint && !this.veriHint && !this.privateKeyHint && !this.repeatKeyHint && !this.targetAddressHint && !this.verificationHint) {
        const reqData = {
          publicKey: this.loginForm.publicKey,
          privateKey: this.loginForm.privateKey,
          transferTo: this.loginForm.target,
          imageID: this.id
        }
        //将要提交的数据放入请求中发送
        transferAsset(reqData)
        .then(res => { //接受响应
          const data = res.data
          if(data.transfer) {
            this.$message({
              type: 'success',
              message: 'Transferred successfully :)'
            })
            this.$store.dispatch('user/getInfo')
            .then(res => {

            })
            .catch(err => {
              this.$message.error('can not retrieve user information! :(' + err)
            })
            this.canTransfer = true
          }

          else {
            this.$message.error('Transfer failure, please check the public/private keys :(')
          }
        })

      } else {
        this.$message.warning('Please fill in the form :)')
      }
    },
    goback() {
      this.$router.go(-1)
    },
    confirmTransfer() {
      if(!this.mailHint && !this.veriHint && !this.privateKeyHint && !this.repeatKeyHint && !this.targetAddressHint && !this.verificationHint) {

      } else {
        this.$message.error('请完善表格！')
      }
    },
    register() {

    },
    monit() {
      this.whetherMonit = true
    },
    activeMonit() {
      const info = JSON.parse(localStorage.getItem('user-info'))
      const token = this.$store.getters.token
      const mail = info.mail
      const reqData = {
        mail: mail,
        token: token,
        imageID: this.id
      }
      if(!this.whetherMonitered) {
        monitImage(reqData)
        .then(res => {
          if(res.data.update) {
            this.whetherMonit = false
            this.whetherMonitered = true
            this.whetherMonitered? this.monitMessage = 'Cancel monitoring' : this.monitMessage = 'monitor'
            this.whetherMonitered? this.monitHint = 'Are you sure you want to cancel monitoring? After your work is infringed, ' +
                'you will not be actively reminded。' :
                this.monitHint = 'Are you sure you want to join active monitoring? ' +
                    'Active monitoring will search the entire network, and real-time notifications ' +
                    'will be made if there are pictures that violate your privacy.'
            this.$message({
              type: 'success',
              message: 'Monitored Successfully!'
            })
            this.$store.dispatch('user/getInfo')
            .then(res => {

            })
            .catch(err => {
              this.$message.error('不能成功获取用户信息' + err)
            })
          } else {
            this.$message.error('监控文件失败')
          }
        })

      } else {
        cancelMonit(reqData)
        .then(res => {
          const data = res.data
          if(data.cancel) {
            this.whetherMonitered = false
            // this.whetherMonitered? this.monitMessage = '取消监测' : this.monitMessage = '监测'
            // this.whetherMonitered? this.monitHint = '您确定要取消监测吗？您的作品被侵权后将不会被主动提醒。' :this.monitHint = '您确认要加入主动监测吗？主动监测将会在全网搜索，如果有侵犯您隐私的图片将进行实时通知。'
            this.whetherMonitered? this.monitMessage = 'Cancel monitoring' : this.monitMessage = 'monitor'
            this.whetherMonitered? this.monitHint = 'Are you sure you want to cancel monitoring? After your work is infringed, ' +
                'you will not be actively reminded。' :
                this.monitHint = 'Are you sure you want to join active monitoring?' +
                    'Active monitoring will search the entire network, and real-time notifications ' +
                    'will be made if there are pictures that violate your privacy.'
            this.$message({
              type: 'warning',
              message: 'Monitor Cancelled!'
            })
            this.$store.dispatch('user/getInfo')
            .then(res => {

            })
            .catch(err => {
              this.$message.error('不能成功获取用户信息' + err)
            })
          }

          else {
            this.$message.error('取消主动监测失败')
          }
        })
      }
      this.whetherMonit = false
    }
  },
  data() {
    return {
      url: '',
      imageInfo: [],
      loginForm: {
        publicKey: '',
        privateKey: '',
        verification: '',
        passwordReenter: '',
        target: ''
      },
      code: this.refreshCode(4),
      loginRules: {
        publicKey: [{ required: true, trigger: 'blur', validator: this.validatePublic }],
        privateKey: [{ required: true, trigger: 'blur', validator: this.validatePrivate }],
        privateKeyReenter: [{ required: true, trigger: 'blur', validator: this.validatePrivate }]
      },
      mailHint: true,
      hint: '',
      verificationHint: false,
      veriHint: '',
      passwordType: 'password',
      privateKeyHint: false,
      repeatKeyHint: false,
      targetAddressHint: false,
      imageObj: Object,
      canTransfer: false,
      whetherMonit: false,
      id: '',
      monitMessage: 'Monitor',
      whetherMonitered: false,
      monitHint: ''
    }
  },
  computed: {
    identifyCode: {
      get: function() {
        return this.code
      },
      set: function() {
        this.code = this.refreshCode(4)
      }
    }
  },
  watch: {
    loginForm: {
      deep: true,
      //监控输入的数据
      handler(newValue, oldValue) {
        if(newValue.publicKey.length < 40) {
          this.mailHint = true
        } else {
          this.mailHint = false
        }
        if(newValue.privateKey.length < 40) {
          this.privateKeyHint = true
        } else {
          this.privateKeyHint = false
        }
        if(newValue.target.length < 40) {
          this.targetAddressHint = true
        } else {
          this.targetAddressHint = false
        }
        if(newValue.passwordReenter !== newValue.privateKey) {
          this.repeatKeyHint = true
        } else {
          this.repeatKeyHint = false
        }
        if(newValue.verification !== this.code) {
          this.verificationHint = true
        } else {
          this.verificationHint = false
        }
      }
    }
  },
  created: function() {
    const info = JSON.parse(localStorage.getItem('user-info'))
    const token = this.$store.getters.token
    this.id = this.$route.params.id
    const mail = info.mail
    const reqData = {
      token: token,
      mail: mail,
      id: this.id
    }
    getImage(reqData).then(res => {
      if(!res.data.whetherImage) {
        this.$message.error(res.data.message)
      } else {
        const image = res.data.imageObj
        this.imageObj = res.data.imageObj
        this.url = image.url
        this.whetherMonitered = image.whetherMonitor
        //this.whetherMonitered? this.monitMessage = 'Cancel monitoring' : this.monitMessage = 'Monitor'
        // this.whetherMonitered? this.monitHint = '您确定要取消监测吗？您的作品被侵权后将不会被主动提醒。' :this.monitHint = '您确认要加入主动监测吗？主动监测将会在全网搜索，如果有侵犯您隐私的图片将进行实时通知。'
        this.whetherMonitered? this.monitMessage = 'Cancel monitoring' : this.monitMessage = 'monitor'
        this.whetherMonitered? this.monitHint = 'Are you sure you want to cancel monitoring? After your work is infringed, ' +
            'you will not be actively reminded。' :
            this.monitHint = 'Are you sure you want to join active monitoring? ' +
                'Active monitoring will search the entire network, and real-time notifications ' +
                'will be made if there are pictures that violate your privacy.'
        this.imageInfo.push([
          {
            name: 'Picture ID',
            value: image.otherInfo.id
          },{
            name: 'Picture Name',
            value: image.title
          }, {
            name: 'IPFS hash_value',
            value: image.ipfs_hash
          }, {
            name: 'Owner',
            value: image.owner
          }, {
            name: 'Transaction ID',
            value: image.otherInfo.id
          }, {
            name: 'Transaction type',
            value: image.otherInfo.operation
          }
        ])
      }
    })
  }
}
</script>
<style scoped>
.image {
  width: 90%;
}
.info {
  margin-top: 5vh;
  width: 90%;
  margin-left: 5%;
}
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
.transfer {
  margin-top: 5vh;
}
</style>
