<template>
  <el-container style="height: 100vh; border: 1px solid #eee">

    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">

    </el-aside>

    <el-container >

      <el-header style="text-align: center; font-size: 12px">
        <span style="font-size: 17px">填写成绩信息</span>
      </el-header>

      <div style="margin: 20px;"></div>
      <el-form :label-position="labelPosition" label-width="80px" :model="score">
        <el-form-item label="考试编号">
         <el-input v-model="score.examId"></el-input>
       </el-form-item>
        <el-form-item label="考试信息">
          <el-input v-model="score.examInformation"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="score.studentName"></el-input>
        </el-form-item>
        <el-form-item label="学号">
          <el-input v-model="score.studentId"></el-input>
        </el-form-item>
        <el-form-item label="成绩">
          <el-input v-model="score.chineseScore"></el-input>
        </el-form-item>
        <el-form-item label="补考成绩">
          <el-input v-model="score.mathScore"></el-input>
        </el-form-item>

        <el-form-item label="专业">
          <el-select  v-model="score.gradeId" placeholder="请选择专业" >
            <el-option label="软件工程" value="软件工程"></el-option>
            <el-option label="通信工程" value="通信工程一"></el-option>
            <el-option label="土木工程" value="土木工程"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="班级">
          <el-select  v-model="score.classId" placeholder="请选择班级" >
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
          <el-button type="primary" @click="insertscore">立即创建</el-button>
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
      score: {
        examId: '',
        examInformation: '',
        gradeId: '',
        classId: '',
        studentName: '',
        studentId: '',
        chineseScore: '',
        mathScore: ''

      }
    }
  },
  created () {
    this.score.studentId = this.$route.query.studentId
    this.score.studentName = this.$route.query.studentName
    this.score.classId = this.$route.query.classId
    this.score.gradeId = this.$route.query.gradeId
  },
  methods: {

    insertscore () {
      this.$axios.post('/score/insert', this.score).then(res => {
        if (res.data.code == 200) {
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
        this.$router.push('/score/select')
      })
    },
    cancelstu () {
      this.$router.push({'path': '/score/select'})
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
