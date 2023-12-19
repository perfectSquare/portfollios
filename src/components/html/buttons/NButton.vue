<template>
	<button	
		:class="`text-${txSize} pl-${padL} pr-${padR} pb-${padB}`"
		class="
			relative text-center overflow-hidden
			bgSet rounded 
			transition-all duration-300			
		"
		@mousedown='toShowHiddenFlash'
		@mouseup='toHideShownFlash'
	>
		{{label}}
		<span :class='flash' class='absolute z-50 -full hidden h-full'></span>
	</button>
</template>

<script setup>
	import { ref, computed } from 'vue'

	const props = defineProps({
		label: String,
		bg: String,
		textColor: String,
		size: String // sm | md | lg | xl | 2xl | 3xl
	})	

	const toShowHiddenFlash = (e) =>{
		e.target.children[0].classList.remove('hidden')

		if(e.offsetX > e.target.clientWidth/2){
			e.target.children[0].classList.add('right-0')	
			e.target.children[0].style.transformOrigin = 'left'
		} 
		else{
			e.target.children[0].classList.add('left-0')
			e.target.children[0].style.transformOrigin = 'right'
		} 

		setTimeout(()=>{
			e.target.children[0].classList.add('hidden')
			e.target.children[0].classList.remove('left-0', 'right-0')
		}, 300)
	}

	const toHideShownFlash = (e) =>{
		// console.log(e.target.children[0])
		// e.target.children[0].classList.add('hidden')
		// setTimeout(()=>{
		// 	e.target.children[0].classList.add('hidden')
		// }, 250)
	}

	const hoverMode  = ref(-20)
	const flash = ref('mdt')

	const bgToUse = computed(()=>{
		return CSS.supports('color', props.bg) ? props.bg : '#e6e6e6'
	})

	const textColorToUse = computed(()=>{
		return CSS.supports('color', props.textColor) ? props.textColor : 'black'
	})

	const getHex = computed(()=>{
		let hex
		if(bgToUse.value.startsWith("#")){		hex = bgToUse.value		}
		else{
			var ctx = document.createElement('canvas').getContext('2d');
		    ctx.fillStyle = bgToUse.value;
		    hex = ctx.fillStyle;	
		}
		var rgb = parseInt(hex.substr(1), 16);   
		var r = (rgb >> 16) & 0xff;  // extract red
		var g = (rgb >>  8) & 0xff;  // extract green
		var b = (rgb >>  0) & 0xff;  // extract blue
		var luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;
		// console.log('luma', luma)
		if(luma < 20){
			hoverMode.value = 60
			flash.value = 'mdt'
		} 
		else if(luma >= 20 && luma < 200){
			flash.value = 'mdt1'
			hoverMode.value = -30	
		} 
		else{
			flash.value = 'mdt2'
			hoverMode.value = -50	
		} 
		return hex
	})

	const bgHoverToUse = computed(()=>{
		let hex = getHex.value
		return '#' + hex.replace(/^#/, '').replace(/../g, hex => ('0'+Math.min(255, Math.max(0, parseInt(hex, 16) + hoverMode.value)).toString(16)).substr(-2));
	})

	const txSize = computed(()=>{
		if(props.size == 'sm') return 'sm'
		else if(props.size == 'md') return 'md'
		else if(props.size == 'lg') return 'lg'
		else if(props.size == 'xl') return 'xl'
		else if(props.size == '2xl') return '2xl'
		else if(props.size == '3xl') return '3xl'
	})

	const padL = computed(()=>{
		if(props.size == 'sm') return 3
		else if(props.size == 'md') return 4
		else if(props.size == 'lg') return 4
		else if(props.size == 'xl') return 6
		else if(props.size == '2xl') return 7
		else if(props.size == '3xl') return 8
	})

	const padR = computed(()=>{
		if(props.size == 'sm') return 3
		else if(props.size == 'md') return 4
		else if(props.size == 'lg') return 4
		else if(props.size == 'xl') return 6
		else if(props.size == '2xl') return 7
		else if(props.size == '3xl') return 8
	})

	const padB = computed(()=>{
		if(props.size == 'sm') return 0.5
		else if(props.size == 'md') return 0.5
		else if(props.size == 'lg') return 0.5
		else if(props.size == 'xl') return 1
		else if(props.size == '2xl') return 2
		else if(props.size == '3xl') return 2
	})

</script>

<style scoped>
	.bgSet{
		background-color: v-bind(bgToUse);
		color: v-bind(textColorToUse);
	}
	.bgSet:hover{
		background-color: v-bind(bgHoverToUse);
	}
	.mdt{
		background-color: rgb(255, 255, 255, 0.4);
      	animation: mdtF 0.2s linear forwards;
	}
	.mdt1{
		background-color: rgb(230, 230, 230, 0.5);
		animation: mdtF 0.2s linear forwards;
	}
	.mdt2{
		background-color: rgb(89, 89, 89, 0.3);
		animation: mdtF 0.2s linear forwards;
	}
	@keyframes mdtF{
		/*0%{ width: 0%; }
		100%{ width: 100%; }*/
		/*0%{ transform: scale(0.3,0.3); }
		100%{ transform: scale(1.5,1.5); }*/
		0%{ width: 0%; transform: scale(0,0); }
		100%{ width: 100%; transform: scale(1.5,1.5); }
	}
</style>