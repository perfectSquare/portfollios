<template><div class="relative p-1">

	<div :class="[mdNavS, mdNavD]"> <!-- md navb5 -->
		<div @click='leftMenu = !leftMenu' class='text-xl inline md:hidden relative cursor-pointer hover:scale-125 transition-all duration-300'>&#9776;</div>
		<div class="p-1 flex gap-2 relative bottom-0.5">
			<div class="text-2xl">Company</div>
			<img :src="logo" class="w-8">
		</div>


		<div class='ml-6 z-50 md:flex md:p-2 md:items-center md:gap-x-8 relative md:w-full hidden'>
		<div class="p-1 ft" 
			@mouseenter='(e) => {one=true; two=three=false; e.target.children[0].children[0].classList.add("borderAnimation")}'
			@mouseleave='(e) => {one=false; e.target.children[0].children[0].classList.remove("borderAnimation")}'
		>				
			<div class="relative cursor-pointer">computer
				<div class="absolute"></div>
			</div>
			<Transition>
			<div v-if='one' :class="menuDivClass" @mouseleave='one=two=three=false'>
				<div class="flex flex-col gap-y-2">
					<div :class="contentClass" @click='accessoriesShow=true; demo=storageShow=laptopsShow=monitorsShow=false'>accessories</div>
					<div :class="contentClass" @click='storageShow=true; demo=accessoriesShow=laptopsShow=monitorsShow=false'>storage</div>
					<div :class="contentClass" @click='laptopsShow=true; demo=storageShow=accessoriesShow=monitorsShow=false'>laptops</div>
					<div :class="contentClass" @click='monitorsShow=true; demo=storageShow=laptopsShow=accessoriesShow=false'>monitors</div>
				</div>
			</div>
			</Transition>
		</div>

		<div class="p-1 ft" 
			@mouseenter='(e) => {two=true; one=three=false; e.target.children[0].children[0].classList.add("borderAnimation")}'
			@mouseleave='(e) => {two=false; e.target.children[0].children[0].classList.remove("borderAnimation")}'
		>
			<div class="relative cursor-pointer">Electronics
				<div class="absolute"></div>
			</div>
			<Transition>
			<div v-if='two' :class="menuDivClass" @mouseleave='one=two=three=false'>
				<div class="flex flex-col gap-y-2">
					<div :class="contentClass" class="text-gray-800 border-b-2 border-gray-100 p-2 text-center text-sm">general</div>
					<div :class="contentClass">accessories</div>
					<div :class="contentClass">camera & photo</div>
					<div :class="contentClass">vehicle electronics</div>
					<div :class="contentClass">cell phone</div>
					<div :class="contentClass">GPS & Navigation</div>
				</div>
				<div class="flex flex-col gap-y-2">
					<div :class="contentClass" class="text-gray-800 border-b-2 border-gray-100 p-2 text-center text-sm">specific</div>
					<div :class="contentClass">office</div>
					<div :class="contentClass">portable audio</div>
					<div :class="contentClass">security</div>
					<div :class="contentClass">service plans</div>
					<div :class="contentClass">video games</div>
				</div>
				<div class="flex flex-col gap-y-2">
					<div :class="contentClass" class="text-gray-800 border-b-2 border-gray-100 p-2 text-center text-sm">others</div>
					<div :class="contentClass">room</div>
					<div :class="contentClass">school</div>
					<div :class="contentClass">bank</div>
					<div :class="contentClass">service plans</div>
					<div :class="contentClass">video games</div>
				</div>
				
			</div>
			</Transition>
		</div>		

		<div class="p-1 ft" 
			@mouseenter='(e) => {three=true; one=two=false; e.target.children[0].children[0].classList.add("borderAnimation")}'
			@mouseleave='(e) => {three=false; e.target.children[0].children[0].classList.remove("borderAnimation")}'
		>
			<div class="relative cursor-pointer">Smart Home
				<div class="absolute"></div>
			</div>
			<Transition>
			<div v-if='three' :class="menuDivClass" @mouseleave='one=two=three=false'>
				<div class="flex flex-col gap-y-2">
					<div :class="contentClass" class="text-gray-800 border-b-2 border-gray-100 p-2 text-center text-sm">general</div>
					<div :class="contentClass">lightening</div>
					<div :class="contentClass">locks and entry</div>
					<div :class="contentClass">security camera</div>
					<div :class="contentClass">plug and outlets</div>
					<div :class="contentClass">new smart devices</div>
					<div :class="contentClass">old smart devices</div>
				</div>
				<div class="flex flex-col gap-y-2">
					<div :class="contentClass" class="text-gray-800 border-b-2 border-gray-100 p-2 text-center text-sm">specific</div>
					<div :class="contentClass">heating</div>
					<div :class="contentClass">cooling</div>
					<div :class="contentClass">detectors</div>
					<div :class="contentClass">sensors</div>
					<div :class="contentClass">entertainment</div>					
				</div>
				<div class="flex flex-col gap-y-2">
					<div :class="contentClass" class="text-gray-800 border-b-2 border-gray-100 p-2 text-center text-sm">other</div>
					<div :class="contentClass">pet</div>
					<div :class="contentClass">voice</div>
					<div :class="contentClass">hubs</div>
					<div :class="contentClass">kitchen</div>
					<div :class="contentClass">wi fi</div>					
				</div>
			</div>
			</Transition>
		</div>				
	</div> 			
	<div class='absolute right-20 self-center bottom-12 md:bottom-13 self-center w-44 md:w-64 bg-green-300 z-50'>
			<div class='flex gap-2'>		
				<input type="text" placeholder="search..." class='bg-green-200 absolute right-4 search outline-none p-2 rounded-md' @click='animateSearch'>
				<button class="self-center crossAnimation absolute right-0 hidden text-xl hover:scale-125 transition-all duration-500" @click='hideSearch'>&#9874;</button>
			</div>		
		</div>

	<div class='z-50 absolute right-14 hover:scale-110 w-6 h-6 cursor-pointer transition-all duration-300' @click='cartShow = !cartShow'>
		<img :src="cart">
		<div class='absolute bottom-5 left-3 text-xs rounded-full'>{{cartProducts.length}}</div>
	</div>

	<div class='absolute self-center right-1 w-9 flex gap-1 p-1 bg-s1 rounded-2xl z-50'>
		<div class='rounded-full border bg-white w-3 h-3 cursor-pointer cross relative left-0' @click.self='modeChange'></div>
		<img :src="sORm" class="relative right-0 cross">
	</div>
	</div> <!-- md navbar -->

	<div v-if='demo' class='p-16 text-xl md:text-2xl'>
		<div>Vue Js + REST + Axios</div>
		<div>Cart update demo</div>
		<div>remain in computer menu</div>
		<div class="text-base"> <a href="https://sore-pleat-hen.cyclic.app/" target="_blank" class='text-n8 border-b-2'>REST API</a></div>
	</div>	

	<div>	
		<div v-if='accessoriesShow'>
			<Accessories
				@accessoryAdded='addA' 								
			/>
			
		</div>
	</div>	

	<div>	
		<div v-if='laptopsShow'>
			<Laptops
				@accessoryAdded='addA' 								
			/>
		</div>
	</div>	

	<div>	
		<div v-if='monitorsShow'>
			<Monitors
				@accessoryAdded='addA' 								
			/>
		</div>
	</div>		

	<div>	
		<div v-if='storageShow'>
			<Storage
				@accessoryAdded='addA' 								
			/>
		</div>
	</div>		

	<Teleport to='#ecomm'>
		<div v-if='five' class='p-4 bg-green-200 flex gap-2'><div>you got 5% discount for above $ 200</div><button @click='five=false' class='text-2xl absolute right-2 self-center hover:scale-110 transition-all duration-100'>&#9874;</button></div>
	</Teleport>

	<Transition name='leftTransition'> 
	<div v-if='cartShow' :class='cartClass'>
		<Cart 
			@hideCart='cartShow=false'
			:products='cartProducts' 
			@productRemoved='removeA' 
			@five='five=true'
			@fiveNot='five=false'
		/>
	</div>	
	</Transition>

	

	<div class='p-8 md:p-12 ring-4 ring-gray-400 text-center m-4 footer'>footer</div>


	<!-- left nav fixed -->
	<Transition name='leftTransition'> 
	<div v-if='leftMenu' :class="leftMainClass">
	<div class="flex flex-col gap-y-2" :class="leftContentClass">

		<div :class="leftLogoClss">
			<div class="text-2xl">Company</div>
			<img :src="logo" class="w-8">
			<div class='text-xl absolute self-center right-2 hover:scale-110 transition-all duration-300 cursor-pointer' @click='leftMenu=false'>&#9874;</div>
		</div>

		<!-- computer -->
		<div @click='leftComputerClick' :class="[leftSubSame, leftSubDiff]">
			<div>Computer</div>						
			<img :src="subImg" ref='compRef' class='cursor-pointer w-3 h-3 self-center'>
		</div>
		<Transition name='leftSubT'>
		<div v-if='computersShow' class='flex flex-col gap-y-2 relative'>
			<div :class="leftContentItemClass" @click='accessoriesShow=true; demo=storageShow=laptopsShow=monitorsShow=leftMenu=false'>accessories</div>
			<div :class="leftContentItemClass" @click='storageShow=true; demo=accessoriesShow=laptopsShow=monitorsShow=leftMenu=false'>storage</div>
			<div :class="leftContentItemClass" @click='laptopsShow=true; demo=storageShow=accessoriesShow=monitorsShow=leftMenu=false'>laptops</div>
			<div :class="leftContentItemClass" @click='monitorsShow=true; demo=storageShow=laptopsShow=accessoriesShow=leftMenu=false'>monitors</div>
		</div>
		</Transition><!-- computer -->	

		<!-- electronic -->
		<div @click='leftElectronicsClick' :class="[leftSubSame, leftSubDiff]">
			<div>Electronics</div>			
			<img :src="subImg" ref='elecRef' class='cursor-pointer w-3 h-3 self-center'>
		</div>
		<Transition name='leftSubT'>
		<div v-if='electronicsShow' class='flex flex-col gap-2 p-2 relative w-full'>
			<div :class='leftSubGST' @click='generalECall'>
				<div class='text-xs col-span-2'>general</div> 
				<img :src="subImg" ref='generalERef' class='col-span-10 cursor-pointer w-3 h-3 self-center'>
			</div>
			<Transition name='leftSubT'>
			<div v-if='generalE' class='p-2 ring-1 ring-gray-200 rounded-md left-1 top-10 flex flex-col gap-y-2 w-full'>
				<div :class="leftContentItemClass">accessories</div>
				<div :class="leftContentItemClass">camera & photo</div>
				<div :class="leftContentItemClass">vehicle electronics</div>
				<div :class="leftContentItemClass">cell phone</div>
				<div :class="leftContentItemClass">GPS & Navigation</div>
			</div>
			</Transition>
			<div :class='leftSubGST' @click='specificECall'>
				<div class='text-xs col-span-2'>specific</div> 
				<img :src="subImg" ref='specificERef' class='col-span-10 cursor-pointer w-3 h-3 self-center'>
			</div>			
			<Transition name='leftSubT'>
			<div v-if='specificE' class='p-2 ring-1 ring-gray-200 rounded-md left-1 top-10 flex flex-col gap-y-2 w-full'>
				<div :class="leftContentItemClass">heating</div>
				<div :class="leftContentItemClass">cooling</div>
				<div :class="leftContentItemClass">detectors</div>
				<div :class="leftContentItemClass">sensors</div>
				<div :class="leftContentItemClass">entertainment</div>
			</div>
			</Transition>
			<div :class='leftSubGST' @click='othersECall'>
				<div class='text-xs col-span-2'>others</div> 
				<img :src="subImg" ref='othersERef' class='col-span-10 cursor-pointer w-3 h-3 self-center'>
			</div>			
			<Transition name='leftSubT'>
			<div v-if='othersE' class='p-2 ring-1 ring-gray-200 rounded-md left-1 top-10 flex flex-col gap-y-2 w-full'>
				<div :class="leftContentItemClass">pet</div>
				<div :class="leftContentItemClass">voice</div>
				<div :class="leftContentItemClass">hubs</div>
				<div :class="leftContentItemClass">kitchen</div>
				<div :class="leftContentItemClass">wi fi</div>					
			</div>
			</Transition>
		</div>
		</Transition><!-- electronic -->	

		<!-- electronic -->
		<div @click='leftHomeClick' :class="[leftSubSame, leftSubDiff]">
			<div>Smart Home</div>			
			<img :src="subImg" ref='homeRef' class='cursor-pointer w-3 h-3 self-center'>
		</div>
		<Transition name='leftSubT'>
		<div v-if='homeShow' class='flex flex-col gap-2 p-2 relative w-full'>
			<div :class='leftSubGST' @click='generalHCall'>
				<div class='text-xs col-span-2'>general</div> 
				<img :src="subImg" ref='generalHRef' class='col-span-10 cursor-pointer w-3 h-3 self-center'>
			</div>
			<Transition name='leftSubT'>
			<div v-if='generalH' class='p-2 ring-1 ring-gray-200 rounded-md left-1 top-10 flex flex-col gap-y-2 w-full'>
				<div :class="leftContentItemClass">lightening</div>
				<div :class="leftContentItemClass">locks and entry</div>
				<div :class="leftContentItemClass">security camera</div>
				<div :class="leftContentItemClass">plug and outlets</div>
				<div :class="leftContentItemClass">new smart devices</div>
				<div :class="leftContentItemClass">old smart devices</div>
			</div>
			</Transition>
			<div :class='leftSubGST' @click='specificHCall'>
				<div class='text-xs col-span-2'>specific</div> 
				<img :src="subImg" ref='specificHRef' class='col-span-10 cursor-pointer w-3 h-3 self-center'>
			</div>			
			<Transition name='leftSubT'>
			<div v-if='specificH' class='p-2 ring-1 ring-gray-200 rounded-md left-1 top-10 flex flex-col gap-y-2 w-full'>
				<div :class="leftContentItemClass">office</div>
				<div :class="leftContentItemClass">portable audio</div>
				<div :class="leftContentItemClass">security</div>
				<div :class="leftContentItemClass">service plans</div>
				<div :class="leftContentItemClass">video games</div>
			</div>
			</Transition>
			<div :class='leftSubGST' @click='othersHCall'>
				<div class='text-xs col-span-2'>others</div> 
				<img :src="subImg" ref='othersHRef' class='col-span-10 cursor-pointer w-3 h-3 self-center'>
			</div>			
			<Transition name='leftSubT'>
			<div v-if='othersH' class='p-2 ring-1 ring-gray-200 rounded-md left-1 top-10 flex flex-col gap-y-2 w-full'>
				<div :class="leftContentItemClass">room</div>
				<div :class="leftContentItemClass">school</div>
				<div :class="leftContentItemClass">bank</div>
				<div :class="leftContentItemClass">service plans</div>
				<div :class="leftContentItemClass">video games</div>
			</div>
			</Transition>
		</div>
		</Transition><!-- electronic -->	

	</div></div></Transition> <!-- left nav -->


</div></template>

<script setup>
	import { ref, watch, computed, provide } from 'vue'
	import axios from 'axios'
	import Cart from '/src/components/ecomm/comps/Cart.vue'
	import Accessories from '/src/components/ecomm/comps/Accessories.vue'
	import Laptops from '/src/components/ecomm/comps/Laptops.vue'
	import Monitors from '/src/components/ecomm/comps/Monitors.vue'
	import Storage from '/src/components/ecomm/comps/Storage.vue'

	const theme = ref('sun')
	provide('theme', theme)

	/////////////////////////////////////// app	

	const demo = ref(true)
	const five = ref(false)
	const accessoriesShow = ref(false)
	const storageShow = ref(false)
	const laptopsShow = ref(false)
	const monitorsShow = ref(false)
	const cartProducts = ref([])
	const cartClass = ref('fixed top-0 bg-white z-50 h-full ring-4 w-3/4 sm:w-1/2 ring-gray-200 overflow-y-scroll scrollStyle')
	const cartShow = ref(false)

	const addA = (x) => { cartProducts.value.push(x)	}
	const removeA = (y) => { 				
		cartProducts.value.splice(cartProducts.value.indexOf(cartProducts.value.find(x => x.name == y.name )),1)
	}
	/////////////////////////////////////// app

	const mdNavS = ref('flex p-2 items-center gap-x-2 relative')
	const mdNavD = ref('bg-gray-50 text-black')
	const logo = ref('/assets/ecomm/logo1.png')
	const cart = ref('/assets/ecomm/cart1.png')
	const one = ref(false)
	const two = ref(false)
	const three = ref(false)

	const contentClass = ref('relative contentAnimation text-gray-400 hover:text-gray-800')
	const leftMainClass = ref('p-2 bg-white fixed top-0 z-50 flex flex-col gap-y-2 inline-block md:hidden w-3/4 sm:w-1/2 ring-1 ring-gray-200 h-full')
	const leftLogoClss = ref('p-1 flex gap-2 relative bottom-0.5 bg-white')
	const leftContentClass = ref('relative leftContentAnimation')	
	const leftSubSame = ref('self-center w-full cursor-pointer border-b-2 p-2 text-center text-sm flex justify-between gap-1')
	const leftSubDiff = ref('border-transparent hover:border-gray-300 bg-gray-50 text-black hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-200 border-gray-100')		
	const sORm = ref('/assets/ecomm/moon.png')	

	const leftMenu = ref(false)
	const computersShow = ref(false)
	const electronicsShow = ref(false)
	const homeShow = ref(false)
	const compRef = ref(null)
	const elecRef = ref(null)
	const homeRef = ref(null)

	const generalE = ref(false)
	const specificE = ref(false)
	const othersE = ref(false)
	const generalERef = ref(null)	
	const specificERef = ref(null)	
	const othersERef = ref(null)

	const generalH = ref(false)
	const specificH = ref(false)
	const othersH = ref(false)
	const generalHRef = ref(null)	
	const specificHRef = ref(null)	
	const othersHRef = ref(null)	

	const subImg = computed(() => {
		if(theme.value == 'sun') return '/assets/ecomm/down1.png'
		else if(theme.value == 'moon') return '/assets/ecomm/down2.png'
	})

	const leftSubGST = computed(() => {
		if(theme.value == 'sun') return 'grid grid-cols-12 p-1 gap-2 cursor-pointer hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-200'
		else if(theme.value == 'moon') return 'grid grid-cols-12 p-1 gap-2 cursor-pointer border-l-2 border-transparent hover:border-gray-300'
	})

	const leftContentItemClass = computed(() => {
		if(theme.value == 'sun') return 'self-center w-full cursor-pointer text-gray-400 hover:text-gray-800 bg-white'
		else if(theme.value == 'moon') return 'self-center w-full cursor-pointer text-gray-400 hover:text-gray-100'
	})

	const menuDivClass = computed(() => {
		if(theme.value == 'sun') return 'pad flex gap-x-16 bg-gray-50 cursor-pointer w-full absolute menuDivClassPosition right-1'
		else if(theme.value == 'moon') return 'pad flex gap-x-16 cursor-pointer w-full absolute bg-gray-700 text-white menuDivClassPositionDark right-1'
	})

	const generalECall = (e) => {
		generalE.value = !generalE.value 
		specificE.value = othersE.value = false

		if(theme.value == 'sun'){
			specificERef.value.setAttribute('src', '/assets/ecomm/down1.png')
			othersERef.value.setAttribute('src', '/assets/ecomm/down1.png')
			if(generalERef.value.getAttribute('src') == '/assets/ecomm/down1.png') 
				generalERef.value.setAttribute('src', '/assets/ecomm/up1.png')
			else generalERef.value.setAttribute('src', '/assets/ecomm/down1.png')		
		}
		else if(theme.value == 'moon'){
			specificERef.value.setAttribute('src', '/assets/ecomm/down2.png')
			othersERef.value.setAttribute('src', '/assets/ecomm/down2.png')
			if(generalERef.value.getAttribute('src') == '/assets/ecomm/down2.png') 
				generalERef.value.setAttribute('src', '/assets/ecomm/up2.png')
			else generalERef.value.setAttribute('src', '/assets/ecomm/down2.png')		
		}
	}

	const specificECall = (e) => {
		specificE.value = !specificE.value 
		generalE.value = othersE.value = false

		if(theme.value == 'sun'){
			generalERef.value.setAttribute('src', '/assets/ecomm/down1.png')
			othersERef.value.setAttribute('src', '/assets/ecomm/down1.png')
			if(specificERef.value.getAttribute('src') == '/assets/ecomm/down1.png') 
				specificERef.value.setAttribute('src', '/assets/ecomm/up1.png')
			else specificERef.value.setAttribute('src', '/assets/ecomm/down1.png')		
		}
		else if(theme.value == 'moon'){
			generalERef.value.setAttribute('src', '/assets/ecomm/down2.png')
			othersERef.value.setAttribute('src', '/assets/ecomm/down2.png')
			if(specificERef.value.getAttribute('src') == '/assets/ecomm/down2.png') 
				specificERef.value.setAttribute('src', '/assets/ecomm/up2.png')
			else specificERef.value.setAttribute('src', '/assets/ecomm/down2.png')		
		}
	}

	const othersECall = (e) => {
		othersE.value = !othersE.value 
		generalE.value = specificE.value = false

		if(theme.value == 'sun'){
			generalERef.value.setAttribute('src', '/assets/ecomm/down1.png')
			specificERef.value.setAttribute('src', '/assets/ecomm/down1.png')
			if(othersERef.value.getAttribute('src') == '/assets/ecomm/down1.png') 
				othersERef.value.setAttribute('src', '/assets/ecomm/up1.png')
			else othersERef.value.setAttribute('src', '/assets/ecomm/down1.png')		
		}
		else if(theme.value == 'moon'){
			generalERef.value.setAttribute('src', '/assets/ecomm/down2.png')
			specificERef.value.setAttribute('src', '/assets/ecomm/down2.png')
			if(othersERef.value.getAttribute('src') == '/assets/ecomm/down2.png') 
				othersERef.value.setAttribute('src', '/assets/ecomm/up2.png')
			else othersERef.value.setAttribute('src', '/assets/ecomm/down2.png')		
		}
	}

	const generalHCall = (e) => {
		generalH.value = !generalH.value 
		specificH.value = othersH.value = false

		if(theme.value == 'sun'){
		specificHRef.value.setAttribute('src', '/assets/ecomm/down1.png')
		othersHRef.value.setAttribute('src', '/assets/ecomm/down1.png')
		if(generalHRef.value.getAttribute('src') == '/assets/ecomm/down1.png') 
			generalHRef.value.setAttribute('src', '/assets/ecomm/up1.png')
		else generalHRef.value.setAttribute('src', '/assets/ecomm/down1.png')		
		}
	else if(theme.value == 'moon'){
		specificHRef.value.setAttribute('src', '/assets/ecomm/down2.png')
		othersHRef.value.setAttribute('src', '/assets/ecomm/down2.png')
		if(generalHRef.value.getAttribute('src') == '/assets/ecomm/down2.png') 
			generalHRef.value.setAttribute('src', '/assets/ecomm/up2.png')
		else generalHRef.value.setAttribute('src', '/assets/ecomm/down2.png')		
		}
	}

	const specificHCall = (e) => {
		specificH.value = !specificH.value 
		generalH.value = othersH.value = false

		if(theme.value == 'sun'){
		generalHRef.value.setAttribute('src', '/assets/ecomm/down1.png')
		othersHRef.value.setAttribute('src', '/assets/ecomm/down1.png')
		if(specificHRef.value.getAttribute('src') == '/assets/ecomm/down1.png') 
			specificHRef.value.setAttribute('src', '/assets/ecomm/up1.png')
		else specificHRef.value.setAttribute('src', '/assets/ecomm/down1.png')		
		}
		else if(theme.value == 'moon'){
		generalHRef.value.setAttribute('src', '/assets/ecomm/down2.png')
		othersHRef.value.setAttribute('src', '/assets/ecomm/down2.png')
		if(specificHRef.value.getAttribute('src') == '/assets/ecomm/down2.png') 
			specificHRef.value.setAttribute('src', '/assets/ecomm/up2.png')
		else specificHRef.value.setAttribute('src', '/assets/ecomm/down2.png')		
		}
	}

	const othersHCall = (e) => {
		othersH.value = !othersH.value 
		generalH.value = specificH.value = false

		if(theme.value == 'sun'){
		generalHRef.value.setAttribute('src', '/assets/ecomm/down1.png')
		specificHRef.value.setAttribute('src', '/assets/ecomm/down1.png')
		if(othersHRef.value.getAttribute('src') == '/assets/ecomm/down1.png') 
			othersHRef.value.setAttribute('src', '/assets/ecomm/up1.png')
		else othersHERef.value.setAttribute('src', '/assets/ecomm/down1.png')		
		}
		else if(theme.value == 'moon'){
		generalHRef.value.setAttribute('src', '/assets/ecomm/down2.png')
		specificHRef.value.setAttribute('src', '/assets/ecomm/down2.png')
		if(othersHRef.value.getAttribute('src') == '/assets/ecomm/down2.png') 
			othersHRef.value.setAttribute('src', '/assets/ecomm/up2.png')
		else othersHERef.value.setAttribute('src', '/assets/ecomm/down2.png')		
		}
	}

	const leftComputerClick = (e) => {	
		computersShow.value = !computersShow.value
		electronicsShow.value = homeShow.value = generalE.value = specificE.value = othersE.value = false
		if(theme.value == 'sun'){
			elecRef.value.setAttribute('src', '/assets/ecomm/down1.png')
			homeRef.value.setAttribute('src', '/assets/ecomm/down1.png')
			if(compRef.value.getAttribute('src') == '/assets/ecomm/down1.png') 
				compRef.value.setAttribute('src', '/assets/ecomm/up1.png')
			else compRef.value.setAttribute('src', '/assets/ecomm/down1.png')		
		}
		else if(theme.value == 'moon'){
			elecRef.value.setAttribute('src', '/assets/ecomm/down2.png')
			homeRef.value.setAttribute('src', '/assets/ecomm/down2.png')
			if(compRef.value.getAttribute('src') == '/assets/ecomm/down2.png') 
				compRef.value.setAttribute('src', '/assets/ecomm/up2.png')
			else compRef.value.setAttribute('src', '/assets/ecomm/down2.png')		
		}
		
	}

	const leftElectronicsClick = (e) => {	
		electronicsShow.value = !electronicsShow.value
		computersShow.value = homeShow.value = generalE.value = specificE.value = othersE.value = false

		if(theme.value == 'sun'){
			compRef.value.setAttribute('src', '/assets/ecomm/down1.png')		
			homeRef.value.setAttribute('src', '/assets/ecomm/down1.png')
			if(elecRef.value.getAttribute('src') == '/assets/ecomm/down1.png') 
				elecRef.value.setAttribute('src', '/assets/ecomm/up1.png')
			else elecRef.value.setAttribute('src', '/assets/ecomm/down1.png')			
		}
		else if(theme.value == 'moon'){
			compRef.value.setAttribute('src', '/assets/ecomm/down2.png')		
			homeRef.value.setAttribute('src', '/assets/ecomm/down2.png')
			if(elecRef.value.getAttribute('src') == '/assets/ecomm/down2.png') 
				elecRef.value.setAttribute('src', '/assets/ecomm/up2.png')
			else elecRef.value.setAttribute('src', '/assets/ecomm/down2.png')			
		}
		
	}

	const leftHomeClick = (e) => {	
		homeShow.value = !homeShow.value
		computersShow.value = electronicsShow.value = generalH.value = specificH.value = othersH.value = false

		if(theme.value == 'sun'){
			compRef.value.setAttribute('src', '/assets/ecomm/down1.png')				
			elecRef.value.setAttribute('src', '/assets/ecomm/down1.png')
			if(homeRef.value.getAttribute('src') == '/assets/ecomm/down1.png') 
				homeRef.value.setAttribute('src', '/assets/ecomm/up1.png')
			else homeRef.value.setAttribute('src', '/assets/ecomm/down1.png')			
		}
		else if(theme.value == 'moon'){
			compRef.value.setAttribute('src', '/assets/ecomm/down2.png')				
			elecRef.value.setAttribute('src', '/assets/ecomm/down2.png')
			if(homeRef.value.getAttribute('src') == '/assets/ecomm/down2.png') 
				homeRef.value.setAttribute('src', '/assets/ecomm/up2.png')
			else homeRef.value.setAttribute('src', '/assets/ecomm/down2.png')			
		}

		
	}

	const animateSearch = (e) => {
		e.target.classList.remove('searchAnimationR')
		setTimeout(() => { e.target.classList.add('searchAnimation') }, 1)		
		setTimeout(() => { e.target.nextElementSibling.classList.remove('hidden') }, 500)
	}

	const hideSearch = (e) => {
		e.target.previousElementSibling.classList.remove('searchAnimation')
		setTimeout(() => { e.target.previousElementSibling.classList.add('searchAnimationR'); e.target.classList.add('hidden') }, 1)
	}
	const counter = ref(1)

	const modeChange = (e) => {
		if(theme.value == 'sun') theme.value = 'moon'
		else if(theme.value == 'moon') theme.value = 'sun'
		counter.value++

		if(counter.value %2 == 0){
			e.target.classList.remove('left-0')
			e.target.classList.add('left-4')			
			e.target.nextElementSibling.classList.remove('right-0')
			e.target.nextElementSibling.classList.add('right-4')
			e.target.parentElement.classList.remove('bg-s1')
			e.target.parentElement.classList.add('bg-d4')
			mdNavD.value = 'bg-gray-700 text-white'			
			leftMainClass.value = 'p-2 bg-gray-700 text-white fixed top-0 z-50 flex flex-col gap-y-2 inline-block md:hidden w-3/4 sm:w-1/2 ring-2 ring-gray-200 h-full'								
			leftLogoClss.value = 'p-1 flex gap-2 relative bottom-0.5 bg-gray-700 text-white'
		}
		else if(counter.value %2 != 0){
			e.target.classList.remove('left-4')
			e.target.classList.add('left-0')
			e.target.nextElementSibling.classList.remove('right-4')
			e.target.nextElementSibling.classList.add('right-0')
			e.target.parentElement.classList.remove('bg-d4')
			e.target.parentElement.classList.add('bg-s1')
			mdNavD.value = 'bg-gray-50 text-black'	
			leftMainClass.value = 'p-2 bg-white text-black fixed top-0 z-50 flex flex-col gap-y-2 inline-block md:hidden w-3/4 sm:w-1/2 ring-1 ring-gray-200 h-full'						
			leftLogoClss.value = 'p-1 text-black flex gap-2 relative bottom-0.5 bg-white'
		}				
	}	

	watch(theme, (t) => {
		if(t == 'sun'){
			sORm.value = '/assets/ecomm/moon.png'
			logo.value = '/assets/ecomm/logo1.png'
			cart.value = '/assets/ecomm/cart1.png'			
			contentClass.value = 'relative contentAnimation text-gray-400 hover:text-gray-800'
			leftSubDiff.value = 'border-transparent hover:border-gray-300 bg-gray-50 text-black hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-200 border-gray-100'
		} 
		else if(t == 'moon'){
			sORm.value = '/assets/ecomm/sun.png'
			logo.value = '/assets/ecomm/logo2.png'
			cart.value = '/assets/ecomm/cart2.png'			
			contentClass.value = 'relative contentAnimation text-gray-300 hover:text-gray-100'
			leftSubDiff.value = 'border-gray-300 hover:border-gray-100 bg-gray-700 text-white'
		} 
	})		
	
</script>

<style scoped>
.cross{
	transition: all 0.5s ease-out;
}
.search{	
	background: url(/assets/ecomm/search1.png) no-repeat;
	background-position:2% 50%;	
	width:8%;		
	text-indent:22px;
	box-shadow:2px 8px 12px white inset;
}
.searchAnimation{ animation: searchAnimationFrames 0.5s linear forwards; }
.searchAnimationR{ animation: searchAnimationFrames 0.5s linear reverse; }
@keyframes searchAnimationFrames{
	0%{
		background-color:#f5f5ff;
		width:8%;
		border-bottom: 0px solid #cccccc;
	}
	100%{
		background-color:#ebebff;
		width:100%;
		border-bottom: 1px solid #cccccc;
	}
}

.ft{font-family:'Glory'; font-size:16px;}
.pad{	
	padding-left:15%;
	padding-right:15%;
	padding-top:3%;
	padding-bottom:3%;
}
.menuDivClassPosition{	box-shadow: 1px 1px 4px #f2f2f2;	top:80%;	}
.menuDivClassPositionDark{		top:80%;	}

.contentAnimation{ animation: contentFrames 0.3s linear; }
@keyframes contentFrames{
	0%{ top:20px; opacity:0; }
	100%{ top:0px; opacity:1 }
}
.borderAnimation{ 		animation: borderFrames 0.6s linear forwards; }

@keyframes borderFrames{
	0%{ width:0%; border-bottom:2px solid #77819f; }
	100%{ width:100%; border-bottom:2px solid #77819f; }
}
.v-enter-from{ opacity:0;   }
.v-enter-to{ opacity:1;  }
.v-enter-active{ transition: all 0.4s linear; }

.leftTransition-enter-from{ opacity:0; left:-20%;  }
.leftTransition-enter-to{ opacity:1; left:0%; }
.leftTransition-enter-active{ transition: all 0.4s linear; }

.leftTransition-leave-from{ opacity:1; left:0%;  }
.leftTransition-leave-to{ opacity:0; left:-20%; }
.leftTransition-leave-active{ transition: all 0.5s linear; }

.leftContentAnimation{ animation: leftContentFrames 0.6s linear; }
@keyframes leftContentFrames{
	0%{ transform:scale(0.9,0.9);  }
	100%{ transform:scale(1,1); }
}

.leftSubT-enter-from{ opacity:0; transform:scale(1,0.8);  }
.leftSubT-enter-to{ opacity:1; transform:scale(1,1); }
.leftSubT-enter-active{ transition: all 0.4s linear; }

.leftSubT-leave-from{ opacity:1; transform:scale(1,1);  }
.leftSubT-leave-to{ opacity:0; transform:scale(1,0.8); }
.leftSubT-leave-active{ transition: all 0.3s linear; }

.footer{	width:96%;	left:2%;	}


</style>