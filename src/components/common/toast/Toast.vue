<template>
  <div v-show="isShow" class="toast">
    <div>{{message}}</div>
  </div>
</template>

<script>
export default {
  name: "Toast",
  props:{
    // message:{
    //   type:String,
    //   default:""
    // },
    // show:{
    //   type:Boolean,
    //   default:false
    // }
  },
  data(){
    return {
      message:"",
      isShow:false
    }
  },
  methods:{
    show(res,time=1500){
      this.message = res
      this.isShow = true
      setTimeout(() => {
        this.message = ""
        this.isShow = false
      }, time);
    }
  }
}
</script>

<style scoped>
.toast{
  position: fixed;
  top: 50%;
  left: 50%;
  padding: 8px 10px;
  color: #fff;
  border-radius: 5px;
  transform: translate(-50%,-50%);
  background-color: rgba(0,0,0,.7);
  z-index: 10;
}
</style>