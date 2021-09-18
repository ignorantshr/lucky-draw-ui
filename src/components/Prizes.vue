<template>
  <div>
      <div class="actionHeader">
        <el-col :span="8"><el-input v-model="input" placeholder="名称" size="small" clearable></el-input></el-col>
        <el-col :span="1"><el-button icon="el-icon-search" size="small" circle></el-button></el-col>
        <div style="text-align: right" >
          <el-button @click="add" type="primary" plain>添加</el-button>
          <el-button @click="update" :disabled="updateAccess" type="primary" plain>编辑</el-button>
          <el-button @click="del" :disabled="delAccess" type="primary" plain>删除</el-button>
        </div>
      </div>
      <el-table
        :data="prizes"
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
  </div>
</template>

<script>
import * as API from "@/api/prize";
import { checkError } from "@/utils";

export default {
    name: "Prizes",
    data() {
      return {
        prizes: [
          // {
          //   id: 1,
          //   name: '幻13',
          //   url: 'http://img.ws.126.net%2F%3Furl%3Dhttp%253A%252F%252Fdingyue.ws.126.net%252F2021%252F0414%252F0d36acebj00qril02000vc000hs00bvg.jpg%26thumbnail%3D650x2147483647%26quality%3D80%26type%3Djpg&refer=http%3A%2F%2Fnimg.ws.126.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1634113242&t=9ed22efdbca9799927a44316ed1604f8'
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

      goInfo(row, column) {
        if (column.property == "name"){
          this.$router.push({path: '/prize', query: {id: row.id}})
        }
      },

      async loadData() {
        var re = await API.prize_list()
        if (checkError(re)) {
          this.prizes = re["result"]
        }
      },

      add() {
        this.$router.push({path: '/prize', query: {addButtons: true}})
      },

      update() {
        this.$router.push({path: '/prize', query: {id: this.multipleSelection[0].id, updateButtons: true}})
      },

      async del() {
        let fail = []
        let allSuccess = true
        for (let i in this.multipleSelection) {
          var re = await API.prize_delete(this.multipleSelection[i].id)
          let isSuccess = checkError(re)
          if (!isSuccess) {
            fail.push(this.multipleSelection[i].name)
          }
          allSuccess = allSuccess | isSuccess
        }
        if (allSuccess) {
          window.alert("success")
        }else{
          window.alert("faild: ", fail)
        }
        this.loadData()
      },

    }
}
</script>

<style>
.actionHeader {
  padding-top: 20px;
  padding-bottom: 20px;
}
</style>