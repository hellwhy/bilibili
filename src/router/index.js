import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const Home = () => import("@/views/Home");
const Register = () => import("@/views/Register");
const Login = () => import("@/views/Login");
const Profile = () => import("@/views/profile");
const Edit = () => import("@/views/Edit");
const Article = () => import("@/views/Article");
const Search = () =>import('@/views/Search')

const routes = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    component: Home,
  },
  {
    path: "/register",
    component: Register,
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/profile",
    component: Profile,
    meta: {
      istoken: true,
    }
  },
  {
    path: "/edit",
    component: Edit,
    meta: {
      istoken: true,
    },
  },
  {
    path: "/article/:id",
    component: Article,
  },
  {
    path:"/search",
    component:Search
  }
];

const router = new VueRouter({
  routes,
  // mode: "history",
});

// 路由守卫在跳转前做判断
router.beforeEach((to, from, next) => {
  if (
    !localStorage.getItem("token") &&
    !localStorage.getItem("id") &&
    to.meta.istoken == true
  ) {
    router.replace("/login");
    Vue.prototype.$msg.fail("请重新登录");
    return;
  }
  next();
});

export default router;
