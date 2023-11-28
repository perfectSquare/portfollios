<template><div class='p-2 flex flex-col gap-2'>
	
	<div class="flex flex-col md:flex-row items-center gap-2">
		<div class="bg-gray-200 p-2 rounded-md flex gap-1">
			<div>Sale for </div>
			<input type="date" v-model.lazy='atDay' @change='getSaleAtDate'>
		</div>
		<div :class="weekClassHover" @click='weekFetch(0,7)'>week 1</div>
		<div :class="weekClassHover" @click='weekFetch(7,7)'>week 2</div>
		<div class="text-xs p-2">remain within May 1 to May 15</div>
	</div>

	<!-- one week -->
	<div v-if='weekShow' class="p-2 bg-white salesBox ring-1 ring-gray-400 rounded-md flex flex-col items-center gap-2"> 
		<div v-if='weekLoading'><img src="/assets/dashboard/spin.png" :class="accessoriesSpin"></div>
		<div v-else class='p-2 self-center w-full flex flex-col justify-center border-b-2 border-gray-200'>
		<template v-for='(sale,i) in weekSale' :key='i'>
			<div class="grid grid-cols-12 gap-2">
				<div class="col-span-6">Sale</div>
				<div class="col-span-6">$ {{sale.sale}}</div>
			</div>
			<div class="grid grid-cols-12 gap-2">
				<div class="col-span-6">Items Sold</div>
				<div class="col-span-6">{{sale.howMany}}</div>
			</div>
			<div class="grid grid-cols-12 gap-2">
				<div class="col-span-6">Profit</div>
				<div class="col-span-6">$ {{sale.profit}}</div>				
			</div>
			<div class="grid grid-cols-12 gap-2">
				<div class="col-span-6">Expenses</div>
				<div class="col-span-6">$ {{sale.expenses}}</div>
			</div>
		</template>		
		</div>

		<div class="flex flex-col md:grid md:grid-cols-2 gap-y-6 gap-x-2 w-full">
			<div class="p-1 self-center relative"> <!-- sales graph -->
				<Ch
				:chartData= "{
        			labels: daysSmall,
        			datasets: [{ 
        				data: weekHisto,
        				label:'Sales',
        				backgroundColor:['#62dfad'],  
        				borderColor:['#62dfad'],
        				borderWidth:3,          
        				barThickness:15,
        				categoryPercentage:3
        			}]
      			}"
				/>									
			</div> <!-- sales graph -->

			<div class="p-1 self-center relative flex flex-col gap-y-2 w-3/4 md:w-full"> <!-- items sold -->
				<div class="absolute -top-8 bg-d1 text-white p-1 text-xs rounded-md">Items Sold</div>
			<template v-for='(sale,i) in weekSaleAll' :key='i'>
				<div class="w-full p-1 h-4 rounded-xl bg-gray-100 relative">
					<div class="absolute right-0 bottom-0 self-center z-20 bg-d1 text-white text-xs p-0.5 rounded-xl">{{ daysSmall[new Date(sale.date).getDay()] }}</div>
					<div class="h-2 rounded-xl bg-blue-200 relative" :class='{"w0S": sale.howMany==8, "w1S": sale.howMany==1, "w2S": sale.howMany==2, "w3S": sale.howMany==3, "w4S": sale.howMany==4, "w5S": sale.howMany==5, "w6S": sale.howMany==6, "w7S": sale.howMany==7, "w8S": sale.howMany==8, "w9S": sale.howMany==9, "w10S": sale.howMany==10, "w11S": sale.howMany==11, "w12S": sale.howMany==12, "w13S": sale.howMany==13, "w14S": sale.howMany==14, "w15S": sale.howMany==15, "w16S": sale.howMany==16, "w17S": sale.howMany==17, "w18S": sale.howMany==18, "w19S": sale.howMany==19, "w20S": sale.howMany==20}'>
						<div class="absolute bottom-2 ls text-xs">{{sale.howMany}}</div>
					</div>					
				</div>
			</template>
			</div> <!-- items sold -->

			<div class="p-1 self-center relative flex justify-center gap-y-2 w-3/4 md:w-full"> <!-- profit -->
				<div class="absolute -top-6 bg-d1 text-white p-1 text-xs rounded-md">Profits</div>
				<PiCh
				    :chartData= "{
        				labels: daysSmall,
        				datasets: [{
            				backgroundColor: ['#41B883', '#273949', '#833bbf', '#1a4675', '#adc9dd', '#ffff99', 'red'],
            				data: weekProfits
          				}]
				    }"
				/>
			</div><!-- profit -->

			<div class="p-1 self-center relative flex justify-center gap-y-2 w-3/4 md:w-full"> <!-- expenses -->
				<LineCh 
					:chartData = "{
        				labels: daysSmall,
        				datasets: [
          				{
            				label: 'Expenses',
            				backgroundColor: '#cc99ff',
            				data: weekExpenses
          				}
        				]
      				}"
				/>
			</div><!-- expenses -->
			
		</div>

	</div> <!-- one week -->

	<!-- one day -->
	<div v-if='singleShow' class="p-4 bg-white salesBox ring-1 ring-gray-400 rounded-md grid grid-cols-1 gap-1">
		<div v-if='singleShow' class="p-2 border-b-2 border-gray-200"><span>Sale for</span>&nbsp;&nbsp;&nbsp;<span class='text-xl'>{{ days[new Date(atDay).getDay()] }}, {{ months[new Date(atDay).getMonth()] }}&nbsp;&nbsp;{{ new Date(atDay).getFullYear() }}</span></div>
		<div v-if='atDayLoading'><img src="/assets/dashboard/spin.png" :class="accessoriesSpin"></div>
		<div v-else>
		<template v-for='(sale,i) in saleAtDate' :key='i'>
			<div class="grid grid-cols-12 gap-2">
				<div class="col-span-4">Sale</div>
				<div class="col-span-8">$ {{sale.sale}}</div>
			</div>
			<div class="grid grid-cols-12 gap-2">
				<div class="col-span-4">Items Sold</div>
				<div class="col-span-8">{{sale.howMany}}</div>
			</div>
			<div class="grid grid-cols-12 gap-2">
				<div class="col-span-4">Profit</div>
				<div class="col-span-8">$ {{sale.profit}}</div>				
			</div>
			<div class="grid grid-cols-12 gap-2">
				<div class="col-span-4">Expenses</div>
				<div class="col-span-8">$ {{sale.expenses}}</div>
			</div>
		</template>		
		</div>

		<div class="p-2 grid grid-cols-2 gap-2 ring-1 ring-gray-200 relative mt-8"> <!-- items sold -->
			<div class="absolute -top-6 bg-d1 text-white p-1 text-xs rounded-md">sold items</div>
			<template v-for='(item,l) in itemsAtDate' :key='l'>
				<div :class="soldItemClass" @click='displaySoldItem(item.soldId, item.type)'>{{item.item}}</div>
			</template>			
		</div> <!-- items sold -->
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

	</div>	<!-- one day -->

</div></template>

<script setup>
	import { ref } from 'vue'
	import axios from 'axios'
	import Ch from '/src/components/dashboard/comps/Ch.vue'
	import PiCh from '/src/components/dashboard/comps/PiCh.vue'
	import LineCh from '/src/components/dashboard/comps/LineCh.vue'

	const accessoriesSpin = ref('inline-block accessoriesSpinA absolute')
	const baseClass = ref('border-2 border-gray-400 w-16 relative')
	const soldItemClass = ref('border-b-2 text-sm bg-gray-100 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-300 hover:border-gray-400 cursor-pointer rounded-md p-2 border-transparent transition-all duration-100')

	//////////////// for day
	const soldItemShow = ref(false)
	const soldItemShowLoading = ref(false)
	const soldItemsAtDay = ref([])
	const atDay = ref('')
	const atDayLoading = ref(false)
	const singleShow = ref(false)
	const saleAtDate = ref({})
	const itemsAtDate = ref({})
	const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
	const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

	async function getSaleAtDate(){
		atDayLoading.value = true
		singleShow.value = true
		weekShow.value = false
		await axios.get('https://sore-pleat-hen.cyclic.app/sales', {params:{ date:atDay.value }})
		.then((res) => {saleAtDate.value = res.data; atDayLoading.value = false;})
		.catch((err) => console.log(err))

		await axios.get('https://sore-pleat-hen.cyclic.app/sold', {params:{ date:atDay.value }})
		.then((res) => {itemsAtDate.value = res.data; atDayLoading.value = false; })
		.catch((err) => console.log(err))		
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
	//////////////// for day	
/////////////////////////////////////////////////////////////////////////////////////////////

	//////////////// for week
	const weekShow = ref(false)
	const daysSmall = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
	const weekLoading = ref(false)
	const weekClassHover = ref('rounded-md p-1 bg-gray-50 border-b-2 border-gray-300 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-300 cursor-pointer')
	const histo = ref('bg-green-200 w-4 h-16')
	const weekHisto = ref([])
	const weekProfits = ref([])
	const weekExpenses = ref([])
	const weekSale = ref([])
	const weekSaleAll = ref([])

	const weekFetch = async (start, limit) => {
		weekShow.value = true
		singleShow.value = false
		weekLoading.value = true
		await axios({
			baseURL: 'https://sore-pleat-hen.cyclic.app/sales',
			method: 'get',
			params: {				
				_start: start,
				_limit: limit
			}
		})
		.then((res) =>{
			weekSaleAll.value = res.data

			let arr = []
			res.data.forEach((x) => {
				arr.push(x.sale)
			})
			weekHisto.value = arr

			let arr1 = []
			res.data.forEach((x) => {
				arr1.push(x.profit)
			})
			weekProfits.value = arr1

			let arr2 = []
			res.data.forEach((x) => {
				arr2.push(x.expenses)
			})
			weekExpenses.value = arr2

			let sale = 0; res.data.forEach(x => sale += x.sale )
			let sold = 0; res.data.forEach(x => sold += x.howMany )
			let profit = 0; res.data.forEach(x => profit += x.profit )
			let expense = 0; res.data.forEach(x => expense += x.expenses )

			weekSale.value = [{
				sale: sale,
				howMany: sold,
				profit: profit,
				expenses: expense
			}]
			weekLoading.value = false
		})
		.catch((err) => console.log(err))
	}
	//////////////// for week


	
</script>

<style scoped>
.salesBox{	box-shadow:2px 2px 2px #e2e3e9;	}
.accessoriesSpinA{	animation: accessoriesSpinFrames 3s linear infinite;	}
@keyframes accessoriesSpinFrames{
	0%{ transform:rotate(-360deg); }
	100%{ transform:rotate(0deg); }
}
.w0S{ width:0%; } 
.w1S{ width:5%; } 
.w2S{ width:10%; } 
.w3S{ width:15%; } 
.w4S{ width:20%; } 
.w5S{ width:25%; } 
.w6S{ width:30%; } 
.w7S{ width:35%; } 
.w8S{ width:40%; } 
.w9S{ width:45%; } 
.w10S{ width:50%; } 
.w11S{ width:55%; } 
.w12S{ width:60%; } 
.w13S{ width:65%; } 
.w14S{ width:70%; } 
.w15S{ width:75%; } 
.w16S{ width:80%; } 
.w17S{ width:85%; } 
.w18S{ width:90%; } 
.w19S{ width:95%; } 
.w20S{ width:100%; } 

.ls{ left:90%; }

.tsItem{ text-shadow: 1px 1px 2px black; }

</style>