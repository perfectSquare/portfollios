<template><div class="w-full">
	<div v-if='dest' class="flex flex-col justify-start gap-4">
		<div v-if='dest.destination.hostIntro[0] == "super"' class="flex justify-start gap-4">
			<img src="/assets/airbnb/super-icon-white.png" class="self-center w-6 h-8">
			<div class='flex flex-col gap-2'>
				<div class="font-medium text-xl nameFont">{{dest.destination.nick}} is a Superhost</div>
				<div class="text-gray-700 text-sm">Superhosts are experienced, highly rated hosts who are committed to providing great stays for guests.</div>
			</div>
		</div>
		<template v-for='(ds,i) in dest.destination.destinationIntro' :key='i'>
			<div class="flex justify-start gap-4">
				<img :src="`/assets/airbnb/${ds.logo}.png`" class="self-center w-6 h-6">
				<div v-if='ds.about != "Free cancellation"' class='flex flex-col gap-2'>
					<div class="font-medium text-base nameFont">{{ds.about}}</div>
					<div class="text-gray-700 text-sm"><span v-html='ds.comment'></span></div>
				</div>
				<div v-if='ds.about == "Free cancellation"' class='flex flex-col gap-2'>

					<div class="font-medium text-base nameFont">Free cancellation before {{ monthsEnum[new Date(new Date(checkIn).getTime() - (dest.destination.freeCancelDaysBefore*3600*24*1000)).getMonth() ]}} {{ new Date(new Date(checkIn).getTime() - (dest.destination.freeCancelDaysBefore*3600*24*1000)).getDate() }}</div>
				</div>
			</div>
		</template>
	</div>
</div></template>

<script setup>
	import { ref } from 'vue'
	import gql from 'graphql-tag'
	import { useQuery } from '@vue/apollo-composable'

	const props = defineProps({		
		destinationId:Number,		
		type:String, 
		checkIn:String	
	})

	const monthsEnum = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
	const allOffersShow = ref(false)

	const GET_DEST_INTRO = gql`query getDestinationIntro($destinationId: ID!, $type: String!) {
  destination(id: $destinationId, type: $type) {
  	checkIn
    freeCancelDaysBefore
  	nick
    hostIntro
    destinationIntro {
      comment
      logo
      about
    }    
  }
}`

	const { result:dest, loading:destLoading } = useQuery(GET_DEST_INTRO, () => ({
		destinationId: props.destinationId,
		type: props.type
	}))
</script>

<style scoped>
	.nameFont{ font-family:'Exo 2'; font-weight: 700;  }
</style>