<template>
    <el-card class="box-card" v-loading="loading">
        <div v-if="prize.id == -1">
            <el-tag name="tip">奖品被抽完了，下次早点来吧~</el-tag>
        </div>
        <div v-else>
            <div v-if="prize.id == 1">
                <el-tag name="tip">很遗憾，没有中奖</el-tag>
            </div>
            <div v-else>
                <el-tag name="tip">恭喜获得 {{ prize.name }} ！！！</el-tag>
            </div>
            <br/>
            <transition name="el-fade-in">
                <el-image
                    style="width: 30%; height: 30%"
                    :src="prize.url"
                    fit="contain"
                    :preview-src-list="[prize.url]">
                </el-image>
            </transition>
        </div>
    </el-card>
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
            },
            loading: true
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
                let p = re["result"]
                if (p == null){
                    this.prize = {
                        id: -1
                    }
                }else {
                    this.prize = p
                }
            }
            this.loading = false
        }
    }
}
</script>

<style>
.box-card {
    width: 50%;
    margin-left: 25%;
}
.tip {
    width: 50%;
    height: 50%;
}
</style>