<template>
    <div class="body">
        <section>
            <swiper :list="imgList" v-model="imgIndex" @on-index-change="onIndexChange"></swiper>
        </section>
        <section>
            <teaching></teaching>
        </section>
        <!-- <section>
            <logistics></logistics>
        </section>
        <section>
            <human-resource></human-resource>
        </section> -->
        <footer>
            <nav-bar></nav-bar>
        </footer>
    </div>
</template>

<script>
import { Swiper } from 'vux'
import Teaching from './teaching'
/* import Logistics from '../components/home/logistics'
import HumanResource from '../components/home/hr' */
import NavBar from '../../base/nav-bar'
export default {
    components:{
        Swiper,
        NavBar,
        Teaching,
        /* Logistics,
        HumanResource, */
    },

    data(){
        return{
            imgIndex:'',
            imgList:[{
                url: 'javascript:',
                img: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vvsr72j20p00gogo2.jpg',
                title: '送你一朵fua'
                }, {
                url: 'javascript:',
                img: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vw1k2wj20p00goq7n.jpg',
                title: '送你一辆车'
                }, {
                url: 'javascript:',
                img: 'https://static.vux.li/demo/5.jpg', // 404
                title: '送你一次旅行',
                fallbackImg: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vw50iwj20ff0aaaci.jpg'
                }]

        }
    },
    methods:{
        onIndexChange(index){
            this.imgIndex = index;
        }
    }
    
}
</script>

<style lang="scss" scoped>
@function px2rem($px){
        $rem:37.5px;
        @return ($px / $rem) + rem; 
    }
    .body{
        padding-bottom: px2rem(120px);
        background: #f8f8f8;
    }
</style>
