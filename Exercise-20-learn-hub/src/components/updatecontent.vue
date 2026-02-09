<template>
    <section>
        <div class="flex flex-col w-[50%] m-auto mt-12 gap-6 h-dvh">
            <p class="text-center text-4xl font-bold text-orange-500">
                Update Content
            </p>
            <label for="Comment" class="text-base text-gray-500 font-bold"
                >Update Comment</label
            >
            <textarea
                class="border rounded-md w-full p-5 min-h-24"
                v-model="comment"
                maxlength="280"
                placeholder="เขียนความคิดเห็น..."
            ></textarea>
            <ul class="flex gap-5">
                <p class="text-base text-gray-500 flex items-center font-bold">
                    Update Rating
                </p>
                <div class="flex items-center space-x-1">
                    <svg
                        v-for="n in 5"
                        :key="n"
                        @click="selectedRating = n"
                        @mouseenter="hoverRating = n"
                        @mouseleave="hoverRating = 0"
                        class="w-8 h-8 cursor-pointer transition-colors"
                        :class="
                            hoverRating > 0
                                ? hoverRating >= n
                                    ? 'text-yellow-400'
                                    : 'text-gray-300'
                                : selectedRating >= n
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
            </ul>
            <button
                class="bg-orange-500 p-4 rounded-2xl text-2xl text-white font-bold hover:bg-orange-600"
                @click="handleUpdate"
            >
                Update
            </button>
        </div>
    </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const router = useRouter();
const comment = ref('');
const selectedRating = ref(0);
const hoverRating = ref(0);
const URL = import.meta.env.VITE_DOMAIN_URL;

async function fetchContentData() {
    try {
        const contentId = route.params.id;
        if (!contentId) {
            alert('ไม่พบ ID เนื้อหา');
            return;
        }
        // const response = await fetch(
        //     `https://api.learnhub.thanayut.in.th/content/${contentId}`,
        // );
        // if (!response.ok) throw new Error('Failed to fetch content');
        // const data = await response.json();
        // const contentData = data?.data || data;
        // comment.value = contentData.comment;
        // selectedRating.value = contentData.rating;
        const response = await axios.get(`${URL}/content/${contentId}`);
        const data = response.data?.data || response.data;
        comment.value = data.comment;
        selectedRating.value = data.rating;
    } catch (error) {
        console.error('Error fetching content:', error);
        alert('ไม่สามารถโหลดข้อมูลได้');
    }
}

async function handleUpdate() {
    try {
        if (!comment.value || selectedRating.value === 0) {
            alert('กรุณากรอกข้อมูลให้ครบถ้วน');
            return;
        }
        const contentId = route.params.id;
        const getToken = localStorage.getItem('accessToken');
        // const response = await fetch(
        //     `https://api.learnhub.thanayut.in.th/content/${contentId}`,
        //     {
        //         method: 'PATCH',
        //         headers: {
        //             'Content-Type': 'application/json',
        //             Authorization: `Bearer ${localStorage.getItem(
        //                 'accessToken'
        //             )}`,
        //         },
        //         body: JSON.stringify({
        //             comment: comment.value,
        //             rating: selectedRating.value,
        //         }),
        //     }
        // );
        const response = await axios.patch(
            `${URL}/content/${contentId}`,
            {
                comment: comment.value,
                rating: selectedRating.value,
            },
            {
                headers: {
                    Authorization: `Bearer ${getToken}`,
                },
            },
        );
        alert('อัพเดตเนื้อหาสำเร็จ');
        router.push('/content/' + contentId);
    } catch (error) {
        console.error('Error updating content:', error);
        alert('อัพเดตเนื้อหาไม่สำเร็จ: ' + error.message);
    }
}
onMounted(() => {
    fetchContentData();
});
</script>
