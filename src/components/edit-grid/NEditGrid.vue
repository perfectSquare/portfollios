<template><div class='relative flex flex-col gap-y-2'>
	<button class="p-1 bg-gray-200" v-on="{ click: true ? addRow : null }">add</button>
	<!-- <button class="p-1 bg-gray-200" @click='saveRow'>save</button> -->



		<template v-for='(row,j) in gridDate' :key='j'>
				{{row}}
			<NTextInput							
						inputType='number'
						v-model='row.value'
						placeHolder=''
						bg='#e1e1e1'
						borderColor=''
						textColor='black'
					/>							
		</template>

	
</div></template>

<script setup>
	import { ref, computed } from 'vue'
	import NCheckBoxe1 from '/src/components/html/checkboxes/NCheckBoxe1.vue'
	import NTextInput from '/src/components/html/input/NTextInput.vue'

	const props = defineProps({
		gridDataStructure: Object,
	})
	const emits = defineEmits(['update'])

	
	const gridDate = ref([])	
	
	const addRow = ()=> {
		gridDate.value.push(props.gridDataStructure)
		// gridDate.value.push({		value: 0,				})
		console.log(gridDate.value)
	}
</script>

<style scoped></style>
