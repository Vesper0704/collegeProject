<!--个人信息 展示和修改 -->
<template>
  <div class="container" style="background-color: indianred">
    <card shadow class="card-profile mt--300" style="background-color: antiquewhite">
      <template v-slot:header >
        <div class="row justify-content-center" >
          <h3 style="font-family: 'Comic Sans MS'">个人信息</h3>
        </div>
      </template>
      <div class="row justify-content-md-center" >
        <!-- <div class="col-md-3 text-center">
          <div>用户ID</div>
          <span>账户类型</span>
          <span>昵称</span>
          <span>注册时间</span>
        </div>
        <div class="col-md-5 text-center">
          {{ id }}
        </div> -->
        <div class="col-md-6">

         <b-list-group style="font-family: 'Comic Sans MS'">
           <b-list-group-item style="background-color: antiquewhite">
              <div class="row">
                <div class="col-md-3">user ID</div>
                <div class="col-md-6">{{ info.mail }}</div>
              </div>
            </b-list-group-item>

            <b-list-group-item style="background-color: antiquewhite">
              <div class="row">
                <div class="col-md-3"># of works</div>
                <div class="col-md-6">{{ info.workCount }}</div>
              </div>
            </b-list-group-item>

           <b-list-group-item style="background-color: antiquewhite">
              <div class="row">
                <div class="col-md-3">Nickname</div>
                <div class="col-md-6" v-if="!changeName">{{ info.nickname }}</div>
                <input type="text" class="form-control col-md-6" v-bind:placeholder="info.nickname" v-if="changeName" v-model="info.nickname">
                <div class="col-md-3"> <base-button type="danger" @click="changeNickname()">change</base-button></div>
              </div>
            </b-list-group-item>

           <b-list-group-item style="background-color: antiquewhite">
              <div class="row">
                <div class="col-md-3">Avatar</div>
                <div class="col-md-9">
                  <image-upload>

                  </image-upload>
                </div>
              </div>
            </b-list-group-item>

           <b-list-group-item style="background-color: antiquewhite">
              <div class="row">
                <div class="col-md-3">Age</div>
                <div class="col-md-6" v-if="!changeAge">{{ info.age }}</div>
                <input type="text" class="form-control col-md-6" v-bind:placeholder="info.age" v-if="changeAge" v-model="info.age">
                <div class="col-md-3"> <base-button type="danger" @click="changeUserAge()">change</base-button></div>
              </div>
            </b-list-group-item>

           <b-list-group-item style="background-color: antiquewhite">
              <div class="row">
                <div class="col-md-3">Residence</div>
                <div class="col-md-6" v-if="!changeResidence">{{ info.residence }}</div>
                <input type="text" class="form-control col-md-6" v-bind:placeholder="info.residence" v-if="changeResidence" v-model="info.residence">
                <div class="col-md-3"> <base-button type="danger" @click="changeUserResidence()">change</base-button></div>
              </div>
            </b-list-group-item>

           <b-list-group-item style="background-color: antiquewhite">
              <div class="row">
                <div class="col-md-3">Occupation</div>
                <div class="col-md-6" v-if="!changeJob">{{ info.jobTitle }}</div>
                <input type="text" class="form-control col-md-6" v-bind:placeholder="info.jobTitle" v-if="changeJob" v-model="info.jobTitle">
                <div class="col-md-3"> <base-button type="danger" @click="changeUserJob()">change</base-button></div>
              </div>
            </b-list-group-item>

           <b-list-group-item style="background-color: antiquewhite">
              <div class="row">
                <div class="col-md-3">Introduction</div>
                <div class="col-md-6" v-if="!changeIntro">{{ info.self_introduction }}</div>
                <input type="text" class="form-control col-md-6" v-bind:placeholder="info.self_introduction" v-if="changeIntro" v-model="info.self_introduction">
                <div class="col-md-3"> <base-button type="danger" @click="changeUserIntro()">change</base-button></div>
              </div>
            </b-list-group-item>

<!--            <b-list-group-item>-->
<!--              <div class="row">-->
<!--                <div class="col-md-3">注册时间</div>-->
<!--                <div class="col-md-6">{{ info.date }}</div>-->
<!--              </div>-->
<!--            </b-list-group-item>-->
           <b-list-group-item style="background-color: antiquewhite">
              <div class="row">
                <div class="col-md-3"><b>public key</b></div>
                <div class="col-md-6">{{ info.publicKey }}</div>
              </div>
            </b-list-group-item>

           <b-list-group-item style="background-color: antiquewhite">
              <div class="row">
                <div class="col-md-4"><b>private key</b></div>
                <div class="col-md-5">{{ privateKey }}</div>
                <div class="col-md-3"> <base-button type="dark" @click="checkPrivKey()">View</base-button></div>
              </div>
            </b-list-group-item>
          </b-list-group>
        </div>
      </div>

      <template v-slot:footer style="background-color: #2dce89">
        <div class="row justify-content-center">
           <base-button type="danger" @click="save()">save</base-button>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
           <base-button type="warning" @click="goback()">return</base-button>
        </div>
      </template>
    </card>
    <modal :show.sync="saveStatus">
<!--      <i class="ni ni-air-baloon"></i>-->
                <h6 slot="header" class="modal-title" id="modal-title-default"><i class="ni ni-air-baloon"></i>Note</h6>

               <div style="color:black;font-family: 'Comic Sans MS'"><i class="ni ni-app"></i>&nbsp;&nbsp;Save successfully :)</div>

                <template slot="footer">
                  <base-button type="success" @click="goback">Confirm</base-button>
<!--                  <base-button type="dark" class="ml-auto" @click="saveStatus=false">关闭</base-button>-->
                </template>
            </modal>
    <modal :show.sync="saveFailure"
                   gradient="danger"
                modal-classes="modal-danger modal-dialog-centered">
            <h6 slot="header" class="modal-title" id="modal-title-notification">WARNING</h6>

            <div class="py-3 text-center">
                <i class="ni ni-bell-55 ni-3x"></i>
                <h4 class="heading mt-4">Fail to save!</h4>

            </div>

            <template slot="footer">
                <base-button type="white" @click="goback">Ok, Got it!</base-button>
                <base-button type="link"
                                text-color="white"
                                class="ml-auto"
                                @click="saveFailure=false">
                    Close
                </base-button>
            </template>
        </modal>
  </div>
</template>
<script>
import Modal from '../../components/Modal'
import ImageUpload from '@/components/ImageUpload'
export default {
  components: {
    Modal,
    ImageUpload
  },
  data() {
    return {
      info: {
        mail: 'drj@bupt.edu.cn',
        accountType: '个人账户',
        nickname: 'I am here',
        registerDate: new Date()
      },
      changeName: false,
      changeAge: false,
      changeResidence: false,
      changeJob: false,
      changeIntro: false,
      privateKey: '',
      saveStatus: false,
      saveFailure: false
    }
  },
  created() {
    const info = JSON.parse(localStorage.getItem('user-info'))
    this.info = info
    this.privateKey = this.info.privateKey
    this.privateKey = this.privateKey.split('')
    this.privateKey = this.privateKey.map((value) => {
      value = '$'
    }).toString()
  },
  methods: {
    changeNickname: function() {
      if(this.changeName === true) {

      }
      this.changeName = !this.changeName
    },
    changeUserAge() {
      this.changeAge = !this.changeAge
    },
    changeUserResidence() {
      this.changeResidence = !this.changeResidence
    },
    changeUserJob() {
      this.changeJob = !this.changeJob
    },
    changeUserIntro() {
      this.changeIntro = !this.changeIntro
    },
    checkPrivKey() {
      this.privateKey = this.info.privateKey
    },
    save: function() {
      const data = {
        mail: this.info.mail,
        nickname: this.info.nickname,
        age: this.info.age,
        residence: this.info.residence,
        jobTitle: this.info.jobTitle,
        self_introduction: this.info.self_introduction
      }
      this.$store.dispatch('user/setInformation', data)
      .then(result => {
        if(result.update) {
          this.saveStatus = true
           return this.$store.dispatch('user/getInfo')

        }
      })
      .then(data => {
      })
      .catch(err => {
        this.saveFailure = true
      })
    },
    goback: function() {
      this.$router.go(-1)
    }
  }
}
</script>
