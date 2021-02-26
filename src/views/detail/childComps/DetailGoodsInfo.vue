<template>
  <div v-if="Object.keys(detailInfo).length !== 0" class="detail-goods-info">
    <div class="info-desc clear-fix">
      <div class="start"></div>
      <div class="desc">{{detailInfo.desc}}</div>
      <div class="end"></div>
    </div>
    <div class="info-key">{{detailInfo.detailImage[0].key}}</div>
    <div class="info-list">
      <img v-for="(item, index) in detailInfo.detailImage[0].list" :key="index" @load="imgLoad" :src="item" alt="">
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailGoodsInfo",
  props:{
    detailInfo:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  data(){
    return {
      counter: 0,
      imagesLength: 0
    }
  },
  methods:{
    imgLoad() {
      //判断，所有图片都加载完成，那么进行一次回调就可以了
      // if(++this.counter === this.imagesLength){
        this.$emit('imageLoad')
      // }
    }
  },
  watch:{
    detailInfo() {
      //获取图片的个数
      this.imageLength = this.detailInfo.detailImage[0].list.length
    }
  }
}
</script>

<style scoped>
.detail-goods-info{
  height: auto;
}
.desc{
  text-indent: 2em;
  padding: 2%;
  line-height: 20px;
}
.info-key{
  text-align: center;
  line-height: 20px;
  font-size: 18px;
  font-weight: 700;
  margin: 5px 0;
}
img{
  width: 100%;
}
</style>