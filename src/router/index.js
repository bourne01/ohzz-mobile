import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      	path: '/',
      	redirect: 'login',      
    },
    {
      	path: '/startup',
      	name: 'Startup',
		component: resolve => require(['../components/startup'],resolve),
		meta:{keepAlive: true},	
    },
    {
      	path: '/login',
      	name: 'Login',
		component: resolve => require(['../components/user/login'],resolve),
		meta:{keepAlive: false},	
    },
    {
      	path:'/home/',
      	name:'Home',
		component:resolve => require(['../components/home/home'],resolve),
		meta:{keepAlive: false},	
    },
	{
		path:'/my-schedule',
		name:'MySchedule',
		component:resolve => require(['../components/my-schedule/my-schedule'],resolve),
	},
	{
		path:'/record-score',
		name:'RecordScore',
		component:resolve => require(['../components/record-score/record-score'],resolve),
	},	
	/* {
		path:'/find-password',
		name:'FindPassword',
		component:resolve => require(['../components/user/find-password'],resolve),
		meta:{keepAlive: true},	
	},
	{
		path:'/register',
		name:'Register',
		component:resolve => require(['../components/user/register'],resolve),
		meta:{keepAlive: true},	
	}, */
	/* {
		path:'/headline-list',
		name:'HeadlineList',
		component:resolve => require(['../components/home/capmus-news/headline-list.vue'],resolve),
		meta:{keepAlive: true},	
	}, */
	/* {
		path:'/news-detail',
		name:'NewsDetail',
		component:resolve => require(['../components/home/capmus-news/news-detail.vue'],resolve),
		
	}, */
	{
		path:'/course-list',
		name:'CourseList',
		component:resolve => require(['../components/record-score/course-list'],resolve),
		meta:{keepAlive: true},	
	},
	{	
		path:'/page-not-found',
		name:'PageNotFound',
		component:resolve => require(['../components/page-not-found'],resolve)
	},
	{	
		path:'/class-att',
		name:'ClassAttendance',
		component:resolve => require(['../components/attendance/class-attendance'],resolve),
		meta:{keepAlive: false},	
	},
	{	
		path:'/class-att-detail',
		name:'ClassAttendanceDetail',
		component:resolve => require(['../components/attendance/class-att-detail'],resolve),
		meta:{keepAlive: false},	
	},
	{
		path:'/student-score',
		name:'StudentScore',
		component:() => import('../components/student/score/my-score.vue')
	},
	{
		path:'/student-report',
		name:'StudentReportCard',
		component:() => import('../components/student/score/report-card.vue')
	},
	{
		path:'/student-schedule',
		name:'StudentSchedule',
		component:() => import('../components/student/my-schedule/my-schedule.vue')
	},
	{
		path:'/student-home',
		name:'StudentHome',
		component:() => import('../components/student/home/home.vue')
	},
	{
		path:'/student-election',
		name:'StudentElection',
		component:() => import('../components/student/election-course/election-course.vue.vue')
	},
  ]
})
