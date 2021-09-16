<template>
  <el-container style="height: 100vh; border: 1px solid #eee">

    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">

    </el-aside>

    <el-container >

      <el-header style="text-align: center; font-size: 12px">
        <span style="font-size: 17px">填写课程信息</span>
      </el-header>

      <div style="margin: 20px;"></div>
      <el-form :label-position="labelPosition" label-width="80px" :model="course">
<!--        <el-form-item label="考试编号">-->
<!--          <el-input v-model="score.examId"></el-input>-->
<!--        </el-form-item>-->
        <el-form-item label="课程号">
          <el-input v-model="course.examId"></el-input>
        </el-form-item>
        <el-form-item label="课程名">
          <el-input v-model="course.examInformation"></el-input>
        </el-form-item>
        <el-form-item label="学时">
          <el-input v-model="course.studyTime"></el-input>
        </el-form-item>
        <el-form-item label="学分">
          <el-input v-model="course.studyScore"></el-input>
        </el-form-item>
        <el-form-item label="序号">
          <el-input v-model="course.id"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="insertcourse">立即创建</el-button>
          <el-button @click="cancelstu">取消</el-button>
        </el-form-item>
      </el-form>
    </el-container>

  </el-container>
</template>

<script>

export default {
  name: 'InsertInformation',
  data () {
    return {
      labelPosition: 'right',
      course: {
        examId: '',
        examInformation: '',
        studyTime: '',
        studyScore: '',
        id: ''
      }

    }
  },
  created () {
    this.course.examId = this.$route.query.examId
    this.course.examInformation = this.$route.query.examInformation
    this.course.studyTime = this.$route.query.studyTime
    this.course.studyScore = this.$route.query.studyScore
  },
  methods: {

    insertcourse () {
      this.$axios.post('/course/insert', this.course).then(res => {
        if (res.data.code === 200) {
          this.$notify({
            title: '创建成功',
            type: 'success'
          })
        } else {
          this.$notify.error({
            title: '创建失败',
            type: 'error'
          })
        }
        this.$router.push('/course/select')
      })
    },
    cancelstu () {
      this.$router.push({'path': '/course/select'})
    }
  }

}
</script>

<style scoped>
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
