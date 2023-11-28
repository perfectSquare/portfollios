<template><div class="flex gap-2 bg-gray-800 p-4 text-white items-center">
	<Cart :carts='carts' :n='getN' :showCart='showCart' @cartOuted='cartOuted' />
	<img src="/assets/amazon/amazon.png" class="self-center h-10" :class='navClass'>
	<div class='text-4xl'>...</div>
	<div class="absolute right-8 self-center flex w-8 h-8">
		<div 
			class="bgO font-semibold absolute cursor-pointer left-1/2"
			:class='[{"text-sm": n<=9}, {"text-xs": n>9}]'
			@click='showCart = !showCart'
		>{{getN}}</div>
		<img src="/assets/amazon/x.png" class="w-8 h-8 cursor-pointer" @click='showCart = !showCart'>
	</div>
</div></template>

<script setup>
	import { ref, computed, watch, onMounted, toRefs } from 'vue'
	import gql from 'graphql-tag'	
	import Cart from '/src/components/amazon-copy/comps/Cart.vue'
	import {useAppStore} from '/src/store/index.js'
	import { storeToRefs } from 'pinia'

	const store = useAppStore() 	
	const navClass = ref('hover:ring-1 p-2 hover:ring-white cursor-pointer')
	const { carts } = storeToRefs(store);
	const { getN } = storeToRefs(store);

	const showCart = ref(false)

	const cartOuted = (x) => {
		store.offCart(x)
	}

</script>

<style scoped>
	.bgO{ color:orange;  }
</style>

