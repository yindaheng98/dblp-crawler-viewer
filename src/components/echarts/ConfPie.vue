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

const props = defineProps<{ data: any }>();

const option = asyncComputed(async () => {
    let data = [{ "name": "No data", "value": 1 }]
    if (typeof props.data === 'object') data = await getEdgeConfData(props.data.from, props.data.to)
    else data = await getNodeConfData(props.data)
    console.log(data)
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
    <VChart :option="option" autoresize />
</template>
