<script setup lang="ts">
import { onMounted, ref } from "vue";
import { DataSet } from "vis-data/esnext";
import { Network, Data } from "vis-network/esnext";

const props = defineProps<{ nodes: object[], edges: object[], options: object }>();
const emit = defineEmits(['selectNode'])

const visualization = ref(null);
let network: Network | null = null;
onMounted(() => {
    network = new Network(visualization.value, {
        nodes: new DataSet(props.nodes),
        edges: new DataSet(props.edges),
    }, props.options);
    network.on("selectNode", (properties) => emit("selectNode", properties))
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