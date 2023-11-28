<template><div v-if='desc' class="w-full relative">
<button
	v-if='desc.destination.descriptionOrignal.length != 0'
	class="self-start cursor-pointer border-b-2 border-transparent hover:border-gray-800"
	@click='changeOrignal'
>{{orignalText}}</button>

<div v-if='orignal' class='pt-4 pb-4 md:pt-6 md:pb-6 flex flex-col gap-y-2'> 
	<span class='long-text' v-html='desc.destination.descriptionOrignal'></span>	
	<div @click='descShow = !descShow' v-if='desc.destination.moreDescriptionOrignal.length != 0' class="self-start cursor-pointer border-b-2 border-transparent hover:border-gray-800">show more</div>
</div> 
<div v-if='!orignal' class='pt-4 pb-4 md:pt-6 md:pb-6 flex flex-col gap-y-2'> 
	<span class='long-text' v-html='desc.destination.description'></span>	
	<div @click='descShow = !descShow' v-if='desc.destination.moreDescription.length != 0' class="self-start cursor-pointer border-b-2 border-transparent hover:border-gray-800">show more</div>
	<div 		
		v-if='desc.destination.description.length > 300 && desc.destination.luxi && luxiMarker' 
		class="self-start cursor-pointer border-b-2 border-transparent hover:border-gray-800"
		@click='(e) => {
			luxiMarker = false
			e.target.parentElement.children[0].classList.remove("long-text")
		}' 
	>show more</div>
</div> 

				<Teleport to='#air'>
					<Transition>
							<div 
							v-if='descShow' 
							class="fixedDivRelay z-50 p-6 flex flex-col gap-4 justify-start"
							@click.self='descShow = !descShow' 
						>
						<div class='flex flex-col gap-2 relayWid self-center p-6 bg-white shadow-xl rounded-2xl'>
							<div 
								@click='descShow = !descShow' 
								class="flex justify-center items-center w-6 h-6 hover:bg-gray-200 rounded-full cursor-pointer transition-all duration-200"
							>&#9874;</div>
		<div class="overflow-y-scroll scrollStyle h-full">
							<div class="text-3xl font-bold">About this space</div>
		<div v-if='orignal'><span  v-html='desc.destination.moreDescriptionOrignal[0].desc'></span></div>
		<div v-if='!orignal'><span  v-html='desc.destination.moreDescription[0].desc'></span></div>

		<div v-if='orignal'>
		<template v-for='(dc,i) in desc.destination.moreDescriptionOrignal.slice(1)' :key='i'>
			<div class="font-bold"><span v-html='dc.about'></span></div>
			<div><span v-html='dc.desc'></span></div>
		</template>
		</div>

		<div v-if='!orignal'>
		<template v-for='(dc,i) in desc.destination.moreDescription.slice(1)' :key='i'>
			<div class="font-bold"><span v-html='dc.about'></span></div>
			<div><span v-html='dc.desc'></span></div>
		</template>
		</div>

		</div>					

						</div>							
						</div>
					</Transition>
				</Teleport>				



</div></template>

<script setup>
	import { ref, watch } from 'vue'
	import gql from 'graphql-tag'
	import { useQuery } from '@vue/apollo-composable'

	const props = defineProps({		destinationId:Number,		type:String,	})

	const luxiMarker = ref(true)
	const descShow = ref(false)
	const orignal = ref(true)
	const orignalText = ref('translate')

	const changeOrignal = (e) => {
		orignal.value = !orignal.value
		if(orignalText.value == "translate") orignalText.value = 'orignal language'
		else orignalText.value = 'translate'
	}

	const GET_DESCRIPTION = gql`query ($destinationId: ID!, $type: String!) {
  destination(id: $destinationId, type: $type) {
  	luxi
    description
    descriptionOrignal
    moreDescription {
      about
      desc
    }
    moreDescriptionOrignal {
      about
      desc
    }
  }
}`

	const { result:desc, loading:descLoading } = useQuery(GET_DESCRIPTION, () => ({
		destinationId: props.destinationId,
		type: props.type
	}))

	watch(desc, val => {
		if(val.destination.descriptionOrignal.length != 0) orignal.value = true
		else orignal.value = false
	})
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

	.v-enter-from{ top: 110%; opacity:0;  }
	.v-enter-to{ top: 0%; opacity:1; }
	.v-enter-active{  transition: all 0.3s linear;  }

	.v-leave-from{ top: 0%; opacity:1; }
	.v-leave-to{ top: 110%; opacity:0; }
	.v-leave-active{  transition: all 0.5s linear;  }	

.long-text{  
   overflow: hidden;
   text-overflow: ellipsis;
   display: -webkit-box;
   line-clamp: 3; 
   -webkit-line-clamp: 3; /* number of lines to show */           
   -webkit-box-orient: vertical;
}

</style>

