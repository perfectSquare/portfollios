<template><div class='mt-2 relative flex flex-col gap-y-2 items-center'>	
	<div class="w-[96%] softBG flex flex-col gap-y-[8px] items-center p-4">

		<div class="flex flex-col gap-y-[8px]">
			<div class="grid grid-cols-12 gap-x-4">
				<div class="col-span-9 grid grid-cols-12 gap-x-1 focus-within:shadow-lg pl-1">
					<label for='labelSet' class="col-span-4">label</label>
					<input v-model='labelModel' type="text" name="labelSet" class="col-span-8 outline-none ring-1 ring-gray-100 rounded pl-2">
				</div>			
				<button class="btCloud col-span-3" @click='setLabel'>Go!</button>
			</div>
			<div class="grid grid-cols-12 gap-x-4">
				<div class="col-span-9 grid grid-cols-12 gap-x-1 focus-within:shadow-lg pl-1">
					<label for='bgSet' class="col-span-4">background</label>
					<input v-model='bgModel' type="text" name="bgSet" class="col-span-8 outline-none ring-1 ring-gray-100 rounded pl-2">
				</div>			
				<button class="btCloud col-span-3" @click='setBG'>Go!</button>
			</div>
			<div class="grid grid-cols-12 gap-x-4">
				<div class="col-span-9 grid grid-cols-12 gap-x-1 focus-within:shadow-lg pl-1">
					<label for='colSet' class="col-span-4">Text Color</label>
					<input v-model='colModel' type="text" name="colSet" class="col-span-8 outline-none ring-1 ring-gray-100 rounded pl-2">
				</div>			
				<button class="btCloud col-span-3" @click='setCol'>Go!</button>
			</div>

			<div class="col-span-10 grid grid-cols-12 gap-x-1 focus-within:shadow-lg pl-1 p-1">
				<label for='colSet' class="col-span-4">Size</label>
				<div class="col-span-8 ring-2 ring-gray-200 rounded pl-2 pr-2 flex gap-x-2 items-center">
					<div class="flex items-center gap-x-[2px] text-xs"><span>sm</span><input type="radio" v-model='sizeModel' @change='setSize' name="sizeSet" value="sm"></div>
					<div class="flex items-center gap-x-[2px] text-xs"><span>md</span><input type="radio" v-model='sizeModel' @change='setSize' name="sizeSet" value="md"></div>
					<div class="flex items-center gap-x-[2px] text-xs"><span>lg</span><input type="radio" v-model='sizeModel' @change='setSize' name="sizeSet" value="lg"></div>
					<div class="flex items-center gap-x-[2px] text-xs"><span>xl</span><input type="radio" v-model='sizeModel' @change='setSize' name="sizeSet" value="xl"></div>
					<div class="flex items-center gap-x-[2px] text-xs"><span>2xl</span><input type="radio" v-model='sizeModel' @change='setSize' name="sizeSet" value="2xl"></div>
					<div class="flex items-center gap-x-[2px] text-xs"><span>3xl</span><input type="radio" v-model='sizeModel' @change='setSize' name="sizeSet" value="3xl"></div>
				</div>
			</div>
		</div>
	</div>
	<div class="ring-2 ring-gray-100 relative w-[96%] h-full pt-6 pb-6 rounded bg-white flex items-center justify-center mt-4">
		<div class="absolute bg-white shadow-md pl-2 pr-2 rounded -top-[12px] left-12">demo</div>
		<NButton 
			:label='labelModelToGo' 
			:bg='bgModelToGo' 
			:textColor='colModelToGo' 
			:size='sizeModelToGo'
		/>
	</div>	
</div></template>

<script setup>
	import NButton from '/src/components/html/buttons/NButton.vue'
	import { ref } from 'vue'

	const bgModel = ref('gray')
	const bgModelToGo = ref('gray')
	const colModel = ref('white')
	const colModelToGo = ref('white')
	const labelModel = ref('save')
	const labelModelToGo = ref('save')
	const sizeModel = ref('lg')
	const sizeModelToGo = ref('lg')

	const setBG = () => {
		bgModelToGo.value = bgModel.value
	}

	const setCol = () => {
		colModelToGo.value = colModel.value
	}

	const setLabel = () => {
		labelModelToGo.value = labelModel.value
	}
	
	const setSize = () => {
		sizeModelToGo.value = sizeModel.value
	}
</script>

<style scoped>
	.softBG{
		font-size: 14px;
        font-family:'Gudea';
        border-right: 5px solid #737373;
        color: black;
        box-shadow: 5px 5px 12px #f7f7f7 inset;        
    }
    .btCloud{
        background-color:#d9d9d9;
        color:black;
        text-shadow: 22px 22px 25px white;
        box-shadow: 12px 12px 15px white inset;
        transition: all 0.1s linear;
    }       
    .btCloud:hover{
        background-color:#cccccc;
    }
</style>
