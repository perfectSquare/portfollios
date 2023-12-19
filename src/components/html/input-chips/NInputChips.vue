<template><div ref='inputMainRef' class='relative mainDiv'>
	<input 
		ref='inputRef'
		type="text" 
		name="inputChips"
		class='outline-none w-full pt-2 pl-2 ring-1 ring-gray-300 focus:ring-gray-700 transition-all duration-300 rounded'
		v-model='chipToAdd'
		@keypress.enter='addChip'
	>	
	<div ref='chipsDivRef' class="absolute -top-2 left-[3%] flex gap-x-1 items-center w-[94%] overflow-hidden">
		<template v-for='(chip,i) in chips' :key='i'>
			<div class="bg-gray-200 px-1 flex gap-x-1 items-center rounded chipAddAnimation">
				<div class='text-[11px] text-center'>{{chip}}</div>
				<div @click='chipOff(chip, i)' class='text-[9px] cursor-pointer hover:scale-110'>&#10008;</div>
			</div>
		</template>
	</div>
	<div v-if='showArrows' @click='scrollToLeft' class="absolute -top-3 left-0 cursor-pointer hover:scale-110">&#10094;</div>
	<div v-if='showArrows' @click='scrollToRight' class="absolute -top-3 right-0 cursor-pointer hover:scale-110">&#10095;</div>
	<div class="w-full mt-2">Chips Array: {{chips}}</div>
</div></template>

<script setup>
	import { ref, computed } from 'vue'

	const props = defineProps({
		widthPercent: Number
	})

	const inputMainRef = ref(null)
	const inputRef = ref(null)
	const chipsDivRef = ref(null)
	const chips = ref([])
	const chipToAdd = ref('')
	const showArrows = ref(false)

	const widthToUse = computed(()=> props.widthPercent + '%' )

	const addChip = () => {
		if(chipToAdd.value == '') return
		chips.value.push(chipToAdd.value)

		let wid = 0
		setTimeout(()=>{
			for(let elem of chipsDivRef.value.children){
				wid += elem.clientWidth			
			}
		if(wid + 50 > inputMainRef.value.clientWidth) showArrows.value = true
		else showArrows.value = false
		}, 100)
		chipToAdd.value = ''	
	}

	const chipOff = (ch,i) => {		
		chips.value = chips.value.filter((ch,index) => index != i)
		let wid = 0
		setTimeout(()=>{
			for(let elem of chipsDivRef.value.children){
				wid += elem.clientWidth			
			}
		if(wid + 50 < inputMainRef.value.clientWidth) showArrows.value = false
		else showArrows.value = true
		}, 100)			
	}

	const scrollToLeft = () => {
		chipsDivRef.value.scrollTo({
			left: chipsDivRef.value.scrollLeft + 200,
			behavior: 'smooth'
		})
	}

	const scrollToRight = () => {
		chipsDivRef.value.scrollTo({
			left: chipsDivRef.value.scrollLeft - 200,
			behavior: 'smooth'
		})
	}

	</script>

<style scoped>
	.mainDiv{
		width: v-bind(widthToUse);
	}
	input{
		text-indent: v-bind(indentedCalculator);
	}
	.chipAddAnimation{
		transform-origin: left;
		animation: chipAddAnimationFrames 0.3s linear;
	}
	@keyframes chipAddAnimationFrames{
		0%{ transform:scale(0,0); }
		100%{ transform: scale(1,1); }
	}
</style>




