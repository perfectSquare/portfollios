<template><div class="p-4 shadow-xl rounded-lg flex flex-col gap-2 sticky top-20 w-full">
	<Transition name='calT'>
	<div v-if='calShow' class="absolute z-50 bg-white pl-2 pt-2 pb-2 pr-8 sm:pr-12 calWidth shadow-2xl origin-top-right">
		<div @click='calShow=false' class="absolute right-1 sm:right-2 text-xl cursor-pointer flex justify-center w-8 hover:bg-gray-100 rounded-full transition-all duration-200">&#9874;</div>
		<Calendars 
			:defaultIn='defaultIn'
			:marker1='marker1'
			:marker2='marker2'
			:month1='month1' 	
			:year1='year1'
			:monNumber1='monNumber1' 
			:checkIn1='inDay' 
			:checkOut1='outDay'
			:month2='month2' 	
			:year2='year2'
			:monNumber2='monNumber2' 
			:checkIn2=0 
			:checkOut2=0
			@inSet='setIn'
			@outSet='setOut'
			@tripSet='setTrip'
			:nightsLimit='nightsLimit'
		/>
	</div>
	</Transition>

	<div class='rentFont'><b class='text-xl'>${{rent}}</b> night</div>	
	
	<table class='rounded-lg shadow-lg ring-1 ring-gray-400 p-2 w-full p-2'>
		<tr class='border-b border-gray-400 p-2' @click='calShow = !calShow'>
			<td  class='border-r border-gray-400 p-2'>
				<div class="w-full flex flex-col cursor-pointer"> <!-- click -->
				<div class='checks'>CHECK-IN</div>
				<div class="text-xs">
					<span v-if='inDay != ""'>{{new Date(inDay).getDate()}} {{ monthsEnum[ new Date(inDay).getMonth() ] }} {{ new Date(inDay).getFullYear() }} </span>
				</div>
			</div>
			</td>
			<td class="p-2">
				<div class="w-full flex flex-col cursor-pointer"> <!-- click -->
				<div class='checks'>CHECK-OUT</div>
				<div class="text-xs">
					<span v-if='outDay != ""'>{{new Date(outDay).getDate()}} {{ monthsEnum[ new Date(outDay).getMonth() ] }} {{ new Date(outDay).getFullYear() }} </span>
				</div>
			</div>
			</td>
		</tr>
		<tr>			
			<td class="p-1" colspan="2">
				<div class="self-center w-full flex  p-1 relative cursor-pointer w-full" @click='upDownClick'> <!-- click -->
					<div>
						<span class='checks'>GUESTS</span><br><span class="text-sm">
							{{howManyChilds + howManyGuests}} guest<span v-if='howManyInfants != 0'>, {{howManyInfants}} infants</span>
						</span>						
					</div>
					<img ref='upDownRef' :src="upDown" class="absolute self-center right-2">					
				</div>
			</td>
		</tr>						
	</table>
	<!-- guest details -->
	<Transition> 	
	<div v-if='guestsShow'>
		<div v-if='guests && guests.destination.guests' class="relative p-4 w-full origin-top flex flex-col gap-4 bg-white shadow-xl">	
			<div class="flex justify-between"> <!-- adults -->
				<div class="flex flex-col">
					<div class="text-sm">Adults</div>
					<div class="text-gray-500 text-xs">Age 13+</div>
				</div>
				<div class="flex justify-center gap-1"> 
					<button 
						@click='(e) => {														
							if(howManyGuests <= 1){								
								e.target.classList.add("cursor-not-allowed")
								e.target.classList.remove("cursor-pointer", "hover:ring-gray-600")
								return	
							} 			
							e.target.nextElementSibling.nextElementSibling.classList.remove("cursor-not-allowed")
							e.target.nextElementSibling.nextElementSibling.classList.add("cursor-pointer", "hover:ring-gray-600")
							howManyGuests--
						}' 
						class="flex cursor-not-allowed justify-center items-center w-6 h-6 ring-1 ring-gray-200 rounded-full"
					>-</button>
					<button class="flex justify-center text-xs items-center w-6 h-6">{{howManyGuests}}</button>					
					<button
						@click='(e) => {						
							if(howManyChilds + howManyGuests >= guests.destination.guests.adults){																
								e.target.classList.add("cursor-not-allowed")
								e.target.classList.remove("cursor-pointer", "hover:ring-gray-600")
								return
							} 
							e.target.previousElementSibling.previousElementSibling.classList.remove("cursor-not-allowed")
							e.target.previousElementSibling.previousElementSibling .classList.add("cursor-pointer", "hover:ring-gray-600")
							howManyGuests++							
						}' 					 
						class="flex justify-center cursor-pointer items-center w-6 h-6 ring-1 ring-gray-200 hover:ring-gray-600 rounded-full"
					>+</button>
				</div> 
			</div> <!-- adults -->
			<div class="flex justify-between"> <!-- childs -->
				<div class="flex flex-col">
					<div class="text-sm">Children</div>
					<div class="text-gray-500 text-xs">Age 2-12</div>
				</div>
				<div class="flex justify-center gap-1"> 
					<button 
						@click='(e) => {							
							if(howManyChilds <= 0){
								e.target.classList.add("cursor-not-allowed")
								e.target.classList.remove("cursor-pointer", "hover:ring-gray-600")
								return
							} 
							e.target.nextElementSibling.nextElementSibling.classList.remove("cursor-not-allowed")
							e.target.nextElementSibling.nextElementSibling.classList.add("cursor-pointer", "hover:ring-gray-600")
							howManyChilds--
						}' 
						class="flex cursor-pointer justify-center items-center w-6 h-6 ring-1 ring-gray-200 hover:ring-gray-600 rounded-full"
					>-</button>
					<button class="flex justify-center text-xs items-center w-6 h-6">{{howManyChilds}}</button>					
					<button
						@click='(e) => {
							if(howManyChilds + howManyGuests >= guests.destination.guests.adults){
								e.target.classList.add("cursor-not-allowed")
								e.target.classList.remove("cursor-pointer", "hover:ring-gray-600")
								return
							} 
							e.target.previousElementSibling.previousElementSibling.classList.remove("cursor-not-allowed")
							e.target.previousElementSibling.previousElementSibling .classList.add("cursor-pointer", "hover:ring-gray-600")
							howManyChilds++							
						}' 					 
						class="flex justify-center cursor-pointer items-center w-6 h-6 ring-1 ring-gray-200 hover:ring-gray-600 rounded-full"
					>+</button>
				</div> 
			</div> <!-- childs -->
			<div class="flex justify-between"> <!-- infants -->
				<div class="flex flex-col">
					<div class="text-sm">Infants</div>
					<div class="text-gray-500 text-xs">Under 2</div>
				</div>
				<div class="flex justify-center gap-1"> 
					<button 
						@click='(e) => {							
							if(howManyInfants <= 0){
								e.target.classList.add("cursor-not-allowed")
								e.target.classList.remove("cursor-pointer", "hover:ring-gray-600")
								return
							} 
							e.target.nextElementSibling.nextElementSibling.classList.remove("cursor-not-allowed")
							e.target.nextElementSibling.nextElementSibling.classList.add("cursor-pointer", "hover:ring-gray-600")
							howManyInfants--
						}' 
						class="flex cursor-pointer justify-center items-center w-6 h-6 ring-1 ring-gray-200 hover:ring-gray-600 rounded-full"
					>-</button>
					<button class="flex justify-center text-xs items-center w-6 h-6">{{howManyInfants}}</button>					<button
						@click='(e) => {
							if(howManyInfants >= guests.destination.guests.infant){
								e.target.classList.add("cursor-not-allowed")
								e.target.classList.remove("cursor-pointer", "hover:ring-gray-600")
								return
							} 
							e.target.previousElementSibling.previousElementSibling.classList.remove("cursor-not-allowed")
							e.target.previousElementSibling.previousElementSibling .classList.add("cursor-pointer", "hover:ring-gray-600")
							howManyInfants++							
						}' 					 
						class="flex justify-center cursor-pointer items-center w-6 h-6 ring-1 ring-gray-200 hover:ring-gray-600 rounded-full"
					>+</button>
				</div> 
			</div> <!-- infants -->
			<div v-if='guests.destination.guests.pets != 0' class="flex justify-between"> <!-- Pets -->
				<div class="flex flex-col">
					<div class="text-sm">Pets</div>
					<div 
						class="text-gray-500 hover:text-gray-700 text-xxs cursor-pointer border-b border-gray-400"
						@click='petsServiceShow = !petsServiceShow'
					>Bringing a service animal?
					</div>
					<Transition>			
					<div v-if='petsServiceShow' class="fixed petsWidth flex flex-col gap-4 p-4 origin-bottom-left lg:origin-bottom-right bg-white shadow-xl rounded-xl z-50">
						<div class="sticky top-2 -left-8 flex justify-center items-center w-6 h-6 hover:bg-gray-200 cursor-pointer rounded-full" @click='petsServiceShow = !petsServiceShow'>&#9874;</div>
						<div class="overflow-y-scroll h-full w-full p-2 flex flex-col gap-2">
							<img src="https://a0.muscache.com/pictures/adafb11b-41e9-49d3-908e-049dfd6934b6.jpg" class="">
							<div></div>
							<div class="text-2xl">Service animals</div>
							<div>Service animals aren’t pets, so there’s no need to add them here.</div>
							<div></div>
							<div>Traveling with an emotional support animal? Check out our</div>
							<a class='border-b border-gray-400 self-start' href="https://www.airbnb.com/help/article/1869/accessibility-policy" target="_blank">accessibility policy.</a>
						</div>
					</div>
					</Transition>
				</div>
				<div class="flex justify-center gap-1"> 
					<button 
						@click='(e) => {							
							if(howManyPets <= 0){
								e.target.classList.add("cursor-not-allowed")
								e.target.classList.remove("cursor-pointer", "hover:ring-gray-600")
								return
							} 
							e.target.nextElementSibling.nextElementSibling.classList.remove("cursor-not-allowed")
							e.target.nextElementSibling.nextElementSibling.classList.add("cursor-pointer", "hover:ring-gray-600")
							howManyPets--
						}' 
						class="flex cursor-pointer justify-center items-center w-6 h-6 ring-1 ring-gray-200 hover:ring-gray-600 rounded-full"
					>-</button>
					<button class="flex justify-center text-xs items-center w-6 h-6">{{howManyPets}}</button>					<button
						@click='(e) => {
							if(howManyPets >= guests.destination.guests.pets){
								e.target.classList.add("cursor-not-allowed")
								e.target.classList.remove("cursor-pointer", "hover:ring-gray-600")
								return
							} 
							e.target.previousElementSibling.previousElementSibling.classList.remove("cursor-not-allowed")
							e.target.previousElementSibling.previousElementSibling .classList.add("cursor-pointer", "hover:ring-gray-600")
							howManyPets++							
						}' 					 
						class="flex justify-center cursor-pointer items-center w-6 h-6 ring-1 ring-gray-200 hover:ring-gray-600 rounded-full"
					>+</button>
				</div> 
			</div> <!-- Pets -->
			<div v-else class="flex justify-between"> <!-- Pets 0 -->
				<div class="flex flex-col">
					<div class="text-sm">Pets</div>
					<div 
						class="text-gray-500 hover:text-gray-700 text-xxs cursor-pointer border-b border-gray-400"
						@click='petsServiceShow = !petsServiceShow'
					>Bringing a service animal?</div>
					<Transition>			
					<div v-if='petsServiceShow' class="fixed petsWidth flex flex-col gap-4 p-4 origin-bottom-left lg:origin-bottom-right bg-white shadow-xl rounded-xl z-50">
						<div class="sticky top-2 -left-8 flex justify-center items-center w-6 h-6 hover:bg-gray-200 cursor-pointer rounded-full" @click='petsServiceShow = !petsServiceShow'>&#9874;</div>
						<div class="overflow-y-scroll h-full w-full p-2 flex flex-col gap-2">
							<img src="https://a0.muscache.com/pictures/adafb11b-41e9-49d3-908e-049dfd6934b6.jpg" class="">
							<div></div>
							<div class="text-2xl">Service animals</div>
							<div>Service animals aren’t pets, so there’s no need to add them here.</div>
							<div></div>
							<div>Traveling with an emotional support animal? Check out our</div>
							<a class='border-b border-gray-400 self-start' href="https://www.airbnb.com/help/article/1869/accessibility-policy" target="_blank">accessibility policy.</a>
						</div>
					</div>
					</Transition>					
				</div>
				<div class="flex justify-center gap-1"> 
					<button class="flex cursor-not-allowed justify-center items-center w-6 h-6 ring-1 ring-gray-200 rounded-full">-</button>					
					<button class="flex justify-center text-xs items-center w-6 h-6">{{howManyPets}}</button>					
					<button	class="flex justify-center cursor-not-allowed items-center w-6 h-6 ring-1 ring-gray-200 rounded-full">+</button>
				</div> 
			</div> <!-- Pets 0 -->
			<div class="text-gray-700 text-xs"> <!-- description -->
				{{guests.destination.guests.description}}
			</div> <!-- description -->
			<div 
				class="absolute self-center right-2 bottom-2 cursor-pointer border-b border-transparent hover:border-gray-500" 
				@click='closeClick'
			>close</div>
		</div>
	</div>
	</Transition>
	<!-- guest details -->

	<div 
		class="rounded-lg pl-4 pr-4 pt-2 pb-2 w-full text-center cursor-pointer"
		:class='[ luxi ? "bgReserveLux" : "bgReserve" ]'
	>Reserve</div>
	<div class="text-sm text-center">You won't be charged yet</div>

	<!-- rate demo -->
	<div class="flex justify-between p-1 w-full text-sm relative">
		<div 
			class="border-b border-gray-400 cursor-pointer" 
			@click='perDayShow = !perDayShow'
			>
			$ {{rent}} x {{nights}} nights
		</div>
		<div>$ {{rent * nights}}</div>
		<Transition>
		<div 
			v-if='perDayShow' 
			class="overflow-y-scroll scrollStyle z-50 bg-white p-6 shadow-2xl rounded-lg origin-bottom-right fixed datesMoreCSS flex flex-col gap-4"
			:class='[ dates.length > 8 ? "h-3/4" : "h-1/2" ]'
		>
			<div class="flex justify-center gap-2 sticky top-0 bg-white shadow-lg p-2">
				<div class="cursor-pointer absolute left-4 flex justify-center items-center rounded-full hover:bg-gray-100 w-8 h-8 p-2 transition-all duration-300" @click='perDayShow = !perDayShow'>&#9874;</div>
				<div class="p-1"><b>Base Price Breakdown</b></div>
			</div>			
						
			<template v-for='k in dates' :key='k'>
				<div class="flex justify-between">
					<div>{{k}}</div>
					<div>$ {{rent}}</div>
				</div>				
			</template>			
			<hr>
			<div class="flex justify-between">
				<div> <b>Total Base Price</b> </div>
				<div>${{rent*nights}}</div>
			</div>
		</div>
		</Transition>
	</div> <!-- rate demo -->	

	<!-- week discount -->
	<div v-if='weekDiscount != 0' class="flex justify-between p-1 text-sm relative">
		<div class="border-b border-gray-400 cursor-pointer" @click='weekDiscountShow = !weekDiscountShow'>
			weekly discount
		</div>
		<div class="text-green-900">-${{weekDiscount}}</div>				
		<Transition>
		<div v-if='weekDiscountShow' class="flex justify-center origin-bottom-right gap-4 bg-white p-4 shadow-2xl rounded-lg absolute servicesMoreCSS">
			<div class="self-center absolute left-2 cursor-pointer hover:rounded-full hover:bg-gray-100 p-1 transition-all duration-300" @click='weekDiscountShow = !weekDiscountShow'>&#9874;</div>
			<div class="self-center p-6 text-cente text-xs text-gray-500 w-full">Patricia’s place has weekly discounts for stays longer than 7 days.</div>
		</div>
		</Transition>		
	</div> <!-- week discount -->

	<!-- hospitality fee -->
	<div v-if='hospitalityFee != 0' class="flex justify-between p-1 text-sm relative">
		<div class="border-b border-gray-400 cursor-pointer" @click='hospitalityFeeShow = !hospitalityFeeShow'>
			Hospitality fee
		</div>
		<div>${{hospitalityFee}}</div>				
		<Transition>
		<div v-if='hospitalityFeeShow' class="flex justify-center origin-bottom-right gap-4 bg-white p-4 shadow-2xl rounded-lg absolute servicesMoreCSS">
			<div class="self-center absolute left-2 cursor-pointer hover:rounded-full hover:bg-gray-100 p-1 transition-all duration-300" @click='hospitalityFeeShow = !hospitalityFeeShow'>&#9874;</div>
			<div class="self-center p-6 text-cente text-xs text-gray-500 w-full">This fee covers: services that come with the property.</div>
		</div>
		</Transition>		
	</div> <!-- hospitality fee -->

	<!-- services -->
	<div class="flex justify-between p-1 text-sm relative">
		<div class="border-b border-gray-400 cursor-pointer" @click='servicesShow = !servicesShow'>
			service fee
		</div>
		<div>${{serviceCharges}}</div>				
		<Transition>
		<div v-if='servicesShow' class="flex justify-center origin-bottom-right gap-4 bg-white p-4 shadow-2xl rounded-lg absolute servicesMoreCSS">
			<div class="self-center absolute left-2 cursor-pointer hover:rounded-full hover:bg-gray-100 p-1 transition-all duration-300" @click='servicesShow = !servicesShow'>&#9874;</div>
			<div class="self-center p-6 text-cente text-xs text-gray-500 w-full">The service fee, which the host has decided to pay, helps us run our platform and offer services like 24/7 support on your trip.</div>
		</div>
		</Transition>		
	</div> <!-- services -->
	<hr>
	<!-- cleaning -->
	<div v-if='cleaningFee != 0' class="flex justify-between p-1 text-sm relative">
		
		<div class="border-b border-gray-400 cursor-pointer" @click='cleaningShow = !cleaningShow'>
			cleaning fee
		</div>
		<div >${{cleaningFee}}</div>		
		<Transition>
		<div v-if='cleaningShow' class="flex justify-center origin-bottom-right gap-4 bg-white p-4 shadow-2xl rounded-lg absolute servicesMoreCSS">
			<div class="self-center absolute left-2 cursor-pointer hover:rounded-full hover:bg-gray-100 p-1 transition-all duration-300" @click='cleaningShow = !cleaningShow'>&#9874;</div>
			<div class="self-center p-6 text-cente text-xs text-gray-500 w-full">One-time fee charged by host to cover the cost of cleaning their space.</div>
		</div>
		</Transition>
	</div> <!-- ceaning -->
	<hr>
	<div class="flex justify-between p-1 text-sm relative">
		<div><b>Total before taxes</b></div>
		<div v-if='weekDiscount != 0'>${{ (rent * nights) + serviceCharges + cleaningFee - weekDiscount }}</div>
		<div v-else>${{ (rent * nights) + serviceCharges + cleaningFee + hospitalityFee }}</div>
	</div>


</div></template>

<script setup>
	import { ref, computed, inject, watch } from 'vue'
	import Calendars from '/src/components/airbnb-copy/comps/utils/Calendars.vue'
	import { useQuery } from '@vue/apollo-composable'
	import gql from 'graphql-tag'	
	const props = defineProps({	
		marker1:String,
		marker2:String,	
		rent: Number,	
		checkIn: String,
		checkOut: String,
		serviceCharges: Number,
		hospitalityFee:Number,
		weekDiscount: Number,
		cleaningFee: Number,
		destinationId:Number,
		type:String,
		month1: String,
		year1: Number,
		monNumber1: Number,
		month2: String,
		year2: Number,
		monNumber2: Number,
		nightsLimit:Number,
	})

	const GET_GUESTS_DETAILS = gql`query getGuests($destinationId: ID!, $type: String!) {
  destination(id: $destinationId, type: $type) {  	
  	luxi
  	nightsLimit
    guests {
      adults
      child
      description
      infant
      pets
    }
  }
}`
 	///////////////////////////// guests query
	const { result:guests, loading:guestsLoading } = useQuery(GET_GUESTS_DETAILS, () => ({
		"destinationId": props.destinationId,
  		"type": props.type
	}))

	const luxi = ref(false)
	watch(guests, val => {
		luxi.value = val.destination.luxi
	})
	///////////////////////////// guests query	

	///////////////////////////// guests variables
	const howManyGuests = ref(1)	
	const howManyChilds = ref(0)
	const howManyInfants = ref(0)
	const howManyPets = ref(0)
	const petsServiceShow = ref(false)
	///////////////////////////// guests variables

	////////////////////// in and out set
	const inDay = inject('in')
	const outDay = inject('out')
	const nights = inject('trip')
	const defaultIn = inject('defIn')
	const monthsEnum = ref(['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'])
	// const defaultIn = ref(true)
	const setIn = x => {
		inDay.value = x
		// defaultIn.value = false
	} 
	const setOut = (x,y) => { 
		outDay.value = x 
		nights.value = y
	}
	////////////////////// in and out set

	const upDownRef = ref(null)
	const upDown = ref('/assets/airbnb/down.png')
	const perDayShow = ref(false)
	const servicesShow = ref(false)
	const cleaningShow = ref(false)
	const calShow = ref(false)
	const guestsShow = ref(false)
	const weekDiscountShow = ref(false)
	const hospitalityFeeShow = ref(false)

	const upDownClick = (e) => {
		if(upDown.value == '/assets/airbnb/down.png') upDown.value =  '/assets/airbnb/up.png'
		else upDown.value =  '/assets/airbnb/down.png'
		guestsShow.value = !guestsShow.value
	}			

	const closeClick = (e) => {		
		guestsShow.value = false
		upDown.value =  '/assets/airbnb/down.png'
	}
	
	const dates = computed(() => {
		for(var arr=[],dt=new Date(props.checkIn); dt<new Date(props.checkOut); dt.setDate(dt.getDate()+1)){
			let d = new Date(dt).getDate()
			let m = new Date(dt).getMonth()
			let y = new Date(dt).getFullYear()
        	arr.push(d + '/' + m + '/' + y);
    	}
    	return arr;	
	})

	

</script>

<style scoped>
	.rentFont{ font-family:'Glory';  }
	.checks{ font-size: 8px;  }
	.bgReserve{ background-color:#ff0066; color: white;  }
	.bgReserveLux{ background-color:#485375; color: white;  }

	.v-enter-from{ transform:scale(0,0); opacity:0;  }
	.v-enter-to{ transform:scale(1,1); opacity:1; }
	.v-enter-active{  transition: all 0.3s linear;  }

	.v-leave-from{ transform:scale(1,1); opacity:1; }
	.v-leave-to{ transform:scale(0,0); opacity:0; }
	.v-leave-active{  transition: all 0.3s linear;  }

	.calT-enter-from{ transform:scale(0,0);  opacity:0;  }
	.calT-enter-to{ transform:scale(1,1); opacity:1;  }
	.calT-enter-active{  transition: all 0.3s linear;  }

	.calT-leave-from{ transform:scale(1,1); opacity:1;  }
	.calT-leave-to{ transform:scale(0,0); opacity:0; }
	.calT-leave-active{  transition: all 0.3s linear;  }	

	.calWidth{		width: 230%;		right: 100%;	}
	.servicesMoreCSS{ width:200%; right:52%; bottom:95%;  }
	.datesMoreCSS{ width:80%; top:10%; right:5%;  }
	.petsWidth{ 
		width:60%; 
		height:90%;  
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
	}

	@media screen and (max-width: 1024px){
		.calWidth{		width: 98%;	 top: 30%;	right: 2%;	}
		.petsWidth{ width:80%; height:80%; }
	}

</style>