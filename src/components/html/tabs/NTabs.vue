<template>
<div 
	class='relative flex items-center'
	:class="{
		'rounded px-8 bg-gray-800 overflow-hidden': putScrollToUse,
		'w-[25%]': putScrollToUse && size == 'sm',
		'w-[35%]': putScrollToUse && size == 'md',
		'w-[40%]': putScrollToUse && size == 'lg',
		'w-[50%]': putScrollToUse && size == 'xl',
		'w-[55%]': putScrollToUse && size == '2xl',
		'w-[60%]': putScrollToUse && size == '3xl'
	}"
>
	<img 
		v-if='putScrollToUse'
		src="/assets/ecomm/forward2.png"
		class='absolute cursor-pointer w-[8px] right-3 z-30'
		@click='scrollToRight'
	>
	<img 
		v-if='putScrollToUse'
		src="/assets/ecomm/reverse2.png"
		class='absolute cursor-pointer w-[8px] left-3 z-10'
		@click='scrollToLeft'
	>
	<div 
		class='flex bg-red-200'
		:class="{
			'gap-x-2': !brothers, 
			'gap-x-0': brothers,
			'overflow-hidden': putScrollToUse
		}"
	>	
		<template v-for='(tab,i) in tabs' :key='i'>
			<div 		
				class="relative tabsFont cursor-pointer opacity-90 hover:opacity-100 transition-all duration-300"
				:class="`text-${txSize} pl-${padL} pr-${padR} pb-${padB} pt-${padT}`"
				@click='tabClicked($event, tab)'
			>
				{{tab.label}}
				<div 
					class='h-[2px] w-full absolute left-0 bottom-0' 				
					:class="{
						'upIn':tab.selected && mode =='up', 'upOut':!tab.selected && mode =='up',
						'opacityIn':tab.selected && mode =='opacity', 'opacityOut':!tab.selected && mode =='opacity',
						'doorIn':tab.selected && mode =='door', 'doorOut':!tab.selected && mode =='door',
						'straightIn':tab.selected && mode =='straight', 'straightOut':!tab.selected && mode =='straight',
						'flowIn':tab.selected && mode =='flow', 'flowOut':!tab.selected && mode =='flow'
					}"
				></div>			
			</div>		
		</template>
	</div>
</div></template>

<script setup>
	import { ref, computed, watch } from 'vue'

	const props = defineProps({
		modelValue: String,
		tabs: Array,
		brothers: Boolean,
		bg: String,
		textColor: String,
		borderColor: String,
		size: String, // up | md | lg | xl | 2xl | 3xl
		mode: String,	
		putScroll: Boolean	
	})
	const emits = defineEmits(['update:modelValue'])

	const value = computed({
		get(){ return props.modelValue },
		set(v){ emits('update:modelValue', v) }
	})

	const tabClicked = (e,tab) => {
		props.tabs.forEach((t)=>{t.selected = false})
		tab.selected = true
		emits('update:modelValue', tab.label)
	}

	const putScrollToUse = computed(() => props.putScroll)

	const scrollToRight = (e) => {
		let elem = e.target.nextElementSibling.nextElementSibling
		elem.scrollTo({
			left: elem.scrollLeft + 200,
			behavior: 'smooth'
		})
	}

	const scrollToLeft = (e) => {
		let elem = e.target.nextElementSibling
		elem.scrollTo({
			left: elem.scrollLeft - 200,
			behavior: 'smooth'
		})
	}

	const bgToUse = computed(()=>{
		return CSS.supports('color', props.bg) ? props.bg : '#e6e6e6'
	})

	const textColorToUse = computed(()=>{
		return CSS.supports('color', props.textColor) ? props.textColor : 'black'
	})

	const borderColorToUse = computed(()=>{
		return CSS.supports('color', props.borderColor) ? props.borderColor : 'red'
	})	

	const txSize = computed(()=>{
		if(props.size == 'sm') return 'xs'
		else if(props.size == 'md') return 'sm'
		else if(props.size == 'lg') return 'sm'
		else if(props.size == 'xl') return 'md'
		else if(props.size == '2xl') return 'lg'
		else if(props.size == '3xl') return 'xl'
	})

	const padL = computed(()=>{
		if(props.size == 'sm') return 2
		else if(props.size == 'md') return 4
		else if(props.size == 'lg') return 6
		else if(props.size == 'xl') return 6
		else if(props.size == '2xl') return 8
		else if(props.size == '3xl') return 12
	})

	const padR = computed(()=>{
		if(props.size == 'sm') return 2
		else if(props.size == 'md') return 4
		else if(props.size == 'lg') return 6
		else if(props.size == 'xl') return 6
		else if(props.size == '2xl') return 8
		else if(props.size == '3xl') return 12
	})

	const padB = computed(()=>{
		if(props.size == 'sm') return 1
		else if(props.size == 'md') return 1
		else if(props.size == 'lg') return 1
		else if(props.size == 'xl') return 2
		else if(props.size == '2xl') return 2
		else if(props.size == '3xl') return 4
	})

	const padT = computed(()=>{
		if(props.size == 'sm') return 0.5
		else if(props.size == 'md') return 1
		else if(props.size == 'lg') return 1
		else if(props.size == 'xl') return 1
		else if(props.size == '2xl') return 1
		else if(props.size == '3xl') return 2
	})

	watch(value, (n)=>{
		props.tabs.forEach((t)=>{t.selected = false})
		props.tabs.forEach((t)=>{
			if(t.label == n)
			t.selected = true
		})
		emits('update:modelValue', n)
	})

</script>

<style scoped>
	.tabsFont{
		font-family: 'Exo 2';
		background-color: v-bind(bgToUse);
		color: v-bind(textColorToUse);
	}
	/*	up*/
	.upIn{		background-color: v-bind(borderColorToUse);		animation: upInFrames 0.3s ease-out forwards;	}
	@keyframes upInFrames{
		0%{ transform:scale(0,0); transform:translate(5px,5px); }
		100%{ transform:scale(1,1); transform:translate(0px, 0px); }
	}
	.upOut{
		background-color: v-bind(borderColorToUse);
		animation: upOutFrames 0.3s ease-out forwards;
	}
	@keyframes upOutFrames{		0%{ width:100;  }		100%{ width:0%;  }	}
	/*	up*/

	/*	opacity*/
	.opacityIn{
		background-color: v-bind(borderColorToUse);		animation: opacityInFrames 0.5s ease-out forwards;	}
	@keyframes opacityInFrames{
		0%{ opacity:0;  }
		100%{ opacity:1;  }
	}
	.opacityOut{
		background-color: v-bind(borderColorToUse);
		animation: opacityOutFrames 0.5s ease-out forwards;
	}
	@keyframes opacityOutFrames{		0%{ opacity:1;  }		100%{ opacity:0;  }	}
	/*	opacity*/

	/*	door*/
	.doorIn{
		background-color: v-bind(borderColorToUse);		animation: doorInFrames 0.5s ease-out forwards;	}
	@keyframes doorInFrames{
		0%{ width:0; transform:rotate(170deg); }
		100%{ width:100%; transform:rotate(180deg); }
	}
	.doorOut{
		background-color: v-bind(borderColorToUse);
		animation: doorOutFrames 0.5s ease-out forwards;
	}
	@keyframes doorOutFrames{
		0%{ width:100%; transform:rotate(180deg); }
		100%{ width:0; transform:rotate(170deg); }		
	}
	/*	door*/

	/*	straight*/
	.straightIn{
		background-color: v-bind(borderColorToUse);		animation: straightInFrames 0.4s ease-out forwards;	}
	@keyframes straightInFrames{
		0%{ transform: scale(0,0);  }
		100%{ transform: scale(1,1);}
	}
	.straightOut{
		background-color: v-bind(borderColorToUse);
		animation: straightOutFrames 0.4s ease-out forwards;
	}
	@keyframes straightOutFrames{
		0%{ transform: scale(1,1);  }
		100%{ transform: scale(0,0) ;  }		
	}
	/*	straight*/

	/*	flow*/
	.flowIn{
		background-color: v-bind(borderColorToUse);		animation: flowInFrames 0.3s ease-out forwards;	}
	@keyframes flowInFrames{
		0%{ width:0;  }
		100%{ width:100%;}
	}
	.flowOut{
		background-color: v-bind(borderColorToUse);
		animation: flowOutFrames 0.3s ease-out forwards;
	}
	@keyframes flowOutFrames{
		0%{ width:100%;}
		100%{ width:0;  }		
	}
	/*	flow*/
</style>















