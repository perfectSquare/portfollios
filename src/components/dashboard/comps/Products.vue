<template><div class="relative">
	<div class="flex gap-1">
		<button :class='btClass' @click='accessoriesFetch'>accessories</button>
		<button :class='btClass' @click='laptopsFetch'>laptops</button>		
		<button :class='btClass' @click='monitorsFetch'>monitors</button>		
		<button :class='btClass' @click='storageFetch'>storage</button>		
	</div>

	<!-- accessories -->
	<div v-if='accessoriesLoading'><img src="/assets/dashboard/spin.png" :class="accessoriesSpin"></div>
	<div v-else-if='accessoriesShow' class='flex flex-col gap-y-2'>
		<div class="flex justify-center gap-8">
			<img src="/assets/dashboard/right1.png" @click='getMoreAccessories' :class='arrowClass'>
			<img src="/assets/dashboard/left1.png" @click='getLessAccessories' :class='arrowClass'>
		</div>		
		<div class="grid grid-cols-2 gap-2">
		<template v-for='(item,i) in accessoriesPage' :key='i'>
			<div class='p-2 rounded-md ring-1 ring-gray-300 flex flex-col gap-1'>
				<img :src="item.image" class="w-20">
				<div>{{item.name}}</div>
				<div>$ {{item.price}}</div>
			</div>	
		</template>		
		</div>
	</div> <!-- accessories -->

	<!-- laptops -->
	<div v-if='laptopsLoading'><img src="/assets/dashboard/spin.png" :class="accessoriesSpin"></div>
	<div v-else-if='laptopsShow' class='flex flex-col gap-y-2'>
		<div class="flex justify-center gap-8">
			<img src="/assets/dashboard/right1.png" @click='getMoreLaptops' :class='arrowClass'>
			<img src="/assets/dashboard/left1.png" @click='getLessLaptops' :class='arrowClass'>
		</div>		
		<div class="grid grid-cols-2 gap-2">
		<template v-for='(item,i) in laptopsPage' :key='i'>
			<div class='p-2 rounded-md ring-1 ring-gray-300 flex flex-col gap-1'>
				<img :src="item.image" class="w-20">
				<div>{{item.name}}</div>
				<div>$ {{item.price}}</div>
			</div>	
		</template>		
		</div>
	</div>
	<!-- laptops -->

	<!-- monitors -->
	<div v-if='monitorsLoading'><img src="/assets/dashboard/spin.png" :class="accessoriesSpin"></div>
	<div v-else-if='monitorsShow' class='flex flex-col gap-y-2'>
		<div class="flex justify-center gap-8">
			<img src="/assets/dashboard/right1.png" @click='getMoreMonitors' :class='arrowClass'>
			<img src="/assets/dashboard/left1.png" @click='getLessMonitors' :class='arrowClass'>
		</div>		
		<div class="grid grid-cols-2 gap-2">
		<template v-for='(item,i) in monitorsPage' :key='i'>
			<div class='p-2 rounded-md ring-1 ring-gray-300 flex flex-col gap-1'>
				<img :src="item.image" class="w-20">
				<div>{{item.name}}</div>
				<div>$ {{item.price}}</div>
			</div>	
		</template>		
		</div>
	</div>
	<!-- monitors -->

	<!-- storage -->
	<div v-if='storageLoading'><img src="/assets/dashboard/spin.png" :class="accessoriesSpin"></div>
	<div v-else-if='storageShow' class='flex flex-col gap-y-2'>
		<div class="flex justify-center gap-8">
			<img src="/assets/dashboard/right1.png" @click='getMoreStorage' :class='arrowClass'>
			<img src="/assets/dashboard/left1.png" @click='getLessStorage' :class='arrowClass'>
		</div>		
		<div class="grid grid-cols-2 gap-2">
		<template v-for='(item,i) in storagePage' :key='i'>
			<div class='p-2 rounded-md ring-1 ring-gray-300 flex flex-col gap-1'>
				<img :src="item.image" class="w-20">
				<div>{{item.name}}</div>
				<div>$ {{item.price}}</div>
			</div>	
		</template>		
		</div>
	</div>
	<!-- storage -->

	
	

</div></template>

<script setup>
	import { ref } from 'vue'
	import axios from 'axios'

	const btClass = ref('rounded-lg p-2 bg-gray-100 hover:bg-gradient-to-r hover:from-gray-50 hover:to-s5 border-b-2 border-gray-300 transition-all duration-500')
	const arrowClass = ref('cursor-pointer hover:scale-110 transition-all duration-100')
	const accessoriesSpin = ref('inline-block accessoriesSpinA absolute')

	const accessoriesShow = ref(false)
	const accessoriesLoading = ref(false)
	const accessories = ref([])	
	const accessoriesPage = ref([])
	const start = ref(0)
	const end = ref(4)
	const length = ref(0)

	const laptopsShow = ref(false)
	const laptopsLoading = ref(false)
	const laptops = ref([])
	const laptopsPage = ref([])				

	const monitorsShow = ref(false)
	const monitorsLoading = ref(false)
	const monitors = ref([])
	const monitorsPage = ref([])				

	const storageShow = ref(false)
	const storageLoading = ref(false)
	const storage = ref([])
	const storagePage = ref([])				

	//////////////////////////////accessories
	async function accessoriesFetch(){
		accessoriesLoading.value = true		
		laptopsShow.value = monitorsShow.value = storageShow.value = false
		start.value = 0
		end.value = 4
		
		await axios.get('https://sore-pleat-hen.cyclic.app/accessories')
		.then((res) =>{ 
			accessories.value = res.data
			length.value = accessories.value.length
			accessoriesPage.value = accessories.value.slice(start.value, end.value)
		})
		.catch((err) => console.log(err))
		.finally(() => {
			accessoriesShow.value = true					
			accessoriesLoading.value = false
		})				
	}

	const getMoreAccessories = (e) => {
		e.target.nextElementSibling.classList.remove('hidden')
		start.value += 4
		end.value += 4		
		if(end.value < length.value){
			accessoriesPage.value = accessories.value.slice(start.value, end.value)
		}			
		else{
			accessoriesPage.value = accessories.value.slice(start.value)
			e.target.classList.add('hidden')
		} 
	}
	const getLessAccessories = (e) => {
		e.target.previousElementSibling.classList.remove('hidden')		
		start.value -= 4
		end.value -= 4
		if(start.value > 0)
			accessoriesPage.value = accessories.value.slice(start.value, end.value)
		else{
			accessoriesPage.value = accessories.value.slice(start.value, end.value)
			e.target.classList.add('hidden')
		} 
	}		
	//////////////////////////////accessories	
////////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////////laptops	
	async function laptopsFetch(){
		accessoriesShow.value = monitorsShow.value = storageShow.value = false
		laptopsLoading.value = true
		await axios.get('https://sore-pleat-hen.cyclic.app/laptops')
		.then((res) =>{ 			
			laptops.value = res.data				
			length.value = laptops.value.length
			laptopsPage.value = laptops.value.slice(start.value, end.value)
		})
		.catch((err) => console.log(err))
		.finally(() => {			
			laptopsShow.value = true
			laptopsLoading.value = false	
		})		
	}		
	const getMoreLaptops = (e) => {
		e.target.nextElementSibling.classList.remove('hidden')
		start.value += 4
		end.value += 4		
		if(end.value < length.value){
			laptopsPage.value = laptops.value.slice(start.value, end.value)
		}			
		else{
			laptopsPage.value = laptops.value.slice(start.value)
			e.target.classList.add('hidden')
		} 
	}
	const getLessLaptops = (e) => {
		e.target.previousElementSibling.classList.remove('hidden')		
		start.value -= 4
		end.value -= 4
		if(start.value > 0)
			laptopsPage.value = laptops.value.slice(start.value, end.value)
		else{
			laptopsPage.value = laptops.value.slice(start.value, end.value)
			e.target.classList.add('hidden')
		} 
	}	
	//////////////////////////////laptops
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////monitors
	async function monitorsFetch(){
		accessoriesShow.value = laptopsShow.value = storageShow.value = false
		monitorsLoading.value = true
		await axios.get('https://sore-pleat-hen.cyclic.app/monitors')
		.then((res) =>{ 			
			monitors.value = res.data				
			length.value = monitors.value.length
			monitorsPage.value = monitors.value.slice(start.value, end.value)
		})
		.catch((err) => console.log(err))
		.finally(() => {			
			monitorsShow.value = true
			monitorsLoading.value = false	
		})		
	}		
	const getMoreMonitors = (e) => {
		e.target.nextElementSibling.classList.remove('hidden')
		start.value += 4
		end.value += 4		
		if(end.value < length.value){
			monitorsPage.value = monitors.value.slice(start.value, end.value)
		}			
		else{
			monitorsPage.value = monitors.value.slice(start.value)
			e.target.classList.add('hidden')
		} 
	}
	const getLessMonitors = (e) => {
		e.target.previousElementSibling.classList.remove('hidden')		
		start.value -= 4
		end.value -= 4
		if(start.value > 0)
			monitorsPage.value = monitors.value.slice(start.value, end.value)
		else{
			monitorsPage.value = monitors.value.slice(start.value, end.value)
			e.target.classList.add('hidden')
		} 
	}	
	//////////////////////////////monitors

//////////////////////////////storage
	async function storageFetch(){
		accessoriesShow.value = laptopsShow.value = monitorsShow.value = false
		storageLoading.value = true
		await axios.get('https://sore-pleat-hen.cyclic.app/storage')
		.then((res) =>{ 			
			storage.value = res.data				
			length.value = storage.value.length
			storagePage.value = storage.value.slice(start.value, end.value)
		})
		.catch((err) => console.log(err))
		.finally(() => {			
			storageShow.value = true
			storageLoading.value = false	
		})		
	}		
	const getMoreStorage = (e) => {
		e.target.nextElementSibling.classList.remove('hidden')
		start.value += 4
		end.value += 4		
		if(end.value < length.value){
			storagePage.value = storage.value.slice(start.value, end.value)
		}			
		else{
			storagePage.value = storage.value.slice(start.value)
			e.target.classList.add('hidden')
		} 
	}
	const getLessStorage = (e) => {
		e.target.previousElementSibling.classList.remove('hidden')		
		start.value -= 4
		end.value -= 4
		if(start.value > 0)
			storagePage.value = storage.value.slice(start.value, end.value)
		else{
			storagePage.value = storage.value.slice(start.value, end.value)
			e.target.classList.add('hidden')
		} 
	}	
	//////////////////////////////storage	

////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////// update
	const updatedProduct = ref({})
	const updateProduct = async () => {
		await axios.patch('https://sore-pleat-hen.cyclic.app/accessories/1', {price:700})
		.then((res) => {
			console.log(res.data)
			updatedProduct.value = res.data
		})
		.catch((err) => console.log(err.message) )
	}
	////////////////////////////// update

</script>

<style scoped>
.accessoriesSpinA{	animation: accessoriesSpinFrames 3s linear infinite;	}
@keyframes accessoriesSpinFrames{
	0%{ transform:rotate(-360deg); }
	100%{ transform:rotate(0deg); }
}
</style>