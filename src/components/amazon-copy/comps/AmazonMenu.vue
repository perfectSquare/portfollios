<template><div>
	<div class="relative bg-gray-700 text-white flex gap-2 p-2">
		<div @click='menuShow = !menuShow; downShow = false' class='flex gap-2 cursor-pointer hover:ring-1 hover:ring-white pl-2 pr-2'>
			<div>&#9776;</div>
			<div>All</div>
		</div>
		<div class='cursor-pointer hidden sm:inline self-center hover:ring-1 hover:ring-white pl-2 pr-2'>Today's deals</div>
		<div class='cursor-pointer hidden sm:inline self-center hover:ring-1 hover:ring-white pl-2 pr-2'>Customer Services</div>
		<div class='cursor-pointer hidden sm:inline self-center hover:ring-1 hover:ring-white pl-2 pr-2'>Registry</div>
		<div class='cursor-pointer hidden sm:inline self-center hover:ring-1 hover:ring-white pl-2 pr-2'>Gift Cards</div>
		<div class='cursor-pointer hidden sm:inline self-center hover:ring-1 hover:ring-white pl-2 pr-2'>Sell</div>
		<div 
			class="absolute right-4 sm:hidden cursor-pointer"
			@click='downShow = !downShow'
		>&#9947;</div>
		<Transition>
		<div v-if='downShow' class="absolute  top-12 left-4 z-50 w-5/6 bg-gray-700 text-white flex flex-col gap-2 p-2">
			<div class='cursor-pointer w-full self-center hover:ring-1 hover:ring-white pl-2 pr-2'>Today's deals</div>
			<div class='cursor-pointer w-full self-center hover:ring-1 hover:ring-white pl-2 pr-2'>Customer Services</div>
			<div class='cursor-pointer w-full self-center hover:ring-1 hover:ring-white pl-2 pr-2'>Registry</div>
			<div class='cursor-pointer w-full self-center hover:ring-1 hover:ring-white pl-2 pr-2'>Gift Cards</div>
			<div class='cursor-pointer w-full self-center hover:ring-1 hover:ring-white pl-2 pr-2'>Sell</div>
		</div>
		</Transition>
	</div>	

	<Teleport to='#air'>
	<Transition>
	<div 
		v-if='menuShow' 
		class="fixedDiv"
		@click.self='(e) => {
			menuShow =! menuShow;
			e.target.children[0].classList.remove("menuAn");
			e.target.children[0].classList.add("menuAnR");
		}'
	>				
		<div :class='menuClass'>
			<div class="absolute -right-6 top-0 text-2xl text-white cursor-pointer" @click='menuShow =! menuShow'>&#10005;</div>			
			<div class="flex flex-col gap-y-1">
				<div class="font-semibold text-xl p-3 indent-2">Shop By Department</div>
				<div 
					class="hover:bg-gray-200 p-2 w-full indent-4 text-sm cursor-pointer flex" 
					@mouseenter='(e) => {e.target.children[1].classList.remove("text-gray-500"); e.target.children[1].classList.add("text-black");}'
					@mouseleave='(e) => {e.target.children[1].classList.add("text-gray-500"); e.target.children[1].classList.remove("text-black");}'
					@click='(e) => {
						subMenuShow = true; 
						mainMenuShow = menuShow = false;
						e.target.parentElement.parentElement.classList.remove("menuAn");
						e.target.parentElement.parentElement.classList.add("menuAnR");
					}'
				>
					<div>Electronics</div>
					<div class="text-gray-500 rotate-180 absolute right-4">&#12337;</div>
				</div>
				<div 
					class="hover:bg-gray-200 p-2 w-full indent-4 text-sm cursor-pointer flex" 
					@mouseenter='(e) => {e.target.children[1].classList.remove("text-gray-500"); e.target.children[1].classList.add("text-black");}'
					@mouseleave='(e) => {e.target.children[1].classList.add("text-gray-500"); e.target.children[1].classList.remove("text-black");}'
				>
					<div>Computers</div>
					<div class="text-gray-500 rotate-180 absolute right-4">&#12337;</div>
				</div>
				<div 
					class="hover:bg-gray-200 p-2 w-full indent-4 text-sm cursor-pointer flex" 
					@mouseenter='(e) => {e.target.children[1].classList.remove("text-gray-500"); e.target.children[1].classList.add("text-black");}'
					@mouseleave='(e) => {e.target.children[1].classList.add("text-gray-500"); e.target.children[1].classList.remove("text-black");}'
				>
					<div>Smart Home</div>
					<div class="text-gray-500 rotate-180 absolute right-4">&#12337;</div>
				</div>
				<div 
					class="hover:bg-gray-200 p-2 w-full indent-4 text-sm cursor-pointer flex" 
					@mouseenter='(e) => {e.target.children[1].classList.remove("text-gray-500"); e.target.children[1].classList.add("text-black");}'
					@mouseleave='(e) => {e.target.children[1].classList.add("text-gray-500"); e.target.children[1].classList.remove("text-black");}'
				>
					<div>Art and Crafts</div>
					<div class="text-gray-500 rotate-180 absolute right-4">&#12337;</div>
				</div>
			</div>
		</div>		
	</div>		
	</Transition>		
	</Teleport>
	<Teleport to='#air'>
	<Transition>
	<div 
		v-if='subMenuShow' 
		class="fixedDiv"
		@click.self='(e) => {
			subMenuShow =! subMenuShow;
			e.target.children[0].classList.remove("menuAn");
			e.target.children[0].classList.add("menuAnR");
		}'
	>				
		<div :class='menuClass'>
			<div class="absolute -right-6 top-0 text-2xl text-white cursor-pointer" @click='menuShow = false; subMenuShow = false'>&#10005;</div>			
			<div 
				class="flex w-full items-center gap-4 text-sm hover:bg-gray-200 p-2 cursor-pointer border-b-2 border-gray-200"
				@click='menuShow = true; subMenuShow = false'
			>
				<div class="rotate-180 relative left-4 indent-4 text-gray-500 text-xl">&#10140;</div>
				<div class="font-semibold">MAIN MENU</div>
			</div>			
			<div class="flex flex-col gap-y-1 text-sm">
				<div class="font-semibold indent-6">Electronics</div>
				<div 
					class="hover:bg-gray-200 cursor-pointer p-2 indent-4"
					@click='loadAccessories'
				>Accessories & Supplies</div>
				<div class="hover:bg-gray-200 cursor-pointer p-2 indent-4">Camera & Photo</div>
				<div class="hover:bg-gray-200 cursor-pointer p-2 indent-4">...</div>
			</div>
		</div>		
	</div>		
	</Transition>		
	</Teleport>

</div></template>

<script setup>	
	import { ref } from 'vue'
	import { useRouter } from 'vue-router'
	import AmazonNav from '/src/components/amazon-copy/comps/AmazonNav.vue'

	const router = useRouter()
	const menuShow = ref(false)
	const subMenuShow = ref(false)
	const menuClass = ref('absolute w-1/2 md:w-2/5 lg:w-1/4 menuAn bg-white flex flex-col gap-y-4')
	const downShow = ref(false)

	/////////////////////// accesories
	const loadAccessories = () => {
		router.push({name: "electronics-accessories"})
	}
	/////////////////////// accesories

</script>		

<style scoped>
.fixedDiv{
	position: fixed;
	top: 0%;
	width: 100%;
	height: 100%;
	background-color: rgb(13, 13, 13, 0.7);
}
.v-enter-from{ opacity:0; }
.v-enter-active{ transition:all 0.2s linear; }
.v-leave-to{ opacity:0; }
.v-leave-active{ transition:all 0.2s linear; }

.menuAn { 	animation: menuFrames 0.5s linear;   height:100%;}
@keyframes menuFrames {	0%{ left:-20%;  }	100%{ left:0%;  }	}
.menuAnR { 	animation: menuFramesR 0.5s linear;   height:100%;}
@keyframes menuFramesR {	0%{ left:0%;  }	100%{ left:-20%;  }	}
</style>