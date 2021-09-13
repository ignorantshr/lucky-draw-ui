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
          <el-menu-item index="1">
            <span>奖品</span>
          </el-menu-item>
          <el-menu-item index="2">
            <span>奖池</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <el-page-header title="" content="奖池">
        </el-page-header>
        <div v-if="menu == 1">
          <prizes/>
        </div>
        <div v-else-if="menu == 2">
          <prize-pools/>
        </div>
      </el-main>
    </el-container>
  </el-container>
  <!-- <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div> -->
</template>

<script>
import PrizePools from './components/PrizePools.vue'
import Prizes from './components/Prizes.vue'

export default {
  name: 'App',
  components: {
    Prizes,
    PrizePools,
    // PrizePool,
  },
  data() {
    return {
      menu: 1
    }
  },
  methods: {
    switchMenu(key) {
      this.menu = key
    }
  }
}
</script>

<style>
.header {
  height: 100%;
  width: 100%;
  background-image: url("./assets/logo.png");
  background-size: contain ;
  background-repeat:no-repeat;
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
