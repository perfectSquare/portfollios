<template><div class="relative flex flex-col gap-y-2 mt-2">
    <div class="pt-2 pb-2 pl-4 pr-4 softBG drop-shadow-md bg-white flex flex-col gap-y-1 items-center">
        <div class="text-xs">Enter api endpoint, JSON and AXIOS based with structure <span class='text-lg'>[{}, {}, {}, ...]</span> for example https://jsonplaceholder.typicode.com/todos</div>
        <div class="grid grid-cols-12 gap-x-4">
            <div class="col-span-10 grid grid-cols-12">
                <div class="col-span-2">Rows </div>
                <input class='col-span-10 ring-1 ring-gray-300 outline-none rounded-md pl-2' min='1'  type="number" v-model='rowsInput'>
            </div>            
            <div class='col-span-2 cursor-pointer pl-4 pr-4 pt-0.5 pb-0.5 btCloud transition duration-500 text-center text-xs md:text-sm' @click='rowsSet'>GO!</div>
        </div>
        <div class="grid grid-cols-12 gap-x-4">
            <div class="col-span-10 grid grid-cols-12">
                <div class="col-span-2">Pages </div>
                <input class='col-span-10 ring-1 ring-gray-300 outline-none rounded-md pl-2' min='1'  type="number" v-model='pageButtons'>
            </div>            
            <div class='col-span-2 cursor-pointer pl-4 pr-4 pt-0.5 pb-0.5 btCloud transition duration-500 text-center text-xs md:text-sm opacity-0' @click='rowsSet'>GO!</div>
        </div>
        <div class="grid grid-cols-12 gap-x-4">
            <div class="col-span-10 grid grid-cols-12">
                <div class="col-span-2">Url </div>
                <input class='col-span-10 ring-1 ring-gray-300 outline-none rounded-md pl-2' type="text" v-model='url'>
            </div>
            <div class='col-span-2 cursor-pointer pl-4 pr-4 pt-0.5 pb-0.5 btCloud transition duration-500 text-center text-xs md:text-sm' @click='urlSet'>GO!</div>
        </div>
    </div>

    <DataGrid 
        :dataEnd='dataEnd' 
        :missFields='missFields' 
        :rows='rows'
        :pageButtons='pageButtons'
        :headings="headings"
    />

</div></template>

<script setup>
import DataGrid from './grids/DataGrid.vue'
import DataGridTest from './grids/DataGridTest.vue'
import { ref } from 'vue'
    const dataEnd = ref('https://sore-pleat-hen.cyclic.app/laptops')
    const url = ref('')
    const missFields = ref(['description'])
    const rows = ref(3)
    const rowsInput = ref(1)
    const pageButtonsInput = ref(1)
    const pageButtons = ref(3)
    const customFields = ref(['a', 'b', 'c', 'd', 'e'])
    const headings = ref(['id', 'name', 'price', 'stars', 'stock', 'description', 'image', 'best', 'manufacturer'])

    const urlSet = () => {
        if(url.value == '') return
        dataEnd.value = url.value
    }
    const rowsSet = () => {
        if(rowsInput.value == '') return
        rows.value = rowsInput.value
    }
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