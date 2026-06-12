<template>
  <div class="userInfo-background">
  <el-container>
    <el-header style="padding: 0">
      <HomePageHeader></HomePageHeader>
    </el-header>
    <el-main>
      <el-card class="userInfo-box-card" shadow="hover">
        <div style="text-align: center">
          <h1>修改信息</h1>
        </div>
        <el-form ref="userInfoForm" :model="userInfoForm" :rules="rules" label-width="80px"
                 label-position="right">
          <el-form-item label="用户名" prop="name">
            <el-input v-model="userInfoForm.name"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password" style="color: #ffffff">
            <el-input v-model="userInfoForm.password" type="password"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="passwordConfirm">
            <el-input v-model="userInfoForm.passwordConfirm" type="password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('userInfoForm')" style="width: 100%">修改</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-main>
  </el-container>
  </div>
</template>

<script>
    import HomePageHeader from "../components/HomePageHeader.vue";

    export default {
        name: "UserInfo",
        data() {
            return {
                userInfoForm: {
                    id: '',
                    name: '',
                    password: '',
                    passwordConfirm: ''
                },
                rules: {
                    name: [
                        {required: true, message: '请输入用户名', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'}
                    ],
                    passwordConfirm: [
                        {required: true, message: '请再次输入密码', trigger: 'blur'}
                    ],
                }
            }
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        if (this.userInfoForm.password !== this.userInfoForm.passwordConfirm) {
                            this.$message({
                                showClose: true,
                                message: '两次密码输入不一致！',
                                type: 'error'
                            })
                        } else {
                            axios.post('/user/update', this.userInfoForm)
                                .then(response => {
                                    if (response.data === "success") {
                                        localStorage.setItem('username', this.userInfoForm.name)
                                        this.$message({
                                            showClose: true,
                                            message: '修改成功！',
                                            type: 'success',
                                            onClose: () => {
                                                window.location.reload()
                                            }
                                        })
                                    } else if (response.data === "failed") {
                                        this.$message({
                                            showClose: true,
                                            message: '用户已经存在！',
                                            type: 'error'
                                        })
                                    }
                                })
                        }
                    }
                })
            }
        },
        components: {
            HomePageHeader
        },
        created() {
            this.userInfoForm.name = localStorage.getItem('username')
            axios.get('/user/getByName', {
                params: {
                    username: this.userInfoForm.name
                }
            }).then(response => {
                if (response && response.status === 200) {
                    this.userInfoForm.id = response.data.id
                    this.userInfoForm.name = response.data.name
                    this.userInfoForm.password = response.data.password
                    this.userInfoForm.passwordConfirm = response.data.password
                }
            })
        }
    }
</script>

<style>
  .userInfo-background {
    background: url("../assets/kyouko.jpg") no-repeat center;
    height: 100%;
    width: 100%;
    background-size: cover;
    position: fixed;
    overflow: auto;
  }

  .userInfo-box-card {
    margin: 100px auto;
    width: 500px;
    box-shadow: 0 0 20px #000000;
    border: 0;
  }
</style>
