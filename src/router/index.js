import { createRouter, createWebHistory } from 'vue-router'
const Index = () => import('../views/Index');
const Home = () => import('../views/Home');
const User = () => import('../views/User');
const KanbanHome = () => import('../views/KanbanHome')
const KanbanContent = ()=> import('../views/KanbanContent');
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
        meta: {
          title: "闪念卡片-个人中心"
        }
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
