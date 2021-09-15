<template>
  <div>
    <el-form ref="form" :model="prize" label-width="80px">
        <el-form-item label="名称">
            <el-input v-model="prize.name"></el-input>
        </el-form-item>
        <el-form-item label="图片">
            <el-input v-model="prize.url"></el-input>
        </el-form-item>
        <el-form-item label="预览" style='text-align:left'>
            <el-image
              style="width: 100px; height: 100px"
              :src="prize.url"
              fit="contain"
              aria-flowto="left"
              :preview-src-list="[prize.url]">
            </el-image>
        </el-form-item>
        <div v-if="addButtons || updateButtons">
            <el-button v-if="addButtons" @click="add" type="primary" plain>添加</el-button>
            <el-button v-if="updateButtons" @click="update" type="primary" plain>更新</el-button>
            <el-button @click="cancel" type="primary" plain>取消</el-button>
        </div>
    </el-form>
  </div>
</template>

<script>
import * as API from "@/api/prize";
import { checkError } from "@/utils";

export default {
    name: "Prize",
    props: ['id', 'addButtons', 'updateButtons'],
    data() {
        return {
            prize: {
                // id: 1,
                // name: "幻13",
                // url: "https://tse3-mm.cn.bing.net/th/id/OIP-C._awktov9YyjaKHqgJtpniQHaE8?w=274&h=183&c=7&r=0&o=5&pid=1.7"
            }
        }
    },
    mounted() {
      this.loadData()
    },
    methods: {
        async loadData() {
            if (this.id == null){
                return
            }
            var re = await API.prize_get(new API.prize(this.id))
            if (checkError(re)){
                if (re["result"].length > 0){
                    this.prize = re["result"][0]
                }
            }
        },

        async add() {
            var re = await API.prize_add(this.prize)
            if (checkError(re)) {
                window.alert("success")
                this.$router.push('prizes')
            }
        },

        async update() {
            var re = await API.prize_update(this.prize)
            if (checkError(re)) {
                window.alert("success")
            }
        },

        cancel() {
            if (this.addButtons) {
                this.prize = {}
            }
            if (this.updateButtons){
                this.loadData()
            }
        }
    }
}
</script>

<style>

</style>