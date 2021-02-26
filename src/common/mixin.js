import {debounce} from "./utils"
import BackTop from 'components/content/backTop/BackTop'
export const itemListenerMixin = {
  data(){
    return {
      itemImgListener: null
    }
  },
  mounted() {
    let newRefresh = debounce(this.$refs.scroll.refresh, 100)
    this.itemImgListener = () => {
      newRefresh()
    }
    this.$bus.$on('itemImgLoad',this.itemImgListener)
  }
}


export const backTomMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShowBackTop: false
    }
  },
  methods: {
    backClick() {
      this.$refs.scroll.scrollTo(0,0,300)
    },
    listenShowBackTop(position){
      // 判断BackTop是否显示
     this.isShowBackTop = (-position.y) > 1000
    }
  }
}