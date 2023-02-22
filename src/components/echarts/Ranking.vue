<script setup lang="ts">
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { BarChart } from "echarts/charts";
import {
    TitleComponent,
    TooltipComponent,
    LegendComponent,
    GridComponent,
    DataZoomComponent,
} from "echarts/components";
import VChart, { THEME_KEY } from "vue-echarts";
import { onMounted, ref, provide } from 'vue';
import { getRankingData, getRankingData_byAllPublications, onUpdate } from '../../api'

use([
    CanvasRenderer,
    BarChart,
    TitleComponent,
    TooltipComponent,
    LegendComponent,
    GridComponent,
    DataZoomComponent,
]);

provide(THEME_KEY, "dark");

const props = defineProps<{ byAllPublications: boolean }>();

const option = ref({
    title: {
        text: 'Ranking'
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    grid: {
        left: '20%',
    },
    xAxis: { type: 'value' },
    yAxis: {
        type: 'category',
        data: ['No data']
    },
    dataZoom: [
        {
            type: 'inside',
            yAxisIndex: 0,
            filterMode: 'none'
        }
    ],
    series: [
        {
            type: 'bar',
            data: [{ value: 0, itemStyle: { color: "red" } }]
        },
    ]
})

async function update() {
    let data = { id: [0], label: ['No data'], data: [{ value: 1, itemStyle: { color: "red" } }] }
    if (props.byAllPublications)
        data = await getRankingData_byAllPublications()
    else data = await getRankingData()
    option.value.yAxis.data = data.label
    option.value.series[0].data = data.data
}
onMounted(update)
onUpdate(update)
</script>

<template>
    <VChart :option="option" />
</template>
