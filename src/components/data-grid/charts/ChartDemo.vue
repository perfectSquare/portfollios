<template><div class="flex flex-col gap-y-2 mt-2">
    <div class="pt-2 pb-4 pl-8 pr-4 softBG flex flex-col gap-y-2 items-center">
        <div><span class='text-lg md:text-2xl'>R</span>esponsive table developed in CSS and Vue JS</div>            
        <div class="w-full grid grid-cols-12 gap-x-2 pt-2 text-sm items-center">
            <div class="col-span-9 lg:col-span-8 xl:col-span-6 flex flex-col lg:flex-row gap-x-2 gap-y-1">
                <div class="grid grid-cols-12 lg:flex gap-x-2 lg:gap-x-1">
                    <div class="col-span-2 sm:col-span-2">Field </div>
                    <input class='col-span-10 sm:col-span-8 ring-1 ring-gray-300 outline-none rounded-md pl-2' type="text" v-model='field'>
                </div>
                <div class="grid grid-cols-12 lg:flex gap-x-2 lg:gap-x-1">
                    <div class="col-span-2 sm:col-span-2">Color </div>
                    <input class='col-span-10 sm:col-span-8 ring-1 ring-gray-300 outline-none rounded-md pl-2' type="text" v-model='colorToAdd'>
                </div>
                <div class="grid grid-cols-12 lg:flex gap-x-2 lg:gap-x-1">
                    <div class="col-span-2 sm:col-span-2">%age </div>
                    <input class='col-span-10 sm:col-span-8 ring-1 ring-gray-300 outline-none rounded-md pl-2' type="number" min=0 max=100 v-model='percentage'>
                </div>                
            </div>
            <div class="w-full col-span-3 lg:col-span-2 flex flex-col lg:flex-row gap-y-2 gap-x-2">
                <div class='w-1/2 cursor-pointer p-0.5 btCloud transition duration-500 text-center text-xs md:text-sm' @click='addField'>add</div>
                <div class='w-1/2 cursor-pointer p-0.5 btCloud transition duration-500 text-center text-xs md:text-sm' @click='removeField'>remove</div>
            </div>
        </div>        

    </div>

        <div class="relative mt-8">
        <Base
            cap='Random Data'
            :names='names'
            :dataColors='dataColors'
            :rates='rates'
            :yMin='yMin'
            :yMax='yMax'
            :added='added'
            @addedDone='added=false'
            :removed='removed'
            @removedDone='removed=false'
        />
        </div>
        <!-- <div class="relative mt-8 mb-8">
            <Pie />
        </div> -->
            
    

</div></template>

<script setup>
import Base from './Base.vue'
import Pie from './Pie.vue'
import { ref } from 'vue'

    // data set
    const names = ref(["abc", "def", "ghi", "jkl", "mno", "pqr", "stu", "vwx",'s'])
    const dataColors = ref(["red", "green", "blue", "#659eb3", "#196666", "black", "yellow", "#22ffaa",'blue'])
    const rates = ref([100, 65, 12.5, 33, 44, 86.2, 17, 35.3,17])
    const yMin = ref(0)
    const yMax = ref(100)
    // data set

    // add
    const field = ref('')    
    const colorToAdd = ref('')
    const percentage = ref(0)
    const added = ref(false)
    const removed = ref(false)

    const addField = () => {
        names.value.push(field.value)
        rates.value.push(percentage.value)
        dataColors.value.push(colorToAdd.value)
        added.value = true
    }
    const removeField = () => {
        names.value.pop()
        rates.value.pop()
        dataColors.value.pop()
        removed.value = true   
    }
    // add
    
</script>

<style scoped>
    .softBG{
        font-family:'Actor';
        background-color: #f2e6ff;
        border-top-right-radius:15px;
        border-bottom-right-radius:15px;
        color: black;
        text-shadow: 0px 0px 0px white, 12px 12px 22px white;
        box-shadow: 22px 22px 22px white inset;        
    }
    .btCloud{
        background-color:#e5e5ff;
        color:black;
        text-shadow: 22px 22px 25px white;
        box-shadow: 12px 12px 15px white inset;
        transition: all 0.3s linear;
    }       
    .btCloud:hover{
        background-color:#ccccff;
    }
</style>
