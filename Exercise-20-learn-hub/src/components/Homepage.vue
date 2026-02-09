<template>
    <section class="w-full m-auto px-24 py-32 bg-orange-100">
        <div class="w-[90%] m-auto">
            <h1 class="text-5xl text-orange-500 font-bold">LearnHub</h1>
            <p class="text-2xl text-gray-500">Hub for Educational Videos</p>
        </div>
    </section>
    <section>
        <template v-if="userData">
            <div
                class="flex mt-6 m-auto w-[80%]"
                id="createBtn"
                @click="createnewcontentBtn"
            >
                <button
                    class="bg-orange-500 w-auto p-4 text-2xl rounded-lg text-white font-bold hover:bg-orange-600 max-md:w-full"
                >
                    Creat New Content
                </button>
            </div>
        </template>
        <div
            class="grid grid-cols-5 gap-8 w-[80%] m-auto mt-6 max-xl:grid-cols-4 max-lg:grid-cols-2 max-md:grid-cols-2 max-sm:grid-cols-1"
            id="items"
        ></div>
    </section>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const URL = import.meta.env.VITE_DOMAIN_URL;
const router = useRouter();
const userData = ref(null);
async function getData() {
    try {
        const getToken = localStorage.getItem('accessToken');
        // const response = await fetch(
        //     'https://api.learnhub.thanayut.in.th/content',
        //     {
        //         method: 'GET',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //     }
        // );
        // const data = await response.json();
        // return data.data;
        const response = await axios.get(`${URL}/protected`, {
            headers: {
                Authorization: `Bearer ${getToken}`,
            },
        });
        const data = response.data;
        return data;
    } catch (error) {
        console.log('Error fetching data:', error);
    }
}
function createData(contents) {
    console.log('content', contents);
    const {
        thumbnailUrl,
        videoTitle,
        creatorName,
        comment,
        ownerId: { name },
        rating,
        id,
    } = contents;
    return `
        <a href="/content/${id}" class="rounded-3xl bg-gray-100 rounded-b-xl">
            <article class="size-full">
                <div>
                <img src="${thumbnailUrl}" alt="${videoTitle}" class="aspect-video object-cover rounded-t-xl w-full"/>
            </div>
            <div  class="flex flex-col p-4 ">
                <div class="flex flex-col gap-2 h-36">
                    <h3 class="text-lg font-bold line-clamp-2">${videoTitle}</h3>
                    <h4 class="text-sm">${creatorName}</h4>
                    <p>${comment}</p>
                </div>
                <div class="flex justify-between max-lg:flex-col max-md:text-2xl max-md:flex-row">
                    <p>${name}</p>
                    <p class="size-6 w-max text-orange-600 text-base max-md:text-2xl" >${createStarRating(
                        rating,
                    )}</p>
                </div>
            </div>
            </article>
        </a>`;
}

function createStarRating(rating) {
    let stars = '';
    for (let i = 0; i < 5; i++) {
        if (i < rating) {
            stars += '★'; // filled star
        } else {
            stars += ''; // empty star
        }
    }
    return stars;
}

async function loopData() {
    const itemsContainer = document.getElementById('items');
    if (!itemsContainer) return;

    try {
        const data = await getData();

        if (!Array.isArray(data) || data.length === 0) {
            itemsContainer.innerHTML =
                '<p class="col-span-5 text-center">No content</p>';
            return;
        }

        itemsContainer.innerHTML = data
            .map((content) => createData(content))
            .join('');
    } catch (err) {
        console.error('loopData error:', err);
        itemsContainer.innerHTML =
            '<p class="col-span-5 text-center text-red-500">Error loading data</p>';
    }
}

function checkAuth() {
    const accessToken = localStorage.getItem('accessToken');
    userData.value = !!accessToken;
}

async function createnewcontentBtn() {
    const accessToken = localStorage.getItem('accessToken');
    if (!userData.value) {
        alert('กรุณา Login ก่อนสร้างเนื้อหา');
        router.push('/login');
        return userData;
    }

    if (accessToken.ok) {
        console.log('สามารถสร้างเนื้อหาได้');
        return;
    }

    router.push('/createnewcontent');
}
onMounted(() => {
    checkAuth();
    loopData();
});
</script>
