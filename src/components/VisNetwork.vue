<script setup lang="ts">
import { onMounted, defineEmits, ref, watch } from "vue";
import { DataSet } from "vis-data/esnext";
import { Network, Data, Options } from "vis-network/esnext";

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

function setData(data: Data) {
    if (network !== null)
        network.setData(data)
}
watch(
    (props.nodes, props.edges),
    () => setData({
        nodes: new DataSet(props.nodes),
        edges: new DataSet(props.edges),
    })

)

function setOptions(options: Options) {
    console.log(options)
    if (network !== null)
        network.setOptions(options)
}
watch(
    props.options,
    () => setOptions(props.options)

)
</script>

<template>
    <div ref="visualization">Cannot show vis-network</div>
    <div>{{ props.edges }}</div>
</template>