<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getPublications, onUpdate, onSelectPublications } from '../../api'

const publications = ref([])

async function update() {
    publications.value = await getPublications()
}
onMounted(update)
onUpdate(update)
onSelectPublications(update)
const resolution = [
    '360p',
    '540p',
    '720p',
    '1080p',
    '1440p',
    '2160p',
]
const status = ['仅转发', '正在请求', '计算中']
const last = ['客户端', '192.168.1.166', '192.168.1.122', '192.168.1.147', '192.168.1.205', '192.168.1.152', '192.168.1.222']
const next = ['客户端', '192.168.1.166', '192.168.1.122', '192.168.1.147', '192.168.1.205', '192.168.1.152', '192.168.1.222']
const streams = []
for (let i = 0; i < 10; i++) {
    const r1 = Math.floor(Math.random() * resolution.length)
    const r2 = Math.floor(Math.random() * resolution.length)
    streams.push({
         id: crypto.randomUUID(),
          lr: resolution[r1 < r2 ? r1 : r2],
           hr: resolution[r1 > r2 ? r1 : r2],
            s: status[Math.floor(Math.random() * status.length)],
            last: last[Math.floor(Math.random() * last.length)],
            next: next[Math.floor(Math.random() * next.length)],
         })
}
</script>

<template>
    <table style="text-align: left">
        <tr>
            <th style="height: 20px!important; width: 200px;">流ID</th>
            <th style="height: 20px!important; width: 50px;">原始清晰度</th>
            <th style="height: 20px!important; width: 50px;">终端清晰度</th>
            <th style="height: 20px!important; width: 50px;">流状态</th>
            <th style="height: 20px!important; width: 50px;">上一跳节点</th>
            <th style="height: 20px!important; width: 50px;">下一跳节点</th>
        </tr>
        <tr v-for="p in streams">
            <td style="width: 200px;">{{ p.id }}</td>
            <td style="width: 50px;">{{ p.lr }}</td>
            <td style="width: 50px;">{{ p.hr }}</td>
            <td style="width: 50px;">{{ p.s }}</td>
            <td style="width: 50px;">{{ p.last }}</td>
            <td style="width: 50px;">{{ p.next }}</td>
        </tr>
    </table>
</template>
