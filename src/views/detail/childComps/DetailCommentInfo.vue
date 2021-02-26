<template>
  <div class="comment-info" v-if="Object.keys(commentInfo).length !== 0">
    <div class="infot-header">
      <div class="header-title">用户评价</div>
      <div class="header-more">
        更多
        <i class="arrow-right"></i>
      </div>
    </div>
    <div class="info-user">
      <img :src="commentInfo.user.avatar" alt="">
      <span>{{commentInfo.user.uname}}</span>
    </div>
    <div class="info-detail">
      <p>{{commentInfo.content}}</p>
      <div class="info-other">
        <span class="date">{{commentInfo.created | showDate}}</span>
        <span>{{commentInfo.style}}</span>
      </div>
      <div class="info-imgs">
        <img :src="item" v-for="(item, index) in commentInfo.images" :key="index" alt="">
      </div>
    </div>
  </div>
</template>

<script>
import {formatDate} from "common/utils"
export default {
  name: "DetailCommentInfo",
  props: {
    commentInfo: {
      type:Object,
      default(){
        return {}
      }
    }
  },
  filters:{
    showDate(value){
      const date = new Date(value * 1000)
      return formatDate(date, 'yyyy-MM-dd')
    }
  }
}
</script>

<style scoped>
.comment-info{
  padding: 0 2%;
  border-top: 6px solid #f0f0f0;
}
.infot-header{
  height:40px;
  display: flex;
  justify-content:space-between;
  align-items: center;
  font-weight: 700;
  border-bottom: 1px solid #e0e0e0;
}
.info-user{
  display: flex;
  align-items: center;
  padding: 10px 0;
  font-weight: 700;
}
.info-user img{
  width: 60px;
  border-radius: 50%;
  border: 1px solid #eee;
  margin-right: 10px;
}
.info-detail p{
 text-indent: 2em;
}
.info-other{
  display: flex;
  justify-content: start;
}
.info-other span{
  margin-right: 10px;
  font-size: 12px;
}
.info-imgs{
  display: flex;
}
.info-imgs img{
  width: 100px;
}
</style>