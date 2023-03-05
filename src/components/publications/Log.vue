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
let logs = []
logs.push("[2022-06-17 15:42:18.090] INFO default: [config.go:51] [config.LoadFromFile] config aliyun/conf/islb.toml load ok!")
logs.push("config aliyun/conf/islb.toml load ok!")
logs.push("[2022-06-17 15:42:18.173] INFO nats-discovery.client: [client.go:59] [client.(*Client).Get] bet: subj=node.publish.*")
logs.push("[2022-06-17 15:42:18.203] INF0 nats-discovery.client: [client.go:73] [client.(*Client).Get] nodes [{dc1 rtc beijing {nats-grpc nats://8.131.50.230:4222 map[]} map[]} {dc1 rtc qindao {nats-grpc nats://8.131.50.230:4222 map[]} map[]} {dc1 rtc nanjing {nats-grpc nats://8.131.50,230:4222 map[] map[]} {dc1 test sxu-deeec nats-grpc nats://8.131.50.230:4222 map[]} map[]} isLb s-F225 mts-grpc nats:/8.131-50.238:422 map[] map[]  sgb isgLb-xY ats-gpc nts://8.131-58.230:42 map} map[]} dcl rtc stupid inats-gnats://8.131.50.230:4222 map[]} map[]}]")
logs.push("[2022-06-17 15:42:18.204] INF0 default: [node.go:153] [islb.(*Node).handleNeighborNodes] Service up: rtc node id => [beijing], rpc => nats-grpc")
logs.push("[2022-06-17 15:42:18.204] INFO default: [node.go:153] [islb.(*Node).handleNeighborNodes] Service up: rtc node id => [qingdao], rpc => nats-grpc")
</script>

<template>
    <div style="overflow: scroll;">
    <p v-for="log in logs">{{ log }}</p>
    <p v-for="log in logs">{{ log }}</p>
    <p v-for="log in logs">{{ log }}</p>
    <p v-for="log in logs">{{ log }}</p>
    </div>
</template>

<style scoped>
p {
    text-align: left;
    height: auto;
    word-wrap:break-word;
    font-family: cursive;
}
</style>