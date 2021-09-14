<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="名称">
            <el-input v-model="name"></el-input>
        </el-form-item>
        <el-form-item label="图片">
            <el-input v-model="url"></el-input>
        </el-form-item>
        <el-form-item label="预览" style='text-align:left'>
            <el-image
              style="width: 100px; height: 100px"
              :src="url"
              fit="contain"
              aria-flowto="left"
              :preview-src-list="[url]">
            </el-image>
        </el-form-item>
    </el-form>
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
            name: "幻13",
            url: "https://tse3-mm.cn.bing.net/th/id/OIP-C._awktov9YyjaKHqgJtpniQHaE8?w=274&h=183&c=7&r=0&o=5&pid=1.7"
        }
    },
    methods: {
        onSubmit() {
            console.log('submit!');
        }
    }
}
</script>

<style>

</style>