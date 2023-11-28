<template><div v-if='offers' class="w-full relative">

	<div class='pt-4 pb-4 md:pt-6 md:pb-6 flex flex-col gap-2 w-3/4'> 
		<div class="font-medium text-xl">What this place offers</div>
		<div class="flex flex-col sm:grid sm:grid-cols-2 gap-3 md:gap-6">
			<template v-for='(offer,j) in offers.destination.offers.offersSet' :key='j'>
			<div class="flex gap-2 md:gap-4 text-base">				
				<img v-if='offer.more == "0"' :src="`/assets/airbnb/${offer.logo}.png`" class="self-center w-5 h-5">				
				<img v-else :src="`/assets/airbnb/${offer.logo}.png`" class="self-center w-5 h-5">				
				<div class="text-gray-700 text-sm">
					<span v-if='offer.more == "0"'><del>{{offer.about}}</del></span>
					<span v-else>{{offer.about}}</span>
				</div>
			</div>			
			</template>														
		</div>
		<div 
			@click='allOffersShow = !allOffersShow' 
			class=" bg-white hover:bg-gray-100 pl-2 pr-2 pt-2 pb-2 md:pl-6 md:pr-6 self-start ring-1 ring-gray-800 cursor-pointer rounded-lg"
		>Show all {{offers.destination.offers.offsLength}} amenities</div>
	</div>
				<Teleport to='#air'>
					<Transition>
							<div 
							v-if='allOffersShow' 
							class="fixedDivRelay z-50 p-6 flex flex-col gap-4 justify-start"
							@click.self='allOffersShow = !allOffersShow' 
						>
						<div class='flex flex-col gap-2 relayWid self-center p-6 bg-white shadow-xl rounded-2xl'>
							<div 
								@click='allOffersShow = !allOffersShow' 
								class="flex justify-center items-center w-6 h-6 hover:bg-gray-200 rounded-full cursor-pointer transition-all duration-200"
							>&#9874;</div>
							<div class="font-medium text-xl">What this place offers</div>
			<div class="overflow-y-scroll scrollStyle w-full h-full flex flex-col gap-y-4">
				<template v-for='(om,j) in offers.destination.offers.moreOffers' :key='j'>					
					<div class="flex flex-col gap-4">
						<div class="font-bold">{{om.cat}}</div>						
						<template v-for='(omc,k) in om.catOffers' :key='k'>
							<div class="ml-4 flex gap-4">
								<img :src="`/assets/airbnb/${omc.logo}.png`" class="w-5 h-5 self-center">
								<div class="flex flex-col">
									<div v-if='om.cat == "Not included"'><del>{{omc.about}}</del></div>
									<div v-else>{{omc.about}}</div>
									<div v-if='omc.more != ""' class='text-gray-600'>{{omc.more}}</div>
								</div>
							</div>													
						</template>							
						<hr>
					</div>
				</template>				
			</div>							
						</div>							
						</div>
					</Transition>
				</Teleport>					
</div></template>

<script setup>
	import { ref } from 'vue'
	import gql from 'graphql-tag'
	import { useQuery } from '@vue/apollo-composable'

	const props = defineProps({		destinationId:Number,		type:String,	})

	const allOffersShow = ref(false)

	const GET_OFFERS = gql`query ($destinationId: ID!, $type: String!) {
  destination(id: $destinationId, type: $type) {    
    offers {
      offsLength
      offersSet {
        about
        logo
        more
      }
      moreOffers {
        cat
        catOffers {
          logo
          about
          more
        }
      }
    }
  }
}`

	const { result:offers, loading:offersLoading } = useQuery(GET_OFFERS, () => ({
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
.fixedDiv{
  position:fixed;
  top:50%;
  left:50%;
  transform: translate(-50%, -50%);  
  width: 90%;
  height: 90%;
  font-family: "Actor";
}
.hScroll{ height:60%;  }
@media screen and (max-width: 768px) {
	.fixedDiv{
  	width: 98%;
  	height: 98%;
	}
	.hScroll{ height:40%;  }
}
	.v-enter-from{ width: 0%; opacity:0;  }
	.v-enter-to{ width: 100%; opacity:1; }
	.v-enter-active{  transition: all 0.3s linear;  }

	.v-leave-from{ width: 100%; opacity:1; }
	.v-leave-to{ width: 0%; opacity:0; }
	.v-leave-active{  transition: all 0.3s linear;  }


</style>

