<template>
   <div v-if="Object.keys(goods).length !== 0" class="base-info">
     <h4 class="info-title">{{goods.title}}</h4>
     <ul class="info-price">
       <li class="n-price">{{goods.newPrice}}</li>
       <li class="o-price">{{goods.oldPrice}}</li>
       <li v-if="goods.discount" class="discount"><span>{{goods.discount}}</span></li>
     </ul>
     <ul class="info-other">
       <li>{{goods.columns[0]}}</li>
       <li>{{goods.columns[1]}}</li>
       <li>{{goods.services[goods.services.length - 1].name}}</li>
     </ul>
     <hr/>
     <div class="info-service">
       <span class="info-service-item" v-for="index in goods.services.length-1" :key="index">
         <img v-lazy="goods.services[index-1].icon" :key='index' alt="">
         <span>{{goods.services[index-1].name}}</span>
       </span>
     </div>
   </div>
</template>

<script>
export default {
  name: "DetailBaseInfo",
  props: {
    goods:{
      type: Object,
      default(){
        return {}
      }
    }
  }
}
</script>

<style>
.base-info{
  padding: 0px 2%;
}
.info-title{
  padding: 2% 0;
  color: #000;
  font-weight: 600;
  font-size: 16px;
}
.info-price{
  display: flex;
}
.info-price li{
  margin: 5px 3px;
}
.n-price{
  color: red;
  font-size: 26px;
}
.o-price{
  text-decoration: line-through;
  align-self: flex-end;
}
.discount span{
  font-size: 12px;
  padding: 3px 5px;
  background-color: red;
  color: #fff;
  border-radius: 10px;
}
.info-other,.info-service{
  display: flex;
  justify-content: space-between;
  font-size: 14px;
}
.info-other{
  margin: 20px 0 5px 0;
}
.info-service{
  margin: 5px 0 20px 0;
}
.info-service img{
  width: 14px;
  margin-right:3px;
}
hr{
  background-color: #f0f0f0;
  height: 1px;
  border:none;
}
</style>