<script setup lang="ts">
import Electron from './components/visualize/Electron.vue'

function showEvent(...payload) {
  console.log(payload)
}
</script>

<template>
  <Electron :d3=true @selectNode="showEvent" @selectEdge="showEvent" />
</template>
