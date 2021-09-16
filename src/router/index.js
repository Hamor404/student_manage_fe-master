import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Score from '@/components/Score'
import Home from '@/components/common/Home'
import SelectInformation from '@/components/information/SelectInformation'
import InsertInformation from '@/components/information/InsertInformation'
import UpdateInformation from '@/components/information/UpdateInformation'
import SelectScore from '@/components/score/SelectScore'
import InsertScore from '@/components/score/InsertScore'
import UpdateScore from '@/components/score/UpdateScore'
import SelectCourse from '@/components/course/SelectCourse'
import InsertCourse from '@/components/course/InsertCourse'
import UpdateCourse from '@/components/course/UpdateCourse'
import cookies from 'js-cookie'
import Vuex from 'vuex'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      redirect: '/login',
      children: [

        {
          path: '/information/select',
          name: 'SelectInformation',
          component: SelectInformation,
          meta: {
            requireAuth: true
          }

        },
        {
          path: '/information/update',
          name: 'UpdateInformation',
          component: UpdateInformation,
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/information/insert',
          name: 'InsertInformation',
          component: InsertInformation,
          meta: {
            requireAuth: true
          }
        },

        {
          path: '/score/select',
          name: 'SelectScore',
          component: SelectScore,
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/score/update',
          name: 'UpdateScore',
          component: UpdateScore,
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/score/insert',
          name: 'InsertScore',
          component: InsertScore,
          meta: {
            requireAuth: true
          }
        },

        {
          path: '/course/select',
          name: 'SelectCourse',
          component: SelectCourse,
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/course/update',
          name: 'UpdateCourse',
          component: UpdateCourse,
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/course/insert',
          name: 'InsertCourse',
          component: InsertCourse,
          meta: {
            requireAuth: true
          }
        }

      ]
    },

    {
      path: '/login',
      name: 'Login',
      component: Login
    }

  ]

})
