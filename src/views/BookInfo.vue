<template>
  <div class="bookInfo-background">
  <el-container>
	<el-header style="padding: 0">
	  <HomePageHeader></HomePageHeader>
	</el-header>
	<el-main>
	  <el-card class="bookInfo-card" shadow="never">
		<div style="display: flex; justify-content: center;">
		  <el-col style="width: 400px">
			<el-card class="bookInfo-cover-card" bodyStyle="padding:0px" shadow="hover">
			  <el-image :src="axios.defaults.baseURL + '/book/upload/' + book.cover"></el-image>
			</el-card>
		  </el-col>
		  <el-col style="width: 50px"></el-col>
		  <el-col style="width: 400px;text-align: left">
			<el-form label-width="100px" label-position="right">
			  <el-form-item label="图片集名：">
				<el-input v-model="book.name" readonly></el-input>
			  </el-form-item>

			  <el-form-item label="上传者：">
				<el-input v-model="book.uploader" readonly></el-input>
			  </el-form-item>

			  <el-form-item label="上传时间：">
				<el-input v-model="book.uploadTime" readonly></el-input>
			  </el-form-item>

			  <el-form-item label="类型：">
				<el-input v-model="book.rank" readonly></el-input>
			  </el-form-item>

			  <el-form-item label="页数：">
				<el-input v-model="book.size" readonly></el-input>
			  </el-form-item>
			</el-form>
		  </el-col>
		</div>
	  </el-card>
	  <el-card class="bookInfo-card" shadow="never">
		<div v-for="(item, index) in imageList">
		  <el-card class="bookInfo-image-card" bodyStyle="padding:0px" shadow="hover">
			<img class="bookInfo-image"
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
        name: "BookInfo",
        components: {
            HomePageHeader
        },
        setup() {
            return {store: useAppStore()}
        },
        data() {
            return {
                book: '',
                imageList: []
            }
        },
        methods: {
            getParams: function () {
                this.book = this.store.book
            },
            getBookImageList: function () {
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
            imageView: function (index) {
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
  .bookInfo-background {
	background: url("../assets/kyouko.jpg") no-repeat center;
	height: 100%;
	width: 100%;
	background-size: cover;
	position: fixed;
	overflow: auto;
  }
  
  .bookInfo-card {
	margin: 30px auto;
	width: 920px;
	box-shadow: 0 0 20px #000000;
  }
  
  .bookInfo-cover-card {
	border: 0;
	max-width: 400px;
	margin: 0 10px 10px 10px;
	background-color: transparent;
  }
  
  .bookInfo-image-card {
	border: 0;
	float: left;
	margin: 10px 10px 10px 10px;
	background-color: transparent;
  }
  
  .bookInfo-image {
	object-fit: contain;
	width: 200px;
	height: 240px;
  }
</style>
