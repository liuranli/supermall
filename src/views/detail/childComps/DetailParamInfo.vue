<template>
  <div class="param-info" v-if="Object.keys(paramInfo).length !== 0">
    <table v-for="(table, index) in paramInfo.sizes" class="info-size" :key="index">
      <tr v-for="(tr, index) in table" :key="index">
        <td v-for="(td, indez) in tr" :key="indez">{{td}}</td>
      </tr>
    </table>
    <table class="info-param">
      <tr v-for="(info, index) in paramInfo.infos">
        <td class="info-param-key">{{info.key}}</td>
        <td class="param-value">{{info.value}}</td>
      </tr>
    </table>
    <div class="info-img" v-if="paramInfo.image.length !== 0">
      <img :src="paramInfo.image" alt="">
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailParamInfo",
  props:{
    paramInfo:{
      type:Object,
      default() {
        return {}
      }
    }
  }
}
</script>

<style scoped>
.param-info{
  padding: 2%;
}
table{
  width: 100%;
}
table tr{
  display: flex;
  align-items: center;
  padding: 5px 0;
  border-bottom:1px solid #ccc;
}
table.info-size tr td{
  flex: 1;
}
table.info-param tr td:nth-child(1){
  flex: 1;
}
table.info-param tr td:nth-child(2){
  flex: 3;
  color: pink;
}
.info-img img{
  width: 100%;
}
</style>