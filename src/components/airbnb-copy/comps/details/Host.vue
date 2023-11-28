<template><div class="w-full relative">
<div id="host" v-if='host' class="pt-4 pb-4 pl-6 pr-6 md:pt-6 md:pb-6 md:pl-10 md:pr-10 flex flex-col gap-y-2 md:grid md:grid-cols-2 md:gap-x-10"> 

		<div class="flex flex-col gap-4"> <!-- div 1 -->
			<div class="flex justify-start gap-4 relative">
				<div class="relative">
					<img :src="host.destination.host.hostLogo" class="cursor-pointer w-12 h-12 rounded-full" @click='toHostDetails'>
					<img v-if='host.destination.host.identity == "super"' src="/assets/airbnb/super.png" class="w-5 h-6 absolute right-0 bottom-1">
				</div>				
				<div class="flex flex-col gap-2 items-start">
					<div class="text-2xl self-center font-medium">Hosted by {{host.destination.host.name}}</div>
					<div class="text-sm text-gray-700">joined in {{host.destination.host.joinedDate}}</div>
				</div>
			</div>
			<div class='grid grid-cols-2 gap-4'>
				<div class="flex justify-start gap-4">
					<img src="/assets/airbnb/star_black.png" class="w-5 h-5 self-center">
					<div>{{host.destination.host.reviewsNum}} reviews</div>
				</div>
				<div class="flex justify-start gap-4" v-if='host.destination.host.identity == "verified"'>
					<img src="/assets/airbnb/shield.png" class="w-5 h-5 self-center">					 					
					<div>identity verified</div>
				</div>
				<div class="flex justify-start gap-4" v-if='host.destination.host.identity == "super"'>
					<img src="/assets/airbnb/super-icon.png" class="w-4 h-5 self-center">					 					
					<div>Superhost</div>
				</div>				
			</div>			
			
			
			<div class="long-text"><span v-html='host.destination.host.description'></span></div>
			<div 	v-if='host.destination.host.description.length > 300 && forDescription' 
				class='cursor-pointer border-b border-gray-400 hover:border-gray-800 self-start'
				@click='(e) => {
					e.target.previousElementSibling.classList.remove("long-text")
					forDescription = false
				}'
			>show more</div>



			<div class="flex flex-col gap-2" v-if='host.destination.host.identity == "super"'>
				<div class="text-xl font-semibol">{{host.destination.host.name}} is Superhost</div>
				<div>Superhosts are experienced, highly rated hosts who are committed to providing great stays for guests.</div>										
			</div>
			
			<div v-if='host.destination.host.during != ""' class='text-xl font-semibold'>during your stay</div>
			<div class="long-text">{{host.destination.host.during}}</div>			
			<div 	v-if='host.destination.host.during.length > 300 && forDuring' 
				class='cursor-pointer border-b border-gray-400 hover:border-gray-800 self-start'
				@click='(e) => {
					e.target.previousElementSibling.classList.remove("long-text")
					forDuring = false
				}'
			>show more</div>
		</div> <!-- div 1 -->
 	
 		<div class="flex flex-col gap-2 pt-6"> <!-- div 2 -->
 			<div v-if='host.destination.host.language.length != 0'>Languages: <template v-for='(ln,m) in host.destination.host.language' :key='m'>{{ln}}&nbsp;</template></div>
 			<div>Response Rate: {{host.destination.host.responseRate}} %</div>
 			<div>Response Time: {{host.destination.host.responseTime}}</div>
 			<div 
 				v-if='host.destination.ask.gettingThere[0] != "no"'
 				class="pl-6 pr-6 pt-2 pb-2 mt-6 mb-6 text-center self-start rounded-lg ring-1 ring-gray-700 cursor-pointer bg-white hover:bg-gray-100"
 				@click='loadAskCall'
 			>Contact Host</div>
 			<div class="flex gap-4 self-start"> 				
 				<img src="/assets/airbnb/air-guard.png" class="w-5 h-6 self-center"> 					 				
 				<div class="text-xs">To protect your payment, never transfer money or communicate outside of the Airbnb website or app.</div>
 			</div>
 		</div> <!-- div 2 -->		
	</div> <!-- host -->
	<Teleport to='#air'>
	<Transition>
	<div v-if='contactShow' class="fixedDiv p-2 bg-white shadow-xl flex flex-col gap-y-2 z-50">
		<button 
			@click='contactShow = !contactShow'
			class="flex justify-center items-center w-8 h-8 hover:bg-gray-200 rounded-full cursor-pointer transition-all duration-200"
		>&#9874;</button>		
		<div v-if='askLoading' class="spin flex gap-1"><div></div><div></div><div></div></div>

		<div v-else class='flex flex-col gap-4 md:grid md:grid-cols-12 md:gap-x-2 p-4 overflow-y-scroll scrollStyle hh'>
			<div class="md:col-span-8 flex flex-col gap-y-4 shadow-xl p-4">
				<div class="flex justify-between">
					<div class="flex flex-col gap-2">
						<div class="text-2xl">Contact {{ask.destination.host.name}}</div>
						<div>Typically responds {{ask.destination.host.responseTime}}</div>
					</div>
					<img :src="ask.destination.host.hostLogo" class="w-16 h-16 rounded-full self-center">
				</div>
				<hr>
				<div class="text-xl">Most travelers ask about</div>
<!-- {{ask.destination.ask}} -->
				<div class="flex flex-col gap-y-6 p-6">
					<template v-for='(v,k) in ask.destination.ask' :key='v'>

						<div v-if='k == "gettingThere" && v.length != 0'>
							<div>Getting There</div>
							<ul style='list-style-type: disc;' class='ml-10'>
								<li>
									<span>Check-in time for this home starts at </span>
									<span>{{v[1]}}</span>
									<span v-if='v.length > 2'> and checkout is at </span>
									<span v-if='v.length > 2'>{{v[3]}}</span>
								</li>
							</ul>
						</div>

						<div v-if='k == "house" && v.length != 0'>
							<div>House details and rules</div>
							<ul style='list-style-type: disc;' class='ml-10'>
								<template v-for='(h,j) in ask.destination.ask.house' :key='j'>
									<li>{{h}}</li>
								</template>								
							</ul>
						</div>						

						<div v-if='k == "available" && v.length != 0'>							
							<div>Price and availability</div>
							<ul style='list-style-type: disc;' class='ml-10'>
								<template v-for='(av,k) in ask.destination.ask.available' :key='k'>
									<li v-if='av == "available"'>
										<span>{{ask.destination.host.name}}</span>
										<span>’s home is available from </span>
										<span>{{ monthsEnum[ new Date(ask.destination.checkIn).getMonth() ] }} {{ new Date(ask.destination.checkIn).getDate() }} – {{ monthsEnum[ new Date(ask.destination.checkOut).getMonth() ] }} {{ new Date(ask.destination.checkOut).getDate() }}</span>
										<span>. Book soon.</span>										 
									</li>
									<li v-else>{{av}}</li>
								</template>								
							</ul>
						</div>												
						
					</template>
				</div>

				<hr>

				<div class="text-2xl">Still have questions? Message the Host</div>
				<textarea class='outline-none ring-1 ring-gray-300'></textarea>
				<button class='pl-4 pr-4 pt-2 pb-2 bg-white rounded-lg hover:bg-gray-100 self-start'>Send Message</button>

			</div>
			<div class="hidden md:block md:col-span-4 shadow-xl flex flex-col gap-y-1">
				<div class="flex justify-between p-2">
					<div class="flex flex-col gap-2">
						<div>{{ask.destination.name}}</div>
						<div>{{ask.destination.reviewsNum}} reviews</div>
					</div>
					<img :src="ask.destination.ask.image" class="w-16 h-16 rounded-lg self-center">
				</div>				
					<Rate
						:marker1='ask.destination.checkIn'
						:marker2='ask.destination.checkOut'
						:month1='month1' 	
						:year1='year1'
						:monNumber1='monNumber1' 
						:month2='month2' 	
						:year2='year2'
						:monNumber2='monNumber2' 
						:rent='ask.destination.rent'
						:weekDiscount='ask.destination.weekDiscount'
						:checkIn='inDay'
						:checkOut='outDay'
						:serviceCharges='ask.destination.serviceCharges'
						:hospitalityFee='ask.destination.hospitalityFee'
						:cleaningFee='ask.destination.cleaningFee'
						:nightsLimit='ask.destination.nightsLimit'
						:destinationId='destinationId'
						:type='type'						
					/>				
			</div>
		</div>

	</div>
	</Transition>
	</Teleport>
	
</div></template>

<script setup>
	import { ref, watch, inject } from 'vue'
	import Rate from '/src/components/airbnb-copy/comps/utils/Rate.vue'
	import gql from 'graphql-tag'
	import { useQuery, useLazyQuery } from '@vue/apollo-composable'
	import { useRouter } from 'vue-router'

	const props = defineProps({		destinationId:Number,		type:String,	})

	const forDuring = ref(true)
	const forDescription = ref(true)
	const router = useRouter()	

	const inDay = inject('in')
	const outDay = inject('out')

	const GET_HOST = gql`query getHost($destinationId: ID!, $type: String!) {
  destination(id: $destinationId, type: $type) {
  	ask {
      gettingThere
      house
      available
      image
    }
    host {
    	id
      description
      during
      hostLogo
      identity
      joinedDate
      language
      name
      responseRate
      responseTime
      reviewsNum
    }
  }
}`

	const { result:host, loading:hostLoading } = useQuery(GET_HOST, () => ({
		destinationId: props.destinationId,
		type: props.type
	}))

	const hID = ref(0)

	watch(host, val => {
		hID.value = val.destination.host.id
	})

	const toHostDetails = () => {
		// router.push({name: "hostDetails"})
		window.open(router.resolve({	name: "hostDetails", query: { id:hID.value } }).href, '_blank')
	}

	////////////////////////////////////////// contact
	const contactShow = ref(false)
	const GET_ASK = gql`query ($destinationId: ID!, $type: String!) {
  destination(id: $destinationId, type: $type) {   
    checkIn
    checkOut   
    rent
    name
    reviewsNum
    weekDiscount
    serviceCharges
    hospitalityFee
    cleaningFee
    nightsLimit
    ask {
      gettingThere
      house
      available
      image
    }      
    host {
      name
      hostLogo
      responseTime            
    }
  }
}`

const { result:ask, loading:askLoading, load:loadAsk } = useLazyQuery(GET_ASK, {
	destinationId: props.destinationId,
	type: props.type
})

const monthsEnum = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const month1 = ref('')
const monNumber1 = ref(0)
const year1 = ref(0)
const month2 = ref('')
const monNumber2 = ref(0)
const year2 = ref(0)

watch(ask, val => {
	month1.value = monthsEnum[new Date(inDay.value).getMonth()]
	year1.value = new Date(inDay.value).getFullYear()
	monNumber1.value = new Date(inDay.value).getMonth()

	month2.value = monthsEnum[new Date(inDay.value).getMonth()+1]
	monNumber2.value = new Date(inDay.value).getMonth()+1

	if(monNumber1 == 11) year2.value = new Date(inDay.value).getFullYear()+1
	else year2.value = new Date(inDay.value).getFullYear()
})

const loadAskCall = () => {
	loadAsk()
	console.log(ask)
	contactShow.value = !contactShow.value	
}

	////////////////////////////////////////// contact
</script>

<style scoped>
.fixedDiv{
	position: fixed;
	top: 10%;
	width: 100%;
	height: 90%;
}
.hh{ height:98%;  }
.v-enter-from{ left: 100%; opacity: 0; }
.v-enter-to{ left: 0%; opacity: 1; }
.v-enter-active{ transition: all 0.5s linear;  }
.v-leave-from{ left: 0%; opacity: 1; }
.v-leave-to{ left: 100%; opacity: 0; }
.v-leave-active{ transition: all 0.5s linear;  }

.spin{
  position:fixed;
  top:4%;
  left:50%;
  transform: translate(-4%, -50%);  
}
.spin div{
  width:6px;
  height:6px;
  background-color:#2d404e;
  border-radius: 50%;
}
.spin div:nth-child(1){
  animation: frames1 0.7s 0.3s linear infinite;
}
.spin div:nth-child(2){
  animation: frames1 0.7s 0.5s linear infinite;
}
.spin div:nth-child(3){
  animation: frames1 0.7s 0.7s linear infinite;
}
@keyframes frames1{
  0%{  opacity: 1; }
  100%{  opacity:0; }
}

.long-text{  
   overflow: hidden;
   text-overflow: ellipsis;
   display: -webkit-box;
   line-clamp: 3; 
   -webkit-line-clamp: 3; /* number of lines to show */           
   -webkit-box-orient: vertical;
}
</style>

