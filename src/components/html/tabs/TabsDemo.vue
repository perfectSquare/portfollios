<template><div class='mt-2 relative flex flex-col gap-y-2 items-center'>

	<div class="w-[96%] softBG flex flex-col gap-y-[8px] items-center p-4">		
		<div class="p-2 tet-base md:text-lg self-start">
			using defineProps({		modelValue: String    )} 
			and defineEmits(['update:modelValue']) <br>
			custom v-model is implemented on divs for tabs, not on any input
		</div>

		<div class="flex flex-col gap-y-[8px]">

			<div class="flex gap-x-[10px] focus-within:shadow-lg pl-2 self-start">
				<label for='colSet' class="textShade">v-model of tab divs is changed if some source changes tabs state</label>
				<div class="">
				<select v-model='selected' @change='tabSelected=selected' class='text-black outline-none ring-1 ring-gray-100 rounded pl-2 pr-4'>
					<option disabled> ----- </option>
					<option>html</option>
					<option>css</option>
					<option>javascript</option>
					<option>vue js</option>
					<option>cypress</option>
				</select>
				</div>
			</div>

			<div class="grid grid-cols-12 gap-x-4">
				<div class="col-span-9 grid grid-cols-12 gap-x-1 focus-within:shadow-lg pl-1">
					<label for='bgSet' class="col-span-4 textShade">background</label>
					<input v-model='bgModel' type="text" name="bgSet" class="col-span-8 text-black outline-none ring-1 ring-gray-100 rounded pl-2">
				</div>			
				<button class="btCloud col-span-3" @click='bgModelToGo = bgModel'>Go!</button>
			</div>

			<div class="grid grid-cols-12 gap-x-4">
				<div class="col-span-9 grid grid-cols-12 gap-x-1 focus-within:shadow-lg pl-1">
					<label for='colSet' class="col-span-4 textShade">Text Color</label>
					<input v-model='colModel' type="text" name="colSet" class="col-span-8 text-black outline-none ring-1 ring-gray-100 rounded pl-2">
				</div>			
				<button class="btCloud col-span-3" @click='colModelToGo = colModel'>Go!</button>
			</div>

			<div class="grid grid-cols-12 gap-x-4">
				<div class="col-span-9 grid grid-cols-12 gap-x-1 focus-within:shadow-lg pl-1">
					<label for='colSet' class="col-span-4 textShade">Border Color</label>
					<input v-model='borderColorModel' type="text" name="colSet" class="col-span-8 text-black outline-none ring-1 ring-gray-100 rounded pl-2">
				</div>			
				<button class="btCloud col-span-3" @click='borderColorToGo = borderColorModel'>Go!</button>
			</div>		

			<div class="grid grid-cols-12 focus-within:shadow-lg p-1">
				<label for='colSet' class="col-span-4 textShade">Size</label>
				<div class="col-span-8 ring-1 ring-gray-200 rounded pl-2 pr-2 flex gap-x-2 items-center">
					<div class="flex items-center gap-x-[2px] text-xs"><span>sm</span><input type="radio" v-model='sizeModel' @change='sizeModelToGo = sizeModel' name="sizeSet" value="sm"></div>
					<div class="flex items-center gap-x-[2px] text-xs"><span>md</span><input type="radio" v-model='sizeModel' @change='sizeModelToGo = sizeModel' name="sizeSet" value="md"></div>
					<div class="flex items-center gap-x-[2px] text-xs"><span>lg</span><input type="radio" v-model='sizeModel' @change='sizeModelToGo = sizeModel' name="sizeSet" value="lg"></div>
					<div class="flex items-center gap-x-[2px] text-xs"><span>xl</span><input type="radio" v-model='sizeModel' @change='sizeModelToGo = sizeModel' name="sizeSet" value="xl"></div>
					<div class="flex items-center gap-x-[2px] text-xs"><span>2xl</span><input type="radio" v-model='sizeModel' @change='sizeModelToGo = sizeModel' name="sizeSet" value="2xl"></div>
					<div class="flex items-center gap-x-[2px] text-xs"><span>3xl</span><input type="radio" v-model='sizeModel' @change='sizeModelToGo = sizeModel' name="sizeSet" value="3xl"></div>
				</div>
			</div>

			<div class="grid grid-cols-12 focus-within:shadow-lg p-1">
				<label for='modeSet' class="col-span-4 textShade">Mode</label>
				<div class="col-span-8 ring-1 ring-gray-200 rounded pl-2 pr-2 flex gap-x-2 items-center">
					<div class="flex items-center gap-x-[2px] text-xs"><span>up</span><input type="radio" v-model='modeModel' @change='modeModelToGo = modeModel' name="modeSet" value="up"></div>
					<div class="flex items-center gap-x-[2px] text-xs"><span>opacity</span><input type="radio" v-model='modeModel' @change='modeModelToGo = modeModel' name="modeSet" value="opacity"></div>
					<div class="flex items-center gap-x-[2px] text-xs"><span>door</span><input type="radio" v-model='modeModel' @change='modeModelToGo = modeModel' name="modeSet" value="door"></div>
					<div class="flex items-center gap-x-[2px] text-xs"><span>straight</span><input type="radio" v-model='modeModel' @change='modeModelToGo = modeModel' name="modeSet" value="straight"></div>
					<div class="flex items-center gap-x-[2px] text-xs"><span>flow</span><input type="radio" v-model='modeModel' @change='modeModelToGo = modeModel' name="modeSet" value="flow"></div>
				</div>
			</div>				
			<div class="grid grid-cols-12 gap-x-4">
				<div class="col-span-9 grid grid-cols-12 gap-x-1 focus-within:shadow-lg pl-1">
					<label for='contentSet' class="col-span-4 textShade">Content</label>
					<input v-model='contentModel' type="checkbox" name="contentSet" class="col-span-8 text-black">
				</div>			
			</div>
		</div>
	</div>
	
	<div :class='{"items-center justify-center": !contentModel}' class="ring-2 ring-gray-100 relative w-[96%] h-full pt-6 pb-6 rounded bg-white flex flex-col gap-y-2 mt-4">
		<div class="absolute bg-white shadow-md pl-2 pr-2 rounded -top-[12px] left-12">demo</div>
		<NTabs 
			v-model='tabSelected' 
			:tabs='tabs' 
			:brothers="true" 
			:bg='bgModelToGo' 
			:borderColor='borderColorToGo' 
			:textColor='colModelToGo'
			:size='sizeModelToGo'
			:mode='modeModelToGo'
		/>
		<div v-if='contentModel'>
		<Transition mode='out-in'>
			<div :class='contentClass' v-if='tabSelected == "html"' class=''>HTML is hypertext markup language</div>
			<div :class='contentClass' v-else-if='tabSelected == "css"' class=''>CSS means cascading style sheet</div>
			<div :class='contentClass' v-else-if='tabSelected == "javascript"' class=''>Javascript is web programming language</div>
			<div :class='contentClass' v-else-if='tabSelected == "vue js"' class=''>Vue Js is javascript framework</div>
			<div :class='contentClass' v-else-if='tabSelected == "cypress"' class=''>Cypress is used to test web applications</div>
		</Transition>
		</div>
	</div>	
</div></template>

<script setup>
	import NTabs from '/src/components/html/tabs/NTabs.vue'
	import {ref} from 'vue'

	const tabSelected = ref('html')
	const selected = ref('html')

	const bgModel = ref('#f2f2f2')
	const bgModelToGo = ref('#f2f2f2')
	const colModel = ref('black')
	const colModelToGo = ref('black')
	const borderColorModel = ref('red')
	const borderColorToGo = ref('red')
	const sizeModel = ref('lg')
	const sizeModelToGo = ref('lg')
	const modeModel = ref('up')
	const modeModelToGo = ref('up')
	const contentModel = ref(false)
	const contentClass = ref('relative origin-top-left pt-1 pb-2 pl-2 pr-2 bg-white shadow-md')

	const tabs = ref([
		{
			label: 'html',
			selected: true			
		},
		{
			label: 'css',
			selected: false		
		},
		{
			label: 'javascript',
			selected: false
		},
		{
			label: 'vue js',
			selected: false
		},
		{
			label: 'cypress',
			selected: false
		}
	])


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
    .v-enter-from, .v-leave-to{ opacity:0; transform:scale(0.95,0.95);  }
    .v-enter-active, .v-leave-active{ transition: all 0.2s linear; }
</style>
