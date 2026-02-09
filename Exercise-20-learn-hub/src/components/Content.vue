<template>
    <section class="gap-6">
        <div v-if="content" class="flex flex-col">
            <div
                class="flex flex-col gap-6 m-auto mt-10 bg-orange-100 rounded-2xl w-[80%] p-8"
            >
                <div class="flex flex-col gap-2 text-center">
                    <p class="text-3xl text-orange-500 font-bold">
                        {{ content.videoTitle }}
                    </p>
                    <h5 class="text-2xl text-gray-500">
                        {{ content.creatorName }}
                    </h5>
                </div>
                <div class="flex justify-center">
                    <iframe
                        width="560"
                        height="315"
                        :src="getYoutubeEmbedUrl(content.videoUrl)"
                        :title="content.videoTitle"
                        frameborder="0"
                        allow="
                            accelerometer;
                            autoplay;
                            clipboard-write;
                            encrypted-media;
                            gyroscope;
                            picture-in-picture;
                            web-share;
                        "
                        referrerpolicy="strict-origin-when-cross-origin"
                        allowfullscreen
                        class="max-md:w-auto"
                    ></iframe>
                </div>
                <div class="flex flex-col bg-white p-9 rounded-xl gap-4">
                    <div
                        class="w-max text-9xl text-center flex items-center justify-center"
                    >
                        <span
                            class="flex align-self-center h-[100px] italic text-gray-500"
                            >"</span
                        >
                        <span
                            class="text-lg italic text-gray-500 flex flex-col"
                            >{{ content.comment }}</span
                        >
                    </div>
                    <div
                        class="flex justify-end flex-col items-end text-orange-500"
                    >
                        <span class="flex">{{
                            createStarRating(content.rating)
                        }}</span>
                        <p class="text-gray-700">
                            — {{ content.postedBy.name }}
                        </p>
                        <p class="text-base text-gray-700">
                            {{ formatDate(content.createdAt) }}
                        </p>
                    </div>
                    <!-- <template v-if="canEditContent"> -->
                    <div class="flex justify-between gap-4 mt-3">
                        <button
                            class="bg-orange-500 w-full p-4 text-2xl rounded-lg text-white font-bold hover:bg-orange-600"
                            @click="updateBtn"
                        >
                            Update new Content
                        </button>
                        <button
                            class="bg-red-500 w-full p-4 text-2xl rounded-lg text-white font-bold hover:bg-red-600"
                            @click="deleteBtn"
                        >
                            Delete This Content
                        </button>
                    </div>
                    <!-- </template> -->
                </div>
            </div>
        </div>
        <div v-else class="text-center text-gray-500 mt-10">
            <p>Loading...</p>
        </div>
    </section>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const router = useRouter();
const content = ref(null);
const userData = ref(null);
const URL = import.meta.env.VITE_DOMAIN_URL;

async function getData(id) {
    try {
        // const response = await fetch(
        //     `https://api.learnhub.thanayut.in.th/content/${id}`
        // );
        // if (!response.ok) throw new Error('Network error');
        // const data = await response.json();
        // return data?.data || data;
        const response = await axios.get(`${URL}/content/${id}`);
        const data = response.data;
        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

const getYoutubeEmbedUrl = (url) => {
    try {
        if (url.includes('youtube.com/embed/')) {
            return url;
        }
        const videoId = url.match(
            /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^?&#]+)/,
        )?.[1];
        if (videoId?.length === 11) {
            return `https://www.youtube.com/embed/${videoId}?enablejsapi=1&origin=${window.location.origin}`;
        }
        return url;
    } catch (error) {
        console.error('Error converting YouTube URL:', error);
        return url;
    }
};

function formatDate(isoString) {
    if (!isoString) return '';
    const date = new Date(isoString);
    return new Intl.DateTimeFormat('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    }).format(date);
}

function createStarRating(rating) {
    let stars = '';
    for (let i = 0; i < 5; i++) {
        stars += i < rating ? '★' : '☆';
    }
    return stars;
}

async function updateBtn() {
    router.push('/updatecontent/' + route.params.id);
}

async function deleteBtn() {
    if (!confirm('คุณแน่ใจว่าต้องการลบเนื้อหานี้?')) {
        return;
    }
    try {
        const id = route.params.id;
        const getToken = localStorage.getItem('accessToken');
        // const response = await fetch(
        //     `https://api.learnhub.thanayut.in.th/content/${route.params.id}`,
        //     {
        //         method: 'DELETE',
        //         headers: {
        //             Authorization: `Bearer ${localStorage.getItem(
        //                 'accessToken'
        //             )}`,
        //         },
        //     }
        // );
        // if (!response.ok) {
        //     throw new Error('Failed to delete content');
        // }
        const response = await axios.delete(`${URL}/content/${id}`, {
            headers: {
                Authorization: `Bearer ${getToken}`,
            },
        });

        const data = response.data;
        alert('ลบเนื้อหาสำเร็จ');
        router.push('/protected');
        return data;
    } catch (error) {
        if (error.response) {
            console.log('Error status', error.response.status);
            console.error('Error deleting content:', error);
            alert('ลบเนื้อหาไม่สำเร็จ ' + error.message);
        }
    }
}

async function checkData() {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
        userData.value = null;
        return;
    }
    try {
        // const response = await fetch(
        //     'https://api.learnhub.thanayut.in.th/auth/user',
        //     {
        //         headers: {
        //             Authorization: `Bearer ${accessToken}`,
        //         },
        //     },
        // );
        // if (response.ok) {
        //     const data = await response.json();
        //     userData.value = data?.data || {};
        // }
        const response = await axios.get(`${URL}/auth/me`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        userData.value = response.data?.data || response.data;
    } catch (error) {
        console.error('Error fetching user data:', error);
        userData.value = null;
    }
}
onMounted(async () => {
    content.value = await getData(route.params.id);
    checkData();
});
</script>
