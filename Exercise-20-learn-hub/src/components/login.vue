<template>
    <section class="h-dvh flex justify-center items-center w-auto px-2.5">
        <div
            class="border-gray-300 rounded-lg border shadow-lg flex flex-col m-auto p-12 gap-5 h-auto w-3xl px-2.5"
        >
            <h1 class="text-center text-4xl font-bold text-amber-600">Login</h1>
            <label for="username" class="text-2xl">Username</label>
            <input
                type="text"
                placeholder="Username"
                class="border rounded-md w-full h-3 p-6"
                id="username"
                ref="usernameInput"
            />
            <label for="password" class="text-2xl">Password</label>
            <input
                type="password"
                placeholder="Password"
                class="border rounded-md w-full h-3 p-6"
                id="password"
                ref="passwordInput"
            />
            <button
                class="cursor-pointer text-2xl w-full p-3 bg-amber-600 rounded-md text-amber-50 font-semibold"
                @click="valueItem"
            >
                Login
            </button>
            <div class="flex justify-center">
                <a href="/register" class="text-gray-500 text-lg"
                    >Don't have an account? Registers</a
                >
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const usernameInput = ref(null);
const passwordInput = ref(null);

async function login() {
    try {
        const username = usernameInput.value.value;
        const password = passwordInput.value.value;
        if (!username || !password) {
            alert('กรุณากรอก Username หรือ Password');
            return null;
        }
        const api = await fetch(
            'https://api.learnhub.thanayut.in.th/auth/login',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),
            }
        );
        const data = await api.json();
        if (!data.accessToken) {
            alert('กรุณากรอก Username หรือ Password ให้ถูกต้อง');
            return null;
        }
        localStorage.setItem('accessToken', data.accessToken);
        const userData = await fetch(
            'https://api.learnhub.thanayut.in.th/auth/me',
            {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${data.accessToken}`,
                },
            }
        );
        const userLogin = await userData.json();
        localStorage.setItem('user', JSON.stringify(userLogin.name));
        return userLogin;
    } catch (error) {
        console.error('Error:', error);
        alert('เข้าสู่ระบบไม่สำเร็จ');
        return null;
    }
}

async function valueItem() {
    const userBody = await login();

    if (!userBody) {
        return;
    }
    console.log('เข้าสู่ระบบสำเร็จ:', userBody.username);
    router.push('/').then(() => router.go());
}
</script>
