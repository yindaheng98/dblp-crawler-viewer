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
    <div style="height: 49%; width: 100%">
        <CCFPie v-if="loaded" :data="key" @select="(name) => selectPublications({ ccf: name })"
            style="height: 100%; width: 49%; float:left" />
        <ConfPie v-if="loaded" :data="key" @select="(name) => selectPublications({ journal: name })"
            style="height: 100%; width: 49%; float:right" />
    </div>
    <Line v-if="loaded" :data="key" @select="(year, ccf) => selectPublications({ year: year, ccf: ccf })"
        style="height: 49%; width: 100%" />
</template>
