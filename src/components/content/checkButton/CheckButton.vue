<template>
  <div class="check-button" :class="{check: isChecked}">
    <!-- <img :src="~assets/img/cart/tick.svg" alt=""> -->
    <img src="~assets/img/cart/tick.svg" alt="">
  </div>
</template>

<script>
export default {
  name: "CheckButton",
  props:{
    isChecked: {
      type:Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
.check-button{
  width: 18px;
  height: 18px;
  border: 1px solid #aaa;
  border-radius: 50%;
  text-align: center;
  line-height: 18px;
}
.check{
  background-color: red;
  border-color: red;
}
</style>
