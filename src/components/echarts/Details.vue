<script setup lang="ts">
import { onMounted, reactive } from "vue";
import CCFPie from "./CCFPie.vue";
import { onSelectNode, getSelectedNode, onSelectEdge, getSelectedEdge, isSelectedNode, onUpdate } from '../../api'

const data = reactive({ key: 0 })

onSelectNode(async () => {
    data.key = await getSelectedNode()
})
onSelectEdge(async () => {
    data.key = await getSelectedEdge()
})
async function update() {
    if (await isSelectedNode()) data.key = await getSelectedNode()
    else data.key = await getSelectedEdge()
}
onMounted(update)
onUpdate(update)
</script>

<template>
    <CCFPie :key="data.key" />
</template>
