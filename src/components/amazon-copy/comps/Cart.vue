<template><div v-if='showCart' class="fixed top-32 ring-1 ring-gray-300 rounded-lg text-black bg-white shadow-xl z-40 flex flex-col gap-y-2 p-4 overflow-y-scroll scrollStyle cartWH">
	<div class="text-xl indent-3">Cart</div>	
	<div class="grid grid-cols-1 sm:grid-cols-2 gap-2 p-1">
	<template v-for='(ct,i) in carts' :key='i'>
		<div class="grid grid-cols-12 gap-2 p-1 bg-white shadow-xl">
			<img :src="ct.image" class='col-span-4 w-16 h-32 self-center'>
			<div class="flex flex-col gap-y-1 col-span-8 p-2 bg-gray-100">
				<div 
					class='text-center hover:bg-red-100 rounded-lg transition-all duration-100 cursor-pointer'
					@click='cartOut(ct)'
				>cart out</div>
				<div class="text-sm">{{ct.name}}</div>
				<div class="text-sm">$ {{ct.price}}</div>
			</div>
		</div>		
	</template>	
	</div>
	<div class="grid grid-cols-12 gap-2 p-2">
		<div class="col-span-2">total</div>
		<div class="text-xl col-span-10">$ {{getTotalPrice}}</div>		
	</div>
	<div class="text-center p-2 hover:bg-green-100 cursor-pointer transition-all duration-100 w-full rounded-lg">proceed</div>
<br> <br> <br></div></template>

<script setup>
	import  { ref } from 'vue'
	import {useAppStore} from '/src/store/index.js'
	import { storeToRefs } from 'pinia'

	const store = useAppStore() 	
	const props = defineProps({		carts:Array, n:Number, showCart:Boolean		})	
	const emits = defineEmits(['cartOuted'])

	const { getTotalPrice } = storeToRefs(store);

	const cartOut = (x) => {		emits('cartOuted', x)	}
	
</script>

<style scoped>
	.cartWH{
		width:90%;
		height:75%;
		left:5%;
	}
</style>