<template>
<el-dialog title="奖品" v-if="dialogFormVisible" :visible.sync="dialogFormVisible" @close="cancel">
    <el-form ref="form" :model="prize" label-width="80px">
        <el-form-item label="名称">
            <el-input :disabled="updateAct" v-model="prize.name"></el-input>
        </el-form-item>
        <el-form-item label="概率">
            <el-input v-model="prize.probability"></el-input>
        </el-form-item>
        <el-form-item label="数量">
            <el-input v-model="prize.number"></el-input>
        </el-form-item>
        <el-form-item label="图片">
            <el-input :disabled="updateAct" v-model="prize.url"></el-input>
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
        <el-button v-if="addAct" @click="add" type="primary" plain>添加</el-button>
        <el-button v-if="updateAct" @click="update" type="primary" plain>更新</el-button>
        <el-button @click="cancel" type="primary" plain>取消</el-button>
    </el-form>
</el-dialog>
</template>

<script>
import * as API from "@/api/prize";
import { checkError } from "@/utils";
var actions = {
                add: "add",
                update: "update"
            }
var events = {
    add: "add",
    update: "update",
    cancle: "cancel"
}

export default {
    name: "PrizeDialog",
    props: {
        action: String,
        id: Number,
        prize: {
        },
    },
    data() {
        return {
            dialogFormVisible: true,
            addAct: false,
            updateAct: false,
        }
    },
    mounted() {
      this.init()
    },
    methods: {
        async init() {
            if (this.action == actions.add){
                this.addAct = true
            }else if (this.action == actions.update){
                this.updateAct = true
            }
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
            // throw a event
            this.close()
            this.$emit(events.add, this.prize)
        },

        async update() {
            this.close()
            this.$emit(events.update, this.prize)
        },

        cancel() {
            this.close()
            this.$emit(events.cancle)
        },

        close() {
            this.addAct = false
            this.updateAct = false
            this.dialogFormVisible = false
        },
    }
}
</script>

<style>

</style>