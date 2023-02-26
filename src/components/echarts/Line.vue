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
    const end_date = new Date()
    const dates = []
    const datas0 = []
    let i = 0
    while (i < 24 * 60 * 0.2) { datas0.push(0); i++ }
    while (i < 24 * 60 * 0.25) { datas0.push(0.8 + 0.2 * (Math.random() - 0.5)); i++ }
    while (i < 24 * 60 * 0.45) { datas0.push(0); i++ }
    while (i < 24 * 60 * 0.65) { datas0.push(1 - 0.2 * (Math.random() - 0.5)); i++ }
    while (i < 24 * 60 * 0.70) { datas0.push(0); i++ }
    while (i < 24 * 60 * 0.8) { datas0.push(0.5); i++ }
    while (i < 24 * 60 * 0.9) { datas0.push(0.7); i++ }
    while (i < 24 * 60 * 0.95) { datas0.push(0.4); i++ }
    while (i <= 24 * 60) { datas0.push(0.61); i++ }
    const datas1 = []
    const datas2 = []
    const datas3 = []
    const datas4 = []
    const m = (n) => {
        if (n<0)return 0
        if (n>1)return 1
        return n
    }
    for (let i = 0; i <= 24 * 60; i++) {
        dates.push(end_date.getTime() - i * 1000 * 60)
        datas1.push(m(datas0[i] + 0.05 * (Math.random() - 0.5)) * 0.61 * Math.random())
        datas2.push(m(datas0[i] + 0.01 * (Math.random() - 0.5)) * 0.41 * Math.random())
        datas3.push(m(datas0[i] + 0.05 * (Math.random() - 0.5)) * 0.71 * Math.random())
        datas4.push(m(datas0[i] + 0.01 * (Math.random() - 0.5)))
    }
    return {
        title: {
            show: true,
            text: "占用率变化趋势",
            x: 'center'
        },
        legend: {
            orient: 'vertical',
            right: 10,
            top: 'center',
        },
        xAxis: {
            name: '时间',
            type: 'category',
            axisTick: {
                alignWithLabel: true
            },
            axisLabel: {
                formatter: (function (value) {
                    return new Date(parseInt(value)).toUTCString();
                })
            },
            data: dates,
        },
        yAxis: {
            name: '占用率'
        },
        series: [
            {
                name: "CPU",
                id: "A",
                data: datas1,
                type: 'line',
            },
            {
                name: "内存",
                id: "B",
                data: datas2,
                type: 'line',
            },
            {
                name: "GPU",
                id: "C",
                data: datas3,
                type: 'line',
            },
            {
                name: "显存",
                id: "N",
                data: datas4,
                type: 'line',
            }
        ]
    }
})
</script>

<template>
    <VChart :option="option" @click="(e) => emit('select', e.name, e.seriesId)" autoresize />
</template>
