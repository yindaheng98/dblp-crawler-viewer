<script setup lang="ts">
import { ref } from 'vue'
import VisNetwork from './VisNetwork.vue'
import ForceGraph3D from './3DForceGraph.vue'
import SpriteText from 'three-spritetext';

const props = defineProps<{ d3: boolean, options: object }>();
const emit = defineEmits(['selectNode', 'selectEdge'])

const options = {
    nodes: {
        shape: "dot",
        font: {
            color: '#FFFFFF',
        }
    },
    edges: {
        color: {
            inherit: false,
        }
    }
}
function configure(network: any) {
    network
        .linkColor((edge) => edge.color ? edge.color : '#FFFFFF')
        .nodeThreeObject(node => {
            const sprite = new SpriteText(node.label);
            sprite.material.depthWrite = false; // make sprite background transparent
            sprite.color = node.color ? node.color : '#FFFFFF';
            sprite.textHeight = node.value / 16;
            return sprite;
        })
}

const RefGraph = ref(null)


function merge_params2D(o) {
    const params2D = o.params2D
    delete o.params2D
    delete o.params3D
    return { ...params2D, ...o }
}
const merge_params2Dedges = (edge) => ({
    ...merge_params2D(edge),
    from: edge.from,
    to: edge.to,
    id: JSON.stringify({
        from: edge.from,
        to: edge.to,
    })
})

function merge_params3D(o) {
    const params3D = o.params3D
    delete o.params2D
    delete o.params3D
    return { ...params3D, ...o }
}
const merge_params3Dlinks = (edge) => ({
    ...merge_params3D(edge),
    source: edge.from,
    target: edge.to,
    id: JSON.stringify({
        from: edge.from,
        to: edge.to,
    })
})
function setData(nodes: object[], edges: object[]) {
    if (props.d3) {
        RefGraph.value.setData(nodes.map(merge_params3D), edges.map(merge_params3Dlinks))
    } else {
        RefGraph.value.setData(nodes.map(merge_params2D), edges.map(merge_params2Dedges))
    }
}
defineExpose({ setData });
</script>

<template>
    <ForceGraph3D ref="RefGraph" v-if=props.d3 :nodes=[] :links=[] :configure=configure
        @NodeClick="(e) => emit('selectNode', e.id)" @LinkClick="(e) => emit('selectEdge', e.source.id, e.target.id)" />
    <VisNetwork ref="RefGraph" v-else :nodes=[] :edges=[] :options=options @selectNode="(e) => emit('selectNode', e)"
        @selectEdge="(e) => emit('selectEdge', e.from, e.to)" />
</template>
