<template><div class="w-full">
	<div v-if='imagesLoading' class="spin flex gap-1"><div></div><div></div><div></div></div>
		<div v-else-if='allImages.destination.images' class='w-full h-96'>			
		<div :class='[ allImages.destination.luxi ? "grid-cols-1" : "grid-cols-2" ]' class="relative md:grid md:gap-2"> 
			<div class="w-full h-96">
				<img 
					@click='imagesShow = !imagesShow' 
					:src="allImages.destination.images[0]" 
					class='h-full w-full rounded-lg  imFilter cursor-pointer transition-all duration-500'
					:class='[ 
						{"md:rounded-xl" : allImages.destination.luxi},
						{"md:rounded-l-xl md:rounded-r-none" : !allImages.destination.luxi},
					]'
					>
			</div>
				<div v-if='!allImages.destination.luxi'  class='md:grid md:grid-cols-2 md:gap-2 rounded-r-lg hidden h-96'>
					<img @click='imagesShow = !imagesShow' :src="allImages.destination.images[2]" class='w-full imFilter cursor-pointer transition-all duration-500' :class='[ {"h-36": allImages.destination.luxi}, {"h-46": !allImages.destination.luxi} ]'>
					<img @click='imagesShow = !imagesShow' :src="allImages.destination.images[3]" class='rounded-tr-lg w-full imFilter cursor-pointer transition-all duration-500' :class='[ {"h-36": allImages.destination.luxi}, {"h-46": !allImages.destination.luxi} ]'>
					<img @click='imagesShow = !imagesShow' :src="allImages.destination.images[4]" class='w-full imFilter cursor-pointer transition-all duration-500' :class='[ {"h-36": allImages.destination.luxi}, {"h-46": !allImages.destination.luxi} ]'>
					<img @click='imagesShow = !imagesShow' :src="allImages.destination.images[5]" class='rounded-br-lg w-full imFilter cursor-pointer transition-all duration-500' :class='[ {"h-36": allImages.destination.luxi}, {"h-46": !allImages.destination.luxi} ]'>	
				</div>								
				<div class='md:hover:bg-gray-100 absolute bottom-4 right-6 z-10 text-xs md:text-base md:bg-white md:text-black bg-gray-900 text-white bg-opacity-70 rounded-lg pl-3 pr-3 pt-0.5 pb-0.5 ring-1 ring-gray-800 cursor-pointer flex items-center gap-2'
				>
					<img 
						src="/assets/airbnb/dots.png" 
						class='w-3 h-3 hidden md:inline'
					>
					<span @click='imagesShow = !imagesShow' class="hidden md:inline">show all photos</span>
					<span class="md:hidden inline">1/{{allImages.destination.images.length}}</span>
				</div>
		</div> 	
		
		</div>
		
		<Transition><div v-if='imagesShow' class="fixedWidth ring-1 ring-gray-200 p-4 z-50 origin-top bg-white flex flex-col gap-y-4">

			<div class="mb-4 w-full">
			<div 
				@click='imagesShow = !imagesShow' 
				class="cursor-pointer rounded-full absolute left-2 flex justify-center items-center w-6 hover:bg-gray-200 transition-all duration-300"
			>&#9874;</div>
			</div>

			<div class="overflow-y-scroll scrollStyle w-full h-full">
				<div class="w-full grid grid-cols-2 gap-4">
					<template v-for='(im,i) in allImages.destination.images'>
						<img :src="im" class='w-full h-full childs'>
					</template>
				</div>
			</div>

		</div></Transition>				
		
</div></template>

<script setup>
	import { ref } from 'vue'
	import gql from 'graphql-tag'
	import { useQuery } from '@vue/apollo-composable'

	const imagesShow = ref(false)

	const props = defineProps({		destinationId:Number,		type:String,	})

	const GET_IMAGES = gql`query getRules($destinationId: ID!, $type: String!) {
  		destination(id: $destinationId, type: $type) {
    	images
    	luxi
    	}
	}`

	const { result:allImages, loading:imagesLoading } = useQuery(GET_IMAGES, () => ({
		destinationId: props.destinationId,
		type: props.type
	}))
</script>

<style scoped>
.fixedWidth{
	position: fixed;
	top: 50%;
	left: 50%;
	transform:  translate(-50%,-50%);
	width: 98%;
	height: 98%;
}
.imFilter:hover{		filter: brightness(.86);	}
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
	.v-enter-from{ width: 0%; opacity:0;  }
	.v-enter-to{ width: 100%; opacity:1; }
	.v-enter-active{  transition: all 0.3s linear;  }

	.v-leave-from{ width: 100%; opacity:1; }
	.v-leave-to{ width: 0%; opacity:0; }
	.v-leave-active{  transition: all 0.3s linear;  }

	.childs:nth-child(3n){
		grid-column: span 2 / span 2;
	}
</style>