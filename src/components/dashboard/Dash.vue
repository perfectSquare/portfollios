<template><div class='p-2 md:p-4'>	
	<div class="justify-center items-center flex flex-col md:flex-row gap-4 p-4">
		<div class="text-2xl">Admin Dashboard Demo (Vue JS)</div>
		<div class="text-base"> <a href="https://sore-pleat-hen.cyclic.app/" target="_blank" class='text-n8 border-b-2'>REST API</a> using Axios</div>
	</div>
	<div class='grid grid-cols-12 gap-1 md:gap-1'>		
		<!-- left -->		
		<div class="hidden z-50 absolute w-44 md:w-full md:relative md:col-span-2 md:flex md:flex-col md:gap-2 bg-purple-50 border-l-2 border-gray-400 p-1 md:p-2 rounded-md"> 
			<div class="flex flex-col gap-1 items-center relative p-1 md:p-2 w-full">
				<button class="absolute self-center right-2 block md:hidden text-xl hover:scale-125 transition-all duration-500" @click='leftHide'>&#9874;</button>
				<img src="/assets/dashboard/logo.png" class="w-12">
				<div class="w-full text-center">Company</div>
			</div>	
			<div class='border-b-2 border-gray-200'></div> 
			<div class="flex gap-1 relative">
				<img src="/assets/dashboard/hand1.png" class="hidden w-8 absolute top-4">				
				<img src="/assets/dashboard/sales1.png" class="w-5 h-5 relative">
				<button @mouseenter='hovItem' @mouseleave='hovItemOff' :class="btClass" @click='(e) => {take = Sales; e.target.parentElement.parentElement.classList.add("hidden") }'>sales</button>
			</div>
			<div class="flex gap-1 relative">
				<img src="/assets/dashboard/hand1.png" class="hidden w-8 absolute top-4">				
				<img src="/assets/dashboard/sold1.png" class="w-5 h-5 relative">
				<button @mouseenter='hovItem' @mouseleave='hovItemOff' :class="btClass" @click='(e) => {take = Sold; e.target.parentElement.parentElement.classList.add("hidden") }'>sold</button>
			</div>
			<div class="flex gap-1 relative">
				<img src="/assets/dashboard/hand1.png" class="hidden w-8 absolute top-4">				
				<img src="/assets/dashboard/product1.png" class="w-5 h-5 relative">
				<button @mouseenter='hovItem' @mouseleave='hovItemOff' :class="btClass" @click='(e) => {take = Products; e.target.parentElement.parentElement.classList.add("hidden") }'>products</button>
			</div>						
			<div class="flex gap-1 relative">
				<img src="/assets/dashboard/hand1.png" class="hidden w-8 absolute top-4">				
				<img src="/assets/dashboard/expense1.png" class="w-5 h-5 relative">
				<button @mouseenter='hovItem' @mouseleave='hovItemOff' :class="btClass" @click='(e) => {take = Expenses; e.target.parentElement.parentElement.classList.add("hidden") }'>expenses</button>
			</div>
			<div class="flex gap-1 relative">
				<img src="/assets/dashboard/hand1.png" class="hidden w-8 absolute top-4">				
				<img src="/assets/dashboard/offer1.png" class="w-5 h-5 relative">
				<button @mouseenter='hovItem' @mouseleave='hovItemOff' :class="btClass" @click='(e) => {take = Offers; e.target.parentElement.parentElement.classList.add("hidden") }'>offers</button>
			</div>
		</div> <!-- left -->

		<!-- right -->
		<div class="relative p-1 border-r-2 border-gray-400 col-span-12 md:col-span-10 flex flex-col gap-2 bg-gray-50 dashCloud rounded-md">				
			<div class="flex justify-center rounded-md p-2 items-center bg-s5 gap-2"> <!-- div 1 -->
				<button @click='showLeft' class='inline md:hidden text-xl'>&#9776;</button>
				<div class="w-full flex h-12">
					<input type="text" placeholder="search..." class='search outline-none p-2 rounded-md' @click='animateSearch'>
					<button class="self-center crossAnimation hidden text-xl hover:scale-125 transition-all duration-500" @click='hideSearch'>&#9874;</button>
				</div>
				<div class="relative" @mouseenter='toolShow=true' @mouseleave='toolShow=false'>
					<img src="/assets/dashboard/face.png" class="w-16">
					<Transition name='toolTransition'>
					<div  v-if='toolShow' class="tooltip rounded-md w-44 absolute z-50 right-0 flex flex-col gap-2 bg-gray-700 p-4 md:p-8 text-white">
						<div class="text-gray-500">hello admin</div>
						<div>Adam</div>
						<div class='border-b-2 border-gray-200'></div> 
						<div class='p-2 flex flex-col gap-2'>
							<div class="flex justify-between"><button @mouseenter='toolInnerHover' @mouseleave='toolInnerHoverOff'>profile</button><div class="text-gray-400 transition-all duration-500">&#127895;</div></div>
							<div class="flex justify-between"><button @mouseenter='toolInnerHover' @mouseleave='toolInnerHoverOff'>settings</button><div class="text-gray-400 transition-all duration-500">&#9881;</div></div>
							<div class="flex justify-between"><button @mouseenter='toolInnerHover' @mouseleave='toolInnerHoverOff'>logout</button><div class="text-gray-400 transition-all duration-500">&rarrb;</div></div>
						</div>
					</div>
					</Transition>
				</div>
			</div> <!-- div 1 -->

			<div>	<!-- div 2 -->
				<KeepAlive>
					<Transition name="componentTransition" mode="out-in">
				  		<component :is="take"></component>					
				  </Transition>
				</KeepAlive>				
			</div>	<!-- div 2 -->

			
		</div>
	</div>

</div></template>

<script setup>
	import { ref, shallowRef } from 'vue'
	import Products from '/src/components/dashboard/comps/Products.vue'
	import Expenses from '/src/components/dashboard/comps/Expenses.vue'
	import Sales from '/src/components/dashboard/comps/Sales.vue'
	import Offers from '/src/components/dashboard/comps/Offers.vue'
	import Sold from '/src/components/dashboard/comps/Sold.vue'

	const take = shallowRef()		

	const btClass = ref('w-full text-left ml-2 text-gray-500 hover:text-black rounded-r-lg hover:bg-gradient-to-r hover:from-gray-50 hover:to-s5 transition-all duration-500')
	const showSearch = ref(false)
	const toolShow = ref(false)
	
	const hovItem = (e) => {
		e.target.previousElementSibling.classList.add('itemAn')
		e.target.previousElementSibling.previousElementSibling.classList.remove('hidden')
		e.target.previousElementSibling.previousElementSibling.classList.add('handMove')
	}
	const hovItemOff = (e) => {
		e.target.previousElementSibling.classList.remove('itemAn')
		e.target.previousElementSibling.previousElementSibling.classList.add('hidden')
	}

	const showLeft = (e) => {
		e.target.parentElement.parentElement.previousElementSibling.classList.remove('hidden', 'leftAnimationReverse')
		e.target.parentElement.parentElement.previousElementSibling.classList.add('leftAnimation', 'flex', 'flex-col', 'gap-2')
	}

	const leftHide = (e) => {
		e.target.parentElement.parentElement.classList.remove("leftAnimation")
		e.target.parentElement.parentElement.classList.add("leftAnimationReverse")
		setTimeout(() =>{
			e.target.parentElement.parentElement.classList.add("hidden")
		}, 500)
	}
	
	const animateSearch = (e) => {
		e.target.classList.remove('searchAnimationR')
		setTimeout(() => { e.target.classList.add('searchAnimation') }, 1)		
		setTimeout(() => { e.target.nextElementSibling.classList.remove('hidden') }, 500)
	}

	const hideSearch = (e) => {
		e.target.previousElementSibling.classList.remove('searchAnimation')
		setTimeout(() => { e.target.previousElementSibling.classList.add('searchAnimationR'); e.target.classList.add('hidden') }, 1)
	}

	const toolInnerHover = (e) => {
		e.target.nextElementSibling.classList.remove("text-gray-400")
		e.target.nextElementSibling.classList.add("text-gray-100")
	}
	const toolInnerHoverOff = (e) => {
		e.target.nextElementSibling.classList.add("text-gray-400")
		e.target.nextElementSibling.classList.remove("text-gray-100")
	}
</script>

<style scoped>
	.handMove{ animation: handMoveA 0.5s linear forwards;  }
	@keyframes handMoveA {
		0%{ left:-10%;  }
		100%{ left:-5%;  }
	}
	.itemAn{ animation: itemAnA 0.5s linear forwards;  }
	@keyframes itemAnA {
		0%{ bottom:0px;  }
		100%{ bottom:7px;  }
	}
	.dashCloud{
		box-shadow: 20px 20px 20px white inset;
	}
	.leftAnimation{ animation: leftAnimationFrames 0.5s linear; }
	.leftAnimationReverse{ animation: leftAnimationReverseFrames 0.5s linear }
	@keyframes leftAnimationFrames{
		0%{ opacity:0; left:-20%; }
		100%{ opacity:1; left:0%; }
	}
	@keyframes leftAnimationReverseFrames{
		0%{ opacity:1; left:0%; }
		100%{ opacity:0; left:-20%; }
	}

	.search{
		background: url(/assets/dashboard/search1.png) no-repeat;
		background-position:2% 50%;
		width:3%;		
		text-indent:22px;
		box-shadow:2px 8px 12px white inset;
		
	}
	.searchAnimation{ animation: searchAnimationFrames 0.5s linear forwards; }
	.searchAnimationR{ animation: searchAnimationFrames 0.5s linear reverse; }
	@keyframes searchAnimationFrames{
		0%{
			background-color:#f5f5ff;
			width:3%;
			border-bottom: 0px solid #cccccc;
		}
		100%{
			background-color:#ebebff;
			width:50%;
			border-bottom: 1px solid #cccccc;
		}
	}

	.crossAnimation{ animation: crossAnimationFrames 0.5s linear forwards; }	
	@keyframes crossAnimationFrames{
		0%{ transform:rotate(145deg); }
		100%{ transform:rotate(0deg); }
	}

	.tooltip::after{
		content: "";
  		position: absolute;
  		bottom: 100%;
  		left: 75%;  		
  		border-width: 12px;
  		border-style: solid;
  		border-color: transparent transparent white transparent;
	}
	.toolTransition-enter-from{ opacity:0; }
	.toolTransition-enter-active{ transition: all 0.5s linear; }
	.toolTransition-leave-to{ opacity:0; }
	.toolTransition-leave-active{ transition: all 0.5s linear; }

	.componentTransition-enter-from{ opacity:0; transform:scale(0.9,0.9); }
	.componentTransition-enter-to{ opacity:1; transform:scale(1,1); }
	.componentTransition-enter-active{ transition: all 0.5s linear;  }

</style>