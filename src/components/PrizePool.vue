<template>
  <div>
      <span>id</span><span>{{ id }}</span><br/>
      <span>名称</span><span>{{ name }}</span><br/>
      <span>类型</span><span>{{ type }}</span><br/>
      <div>
        <span>奖品</span>
        <div>
            <el-input v-model="input" placeholder="名称" size="small" clearable></el-input>
            <el-button icon="el-icon-search" circle></el-button>
        </div>
        <el-row>
            <el-button type="primary" plain>添加</el-button>
            <el-button type="primary" plain>编辑</el-button>
            <el-button type="primary" plain>删除</el-button>
        </el-row>
        <el-table
            :data="tableData"
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
      </div>
  </div>
</template>

<script>
export default {
    name: "PrizePool",
    data() {
      return {
        tableData: [{
          id: 1,
          name: 'pool1',
          type: 1,
          prizes: [{
              id: 1,
              name: "幻13",
              url: "",
              probability: 10,
              number: 50
          }]
        }, {
          id: 2,
          name: 'pool2',
          type: 2,
          prizes: [{
            id: 1,
            name: "幻13",
            url: "",
            probability: 10,
            number: 50
          }]
        }],
        input: "",
      }
    },
    multipleSelection: [],
    methods: {
      handleSelectionChange(val) {
        this.multipleSelection = val;
      }
    }
}
</script>

<style>

</style>