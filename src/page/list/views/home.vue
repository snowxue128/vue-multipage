<template>
  <div id>
    <div @click="toDetail">去详情页</div>
    <div  class="box"></div>
    <div class="iconfont icon-zhuanfa"></div>
    <div class="iconfont">&#xe64d;</div>
  </div>
</template>
<script>
import { homeData } from "@server/api.js";
export default {
  name: "home",
  data() {
    return {};
  },
  created() {
    homeData().then(res => {
      console.log(res);
    });
  },
  // 加载数据
  mounted() {},
  // 相关操作事件
  methods: {
    toDetail() {
      this.$router.push("/detail");
    }
  },
  computed: {}
};
</script>

<style scoped lang="scss">
@import "../../../assets/css/mixin";
.box {
  background: pink;
  @include wh(100px, 100px);
  @include center;
  // height: calc(100% / 4 - 5px);
  // margin-right: calc(5px * 4 / 3);
}
</style>
