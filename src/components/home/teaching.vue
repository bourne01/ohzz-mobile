<template>
    <div class="classroom-teaching">
        <div class="Education-and-teaching">
            <p>教育教学</p>
        </div>
        <div class="Teachers-timetable">
            <a class="timetable" href="#" @click="onNavigate('teacher-schedule')">
                <img src="../../assets/home/teacher-schedule.png">
                <p>教师课表</p>
            </a>
        </div>
        <div class="Record-of-record">
            <a class="record" href="#" @click="onNavigate('record-score')">
                <img src="../../assets/home/record-score.png">
                <p>成绩管理</p>
            </a>
        </div>
        <!-- <div class="Class-schedule">
            <a class="schedule" href="#" @click="onNavigate('class-schedule')">
                <img src="../../assets/home/class-schedule.png">
                <p>班级课表</p>
            </a>
        </div> -->
        <div class="Class-attendance">
            <a class="attendance" href="#" @click="onNavigate('class-attendance')">
                <img src="../../assets/home/class-attendance.png">
                <p>班级考勤</p>
            </a>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{

        }
    },
    methods:{
        onNavigate(type){
            switch(type){
                case 'teacher-schedule':
                    this.$router.push('/my-schedule');
                    break;
                case 'record-score':
                    this.$router.push('/course-list');
                    break;
                case 'class-schedule':
                    this.$router.push('/class-schedule');
                    break;
                case 'class-attendance':
                    this.$router.push('/class-att');
                    break;
            }
        }
    }
}
</script>


<style lang="scss" scoped>
   @function px2rem($px){
        $rem:37.5px;
        @return ($px / $rem) + rem; 
    }
    .classroom-teaching{
        width: px2rem(750px);
        height: px2rem(256px);
        background:white;
    }
    .Education-and-teaching{
        width: px2rem(630px);
        height: px2rem(44px);
        float: left;
        padding-top: px2rem(28px);
        margin-left: px2rem(32px);
    }
    .Education-and-teaching p{
        font-size: px2rem(28px);
        font-weight: Bold;
        font-family: Yu Gothic;
    }
    .Teachers-timetable{
        width: px2rem(105px);
        height: px2rem(120px);
        float: left;
        text-align: center;
        margin-left: px2rem(66px);
        padding-top: px2rem(30px);
    }
    .timetable{
        width: px2rem(105px);
        height: px2rem(120px);
        display: block;
    }
    .timetable p{
        font-size: px2rem(24px);
        color: #555555;
        text-align: center;
        font-family: Yu Gothic;
    }

    .Record-of-record{
        width: px2rem(105px);
        height: px2rem(120px);
        float: left;
        text-align: center;
        margin-left: px2rem(66px);
        padding-top: px2rem(30px);
    }
    .record{
        width: px2rem(105px);
        height: px2rem(120px);
        display: block;
    }
    .record p{
        font-size: px2rem(24px);
        color: #555555;
        text-align: center;
        font-family: Yu Gothic;
    }

    .Class-schedule{
        width: px2rem(105px);
        height: px2rem(120px);
        float: left;
        text-align: center;
        margin-left: px2rem(66px);
        padding-top: px2rem(30px);
    }
    .schedule{
        width: px2rem(105px);
        height: px2rem(120px);
        display: block;
    }
    .schedule p{
        font-size: px2rem(24px);
        color: #555555;
        text-align: center;
        font-family: Yu Gothic;
    }

    .Class-attendance{
        width: px2rem(105px);
        height: px2rem(120px);
        float: left;
        text-align: center;
        margin-left: px2rem(66px);
        padding-top: px2rem(30px);
    }
    .attendance{
        width: px2rem(105px);
        height: px2rem(120px);
        display: block;
    }
    .attendance p{
        font-size: px2rem(24px);
        color: #555555;
        text-align: center;
        font-family: Yu Gothic;
    }
</style>
