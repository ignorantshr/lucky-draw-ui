<template>
  <div class="table">
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
          prop="image"
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
export default {
    name: "Prizes",
    data() {
      return {
        tableData: [{
          id: 1,
          name: '幻13',
          url: 'http://img.ws.126.net%2F%3Furl%3Dhttp%253A%252F%252Fdingyue.ws.126.net%252F2021%252F0414%252F0d36acebj00qril02000vc000hs00bvg.jpg%26thumbnail%3D650x2147483647%26quality%3D80%26type%3Djpg&refer=http%3A%2F%2Fnimg.ws.126.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1634113242&t=9ed22efdbca9799927a44316ed1604f8'
        }, {
          id: 2,
          name: 'G502',
          url: 'http://img.b0.upaiyun.com%2F3039a235122576bb2a0781442c5623664e05624bb63a-iXeTzs_fw658&refer=http%3A%2F%2Fhbimg.b0.upaiyun.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1634113275&t=2b9dcf5a2edbec795e8d052cd9e4811f'
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