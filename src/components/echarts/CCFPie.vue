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
import { getNodeCCFData, getEdgeCCFData } from '../../api'
import { asyncComputed } from '@vueuse/core'

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

const props = defineProps<{ data: any, total: number, unit: string, title: string, used: number }>();
const emit = defineEmits(['select'])

const option = asyncComputed(async () => {
    let data = [{ "name": "No data", "value": 1 }]
    if (typeof props.data === 'object') data = await getEdgeCCFData(props.data.from, props.data.to)
    else data = await getNodeCCFData(props.data)
    console.log(data)
    const used = props.used
    return {
        title: {
            show: true,
            text: props.title,
            left: 'center',
            top: "center"
        },
        series: [
            {
                type: "pie",
                radius: ['40%', '55%'],
                data: [{ name: "已用", value: used * props.total }, { name: "剩余", value: (1 - used) * props.total }],
                label: {
                    formatter: function (data) {
                        console.log(data)
                        let a = data.name
                        let b = data.value.toFixed(2) + props.unit
                        let c = a + ':' + b
                        return c
                    },
                    position: 'inside'
                }
            }
        ]
    }
})
</script>

<template>
    <VChart :option="option" @click="(e) => emit('select', e.name)" autoresize />
</template>
