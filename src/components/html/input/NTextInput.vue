<template><div class='relative'>
	<input 
		:type="inputType" 
		name="" 
		class='relative w-full outline-none bgSet text-white pl-1 pt-0.5 pb-0.5 focus:placeholder-transparent'
		@focus='focused'
		@blur='blured'
		v-model='inValue'		
		tabindex="-1"
		:placeholder='placeHolder'
	>
	<div ref='placeHolderRef' class='absolute focus-out pl-1 textSet'>{{placeHolder}}</div>
	<div class='h-[1px] w-full absolute left-0 bottom-0 straightIn'></div>	
</div></template>

<script setup>
	import { ref, computed, watch } from 'vue'	

	const props = defineProps({
		modelValue: [String, Number],
		inputType: String,
		placeHolder: String,
		bg: String,
		textColor: String,
		borderColor: String,
	})
	const emits = defineEmits(['update:modelValue'])

	const placeHolderRef = ref(null)

	const inValue = computed({
		get(){ return props.modelValue },
		set(v){ emits('update:modelValue', v) }
	})

	const bgToUse = computed(()=>{
		return CSS.supports('color', props.bg) ? props.bg : '#f2f2f2'
	})

	const borderColorToUse = computed(()=>{
		return CSS.supports('color', props.borderColor) ? props.borderColor : '#737373'
	})

	const textColorToUse = computed(()=>{
		return CSS.supports('color', props.textColor) ? props.textColor : 'black'
	})

	const focused = (e) => {
		console.log(22)
		if(textColorToUse.value != 'black') e.target.nextElementSibling.style.color = 'black'
		else e.target.nextElementSibling.style.color = textColorToUse.value

		e.target.nextElementSibling.classList.remove('focus-out', 'firstStyle')
		e.target.nextElementSibling.classList.add('focus-in')
		e.target.nextElementSibling.nextElementSibling.classList.remove('straightOut')
		e.target.nextElementSibling.nextElementSibling.classList.add('straightIn')
	}

	const blured = (e) => {		
		if(inValue.value != ''){
			placeHolderRef.value.classList.remove('bottom-1.5', 'left-0', 'text-xs', 'opacity-60')
			placeHolderRef.value.classList.add('bottom-6', '-left-0.5', 'text-sm', 'opacity-100')
			return
		}		
		if(textColorToUse.value != 'black')	e.target.nextElementSibling.style.color = textColorToUse.value
		else e.target.nextElementSibling.style.color = 'black'


		e.target.nextElementSibling.classList.remove('focus-in','firstStyle')
		e.target.nextElementSibling.classList.add('focus-out')

		e.target.setAttribute('placeholder', '')
		setTimeout(()=>{
			e.target.setAttribute('placeholder', props.placeHolder)
		}, 400)
		
		e.target.nextElementSibling.nextElementSibling.classList.add('straightOut')
		e.target.nextElementSibling.nextElementSibling.classList.remove('straightIn')
	}
	watch(inValue, (n)=>{
		if(n != ''){
			placeHolderRef.value.classList.remove('focus-out')
			placeHolderRef.value.classList.add('focus-in')
			placeHolderRef.value.style.color = 'black'
		}
	})

</script>

<style scoped>
	.bgSet{
		font-size: 12px;
		background-color: v-bind(bgToUse);
/*		border-bottom: 2px solid v-bind(borderColorToUse);*/
		color: v-bind(textColorToUse);
	}
	.textSet{
		color: v-bind(textColorToUse);
	}
	.straightIn{ 
		background-color: v-bind(borderColorToUse);		
		animation: straightInFrames 0.2s ease-out forwards;	
	}	
	::placeholder {
	  color: v-bind(textColorToUse);
	  opacity: 0.6;
	}
	@keyframes straightInFrames{
		0%{ transform: scale(0,0);  }
		100%{ transform: scale(1,1);}
	}
	.straightOut{
		background-color: v-bind(borderColorToUse);
		animation: straightOutFrames 0.2s ease-out forwards;
	}
	@keyframes straightOutFrames{
		0%{ transform: scale(1,1);  }
		100%{ transform: scale(0,0) ;  }		
	}	
	
	.focus-in{ animation: foucus-in-frames 0.4s ease-out forwards; }
	@keyframes foucus-in-frames{
		0%{ bottom: 3px; left: 0; opacity: 0.6;	font-size: 12px; display: none;}
	  100%{	bottom: 20px; left: -2px; font-size: 14px; opacity: 1; display: inline; }
	}

	.focus-out{	animation: foucus-out-frames 0.4s ease-out forwards; }
	@keyframes foucus-out-frames{		
	  	0%{	bottom: 20px; left: -2px; font-size: 14px; opacity: 1; display: inline; }
	  100%{ bottom: 3px; left: 0; opacity: 0.6;	font-size: 12px; display: none;}
	}
	.firstStyle{
		bottom: 3px; left: 0; opacity: 0.6;	font-size: 12px; display: inline;
	}
</style>















