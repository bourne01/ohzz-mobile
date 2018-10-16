<template>
  <div>
        <my-header class="header">
            <div class="left" slot="left" @click="goBack">
                <img :src="require('../../../assets/backward.png')" alt="">
            </div>
            <div class="center" slot="center">               
                <popup-picker 
                    :data="termList"
                    :columns="1"
                    v-model="value"                    
                    :placeholder="curTermName" 
                    :show-name="true"
                    @on-hide="onHide"
                    >
                </popup-picker>
            </div>
            <div class="right" slot="right">
            </div>
        </my-header>
        <table>
            <thead>
                <tr>
                    <th class="order" rowspan="2">序号</th>
                    <th class="course" rowspan="2">课程</th>
                    <th class="process" colspan="2">平时成绩</th>
                    <th class="mid-term" colspan="2">期中成绩</th>
                    <th class="final-term" colspan="2">期末成绩</th>
                </tr>
                <tr>
                    <th>成绩</th>
                    <th>学分</th>
                    <th>成绩</th>
                    <th>学分</th>
                    <th>成绩</th>
                    <th>学分</th>
                </tr>
            </thead>
        </table>
        <div class="tbody" :style="tbodyObj">
            <table>
                <tbody v-if="!isTermNull">
                    <tr v-for="(score,index) in scoreList" :key="index" >
                        <td class="order" >{{index+1}}</td>
                        <td class="course">{{score.couName.length>4?score.couName.substr(0,8)+'...':score.couName}}</td>
                        <td class="score">{{score.ordScore}}</td>
                        <td class="credit">{{score.ordCredit}}</td>
                        <td class="score">{{score.midScore}}</td>
                        <td class="credit">{{score.midCredit}}</td>
                        <td class="score">{{score.finScore}}</td>
                        <td class="credit">{{score.finCredit}}</td>
                    </tr>                    
                </tbody>
                <tbody v-else>
                    <tr><td colspan="8" 
                        style="font-size:1.1rem;color:rgb(154, 150, 151);text-align:center;">{{errMsg}}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
  </div>
</template>

<script>
import MyHeader from '../../../components/base/my-header'
import { PopupPicker } from 'vux'
import { getSelector,getStudentScore } from '../../../api/api.js'
export default {
    components:{
        MyHeader,
        PopupPicker

    },
    data(){
        return{
            curTermName:'',//当前学期
            termList:[],//学期列表
            tbodyObj:{height:'',overflow:'scroll'},//表格内容高度及滚动样式
            scoreList:[],
            value:[],
            isTermNull:false,
            errMsg:'暂无数据'           
            }
    },
    methods:{         
        /**@function 返回上一个页面 */
        goBack(){
            history.go(-1);
        },
        /**@function 获取学期列表 
        */
        getTermList(){
            let params = {
                        f:'comboTerm',
                        addType:1
                       };
            getSelector(params)
                .then( res => {
                    this.curTermName = res.data[1][1]+' >';
                    this.getScoreByTermId(res.data[1][0]);
                    res.data.forEach((elem,idx) => {
                        this.termList.push({name:res.data[idx][1]+' >',value:res.data[idx][0]})
                    });
                    console.log(this.termList)   
                    
                })
                .catch(err => {
                    this.reqErrorHandler(err);
                })
        },
        /**@function 根据学期Id获取成绩 
         * @param {学期Id} termId
         * @param {课程Id} couId
         * @param {记录开始位置} start
         * @param {总共查询多少条记录} limit
        */
        getScoreByTermId(termId,couId,start,limit){
            let params = {
                    termId,
                    couId,
                    start,
                    limit
                }
            getStudentScore(params)
                .then( res => {
                    if(res.data.success){
                        this.isTermNull = false;
                        this.scoreList = res.data.dataList;
                        if(!this.scoreList.length)
                            this.isTermNull = true;
                            this.errMsg = '暂无数据'
                    }else{
                        this.isTermNull = true;
                        this.errMsg = '获取数据失败！'
                    }
                })
                .catch( err => {
                    this.isTermNull = true;
                    this.errMsg = '获取数据异常';
                    this.reqErrorHandler(err);
                })
        },
        onHide(){
            console.log(this.value);
            this.getScoreByTermId(this.value[0])
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
            }}
        },
    },
    created(){        
        this.getTermList();        
    },
    mounted(){
        let selector = document.querySelector('.vux-popup-picker-select');
        selector.style.textAlign = 'center';
        let htmlHeight = document.documentElement.clientHeight || document.body.clientHeight;
        let htmlWidth = document.documentElement.clientWidth || document.body.clientWidth;
        let tbodyHeight = htmlHeight - (96*htmlWidth/375) + 'px';       
        this.objTbody.height = tbodyHeight;
        }
        
}
</script>

<style lang="scss" scoped>
    @function px2rem($px){
        $rem:37.5px;
        @return ($px / $rem) + rem; 
    }
    .left img{
        width:px2rem(56px);
        height:px2rem(56px);
    }
    .save-txt{
        font-size:px2rem(28px);
    }
    .center{
        position: relative;
    }
    table{
        border:0;
        margin:0;
        border-collapse:collapse;
        border-spacing:0;
        width:100%;
        }
    thead tr{
        background-color:#f6f9f9;        
    }
    th{
        font-size:px2rem(24px);
        color:rgb(163,178,185);
        //width:px2rem(70px);
        height:px2rem(46px);
        border-right:1px solid #f2f3f9;
        box-sizing: border-box;
    }
    th:last-child{
        border-right:none
    }
    .order{
        width:px2rem(70px);
    }
    .course{
        width:px2rem(140px);
    }
    .name{
        border-left:none;
    }
    .process,.mid-term,.final-term{
        width:px2rem(180px);
    }    
    tbody tr{
        border-bottom:1px solid #f2f3f9;
    }
    tbody tr:nth-child(even){
        background-color:#edf7f9;
    }
    .score{
        width:px2rem(90px);
    }
    .credit{
        width:px2rem(90px);
    }
    tbody td{
        padding:px2rem(10px) 0;
        font-size:px2rem(24px);
        font-family: 'PingFang-SC-Medium';
        color:rgb(28,38,57);
        text-align:center;
        border-right:1px solid #f2f3f9;
        box-sizing: border-box;
        //width:px2rem(138px);
    }
    tbody td:last-child{
        border-right:none
    }       
</style>


