import { createWebHistory, createRouter } from "vue-router";
import Home from "@/views/HomePage.vue";
import About from "@/views/AboutPage.vue";
import FormPage from "@/components/FormPage.vue";
import TablePage from "@/components/TablePage.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path:"/form",
    name:"Form",
    component:FormPage,
  },
  {
    path: "/form/:id/", 
    name: "EditForm", 
    component: FormPage,
  },
  {
    path:"/table",
    name:"TablePage",
    component:TablePage,
    props:true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;