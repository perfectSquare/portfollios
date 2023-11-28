<template><div :class="mainClass">

	<div :class='cartText'>
		<div class="col-span-11">Cart</div>
		<div @click='$emit("hideCart")' class="col-span-1 cursor-pointer self-center right-1 hover:scale-125 transition-all duration-100">&#9874;</div>
	</div>	

	<div class="p-1 flex flex-col gap-2 relative">	<!-- item -->		
	<template v-for='(product,i) in products' :key='i'>
		<div :class="productClass">
			<div @click='$emit("productRemoved", product)' class='absolute self-center right-1 hover:scale-125 transition-all duration-100 cursor-pointer'>&#9874;</div>
			<img :src="product.image" class="w-12">
			<div>{{product.name}}</div>
			<div>$ {{product.price}}</div>
		</div>
	</template>
	</div> <!-- item -->

	<div class="p-1 flex flex-col gap-2">
		<div>Items: {{booksCount}}</div>
		<div>Total: $ {{total}}</div>
		<div :class="fiveClass">5% Total: $ {{totalFive}}</div>
		<button :class="proceedClass">proceed</button>
	</div>
	

</div></template>

<script setup>
	import { ref, computed, inject } from 'vue'

	const theme = inject('theme')
		
	const props = defineProps({		products:Array	})
	const emits = defineEmits(['productRemoved', 'hideCart', 'five', 'fiveNot'])

	const mainClass = computed(() => {
		if(theme.value == 'sun') return 'p-2 bg-white text-black h-full'
		else if(theme.value == 'moon') return 'p-2 bg-gray-700 text-white h-full'
	})

	const cartText = computed(() => {
		if(theme.value == 'sun') return 'p-2 border-b-2 border-gray-200 text-center text-xl grid grid-cols-12'
		else if(theme.value == 'moon') return 'p-2 border-b-2 border-gray-200 text-center text-xl grid grid-cols-12'
	})

	const productClass = computed(() => {
		if(theme.value == 'sun') return 'p-1 flex flex-col gap-2 bg-l5 text-black border-r-2 border-r-gray-400 relative'
		else if(theme.value == 'moon') return 'p-1 flex flex-col gap-2 bg-d4 text-white border-r-2 border-r-gray-200 relative'
	})

	const fiveClass = computed(() => {
		if(theme.value == 'sun') return 'bg-blue-50 text-black p-2 border-b-2 border-gray-400'
		else if(theme.value == 'moon') return 'bg-s9 text-white p-2 border-b-2 border-gray-400'
	})

	const proceedClass = computed(() => {
		if(theme.value == 'sun') return 'p-1 rounded-md bg-gray-700 text-white hover:bg-gray-800 transition-all duration-200'
		else if(theme.value == 'moon') return 'p-1 rounded-md bg-l1 text-black hover:bg-l2 transition-all duration-200'
	})

	
	
	const booksCount = computed(() => {		return props.products.length	})

	const total = computed(() => {
		let totalP = 0
		for(let x of props.products){
			totalP += x.price
		}
		return totalP
	})

	const totalFive = computed(() => {
		let totalP = 0
		for(let x of props.products){
			totalP += x.price
		}	
		emits('fiveNot')	
		if(totalP > 200){
			emits('five')
			totalP = totalP - totalP*0.05
			return totalP
		}
		return totalP
	})


</script>


<style scoped></style>