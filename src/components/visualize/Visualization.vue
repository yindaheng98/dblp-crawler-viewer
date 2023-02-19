<script setup lang="ts">
import { computed } from 'vue'
import VisNetwork from './graph/VisNetwork.vue'
import ForceGraph3D from './graph/3DForceGraph.vue'

const props = defineProps<{ d3: boolean, nodes: object[], edges: object[], options: object }>();
const emit = defineEmits(['selectNode'])

const nodes = computed(() => props.nodes)
const edges = computed(() => props.edges)
const links = computed(
    () => props.edges
        .map(edge => ({
            source: edge.from,
            target: edge.to,
        }))
)
const options = computed(() => props.options)
</script>

<template>
    <ForceGraph3D v-if=d3 :nodes=nodes :links=links @NodeClick="(e)=>emit('selectNode', e.id)" />
    <VisNetwork v-else :nodes=nodes :edges=edges :options=options @selectNode="(e)=>emit('selectNode', e.nodes[0])" />
</template>
