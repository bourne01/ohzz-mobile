<template>
  <div class="submit-button" :class="{'active':isClicked}" @click="onClick">
      <slot></slot>  
      
  </div>
</template>

<script>
export default {
    data(){
        return{
            isClicked:false,
        }
    },
    methods:{
        onClick(){
            this.isClicked = true;
            this.$emit('submit')
        }
    },
    created(){

    }
}
</script>

<style lang="scss" scoped>
    @function px2rem($px){
        $rem:37.5px;
        @return ($px / $rem) + rem; 
    }
    .submit-button{
        border-radius: 4px;
        height: px2rem(78px);
        line-height: px2rem(78px);
        background-color:#607FFF;
        font-size:px2rem(36px);
        width:px2rem(580px);
        text-align: center;
        color:#fff;     
    }
    .active{
        border: 1px solid #deb163;
        height: px2rem(84px);
        line-height: px2rem(84px);
         width:px2rem(624px);
    }     
</style>


