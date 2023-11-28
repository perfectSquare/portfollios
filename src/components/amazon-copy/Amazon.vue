<template><div class="flex flex-col">
	<AmazonNav />
	<AmazonMenu />				
	<div class="infoDiv p-4 flex flex-col gap-y-2">
		<div class="text-xl bg-gray-100 p-4 rounded-xl">Follow: &#9776;All &#10230; Electronics &#10230; Accessories & Supplies </div>
		<div class="text-xl bg-gray-100 p-4 rounded-xl">
			No library is used for zoom on details of an item
		</div>
		<div class="text-xl bg-gray-100 p-4 rounded-xl">
			JS Observer API [ IntersectionObserver ] is used on details of an item
		</div>
	</div>
</div></template>

<script setup>	
	import AmazonNav from '/src/components/amazon-copy/comps/AmazonNav.vue'
	import AmazonMenu from '/src/components/amazon-copy/comps/AmazonMenu.vue'

	
</script>		

<style scoped>
.infoDiv{
	position: relative;
	width: 90%;
	left: 5%;
}
</style>
