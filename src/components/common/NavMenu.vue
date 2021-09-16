<template>

  <el-menu router :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
    <el-menu-item ><i class="el-icon-s-tools"></i>管理中心</el-menu-item>
    <el-submenu >
      <template slot="title" >信息管理</template>
      <el-menu-item index="/information/select">
        <template slot="title"><i class="el-icon-search"></i>查询</template>

      </el-menu-item>
      <el-menu-item v-if="character" index="/information/insert">
        <template slot="title" ><i class="el-icon-circle-plus"></i>添加</template>

      </el-menu-item>
      <el-menu-item v-if="character" index="/information/update">
        <template slot="title"><i class="el-icon-edit"></i>修改</template>

      </el-menu-item>

      <el-menu-item v-if="character" index="/information/select">
        <template slot="title"><i class="el-icon-delete-solid"></i>删除</template>
      </el-menu-item>
    </el-submenu>
    <el-submenu index="1">
      <template slot="title">成绩管理</template>
      <el-menu-item index="/score/select">
        <template slot="title" ><i class="el-icon-search"></i>查询</template>

      </el-menu-item>
      <el-menu-item v-if="character" index="/score/insert">
        <template slot="title" ><i class="el-icon-circle-plus"></i>添加</template>

      </el-menu-item>
      <el-menu-item v-if="character" index="/score/update">
        <template slot="title"><i class="el-icon-edit"></i>修改</template>

      </el-menu-item>

      <el-menu-item v-if="character" index="/score/select">
        <template slot="title"><i class="el-icon-delete-solid"></i>删除</template>
      </el-menu-item>
    </el-submenu>

    <el-submenu index="2">
      <template slot="title">课程管理</template>
      <el-menu-item index="/course/select">
        <template slot="title" ><i class="el-icon-search"></i>查询</template>

      </el-menu-item>
      <el-menu-item v-if="character" index="/course/insert">
        <template slot="title" ><i class="el-icon-circle-plus"></i>添加</template>

      </el-menu-item>
      <el-menu-item v-if="character" index="/course/update">
        <template slot="title"><i class="el-icon-edit"></i>修改</template>

      </el-menu-item>

      <el-menu-item v-if="character" index="/course/select">
        <template slot="title"><i class="el-icon-delete-solid"></i>删除</template>
      </el-menu-item>
    </el-submenu>
<!--    <el-button @click="loginOut" class="btn" ><i class="el-icon-switch-button"></i>退出登录</el-button>-->
    <el-button icon="el-icon-switch-button" circle @click="loginOut" class="btn" ></el-button>
<!--    <el-avatar :size="small" class="btn" :src="`https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png`"></el-avatar>-->

  </el-menu>

</template>

<script>
export default {
  data () {
    return {

      name: 'NavMenu',
      activeIndex: ''

    }
  },
  computed: {
    character: {
      get () { return this.$store.state.is_admin },
      set (val) { this.$store.commit('setAdmin', val) }
    }
  },
  methods: {
    handleSelect () {
      return null
    },
    loginOut () {
      this.$confirm('您确定要退出吗?', '退出管理平台', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        this.$store.commit('LOGOUT')
        this.$router.push({'path': '/login'})
        this.$message({
          message: '退出登录',
          type: 'info'
        })
      })
    }

  }
}
</script>

<style>
  html,body{
    padding: 0;
    margin: 0;
  }

  .btn{
    float: right;
    background-color: #aac1d1;
    margin: 10px 10px 0 0
  }

</style>
