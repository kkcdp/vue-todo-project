<script setup>
import { Link, router } from "@inertiajs/vue3";

defineProps({
    links: {
        type: Array,
        required: true
    }
})
</script>

<template>
    <div class="flex flex-wrap items-center space-x-1 mt-4">
        <Link
            v-for="(link, index) in links"
            :key="index"
            :href="link.url || '#'"
            v-html="link.label"
            class="px-3 py-1 text-sm rounded border"
            :class="[
                link.active ? 'bg-blue-600 text-white hover:bg-blue-600 pointer-events-none' : 'bg-white text-gray-700',
                !link.url ? 'opacity-50 pointer-events-none' : 'hover:bg-gray-200'
            ]"
        >
        </Link>
    </div>
</template>
