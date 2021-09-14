<template>
  <div>
       <el-row gutter=20>
        <el-col :span="8"><el-input v-model="input" placeholder="名称" size="small" clearable></el-input></el-col>
        <el-col :span="1"><el-button icon="el-icon-search" size="small" circle></el-button></el-col>
        <el-col :span="2" :offset="9"><el-button type="primary" plain>添加</el-button></el-col>
        <el-col :span="2"><el-button type="primary" plain>编辑</el-button></el-col>
        <el-col :span="2"><el-button type="primary" plain>删除</el-button></el-col>
      </el-row>
      <el-table
        :data="tableData"
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
      </el-table>
  </div>
</template>

<script>
export default {
    name: "PrizePools",
    data() {
      return {
        tableData: [{
          id: 1,
          name: '奖池1',
          type: 1
        }, {
          id: 2,
          name: '奖池2',
          type: 2
        }],
        input: "",
      }
    },
    multipleSelection: [],
    methods: {
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      goInfo(row, column) {
        if (column.property == "name"){
          this.$router.push({path: '/pool', query: {id: row.id}})
        }
      }
    }
}
</script>

<style>

</style>