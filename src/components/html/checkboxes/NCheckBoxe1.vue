<template><div class='relative flex gap-x-12'>	
	<label ref='cssCheckboxRef' class='cssCheckbox relative inline-flex gap-x-[10px] hover:shadow pl-2 pr-2 items-center transition-all duration-200'>
		<input class='hidden' type="checkbox" name="test" v-model='model'>		
		<span 
			class="flex items-center bg-white w-[15px] h-[15px]"
		>
			<svg
			    viewBox="0 0 123.35514 108.92151"
			    version="1.1"
			    id="svg5"
			    xml:space="preserve"
			    xmlns="http://www.w3.org/2000/svg"
			    xmlns:svg="http://www.w3.org/2000/svg">
   			    
   				<g     id="layer1"     transform="translate(-47.407479,-134.56448)">
   					<rect
				   	   class='rect1'
				       style="fill:#ffffff;stroke-linecap:round;stroke-linejoin:bevel"
				       id="rect248"
				       width="119.35514"
				       height="104.92149"
				       x="49.407478"
				       y="136.56448"
				       rx="25.280341" 
				    />
			        <path
			          class='path1'
				      style="fill:#ffffff;stroke:#4d4d4d;stroke-width:8;stroke-linecap:round;stroke-linejoin:bevel"
				      d="m 72.863552, 200.41308 23.871027,23.87103 48.829901,-65.39252"
				      id="path452"
				      sodipodi:nodetypes="ccc" 
				    />
   				</g>
			</svg>
		</span>
		<span v-if='labelToUse != ""' class='text-base'>{{labelToUse}}</span>
	</label>
	
</div></template>

<script setup>
	import { ref, computed, watch } from 'vue'

	const props = defineProps({
		modelValue: Boolean,
		label: String
	})

	const emit = defineEmits(['update:modelValue'])

	const model = computed({
		get(){ return props.modelValue },
		set(v){ emit('update:modelValue', v) }
	})

	const cssCheckboxRef = ref(null)
	const labelToUse = computed(()=> props.label)
	
	watch(model, (n)=>{
		if(n){
			cssCheckboxRef.value.classList.add('cssCheckboxFinalBox')
			cssCheckboxRef.value.classList.remove('cssCheckboxFinalBoxOff')	
		} 
		else{
			cssCheckboxRef.value.classList.remove('cssCheckboxFinalBox')
			cssCheckboxRef.value.classList.add('cssCheckboxFinalBoxOff')	
		} 
		
	})
</script>

<style scoped>
	.rect1{
		stroke: #999999;
		stroke-width:6;
		stroke-dasharray: 450;
		stroke-dashoffset: 0;
		transition: all 0.4s linear;
	}
	.cssCheckbox:hover .rect1{
		stroke: #595959;		
		stroke-width: 10;	
	}
	.cssCheckbox:hover{
		box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
	}
	.cssCheckbox input[type="checkbox"]:checked + span svg rect {
		stroke-dashoffset: 450;
	}
	
	.cssCheckboxFinalBox{ box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1); }
	.cssCheckboxFinalBoxOff{ box-shadow: 0 0px 0px 0 transparent; }
	.path1{
		stroke: #999999;
		stroke-dasharray: 350;
		stroke-dashoffset: 350;
		transition: all 0.4s linear;
	}
	.cssCheckbox input[type="checkbox"]:checked + span svg path {
		stroke-dashoffset: 0;
	}

</style>



































