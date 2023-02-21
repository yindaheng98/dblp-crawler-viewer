<script setup lang="ts">
import Local from './components/visualize/Local.vue'

function showEvent(payload) {
  console.log(payload)
}
</script>

<template>
  <Local :d3=true @selectNode="showEvent" />
</template>
