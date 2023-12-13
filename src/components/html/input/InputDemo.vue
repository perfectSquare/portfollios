<template><div class='mt-2 relative flex flex-col gap-y-2 items-center'>

	<div class="w-[96%] softBG flex flex-col gap-y-[8px] items-center p-4 shad">		
		<!-- <div class="p-2 tet-base md:text-lg self-start">
			using defineProps({		modelValue: String    )} 
			and defineEmits(['update:modelValue']) <br>
			custom v-model is implemented on divs for tabs, not on any input
		</div> -->
		<div class="flex flex-col gap-y-[8px]">		

			<div class="grid grid-cols-12 gap-x-4">
				<div class="col-span-9 grid grid-cols-12 gap-x-1 focus-within:shadow-lg pl-1">
					<label for='modelSet' class="col-span-4 textShade">v-model</label>
					<input v-model='name' type="text" name="modelSet" class="col-span-8 text-black outline-none ring-1 ring-gray-100 rounded pl-2">
				</div>			
				<button class="btCloud text-xs col-span-3" @click='bgModelToGo = bgModel'>Go!</button>
			</div>

			<div class="grid grid-cols-12 gap-x-4">
				<div class="col-span-9 grid grid-cols-12 gap-x-1 focus-within:shadow-lg pl-1">
					<label for='bgSet' class="col-span-4 textShade">background</label>
					<input v-model='bgModel' type="text" name="bgSet" class="col-span-8 text-black outline-none ring-1 ring-gray-100 rounded pl-2">
				</div>			
				<button class="btCloud text-xs col-span-3" @click='bgModelToGo = bgModel'>Go!</button>
			</div>

			<div class="grid grid-cols-12 gap-x-4">
				<div class="col-span-9 grid grid-cols-12 gap-x-1 focus-within:shadow-lg pl-1">
					<label for='colSet' class="col-span-4 textShade">Text Color</label>
					<input v-model='textColorModel' type="text" name="colSet" class="col-span-8 text-black outline-none ring-1 ring-gray-100 rounded pl-2">
				</div>			
				<button class="btCloud text-xs col-span-3" @click='textColorToGo = textColorModel'>Go!</button>
			</div>

			<div class="grid grid-cols-12 gap-x-4">
				<div class="col-span-9 grid grid-cols-12 gap-x-1 focus-within:shadow-lg pl-1">
					<label for='colSet' class="col-span-4 textShade">Border Color</label>
					<input v-model='borderColorModel' type="text" name="colSet" class="col-span-8 text-black outline-none ring-1 ring-gray-100 rounded pl-2">
				</div>			
				<button class="btCloud text-xs col-span-3" @click='borderColorToGo = borderColorModel'>Go!</button>
			</div>				

			
		</div>
	</div>
	
	<div class="ring-2 ring-gray-100 items-center justify-center relative w-[96%] h-full pt-6 pb-6 rounded bg-white flex gap-x-8 mt-4">
		<div class="absolute bg-white shadow-md pl-2 pr-2 rounded -top-[12px] left-12">demo</div>
		<NTextInput
			v-model='name' 
			placeHolder='name'
			:bg='bgModelToGo'
			:borderColor='borderColorToGo'
			:textColor='textColorToGo'
		/>		
		<NTextInputOutline
			v-model='name' 
			placeHolder='name'
			:bg='bgModelToGo'
			:borderColor='borderColorToGo'
			:textColor='textColorToGo'
		/>		
	</div>	
</div></template>

<script setup>
	import NTextInput from '/src/components/html/input/NTextInput.vue'
	import NTextInputOutline from '/src/components/html/input/NTextInputOutline.vue'
	import {ref} from 'vue'

	const name = ref('')

	const bgModel = ref('#f2f2f2')
	const bgModelToGo = ref('#f2f2f2')
	const borderColorModel = ref('#737373')
	const borderColorToGo = ref('#737373')
	const textColorModel = ref('black')
	const textColorToGo = ref('black')

	
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
