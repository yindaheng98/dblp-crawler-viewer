<script setup lang="ts">
import { onMounted, ref } from "vue";
import CCFPie from "./CCFPie.vue";
import { onSelectNode, getSelectedNode, onSelectEdge, getSelectedEdge, isSelectedNode, onUpdate } from '../../api'

const key = ref(0)

onSelectNode(async () => {
    key.value = await getSelectedNode()
})
onSelectEdge(async () => {
    key.value = await getSelectedEdge()
})
async function update() {
    if (await isSelectedNode()) key.value = await getSelectedNode()
    else key.value = await getSelectedEdge()
}
onMounted(update)
onUpdate(update)
</script>

<template>
    <CCFPie :key="key" />
    <div>{{ key }}</div>
</template>
