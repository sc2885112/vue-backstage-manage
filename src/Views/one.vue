<template>
    <div class="wrap">

        <a class="pan-btn light-blue-btn" @click="testOpen" href="javascript:void(0)">打开子菜单1-2并传递参数</a>
        <a class="pan-btn pink-btn" href="javascript:void(0)">跳转</a>



    </div>
</template>

<script>
    export default {
        name: "one",
        data(){
            return {

            }
        },
        methods:{
            testOpen(){

                /**
                 * 参数格式同 'MainConf.js' 中一样
                 */
                this.$tab.open(
                    {
                        title:"子菜单1-2",
                        menuId:"1-2",
                        component:"two",
                        query: {
                            aaa : "aaa",
                            bbb : "bbb",
                            ccc : "ccc"
                        }
                    }
                );



            },

            testSwitch(){


            }

        },
        created() {



        }

    }
</script>

<style scoped>

</style>