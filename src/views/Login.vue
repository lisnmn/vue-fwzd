<template>
  <div class="login-background">
  <el-container>
	<el-header style="padding: 0">
	  <LoginHeader></LoginHeader>
	</el-header>
	<el-main>
	  <el-card class="login-box-card" shadow="hover">
		<div style="text-align: center">
		  <h1>登录</h1>
		</div>
		<el-form ref="loginForm" :model="loginForm" :rules="rules" label-width="65px"
				 label-position="right">
		  <el-form-item label="用户名" prop="name">
			<el-input v-model="loginForm.name"></el-input>
		  </el-form-item>
		  <el-form-item label="密码" prop="password" style="color: #ffffff">
			<el-input v-model="loginForm.password" type="password"></el-input>
		  </el-form-item>
		</el-form>
		<el-button type="primary" @click="submitForm('loginForm')" style="width: 100%">登录</el-button>
	  </el-card>
	</el-main>
  </el-container>
  </div>
</template>

<script>
    import LoginHeader from "../components/LoginHeader.vue";
    import {useAppStore} from "../store";

    export default {
        setup() {
            return {store: useAppStore()}
        },
        data() {
            return {
                loginForm: {
                    name: '',
                    password: ''
                },
                rules: {
                    name: [
                        {required: true, message: '请输入用户名', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        axios.post('/login/', this.loginForm)
                            .then(response => {
                                //console.log(response)
                                if (response.data === 'success') {
                                    this.$message({
                                        showClose: true,
                                        message: '登陆成功！',
                                        type: 'success',
                                    })
                                    this.store.setUser(true)
                                    localStorage.setItem('Flag', 'isLogin')
                                    localStorage.setItem('username', this.loginForm.name)
                                    this.$router.push('/homepage')
                                    //console.log(localStorage)
                                } else if (response.data === 'failed') {
                                    this.$message({
                                        showClose: true,
                                        message: '用户名或密码错误！',
                                        type: 'error'
                                    })
                                } else if (response.data === null) {
                                    this.$message({
                                        showClose: true,
										// 由群友Debug，不再显示'用户名不存在！'
                                        message: '用户名或密码错误！',
                                        type: 'error'
                                    })
                                }
                            })
                    } else {
                        //console.log('error submit!!')
                        return false
                    }
                })
            },
            resetForm(formName) {
                this.$refs[formName].resetFields()
            }
        },
        components: {
            LoginHeader
        }
    }
</script>

<style>
  .login-background {
	background: url("../assets/homepage.jpg") no-repeat center;
	height: 100%;
	width: 100%;
	background-size: cover;
	position: fixed;
  }
  
  .login-box-card {
	margin: 100px auto;
	width: 500px;
	box-shadow: 0 0 20px #000000;
	border: 0;
  }
</style>
