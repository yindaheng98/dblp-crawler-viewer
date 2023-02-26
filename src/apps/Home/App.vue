<script setup lang="ts">
import { load } from '../../api'
</script>

<template>
  <div style="display: table">
    <div style="height: 200px; display: table-cell; vertical-align: middle;">
      <img style="height: 88px; width: 273px;" src="/logo.png">
      <br>
      <input placeholder="输入API接口地址" style="height: 50px; width: 240px;">
      <br>
      <button style="height: 50px; width: 240px;" :onClick="load">启动</button>
    </div>
  </div>
</template>
