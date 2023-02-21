<script setup lang="ts">
import { onMounted, ref } from "vue";
import ForceGraph3D, { ForceGraph3DInstance } from '3d-force-graph';

const props = defineProps<{ nodes: object[], links: object[] }>();
const emit = defineEmits(['NodeClick', 'LinkClick'])

const visualization = ref(null);
let network: ForceGraph3DInstance | null = null;
onMounted(() => {
    network = ForceGraph3D()(visualization.value);
    network.graphData({
        nodes: props.nodes,
        links: props.links,
    });
    network.onNodeClick((node) => emit('NodeClick', node))
    network.onLinkClick((link) => emit('LinkClick', link))
})
function setData(nodes: object[], links: object[]) {
    if (network !== null)
        network.graphData({
            nodes: nodes,
            links: links,
        })
}
defineExpose({ setData });
</script>

<template>
    <div ref="visualization">Cannot show 3d-force-graph</div>
</template>