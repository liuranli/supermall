<template>
  <ul class="cart-list">
   <scroll class="content" ref="scroll">
     <!-- <li v-for="item in cartList">{{item}}</li> -->
     <cart-list-item v-for="(item,index) in cartList" :key="index" :itemInfo="item"></cart-list-item>
   </scroll>
  </ul>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll'
import CartListItem from './CartListItem'
import { mapGetters } from 'vuex'
export default {
  name: "CartList",
  components:{
    Scroll,
    CartListItem
  },
  computed:{
    ...mapGetters(["cartList"])
  },
  activated() {
    this.$refs.scroll.refresh()
  }
}
</script>

<style scoped>
.cart-list{
  height: calc(100% - 93px - 40px);
}
.content{
  width: 100%;
  height: 100%;
  }
</style>