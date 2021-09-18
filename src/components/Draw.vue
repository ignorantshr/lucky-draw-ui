<template>
    <div>
        <div v-if="prize.id == 1">
            <span>很遗憾，没有中奖</span>
        </div>
        <div v-else>
            <span>恭喜！！！</span>
            <span>获得 {{ prize.name }}</span>
        </div>
        <el-image
            style="width: 80%; height: 80%"
            :src="prize.url"
            fit="contain"
            :preview-src-list="[prize.url]">
        </el-image>
    </div>
</template>

<script>
import * as poolApi from "@/api/pool"
import { checkError } from "@/utils";

export default {
    name: "Draw",
    props: ['id'],
    data() {
        return {
            prize: {
                id: -1,
                name: "",
                url: ""
            }
        }
    },
    mounted() {
      this.load()
    },
    methods: {
        async load() {
            if (this.id == null){
                return
            }
            var re = await poolApi.pool_draw(this.id)
            if (checkError(re)) {
                this.prize = re["result"]
            }
        }
    }
}
</script>

<style>

</style>