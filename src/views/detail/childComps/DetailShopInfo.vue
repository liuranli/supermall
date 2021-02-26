<template>
  <div class="shop-info">
    <div class="shop-top">
      <img :src="shop.logo" alt="">
      <h5 class="title">{{shop.name}}</h5>
    </div>
    <div class="shop-middle">
      <div class="shop-middle-item shop-middle-left">
        <div class="info-sells">
          <div class="sells-count">
            {{shop.sells | sellCountFilter}}
          </div>
          <div class="sells-text">总销量</div>
        </div>
        <div class="info-goods">
          <div class="goods-count">
            {{shop.goodsCount}}
          </div>
          <div class="goods-text">全部宝贝</div>
        </div>
      </div>
      <div class="shop-middle-item shop-middle-right">
        <table>
          <tr v-for="(item, index) in shop.score" :key="index">
            <td>{{item.name}}</td>
            <td class="score" :class="{'score-better':item.isBetter}">{{item.score}}</td>
            <td class="better" :class="{'better-more':item.isBetter}"><span>{{item.isBetter ? '高' : '低'}}</span></td>
          </tr>
        </table>
      </div>
    </div>
    <div class="shop-bottom">
      <div class="enter-shop">进店逛逛</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailShopInfo",
  props:{
    shop:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  filters:{
    sellCountFilter(value){
      return value < 10000 ? value : (value/10000).toFixed(1) + "万"
    }
  }
}
</script>

<style scoped>
.shop-info{
  padding: 0px 2%;
}
.shop-top{
  display: flex;
  align-items: center;
}
.shop-top img{
  width: 60px;
  border-radius: 50%;
  border: 1px solid #c0c0c0;
}
.shop-top .title{
  font-size: 16px;
  margin-left: 6px;
}

.shop-middle {
  display: flex;
  flex-wrap: nowrap;
}
.shop-middle-item.shop-middle-left,.shop-middle-item.shop-middle-right {
  width: 50%;
}
.shop-middle-item.shop-middle-left{
  padding: 10px 0;
  display: flex;
  align-items: center;
  border-right: 1px solid #888;
}
.shop-middle-item.shop-middle-left>div{
  flex: 1;
  font-weight: 700;
  font-size: 14px;
  text-align: center;
}
.shop-middle-item.shop-middle-left>div>div{
  height: 22px;
  line-height: 22px;
}
.shop-middle-item.shop-middle-right{
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-size: 14px;
  line-height: 24px;
}
.shop-middle-item.shop-middle-right td{
  padding: 0px 5px;
}
.score{
  color: #00ff00;
}
.better{
  background-color: #00ff00;
  color: #fff;
  border-radius: 5px;
}
.score-better{
  color: red;
}
.better-more{
  background-color: red;
}
.shop-bottom{
  margin-top: 3px;
  text-align: center;
  display: flex;
  justify-content: center;
}
.enter-shop{
  width: 100px;
  padding: 5px;
  background-color: #ccc;
  border-radius: 5px;
  color: #fff;
}
</style>