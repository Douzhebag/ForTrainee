<!-- <template>
    <section class="h-dvh flex justify-center items-center w-auto px-2.5">
        <form
            ref="loginForm"
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
        </form>
    </section>
</template> -->
<template>
    <section class="h-dvh flex justify-center items-center w-auto px-2.5">
        <form
            @submit.prevent="handleLogin"
            class="border-gray-300 rounded-lg border shadow-lg flex flex-col m-auto p-12 gap-5 h-auto w-3xl px-2.5"
        >
            <h1 class="text-center text-4xl font-bold text-amber-600">Login</h1>
            <label for="username" class="text-2xl">Username</label>
            <input
                v-model="username"
                type="text"
                placeholder="Username"
                class="border rounded-md w-full h-3 p-6"
                id="username"
            />

            <label for="password" class="text-2xl">Password</label>
            <input
                v-model="password"
                type="password"
                placeholder="Password"
                class="border rounded-md w-full h-3 p-6"
                id="password"
            />

            <button
                class="cursor-pointer text-2xl w-full p-3 bg-amber-600 rounded-md text-amber-50 font-semibold"
            >
                Login
            </button>

            <div class="flex justify-center">
                <a href="/register" class="text-gray-500 text-lg"
                    >Don't have an account? Registers</a
                >
            </div>
        </form>
    </section>
</template>
<!-- <script setup>
import { handleError, ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();
const loginForm = ref(null);
const usernameInput = ref(null);
const passwordInput = ref(null);
const URL = import.meta.env.VITE_DOMAIN_URL;

async function login() {
    try {
        const username = usernameInput.value?.value;
        const password = passwordInput.value?.value;

        if (!username || !password) {
            alert('กรุณากรอก Username หรือ Password');
            return null;
        }

        const res = await axios.post(`${URL}/login`, {
            username,
            password,
        });

        const accessToken =
            res.data?.accessToken || res.data?.data?.accessToken;

        if (!accessToken) {
            alert('Username หรือ Password ไม่ถูกต้อง');
            return null;
        }

        localStorage.setItem('accessToken', accessToken);
        loginForm.value?.reset();
        const userRes = await axios.get(`${URL}/auth/me`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        return userRes.data;
    } catch (err) {
        console.error(err);
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
    router.push('/protected').then(() => router.go());
}
</script> -->
<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();
const URL = import.meta.env.VITE_DOMAIN_URL;

// ใช้ v-model เก็บค่า
const username = ref('');
const password = ref('');

async function handleLogin() {
    try {
        // 1. Validate
        if (!username.value || !password.value) {
            alert('กรุณากรอก Username หรือ Password');
            return;
        }
        // console.log('กำลังส่งข้อมูล...', {
        //     username: username.value,
        //     password: password.value,
        // });

        // 2. ยิง API Login
        const res = await axios.post(`${URL}/login`, {
            username: username.value,
            password: password.value,
        });

        console.log('Response จาก Server:', res.data); // *เช็คตรงนี้ว่า Data หน้าตาเป็นยังไง*

        // 3. ดึง Token (เช็คโครงสร้างดีๆ ว่า backend ส่งมาแบบไหน)
        const accessToken =
            res.data?.accessToken || res.data?.data?.accessToken;

        if (!accessToken) {
            console.error('ไม่พบ Access Token ใน Response');
            alert('Login สำเร็จ แต่ไม่ได้รับ Token');
            return;
        }

        // 4. บันทึก Token
        localStorage.setItem('accessToken', accessToken);
        console.log('บันทึก Token เรียบร้อย:', accessToken); // *ถ้าขึ้นบรรทัดนี้แสดงว่าเก็บแล้ว*

        // 5. (Optional) ดึงข้อมูล User
        // ถ้า API /auth/me ต้องการ token ทันที ต้องแน่ใจว่า header ถูกส่งไป
        const userRes = await axios.get(`${URL}/auth/me`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        console.log('ข้อมูล User:', userRes.data);

        // 6. เปลี่ยนหน้า
        // router.go() ไม่แนะนำเพราะมันคือ Refresh หน้าจอ ให้ใช้ push เฉยๆ ก็พอ
        router.push('/protected').then(() => router.go())   ;
    } catch (err) {
        console.error('เกิดข้อผิดพลาด:', err);
        // เช็ค Error จาก Response server
        if (err.response) {
            alert(
                `Login ไม่ผ่าน: ${err.response.data.message || err.response.statusText}`,
            );
        } else {
            alert('ไม่สามารถติดต่อ Server ได้');
        }
    }
}
</script>
