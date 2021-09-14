<template>
  <el-container>
    <el-header>
      <div class="header"></div>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu
          default-active="1"
          @select="switchMenu">
          <el-menu-item index="1" @click="switchMenu('prizes')">
            <span>奖品</span>
          </el-menu-item>
          <el-menu-item index="2" @click="switchMenu('pools')">
            <span>奖池</span>
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
.header {
  height: 100%;
  width: 100%;
  background-image: url("../assets/logo.png");
  background-size: contain ;
  background-repeat:no-repeat;
}
router-link {
    text-decoration: none;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
