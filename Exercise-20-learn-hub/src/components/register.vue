<template>
    <section class="h-dvh flex justify-center items-center w-auto px-2.5">
        <div
            class="flex flex-col p-6 border border-gray-300 rounded-lg shadow-lg w-3xl gap-5 m-auto px-2.5"
        >
            <p class="text-center text-4xl font-bold text-amber-600">
                Register
            </p>
            <div class="flex flex-col gap-5">
                <label for="username" class="text-2xl">Username</label>
                <input
                    type="text"
                    class="border rounded-md w-full h-3 p-6"
                    ref="usernameInput"
                />
                <label for="name" class="text-2xl">Your Name</label>
                <input
                    type="text"
                    class="border rounded-md w-full h-3 p-6"
                    ref="nameInput"
                />
                <label for="password" class="text-2xl">Password</label>
                <input
                    type="password"
                    class="border rounded-md w-full h-3 p-6"
                    ref="passwordInput"
                />
                <label for="Confirm password" class="text-2xl"
                    >Confirm Password</label
                >
                <input
                    type="password"
                    class="border rounded-md w-full h-3 p-6"
                    ref="confirmpasswordInput"
                />
                <button
                    @click="handleRegister"
                    class="cursor-pointer text-2xl w-full p-3 bg-amber-600 rounded-md text-amber-50 font-semibold"
                >
                    Register
                </button>
            </div>
            <div class="flex justify-center">
                <a href="/login" class="text-gray-500 text-lg"
                    >Already have an account? Login</a
                >
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();
const usernameInput = ref(null);
const nameInput = ref(null);
const passwordInput = ref(null);
const confirmpasswordInput = ref(null);

const URL = import.meta.env.VITE_DOMAIN_URL;
async function register() {
    try {
        const username = usernameInput.value.value;
        const name = nameInput.value.value;
        const password = passwordInput.value.value;
        const confirmpassword = confirmpasswordInput.value.value;
        if (!username || !name || !password || !confirmpassword) {
            alert('กรุณากรอกข้อมูลให้ครบถ้วน');
            return null;
        }
        if (password !== confirmpassword) {
            alert('รหัสผ่านไม่ตรงกัน');
            return null;
        }
        // const api = await fetch(`${URL}/user`, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //         username: username,
        //         name: name,
        //         password: password,
        //     }),
        // });
        const api = await axios.post(`${URL}/register`, {
            username,
            name,
            password,
        });
        return api.data;
    } catch (error) {
        if (error.response) {
            if (error.response.status === 409) {
                alert('Username นี้มีอยู่แล้ว');
            } else if (error.response.status === 400) {
                alert('ข้อมูลไม่ถูกต้อง');
            } else {
                alert('ลงทะเบียนไม่สำเร็จ');
            }
        } else {
            alert('ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์');
        }
        console.error(error);
        return null;
    }
}
async function handleRegister() {
    const result = await register();
    if (result) {
        alert('ลงทะเบียนสำเร็จ');
        router.push('/login');
    }
}
</script>
