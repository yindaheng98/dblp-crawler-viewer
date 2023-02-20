<script setup lang="ts">
import { computed, ref } from 'vue'
import VisNetwork from './VisNetwork.vue'
import ForceGraph3D from './3DForceGraph.vue'

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

const RefGraph = ref(null)
function setData(nodes: object[], edges: object[]) {
    if (props.d3) {
        RefGraph.value.setData(nodes, edges.map(edge => ({
            source: edge.from,
            target: edge.to,
        })))
    } else {
        RefGraph.value.setData(nodes, edges)
    }
}
defineExpose({ setData });
</script>

<template>
    <ForceGraph3D ref="RefGraph" v-if=props.d3 :nodes=nodes :links=links @NodeClick="(e) => emit('selectNode', e.id)" />
    <VisNetwork ref="RefGraph" v-else :nodes=nodes :edges=edges :options=options
        @selectNode="(e) => emit('selectNode', e.nodes[0])" />
</template>
