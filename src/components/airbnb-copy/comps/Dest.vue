<template>
    <div class='p-2 flex flex-col gap-y-1 leading-5 w-full rounded-xl hover:shadow-md cursor-pointer from' @click='toDatails'>
        <Caro :items='items' />
        <div class='flex justify-between'>
            <div><b>{{nick}}</b></div>
            <div v-if='stars == 0'>&starf;&nbsp;New</div>
            <div v-else>&starf;&nbsp;{{stars}}</div>
        </div>
        <div class="text-gray-500">{{distance}}</div>
        <div class="text-gray-500">{{mon}}&nbsp;{{checkInDay}}-{{checkOutDay}}</div>
        <div><b>${{rent}}</b>&nbsp;night</div>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import Caro from '/src/components/airbnb-copy/comps/inner/Caro.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps({
    id: Number,
    cat: String,
    nick: String,
    stars: Number,
    rent: Number,
    items: Array,
    checkIn: String,
    checkOut: String,
    distance: String
})

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const mon = months[new Date(props.checkIn).getMonth()]
const checkInDay = new Date(props.checkIn).getDate()
const checkOutDay = new Date(props.checkOut).getDate()

const toDatails = (e) => {
    if (!e.target.classList.contains('notHere')) {
        router.push({ name: "details", query: { id: props.id, cat: props.cat } })
        // router.push({"name": "details", params: { a:334 } })						
        // window.open(router.resolve({ name: "details", query: { id: props.id, cat: props.cat } }).href, '_blank')
    }
}
</script>
<style scoped></style>