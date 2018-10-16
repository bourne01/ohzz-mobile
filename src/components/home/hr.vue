<template>
    <div class="Personnel-related">
        <div class="Personnel">
            <p>人事相关</p>
        </div>
        <div class="Questionnaire-investigation">
            <a href="#" class="investigation">
                <img src="../../assets/home/questionarie.png">
                <p>问卷调查</p>
            </a>    
        </div>
        <div class="Check-wages">
            <a href="#" class="wages">
                <img src="../../assets/home/salary.png">
                <p>查工资</p>
            </a>    
        </div>
        <div class="Special-student-report">
            <a href="#" class="Special">
                <img src="../../assets/home/special-report.png">
                <p>特殊生上报</p>
            </a>    
        </div>
    </div>
</template>
<style lang="scss" scoped>
   @function px2rem($px){
        $rem:37.5px;
        @return ($px / $rem) + rem; 
    }
    .Personnel-related{
        width: px2rem(750px);
        height: px2rem(256px);
        margin-top: px2rem(16px);
        background: white;
    }
    .Personnel{
        width: px2rem(640px);
        height: px2rem(44px);
        float: left;
        padding-top: px2rem(28px);
        margin-left: px2rem(32px);
    }
    .Personnel p{
        font-weight: Bold;
        font-size: px2rem(28px);
        font-family: Yu Gothic;
    }
    .Questionnaire-investigation{
        width: px2rem(120px);
        height: px2rem(120px);
        float: left;
        text-align: center;
        margin-left: px2rem(60px);
        padding-top: px2rem(30px)
    }
    .investigation{
        width: px2rem(120px);
        height: px2rem(120px);
        display: block;
    }
     .investigation p{
         font-size: px2rem(24px);
        color: #555555;
        text-align: center;
        font-family: Yu Gothic;
     }
     .Check-wages{
         width: px2rem(120px);
        height: px2rem(120px);
        float: left;
        text-align: center;
        margin-left: px2rem(60px);
        padding-top: px2rem(30px)
     }
     .wages{
        width: px2rem(120px);
        height: px2rem(120px);
        display: block;
     }
     .wages p{
          font-size: px2rem(24px);
        color: #555555;
        text-align: center;
        font-family: Yu Gothic;
     }
     .Special-student-report{
         width: px2rem(120px);
        height: px2rem(120px);
        float: left;
        text-align: center;
        margin-left: px2rem(60px);
        padding-top: px2rem(30px)
     }
     .Special{
         width: px2rem(120px);
        height: px2rem(120px);
        display: block;
     }
     .Special p{
          font-size: px2rem(24px);
        color: #555555;
        text-align: center;
        font-family: Yu Gothic;
     }
</style>

