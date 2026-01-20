<template>
    <header class="flex w-full justify-between bg-orange-100">
        <nav class="m-auto flex w-[90%] justify-between py-4">
            <router-link to="/" class="flex items-center">
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
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const userData = ref(null);

async function checkAuth() {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
        userData.value = null;
        return;
    }
    try {
        const response = await fetch(
            'https://api.learnhub.thanayut.in.th/auth/me',
            {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );

        if (response.ok) {
            userData.value = await response.json();
        } else {
            handleLogout();
        }
    } catch (error) {
        console.error('Error checking auth status:', error);
        handleLogout();
    }
}

function handleLogout() {
    localStorage.removeItem('accessToken');
    userData.value = null;
    router.push('/').then(() => router.go())
}


watch(() => {
    checkAuth();
});
</script>

LearnHub
