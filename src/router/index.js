import { createRouter, createWebHistory } from 'vue-router'
const Index = () => import('../views/Index');
const Home = () => import('../views/Home');
const User = () => import('../views/user/User');
const KanbanHome = () => import('../views/kanban/KanbanHome')
const UserInfoSetting = () => import('../views/user/UserInfoSetting')
const PasswordSetting = () => import('../views/user/PasswordSetting')
const EmailSetting = () => import('../views/user/EmailSetting')
const KanbanContent = ()=> import('../views/kanban/KanbanContent');
const Refresh = ()=> import('../components/refresh');
const Invitation = ()=> import('../views/Invitation');

const routes = [
  {
    path: "",
    name: "Index",
    component: Index,
    meta:{
      title: "闪念卡片-登录"
    }
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
    children: [
      {
        path: "",
        name: "KanbanHome",
        component: KanbanHome,
        meta: {
          title: "闪念卡片-看板"
        }
      },
      {
        path: "invitation",
        name: 'Invitation',
        component: Invitation,
        meta: {
          title: "闪念卡片-协作邀请"
        }
      },
      {
        path: "/user",
        name: "User",
        component: User,
        children:[
          {
            path: "",
            name: "UserInfoSetting",
            component: UserInfoSetting,
            meta: {
              title: "闪念卡片-个人设置"
            }
          },
          {
            path: "password",
            name: "PasswordSetting",
            component: PasswordSetting,
            meta: {
              title: "闪念卡片-密码设置"
            }
          },
          {
            path: "email",
            name: "EmailSetting",
            component: EmailSetting,
            meta: {
              title: "闪念卡片-邮箱设置"
            }
          }
        ]
      }
    ]
  },
  {
    path: "/kanban",
    name: Home-KanbanContent,
    component: Home,
    meta: {
      title: "闪念卡片-看板"
    },
    children: [
      {
        path: ":kanbanId",
        name: KanbanContent,
        component: KanbanContent,
        meta: {
          title: "闪念卡片-看板"
        }
      }
    ]
  },
  {
    path: "/refresh",
    name: Refresh,
    component: Refresh,
    meta: {
      title: "闪念卡片-看板"
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to,from,next)=>{
  if (to.path !== "/"){
    if (!localStorage.getItem("access_token")){
      console.log(111);
      next({path:"/"})
      return
    }
  }
  document.title = to.meta.title;
  next()
})

export default router
