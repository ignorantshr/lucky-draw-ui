<template>
  <div>
       <div class="actionHeader">
        <el-col :span="8"><el-input v-model="input" placeholder="名称" size="small" @clear="loadData" clearable></el-input></el-col>
        <el-col :span="1"><el-button icon="el-icon-search" size="small" @click="search" circle></el-button></el-col>
        <div style="text-align: right" >
          <el-button @click="add" type="primary" plain>添加</el-button>
          <el-button @click="update" :disabled="updateAccess" type="primary" plain>编辑</el-button>
          <el-button @click="del" :disabled="delAccess" type="primary" plain>删除</el-button>
        </div>
      </div>
      <el-table
        :data="pools"
        border
        style="width: 100%"
        @selection-change="handleSelectionChange"
        @row-click="goInfo">
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
          sortable
          prop="type"
          label="类型"
          width="180">
          <template v-slot="scope">
            <div v-if="scope.row.type == 1">
              <span>概率抽奖</span>
            </div>
            <div v-else-if="scope.row.type == 2">
              <span>数量抽奖</span>
            </div>
            <div v-else>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="动作"
          width="180">
          <template v-slot="scope">
            <el-button @click="draw(scope.row.id)" type="primary" plain>抽奖</el-button>
          </template>
        </el-table-column>
      </el-table>
  </div>
</template>

<script>
import * as API from "@/api/pool";
import { checkError, successMsg, failMsg } from "@/utils";

export default {
    name: "PrizePools",
    data() {
      return {
        pools: [
          // {
          //   id: 1,
          //   name: '奖池1',
          //   type: 1
          // }, {
          //   id: 2,
          //   name: '奖池2',
          //   type: 2
          // }
        ],
        input: "",
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
        var re = await API.pool_list()
        if (checkError(re)) {
          this.pools = re["result"]
        }
      },

      goInfo(row, column) {
        if (column.property == "name"){
          this.$router.push({path: '/pool', query: {id: parseInt(row.id) }})
        }
      },

      async search() {
        var re = await API.pool_get(new API.pool(0, this.input))
        if (checkError(re)){
          this.pools = re["result"]
        }
      },

      add() {
        this.$router.push({path: '/pool', query: {addButtons: true}})
      },

      update() {
        this.$router.push({path: '/pool', query: {id: this.multipleSelection[0].id, updateButtons: true}})
      },

      async del() {
        let fail = []
        for (let i in this.multipleSelection) {
          var re = await API.pool_delete(this.multipleSelection[i].id)
          let isSuccess = checkError(re)
          if (!isSuccess) {
            fail.push(this.multipleSelection[i].name)
          }
        }
        if (fail.length == 0) {
          successMsg()
        }else {
          failMsg("删除失败：", fail)
        }
        this.loadData()
      },

      draw(id) {
        this.$router.push({path: '/draw', query: {id: id}})
      }
    }
}
</script>

<style>

</style>