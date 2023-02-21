<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Graph from '../graph/Graph.vue'
import { getGraphData, selectNode, selectEdge } from '../../api/electron'

const props = defineProps<{ d3: boolean }>();

const options = {}

const nodes = [{ id: 0, label: 'Loading', shape: 'circle' }]
const edges = []
const RefGraph = ref(null)
onMounted(async () => RefGraph.value.setData(...await getGraphData()))
</script>

<template>
    <Graph ref="RefGraph" :d3=props.d3 :nodes=nodes :edges=edges :options=options @selectNode="selectNode"
        @selectEdge="selectEdge" />
</template>
