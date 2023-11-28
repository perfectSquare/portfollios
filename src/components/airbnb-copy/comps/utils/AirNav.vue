<template><div class='w-full'>
	<div class='grid grid-cols-12 gap-4'>
		<div class="col-span-3 flex gap-2">
			<img v-if='luxi' src="/assets/airbnb/airbnbLux.png" class='w-7 h-8 self-center'>
			<img v-else src="/assets/airbnb/airbnb.png" class='w-7 h-8 self-center'>
			<div v-if='luxi' class="colClassLux font-bold text-2xl">Luxe</div>			
			<div v-else class="colClass font-bold text-2xl">airbnb</div>			
		</div>
		<div class="col-span-9 hidden md:flex md:justify-around md:items-center">
			<div>search</div>
			<div class="flex gap-4 self-center">
				<div class="p-2 hover:bg-gray-100 rounded-2xl cursor-pointer">Become a host</div>
				<img src="/assets/airbnb/world.png" class="w-4 h-4 self-center">
			</div>
		</div>
		<div class="inline md:hidden absolute right-6 self-center text-xl cursor-pointer hover:scale-110 transition-all duration-100">&#9776;</div>
	</div>
</div></template>

<script setup>
	const props = defineProps({
		luxi: Boolean
	})
</script>

<style scoped>
	.colClass{
		color: #fa004b;
		font-family: "Play";
	}
	.colClassLux{
		color: #42559e;
		font-family: "Play";
	}
</style>