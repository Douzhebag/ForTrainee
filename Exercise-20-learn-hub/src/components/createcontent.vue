<template>
    <div class="flex flex-col gap-6 p-12 w-2xl m-auto">
        <div class="flex flex-col text-center mb-3">
            <p class="text-center text-4xl font-bold text-orange-500">
                Create New Content
            </p>
        </div>
        <div class="flex flex-col gap-3">
            <label for="VideoUrl" class="text-base text-gray-500 font-bold"
                >Video URL</label
            >
            <input
                type="text"
                class="border rounded-md w-full h-3 p-5"
                ref="videourl"
            />
            <label for="Comment" class="text-base text-gray-500 font-bold"
                >Comments (280 characters maximum)</label
            >
            <textarea
                class="border rounded-md w-full p-5 min-h-24"
                ref="comment"
                maxlength="280"
            ></textarea>
            <ul class="flex gap-5">
                <p class="text-base text-gray-500 flex items-center font-bold">
                    Rating
                </p>
                <div class="flex items-center space-x-1">
                    <svg
                        v-for="n in 5"
                        :key="n"
                        @click="selectedRating = n"
                        @mouseenter="hoverRating = n"
                        @mouseleave="hoverRating = 0"
                        class="w-8 h-8 cursor-pointer transition-colors active:text-orange-500 star-rating"
                        :class="
                            (hoverRating || selectedRating) >= n
                                ? 'text-yellow-400'
                                : 'text-gray-300'
                        "
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"
                        />
                    </svg>
                </div>
                <!-- <li
                    v-for="n in 5"
                    :key="n"
                    @click="selectedRating = n"
                    :class="[
                        'rounded-full bg-gray-200 p-4 h-12 w-12 text-center text-sm hover:bg-orange-300 cursor-pointer flex items-center justify-center',
                        {
                            'bg-orange-500 text-white': selectedRating === n,
                        },
                    ]"
                >
                    {{ n }}
                </li> -->
            </ul>
        </div>
        <button
            class="bg-orange-500 p-4 rounded-2xl text-2xl text-white font-bold hover:bg-orange-600"
            @click="handleCreate"
        >
            Create
        </button>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
const router = useRouter();
const videourl = ref(null);
const comment = ref(null);
const selectedRating = ref(0);
const hoverRating = ref(0);
const URL = import.meta.env.VITE_DOMAIN_URL;

async function createContent() {
    try {
        const videoUrlValue = videourl.value?.value?.trim();
        const commentValue = comment.value?.value?.trim();
        const ratingValue = selectedRating.value;
        const getToken = localStorage.getItem('accessToken');

        if (!videoUrlValue || !commentValue || ratingValue === 0) {
            alert('กรุณากรอกข้อมูลให้ครบถ้วนและเลือก rating');
            return;
        }
        if (commentValue.length > 280) {
            alert('ความคิดเห็นต้องไม่เกิน 280 ตัวอักษร');
            return;
        }
        const api = await axios.post(
            `${URL}/content`,
            {
                videoUrl: videoUrlValue,
                comment: commentValue,
                rating: ratingValue,
            },
            {
                headers: {
                    Authorization: `Bearer ${getToken}`,
                },
            },
        );
        console.log('สร้างนเื้อหาสำเร็จ', api.data);
        router.push('/');
    } catch (error) {
        if (error.response?.status === 400) {
            alert('ข้อมูลไม่ถูกต้อง');
        } else if (error.response?.status === 401) {
            alert('กรุณาเข้าสู่ระบบใหม่');
        } else {
            alert('เกิดข้อผิดพลาด');
        }

        console.error('Error creating content:', error);
    }
}
async function handleCreate() {
    await createContent();
}
</script>
