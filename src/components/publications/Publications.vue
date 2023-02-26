<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getPublications, onUpdate, onSelectPublications } from '../../api'

const publications = ref([])

async function update() {
    publications.value = await getPublications()
}
onMounted(update)
onUpdate(update)
onSelectPublications(update)
</script>

<template>
    {{ publications }}
</template>
