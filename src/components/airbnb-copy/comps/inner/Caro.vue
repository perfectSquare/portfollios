
<template><div ref='mainRef' class='relative w-full'>	
	
	<template v-for='(im,i) in items' :key='i'>
		<img :src="im" class="hidden relative rounded-lg h-72 w-full">		
	</template>
	<div v-if='arrowRShow' :class="arrowRDiv" @click='above'>
		<img src="/assets/airbnb/right.png" class="wh notHere">		
	</div>
	<div v-if='arrowLShow' :class="arrowLDiv" @click='behind'>
		<img src="/assets/airbnb/left.png" class="wh notHere">		
	</div>
	

</div></template>

<script setup>
	import { ref, onMounted } from 'vue'

	const props = defineProps({		items:Array		})

	onMounted(() => {
		mainRef.value.firstElementChild.classList.remove('hidden')
	})

	const mainRef = ref(null)
	const arrowRDiv = ref('notHere w-8 z-40 h-8 flex items-center justify-center absolute right-2 arrow cursor-pointer bg-gray-100 hover:bg-white rounded-full hover:scale-105 transition-all duration-300')
	const arrowLDiv = ref('notHere w-8 z-40 h-8 flex items-center justify-center absolute left-2 arrow cursor-pointer bg-gray-100 hover:bg-white rounded-full hover:scale-105 transition-all duration-300')
	const arrowRShow = ref(true)
	const arrowLShow = ref(false)

	const counter = ref(0)

	const above = () => {
		arrowRShow.value = true
		arrowLShow.value = true
		if(counter.value > props.items.length - 2){
			arrowRShow.value = false
			return;	
		} 
		mainRef.value.children[counter.value].classList.add('hidden')		
		counter.value++

		mainRef.value.children[counter.value].classList.remove('hidden')
		mainRef.value.children[counter.value].classList.remove('caroAnimationR')
		mainRef.value.children[counter.value].classList.add('caroAnimation')
	}

	const behind = () => {		
		arrowRShow.value = true
		if(counter.value == 1) arrowLShow.value = false
		if(counter.value <= 0){
			arrowLShow.value = false
			return;	
		} 
		mainRef.value.children[counter.value].classList.add('hidden')
		counter.value--
		
		mainRef.value.children[counter.value].classList.remove('hidden')		
		mainRef.value.children[counter.value].classList.remove('caroAnimation')
		mainRef.value.children[counter.value].classList.add('caroAnimationR')
	}
	

	
</script>

<style scoped>
.arrow{
  top: 0;
  bottom: 0;
  margin: auto;
}
.wh{	width:6px;	height:10px;	}
.caroAnimation{ animation: caroFrames 0.2s cubic-bezier(1,.5,.65,.29) forwards; }
@keyframes caroFrames{
	0%{ width:0%;  left:100%; }
	100%{ width:100%;  left:0%; }
}

.caroAnimationR{ animation: caroFramesR 0.2s cubic-bezier(1,.5,.65,.29) forwards; }
@keyframes caroFramesR{
	0%{  width:0%;   }
	100%{  width:100%; }
}


</style>

