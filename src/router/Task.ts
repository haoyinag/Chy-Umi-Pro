export default {
  path: "/task",
  name: "task",
  icon: "crown",
  access: "canAdmin",
  // component: "@/pages/Task",
  routes: [
    {
      path: "/task/today",
      name: "今日任务",
      title: "今日任务",
      icon: "smile",
      component: "@/pages/Task/Today"
    },
    {
      path: "/task/reverse",
      name: "预约任务",
      title: "预约任务",
      icon: "smile",
      component: "@/pages/Task/Reverse"
    },
    {
      path: "/task/history",
      name: "历史任务",
      title: "历史任务",
      icon: "smile",
      component: "@/pages/Task/History"
    },
    {
      path: "/task/unusual",
      name: "异常任务",
      title: "异常任务",
      icon: "smile",
      component: "@/pages/Task/Unusual"
    }
  ]
};
