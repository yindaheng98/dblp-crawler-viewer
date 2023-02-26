<script setup lang="ts">
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { LineChart } from "echarts/charts";
import {
    TitleComponent,
    TooltipComponent,
    LegendComponent,
    GridComponent,
    DataZoomComponent,
} from "echarts/components";
import VChart, { THEME_KEY } from "vue-echarts";
import { provide } from 'vue';
import { getNodeLineData, getEdgeLineData } from '../../api'
import { asyncComputed } from '@vueuse/core'

use([
    CanvasRenderer,
    LineChart,
    TitleComponent,
    TooltipComponent,
    LegendComponent,
    GridComponent,
    DataZoomComponent,
]);

provide(THEME_KEY, "dark");

const props = defineProps<{ data: any }>();
const emit = defineEmits(['select'])

const option = asyncComputed(async () => {
    let data = [{ "name": "No data", "value": 1 }]
    if (typeof props.data === 'object') data = await getEdgeLineData(props.data.from, props.data.to)
    else data = await getNodeLineData(props.data)
    console.log(data)
    return {
        legend: {
            orient: 'vertical',
            right: 10,
            top: 'center',
        },
        xAxis: {
            name: '年份',
            type: 'category',
            axisTick: {
                alignWithLabel: true
            },
            data: data.years,
        },
        yAxis: {
            name: '论文数'
        },
        series: [
            {
                name: "CCF A",
                id: "A",
                data: data.A,
                type: 'line',
            },
            {
                name: "CCF B",
                id: "B",
                data: data.B,
                type: 'line',
            },
            {
                name: "CCF C",
                id: "C",
                data: data.C,
                type: 'line',
            },
            {
                name: "CCF N",
                id: "N",
                data: data.N,
                type: 'line',
            }
        ]
    }
})
</script>

<template>
    <VChart :option="option" @click="(e) => emit('select', e.name, e.seriesId)" autoresize />
</template>
