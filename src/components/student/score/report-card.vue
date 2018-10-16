<template>
    <div>
        <my-header class="header">
            <div class="left" slot="left" @click="goBack">
                <img :src="require('../../../assets/backward.png')" alt="">
            </div>
            <div class="center" slot="center">成绩报告单</div>
            <div class="right" slot="right">
            </div>
        </my-header>
        <table class="basic-info">
            <caption>瓯海职业中专集团学校学业成绩报告单</caption>
            <tr>
                <th colspan="2" class="colspan2">姓名</th>
                <td colspan="3" class="colspan3">{{myReportCard.stuName}}</td>
                <th>班级</th>
                <td colspan="4">{{myReportCard.claName}}</td>
            </tr>
            <tr>
                <th colspan="2">性别</th>
                <td colspan="3">{{myReportCard.stuSex}}</td>
                <th>学号</th>
                <td>{{myReportCard.studentId}}</td>
                <th>中考分数</th>
                <td>{{myReportCard.joinScore}}</td>
            </tr>
            <tr>
                <th colspan="2">出生年月</th>
                <td colspan="3">{{myReportCard.birthday}}</td>
                <th>籍贯</th>
                <td colspan="4">{{myReportCard.origin}}</td>
            </tr>
            <tr>
                <th colspan="2">是否团员</th>
                <td colspan="3">{{myReportCard.isLeague}}</td>
                <th>民族</th>
                <td colspan="4">汉</td>
            </tr>
            <tr>
                <th colspan="2">家庭住址</th>
                <td colspan="8">{{myReportCard.address}}</td>
            </tr>
            <tr>
                <th colspan="2">原毕业学校</th>
                <td colspan="8">{{myReportCard.srcSchool}}</td>
            </tr>
            <tr>
                <th colspan="2">联系电话</th>
                <td colspan="8">{{myReportCard.tel}}</td>
            </tr>
            </table>
            <table>
            <tr>
                <th colspan="2">学期</th>
                <td>思想品德</td>
                <td>课程学分</td>
                <td>专业技能</td>
                <td>工学交替与实习</td>
                <td>身心健康</td>
                <td>总分</td>
            </tr>
            <tr v-for="(credit,index) in myCredits" :key="index">
                <td colspan="2">{{credit.term}}</td>
                <td>{{credit.cre1}}</td>
                <td>{{credit.cre2}}</td>
                <td>{{credit.cre3}}</td>
                <td>{{credit.cre4}}</td>
                <td>{{credit.cre5}}</td>
                <td>{{credit.total}}</td>
            </tr>
            <tr>
                <td colspan="2">总分</td>
                <td>{{myReportCard.cre10}}</td>
                <td>{{myReportCard.cre20}}</td>
                <td>{{myReportCard.cre30}}</td>
                <td>{{myReportCard.cre40}}</td>
                <td>{{myReportCard.cre50}}</td>
                <td>{{myReportCard.total0}}</td>
            </tr>           
        </table>
    </div>
</template>

<script>
import MyHeader from '../../base/my-header'
import { getStudentReportCard } from '../../../api/api';
export default {
    components:{
        MyHeader,
    },
    data(){
        return{
            myReportCard:{},//学分报告
            myCredits:[],//我的学分按学期组合
        }
    },
    methods:{
        /**@function 返回 */
        goBack(){
            history.go(-1);
        },
        /**@function 获取我的学分报告 */
        getReportCard(){
            let params = {};
            getStudentReportCard(params)
                .then(res=>{
                    if(res.data.success)
                        this.myReportCard = res.data;
                        let credit1 = {};
                        let credit2 = {};
                        let credit3 = {};
                        let credit4 = {};
                        let credit5 = {};
                        for(let key in res.data){
                            console.log(res.data.key);
                            if(key == 'cre11'){
                                credit1.cre1 = res.data.cre11
                                continue;
                            }else if(key == 'cre12'){
                                credit2.cre1 = res.data.cre12;
                                continue;
                            }else if(key == 'cre13'){
                                credit3.cre1 = res.data.cre13
                                continue;
                            }else if(key == 'cre14'){
                                credit4.cre1 = res.data.cre14;
                                continue;
                            }else if(key == 'cre15'){
                                credit5.cre1 = res.data.cre15;
                                continue;
                            }else if(key == 'cre16'){
                                credit6.cre1 = res.data.cre16;
                                continue;
                            }

                            if(key == 'cre21'){
                                credit1.cre2 = res.data.cre21;
                                continue;
                            }else if(key == 'cre22'){
                                credit2.cre2 = res.data.cre22;
                                continue;
                            }else if(key == 'cre23'){
                                credit3.cre2 = res.data.cre23;
                                continue;
                            }else if(key == 'cre24'){
                                credit4.cre2 = res.data.cre24;
                                continue;
                            }else if(key == 'cre25'){
                                credit5.cre2 = res.data.cre25;
                                continue;
                            }else if(key == 'cre26'){
                                credit6.cre2 = res.data.cre26;
                                continue;
                            }

                            else if(key == 'cre31'){
                                credit1.cre3 = res.data.cre31;
                                continue;
                            }else if(key == 'cre32'){
                                credit2.cre3 = res.data.cre32;
                                continue;
                            }else if(key == 'cre33'){
                                credit3.cre3 = res.data.cre33;
                                continue;
                            }else if(key == 'cre34'){
                                credit4.cre3 = res.data.cre34;
                                continue;
                            }else if(key == 'cre35'){
                                credit5.cre3 = res.data.cre35;
                                continue;
                            }else if(key == 'cre36'){
                                credit6.cre3 = res.data.cre36;
                                continue;
                            }

                            if(key == 'cre41'){
                                credit1.cre4 = res.data.cre41;
                                continue;
                            }else if(key == 'cre42'){
                                credit2.cre4 = res.data.cre42;
                                continue;
                            }else if(key == 'cre43'){
                                credit3.cre4 = res.data.cre43;
                                continue;
                            }else if(key == 'cre44'){
                                credit4.cre4 = res.data.cre44;
                                continue;
                            }else if(key == 'cre45'){
                                credit5.cre4 = res.data.cre45;
                                continue;
                            }else if(key == 'cre46'){
                                credit6.cre4 = res.data.cre46;
                                continue;
                            }

                            if(key == 'term1'){
                                credit1.term = res.data.term1;
                                continue;
                            }else if(key == 'term2'){
                                credit2.term = res.data.term2;
                                continue;
                            }else if(key == 'term3'){
                                credit3.term = res.data.term3;
                                continue;
                            }else if(key == 'term4'){
                                credit4.term = res.data.term4;
                                continue;
                            }else if(key == 'term5'){
                                credit5.term = res.data.term5;
                                continue;
                            }else if(key == 'term6'){
                                credit6.term = res.data.term6;
                                continue;
                            }

                            
                            if(key == 'total1'){
                                credit1.total = res.data.total1;
                                continue;
                            }else if(key == 'total2'){
                                credit2.total = res.data.total2;
                                continue;
                            }else if(key == 'total3'){
                                credit3.total = res.data.total3;
                                continue;
                            }else if(key == 'total4'){
                                credit4.total = res.data.total4;
                                continue;
                            }else if(key == 'total5'){
                                credit5.total = res.data.total5;
                                continue;
                            }else if(key == 'total6'){
                                credit6.total = res.data.total6;
                                continue;
                            }
                        }
                        this.myCredits.push(credit1,credit2,credit3,credit4,credit5);
                })
                .catch(err => {
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
        }
    },
    created(){
        this.getReportCard();
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
    table{
        border:1px solid #eff2f4;
        font-size:px2rem(24px);
        border-collapse: collapse;
        width:100%;
    }
    caption{
        font-size:px2rem(28px);
        height: px2rem(58px);
        line-height: px2rem(58px);
        background-color:#f6f9fb;
        color:#6b6f75;
    }
    td,th{
        border:1px solid #eff2f4;
        box-sizing: border-box;        
        text-align: center;
        padding:0 px2rem(8px);        
    }
    
    tr{
        height:2.5em;
    }
</style>


