<script setup lang="ts">
import Neo4J from './components/visualize/Neo4J.vue'

function showEvent(payload) {
  console.log(payload)
}
</script>

<template>
  <Neo4J :d3=true @selectNode="showEvent" />
</template>
