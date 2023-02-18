<script setup lang="ts">
import { onMounted, ref } from "vue";
import ForceGraph3D from '3d-force-graph';

const props = defineProps<{ nodes: object[], links: object[] }>();
const emit = defineEmits(['NodeClick'])

const visualization = ref(null);
let network = null;
onMounted(() => {
    network = ForceGraph3D()(visualization.value);
    network.graphData({
        nodes: props.nodes,
        links: props.links,
    });
    network.onNodeClick((node) => emit('NodeClick', node))
})
</script>

<template>
    <div ref="visualization">Cannot show 3d-force-graph</div>
</template>