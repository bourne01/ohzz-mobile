<template>
    <div class="course" @click="goTo">
        <div class="left">
            <img :src="require('../../assets/course-cover'+(index+1)%8+'.png')" alt="">
            <div>
                <div class="class-name">
                    {{course.className}}
                </div>
                <div class="course-name">{{course.couName}}</div>
            </div>
            
        </div>
        <div class="right"><img :src="require('../../assets/forward.png')" alt=""></div>
    </div>
</template>

<script>
export default {
    props:['course','index'],
    data(){
        return{

        }
    },
    methods:{
        /**@function 根据课程Id跳转到课程详情页面 */
        goTo(){
            this.$router.push('/record-score');
        }
    },
  
}
</script>

<style lang="scss" scoped>
    @function px2rem($px){
        $rem:37.5px;
        @return ($px / $rem) + rem; 
    }
    .course{
        display:flex;
        justify-content: space-between;

    }
    .left{
        display: flex;
    }
    .left img{
        width:px2rem(216px);
        margin-right:px2rem(40px);
    }
    .left>div{
        display:flex;
        flex-direction: column;
        justify-content: space-between;
    }
    .class-name{
        font-size:px2rem(24px);
        color:rgb(28,38,57);
        font-family: 'PingFang-SC-Medium';
    }
    .class-name span{
        display:inline-block;
        width:4em;
    }
    .course-name{
        font-size:px2rem(40px);
        color:#607FFF;
        font-family: 'PingFang-SC-Medium';
        margin-bottom:px2rem(20px);
        font-weight: bold;
    }    
    .right{
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    .right img{
        width:px2rem(80px);
    }
</style>


