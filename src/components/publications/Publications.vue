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
    <table style="text-align: left">
        <tr v-for="p in publications">
            <td>{{ p.authors }}, {{ p.title }}, {{ p.journal }}, {{ p.year }}</td>
        </tr>
    </table>
</template>
