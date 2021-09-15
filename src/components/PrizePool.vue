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
          <el-col :span="8"><el-input v-model="input" placeholder="名称" size="small" clearable></el-input></el-col>
          <el-col :span="1"><el-button icon="el-icon-search" size="small" circle></el-button></el-col>
          <div style="text-align: right" >
            <el-button type="primary" plain>添加</el-button>
            <el-button type="primary" plain>编辑</el-button>
            <el-button type="primary" plain>删除</el-button>
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
  </div>
</template>

<script>
import * as API from "@/api/pool";
import { checkError } from "@/utils";

export default {
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
      }
    },
    multipleSelection: [],
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

      async add() {
          var re = await API.pool_add(this.pool)
          if (checkError(re)) {
              window.alert("success")
              this.$router.push('pools')
          }
      },

      async update() {
          var re = await API.pool_update(this.pool)
          if (checkError(re)) {
              window.alert("success")
          }
      },

      cancel() {
          if (this.addButtons) {
              this.pool = {}
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