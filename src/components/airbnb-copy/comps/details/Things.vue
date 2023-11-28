<template><div class="w-full relative">
	<div v-if='rules' class="pt-4 pb-4 pl-6 pr-6 md:pt-6 md:pb-6 md:pl-10 md:pr-10 flex flex-col gap-4"> 
		<div class="text-2xl font-medium">Things to know</div>
		<div class="flex flex-col gap-4 md:grid md:grid-cols-2 md:gap-4 lg:grid-cols-3">			
			<!-- rules -->
			<div class="flex flex-col gap-2 self-start ring-1 ring-gray-100 rounded-lg h-full p-4"> 				
				<div class="font-medium">House Rules</div>
				<template v-for='(rule,i) in rules.destination.rules.rules' :key='i'>
					<div class="flex gap-2">						
						<img :src="`/assets/airbnb/${rule.logo}.png`" class="w-4 h-4 self-center">						
						<div v-if='rule.more != "not"'>{{rule.about}}</div>
						<div v-else><del>{{rule.about}}</del></div>
					</div>
				</template>
				<div 
					v-if='rules.destination.rules.additional.length != 0'
					class='border-b-2 border-transparent hover:border-gray-500 self-start cursor-pointer'
					@click='moreRules = !moreRules'
				>show more</div>
				<Teleport to='#air'>
					<Transition>
						<div 
							v-if='moreRules' 
							class="fixedDivRelay z-50 p-6 flex flex-col gap-4 justify-start"
							@click.self='moreRules = !moreRules' 
						>
						<div class='flex flex-col gap-2 relayWid self-center p-6 bg-white shadow-xl w-3/4 rounded-2xl'>
							<div 
								@click='moreRules = !moreRules' 
								class="flex justify-center items-center w-6 h-6 hover:bg-gray-200 rounded-full cursor-pointer transition-all duration-200"
							>&#9874;</div>
							<div class="">House Rules</div>
							<div class="flex flex-col gap-2 overflow-y-scroll scrollStyle h-f">
								<template v-for='(rule,i) in rules.destination.rules.rules' :key='i'>
									<div class="flex gap-2">						
									<img :src="`/assets/airbnb/${rule.logo}.png`" class="w-4 h-4 self-center">						
									<div v-if='rule.more != "not"'>{{rule.about}}</div>
									<div v-else><del>{{rule.about}}</del></div>
								</div>
								</template>
								<br>
								<div class="text-2xl font-semibold">Additional Rules</div>
								<br>
								<template v-for='(ad,i) in rules.destination.rules.additional' :key='i'>
									<div><span v-html='ad'></span></div>																	
								</template>								
							</div>
						</div>													
							
						</div>
					</Transition>
				</Teleport>				
			</div> <!-- rules -->	

			<div class="flex flex-col gap-2 self-start ring-1 ring-gray-100 rounded-lg h-full p-4"> <!-- safety -->				
				<div class="font-medium">Health and Safety</div>
				<div class="flex justify-start gap-4">
					<img src="/assets/airbnb/mark.png" class='w-4 self-center'>
					<div>Airbnb's COVID-19 safety practices apply</div>															
				</div>				
				<template v-for='(safe,i) in rules.destination.rules.safety' :key='i'>
					<div class="flex gap-2">						
						<img :src="`/assets/airbnb/${safe.logo}.png`" class="w-4 h-4 self-center">						
						<div v-if='safe.more != "not"'>{{safe.about}}</div>
						<div v-else><del>{{safe.about}}</del></div>
					</div>
				</template>												
			</div> <!-- safety -->				

			<!-- policy -->
			<div class="flex flex-col gap-2 self-start ring-1 ring-gray-100 rounded-lg h-full p-4">  
				<div class="font-medium">Cancellation policy</div>				

				<div v-if='rules.destination.cancelPolicy == "Free cancellation"'>
					Free cancellation before {{ monthsEnum[new Date(new Date(inDay).getTime() - (rules.destination.freeCancelDaysBefore*3600*24*1000)).getMonth() ]}} {{ new Date(new Date(inDay).getTime() - (rules.destination.freeCancelDaysBefore*3600*24*1000)).getDate() }}
				</div>
				<div v-else>{{rules.destination.cancelPolicy}}</div>				
				<div>Review the Host’s full cancellation policy which applies even if you cancel for illness or disruptions caused by COVID-19.</div>
				<div
					class='cursor-pointer border-b border-gray-400 hover:border-gray-800 self-start'
					@click='moreRefund = !moreRefund'
					>show more click
				</div>
				<Teleport to='#air'>
					<Transition>
						<div 
							v-if='moreRefund' 
							class="fixedDivRelay z-50 p-6 flex flex-col gap-4 justify-start"
							@click.self='moreRefund = !moreRefund' 
						>
						<div class='flex flex-col gap-4 self-center p-6 bg-white shadow-xl relayWid rounded-2xl'>
							<div 
								@click='moreRefund = !moreRefund' 
								class="flex justify-center items-center w-6 h-6 hover:bg-gray-200 rounded-full cursor-pointer transition-all duration-200"
							>&#9874;</div>							

							<div class="flex flex-col gap-4 overflow-y-scroll scrollStyle">
							<div class="text-2xl font-semibold">Cancellation policy</div>
							<div>Before you book, make sure you're comfortable with this Host's cancellation policy. Keep in mind that Airbnb's Extenuating Circumstances policy doesn't cover cancellations due to illness or travel disruptions caused by COVID-19.</div>							
							<div class="text-xl"><span v-if='rules.destination.rules.cancel.length !=0'>Cancel by</span></div>
							<template v-for='(ca,m) in rules.destination.rules.cancel'>
								<div class="flex justify-start gap-4">
									<div class="flex flex-col gap-2 leading-3">
										<div v-if='ca.about == "48 hours"' class="text-xl">{{ca.about}}</div>
										<div v-if='ca.about == "48 hours"' class='text-xs'>after booking</div>										

										<div v-if='ca.about == "partial"' class="text-xl">{{ monthsEnum[new Date(new Date(inDay).getTime() - (ca.days*3600*24*1000)).getMonth() ]}} {{ new Date(new Date(inDay).getTime() - (ca.days*3600*24*1000)).getDate() }} </div>
										<div v-if='ca.about == "partial"' class='text-xs'>{{rules.destination.rules.rules[0].about.substr(15)}}</div>

										<div v-if='ca.about == "checkIn"' class="text-xl">{{ monthsEnum[new Date(rules.destination.checkIn).getMonth()] }} {{ new Date(rules.destination.checkIn).getDate() }}</div>
										<div v-if='ca.about == "checkIn"' class='text-xs'>(check-in)</div>

									</div>
									<div class="self-center">{{ca.policy}}</div>																		
								</div>
								<hr>
							</template>

							<a 
								class='border-b-2 border-gray-300 hover:border-gray-600 self-start' 
								target='_blank' 
								href="https://www.airbnb.com/help/article/149/find-the-cancellation-policy-for-your-stay"
							>
								Learn more about cancellation policies 
								<span class="text-xxs">not coded</span>
							</a>

							</div>
						</div>													
							
						</div>
					</Transition>
				</Teleport>				
			</div> <!-- policy -->
		</div>				
	</div>
	
</div></template>

<script setup>
	import { ref } from 'vue'
	import gql from 'graphql-tag'
	import { useQuery } from '@vue/apollo-composable'

	const props = defineProps({		destinationId:Number,		type:String, inDay:String		})

	const moreRules = ref(false)
	const moreRefund = ref(false)
	const monthsEnum = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

	const GET_RULES = gql`query ($destinationId: ID!, $type: String!) {
  destination(id: $destinationId, type: $type) {    
    checkIn
    cancelPolicy
    freeCancelDaysBefore
    rules {
      additional
      safety {
        about
        logo
        more
      }
      rules {
        about
        logo
        more
      }
      cancel {
        about
        on
        policy
        days
      }
    }    
  }
}`

	const { result:rules, loading:rulesLoading } = useQuery(GET_RULES, () => ({
		destinationId: props.destinationId,
		type: props.type
	}))
</script>

<style scoped>

.fixedDivRelay{
  position:fixed;
  top:0%;
  left:0%;  
  width: 100%;
  height: 100%;
  font-family: "Actor";
  background-color: rgb(204, 204, 204, 0.5);
}
.relayWid{ width:75%; height:90%;  }
.h-f{ height:80%;  }

@media screen and (max-width: 768px) {
	.relayWid{
  	width: 98%;
  	height: 95%;
	}

}
	.v-enter-from{ top: 110%; opacity:0;  }
	.v-enter-to{ top: 0%; opacity:1; }
	.v-enter-active{  transition: all 0.5s linear;  }

	.v-leave-from{ top: 0%; opacity:1; }
	.v-leave-to{ top: 110%; opacity:0; }
	.v-leave-active{  transition: all 0.5s linear;  }	
</style>

