<template>
    <header class="flex w-full justify-between bg-orange-100">
        <nav class="m-auto flex w-[90%] justify-between py-4">
            <router-link to="/protected" class="flex items-center">
                <img
                    src="https://learnhub.thanayut.in.th/logo.svg"
                    alt="Learn-Hub-logo"
                    class="size-12"
                />
                <p class="text-3xl font-bold text-orange-500">LearnHub</p>
            </router-link>
            <div class="flex items-center gap-6 justify-self-end">
                <template v-if="!userData">
                    <router-link
                        to="/login"
                        class="text-base font-bold text-orange-500"
                    >
                        Login
                    </router-link>
                    <router-link
                        to="/register"
                        class="text-base font-bold text-orange-500"
                    >
                        Register
                    </router-link>
                </template>
                <template v-else>
                    <span class="text-lg text-gray-700">{{
                        userData.name
                    }}</span>
                    <button
                        @click="handleLogout"
                        class="cursor-pointer text-base font-bold text-orange-500"
                    >
                        Logout
                    </button>
                </template>
            </div>
        </nav>
    </header>
</template>

<script setup>
import { ref, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
const router = useRouter();
const userData = ref(null);
const URL = import.meta.env.VITE_DOMAIN_URL;
async function checkAuth() {
    const getToken = localStorage.getItem('accessToken');
    if (!getToken) {
        userData.value = null;
        return;
    }
    try {
        // const response = await fetch(
        //     'https://api.learnhub.thanayut.in.th/auth/me',
        //     {
        //         method: 'GET',
        //         headers: {
        //             Authorization: `Bearer ${accessToken}`,
        //         },
        //     }
        // );
        const response = await axios.get(`${URL}/auth/me`, {
            headers: {
                Authorization: `Bearer ${getToken}`,
            },
        });

        userData.value = response.data;
    } catch (error) {
        console.error('Error checking auth status:', error);
        handleLogout();
    }
}

function handleLogout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    userData.value = null;
    router.push('/protected').then(() => router.go());
}

watchEffect(() => {
    checkAuth();
});
</script>

LearnHub
