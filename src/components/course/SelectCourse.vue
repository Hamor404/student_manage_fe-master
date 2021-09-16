<template>
  <el-container style="height: 100vh; border: 1px solid #eee">

    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu :default-openeds="['1', '3']">
        <el-menu-item ><i class="el-icon-search"></i>查询方式</el-menu-item>
        <el-menu-item-group>

          <el-menu-item  @click="openexamid">按课程号</el-menu-item>
          <el-menu-item  @click="openexaminformation">按课程名</el-menu-item>
        </el-menu-item-group>

      </el-menu>
    </el-aside>

    <el-container >

      <el-header style="text-align: center; font-size: 12px">
        <span style="font-size: 17px">课程列表</span>

      </el-header>

      <el-main>
        <el-table :data="tableData" >
          <el-table-column prop="examId" label="课程号">
          </el-table-column>

          <el-table-column prop="examInformation" label="课程名" width="200">
          </el-table-column>
          <el-table-column prop="studyTime" label="学时" >
          </el-table-column>
          <el-table-column prop="studyScore" label="学分" >
          </el-table-column>
          <el-table-column prop="id" label="序号">
          </el-table-column>

          <el-table-column v-if="character" label="操作" width="200">
            <template slot-scope="scope">

              <el-button
                size="mini"
                @click="courseupdate(scope.row)">编辑</el-button>

              <el-button
                size="mini"
                @click="coursedelete(scope.row.examId)" >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>

  </el-container>
</template>

<script>

export default {

  name: 'SelectCourse',
  inject: ['reload'],

  data () {
    this.$axios.get(`course/get/all`).then(res => {
      this.tableData = res.data.data
    })
    return {
      tableData: [],
      gradeclass: {
        examId: '',
        examInformation: ''
      }
    }
  },
  computed: {
    character: {
      get () { return this.$store.state.is_admin },
      set (val) { this.$store.commit('setAdmin', val) }
    }
  },
  methods: {
    openexamid () {
      this.$prompt('请输入课程号', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        this.$axios.get(`course/get/examid/${value}`).then(res => {
          this.tableData = res.data.data
          if (res.data.code === 200) {
            this.tableData = res.data.data
            this.$notify({
              title: '查询成功',
              type: 'success'
            })
          } else {
            this.$notify.error({
              title: '错误',
              message: '没有这个课程的信息'
            })
          }
        })
      }).catch(() => {
        this.$notify.info({
          title: '取消输入'
          // message: '这是一条消息的提示消息'
        })
      })
    },
    openexaminformation () {
      this.$prompt('请输入课程名', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        this.$axios.get(`course/get/examinformation/${value}`).then(res => {
          this.tableData = res.data.data
          if (res.data.code === 200) {
            this.tableData = res.data.data
            this.$notify({
              title: '查询成功',
              type: 'success'
            })
          } else {
            this.$notify.error({
              title: '错误',
              message: '没有这个课程的信息'
            })
          }
        })
      }).catch(() => {
        this.$notify.info({
          title: '取消输入'
          // message: '这是一条消息的提示消息'
        })
      })
    },
    coursedelete (id) {
      this.$confirm('此操作将删除该条信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.delete(`course/delete/examid/${id}`).then(res => {
          this.reload()
        })
      })
    },
    courseupdate (row) {
      this.$router.push(
        {
          'path': '/course/update',
          query: {
            examId: row.examId,
            examInformation: row.examInformation,
            studyTime: row.studyTime,
            studyScore: row.studyScore,
            id: row.id
          }
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

  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    background-color: #003366;
    color: #333;

  }
</style>
