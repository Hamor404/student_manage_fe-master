<template>
  <el-container style="height: 100vh; border: 1px solid #eee">

    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">

    </el-aside>

    <el-container >

      <el-header style="text-align: center; font-size: 12px">
        <span style="font-size: 17px">填写学生信息</span>

      </el-header>
      <div style="margin: 20px;"></div>
      <el-form :label-position="labelPosition" label-width="80px" :model="student">
        <el-form-item label="学号" >
          <el-input v-model="student.studentId"  ></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="student.studentName" ></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-input v-model="student.sex" ></el-input>
        </el-form-item>
        <el-form-item label="出生日期">
          <el-input v-model="student.idCard"></el-input>
        </el-form-item>
        <el-form-item label="系别">
          <el-input v-model="student.department"></el-input>
        </el-form-item>
        <el-form-item label="专业" prop="gradeId">
          <el-select  v-model="student.gradeId" placeholder="请选择年级" >
            <el-option label="软件工程" value="软件工程"></el-option>
            <el-option label="通信工程" value="通信工程"></el-option>
            <el-option label="土木工程" value="土木工程"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="班级">
          <el-select  v-model="student.classId" placeholder="请选择班级" >
            <el-option label="2018199班" value="2018199班"></el-option>
            <el-option label="2018200班" value="2018200班"></el-option>
            <el-option label="2018201班" value="2018201班"></el-option>
            <el-option label="2018202班" value="2018202班"></el-option>
            <el-option label="2018203班" value="2018203班"></el-option>
            <el-option label="2018204班" value="2018204班"></el-option>
            <el-option label="2018205班" value="2018205班"></el-option>
            <el-option label="2018206班" value="2018206班"></el-option>
            <el-option label="2018207班" value="2018207班"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="updatestu">立即创建</el-button>
          <el-button @click="cancelint">取消</el-button>
        </el-form-item>
      </el-form>

    </el-container>

  </el-container>
</template>

<script>

export default {
  name: 'UpdateInformation',

  data () {
    return {
      student: {
        studentId: '',
        studentName: '',
        sex: '',
        idCard: '',
        classId: '',
        department: ''
      }
    }
  },

  // 打开页面默认执行的函数
  created () {
    this.student.studentId = this.$route.query.studentId
    this.student.studentName = this.$route.query.studentName
    this.student.sex = this.$route.query.sex
    this.student.idCard = this.$route.query.idCard
    this.student.classId = this.$route.query.classId
    this.student.gradeId = this.$route.query.gradeId
    this.student.department = this.$route.query.department
  },

  methods: {
    updatestu () {
      this.$axios.post('/student/update', this.student).then(res => {
        if (res.data.code === 200) {
          this.$message({
            message: '修改成功',
            type: 'success'
          })
        } else {
          this.$message({
            message: '创建失败',
            type: 'error'
          })
        }
        this.$router.push('/information/select')
      })
    },
    cancelint () {
      this.$axios.get(`student/getAll`).then(res => {
        this.$router.push('/information/select')
      })
    }

  }
}
</script>

<style scoped>

</style>
