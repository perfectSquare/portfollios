<template><div class='flex flex-col gap-y-1'>
	<!-- <NCheckBoxe2 label='vue Js' />	  -->
 	
 	<div class="grid grid-cols-12">
 		<NCheckBoxe1 class='col-span-2' label='html' v-model='htmlModel' />	
 		<div class="text-xs col-span-3 flex items-center">custom v-model: {{htmlModel}}</div>
 	</div>

 	<div class="grid grid-cols-12">
 		<NCheckBoxe1 class='col-span-2' label='css' v-model='cssModel' />	
 		<div class="text-xs col-span-3 flex items-center">custom v-model: {{cssModel}}</div>
 	</div>

 	<div class="grid grid-cols-12">
 		<NCheckBoxe1 class='col-span-2' label='javascript' v-model='javascriptModel' />	
 		<div class="text-xs col-span-3 flex items-center">custom v-model: {{javascriptModel}}</div>
 	</div>

 	<div class="grid grid-cols-12">
 		<NCheckBoxe1 class='col-span-2' label='vue JS' v-model='vueModel' />	
 		<div class="text-xs col-span-3 flex items-center">custom v-model: {{vueModel}}</div>
 	</div>
	
	
</div></template>
	
<script setup>
	import NCheckBoxe1 from '/src/components/html/checkboxes/NCheckBoxe1.vue'
	import NCheckBoxe2 from '/src/components/html/checkboxes/NCheckBoxe2.vue'
	import { ref } from 'vue'

	const htmlModel = ref(false)
	const cssModel = ref(false)
	const javascriptModel = ref(false)
	const vueModel = ref(false)
</script>

<style scoped></style>
