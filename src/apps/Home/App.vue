<script setup lang="ts">
import { load } from '../../api'
</script>

<template>
  <div style="display: table">
    <div style="height: 100px; display: table-cell; vertical-align: middle;">
      <button style="height: 50px; width: 240px;" :onClick="load">Select a summary file</button>
    </div>
  </div>
</template>
