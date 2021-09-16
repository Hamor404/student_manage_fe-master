<template>
  <el-container style="height: 100vh; border: 1px solid #eee">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
    </el-aside>
    <el-container >
      <el-header style="text-align: center; font-size: 12px">
        <span style="font-size: 17px">填写学生信息</span>
      </el-header>

      <div style="margin: 20px;"></div>
      <el-form :label-position="labelPosition" label-width="80px" :model="student" :rules="rules" ref="student">
        <el-form-item label="学号" prop="studentId">
          <el-input v-model="student.studentId"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="studentName">
          <el-input v-model="student.studentName"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-input v-model="student.sex"></el-input>
        </el-form-item>
        <el-form-item label="出生日期" prop="idCard">
          <el-input v-model="student.idCard"></el-input>
        </el-form-item>
        <el-form-item label="系别" prop="department">
          <el-input v-model="student.department"></el-input>
        </el-form-item>
        <el-form-item label="专业" prop="gradeId">
          <el-select  v-model="student.gradeId" placeholder="请选择专业" >
            <el-option label="软件工程" value="软件工程"></el-option>
            <el-option label="通信工程" value="通信工程"></el-option>
            <el-option label="信息工程" value="信息工程"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="班级" prop="classId">
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
          <el-button type="primary" @click="insertstu('student')">立即创建</el-button>
          <el-button @click="cancelin">取消</el-button>
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
      student: {
        studentId: '',
        gradeId: '',
        studentName: '',
        sex: '',
        idCard: '',
        classId: '',
        department: '',
        is_vaild: 1
      },
      rules: {
        studentId: [
          { required: true, message: '请输入学号', trigger: 'blur' },
          { min: 1, max: 9, message: '长度为1到9 ', trigger: 'blur' }
        ],
        studentName: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 2, max: 5, message: '长度在 2到 5 ', trigger: 'blur' }
        ],
        sex: [
          {required: true, message: '请输入性别', trigger: 'blur' },
          { min: 1, max: 1, message: '长度为1', trigger: 'blur' }
        ],
        idCard: [
          {required: true, message: '请输入出生日期', trigger: 'blur' },
          { min: 0, max: 18, message: '长度为0到18', trigger: 'blur' }
        ],
        department: [
          {required: true, message: '请输入系别', trigger: 'blur' },
          { min: 0, max: 18, message: '长度为0到18', trigger: 'blur' }
        ],
        gradeId: [
          { required: true, message: '请选择年级', trigger: 'change' }
        ],
        classId: [
          { required: true, message: '请选择班级', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    insertstu (form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.$axios.post('/student/insert', this.student).then(res => {
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
            this.$router.push('/information/select')
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    cancelin () {
      this.$axios.get(`student/getAll`).then(res => {
        this.$router.push('/information/select')
      })
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
