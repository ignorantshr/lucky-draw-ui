<template>
  <div>
    <el-form ref="form" :model="pool" label-width="80px">
      <el-form-item label="名称">
          <el-input v-model="pool.name"></el-input>
      </el-form-item>
      <el-form-item label="类型" style='text-align:left'>
        <el-select v-model="pool.type" placeholder="请选择">
          <el-option
            v-for="item in types"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <div v-if="addButtons || updateButtons">
            <el-button v-if="addButtons" @click="add" type="primary" plain>添加</el-button>
            <el-button v-if="updateButtons" @click="update" type="primary" plain>更新</el-button>
            <el-button @click="cancel" type="primary" plain>取消</el-button>
        </div>
      </el-form-item>
      <el-form-item label="奖品列表">
        <div class="actionHeader">
          <el-col :span="8"><el-input v-model="input" placeholder="名称" size="small" @clear="loadPrizes" clearable></el-input></el-col>
          <el-col :span="1"><el-button icon="el-icon-search" size="small" @click="search" circle></el-button></el-col>
          <div style="text-align: right" v-if="!addButtons && !updateButtons">
            <el-button  @click="addPrize" :disabled="true" type="primary" plain>添加</el-button>
            <el-button  @click="attachPrize" type="primary" plain>从库中添加</el-button>
            <el-button @click="updatePrize" :disabled="updateAccess" type="primary" plain>编辑</el-button>
            <el-button @click="delPrize" :disabled="delAccess" type="primary" plain>删除</el-button>
          </div>
        </div>
        <el-table
            :data="pool.prizes"
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
                width="180">
            </el-table-column>
            <el-table-column
                prop="probability"
                label="概率">
            </el-table-column>
            <el-table-column
                prop="number"
                label="数量">
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
      </el-form-item>
    </el-form>
    <prize-dialog v-if="prizeDialog" :id="parseInt(id)" :prize="prize" :action="prizeAct" @add="realAddPrize" @attach="realAttachPrize" @update="realUpdatePrize" @cancel="cancelPrize"></prize-dialog>
  </div>
</template>

<script>
import * as API from "@/api/pool";
import { checkError, successMsg } from "@/utils";
import PrizeDialog from './PrizeDialog.vue';
var prize = {
            id: -1,
            name: "",
            url: "",
            probability: 10,
            number: 50
          }

export default {
  components: { PrizeDialog },
    name: "PrizePool",
    props: ['id', 'addButtons', 'updateButtons'],
    data() {
      return {
        types: [
          {
            value: 1,
            label: "概率抽奖"
          },
          {
            value: 2,
            label: "数量抽奖"
          },
        ],
        pool: {
          // name: "奖池1",
          // type: 1,
          // prizes: [{
          //   id: 1,
          //   name: "幻13",
          //   url: "",
          //   probability: 10,
          //   number: 50
          // }, {
          //   id: 1,
          //   name: "幻14",
          //   url: "",
          //   probability: 10,
          //   number: 50
          // }]
        },
        input: "",
        prizeDialog: false,
        prizeAct: "add",
        prize: prize,
        multipleSelection: [],
      }
    },
    computed: {
      updateAccess() {
        return this.multipleSelection.length != 1
      },
      delAccess() {
        return this.multipleSelection.length == 0
      },
    },
    mounted() {
      this.loadData()
    },
    methods: {
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      async loadData() {
        if (this.id == null){
            return
        }
        var re = await API.pool_info(this.id)
        if (checkError(re)){
            if (re["result"] != null){
                this.pool = re["result"]
            }
        }
      },

      async loadPrizes() {
        if (this.id == null){
            return
        }
        var re = await API.pool_info(this.id)
        if (checkError(re)){
            if (re["result"] != null){
                this.pool.prizes = re["result"]["prizes"]
            }
        }
      },

      async search() {
          var re = await API.pool_queryPrize(new API.prizeQuery(this.id, this.input))
          if (checkError(re)) {
              this.pool.prizes = re["result"]
          }
      },

      async add() {
          var re = await API.pool_add(this.pool)
          if (checkError(re)) {
              successMsg()
              this.$router.push('pools')
          }
      },

      async update() {
          var re = await API.pool_update(this.pool)
          if (checkError(re)) {
              this.afterSuccess()
          }
      },

      cancel() {
          this.$router.go(-1)
      },

      addPrize() {
        this.prizeAct = "add"
        this.prizeDialog = true
      },

      attachPrize() {
        this.prizeAct = "attach"
        this.prize = this.id
        this.prizeDialog = true
      },

      updatePrize() {
        this.prizeAct = "update"
        this.prize = this.multipleSelection[0]
        this.prizeDialog = true
      },

      async delPrize() {
        let ids = []
        for (let i in this.multipleSelection){
          ids.push(new API.pool(this.multipleSelection[i].id))
        }
        var re = await API.pool_delPrize(API.newPoolPrize(this.id, ids))
        if (checkError(re)){
          this.afterSuccess()
        }
      },

      async realAddPrize(prize){
        this.closeDialog()
        console.log("get prize: ", prize)
        var re = await API.pool_addPrize(API.newPoolPrize(this.id, [prize]))
        if (checkError(re)){
          this.afterSuccess()
        }
      },

      async realAttachPrize(prizes){
        this.closeDialog()
        console.log("get prize: ", prizes)
        var re = await API.pool_addPrize(API.newPoolPrize(this.id, prizes))
        if (checkError(re)){
          this.afterSuccess()
        }
      },

      async realUpdatePrize(prize){
        this.closeDialog()
        console.log("get prize: ", prize)
        var re = await API.pool_updatePrize(API.newPoolPrize(this.id, [prize]))
        if (checkError(re)){
          this.afterSuccess()
        }
      },

      cancelPrize(){
        this.closeDialog()
      },

      closeDialog() {
        this.prizeDialog = false
        this.prize = prize
      },

      afterSuccess() {
        successMsg()
        this.loadData()
      }

    }
}
</script>

<style>

</style>