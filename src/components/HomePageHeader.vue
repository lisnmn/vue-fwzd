<template>
    <div>
        <el-menu mode="horizontal"
                 background-color="#303133"
                 text-color="#C0C4CC"
                 active-text-color="#FFFFFF"
                 style="padding-left: 50px; border-bottom: 0;"
                 :default-active="activeIndex"
                 @select="handleSelect"
                 router>
            <el-menu-item index="/homepage">FWZD首页</el-menu-item>
            <el-menu-item style="float: right" @click="logout">退出</el-menu-item>
            <el-menu-item index="/uploadBook" style="float: right">上传图片集</el-menu-item>
            <el-sub-menu index="username" style="float: right">
                <template #title>{{ username }}</template>
                <el-menu-item index="/userInfo" style="text-align: center">基本资料</el-menu-item>
                <el-menu-item index="/myFWZD" style="text-align: center">我的FWZD</el-menu-item>
            </el-sub-menu>
        </el-menu>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                username: localStorage.getItem('username'),
                activeIndex: this.$router.currentRoute.value.path,
            };
        },
        methods: {
            handleSelect(key, keyPath) {
                //console.log(key, keyPath);
            },
            logout() {
                localStorage.removeItem('Flag')
                localStorage.removeItem('username')
                this.$router.push('/login')
            },
        },
        created() {
            //console.log(this.$router.currentRoute.path)
        }
    }
</script>

<style>

</style>
