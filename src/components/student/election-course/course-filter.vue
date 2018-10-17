<template>
    <div v-transfer-dom>
        <popup v-model="filterShow" position="right" class="aa">
            <div class="screen-box">
                <h3>选择学期</h3>
                <!-- <select v-model="selected" class="spinner">
                    <option v-for="(term,idx) in termList" v-bind:value="term[0]" :key=idx>
                        {{ term[1]}}
                    </option>
                </select> -->
                <popup-picker 
                    :data="termList"
                    :columns="1"
                    v-model="termIds"                    
                    :placeholder="curTermName" 
                    :show-name="true"
                    @on-hide="onHide"
                    :value-text-align='"left"'
                    >
                </popup-picker>
                <!-- <group>
                    <selector placeholder="请选择学期" v-model="curTerm" :options="termList"></selector>
                </group> -->
                <h3>课程类型</h3>
                <div 
                    class="type-one" 
                    v-for="(courseType,idx) in courseTypes" :key="idx"
                    @click="onCourseTypeClick(courseType,idx)"
                    :class="{activeType:activeTypeIndex==idx}">
                    {{courseType.name}}
                </div>
                <div class="sure" @click="confirm">
                    确定
                </div>
            </div>
        </popup>
    </div>
</template>
<script>
import { getSelector }  from '../../../api/api.js'
import { TransferDom,Popup,Group,Selector,PopupPicker} from 'vux'
export default {
    props:['filter-show'],
    directives:{
        TransferDom,
    },
    components:{
        Popup,
        Group,
        Selector,
        PopupPicker
    },
    data(){
        return{
            termList:[],
            isShow:true,
            curTermName:'无限制',
            termIds:[],
            activeTypeIndex:-1,
            courseTypes:[
                {name:'类型一',value:1},
                {name:'类型一',value:1},
                {name:'类型一',value:1},
                {name:'类型一',value:1},
            ]
        }
    },
     methods:{
       confirm(){
           /* this.filterShow= false; */
           /* this.$root.bus.$emit('filter-close'); */
           this.$emit('filter-close')
       },
       /**@function 点击学期列表，获取课程列表 */
        onHide(){
            console.log(this.termIds);
            if(this.termIds.length == 0)return;//没有选择任何值
             /* this.classTable = [];//初始化课表
            this.getTeacherSchedule(this.me.autoId,this.termIds[0],2); */
        },
        /**
         * @function 监听点击课程类型事件，然后选择相应的课程类型
         * @param {课程类型} courseType
         * @param {课程类型对应的数组下标} index
         */
        onCourseTypeClick(courseType,index){
            this.activeTypeIndex = index;
        }
    },
    mounted(){
        let params = {
                    f:'comboTerm',
                    addType:1
                    };
            getSelector(params)
            .then(res => {
                this.termList = [];
                for(let item of res.data){
                    this.termList.push({value:item[0],name:item[1]})
                }
                

            })
}
}
</script>

<style lang="scss">
     @function px2rem($px){
        $rem:37.5px;
        @return ($px / $rem) + rem; 
    }
    .vux-popup-bottom{
        z-index:600!important;
    }
    .screen-box .vux-popup-picker-select{
        background-color:#EFEFEF!important;
        font-size:px2rem(28px);
        color:#000;
        border-radius: 4px;
        height:px2rem(64px);
        line-height:px2rem(64px);        
        box-sizing: border-box;
        margin-right:px2rem(46px)!important;
        padding-left:px2rem(20px);
    }
    .screen-box .vux-popup-picker-placeholder{
        padding-left:px2rem(20px);
    }
    .screen-box .vux-cell-box:not(:first-child):before{
        border-top: none!important;
    }
</style>


<style lang="scss" scoped>
     @function px2rem($px){
        $rem:37.5px;
        @return ($px / $rem) + rem; 
    }
    .screen-box{
        width: px2rem(558px);
/*         height: 100%;
        
        position: absolute;
        right: 0; */
        background: white;
        height:100%;
        padding-left: px2rem(46px);
        padding-right: px2rem(46px);
        box-sizing:border-box;
    }
    h3{
        font-size: px2rem(32px);
        padding-top: px2rem(84px);
        margin-bottom:px2rem(16px);
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
        box-sizing:border-box;
    }
    .type-one:nth-child(odd){
        margin-right:0;
        width: px2rem(224px);
    }
    .screen-box .type-one,.screen-box .spinner{
        background-color: #EFEFEF;
        border-radius: px2rem(8px);
        font-size: px2rem(24px);
        line-height: px2rem(64px);
        padding-left: px2rem(20px);
        margin-top: px2rem(16px);
    }
    .activeType{
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

