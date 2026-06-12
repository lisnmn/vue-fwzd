<template>
  <div class="signup-background">
  <el-container>
	<el-header style="padding: 0">
	  <LoginHeader></LoginHeader>
	</el-header>
	<el-main>
	  <el-card class="signup-box-card" shadow="hover">
		<div style="text-align: center">
		  <h1>注册</h1>
		</div>
		<el-form ref="signupForm" :model="signupForm" :rules="rules" label-width="80px"
				 label-position="right">
		  <el-form-item label="用户名" prop="name">
			<el-input v-model="signupForm.name"></el-input>
		  </el-form-item>
		  <el-form-item label="密码" prop="password">
			<el-input v-model="signupForm.password" type="password"></el-input>
		  </el-form-item>
		  <el-form-item label="确认密码" prop="passwordConfirm">
			<el-input v-model="signupForm.passwordConfirm" type="password"></el-input>
		  </el-form-item>
		  <el-form-item label="提问">
			<el-alert :closable="false">你看到了谁？</el-alert>
		  </el-form-item>
		  <el-form-item label="答案" prop="answer">
			<el-input v-model="signupForm.answer"></el-input>
		  </el-form-item>
		</el-form>
		<el-button type="primary" @click="submitForm('signupForm')" style="width: 100%">注册</el-button>
	  </el-card>
	</el-main>
  </el-container>
  </div>
</template>

<script>
    import LoginHeader from "../components/LoginHeader.vue";

    export default {
        data() {
            return {
                signupForm: {
                    name: '',
                    password: '',
                    passwordConfirm: '',
                    answer: ''
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
                    answer: [
                        {required: true, message: '请输入答案', trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        if (this.signupForm.password !== this.signupForm.passwordConfirm) {
                            this.$message({
                                showClose: true,
                                message: '两次密码输入不一致！',
                                type: 'error'
                            })
                        } else {
                            axios.post('/signup/', this.signupForm)
                                .then(response => {
                                    if (response.data === "success") {
                                        this.$message({
                                            showClose: true,
                                            message: '注册成功！',
                                            type: 'success'
                                        })
                                        this.$router.push('/login')
                                    } else if (response.data === "failed") {
                                        this.$message({
                                            showClose: true,
                                            message: '用户已经存在！',
                                            type: 'error'
                                        })
                                    } else if (response.data === "answerFailed") {
                                        this.$message({
                                            showClose: true,
                                            message: '回答错误！您真的是越共🐎？',
                                            type: 'warning'
                                        })
                                    }
                                })
                        }

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
  .signup-background {
	margin: 0px;
	background: url("../assets/homepage.jpg") no-repeat center;
	height: 100%;
	width: 100%;
	background-size: cover;
	position: fixed;
  }
  
  .signup-box-card {
	margin: 100px auto;
	width: 500px;
	box-shadow: 0 0 20px #000000;
	border: 0;
  }
</style>

