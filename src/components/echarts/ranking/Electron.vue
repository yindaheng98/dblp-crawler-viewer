<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import { getRankingData, getRankingData_byAllPublications, onUpdate } from '../../../api/electron'

const props = defineProps<{ byAllPublications: boolean }>();

const data = reactive({
    option: {}
})


async function update() {
    if (props.byAllPublications)
        data.option = await getRankingData_byAllPublications()
    else data.option = await getRankingData()
    console.log(data)
}
onMounted(update)
onUpdate(update)
</script>

<template>
    {{ data }}
</template>
