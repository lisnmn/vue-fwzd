<template>
  <div class="uploadBook-background">
  <el-container>
	<el-header style="padding: 0">
	  <HomePageHeader></HomePageHeader>
	</el-header>
	
	<el-main>
	  <el-row>
		<el-card class="uploadBook-card" shadow="never">
		  <el-form :model="bookForm" :rules="rules" label-position="right"
				   ref="bookForm" label-width="100px" class="demo-ruleForm">
			<el-form-item label="图片集名称" prop="name">
			  <el-input v-model="bookForm.name"></el-input>
			</el-form-item>
			<el-form-item label="图片集类型" prop="rank">
			  <el-select v-model="bookForm.rank" placeholder="请选择图片集类型"
						 style="display: flex">
				<el-option label="safe" value="safe"></el-option>
				<el-option label="R18" value="r18"></el-option>
			  </el-select>
			</el-form-item>
			<el-form-item label="上传图片集">
			  <el-upload action="#"
						 ref="uploadItem"
						 list-type="picture-card"
						 accept="image/png, image/jpeg"
						 :on-change="addImageFile"
						 :on-remove="removeImageFile"
						 :multiple="true"
						 :auto-upload="false"
						 style="text-align: left">
				<template #default>
				  <el-icon><Plus/></el-icon>
				</template>
				<template #file="{ file }">
				  <div>
					<img class="el-upload-list__item-thumbnail" :src="file.url">
					<span class="el-upload-list__item-actions">
					  <span class="el-upload-list__item-preview"
							@click="previewImage(file)">
						<el-icon><ZoomIn/></el-icon>
					  </span>
					  <span class="el-upload-list__item-delete"
							@click="removeImageFile(file)">
						<el-icon><Delete/></el-icon>
					  </span>
					</span>
				  </div>
				</template>
			  </el-upload>
			  <el-dialog v-model="previewDialogVisible"
						 :modal-append-to-body=false>
				<img width="100%" :src="previewImageUrl" alt="">
			  </el-dialog>
			</el-form-item>
			<el-form-item>
			  <el-button type="primary" @click="submitImageList('bookForm')">上传图片集</el-button>
			</el-form-item>
		  </el-form>
		</el-card>
	  </el-row>
	</el-main>
  </el-container>
  </div>
</template>

<script>
    import HomePageHeader from "../components/HomePageHeader.vue";

    export default {
        name: "UploadBook",
        components: {
            HomePageHeader
        },
        data() {
            return {
                bookForm: {
                    name: '',
                    uploader: localStorage.getItem('username'),
                    rank: '',
                },
                rules: {
                    name: [
                        {required: true, message: '请输入图片集名称', trigger: 'blur'}
                    ],
                    rank: [
                        {required: true, message: '请选择图片集类型', trigger: 'change'}
                    ]
                },
                imageList: [],
                previewDialogVisible: false,
                previewImageUrl: ''
            }
        },
        methods: {
            addImageFile(image, list) {
                /*
                let reg = /(^\s*)|(\s*$)/g;
                if (reg.test(image.name)) {
                    this.$message.error('文件名不能包含特殊字符！')
                    list.pop()
                    return
                }*/
                if (image.status === 'ready') {
                    this.imageList.push(image.raw)
                }
            },
            previewImage(file) {
                this.previewImageUrl = file.url
                this.previewDialogVisible = true
            },
            removeImageFile(image, fileList) {
                let index = this.imageList.indexOf(image.raw)
                this.imageList.splice(index, 1)
				//如果需要删除预览项的话得访问到真正的文件数组！！！
                this.$refs.uploadItem.uploadFiles.splice(index, 1)
				console.log(this.$refs.uploadItem)
            },
            submitImageList(formName) {
                //const _this = this
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        if (this.imageList.length === 0) {
                            this.$message.error('请至少上传一个图片')
                            return false
                        }
                        let body = new FormData()
                        body.append('bookName', this.bookForm.name)
                        body.append('bookUploader', this.bookForm.uploader)
                        body.append('bookRank', this.bookForm.rank)
                        //body.append('book', new Blob([JSON.stringify(this.bookForm)], {type: "application/json"}))
                        for (let i = 0; i < this.imageList.length; i++) {
                            body.append('file', this.imageList[i])
                        }
                        axios({
                            url: '/book/add',
                            method: 'post',
                            data: body,
                            headers: {'Content-Type': 'multipart/form-data'}
                        }).then(response => {
                            console.log(response)
                            if (response.data['message'] === 'success') {
                                this.$message.success('创建图片集成功！')
                                window.location.reload()
                            } else if (response.data['message'] === 'failed') {
                                this.$message.error('上传第' + (response.data['failedIndex'] + 1) + '张图片时失败！图片集可能不完整！')
                                window.location.reload()
                            } else {
                                this.$message.error('未知错误，请联系管理员')
                            }
                        })
                    } else {
                        //console.log('error submit!!')
                        return false
                    }
                })
            }

        }

    }
</script>

<style>
  .uploadBook-background {
	background: url("../assets/kyouko.jpg") no-repeat center;
	height: 100%;
	width: 100%;
	background-size: cover;
	position: fixed;
	overflow: auto;
  }
  
  .uploadBook-card {
	margin: 30px auto;
	width: 800px;
	box-shadow: 0 0 20px #000000;
  }
</style>
