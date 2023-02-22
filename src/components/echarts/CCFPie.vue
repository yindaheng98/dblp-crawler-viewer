<script setup lang="ts">
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { PieChart } from "echarts/charts";
import {
    TitleComponent,
    TooltipComponent,
    LegendComponent,
    GridComponent,
    DataZoomComponent,
} from "echarts/components";
import VChart, { THEME_KEY } from "vue-echarts";
import { provide } from 'vue';
import { getNodeConfData, getEdgeConfData } from '../../api'
import {asyncComputed} from '@vueuse/core'

use([
    CanvasRenderer,
    PieChart,
    TitleComponent,
    TooltipComponent,
    LegendComponent,
    GridComponent,
    DataZoomComponent,
]);

provide(THEME_KEY, "dark");

const props = defineProps<{ key: any }>();

const option = asyncComputed(async () => {
    let data = [{ "name": "No data", "value": 1 }]
    if (typeof props.key === 'object') data = await getEdgeConfData(props.key.from, props.key.to)
    else data = await getNodeConfData(props.key)
    return {
        series: [
            {
                type: "pie",
                data: data,
                label: {
                    formatter: '{b}: {c}篇'
                }
            }
        ]
    }
})
</script>

<template>
    <VChart :option="option" />
</template>
