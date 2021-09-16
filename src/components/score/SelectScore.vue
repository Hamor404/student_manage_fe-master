<template>
  <el-container style="height: 100vh; border: 1px solid #eee">

    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu :default-openeds="['1', '3']">
        <el-menu-item ><i class="el-icon-search"></i>查询方式</el-menu-item>
        <el-menu-item-group>

          <el-submenu index="1">
            <template slot="title">按班级 </template>
            <el-submenu index="1-1" @click="findgradeid(1)">
              <template slot="title">软件工程 </template>
              <el-menu-item  @click="findgradeclassid(1,2018199)">2018199班</el-menu-item>
              <el-menu-item  @click="findgradeclassid(1,2018200)">2018200班</el-menu-item>
              <el-menu-item  @click="findgradeclassid(1,2018201)">2018201班</el-menu-item>
            </el-submenu>
            <el-submenu index="1-2" >
              <template slot="title">通信工程</template>
              <el-menu-item  @click="findgradeclassid(2,2018199)">2018199班</el-menu-item>
              <el-menu-item  @click="findgradeclassid(2,2018200)">2018200班</el-menu-item>
              <el-menu-item  @click="findgradeclassid(2,2018201)">2018201班</el-menu-item>
            </el-submenu>
            <el-submenu index="1-3">
              <template slot="title">土木工程</template>
              <el-menu-item  @click="findgradeclassid(3,2018199)">2018199班</el-menu-item>
              <el-menu-item  @click="findgradeclassid(3,2018200)">2018200班</el-menu-item>
              <el-menu-item  @click="findgradeclassid(3,2018201)">2018201班</el-menu-item>
            </el-submenu>
          </el-submenu>

<!--          <el-menu-item  @click="openexamid">按考试编号</el-menu-item>-->
          <el-menu-item  @click="openstuid">学号查询</el-menu-item>
        </el-menu-item-group>

      </el-menu>
    </el-aside>

    <el-container >

      <el-header style="text-align: center; font-size: 12px">
        <span style="font-size: 17px">成绩列表</span>

      </el-header>

      <el-main>
        <el-table :data="tableData" show-summary :summary-method="getAverage"
                  :default-sort = "{prop: 'total', order: 'descending'}">
          <el-table-column prop="examId" label="成绩编号">
          </el-table-column>

          <el-table-column prop="examInformation" label="考试信息" width="200">
          </el-table-column>
          <el-table-column prop="gradeId" label="专业" >
          </el-table-column>
          <el-table-column prop="classId" label="班级" >
          </el-table-column>
          <el-table-column prop="studentId" label="学号">
          </el-table-column>
          <el-table-column prop="studentName" label="姓名">
          </el-table-column>
          <el-table-column prop="chineseScore" label="成绩" sortable>
          </el-table-column>
          <el-table-column prop="mathScore" label="补考成绩" sortable>
          </el-table-column>

          <el-table-column v-if="character" label="操作" width="200">
            <template slot-scope="scope">

              <el-button
                size="mini"
                @click="scoreupdate(scope.row)">编辑</el-button>

              <el-button
                size="mini"
                @click="scoredelete(scope.row.examId)" >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>

  </el-container>
</template>

<script>

export default {

  name: 'SelectScore',
  inject: ['reload'],

  data () {
    this.$axios.get(`score/get/all`).then(res => {
      this.tableData = res.data.data
    })
    return {
      tableData: [],
      gradeclass: {
        gradeId: '',
        classId: ''
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

    findgradeclassid (grade, classid) {
      if (grade === 1) {
        this.gradeclass.gradeId = '软件工程'
        this.gradeclass.classId = `${classid}班`
        this.$axios.post(`score/get/gradeclass`, this.gradeclass).then(res => {
          this.tableData = res.data.data
        })
      } else if (grade === 2) {
        this.gradeclass.gradeId = '通信工程'
        this.gradeclass.classId = `${classid}班`
        this.$axios.post(`score/get/gradeclass`, this.gradeclass).then(res => {
          this.tableData = res.data.data
        })
      } else {
        this.gradeclass.gradeId = '土木工程'
        this.gradeclass.classId = `${classid}班`
        this.$axios.post(`score/get/gradeclass`, this.gradeclass).then(res => {
          this.tableData = res.data.data
        })
      }
    },
    openstuid () {
      this.$prompt('请输入学号', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        this.$axios.get(`score/get/student/${value}`).then(res => {
          this.tableData = res.data.data
          if (res.data.code == 200) {
            this.tableData = res.data.data
            this.$notify({
              title: '查询成功',
              type: 'success'
            })
          } else {
            this.$notify.error({
              title: '错误',
              message: '没有这个学生的成绩'
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
    scoredelete (id) {
      this.$confirm('此操作将删除该条信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.delete(`score/delete/exam/${id}`).then(res => {
          this.reload()
        })
      })
    },
    scoreupdate (row) {
      this.$router.push(
        {
          'path': '/score/update',
          query: {
            examId: row.examId,
            examInformation: row.examInformation,
            studentId: row.studentId,
            studentName: row.studentName,
            classId: row.classId,
            gradeId: row.gradeId,
            chineseScore: row.chineseScore,
            mathScore: row.mathScore
          }
        })
    },
    getAverage (param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '平均分'
          return
        } else if (index === 4) {
          return
        }
        const values = data.map(item => Number(item[column.property]))
        if (!values.every(value => isNaN(value))) {
          var i = 0
          sums[index] = values.reduce((prev, curr) => {
            i++
            const value = Number(curr)
            if (!isNaN(value)) {
              return prev + curr
            } else {
              return prev
            }
          }, 0)
          sums[index] = sums[index] / i
        } else {
          sums[index] = ''
        }
      })

      return sums
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
