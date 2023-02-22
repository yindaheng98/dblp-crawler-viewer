<script setup lang="ts">
import { onMounted, ref } from "vue";
import CCFPie from "./CCFPie.vue";
import { onSelectNode, getSelectedNode, onSelectEdge, getSelectedEdge, isSelectedNode } from '../../api'

const data = ref({ key: 0 })

onSelectNode(async () => {
    data.key = await getSelectedNode()
})
onSelectEdge(async () => {
    data.key = await getSelectedEdge()
})
onMounted(async () => {
    if (await isSelectedNode()) data.key = await getSelectedNode()
    else data.key = await getSelectedEdge()
})
</script>

<template>
    <CCFPie :key="data.key" />
</template>
