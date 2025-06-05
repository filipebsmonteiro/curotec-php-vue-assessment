import HomePage from "../pages/HomePage.vue"
import NotFoundPage from "../pages/NotFoundPage.vue"

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomePage,
    },

    {
        path: '/:pathMatch(.*)*',
        component: NotFoundPage,
    },
];

export default routes;
