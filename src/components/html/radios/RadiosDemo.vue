<template><div class='relative'>
	<div class="w-[96%] softBG flex flex-col gap-y-[8px] items-center p-4">
		<div class="flex flex-col gap-y-1">
			<div><span class='font-bold'>radios</span> Array: <span class="text-xs">{{radios}}</span></div>
			<ul class="list-disc list-inside">
				<li>Single component showing radio buttons for above array is used, not one custom radio-component is repeated like <br>
					<div class="line-through ml-12">
						&lt;RadioCustom ... /> <br>
						&lt;RadioCustom ... /> <br>
						&lt;RadioCustom ... />						
					</div>
					<div class="ml-12">
						but &lt;NRadios :radios='radios' name='radiosGroup' v-model='model' :direction='directionModel' />	is used
					</div>					
				</li>
				<li>				 
					value from objects in array is used as <span class='px-4 bg-gray-100 rounded'>v-model</span>, its label can also be used
				</li>
				<li>
					its done property is used to apply box shadow for selected radio
				</li>		
			</ul>
		</div>		
		<div class="flex gap-x-4">
			<div>Direction</div>			
			<NRadios :radios='directions' name='directionsGroup' v-model='directionModel' direction='row' />	
		</div>
	</div>
	<div class="ring-2 ring-gray-100 relative w-[96%] pt-6 pb-6 rounded bg-white flex items-center justify-center mt-4">
		<div class="absolute bg-white shadow-md pl-2 pr-2 rounded -top-[12px] left-12">demo</div>
			<NRadios :radios='radios' name='radiosGroup' v-model='model' :direction='directionModel' />	
	</div>	
	<div class="mt-4">
		<span class='px-4 bg-gray-100 rounded'>v-model: {{model}} </span>
	</div>	
</div></template>

<script setup>
	import NRadios from '/src/components/html/radios/NRadios.vue'
	import { ref } from 'vue'

	const model = ref('html')
	const directionModel = ref('row')

	// const radios = ref(['HTML', 'CSS', 'Javascript', 'Vue JS'])
	const radios = ref([
		{
			label: 'HTML',
			value: 'html',
			done: false
		},
		{
			label: 'CSS',
			value: 'css',
			done: false
		},
		{
			label: 'Tailwind',
			value: 'tailwind',
			done: false
		},
		{
			label: 'Javascript',
			value: 'javascript',
			done: false
		},
		{
			label: 'Vue JS',
			value: 'vue',
			done: false
		},
	])
	const directions = ref([
		{
			label: 'Column',
			value: 'column',
			done: false
		},
		{
			label: 'Row',
			value: 'row',
			done: false
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
</style>

