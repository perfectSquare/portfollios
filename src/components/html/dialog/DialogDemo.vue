<template><div class='mt-2 relative flex flex-col gap-y-2 items-center'>	
	<div class="w-[96%] softBG flex flex-col gap-y-[8px] items-center p-4">

		<div class="flex gap-x-4">
			<NButton 
				label='Dialog A' 
				size='lg'
				bg='gray'
				textColor='white'		
				@click='dialogAShow = !dialogAShow'
			/>
			<NButton 
				label='Dialog B' 
				size='lg'
				bg='gray'
				textColor='white'		
				@click='dialogBShow = !dialogBShow'
			/>		
		</div>
		
	</div>
	<NDialog 
		v-if='dialogAShow' 
		@dialogOff='dialogAShow = false' 
		animationType='A'
	/>
	<NDialog 
		v-if='dialogBShow' 
		@dialogOff='dialogBShow=false' 
		animationType='B'
	/>	
	
</div></template>

<script setup>
	import { ref } from 'vue'
	import NDialog from './NDialog.vue'
	import NButton from '/src/components/html/buttons/NButton.vue'

	const dialogAShow = ref(false)
	const dialogBShow = ref(false)
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

