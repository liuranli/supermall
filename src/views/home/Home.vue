<template>
  <div id="home">
    <!-- navbar -->
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <!--tab-control 1  -->
    <tab-control class='tab-control1' :titles="['流行','新款','精选']" @tabClick='tabClick' ref="tabControl1" v-show="isTabFixed"></tab-control>

    <scroll 
      class="content" 
      ref="scroll" 
      :probe-type="3" 
      @scroll="contentScroll" 
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <!-- swiper -->
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <!-- RecommendView -->
      <recommend-view :recommends="recommends"></recommend-view>
      <!-- FeatureView -->
      <feature-view></feature-view>
      <!-- tabcontrol 2 -->
      <tab-control class='tab-control2' :titles="['流行','新款','精选']" @tabClick='tabClick' ref="tabControl2"></tab-control>
      <!-- GoodsList -->
      <goods-list :goods="showGoods"></goods-list>
    </scroll>

    <!-- BackTop -->
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    
  </div>
</template>

<script>
  import HomeSwiper from "./childComps/HomeSwiper"
  import RecommendView from './childComps/RecommendView'
  import FeatureView from './childComps/FeatureView'

  import NavBar from 'components/common/navbar/NavBar'
  import TabControl from 'components/content/tabControl/TabControl'
  import GoodsList from 'components/content/goods/GoodsList'
  import Scroll from 'components/common/scroll/Scroll'
  // import BackTop from 'components/content/backTop/BackTop'

  import {
    getHomeMultidata,
    getHomeGoods
  } from "network/home"
  import {itemListenerMixin,backTomMixin} from 'common/mixin'
  export default {
    name: "Home",
    data(){ 
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []}
        },
        currentType: 'pop',
        // isShowBackTop: false,
        tabOffsetTop: 0,
        isTabFixed: false,
        saveY: 0
      }
    },
    components: {
      HomeSwiper,
      RecommendView,
      FeatureView,
      NavBar,
      TabControl,
      GoodsList,
      Scroll,
      // BackTop
    },
    mixins:[itemListenerMixin,backTomMixin],
    created() {
      this.getHomeMultidata(),    //获取多条数据
      this.getHomeGoods("pop")        //获取pop数据
      this.getHomeGoods("new")        //获取new数据
      this.getHomeGoods("sell")        //获取sell数据
    },
    // mounted() {
    //   // 监听item中图片加载完成
    //   const refresh = debounce(this.$refs.scroll.refresh)
    //   this.$bus.$on('itemImageLoad', () => {
    //     this.$refs.scroll && refresh()
    //   })
    // },
    activated() {
      this.$refs.scroll.scrollTo(0, this.saveY, 0)
      this.$refs.scroll.refresh()
    },
    deactivated() {
      this.saveY = this.$refs.scroll.getScrollY()
    },
    computed:{
      showGoods(){
        return this.goods[this.currentType].list
      }
    },
    methods: {
      /**
      * 事件监听相关的方法
       */
      // debounce(func, delay) {
      //   let timer = null
      //   return function(...args) {
      //     if(timer) clearTimeout(timer)
      //     timer = setTimeout( () => {
      //       func.apply(this, args)
      //     }, delay)
      //   }
      // },
      tabClick(index){
          switch(index){
            case 0:
              this.currentType = 'pop'; break;
            case 1:
              this.currentType = 'new'; break;
            case 2:
              this.currentType = 'sell'; break;
          }
          this.$refs.tabControl1.currentIndex = index
          this.$refs.tabControl2.currentIndex = index
      },
      // backClick(){
      //     this.$refs.scroll.scrollTo(0, 0, 500)
      // },
      contentScroll(position){
        // 判断BackTop是否显示
        this.listenShowBackTop(position)
      //  this.isShowBackTop = (-position.y) > 1000
      //  决定tabControl是否吸顶(position:fixed)
      this.isTabFixed = (-position.y) > this.tabOffsetTop
      },
      loadMore(){
        this.getHomeGoods(this.currentType)

        this.$refs.scroll.scroll.refresh()
      },
      swiperImageLoad(){
        //获取tab-control的offsetTop
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
        console.log(this.$refs.tabControl2.$el.offsetTop)
      },
      /*
      * 网络请求相关的方法
      */
      getHomeMultidata(){
        getHomeMultidata().then(res => {
          this.banners = res.data.banner.list
          this.recommends = res.data.recommend.list
        })
      },
      getHomeGoods(type){
        // 获取当前页码
        const page = this.goods[type].page + 1;
        getHomeGoods(type,page).then(res => {
          console.log(res.data.list)
          this.goods[type].page = page
          this.goods[type].list.push(...res.data.list)

          this.$refs.scroll.finishPullUp()
        })
        
      }
    }
  }
</script>

<style scoped>
  #home{
    height: 100vh;
    /* padding-top: 44px; */
    /* padding-bottom: 49px; */
    position: relative;
  }
  .home-nav {
    background-color: var(--color-tint);
    color:#fff;
    /* position: fixed;
    top: 0px;
    left: 0px;
    right: 0px;
    z-index: 9; */
  }
  /* .tab-control{
    position: sticky;
    top:44px;
  } */
  .content{
    height: calc(100% - 93px);
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0px;
    right: 0px;
    overflow: hidden;
  }
  .tab-control1{
    position: relative;
    z-index:10;
  }
</style>
