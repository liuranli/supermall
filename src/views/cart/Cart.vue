<template>
  <div class="cart">
    <!-- nav-bar 导航 -->
    <nav-bar  class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
    <!-- CartList 购物车列表 -->
    <cart-list></cart-list>
    <!--CartBottomBar 底部汇总 -->
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import {mapGetters} from 'vuex'
  import CartList from './childComps/CartList'
  import CartBottomBar from './childComps/CartBottomBar'
  export default {
    name: "Cart",
    components:{
      NavBar,
      CartList,
      CartBottomBar
    },
    computed: {
      // cartLength() {
      //   return this.$store.getters.cartLength
      // }
      ...mapGetters({
        cartLength: "cartLength"
      })
    }
  }
</script>

<style scoped>
.cart{
  height: 100vh;
  position: relative;
}
.nav-bar{
  background-color: var(--color-tint);
  color: #fff;
  font-weight: 700;
  position: relative;
  z-index: 9;
}
</style>
