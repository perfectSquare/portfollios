<template><div class="w-full">
	<div  v-if='intro' class="flex justify-between">
		<div class='flex flex-col gap-1'>
			<div class="text-2xl">{{intro.destination.hostIntro[1]}}</div>
			<div class="flex">
				<div>{{intro.destination.guests.adults}} guests</div>				
				<template v-for='(ho,i) in intro.destination.hostIntro.slice(2)'>
					<div class="self-center text-xl relative bottom-2">&nbsp;.&nbsp;</div>
					<div>{{ho}}</div>					
				</template>											
			</div>			
		</div>	
		<div class="relative cursor-pointer">
			<div @click='toIt("#host")'><img :src="intro.destination.host.hostLogo" class="w-14 h-14 self-center relative right-2 rounded-full"></div>
			<img v-if='intro.destination.hostIntro[0] == "super"' src="/assets/airbnb/super.png" class="w-5 h-6 absolute right-2 bottom-1">
		</div>
	</div>	
</div></template>

<script setup>
	import { ref } from 'vue'
	import gql from 'graphql-tag'
	import { useQuery } from '@vue/apollo-composable'

	const props = defineProps({		destinationId:Number,		type:String,	})

	const allOffersShow = ref(false)

	const GET_INTRO = gql`query getHostIntro($destinationId: ID!, $type: String!) {
  destination(id: $destinationId, type: $type) {
  	luxi
    hostIntro
    guests {
      adults
    }
    host {
      hostLogo
    }
  }
}`

	const { result:intro, loading:introLoading } = useQuery(GET_INTRO, () => ({
		destinationId: props.destinationId,
		type: props.type
	}))

	const toIt = (x) => {
    // document.querySelector(x).scrollIntoView({   		behavior: "smooth"		});

		window.scrollTo({
			top: document.querySelector(x).offsetTop,
			behavior: "smooth"
		})
	}
</script>

<style scoped></style>