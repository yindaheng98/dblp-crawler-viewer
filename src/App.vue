<script setup lang="ts">
import VisNetwork from './components/VisNetwork.vue'
import ForceGraph3D from './components/3DForceGraph.vue'
import { reactive } from 'vue';

const nodes = reactive([
  { id: 1, label: 'circle', shape: 'circle' },
  { id: 2, label: 'ellipse', shape: 'ellipse' },
  { id: 3, label: 'database', shape: 'database' },
  { id: 4, label: 'box', shape: 'box' },
  { id: 5, label: 'diamond', shape: 'diamond' },
  { id: 6, label: 'dot', shape: 'dot' },
  { id: 7, label: 'square', shape: 'square' },
  { id: 8, label: 'triangle', shape: 'triangle' },
])
const edges = reactive([
  { from: 1, to: 2 },
  { from: 2, to: 3 },
  { from: 2, to: 4 },
  { from: 2, to: 5 },
  { from: 5, to: 6 },
  { from: 5, to: 7 },
  { from: 6, to: 8 }
])
const options = {}
const links = edges
  .map(edge => ({
    source: edge.from,
    target: edge.to,
  }))
function showEvent(payload) {
  console.log(payload)
}
function pop() {
  console.log('pop')
  edges.pop()
}
function push() {
  console.log('push')
  edges.push({ from: 6, to: 8 })
}
</script>

<template>
  <VisNetwork :nodes=nodes :edges=edges :options=options @selectNode="showEvent" />
  <button @click="pop()">pop</button>
  <button @click="push()">push</button>
  <ForceGraph3D :nodes=nodes :links=links @NodeClick="showEvent" />
</template>
