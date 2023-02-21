<script setup lang="ts">
import { onMounted, ref } from "vue";
import { DataSet } from "vis-data/esnext";
import { Network } from "vis-network/esnext";

const props = defineProps<{ nodes: object[], edges: object[], options: object }>();
const emit = defineEmits(['selectNode', 'selectEdge'])

const visualization = ref(null);
let network: Network | null = null;
onMounted(() => {
    network = new Network(visualization.value, {
        nodes: new DataSet(props.nodes),
        edges: new DataSet(props.edges),
    }, props.options);
    network.on("select", (properties) => {
        if (properties.nodes.length > 0)
            emit("selectNode", properties.nodes[0])
        else if (properties.edges.length > 0)
            emit("selectEdge", JSON.parse(properties.edges[0]))
    })
})
function setData(nodes: object[], edges: object[]) {
    if (network !== null)
        network.setData({
            nodes: new DataSet(nodes),
            edges: new DataSet(edges),
        })
}
defineExpose({ setData });
</script>

<template>
    <div ref="visualization">Cannot show vis-network</div>
</template>