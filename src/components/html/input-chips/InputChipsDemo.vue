<template><div class='relative'>
	<div class="w-[96%] softBG flex flex-col gap-y-[8px] items-center p-4">
		<div class="flex flex-col gap-y-[8px]">
			<div class="grid grid-cols-12 gap-x-4">
				<div class="col-span-9 grid grid-cols-12 gap-x-1 focus-within:shadow-lg pl-1">
					<label for='widthSet' class="col-span-4">width %</label>
					<input v-model='widthModel' type="number" name="widthSet" class="col-span-8 outline-none ring-1 ring-gray-100 rounded pl-2">
				</div>			
				<button class="btCloud text-xs col-span-3" @click='widthModelToGo=widthModel'>Go!</button>
			</div>						
		</div>
	</div>
	<div class="ring-2 ring-gray-100 relative w-[96%] pt-6 pb-6 rounded bg-white flex items-center justify-center mt-4">
		<div class="absolute bg-white shadow-md pl-2 pr-2 rounded -top-[12px] left-12">demo</div>
		<NInputChips
			:widthPercent='widthModelToGo'
		/>
	</div>	

</div></template>

<script setup>
	import NInputChips from '/src/components/html/input-chips/NInputChips.vue'
	import { ref } from 'vue'

	const widthModel = ref(40)
	const widthModelToGo = ref(40)
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

