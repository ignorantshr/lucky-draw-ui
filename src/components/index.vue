<template>
  <el-container style="height: 100%">
    <el-header>
      <div class="header"></div>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu
          style="height: 100% ! important"
          class="left-menu"
          text-color="#72767b"
          active-text-color="#ffffff"
          default-active="1"
          @select="switchMenu">
          <el-menu-item index="1" @click="switchMenu('prizes')">
            奖品
          </el-menu-item>
          <el-menu-item index="2" @click="switchMenu('pools')">
            奖池
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <!-- <el-page-header height="120px" title="" :content="tab" @click="back">
        </el-page-header> -->
        <router-view></router-view>
        <!-- <div v-if="menu == 1">
          <prizes/>
        </div>
        <div v-else-if="menu == 2">
          <prize-pools/>
        </div> -->
      </el-main>
    </el-container>
  </el-container>
</template>

<script>

export default {
  name: 'Index',
  components: {
  },
  data() {
    return {
      menu: 1,
      tab: "奖品",
      tabs: {
        "prizes": "奖品",
        "pools": "奖池"
      }
    }
  },
  methods: {
    switchMenu(key) {
      this.tab = this.tabs[key]
      this.$router.push(key)
    },
    back() {
      this.$router.go(-1)
    }
  }
}
</script>

<style>
.el-header {
  background-color: #0c69a5;
  text-align: center;
  line-height: 20%;
}
.header {
  height: 100%;
  width: 100%;
  background-image: url("../assets/logo.png");
  background-size: contain ;
  background-repeat:no-repeat;
}
.el-aside {
  background-color: #292e34;
  position: relative;
  overflow-y: scroll;
}
.el-menu-item {
  background-color: #292e34;
}
router-link {
    text-decoration: none;
}
</style>
