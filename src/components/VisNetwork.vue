<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from "vue";
import { DataSet } from "vis-data/esnext";
import { Network } from "vis-network/esnext";

const props = defineProps<{ nodes: object[], edges: object[], options: object }>();
const visualization = ref(null);
let network = null;
onMounted(() => {
    network = new Network(visualization.value, {
        nodes: new DataSet(props.nodes),
        edges: new DataSet(props.edges),
    }, props.options);
})
onBeforeUnmount(() => {
    if (network !== null)
        network.destroy();
})
</script>

<template>
    <div ref="visualization">Cannot show vis-network</div>
</template>