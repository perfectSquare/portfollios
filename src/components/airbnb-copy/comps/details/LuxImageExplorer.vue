<template><div class="w-full">
	<div v-if='imagesLoading' class="spin flex gap-1"><div></div><div></div><div></div></div>

	<div v-else-if='allImages.destination.luxImages' class='w-full'>			
		<div v-if='toShow == "one"'>
			<img @click='imagesShow = !imagesShow' :src="allImages.destination.images[0]" class='h-96 w-full rounded-xl imFilter cursor-pointer transition-all duration-500'>
		</div>

		<div v-if='toShow == "more"' class="relative grid grid-cols-1 gap-2 relative"> 

			<div class="w-full grid grid-cols-2 gap-2">
				<img @click='imagesShow = !imagesShow' :src="allImages.destination.images[1]" class='h-full w-full rounded-tl-xl imFilter cursor-pointer transition-all duration-500'>
				<img @click='imagesShow = !imagesShow' :src="allImages.destination.images[2]" class='h-full w-full rounded-tr-xl imFilter cursor-pointer transition-all duration-500'>
			</div>

				<div class='grid grid-cols-3 gap-2'>
					<img @click='imagesShow = !imagesShow' :src="allImages.destination.images[3]" class='w-full rounded-bl-xl imFilter cursor-pointer transition-all duration-500'>
					<img @click='imagesShow = !imagesShow' :src="allImages.destination.images[4]" class='w-full imFilter cursor-pointer transition-all duration-500'>
					<img @click='imagesShow = !imagesShow' :src="allImages.destination.images[5]" class='w-full rounded-br-xl imFilter cursor-pointer transition-all duration-500'>
				</div>												

				<div class='bg-white hover:bg-gray-100 absolute bottom-4 right-6 z-10 text-base text-black bg-opacity-70 rounded-lg pl-3 pr-3 pt-0.5 pb-0.5 ring-1 ring-gray-800 cursor-pointer flex items-center gap-2'>
				<img @click='imagesShow = !imagesShow' src="/assets/airbnb/dots.png" class='w-3 h-3'>
				<span @click='imagesShow = !imagesShow'>show all photos</span>
				<span class="hidden inline">1/{{allImages.destination.images.length}}</span>
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

			<div ref='mainRef' class="overflow-y-scroll scrollStyle w-full h95 w-full flex gap-2">
				<div class="w10 sticky top-0 flex flex-col gap-y-4 overflow-y-scroll scrollStyle h-full">
					<template v-for='(ct,i) in allImages.destination.luxImages' :key='i'>
						<div 							
							@click='toIt(`#${ct.id}`)'
							class="text-xs pl-2 border-b border-gray-200 hover:border-gray-500 cursor-pointer"
						>{{ct.cat}}</div>
					</template>
				</div>				
				<div class="w90 p-8 md:p-16">
					<template v-for='(ct,i) in allImages.destination.luxImages' :key='i'>
						<div class='flex flex-col gap-y-8 w-full'>							
								<div :id="ct.id" class="text-2xl mt-4">{{ct.cat}}</div>								

									<div v-if='ct.images.length == 6' class="grid grid-cols-2 gap-4">
										<template v-for='(im,j) in ct.images' :key='j'><img :src="im" class='rounded-xl w-full h-full'></template>
									</div>

									<div v-if='ct.images.length == 5' class="grid grid-cols-2 gap-4">
										<template v-for='(im,j) in ct.images' :key='j'>
											<img 
												:src="im" 
												class='rounded-xl w-full h-full'
												:class='{ "col-span-2" : ct.images[0] == im }'
											>
										</template>
									</div>

									<div v-if='ct.images.length == 4' class="grid grid-cols-2 gap-4">
										<template v-for='(im,j) in ct.images' :key='j'><img :src="im" class='rounded-xl w-full h-full'></template>
									</div>

									<div v-if='ct.images.length == 3' class="grid grid-cols-2 gap-4">
										<template v-for='(im,j) in ct.images' :key='j'>
											<img 
												:src="im" 
												class='rounded-xl w-full h-full'
												:class='{ "col-span-2" : ct.images[0] == im }'
											>
										</template>
									</div>

									<div v-if='ct.images.length == 2' class="grid grid-cols-2 gap-4">
										<template v-for='(im,j) in ct.images' :key='j'><img :src="im" class='rounded-xl w-full h-full'></template>
									</div>

									<div v-if='ct.images.length == 1' class="grid grid-cols-1">
										<template v-for='(im,j) in ct.images' :key='j'><img :src="im" class='rounded-xl w-full h-full'></template>
									</div>

								<hr>							
						</div>
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

	const props = defineProps({		destinationId:Number,	type:String, toShow:String	})

	const GET_IMAGES = gql`query getHostIntro($destinationId: ID!, $type: String!) {
  destination(id: $destinationId, type: $type) {    
  	images
    luxImages {
    	id
      cat
      images
    }
  }
}`

	const { result:allImages, loading:imagesLoading } = useQuery(GET_IMAGES, () => ({
		destinationId: props.destinationId,
		type: props.type
	}))

	const mainRef = ref(null)

	const toIt = (x) => {    
		mainRef.value.scrollTo({
			top: document.querySelector(x).offsetTop-70,
			behavior: "smooth"
		})
	}
</script>

<style scoped>
.fixedWidth{
	position: fixed;
	top: 50%;
	left: 50%;
	transform:  translate(-50%,-50%);
	width: 100%;
	height: 100%;
}
.h95{ height:95%;  }
.w10{ width:15%;  }
.w90{ width:85%;  }
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