<template>
	<div class="myFWZD-background">
	<el-container>
		<el-header style="padding: 0">
			<HomePageHeader></HomePageHeader>
		</el-header>
		
		<el-main>
			<el-card class="myFWZD-card" shadow="never">
				<el-row>
					<div style="display: flex; justify-content: center;">
						<div style="width: 1111px">
							<div v-for="(item, index) in bookList.slice((currentPage-1)*pagesize,currentPage*pagesize)"
							     :key="item.id">
								<el-tooltip effect="dark" placement="bottom">
									<template #content>
										<p class="myFWZD-image-card-info">图片集名：{{item.name}}</p>
										<p class="myFWZD-image-card-info">上传时间：{{item.uploadTime}}</p>
										<p class="myFWZD-image-card-info">类型：{{item.rank}}</p>
									</template>
									<el-card class="myFWZD-image-card" bodyStyle="padding:0px" shadow="hover">
										<el-button-group style="position: absolute;">
											<el-button type="primary" icon="Edit" circle
											           @click="toEditBook(index)"></el-button>
											<el-button type="danger" icon="Delete" circle
											           @click="deleteBook(index)"></el-button>
										</el-button-group>
										<img class="myFWZD-image"
										     :src="axios.defaults.baseURL + '/book/upload/'+ item.cover"
										     @click="moreInfo(index)">
									</el-card>
								</el-tooltip>
							</div>
						</div>
					</div>
				</el-row>
				<el-row>
					<el-pagination
							@current-change="handleCurrentChange"
							:current-page="currentPage"
							:page-size="pagesize"
							:total="bookList.length">
					</el-pagination>
				</el-row>
			</el-card>
		</el-main>
	</el-container>
	</div>
</template>

<script>
    import HomePageHeader from "../components/HomePageHeader.vue";
    import {useAppStore} from "../store";

    export default {
        name: "MyFWZD",
        components: {
            HomePageHeader
        },
        setup() {
            return {store: useAppStore()}
        },
        data() {
            return {
                username: localStorage.getItem('username'),
                bookList: [],
                currentPage: 1,
                pagesize: 25
            }
        },
        mounted() {
            this.loadBooks()
        },
        methods: {
            loadBooks() {
                axios.get('/book/userBooks', {
                    params: {
                        uploader: this.username
                    }
                }).then(response => {
                    if (response && response.status === 200) {
                        this.bookList = response.data
                    }
                })
            },
            handleCurrentChange: function (currentPage) {
                this.currentPage = currentPage
            },
            toEditBook(index) {
                this.store.setBook(this.bookList[index])
                this.$router.push('/myBook')
            },
            deleteBook(index) {
                this.$confirm('确认删除整个图片集？所有的图片都将被删除！', '确认', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
					axios.post('/book/delete', this.bookList[index])
	                .then(response => {
	                    if(response.data.message === 'success') {
                            this.$message({
                                showClose: true,
                                message: '删除成功！',
                                type: 'success',
                                onClose() {
                                    window.location.reload()
                                }
                            })
	                    } else if(response.data.message === 'failed') {
	                        this.$message({
		                        showClose: true,
		                        message: '删除第' + response.data.failedIndex + '个时失败！',
		                        type: 'error'
	                        })
	                    }
	                })
                })
            },
            moreInfo(index) {
                this.store.setBook(this.bookList[index])
                this.$router.push('/bookInfo')
            }
        }
    }
</script>

<style>
	.myFWZD-background {
		background: url("../assets/homepage.jpg") no-repeat center;
		height: 100%;
		width: 100%;
		background-size: cover;
		position: fixed;
		overflow: auto;
	}
	
	.myFWZD-card {
		margin: 30px auto;
		width: 1200px;
		box-shadow: 0 0 20px #000000;
	}
	
	.myFWZD-image-card {
		border: 0;
		float: left;
		margin: 10px 10px 10px 10px;
		background-color: transparent;
	}
	
	.myFWZD-image-card-info {
		font-size: 14px;
		margin-bottom: 6px;
	}
	
	.myFWZD-image {
		object-fit: cover;
		width: 200px;
		height: 200px;
	}
</style>