import HomePage from "../pages/HomePage.vue"
import NotFoundPage from "../pages/NotFoundPage.vue"
import LoginForm from "../components/LoginForm.vue"
import RegisterForm from "../components/RegisterForm.vue"
import CategoryForm from "../components/CategoryForm.vue"
import TaskForm from "../components/TaskForm.vue"



const routes = [
    {
        path: '/',
        name: 'home',
        component: HomePage,
        children: [
            {
                path: '/login',
                name: 'login',
                component: LoginForm,
            },
            {
                path: '/register',
                name: 'register',
                component: RegisterForm,
            },

            // Tasks Routes
            {
                path: '/category-create',
                name: 'category-create',
                component: CategoryForm,
            },
            {
                path: '/category/:id',
                name: 'category-edit',
                component: CategoryForm,
            },
            {
                path: '/task-create',
                name: 'task-create',
                component: TaskForm,
            },
            {
                path: '/task/:id',
                name: 'task-edit',
                component: TaskForm,
            },
        ]
    },

    {
        path: '/:pathMatch(.*)*',
        component: NotFoundPage,
    },
];

export default routes;
