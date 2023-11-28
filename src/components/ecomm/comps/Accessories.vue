<template><div class='p-4'>
	<div>
		<div :class="arrowsDiv">
			<div>Accessories</div>
			<div class="absolute self-center left-1/2 flex justify-center gap-8">
				<img v-if='forwardShow' :src="forward" :class="arrowClass" @click='getMore'>
				<img v-if='reverseShow' :src="reverse" :class="arrowClass" @click='getLess'>
			</div>
		</div>

		<div v-if='accLoad' class='spin z-50'><div></div><div></div><div></div><div></div></div>
		<div v-else class='grid grid-cols-1 sm:grid-cols-2 gap-x-2 gap-y-6 p-1 mt-4'>			
			<template v-for='(item,i) in accessories' :key='i'>				
			<div :class="mainClass">			
				<div class="flex flex-col items-center mb-8">
					<img :src="item.image" class="w-36 cursor-pointer" @click='(e) => e.target.nextElementSibling.classList.remove("hidden")'>

					<!-- fx --><div :class="fxClass">
						<div class="absolute right-2 cursor-pointer top-1 hover:scale-125 transition-all duration-300" @click='(e) => e.target.parentElement.classList.add("hidden")'>&#9874;</div>
						<div class="titleFont">{{item.name}}</div>
						<div class="titleFont">Brand: {{item.manufacturer}}</div>
						<div>stars: {{item.stars}}</div>
						<div>price: {{item.price}}</div>
						<div>description: {{item.description}}</div>
					<!-- fx --></div>

					<div class="titleFont">{{item.name}}</div>
					<div class="flex" :title='item.stars'>
						<img src="/assets/ecomm/s.png">
						<img src="/assets/ecomm/s.png">
						<img src="/assets/ecomm/s.png">
						<img src="/assets/ecomm/s.png">
						<img v-if='item.stars >= 4.9' src="/assets/ecomm/s.png">
						<img v-if='item.stars<4.9 && item.stars >=4.7' src="/assets/ecomm/s87.png">
						<img v-if='item.stars<4.7 && item.stars >=4.5' src="/assets/ecomm/s65.png">
						<img v-if='item.stars<4.5 && item.stars >=4' src="/assets/ecomm/s12.png">
					</div>
					<div>price: {{item.price}}</div>			
					<div v-if='item.best' :class="bestClass">best seller</div>					
				</div>
				<div class="absolute bottom-0">
					<button @click='$emit("accessoryAdded", item)' :class="addBt">add to cart</button>
					<!-- <button @click='[$emit("accessoryRemoved", item, item.name), removeStatus($event)]' class="hidden p-1 rounded-md bg-red-800 text-white hover:bg-red-900 transition-all duration-200">remove from cart</button> -->
				</div>			
			</div>
		</template>
		</div>
	</div>	
</div></template>

<script setup>
	import { ref, inject, computed } from 'vue'
	import axios from 'axios'

	const emits = defineEmits(['accessoryAdded', 'accessoryRemoved'])

	const theme = inject('theme')
	const accLoad = ref(true)
	const accessories = ref([])	
	const lengthA = ref(0)
	const start = ref(0)
	const forwardShow = ref(true)
	const reverseShow = ref(true)
	const arrowClass = ref('hover:scale-110 transition-all duration-300 cursor-pointer')

	const forward = computed(() => {
		if(theme.value == 'sun') return '/assets/ecomm/forward1.png'
		else if(theme.value == 'moon') return '/assets/ecomm/forward2.png'
	})
	const reverse = computed(() => {
		if(theme.value == 'sun') return '/assets/ecomm/reverse1.png'
		else if(theme.value == 'moon') return '/assets/ecomm/reverse2.png'
	})

	const mainClass = computed(() => {
		if(theme.value == 'sun') return 'relative p-2 ring text-black ring-gray-50 hover:ring-gray-300 flex flex-col items-center'
		if(theme.value == 'moon') return 'relative p-2 ring hover:ring-offset-2 bg-gray-700 text-white ring-gray-300 flex flex-col items-center'		
	})
	const fxClass = computed(() => {
		if(theme.value == 'sun') return 'fx bg-gray-700 ring-offset-2 ring-2 ring-gray-800 z-50 text-white flex flex-col items-center p-4 hidden'
		if(theme.value == 'moon') return 'fx bg-l2 ring-offset-2 ring-2 ring-gray-300 z-50 text-black flex flex-col items-center p-4 hidden'
	})	

	const arrowsDiv = computed(() => {
		if(theme.value == 'sun') return 'relative flex bg-white text-black p-2'
		if(theme.value == 'moon') return 'relative flex bg-s5 text-white p-2'
	})	

	const addBt = computed(() => {
		if(theme.value == 'sun') return 'p-1 rounded-md bg-gray-700 text-white hover:bg-gray-800 transition-all duration-200'
		if(theme.value == 'moon') return 'p-1 rounded-md bg-gray-100 text-black hover:bg-l4 transition-all duration-200'
	})		

	const bestClass = computed(() => {
		if(theme.value == 'sun') return 'absolute left-2 bg-s5 text-white bestFont p-1 rounded-md'
		if(theme.value == 'moon') return 'absolute left-2 bg-l1 text-black estFont p-1 rounded-md'
	})			

	axios({
		baseURL: 'https://sore-pleat-hen.cyclic.app/accessories',
		method: 'get',		
	})
	.then((res) => {
		accessories.value = res.data.filter(x => x.id<5)
		lengthA.value = res.data.length
	})
	.catch((err) => console.log(err))
	.finally(() => {
		accLoad.value = false
	})	

	const getMore = async () => {		
		accLoad.value = true	
		reverseShow.value = true	
		start.value += 4
		if(start.value+4 >= lengthA.value) forwardShow.value = false
		await axios({
			baseURL: 'https://sore-pleat-hen.cyclic.app/accessories',			
			// baseURL: 'https://sore-pleat-hen.cyclic.app/accessories',
			method: 'get',		
			params: { _limit:4, _start:start.value }
		})
		.then((res) => { accessories.value = res.data })
		.catch((err) => console.log(err))
		.finally(() => {
			accLoad.value = false
		})
	}

	const getLess = async () => {		
		accLoad.value = true
		forwardShow.value = true
		start.value -= 4
		if(start.value-4 < 0) reverseShow.value = false
		await axios({
			baseURL: 'https://sore-pleat-hen.cyclic.app/accessories',
			method: 'get',		
			params: { _limit:4, _start:start.value }
		})
		.then((res) => { accessories.value = res.data })
		.catch((err) => console.log(err))
		.finally(() => {
			accLoad.value = false
		})
	}
	// const addStatus = (e,x) => {	
	// 	e.target.classList.add('hidden')
	// 	e.target.nextElementSibling.classList.remove('hidden')
	// }
	// const removeStatus = (e) => {
	// 	e.target.classList.add('hidden')
	// 	e.target.previousElementSibling.classList.remove('hidden')
	// }

	
</script>

<style scoped>
.fx{
	position: fixed;
	left:50%;
	top:50%;
	transform: translate(-50%, -50%);
}
.spin{
	display:flex;
	position: fixed;
	left:50%;
	top:50%;
	transform: translate(-50%, -50%);
}
.spin div{
	position: absolute;
	width:14px;
	height:14px;
	background-color:#3e5260;
	border-radius: 50%;
}
.spin div:nth-child(1){
	left:20px;
	animation: frames1 0.5s linear infinite;
}
.spin div:nth-child(2){
	left:40px;
	animation: frames1 0.5s 0.1s linear infinite;
}
.spin div:nth-child(3){
	left:60px;
	animation: frames1 0.5s 0.2s linear infinite;
}
.spin div:nth-child(4){
	left:80px;
	animation: frames1 0.5s 0.3s linear infinite;
}
@keyframes frames1{
	0%{ transform:scale(0,0); }
	100%{ transform:scale(1,1); }
}
.titleFont{ font-family:'Actor' }
.bestFont{ font-family:'Changa'; text-shadow: 1px 1px 2px black; }
</style>