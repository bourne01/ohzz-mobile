<template>
    <div class="screen" v-show="hidde">
        <div class="screen-box">
          <h3>选择学期</h3>
         <select v-model="selected" class="spinner">
            <option v-for="(term,idx) in termList" v-bind:value="term[0]" :key=idx>
                 {{ term[1]}}
            </option>
         </select>
          <h3>课程类型</h3>
          <div class="type-one" v-for="idx in 4" :key="idx">
             类型一
          </div>
          <div class="sure" @click="sure">
              确定
          </div>
        </div>
    </div>
</template>
<script>
import { getSelector }  from '../../api/api.js'
export default {
    data(){
        return{
            hidde:true,
            termList:[],
        }
    },
     methods:{
       sure(){
           this.hidde= false;
       }
    },
    mounted(){
        let params = {
                        f:'comboTerm',
                        addType:1
                       };
              getSelector(params)
                .then(res => {
                  this.termList = res.data;

            })
}
}
</script>


<style lang="scss" scoped>
     @function px2rem($px){
        $rem:37.5px;
        @return ($px / $rem) + rem; 
    }
    .screen{
         background-color:rgba(0,0,0,.5);
         width: 100%;
         height: 100%;
         position: absolute; 
         top: 0%; 
         left: 0%; 
    }
    .screen-box{
        width: px2rem(558px);
        height: 100%;
        background: white;
        position: absolute;
        right: 0;
        padding-left: px2rem(46px);
    }
    h3{
        font-size: px2rem(32px);
        margin-top: px2rem(68px);
    }
    .spinner{
        width: px2rem(466px);
        height: px2rem(64px);
        border: 0;
    }
    .type-one{
        width: px2rem(210px);
        height: px2rem(64px);
        float: left;
        margin-right: px2rem(32px);
    }
    .screen-box .type-one,.screen-box .spinner{
        background-color: #EFEFEF;
        border-radius: px2rem(8px);
        font-size: px2rem(24px);
        line-height: px2rem(64px);
        padding-left: px2rem(20px);
        margin-top: px2rem(16px);
    }
    .select{
        background-color: #DEE4FE;
        color: #607FFF;
    }
    .sure{
        width: px2rem(466px);
        height: px2rem(80px);
        background-color: #607FFF;
        border-radius: px2rem(8px);
        text-align: center;
        line-height: px2rem(80px);
        font-size: px2rem(32px);
        position: absolute;
        bottom: px2rem(78px);
        left: px2rem(46px);
        color: white;
    }
    img,span{
        float: right;
        transform:rotate(-45deg);
        -ms-transform:rotate(-45deg); 	
        -moz-transform:rotate(-45deg); 	
        -webkit-transform:rotate(-45deg); 
        -o-transform:rotate(-45deg);
        position: absolute;
        top: px2rem(30px);
        right: px2rem(84px);
    }
</style>

