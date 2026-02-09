import { createWebHistory, createRouter } from 'vue-router';

import HomeView from '../components/Homepage.vue';
import ContentView from '../components/Content.vue';
import LoginView from '../components/login.vue';
import RegusterView from '../components/register.vue';
import createcontent from '../components/createcontent.vue';
import updatecontent from '../components/updatecontent.vue';
const routes = [
    { path: '/protected', component: HomeView },
    { path: '/content/:id', component: ContentView },
    { path: '/login', component: LoginView },
    { path: '/register', component: RegusterView },
    { path: '/createnewcontent', component: createcontent },
    { path: '/updatecontent/:id', component: updatecontent },
];

export default createRouter({
    history: createWebHistory(),
    routes,
});
