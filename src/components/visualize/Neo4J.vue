<script setup lang="ts">
import { ref } from 'vue';
import Graph from '../graph/Graph.vue'

const props = defineProps<{ d3: boolean }>();
const emit = defineEmits(['selectNode'])

const options = {}

const nodes = [
  { id: 1, label: 'circle', shape: 'circle' },
  { id: 2, label: 'ellipse', shape: 'ellipse' },
  { id: 3, label: 'database', shape: 'database' },
  { id: 4, label: 'box', shape: 'box' },
  { id: 5, label: 'diamond', shape: 'diamond' },
  { id: 6, label: 'dot', shape: 'dot' },
  { id: 7, label: 'square', shape: 'square' },
  { id: 8, label: 'triangle', shape: 'triangle' },
]
const edges = [
  { from: 1, to: 2 },
  { from: 2, to: 3 },
  { from: 2, to: 4 },
  { from: 2, to: 5 },
  { from: 5, to: 6 },
  { from: 5, to: 7 },
  { from: 6, to: 8 }
]
const RefGraph = ref(null)
function pop() {
  nodes.pop()
  edges.pop()
  options.nodes = { shadow: true }
  options.edges = { shadow: true }
  RefGraph.value.setData(nodes, edges)
}
function push() {
  nodes.push({ id: 8, label: 'triangle', shape: 'triangle' })
  edges.push({ from: 6, to: 8 })
  options.nodes = { shadow: false }
  options.edges = { shadow: false }
  RefGraph.value.setData(nodes, edges)
}
</script>

<template>
  <Graph ref="RefGraph" :d3=props.d3 :nodes=nodes :edges=edges :options=options
    @selectNode="(e) => emit('selectNode', e)" />
  <button @click="pop()">pop</button>
  <button @click="push()">push</button>
</template>
