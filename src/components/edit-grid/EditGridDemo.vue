<template><div>
	<NEditGrid>
		<Column></Column>
	</NEditGrid>
</div></template>

<script setup>
	import NEditGrid from '/src/components/edit-grid/NEditGrid.vue'

	import { ref } from 'vue'

	const gridDataStructure = ref({
		value: 0,			
	})
	
</script>

<style scoped></style>
