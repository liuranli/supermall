<template>
  <div id="shop-item">
    <div class="item-selector">
      <!-- <input type="radio"> -->
      <CheckButton @click.native="checkClick" :is-checked="itemInfo.checked"></CheckButton>
    </div>
    <div class="item-img">
      <img v-lazy="itemInfo.image" alt="商品图片">
    </div>
    <div class="item-info">
      <div class="item-title">{{itemInfo.title}}</div>
      <div class="item-desc">{{itemInfo.desc}}</div>
      <div class="info-bottom">
        <div class="item-price left">￥{{itemInfo.price}}</div>
        <div class="item-count right">x{{itemInfo.count}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton'
export default {
  name: "CartListItem",
  components:{
    CheckButton
  },
  props:{
    itemInfo:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  methods:{
    checkClick(){
      this.itemInfo.checked = !this.itemInfo.checked
    }
  },
  mounted(){
    console.log(this.product);
  }
}
</script>

<style scoped>
div#shop-item{
  width: 100%;
  padding: 2%;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: space-between;
  flex-wrap: nowrap;
  flex-direction: row;
  border-bottom: 1px solid #e0e0e0;
}
div#shop-item * {
  max-width: 430px;
}
.item-selector{
  width: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 3px;
}
.item-img{
  flex: 1;
  margin-right: 1%;
}
.item-img img{
  width: 100%;
  border-radius: 5%;
}
.item-info{
  flex: 3;
}
.item-info>div{
  height: 40px;
  line-height: 40px;
}
.item-title{
  font-weight: 700;
  font-size: 18px;
}
.item-desc{
  font-size: 12px;
}
.item-price.left{
  color: chocolate;
  font-size: 18px;
}
.item-count.right{
  font-size: 16px;
}
.item-title,.item-desc{
  width: 70vw;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>