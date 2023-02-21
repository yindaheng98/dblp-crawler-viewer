<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Graph from './base/Graph.vue'
import { getGraphData, selectNode, selectEdge, onUpdate } from '../../api/electron'

const props = defineProps<{ d3: boolean }>();

const options = {}

const nodes = [{ id: 0, label: 'Loading', shape: 'circle' }]
const edges = []
const RefGraph = ref(null)

async function update() {
    return RefGraph.value.setData(...await getGraphData())
}
onMounted(update)
onUpdate(update)
</script>

<template>
    <Graph ref="RefGraph" :d3=props.d3 :nodes=nodes :edges=edges :options=options @selectNode="selectNode"
        @selectEdge="selectEdge" />
</template>
