<template>
  <div>
      <span>id</span><span>{{ prize.id }}</span><br/>
      <span>名称</span><span>{{ prize.name }}</span><br/>
      <span>图片</span><span>{{ prize.image }}</span><br/>
      <span>预览</span><span><el-image
              style="width: 100px; height: 100px"
              :src="prize.image"
              fit="contain"
              :preview-src-list="[prize.image]">
            </el-image></span><br/>
  </div>
</template>

<script>
export default {
    name: "Prize",
    props: {
        id: Number
    },
    data() {
        return {
            prize: {
                id: 1,
                name: "幻13",
                url: "https://tse3-mm.cn.bing.net/th/id/OIP-C._awktov9YyjaKHqgJtpniQHaE8?w=274&h=183&c=7&r=0&o=5&pid=1.7"
            }
        }
    },
    watch: {
        id(value) {
            console.log("prizeId: ", value)
            this.prize = this.prize
        }
    }
}
</script>

<style>

</style>