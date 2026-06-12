<template>
    <el-menu mode="horizontal"
             background-color="#303133"
             text-color="#C0C4CC"
             active-text-color="#FFFFFF"
             style="padding-left: 50px;border-bottom: 0;"
             :default-active="activeIndex"
             @select="handleSelect"
             router>
        <el-menu-item>FWZD</el-menu-item>
        <el-menu-item index="/signUp" style="float: right" route="signUp">注册</el-menu-item>
        <el-menu-item index="/login" style="float: right" route="login">登录</el-menu-item>
    </el-menu>
</template>

<script>
    export default {
        data() {
            return {
                activeIndex: this.$router.currentRoute.value.path,
            };
        },
        methods: {
            handleSelect(key, keyPath) {
                //console.log(key, keyPath);
            }
        },
        created() {
            //console.log(this.$router.currentRoute.path)
        }
    }
</script>

<style>

</style>
