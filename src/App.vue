<template>
    <div id="app">
        <router-view></router-view>
    </div>

</template>

<script>
    import {useAppStore} from './store'

    export default {
        name: 'app',
        components: {},
        setup() {
            const store = useAppStore()

            //在页面加载时读取sessionStorage里的状态信息
            if (sessionStorage.getItem('store')) {
                store.$patch(JSON.parse(sessionStorage.getItem('store')))
            }

            window.addEventListener('beforeunload', () => {
                sessionStorage.setItem('store', JSON.stringify(store.$state))
            })

            return {store}
        }
    }
</script>

<style>
    body {
        margin: 0px;
    }

    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 0px;
    }
</style>
