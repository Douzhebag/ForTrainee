<template>
    <navbar />
    <main >
        <router-view :key="$route.fullPath"/>
    </main>
</template>

<script setup>
import Navbar from './components/navbar.vue';
</script>

<style scoped></style>
