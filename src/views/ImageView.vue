<template>
  <div class="imageView-background">
  <el-container>
	<el-header style="padding: 0">
	  <HomePageHeader></HomePageHeader>
	</el-header>
	<el-main>
	  <el-row>
		<div>
		  <el-image @click="currentPage===imageList.length?currentPage=1:currentPage++"
					:src="axios.defaults.baseURL + '/book/upload/' + imageList[currentPage-1].url"
					lazy></el-image>
		</div>
	  </el-row>
	  <el-row style="padding-top: 20px">
		<el-pagination
				@current-change="handleCurrentChange"
				background
				layout="prev, pager, next"
				:current-page="currentPage"
				:page-size="pagesize"
				:total="imageList.length">
		</el-pagination>
	  </el-row>
	</el-main>
  </el-container>
  </div>
</template>

<script>
    import HomePageHeader from "../components/HomePageHeader.vue";
    import {useAppStore} from "../store";

    export default {
        name: "ImageView",
        components: {
            HomePageHeader
        },
        setup() {
            return {store: useAppStore()}
        },
        data() {
            return {
                imageList: [],
                currentPage: 1,
                pagesize: 1
            }
        },
        methods: {
            getParams: function () {
                this.imageList = this.store.imageList
                this.currentPage = this.store.imageIndex + 1
            },
            handleCurrentChange: function (currentPage) {
                this.currentPage = currentPage
            },
        },
        created() {
            this.getParams()
        }
    }
</script>

<style>
  .imageView-background {
	height: 100%;
	width: 100%;
	background-size: cover;
	position: fixed;
	overflow: auto;
  }

</style>
