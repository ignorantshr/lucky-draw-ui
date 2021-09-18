<template>
<el-dialog title="奖品" v-if="dialogFormVisible" :visible.sync="dialogFormVisible" @close="cancel">
    <el-table
        v-if="attachAct"
        :data="prizes"
        border
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="id"
          v-if="false">
        </el-table-column>
        <el-table-column
          sortable
          prop="name"
          label="名称"
          width="130">
        </el-table-column>
        <el-table-column
          sortable
          prop="probability"
          label="概率"
          width="80">
          <template v-slot="scope">
            <el-input v-model="scope.row.probability"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          sortable
          prop="number"
          label="数量"
          width="80">
          <template v-slot="scope">
            <el-input v-model="scope.row.number"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="url"
          label="图片">
        </el-table-column>
        <el-table-column
          prop="url"
          label="预览">
          <template v-slot="scope">
            <el-image
              style="width: 100px; height: 100px"
              :src="scope.row.url"
              fit="contain"
              :preview-src-list="[scope.row.url]">
            </el-image>
          </template>
        </el-table-column>
    </el-table>
    <el-form v-if="!attachAct" ref="form" :model="prize" label-width="80px">
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
    </el-form>
    <el-button v-if="addAct" @click="add" type="primary" plain>添加</el-button>
    <el-button v-if="attachAct" @click="attach" type="primary" plain>添加</el-button>
    <el-button v-if="updateAct" @click="update" type="primary" plain>更新</el-button>
    <el-button @click="cancel" type="primary" plain>取消</el-button>
</el-dialog>
</template>

<script>
// import * as prizeAPI from "@/api/prize";
import * as poolAPI from "@/api/pool";
import { checkError } from "@/utils";
var actions = {
                add: "add",
                update: "update",
                attach: "attach"
            }
var events = {
    add: "add",
    update: "update",
    cancle: "cancel",
    attach: "attach"
}

export default {
    name: "PrizeDialog",
    props: {
        action: String,
        id: Number,
        prize: {
            probability: Number,
            number: Number
        },
    },
    data() {
        return {
            dialogFormVisible: true,
            addAct: false,
            updateAct: false,
            attachAct: false,
            multipleSelection: [],
            prizes: []
        }
    },
    mounted() {
      this.init()
    },
    methods: {
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        async init() {
            if (this.action == actions.add){
                this.addAct = true
            }else if (this.action == actions.update){
                this.updateAct = true
            }else if (this.action == actions.attach){
                this.attachAct = true
                let re = await poolAPI.pool_getUnpoolPrize(this.id)
                if (checkError(re)){
                    if (re["result"].length > 0){
                        this.prizes = re["result"]
                    }
                }
            }
        },

        async add() {
            // throw a event
            this.close()
            this.$emit(events.add, this.normalPrize(this.prize))
        },

        async attach() {
            // throw a event
            this.close()
            this.$emit(events.attach, this.normalPrizes(this.multipleSelection))
        },

        async update() {
            this.close()
            this.$emit(events.update, this.normalPrize(this.prize))
        },

        cancel() {
            this.close()
            this.$emit(events.cancle)
        },

        close() {
            this.addAct = false
            this.updateAct = false
            this.attachAct = false
            this.dialogFormVisible = false
        },

        normalPrizes(prizes) {
            for (let i in prizes){
                prizes[i] = this.normalPrize(prizes[i])
            }
            return prizes
        },

        normalPrize(prize) {
            if (prize.probability != null){
                prize.probability = parseInt(prize.probability)
            }
            if (prize.number != null){
                prize.number = parseInt(prize.number)
            }
            return prize
        },

        changeProba(event) {
            console.log("event", event);
        }
    }
}
</script>

<style>

</style>