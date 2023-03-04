<script setup lang="ts">
import { computed, ref } from 'vue'
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
}
function configure(network: any) {
    network
        .linkColor(() => '#FFFFFF')
        .nodeThreeObject(node => {
            const sprite = new SpriteText(node.label);
            sprite.material.depthWrite = false; // make sprite background transparent
            sprite.color = node.color ? node.color : '#FFFFFF';
            sprite.textHeight = node.value / 16;
            return sprite;
        })
}

const RefGraph = ref(null)
function setData(nodes: object[], edges: object[]) {
    edges = edges
        .map(edge => {
            edge.id = JSON.stringify({
                from: edge.from,
                to: edge.to,
            })
            return edge
        })
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
    <ForceGraph3D ref="RefGraph" v-if=props.d3 :nodes=[] :links=[] :configure=configure
        @NodeClick="(e) => emit('selectNode', e.id)" @LinkClick="(e) => emit('selectEdge', e.source.id, e.target.id)" />
    <VisNetwork ref="RefGraph" v-else :nodes=[] :edges=[] :options=options @selectNode="(e) => emit('selectNode', e)"
        @selectEdge="(e) => emit('selectEdge', e.from, e.to)" />
</template>
