<template>
  <div class="recommend">
    <div v-for="item in recommends" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "RecommendView",
  props:{
    recommends:{
      type:Array,
      default(){
        return []
      }
    }
  }
}
</script>

<style>
 .recommend{
   display: flex;
   text-align: center;
   padding: 15px 0;
   font-size: 12px;
   border-bottom: 8px solid #f8f8f8;
 }
 .recommend-item{
   flex: 1;
   width: 25%;
 }
 .recommend-item img{
   margin-bottom: 5px;
   width: 80%;
 }
</style>