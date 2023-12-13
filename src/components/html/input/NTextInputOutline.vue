<template><div class='relative'>
	<input 
		type="text" 
		name="" 
		class='relative outline-none bgSet text-white ring-2 ring-gray-400 focus:ring-gray-700 ring-offset-2 pl-1 pt-0.5 pb-0.5 focus:placeholder-transparent transition-all duration-300'
		@focus='focused'
		@blur='blured'
		v-model='inValue'		
		tabindex="-1"
		:placeholder='placeHolder'
	>
	<div ref='placeHolderRef' class='absolute focus-out pl-1 pr-1 textSet'>{{placeHolder}}</div>
</div></template>

<script setup>
	import { ref, computed, watch } from 'vue'	

	const props = defineProps({
		modelValue: String,
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
		if(textColorToUse.value != 'black') e.target.nextElementSibling.style.color = 'black'
		else e.target.nextElementSibling.style.color = textColorToUse.value

		e.target.nextElementSibling.classList.remove('focus-out', 'firstStyle')
		e.target.nextElementSibling.classList.add('focus-in')
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
		background-color: white;
/*		background-color: v-bind(bgToUse);*/
/*		border-bottom: 2px solid v-bind(borderColorToUse);*/
		color: v-bind(textColorToUse);
	}
	.textSet{
		background-color: white;
		color: v-bind(textColorToUse);
	}
	::placeholder {
	  color: v-bind(textColorToUse);
	  opacity: 0.6;
	}
	.focus-in{ animation: foucus-in-frames 0.3s ease-out forwards; }
	@keyframes foucus-in-frames{
		0%{ bottom: 3px; left: 0; opacity: 0.6;	font-size: 12px; display: none;}
	  100%{	bottom: 16px; left: -2px; font-size: 14px; opacity: 1; display: inline; }
	}

	.focus-out{	animation: foucus-out-frames 0.3s ease-out forwards; }
	@keyframes foucus-out-frames{		
	  	0%{	bottom: 16px; left: -2px; font-size: 14px; opacity: 1; display: inline; }
	  100%{ bottom: 3px; left: 0; opacity: 0.6;	font-size: 12px; display: none;}
	}
	.firstStyle{
		bottom: 3px; left: 0; opacity: 0.6;	font-size: 12px; display: inline;
	}
</style>















