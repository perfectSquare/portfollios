<template>
<div 
	class='relative inline-flex'
	:class="{'flex-col gap-y-1': directionToUse == 'column', 'flex-row gap-x-4': directionToUse == 'row'}"
>
	<template v-for='(rd,i) in radios' :key='i'>		
	<label 
		@click='done(rd)' 
		class='cssRadio relative inline-flex gap-x-[10px] pl-2 pr-2 items-center transition-all duration-200'
		:class="{'cssCheckboxFinalBox': rd.done, 'cssCheckboxFinalBoxOff': !rd.done}"
	>
		<input type="radio" :name="name" :value="rd.value" v-model='model'>
		<span class="absolute left-[8px] flex items-center b-red-300 w-[13px] h-[13px] rounded-full">
		<svg
   viewBox="0 0 112.98232 112.98232"
   version="1.1"
   id="svg5"
   xml:space="preserve"
   xmlns="http://www.w3.org/2000/svg"
   xmlns:svg="http://www.w3.org/2000/svg"><defs
     id="defs2"><linearGradient
       id="linearGradient2834"><stop
         style="stop-color:#ffffff;stop-opacity:1;"
         offset="0"
         id="stop2832" /></linearGradient></defs><g
     id="layer1"
     transform="translate(-31.823451,-75.659353)">
     <circle
       class='cir1'       
       id="circle3734"
       cx="88.314613"
       cy="132.15051"
       r="55.741161" />
       <circle
       class='cir'       
       id="circle302"
       cx="87.564224"
       cy="132.27391"
        /></g></svg>

		</span>

		<span class='text-base'>{{rd.label}}</span>
	</label>
	</template>
	
	
</div></template>

<script setup>
	import { ref, computed } from 'vue'

	const props = defineProps({
		modelValue: String,
		radios: Array,
		direction: String,
		name: String
	})

	const emit = defineEmits(['update:modelValue'])

	const model = computed({
		get(){ return props.modelValue },
		set(v){ emit('update:modelValue', v) }
	})

	const directionToUse = computed(()=> props.direction)

	const done = (x) => {
		props.radios.forEach((r)=> r.done = false)
		x.done = true
	}

</script>

<style scoped>	
	.cssRadio:hover{
		border-radius: 4px; box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
	}
	.cssCheckboxFinalBox{ border-radius: 4px; box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1); }
	.cssCheckboxFinalBoxOff{ border-radius: 4px; box-shadow: 0 0px 0px 0 transparent; }
	.cir1{
		fill:#ffffff;
		fill-opacity:1;
		stroke:#808080;
		stroke-width: 3;
		stroke-linecap:round;
		stroke-linejoin:bevel;
		stroke-opacity:1;
		transition: all 0.3s linear;
	}
	.cssRadio:hover .cir1{
		stroke: #4d4d4d;
		stroke-width: 6;
	}
	.cir{
		fill:#5fc25f;
		fill-opacity: 0;
		r:10.178701;
	}
	.cssRadio input[type="radio"]:checked+span svg g .cir1{
		stroke-width: 6;
	}
	.cssRadio input[type="radio"]:checked+span svg g .cir{
		animation: cirFrames 0.3s linear forwards;		
	}	
	@keyframes cirFrames{
		0%{	    fill-opacity: 1; r:15.178701; }
		25%{	fill-opacity: 1; r:45.178701; }
		50%{	fill-opacity: 1; r:35.178701; }
		75%{	fill-opacity: 1; r:25.178701; }
		100%{	fill-opacity: 1; r:30.178701; }		
	}
</style>

