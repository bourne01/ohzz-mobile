<template>
  <div>
    <my-header class="header">
        <div class="left" slot="left" @click="goBack">
            <img :src="require('../../../assets/backward.png')" alt="">
        </div>
        <div class="center" slot="center">
            <!-- {{dt.getFullYear()}}年{{dt.getMonth()+1}}月 -->
            <popup-picker 
                    :data="termList"
                    :columns="1"
                    v-model="termIds"                    
                    :placeholder="curTermName" 
                    :show-name="true"
                    @on-hide="onHide"
                    >
            </popup-picker>
        </div>            
        <div class="right" slot="right"></div>
    </my-header>
    <table>
        <thead>
        <tr>
            <th>第<br>{{curWeek}}<br>周</th>
            <th 
                v-for="(numCn,index) in numberCn"
                :class="{ thActive: (index+1)==curWeekday }" 
                :key="index">
                周{{numCn}}<!-- <br>{{index}}日 -->
            </th>
        </tr>
        </thead>
    </table>
    <div :style="objTbody">
        <table>
        <tbody>
            <tr v-for="(classes,row) in classTable" :key="row">
                <td v-for="(_class,column) in classes" 
                    :class="{ tdActive: column==curWeekday&& column!=0 }" 
                    :key="column"
                    >   
                    <my-class
                        :row="row" 
                        :column="column" 
                        :my-class="_class"
                        :class-table="classTable">
                    </my-class>
                </td>
            </tr>
        </tbody>
    </table>
    </div>
</div>
</template>

<script>
import MyHeader from '../../base/my-header'
import MyClass from './class'
import { PopupPicker } from 'vux'
import { getCurrentWeek, getTerms, geStudentTimeTable } from '../../../api/api.js'
export default {
    components:{
        MyClass,
        MyHeader,
        PopupPicker,
    },
    data(){
        return{
            classTable:[],
            //objTableClass:{height:'',overflow:'scroll'},//设置课程高度，超过高度则实现滚动
            isActive:false,
            curWeek:'',
            curWeekday:'',
            dt:new Date(),
            numberCn:[
                    '一','二','三','四','五','六','日'
                    ],
            objTbody:{height:'',overflow:'scroll'},
            schedule:[],
            curTermName:'',
            termIds:[],
            termList:[],
        }
    },
    methods:{
        /**@function 返回上一个页面 */
        goBack(){
            this.$router.push('/student-home')
            },
        /**@function 获取当前是第几周 */
        getCurWeek(){
            let params = {state:2};
            getCurrentWeek(params)
                .then( res => {
                    let objData = res.data;
                    if(objData.success){
                        this.curWeek = objData.week;
                        this.curWeekday = objData.weekday;
                    }else{
                        this.$msgbox(objData.message);
                    }
                })
                .catch( err => {
                    console.log(errObj);
                    if(errObj.response){ 
                        let errResStatus = errObj.response.status; 
                        if(errResStatus == 500 || errResStatus == 504){
                            //this.$msgbox('网络异常','请稍后重试！',2000);
                            this.isException = true;
                        }else if(errResStatus == 404){
                            //this.$router.push('/page-not/found');
                        }else if(errResStatus == 401){
                            this.$msgbox('未授权登录,正在跳转...','',1000);
                            this.$router.push('/login')
                    }}
                })
        },
        /**@function 获取学期列表 
        */
        getTermList(){
            let params = {
                    state:2,
                       };
            getTerms(params)
                .then( res => {
                    if(res.data.success){
                        this.termList = [];
                        let termList = res.data.dataList;
                        //this.termList = termList;
                        termList.forEach((elem,idx) => {
                            console.log(termList[idx]);
                            this.termList.push({name:termList[idx].name+' >',value:termList[idx].autoId.toString()})
                        });
                        this.termList.unshift({name:"请选择学期 >",value:''});
                        for(let term of termList){
                            if(term.cur == 1){//当前学期值为1
                                this.curTerm = term;
                                this.curTermName = term.name+' >';
                                this.getMySchedule(term.autoId);
                                break;
                            }
                        }
                    }
                })
                .catch(err => {
                    this.reqErrorHandler(err);
                })
        },
        /**@function 获取学生课程表 
         * @param {学期Id} termId
        */
        getMySchedule(termId){
            let params = {
                        termId,
                        };
            geStudentTimeTable(params)
                .then( res => {
                    let objData = res.data;
                    this.schedule = [];
                    if(objData.success){
                        let lineSchedule = [];//一个星期的所有某一节课，如从星期一到星期天
                        for(let i=0;i<8;i++){
                            objData.lineSched.forEach( (_class,index) => {
                                if(index%8 == i){//按节转化列表中数据
                                    lineSchedule.push(_class)
                                }
                            });
                            this.schedule.push(lineSchedule);
                            lineSchedule = [];
                        }
                        //sessionStorage.setItem('Schedule',JSON.stringify(this.schedule))
                        this.reArrangeSchedule(this.schedule);
                        this.getCurWeek(); 
                    }
                })
                .catch(err => {
                    this.reqErrorHandler(err);
                })
        },
        /**@function 点击学期列表，获取课程列表 */
        onHide(){
            console.log(this.termIds);
            if(this.termIds.length == 0)return;//没有选择任何值
             this.classTable = [];//初始化课表
            this.getMySchedule(this.termIds[0]);
        },

        /**@function Ajax请求异常处理 
         * @param {出错对象} errObj
        */
        reqErrorHandler(errObj){
            console.log(errObj);
            if(errObj.response){
                let errResStatus = errObj.response.status; 
                if(errResStatus == 500 || errResStatus == 504){
                    //this.$msgbox('网络异常','请稍后重试！',2000);
                    this.isException = true;
                }else if(errResStatus == 404){
                    //this.$router.push('/page-not/found');
                }else if(errResStatus == 401){
                    this.$msgbox('未授权登录,正在跳转...','',1000);
                    this.$router.push('/login')
                }
            }
            
        },
        /**@function 重新整理课表，以便向界面输出 
         * @param {课表} schedule
        */
        reArrangeSchedule(schedule){
            for(let i=0;i<schedule.length;i++){
            let lineSchedule = [];
            for(let j=0;j<7;j++){
                lineSchedule.push({
                            teacherName:schedule[i][j][1],
                            classroom:schedule[i][j][2],
                            className:schedule[i][j][3],
                            courseName:schedule[i][j][0],
                            isShow:false})
            }
            lineSchedule.unshift(i);//向数组头部添加课序
            this.classTable.push(lineSchedule);
            }        
        }        
    },
    computed:{
        weekCn:function(){
            return this.numberCn[this.curWeek-1];
        }
    },
    created(){
        /* let schedule = JSON.parse(sessionStorage.getItem('Schedule'));
        for(let i=0;i<schedule.length;i++){
            let lineSchedule = [];
            for(let j=0;j<7;j++){
                lineSchedule.push({
                            name:schedule[i][j][0],
                            classroom:schedule[i][j][2],
                            classname:schedule[i][j][3],
                            teacher:schedule[i][j][1],
                            isShow:false})
            }
            lineSchedule.unshift(i);//向数组头部添加课序
            this.classTable.push(lineSchedule);
        } */
        //this.getCurWeek(); 
        this.getTermList();   
    },
    mounted(){
        let htmlHeight = document.documentElement.clientHeight || document.body.clientHeight;
        let htmlWidth = document.documentElement.clientWidth || document.body.clientWidth;
        let tbodyHeight = htmlHeight - (110*htmlWidth/375) + 'px';       
        this.objTbody.height = tbodyHeight;
    }
}
</script>

<style>
    .center .vux-popup-picker-select{
        text-align: center!important;
    }
</style>

<style lang="scss" scoped>
    @function px2rem($px){
        $rem:37.5px;
        @return ($px / $rem) + rem; 
    }
    .left img{
        width:px2rem(56px);
        height:px2rem(56px);
    }
    table{
        border:0;
        margin:0;
        border-collapse:collapse;
        border-spacing:0;
        }
    thead tr{
        background-color:#f6f9f9;        
    }
    thead th{
        padding:0;
        width:px2rem(98px);
        font-size:px2rem(24px);
        height:px2rem(98px);
        line-height: 1.1em;
    }
    thead th:first-child{
        width: px2rem(64px);
        font-size:px2rem(24px);
    }
    tbody td{
        text-align: center;
        width:px2rem(98px);
        height:px2rem(124px);
        position: relative;
    }
     tbody td:first-child{
        width:px2rem(64px);
    }
    .tdActive{
        background-color:rgb(233,240,251);
    }
    .thActive{
        background-color:rgb(73,120,195);
        font-family: 'PingFang-SC-Bold';
        font-size:px2rem(28px);
        color:#f6f9f9;
    }
</style>


