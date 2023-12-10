<template><div class='relative'>
	<input 
		type="text" 
		name="" 
		class='relative outline-none bgSet text-white text-sm pl-1 pt-0.5 pb-0.5'
		@focus='focused'
		@blur='blured'
		v-model='inValue'
	>
	<div ref='placeHolderRef' class='absolute bottom-1.5 left-0 pl-1 text-xs textSet opacity-60 transition-all duration-300'>{{placeHolder}}</div>
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
		if(textColorToUse.value != 'black'){
			e.target.nextElementSibling.style.color = 'black'
		}
		else e.target.nextElementSibling.style.color = textColorToUse.value
		e.target.nextElementSibling.classList.remove('bottom-1.5', 'left-0', 'text-xs', 'opacity-60')
		e.target.nextElementSibling.classList.add('bottom-6', '-left-0.5', 'text-sm', 'opacity-100')
	}

	const blured = (e) => {
		if(inValue.value != ''){
			placeHolderRef.value.classList.remove('bottom-1.5', 'left-0', 'text-xs', 'opacity-60')
			placeHolderRef.value.classList.add('bottom-6', '-left-0.5', 'text-sm', 'opacity-100')
			return
		}
		if(textColorToUse.value != 'black'){
			e.target.nextElementSibling.style.color = textColorToUse.value
		}		
		else e.target.nextElementSibling.style.color = 'black'
		e.target.nextElementSibling.classList.remove('bottom-6', '-left-0.5', 'text-sm', 'opacity-100')
		e.target.nextElementSibling.classList.add('bottom-1.5', 'left-0', 'text-xs', 'opacity-60')		
	}

</script>

<style scoped>
	.bgSet{
		background-color: v-bind(bgToUse);
		border-bottom: 2px solid v-bind(borderColorToUse);
		color: v-bind(textColorToUse);
	}
	.textSet{
		color: v-bind(textColorToUse);
	}
</style>















