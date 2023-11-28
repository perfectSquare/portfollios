<template><div class="p-2 flex flex-col gap-2">

	<div class="flex flex-col md:flex-row gap-4">
		<div class="bg-gray-200 p-2 rounded-md flex gap-1">
			<div>Sold from </div>
			<input type="date" v-model='fromDate'> to <input type="date" v-model='toDate'>
		</div>		
		<div @click='getSoldFromTo' :class="weekClassHover">find</div>
		<div class="text-xs text-center">remain within May 1 to May 15</div>
	</div>
	
	<div v-if='soldLoading'><img src="/assets/dashboard/spin.png" :class="accessoriesSpin"></div>
	<div v-else class="mt-2">

		<div class="p-2 relative self-center bestCloud m-4"> <!-- best -->
			<div class="absolute -top-1 bg-d1 text-white p-1 text-xs rounded-md">Best Sold</div>
			<template v-for='(item,i) in bestSold' :key='i'>
			<div class="p-2 flex flex-col md:grid md:grid-cols-12 md:gap-2 items-center gap-y-2">
				<img :src="item.image" class="w-36 col-span-3">
				<div class="col-span-9 w-full self-center flex flex-col gap-1">
					<div class="p-2 grid grid-cols-2 gap-1">
						<div>Name</div>
						<div>{{item.name}}</div>						
					</div>
					<div class="p-2 grid grid-cols-2 gap-1">
						<div>Price</div>
						<div>{{item.price}}</div>						
					</div>
					<div class="p-2 grid grid-cols-2 gap-1">
						<div>Manufacturer</div>
						<div>{{item.manufacturer}}</div>
					</div>
				</div>
			</div>		
			</template>	
		</div> <!-- best -->

		<div class="flex flex-col gap-2 p-1"> <!-- others -->
		<template v-for='(item,i) in soldInWeek' :key='i'>
			<div @click='displaySoldItem(item.soldId, item.type)' class="ring-1 ring-gray-200 border-b-2 border-gray-300 cursor-pointer p-2 flex justify-between" :class='{"bestCloud": item.item == best.name}'>
				<div class="p-2">{{item.item}}</div>
				<div class="p-2">{{item.price}}</div>
			</div>		
		</template>
		</div> <!-- others -->

		<Teleport to='#dash'>
			<div v-if='soldItemShow' class="z-50">
				<div v-if='soldItemShowLoading'><img src="/assets/dashboard/spin.png" :class="accessoriesSpin"></div>
				<div v-else>
				<div class="inline-block cursor-pointer absolute text-white right-2 text-xl hover:scale-125 transition-all duration-300" @click='soldItemShow=false'>&#9874;</div>
				<div class="flex flex-col gap-2 p-4 md:p-6 rounded-md bg-gray-700 text-white">					
				<template v-for='(item,m) in soldItemsAtDay' :key='m'>					
					<img :src="item.image" class="w-44 self-center">
					<div class="grid grid-cols-12 gap-2">
						<div class="col-span-2">Item</div>
						<div class="col-span-10">{{item.name}}</div>
					</div>
					<div class="grid grid-cols-12 gap-2">
						<div class="col-span-2">Price</div>
						<div class="col-span-10">$ {{item.price}}</div>
					</div>
					<div class="grid grid-cols-12 gap-2">
						<div class="col-span-2">Best</div>
						<div class="col-span-10">{{item.best}}</div>
					</div>
					<div class="grid grid-cols-12 gap-2">
						<div class="col-span-2">Stock</div>
						<div class="col-span-10">{{item.stock}}</div>
					</div>
					<div class="grid grid-cols-12 gap-2">
						<div class="col-span-2">Stars</div>
						<div class="col-span-10">{{item.stars}}</div>
					</div>
				</template>
				</div>
				</div>
			</div>
		</Teleport>
		
	</div>

</div></template>

<script setup>
	import { ref } from 'vue'
	import axios from 'axios'

	const weekClassHover = ref('rounded-md text-center p-1 bg-gray-50 border-b-2 border-gray-300 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-200 cursor-pointer')
	const accessoriesSpin = ref('inline-block accessoriesSpinA absolute')

	const soldItemShow = ref(false)
	const soldItemShowLoading = ref(false)
	const soldItemsAtDay = ref([])

	const soldInWeek = ref([])
	const soldLoading = ref(false)
	const fromDate = ref('')
	const toDate = ref('')
	const best = ref({})
	const bestSold = ref([])

	const getSoldFromTo = async () => {
		soldLoading.value = true
		let start = 0
		let limit = 0
		await axios.all([
  			axios.get('https://sore-pleat-hen.cyclic.app/sold', {params:{date: fromDate.value }}), 
  			axios.get('https://sore-pleat-hen.cyclic.app/sold', {params:{date: toDate.value }})
		])
		.then(axios.spread((data1, data2) => {
			if(data1.data[0].id == 1) start = data1.data[0].id - 1
				else start = data1.data[0].id
  			limit = data2.data[0].id - data1.data[0].id + data2.data.length
  		}))
  		.catch((err) => console.log(err));

  		///////////////////// now final request
		axios.get('https://sore-pleat-hen.cyclic.app/sold', {params:{ _start:start, _limit:limit }})
		.then((res) => {
			soldInWeek.value = res.data
			let names = []
			res.data.forEach((x) => {
				names.push({name: x.item, type:x.type})				
			})

			let mf = 1;
			let m = 0;
			for (let i=0; i<names.length; i++)
			{
		        for (let j=i; j<names.length; j++)
        		{
                	if (names[i].name == names[j].name)
                 	m++;
                	if (mf<m)
                	{
                  	mf=m; 
                  	best.value = names[i];
                	}
        	}
        	m=0;
			}	
				let finalType = ''		
				if(best.value.type == 'accessory') finalType = 'accessories'
				else if(best.value.type == 'laptop') finalType = 'laptops'
				else if(best.value.type == 'monitor') finalType = 'monitors'
				else finalType = 'storage'
				axios({
					baseURL: 'https://sore-pleat-hen.cyclic.app/',
					method: 'get',
					url: finalType,
					params: { name: best.value.name }
				})
				.then((response) => {
					bestSold.value = response.data
					soldLoading.value = false
				})
			})
			.catch((err) => console.log(err.message))
			.finally(()=>{  });
		
	}

	async function displaySoldItem(id, cat){
		soldItemShow.value = true
		soldItemShowLoading.value = true
		let url = ''
		if(cat == 'accessory') url = 'accessories'
		else if(cat == 'storage') url = 'storage'
		else if(cat == 'monitor') url = 'monitors'
		else url = 'laptops'

		await axios({
			baseURL: 'https://sore-pleat-hen.cyclic.app/',
			url: url,
			method: 'get',
			params: { id: id }
		})
		.then((res) => { soldItemsAtDay.value = res.data; soldItemShowLoading.value = false; })
		.catch((err) => console.log(err))		
	}
</script>

<style scoped>
.accessoriesSpinA{	animation: accessoriesSpinFrames 3s linear infinite;	}
@keyframes accessoriesSpinFrames{
	0%{ transform:rotate(-360deg); }
	100%{ transform:rotate(0deg); }
}
.bestCloud{
	background-color: #f2e6ff;
	box-shadow: 32px 32px 22px white inset;
	border-radius: 20px;
	border-bottom: 2px solid #d9d9d9;
	transition: all 0.5s linear;
}
.bestCloud:hover{
	box-shadow: 14px 14px 14px white inset;
}
</style>