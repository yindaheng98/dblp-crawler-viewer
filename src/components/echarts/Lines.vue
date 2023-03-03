<script setup lang="ts">
import { onMounted, ref } from "vue";
import CCFPie from "./CCFPie.vue";
import ConfPie from "./ConfPie.vue";
import Line from "./MultiLine.vue";
import { onSelectNode, getSelectedNode, onSelectEdge, getSelectedEdge, isSelectedNode, onUpdate, selectPublications } from '../../api'

const key = ref(0)
const loaded = ref(false)

onSelectNode(async () => {
    key.value = await getSelectedNode()
})
onSelectEdge(async () => {
    key.value = await getSelectedEdge()
})
async function update() {
    if (await isSelectedNode()) key.value = await getSelectedNode()
    else key.value = await getSelectedEdge()
    loaded.value = true
}
onMounted(update)
onUpdate(update)
</script>

<template>
    <Line v-if="loaded" :data="key" @select="(year, ccf) => selectPublications(key, { year: year, ccf: ccf })"
        style="height: 100%; width: 100%" />
</template>
