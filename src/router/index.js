import { createRouter, createWebHistory } from 'vue-router'


const routes = [
  {
      path: "/",
      name: "hello-world",
      component: () => import("../components/HelloWorld.vue"),
      props: {msg: 'Welcome to Your Vue.js App'}
  },

  {
      path: "/todo",
      name: "todo",
      component: () => import("../components/todos/TodoCmp.vue")
  },
  {
      path: "/movies",
      name: "movies.index",
      component: () => import("../components/movies/MoviesIndex.vue")
  },
  {
      path: "/movies/create",
      name: "movies.create",
      component: () => import("../components/movies/MoviesCreate.vue")
  },
  {
      path: "/movies/:id/edit",
      name: "movies.edit",
      component: () => import("../components/movies/MoviesEdit.vue"),
      props: true
  },

  {
      path: "/stories",
      name: "stories.index",
      component: () => import("../components/stories/StoriesIndex.vue")
  },
  {
      path: "/stories/create",
      name: "stories.create",
      component: () => import("../components/stories/StoriesCreate.vue")
  },
  {
      path: "/stories/:id/edit",
      name: "stories.edit",
      component: () => import("../components/stories/StoriesEdit.vue"),
      props: true
  },
  {
      path: "/stories/:id/details",
      name: "stories.details",
      component: () => import("../components/stories/StoriesDetails.vue"),
      props: true
  },
  {
    path: "/stopwatch",
    name: "stopwatch.index",
    component: () => import("../components/stopwatch/StopWatch.vue"),
}
];


const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
