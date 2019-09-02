<template>

    <div class="wrap">
        子菜单二

        <a class="pan-btn tiffany-btn" @click="getParam" href="javascript:void(0)">获取从子菜单1-1传递的参数</a>


    </div>
</template>

<script>
    export default {
        name: "two",
        data(){
            return {
                aaa:"",
                bbb:"",
                ccc:"",

            }
        },

        methods:{

            getParam(){
                alert(JSON.stringify(this.$store.getters.GetQuery))
            }

        },
    }
</script>

<style scoped>

</style>