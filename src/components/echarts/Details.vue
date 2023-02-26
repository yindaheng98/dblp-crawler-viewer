<script setup lang="ts">
import { onMounted, ref } from "vue";
import CCFPie from "./CCFPie.vue";
import ConfPie from "./ConfPie.vue";
import Line from "./Line.vue";
import { onSelectNode, getSelectedNode, onSelectEdge, getSelectedEdge, isSelectedNode, onUpdate, selectPublications } from '../../api'

const key = ref(0)
const loaded = ref(false)

onSelectNode(async () => {
    key.value = await getSelectedNode()
})
onSelectEdge(async () => {
    key.value = await getSelectedEdge()
})
async function update() {
    if (await isSelectedNode()) key.value = await getSelectedNode()
    else key.value = await getSelectedEdge()
    loaded.value = true
}
onMounted(update)
onUpdate(update)
</script>

<template>
    <div style="height: 50%; width: 100%">
        <CCFPie :title="'CPU'" :total="100" :unit="'%'" :used="0.61 + Math.random() * 0.1" v-if="loaded" :data="key" @select="(name) => selectPublications(key, { ccf: 'A' })"
            style="height: 100%; width: 25%; float:left" />
        <CCFPie :title="'内存'" :total="64" :unit="'G'" :used="0.41 + Math.random() * 0.1" v-if="loaded" :data="key" @select="(name) => selectPublications(key, { ccf: 'A' })"
            style="height: 100%; width: 25%; float:left" />
        <CCFPie :title="'GPU'" :total="100" :unit="'%'" :used="0.71 + Math.random() * 0.1" v-if="loaded" :data="key" @select="(name) => selectPublications(key, { ccf: 'A' })"
            style="height: 100%; width: 25%; float:left" />
        <CCFPie :title="'显存'" :total="16" :unit="'G'" :used="0.91 + Math.random() * 0.1" v-if="loaded" :data="key" @select="(name) => selectPublications(key, { ccf: 'A' })"
            style="height: 100%; width: 25%; float:left" />
    </div>
    <Line v-if="loaded" :data="key" @select="(year, ccf) => selectPublications(key, { year: year, ccf: ccf })"
        style="height: 50%; width: 100%" />
</template>
