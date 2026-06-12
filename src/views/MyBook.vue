<template>
	<div class="myBook-background">
	<el-container>
		<el-header style="padding: 0">
			<HomePageHeader></HomePageHeader>
		</el-header>
		<el-main>
			<el-card class="myBook-card" shadow="never">
				<div style="display: flex; justify-content: center;">
					<el-col style="width: 400px">
						<el-card class="myBook-cover-card" bodyStyle="padding:0px" shadow="hover">
							<img :src="axios.defaults.baseURL + '/book/upload/' + book.cover">
						</el-card>
					</el-col>
					<el-col style="width: 50px"></el-col>
					<el-col style="width: 400px;text-align: left">
						<el-form label-width="100px" label-position="right" ref="myBookForm" :model="book"
						         :rules="rules">
							<el-form-item label="图片集名：" prop="name">
								<el-input v-model="book.name"></el-input>
							</el-form-item>
							<el-form-item label="上传者：">
								<el-input v-model="book.uploader" disabled></el-input>
							</el-form-item>
							
							<el-form-item label="上传时间：">
								<el-input v-model="book.uploadTime" disabled></el-input>
							</el-form-item>
							
							<el-form-item label="类型：">
								<el-select v-model="book.rank" placeholder="请选择图片集类型"
								           style="display: flex">
									<el-option label="safe" value="safe"></el-option>
									<el-option label="R18" value="r18"></el-option>
								</el-select>
							</el-form-item>
							
							<el-form-item label="页数：">
								<el-input v-model="book.size" readonly disabled></el-input>
							</el-form-item>
						</el-form>
						<el-button type="primary" @click="submitForm('myBookForm')" style="width: 100%">修改</el-button>
					</el-col>
				</div>
			</el-card>
			<el-card class="myBook-card" shadow="never">
				<div v-for="(item, index) in imageList">
					<el-card class="myBook-image-card" bodyStyle="padding:0px" shadow="hover">
						<img class="myBook-image"
						     :src="axios.defaults.baseURL + '/book/upload/'+ item.thumbUrl"
						     @click="imageView(index)">
						
					</el-card>
				</div>
			</el-card>
		</el-main>
	</el-container>
	</div>
</template>

<script>
    import HomePageHeader from "../components/HomePageHeader.vue";
    import {useAppStore} from "../store";

    export default {
        name: "MyBook",
        components: {
            HomePageHeader
        },
        setup() {
            return {store: useAppStore()}
        },
        data() {
            return {
                book: '',
                cover: '',
                imageList: [],
                rules: {
                    name: [
                        {required: true, message: '请输入图片集名', trigger: 'submit'}
                    ]
                },
                dialogVisible: false
            }
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        axios.post('/book/update', this.book)
                            .then(response => {
                                if (response.data === 'success') {
                                    this.$message({
                                        type: 'success',
                                        message: '修改成功！',
                                        showClose: true,
                                        onClose: () => {
                                            this.store.setBook(this.book)
                                            window.location.reload()
                                        }
                                    })
                                } else if (response.data === 'failed') {
                                    this.$message({
                                        type: 'error',
                                        message: '修改失败！',
                                        showClose: true
                                    })
                                }
                            })
                    } else {
                        return false
                    }
                })
            },
            deleteImage(index) {

            },
            getParams() {
                this.book = this.store.book
            },
            getBookImageList() {
                axios.get('/book/imageList', {
                    params: {
                        bookId: this.book.id
                    }
                }).then(response => {
                    if (response && response.status === 200) {
                        this.imageList = response.data
                    }
                })
            },
            imageView(index) {
                this.store.setImageList(this.imageList)
                this.store.setImageIndex(index)
                this.$router.push('/imageView')
            }
        },
        created() {
            this.getParams()
            this.getBookImageList()
        }
    }
</script>

<style>
	.myBook-background {
		background: url("../assets/homepage.jpg") no-repeat center;
		height: 100%;
		width: 100%;
		background-size: cover;
		position: fixed;
		overflow: auto;
	}
	
	.myBook-card {
		margin: 30px auto;
		width: 920px;
		box-shadow: 0 0 20px #000000;
	}
	
	.myBook-cover-card {
		border: 0;
		max-width: 400px;
		margin: 0 10px 10px 10px;
		background-color: transparent;
	}
	
	.myBook-image-card {
		border: 0;
		float: left;
		margin: 10px 10px 10px 10px;
		background-color: transparent;
	}
	
	.myBook-image {
		object-fit: contain;
		width: 200px;
		height: 240px;
	}
</style>