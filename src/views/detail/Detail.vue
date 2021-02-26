<template>
  <div id="Detail">
    <!-- nav-bar -->
    <detail-nav-bar class="NavBar" ref="nav" @titleClick="titleClick"></detail-nav-bar>
    
    <scroll class="content" ref="scroll" :probe-type='3' @scroll="contScroll">
      <!-- Swiper -->
      <detail-swiper :topImages="topImages"></detail-swiper>
      <!-- DetailBaseInfo -->
      <detail-base-info :goods="goods"></detail-base-info>
      <!-- DetailShopInfo -->
      <detail-shop-info :shop="shop"></detail-shop-info>
      <!-- DetailGoodsInfo -->
      <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <!-- DetailParamInfo -->
      <detail-param-info ref="param" :paramInfo="paramInfo"></detail-param-info>
      <!-- DetailCommentInfo -->
      <detail-comment-info ref="comment" :commentInfo="commentInfo"></detail-comment-info>
      <!-- GoodsList -->
      <goods-list ref="recommend" :goods="recommends"></goods-list>
    </scroll>
    <!-- back-top -->
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    <!-- Toast -->
    <toast :message='message' :show="show"></toast>
    <!-- DetailBottomBar -->
    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
  </div>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll'
import Toast from 'components/common/toast/Toast'
import GoodsList from 'components/content/goods/GoodsList'
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import DetailBottomBar from './childComps/DetailBottomBar'
import {getDatail, Goods, Shop, GoodsParam, getRecommend} from 'network/detail'
import {itemListenerMixin,backTomMixin} from "common/mixin"
import {debounce} from 'common/utils'
export default {
  name: "Detail",
  mixins:[itemListenerMixin,backTomMixin],
  data() {
    return {
      iid: 0,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      getThemeTopY: null,
      currentIndex: 0,
      message:"",
      show:false
    }
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    Scroll,
    Toast,
    GoodsList
  },
  created() {
    //保存传入的iid
    this.iid = this.$route.params.iid

    //根据iid请求详情数据
    getDatail(this.iid).then(res => {
      const data = res.result
      console.log(res)
      //获取顶部的图片的轮播数据
      this.topImages.push(...data.itemInfo.topImages)

      //获取商品信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
      //获取商铺信息
      this.shop = new Shop(data.shopInfo)
      //获取商品的详情数据
      this.detailInfo = data.detailInfo
      //获取参数的信息
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
      //获取评论的信息
      if(data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0]
      }
    }, err => {
      console.log(err);
    })
    //请求详情页面推荐数据
    getRecommend().then(res => {
      this.recommends = res.data.list
    })

    //给getThemTopY赋值
    this.getThemeTopY = debounce(() => {
      this.themeTopYs = []
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.param.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      console.log(this.themeTopYs);

    })
  },
  mounted(){
    // 监听item中图片加载完成
    this.$bus.$on('itemImageLoad', () => {
      this.$refs.scroll && this.$refs.scroll.refresh()
    })
  },
  updated(){
    
  },
  methods:{
    imageLoad(){
      this.$refs.scroll.refresh()
      this.getThemeTopY()
    },
    titleClick(index){
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 300)
    },
    contScroll(position){
      const positionY = -position.y;
      let length = this.themeTopYs.length;
      for(let i = 0; i < length; i++) {
        if(this.currentIndex != i && (i < length - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1] || (i === length -1 && positionY >= this.themeTopYs[i]))) {
          console.log(i);
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex
        }
      }
      //是否显示回到顶部
      this.listenShowBackTop(position)
    },
    addToCart(){
      // console.log("添加到购物车");
      // 获取商品在购物车需要展示的信息
      const product = {}
      product.image = this.topImages[0]
      product.iid = this.iid
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.newPrice
      product.realPrice = this.goods.realPrice
      console.log(product);
      // 将商品添加到购物车
      // this.$store.commit("addCart",product)
      this.$store.dispatch("addCart",product).then(res => {
        // this.message = res;
        // this.show = true
        // setTimeout(() => {
        //   this.show = false
        //   this.message = ""
        // }, 1500);
        this.$toast.show(res,1500)
      })
    }
  }
}
</script>

<style scoped>
#Detail{
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
.NavBar{
  position: relative;
  z-index: 9;
  background-color: #fff;
}
.content{
  height: calc(100% - 44px - 58px);
}
</style>