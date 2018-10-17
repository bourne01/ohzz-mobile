<template>
    <div class="background-color">
        <my-header class="header">
            <span class="left" slot="left">
                <img :src="require('../../../assets/election-course/back.png')" alt="" @click="goHome">
            </span>
            <span slot="center" class="home-course-tab">
                <!-- 课前、课后与学生讨论选项卡区已经有现成的不用再编写 -->
                <tab 
                    :line-width="3" custom-bar-width="4.1em"
                    default-color="#616475"
                    active-color="#4B78FF"
                    >
                    <tab-item  selected @on-item-click="onTabClick">选课中心</tab-item>
                    <tab-item @on-item-click="onTabClick">我的课程</tab-item>
                </tab>
            </span>
            <span class="right" slot="right" >
               <!--  <img :src="require('../../../assets/election-course/filter.png')" alt="" @click="onFilterClick"> -->
            </span>
        </my-header>
        <section>
           <div class="elective-course" 
                v-for="(course,idx) in courseList" 
                :key="idx" 
                v-if="actIndex == 0 && course.stuSel!=3"
                @click="goCourseDetail"
                >    
               <span>
                   <img :src="arrImg[idx%3]" alt="" >
               </span>
               <ul class="course-information">
                        <h3>{{course.couName}}</h3>
                        <li class="teacher">任课老师：{{course.thrName}}</li>
                        <li class="classroom">上课教室：{{course.classRoom}}</li>
                        <!-- <li class="starttime">开课时间：未定</li> -->
                        <li class="number">人数：<span class="class-number">{{course.manNumCur}}</span>/{{course.manNumUp}}</li>
                        <li class="btn" :class="{
                            select:isTaskEnabled && !isTaskClosed,//可选课时段
                            remind:!isTaskEnabled && isTaskClosed,//时间未到，任务未开启
                            }" 
                            :data-total="course.manNumUp"
                            :data-current="course.manNumCur"
                            @click.stop="onBtn(course.autoId)"                            
                            v-color>{{stateName}}</li>
               </ul>
           </div>
           <div class="my-courses"  v-if="actIndex == 1" v-for="(course,idx) in myCourseList" :key="idx">
                <span>
                   <img :src="arrImg[idx%3]" alt="">
                </span>
                <ul class="course-information">
                            <h3>{{course.couName}}</h3>
                            <li class="teacher">开课学期：{{course.termName}}</li>
                            <li class="classroom">上课教室：</li>
                            <li class="starttime number">开课时间：{{course.schedInf}}</li>
                            <!-- <li class="">人数：</li> -->
                            <li class="mycourse-btn"
                                :class="{
                                    remind:course.state==4,
                                    registered:course.state==3,
                                    quitElection:course.state ==2,}"
                                @click.stop="quitElection(course.selCouId,course.stuId,course.state)"
                                
                                >{{courseStateName[course.state-2]}}
                                
                                </li>
                </ul>
           </div>
        </section>         
        <course-filter :filter-show="filterShow" @filter-close="onFilterClose"></course-filter>  
        <!-- <nav-bar></nav-bar> -->
        
    </div>
</template>

<script>
import { Tab, TabItem, Sticky, Divider, XButton, Swiper, SwiperItem } from 'vux'
import MyHeader from '../../../components/base/my-header'
import NavBar from '../../../components/base/nav-bar' 
import { getElectTask, getStudentCourses, selectCourse, getMyCourses,getCourses,deleteCourse }  from '../../../api/api.js'
import { xhrErrHandler,goBack } from '../../../utils/util.js'
import CourseFilter from './course-filter' 
export default {
    components: {
        Tab,
        TabItem,
        Sticky,
        Divider,
        XButton,
        Swiper,
        SwiperItem,      
        MyHeader,
        NavBar, 
        CourseFilter,
    },
    directives:{
        /**@function 当选课人数已经满员的时候，改变颜色与状态值 */
        color:{
            inserted:function(el){                
                if(el.dataset.total - el.dataset.current<=0){
                    el.style.backgroundColor = " #FFE9E9";
                    el.style.color = "#FF3831";
                    el.innerText = "已满额"
                }
            }
        }
    },

    data(){
        return{
            actIndex:0,//默认激活选项卡内容,
            /* setBarWidth:function(index){
                return  (index+1)*2 + 'em';
            } */
            arrImg:[
                require("../../../assets/election-course/art.png"),
                require("../../../assets/election-course/art-two.png"),
                require("../../../assets/election-course/art-three.png"),
            ],
            courseList:[],//所有课程，包括已经满额
            stateNames:['已满额','时间未到','选课'],
            stateName:'',
            courseStateName:['退选','等待上课'],
            filterShow:false,
            myCourseList:[],//我已选的课程列表
            studentId:'',//学生Id
            taskNO:'',//任务编号
            isTaskEnabled:true,//任务开启
            isTaskClosed:false,//任务关闭
            taskList:[],//选课任何列表
        }
    },
    methods:{
        /**@function 监听点击选项卡事件 */
        onTabClick(idx){            
            this.actIndex = idx;
            this.filterShow = false;
            if(idx===1){
                getStudentCourses({start:0,limit:1000})
                    .then(res => {
                        if(res.data.success){
                            this.myCourseList = res.data.dataList;
                        }
                    })
            }else{
                 getCourses({
                        taskNO:this.taskNO,
                        stuId:this.stuId,
                        state:2 })
                    .then(res => {   
                        console.log(res)
                        if(res.data.success){
                            this.courseList = res.data.dataList;//课程列表对象           
                            console.log(this.courseList);                                
                        }
                    })
            }
        }, 
        /**@function 回退到首页 */
        goHome(){
            goBack('/student-home',this.$router);
        },
         /**@function 跳转进入课程详情 */
        goCourseDetail(){
           /*  this.$router.push('/student-course-detail'); */
        },

        /**
         * @function 选中课程
         * @param {被选课程的Id} courseId
         */
        onBtn(courseId){
            if(this.isTaskEnabled && !this.isTaskClosed){
                let params = {
                stuId:this.studentId,
                selCouId:courseId,
                }
                selectCourse(params)
                    .then(res => {
                        if(res.data.success){
                            getCourses({
                                    taskNO:this.taskNO,
                                    stuId:this.stuId,
                                    state:2 
                                    })
                                .then(res => {   
                                    console.log(res)
                                    if(res.data.success){
                                        this.courseList = res.data.dataList;//课程列表对象           
                                        console.log(this.courseList);                                
                                    }
                                })
                            this.$msgbox('选课',res.data.message,1500);
                        }else{
                            this.$msgbox('选课',res.data.message,10000);
                        }
                    })
                    .catch(err => {
                        xhrErrHandler(err,this.$router,this.$msgbox)
                    })
            }
            
        },

        /**
         * @function 退选课程
         * @param {被选课程的Id} courseId
         * @param {学生Id} studentId
         * @param {课程状态 2可退选，3，已被确认，即不课退选，4，课程已经完成} courseState
         */
        quitElection(courseId,studentId,courseState){
            if(courseState == 2){
                let params = {
                stuId:studentId,
                selCouId:courseId,
                }
                deleteCourse(params)
                    .then(res => {
                        if(res.data.success){
                            getStudentCourses({start:0,limit:1000})
                                .then(res => {
                                    if(res.data.success){
                                        this.myCourseList = res.data.dataList;
                                    }
                                })
                            this.$msgbox('选课',res.data.message,1500);
                        }else{
                            this.$msgbox('选课',res.data.message,10000);
                        }
                    })
                    .catch(err => {
                        xhrErrHandler(err,this.$router,this.$msgbox)
                    })
            }
            
        },


        /**@function 监听点击筛选图标，然后发送点击事件 */
        onFilterClick(){
            console.log('...filter show');
            this.filterShow = true;
        },

        onFilterClose(){
            console.log('close...');
            this.filterShow = false;
        }
    },

    mounted(){    
        this.$root.bus.$on('filter-close',() =>{
            this.filterShow = false;
        })      
        let params = {
            start:0,
            limit:50,
            
        };
        getElectTask(params)
            .then(res => {
                if(res.data.success){                    
                    this.taskList = res.data.dataList;//当前学生所有的任务列表
                    let lastesTask = res.data.dataList[res.data.dataList.length-1];//默认展示最近的选课任务
                    let curDateTime = new Date();
                    if(curDateTime < new Date(lastesTask.startTime)){//当前时间小于任务开启时间
                        this.isTaskEnabled = false;
                        this.isTaskClosed = true;
                        this.stateName = '时间未到'
                    }else if(curDateTime > new Date(lastesTask.endTime)){//当前时间大于任务关闭时间
                        this.isTaskClosed = true;
                        this.isTaskEnabled = false;
                        this.stateName = '时间已过'
                    }else{
                        this.isTaskEnabled = true;
                        this.isTaskClosed = false;
                        this.stateName = '选课'
                    }
                    console.log('.................................');
                    console.log(this.isTaskClosed,this.isTaskEnabled);
                    this.studentId = lastesTask.stuId;
                    this.taskNO = lastesTask.taskNO;
                    let params = {
                            taskNO:lastesTask.taskNO,
                            stuId:lastesTask.stuId,
                            state:2 
                            }
                        getCourses(params)
                            .then(res => {   
                                console.log(res)
                                if(res.data.success){
                                    this.courseList = res.data.dataList;//课程列表对象           
                                    console.log(this.courseList);                                
                                }
                            })
                }
            })
            
    }
}
</script>

<style lang="scss" scoped>
    @function px2rem($px){
        $rem:37.5px;
        @return ($px / $rem) + rem; 
    }
    .background-color{
        background-color: #f3f3f6;
    }
    .elective-course img,.my-courses img{
        width: px2rem(192px);
        height: px2rem(192px);
        margin: px2rem(32px);
        float: left;
    }
    .header{
        background-color: #fff;
    }
    .elective-course,.my-courses{
        background-color: #fff;
        height: px2rem(256px);
        font-size: px2rem(28px);
        margin-top: px2rem(16px);
    }
    ul{
        padding-top: px2rem(40px);
    }
    li{
        list-style: none;
        font-size: px2rem(24px);
    }
    .teacher,.starttime,.classroom{
        color: #999999;
    }
    h3{
        margin-bottom: px2rem(8px);
    }
    .number{
         margin-top: px2rem(8px);
         float: left;
    }
    li:last-child{
        width: px2rem(104px);
        height: px2rem(40px);
        border-radius: px2rem(4px);
        text-align: center;
        float: right;
        font-size: px2rem(22px);
        margin-right: px2rem(30px);
        line-height: px2rem(40px);
    }
    .btn{
        background-color: #607FFF;
        color: #fff;
    }
    .mycourse-btn{
        background-color: #DEE4FE;
        color: #607FFF;
    }
    .select{
        background-color: #607FFF;
    }
    .remind{
        background-color: #FFA560;
    }
    .full{
        background-color: #FFE9E9;
        color: #FF3831;
    }
    .vux-tab{
        height:px2rem(100px);
    }
    .home-course-tab{
        width:px2rem(350px);
    }
    .vux-tab-item{
        font-size:px2rem(32px)!important;
        font-weight: bold;
        background:none!important;
        line-height:px2rem(100px)!important;
    }
    .left{
        margin-left:px2rem(32px)
        }
    .left img{
        margin-left:px2rem(-20px);
    }
    .right{
        text-align: right;
        margin-right:px2rem(30px)
    }
    .class-number{
        color: #607FFF;
    }
    .take-lessons{
        color: #DF5D5D;
    }
    .quitElection{
        background-color: #FFE9E9;
        color: #FF3831;
    }
    .registered{
        background-color: #5DC87D;
        color: white;
    }
</style>

<style lang="scss" >
    @function px2rem($px){
        $rem:37.5px;
        @return ($px / $rem) + rem; 
    }
    .vux-tab-ink-bar{
        height:px2rem(6px)!important;
    }
</style>

