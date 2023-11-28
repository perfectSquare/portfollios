<template><div class='flex flex-col'>	
	<AmazonNav />
	<AmazonMenu />
	<div v-if='accLoading' class="spin flex gap-1"><div></div><div></div><div></div></div>
	<div v-else-if='acc' class="">
	<div class="fixed z-40 top-32 flex flex-col gap-y-2">
		<div 
			class="bg-gray-400 text-white hover:bg-gray-800 cursor-pointer w-6 hover:w-24 transition-all duration-500 p-1 rounded-br-md rounded-tr-md text-center"
			@click='(e) => {
				byPriceShow=true; 
				byBrandShow = byReviewsShow = false;				
			}'
			@mouseenter='setText($event, "$")' 
			@mouseleave='setTextOut($event, "$")'
		>$</div>
		<div 
			class="bg-gray-400 text-white hover:bg-gray-800 cursor-pointer w-6 hover:w-24 transition-all duration-500 p-1 rounded-br-md rounded-tr-md text-center"
			@click='byBrandShow=true; byPriceShow = byReviewsShow = false;' @mouseenter='setText($event, "b")' @mouseleave='setTextOut($event, "b")'
		>&#10023;</div>
		<div 
			class="bg-gray-400 text-white hover:bg-gray-800 cursor-pointer w-6 hover:w-24 transition-all duration-500 p-1 rounded-br-md rounded-tr-md text-center"
			@click='byReviewsShow=true; byBrandShow = byPriceShow = false;' @mouseenter='setText($event, "r")' @mouseleave='setTextOut($event, "r")'
		>&#128361;</div>
		<div 
			v-if='leftCrossShow'
			class="bg-gray-400 text-white hover:bg-gray-800 cursor-pointer w-6 transition-all duration-500 p-1 rounded-br-md rounded-tr-md text-center"
			:class='leftCrossAnimation'
			@click='leftCrossClick'
		>&#9874;</div>
	</div>

	<Teleport to='#air'>
	<Transition>
	<div 
		v-if='byPriceShow' 
		class="fixedDiv z-50" 
		@click.self='(e) => {
			byPriceShow = false;
			e.target.children[0].classList.remove("innerA");
			e.target.children[0].classList.add("innerAR");
		}'
	>
		<div class="innerFixed innerA bg-white shadow-xl p-4 md:p-8 flex flex-col gap-y-2 rounded-lg">
			<div 
				class="absolute right-1 top-1 cursor-pointer w-8 h-8 flex justify-center items-center hover:bg-gray-200 rounded-full transition-all duration-200"
				@click='(e) => {
					byPriceShow = false;
					e.target.parentElement.classList.remove("innerA");
					e.target.parentElement.classList.add("innerAR");
				}'
			>&#9874;</div>
			<div 
				class="cursor-pointer p-2 border-b-2 border-transparent hover:border-gray-400 text-sm"
				@click='load25'
				>
			Under $25</div>
			<div 
				class="cursor-pointer p-2 border-b-2 border-transparent hover:border-gray-400 text-sm"
				@click='load25To50'
				>
			$25 to $50</div>
			<div 
				class="cursor-pointer p-2 border-b-2 border-transparent hover:border-gray-400 text-sm"
				@click='load50Plus'
				>
			avobe $50</div>
		</div>
	</div>
	</Transition>
	</Teleport>

	<Teleport to='#air'>
	<Transition>
	<div 
		v-if='byBrandShow' 
		class="fixedDiv z-50" 
		@click.self='(e) => {
			byBrandShow = false;
			e.target.children[0].classList.remove("innerA");
			e.target.children[0].classList.add("innerAR");
		}'
	>
		<div class="innerFixed1 innerA bg-white shadow-xl p-4 md:p-8 grid grid-cols-2 sm:grid-cols-4 gap-2 rounded-lg">
			<div 
				class="absolute right-1 top-1 cursor-pointer w-8 h-8 flex justify-center items-center hover:bg-gray-200 rounded-full transition-all duration-200"
				@click='(e) => {
					byBrandShow = false;
					e.target.parentElement.classList.remove("innerA");
					e.target.parentElement.classList.add("innerAR");
				}'
			>&#9874;</div>
<div @click='loadByBrand($event, "Apple")' :class="brandClass">Apple</div>
<div @click='loadByBrand($event, "InvisibleShield")' :class="brandClass">InvisibleShield</div>
<div @click='loadByBrand($event, "Stop and Talk")' :class="brandClass">Stop and Talk</div>
<div @click='loadByBrand($event, "SAMSUNG")' :class="brandClass">SAMSUNG</div>
<div @click='loadByBrand($event, "SOAR")' :class="brandClass">SOAR</div>
<div @click='loadByBrand($event, "Tile")' :class="brandClass">Tile</div>
<div @click='loadByBrand($event, "SanDisk")' :class="brandClass">SanDisk</div>
<div @click='loadByBrand($event, "Belkin")' :class="brandClass">Belkin</div>
<div @click='loadByBrand($event, "BlueParrott")' :class="brandClass">BlueParrott</div>
<div @click='loadByBrand($event, "PopSockets")' :class="brandClass">PopSockets</div>
<div @click='loadByBrand($event, "Skullcandy")' :class="brandClass">Skullcandy</div>
		</div>
	</div>
	</Transition>
	</Teleport>	

	<!-- accessories all -->
	<div class="relative p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mt-4 ml-4">				
		<template v-for='(ac,i) in accessories' :key='i'>			
			<div 
				class='p-4 flex flex-col ring-1 ring-gray-100 relative cursor-pointer'
				@click='openTarget(ac.id, "accessories")'
			>
				<div v-if='ac.best' class="absolute top-0 left-0 bg-n7 text-white text-sm p-1 bestRD">Best Seller</div>
				<img :src="ac.image" class="h-56 self-center">
				<div class="text3Lines">{{ac.description}}</div>

				<div class="flex relative">
					<div 
						class="flex relative"
						@mouseenter='(e) => e.target.children[0].classList.remove("hidden")'
						@mouseleave='(e) => e.target.children[0].classList.add("hidden")'
					>
					<div class="absolute top-4 -left-2 p-4 z-50 flex flex-col gap-y-2 hidden bg-white shadow-xl hovWidth">
						<div class="flex items-center">
							<img src="/assets/amazon/s1.png" class='w-4 h-4'>
							<img src="/assets/amazon/s1.png" class='w-4 h-4'>
							<img src="/assets/amazon/s1.png" class='w-4 h-4'>
							<img src="/assets/amazon/s1.png" class='w-4 h-4'>
							<img v-if='ac.stars >= 4.8' src="/assets/amazon/s1.png" class='w-4 h-4'>
							<img v-if='ac.stars >= 3 && ac.stars < 4.8' src="/assets/amazon/s2.png" class='w-4 h-4'>
							<img v-if='ac.stars < 4' src="/assets/amazon/s3.png" class='w-4 h-4'>				 			
							<div class="ml-2 font-medium">{{ac.stars}} out of 5</div>
						</div>
						<div class="text-gray-500">{{ac.globals}} global ratings</div>
						<template v-for='(st,j) in ac.allStars' :key='j'>
							<div class="flex items-center gap-2">
								<div class="text-blue-600">
									<span class='text-xs' v-if='st.num == "five"'>5 star</span>
									<span class='text-xs' v-if='st.num == "four"'>4 star</span>
									<span class='text-xs' v-if='st.num == "three"'>3 star</span>
									<span class='text-xs' v-if='st.num == "two"'>2 star</span>
									<span class='text-xs' v-if='st.num == "one"'>1 star</span>
								</div>
								<div class="bg-gray-200 relative border border-gray-300 rounded-sm h-4 w-4/6">
									<div 
										class="bg-n7 absolute h-4 hovAnim"
										:class='`hov${st.val}`'
									></div>
								</div>
								<div class='text-blue-600 text-xs'>{{st.val}}%</div>
							</div>
						</template>
					</div>

						<img src="/assets/amazon/s1.png" class='w-4 h-4'>
						<img src="/assets/amazon/s1.png" class='w-4 h-4'>
						<img src="/assets/amazon/s1.png" class='w-4 h-4'>
						<img src="/assets/amazon/s1.png" class='w-4 h-4'>
						<img v-if='ac.stars >= 4.8' src="/assets/amazon/s1.png" class='w-4 h-4'>
						<img v-if='ac.stars >= 3 && ac.stars < 4.8' src="/assets/amazon/s2.png" class='w-4 h-4'>
						<img v-if='ac.stars < 4' src="/assets/amazon/s3.png" class='w-4 h-4'>				 	
						<div class="text-xxs ml-1">&#8744;</div>
					</div>
					<div class="text-blue-600 ml-1 relative bottom-1">{{ac.reviewsNum}}</div>					
				</div>


				
				<div v-if='ac.price != -1' class="flex relative">					
					<sup class="relative top-3">$</sup>
					<div class="text-2xl">{{parseInt(ac.price)}}</div>
					<sup class="relative top-3">{{ (Number((ac.price - Math.trunc(ac.price)).toFixed(2)).toString()).slice(2) }}</sup>
					<div class="line-through ml-2 relative -bottom-2 text-sm">$ {{ac.backPrice}}</div>
				</div>
				<div v-if='ac.only >= 1 && ac.only <= 5' class='text-sm text-red-600'>Only {{ac.only}} left in stock (more on the way).</div>
				<div v-if='ac.only >= 6 && ac.only <= 20' class='text-sm text-red-600'>Only {{ac.only}} left in stock - order soon.</div>
			</div>
		</template>
	</div>
	<!-- accessories all -->

<div class="bg-gray-200 p-24 text-center">footer</div>
	</div>
</div></template>


<script setup>
	import { ref, watch, onMounted } from 'vue'
	import { useQuery, useLazyQuery } from '@vue/apollo-composable'
	import { useRouter } from 'vue-router'
	import gql from 'graphql-tag'

	const router = useRouter()
	const byPriceShow = ref(false)
	const byBrandShow = ref(false)
	const byReviewsShow = ref(false)
	const leftCrossShow = ref(false)
	const leftCrossAnimation = ref('leftCrossA')
	const brandClass = ref('cursor-pointer p-2 text-sm text-center bg-gray-100 hover:bg-gray-200')

	import AmazonNav from '/src/components/amazon-copy/comps/AmazonNav.vue'
	import AmazonMenu from '/src/components/amazon-copy/comps/AmazonMenu.vue'

///////////////////////////// accessories all
	const accessories = ref([])	
	const accSaved = ref([])
	const ACCESSORIES_Q = gql`query ($type: String!) {
  products(type: $type) {
  	id
    name
    image
    description
    reviewsNum
    globals
    stars
    price
    only
    backPrice
    best
    allStars {
    	num
    	val
    }
  }
}`	
	
	const { result: acc, loading: accLoading } = useQuery(ACCESSORIES_Q, () => ({
    	"type": "accessories"
	}))

	watch(acc, val => {				
		accessories.value = val.products
		accSaved.value = val.products		
	})
/////////////////// for mount
	const { result: accL, load: accLLoad } = useLazyQuery(ACCESSORIES_Q, () => ({
    	"type": "accessories"
	}))

	watch(accL, val => {				
		accessories.value = val.products
		accSaved.value = val.products		
	})
	onMounted(() => {
		accLLoad()
	})
/////////////////// for mount	
///////////////////////////// accessories all	

///////////////////////////// accessories 25
	const accessories25 = ref([])	
	const ACCESSORIES_25 = gql`query ($type: String!) {
  products25(type: $type) {
    id
    name
    image
    description
    reviewsNum
    globals
    stars
    price
    only
    backPrice
    best
    allStars {
    	num
    	val
    }
  }
}`
	const acc25Saved = ref([])
	const { result:acc25, loading:acc25Loading, load:load25Done } = useLazyQuery(ACCESSORIES_25, () => ({
    	"type": "accessories"
	}))
	watch(acc25, val => {				
		accessories.value = val.products25; 		
		acc25Saved.value = val.products25; 		
	})
///////////////////////////// accessories 25		

///////////////////////////// accessories 2550
	const accessories2550 = ref([])	
	const ACCESSORIES_2550 = gql`query ($type: String!) {
  products2550(type: $type) {
    id
    name
    image
    description
    reviewsNum
    globals
    stars
    price
    only
    backPrice
    best
    allStars {
    	num
    	val
    }
  }
}`
	const acc2550Saved = ref([])
	const { result:acc2550, loading:acc2550Loading, load:load2550Done } = useLazyQuery(ACCESSORIES_2550, () => ({
    	"type": "accessories"
	}))
	watch(acc2550, val => {				
		accessories.value = val.products2550; 		
		acc2550Saved.value = val.products2550; 		
	})
///////////////////////////// accessories 2550			

///////////////////////////// accessories 50Plus
	const accessories50Plus = ref([])	
	const ACCESSORIES_50Plus = gql`query ($type: String!) {
  products50Plus(type: $type) {
    id
    name
    image
    description
    reviewsNum
    globals
    stars
    price
    only
    backPrice
    best
    allStars {
    	num
    	val
    }
  }
}`
	const acc50PlusSaved = ref([])
	const { result:acc50Plus, loading:acc50PlusLoading, load:load50PlusDone } = useLazyQuery(ACCESSORIES_50Plus, () => ({
    	"type": "accessories"
	}))
	watch(acc50Plus, val => {				
		accessories.value = val.products50Plus; 		
		acc50PlusSaved.value = val.products50Plus; 		
	})
///////////////////////////// accessories 50Plus				

///////////////////////////// accessories ByBrand
	const forBrand = ref('')
	const ACCESSORIES_APPLE = gql`query ($type: String!, $brand: String!) {
  productsByBrand(type: $type, brand: $brand) {
    id
    name
    image
    description
    reviewsNum
    globals
    stars
    price
    only
    backPrice
    best
    allStars {
    	num
    	val
    }
  }
}`
	const accByApple = ref([])
	const { result:accApple, load:accAppleLoad } = useLazyQuery(ACCESSORIES_APPLE, () => ({
    	"type": "accessories",
    	"brand": "Apple"
	}))
	watch(accApple, val => {				
		accByApple.value = val.productsByBrand; 
		accessories.value = accByApple.value		
	})
	const ACCESSORIES_InvisibleShield = gql`query ($type: String!, $brand: String!) {
  productsByBrand(type: $type, brand: $brand) {
    id
    name
    image
    description
    reviewsNum
    globals
    stars
    price
    only
    backPrice
    best
    allStars {
    	num
    	val
    }
  }
}`
	const accByInvisibleShield = ref([])
	const { result:accInvisibleShield, load:accInvisibleShieldLoad } = useLazyQuery(ACCESSORIES_InvisibleShield, () => ({
    	"type": "accessories",
    	"brand": "InvisibleShield"
	}))
	watch(accInvisibleShield, val => {				
		accByInvisibleShield.value = val.productsByBrand; 		
		accessories.value = accByInvisibleShield.value
	})
	const ACCESSORIES_Stop = gql`query ($type: String!, $brand: String!) {
  productsByBrand(type: $type, brand: $brand) {
    id
    name
    image
    description
    reviewsNum
    globals
    stars
    price
    only
    backPrice
    best
    allStars {
    	num
    	val
    }
  }
}`
	const accByStop = ref([])
	const { result:accStop, load:accStopLoad } = useLazyQuery(ACCESSORIES_Stop, () => ({
    	"type": "accessories",
    	"brand": "Stop and Talk"
	}))
	watch(accStop, val => {				
		accByStop.value = val.productsByBrand; 		
		accessories.value = accByStop.value
	})
	const ACCESSORIES_SAMSUNG = gql`query ($type: String!, $brand: String!) {
  productsByBrand(type: $type, brand: $brand) {
    id
    name
    image
    description
    reviewsNum
    globals
    stars
    price
    only
    backPrice
    best
    allStars {
    	num
    	val
    }
  }
}`
	const accBySAMSUNG = ref([])
	const { result:accSAMSUNG, load:accSAMSUNGLoad } = useLazyQuery(ACCESSORIES_SAMSUNG, () => ({
    	"type": "accessories",
    	"brand": "SAMSUNG"
	}))
	watch(accSAMSUNG, val => {				
		accBySAMSUNG.value = val.productsByBrand; 		
		accessories.value = accBySAMSUNG.value
	})
	const ACCESSORIES_SOAR = gql`query ($type: String!, $brand: String!) {
  productsByBrand(type: $type, brand: $brand) {
    id
    name
    image
    description
    reviewsNum
    globals
    stars
    price
    only
    backPrice
    best
    allStars {
    	num
    	val
    }
  }
}`
	const accBySOAR = ref([])
	const { result:accSOAR, load:accSOARLoad } = useLazyQuery(ACCESSORIES_SOAR, () => ({
    	"type": "accessories",
    	"brand": "SOAR"
	}))
	watch(accSOAR, val => {				
		accBySOAR.value = val.productsByBrand; 		
		accessories.value = accBySOAR.value
	})
	const ACCESSORIES_Tile = gql`query ($type: String!, $brand: String!) {
  productsByBrand(type: $type, brand: $brand) {
    id
    name
    image
    description
    reviewsNum
    globals
    stars
    price
    only
    backPrice
    best
    allStars {
    	num
    	val
    }
  }
}`
	const accByTile = ref([])
	const { result:accTile, load:accTileLoad } = useLazyQuery(ACCESSORIES_Tile, () => ({
    	"type": "accessories",
    	"brand": "Tile"
	}))
	watch(accTile, val => {				
		accByTile.value = val.productsByBrand; 		
		accessories.value = accByTile.value
	})
	const ACCESSORIES_SanDisk = gql`query ($type: String!, $brand: String!) {
  productsByBrand(type: $type, brand: $brand) {
    id
    name
    image
    description
    reviewsNum
    globals
    stars
    price
    only
    backPrice
    best
    allStars {
    	num
    	val
    }
  }
}`
	const accBySanDisk = ref([])
	const { result:accSanDisk, load:accSanDiskLoad } = useLazyQuery(ACCESSORIES_SanDisk, () => ({
    	"type": "accessories",
    	"brand": "SanDisk"
	}))
	watch(accSanDisk, val => {				
		accBySanDisk.value = val.productsByBrand; 		
		accessories.value = accBySanDisk.value
	})
	const ACCESSORIES_Belkin = gql`query ($type: String!, $brand: String!) {
  productsByBrand(type: $type, brand: $brand) {
    id
    name
    image
    description
    reviewsNum
    globals
    stars
    price
    only
    backPrice
    best
    allStars {
    	num
    	val
    }
  }
}`
	const accByBelkin = ref([])
	const { result:accBelkin, load:accBelkinLoad } = useLazyQuery(ACCESSORIES_Belkin, () => ({
    	"type": "accessories",
    	"brand": "Belkin"
	}))
	watch(accBelkin, val => {				
		accByBelkin.value = val.productsByBrand; 		
		accessories.value = accByBelkin.value
	})
	const ACCESSORIES_BlueParrot = gql`query ($type: String!, $brand: String!) {
  productsByBrand(type: $type, brand: $brand) {
    id
    name
    image
    description
    reviewsNum
    globals
    stars
    price
    only
    backPrice
    best
    allStars {
    	num
    	val
    }
  }
}`
	const accByBlueParrot = ref([])
	const { result:accBlueParrot, load:accBlueParrotLoad } = useLazyQuery(ACCESSORIES_BlueParrot, () => ({
    	"type": "accessories",
    	"brand": "BlueParrot"
	}))
	watch(accBlueParrot, val => {				
		accByBlueParrot.value = val.productsByBrand; 		
		accessories.value = accByBlueParrot.value
	})
	const ACCESSORIES_PopSockets = gql`query ($type: String!, $brand: String!) {
  productsByBrand(type: $type, brand: $brand) {
    id
    name
    image
    description
    reviewsNum
    globals
    stars
    price
    only
    backPrice
    best
    allStars {
    	num
    	val
    }
  }
}`
	const accByPopSockets = ref([])
	const { result:accPopSockets, load:accPopSocketsLoad } = useLazyQuery(ACCESSORIES_PopSockets, () => ({
    	"type": "accessories",
    	"brand": "PopSockets"
	}))
	watch(accPopSockets, val => {				
		accByPopSockets.value = val.productsByBrand; 		
		accessories.value = accByPopSockets.value
	})
	const ACCESSORIES_Skullcandy = gql`query ($type: String!, $brand: String!) {
  productsByBrand(type: $type, brand: $brand) {
    id
    name
    image
    description
    reviewsNum
    globals
    stars
    price
    only
    backPrice
    best
    allStars {
    	num
    	val
    }
  }
}`
	const accBySkullcandy = ref([])
	const { result:accSkullcandy, load:accSkullcandyLoad } = useLazyQuery(ACCESSORIES_Skullcandy, () => ({
    	"type": "accessories",
    	"brand": "Skullcandy"
	}))
	watch(accSkullcandy, val => {				
		accBySkullcandy.value = val.productsByBrand; 		
		accessories.value = accBySkullcandy.value
	})
///////////////////////////// accessories ByBrand					

	const setText = (e,x) => {
		if(x == "$") setTimeout(() => {e.target.innerText = "by price"}, 300)
		else if(x == "b") setTimeout(() => {e.target.innerText = "by brand"}, 300)
		else if(x == "r") setTimeout(() => {e.target.innerText = "by reviews"}, 300)
	}
	const setTextOut = (e,x) => {
		if(x == "$"){
			e.target.innerText = "$"
			setTimeout(() => {				if(e.target.innerText == "by price") e.target.innerText = "$"			}, 300)
		}
		else if(x == "b"){
			e.target.innerHTML = "&#10023;"
			setTimeout(() => {				if(e.target.innerHTML == "by brand") e.target.innerHTML = "&#10023;"			}, 300)
		} 		
		else if(x == "r"){
			e.target.innerHTML = "&#128361;"
			setTimeout(() => {				if(e.target.innerHTML == "by reviews") e.target.innerHTML = "&#128361;"			}, 300)
		}
	}
///////// loads
	const load25 = (e) => {
		byPriceShow.value = false
		leftCrossShow.value = true
		leftCrossAnimation.value = "leftCrossA"
		accessories.value = acc25Saved.value
		load25Done()
		e.target.parentElement.classList.remove("innerA");
		e.target.parentElement.classList.add("innerAR");
	}
	const load25To50 = (e) => {
		byPriceShow.value = false
		leftCrossShow.value = true
		leftCrossAnimation.value = "leftCrossA"
		accessories.value = acc2550Saved.value
		load2550Done()
		e.target.parentElement.classList.remove("innerA");
		e.target.parentElement.classList.add("innerAR");
	}
	const load50Plus = (e) => {
		byPriceShow.value = false
		leftCrossShow.value = true
		leftCrossAnimation.value = "leftCrossA"
		accessories.value = acc50PlusSaved.value
		load50PlusDone()
		e.target.parentElement.classList.remove("innerA");
		e.target.parentElement.classList.add("innerAR");
	}		
	const loadByBrand = (e,x) => {
		forBrand.value = x
		byBrandShow.value = false
		leftCrossShow.value = true
		leftCrossAnimation.value = "leftCrossA"
		if(x === 'Apple')		accAppleLoad()
		else if(x === 'InvisibleShield')		accInvisibleShieldLoad() 
		else if(x === 'Stop and Talk')		accStopLoad() 
		else if(x === 'SAMSUNG')		accSAMSUNGLoad()
		else if(x === 'SOAR')		accSOARLoad()
		else if(x === 'Tile')		accTileLoad()
		else if(x === 'SanDisk')	accSanDiskLoad()	
		else if(x === 'Belkin')		accBelkinLoad()
		else if(x === 'BlueParrot')		accBlueParrotLoad()
		else if(x === 'PopSockets')		accPopSocketsLoad() 
		else if(x === 'Skullcandy')	 	accSkullcandyLoad() 
		e.target.parentElement.classList.remove("innerA");
		e.target.parentElement.classList.add("innerAR");
	}			

///////// loads	
	const leftCrossClick = () => {
		accessories.value = accSaved.value
		leftCrossAnimation.value = "leftCrossAR"
		setTimeout(() => { leftCrossShow.value = false }, 300)
	}
/////////////// open target
	const openTarget = (id,ty) => {
		// window.open(router.resolve({ name: "product-details", query: { id: id, type: ty } }).href, '_blank')
		accessories.value = accSaved.value
		router.push({ name: "product-details", query: { id: id, type: ty } })
	}
/////////////// open target	

</script>

<style scoped>
	.text3LazyLines{
		overflow:  hidden;
		text-overflow:  ellipsis;		 
		display: -webkit-box;
		-webkit-limp: 3;
		-webkit-bent: LazLazyyvertical;
	}
	.hovWidth{ width:280%;  }
	.bestRD{		border-bottom-right-radius: 20px;			}

	.fixedDiv{
		position:fixed;
		top:0%;
		width:100%;
		height:100%;
		background-color: rgb(217, 217, 217, 0.5);
	}
	.innerFixed{
		position:absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);		
	}
	.innerFixed1{
		position:absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);		
		width:60%;
	}
	.innerA{ animation: innerFrames 0.4s linear; }
	@keyframes innerFrames{		0%{ top:0%; }		100%{ top:50%; }	}
	.innerAR{ animation: innerFramesR 0.4s linear; }
	@keyframes innerFramesR{		0%{ top:50%; }		100%{ top:100%; }	}

	.v-enter-from{ opacity:0; }
	.v-enter-active{ transition:all 0.3s linear; }
	.v-leave-from{ opacity:1; }
	.v-leave-active{ transition:all 0.3s linear; }

.leftCrossA{ position:relative; animation:leftCrossFrames 0.3s linear forwards;  }
@keyframes leftCrossFrames{		0%{ left:-40%;  }		100%{ left:0%;  }	}	
.leftCrossAR{ animation:leftCrossFramesR 0.3s linear forwards;  }
@keyframes leftCrossFramesR{		0%{ transform:scale(1,1);  }		100%{ transform:scale(0,0);  }	}	


/*spin*/
.spin{
  position:fixed;
  top:50%;
  left:50%;
  transform: translate(-50%, -50%);  
}
.spin div{
  width:7px;
  height:20px;
  background-color:#2d404e;
  
}
.spin div:nth-child(1){
  animation: frames1 0.7s 0.3s linear infinite;
}
.spin div:nth-child(2){
  animation: frames1 0.7s 0.5s linear infinite;
}
.spin div:nth-child(3){
  animation: frames1 0.7s 0.7s linear infinite;
}
@keyframes frames1{
  0%{  transform: scale(1,1); }
  100%{  transform: scale(0,0); }
}
/*spin*/

.hov1{ animatnimationion:hovFrames1 0.3s linear forwards;  }
@keyframes hovFrames1{		0%{ width:0%;  }		100%{ width:1%;  }	}

.hov2{ animation:hovFrames2 0.3s linear forwards;  }
@keyframes hovFrames2{		0%{ width:0%;  }		100%{ width:2%;  }	}

.hov3{ animation:hovFrames3 0.3s linear forwards;  }
@keyframes hovFrames3{		0%{ width:0%;  }		100%{ width:3%;  }	}

.hov4{ animation:hovFrames4 0.3s linear forwards;  }
@keyframes hovFrames4{		0%{ width:0%;  }		100%{ width:4%;  }	}

.hov5{ animation:hovFrames5 0.3s linear forwards;  }
@keyframes hovFrames5{		0%{ width:0%;  }		100%{ width:5%;  }	}

.hov6{ animation:hovFrames6 0.3s linear forwards;  }
@keyframes hovFrames6{		0%{ width:0%;  }		100%{ width:6%;  }	}

.hov7{ animation:hovFrames7 0.3s linear forwards;  }
@keyframes hovFrames7{		0%{ width:0%;  }		100%{ width:7%;  }	}

.hov8{ animation:hovFrames8 0.3s linear forwards;  }
@keyframes hovFrames8{		0%{ width:0%;  }		100%{ width:8%;  }	}

.hov9{ animation:hovFrames9 0.3s linear forwards;  }
@keyframes hovFrames9{		0%{ width:0%;  }		100%{ width:9%;  }	}

.hov10{ animation:hovFrames10 0.3s linear forwards;  }
@keyframes hovFrames10{		0%{ width:0%;  }		100%{ width:10%;  }	}

.hov11{ animation:hovFrames11 0.3s linear forwards;  }
@keyframes hovFrames11{		0%{ width:0%;  }		100%{ width:11%;  }	}

.hov12{ animation:hovFrames12 0.3s linear forwards;  }
@keyframes hovFrames12{		0%{ width:0%;  }		100%{ width:12%;  }	}

.hov13{ animation:hovFrames13 0.3s linear forwards;  }
@keyframes hovFrames13{		0%{ width:0%;  }		100%{ width:13%;  }	}

.hov14{ animation:hovFrames14 0.3s linear forwards;  }
@keyframes hovFrames14{		0%{ width:0%;  }		100%{ width:14%;  }	}

.hov15{ animation:hovFrames15 0.3s linear forwards;  }
@keyframes hovFrames15{		0%{ width:0%;  }		100%{ width:15%;  }	}

.hov16{ animation:hovFrames16 0.3s linear forwards;  }
@keyframes hovFrames16{		0%{ width:0%;  }		100%{ width:16%;  }	}

.hov17{ animation:hovFrames17 0.3s linear forwards;  }
@keyframes hovFrames17{		0%{ width:0%;  }		100%{ width:17%;  }	}

.hov18{ animation:hovFrames18 0.3s linear forwards;  }
@keyframes hovFrames18{		0%{ width:0%;  }		100%{ width:18%;  }	}
	
.hov19{ animation:hovFrames19 0.3s linear forwards;  }
@keyframes hovFrames19{		0%{ width:0%;  }		100%{ width:19%;  }	}
	
.hov20{ animation:hovFrames20 0.3s linear forwards;  }
@keyframes hovFrames20{		0%{ width:0%;  }		100%{ width:20%;  }	}
	
.hov21{ animation:hovFrames21 0.3s linear forwards;  }
@keyframes hovFrames21{		0%{ width:0%;  }		100%{ width:21%;  }	}
	
.hov22{ animation:hovFrames22 0.3s linear forwards;  }
@keyframes hovFrames22{		0%{ width:0%;  }		100%{ width:22%;  }	}
	
.hov23{ animation:hovFrames23 0.3s linear forwards;  }
@keyframes hovFrames23{		0%{ width:0%;  }		100%{ width:23%;  }	}
	
.hov24{ animation:hovFrames24 0.3s linear forwards;  }
@keyframes hovFrames24{		0%{ width:0%;  }		100%{ width:24%;  }	}
	
.hov25{ animation:hovFrames25 0.3s linear forwards;  }
@keyframes hovFrames25{		0%{ width:0%;  }		100%{ width:25%;  }	}
	
.hov26{ animation:hovFrames26 0.3s linear forwards;  }
@keyframes hovFrames26{		0%{ width:0%;  }		100%{ width:26%;  }	}
	
.hov27{ animation:hovFrames27 0.3s linear forwards;  }
@keyframes hovFrames27{		0%{ width:0%;  }		100%{ width:27%;  }	}
	
.hov28{ animation:hovFrames28 0.3s linear forwards;  }
@keyframes hovFrames28{		0%{ width:0%;  }		100%{ width:28%;  }	}
	
.hov29{ animation:hovFrames29 0.3s linear forwards;  }
@keyframes hovFrames29{		0%{ width:0%;  }		100%{ width:29%;  }	}
	
.hov30{ animation:hovFrames30 0.3s linear forwards;  }
@keyframes hovFrames30{		0%{ width:0%;  }		100%{ width:30%;  }	}
	
.hov31{ animation:hovFrames31 0.3s linear forwards;  }
@keyframes hovFrames31{		0%{ width:0%;  }		100%{ width:31%;  }	}
	
.hov32{ animation:hovFrames32 0.3s linear forwards;  }
@keyframes hovFrames32{		0%{ width:0%;  }		100%{ width:32%;  }	}
	
.hov33{ animation:hovFrames33 0.3s linear forwards;  }
@keyframes hovFrames33{		0%{ width:0%;  }		100%{ width:33%;  }	}
	
.hov34{ animation:hovFrames34 0.3s linear forwards;  }
@keyframes hovFrames34{		0%{ width:0%;  }		100%{ width:34%;  }	}
	
.hov2{ animation:hovFrames2 0.3s linear forwards;  }
@keyframes hovFrames2{		0%{ width:0%;  }		100%{ width:2%;  }	}
	
.hov35{ animation:hovFrames35 0.3s linear forwards;  }
@keyframes hovFrames35{		0%{ width:0%;  }		100%{ width:35%;  }	}
	
.hov36{ animation:hovFrames36 0.3s linear forwards;  }
@keyframes hovFrames36{		0%{ width:0%;  }		100%{ width:36%;  }	}
	
.hov37{ animation:hovFrames37 0.3s linear forwards;  }
@keyframes hovFrames37{		0%{ width:0%;  }		100%{ width:37%;  }	}
	
.hov38{ animation:hovFrames38 0.3s linear forwards;  }
@keyframes hovFrames38{		0%{ width:0%;  }		100%{ width:38%;  }	}
	
.hov39{ animation:hovFrames39 0.3s linear forwards;  }
@keyframes hovFrames39{		0%{ width:0%;  }		100%{ width:39%;  }	}
	
.hov40{ animation:hovFrames40 0.3s linear forwards;  }
@keyframes hovFrames40{		0%{ width:0%;  }		100%{ width:40%;  }	}
	
.hov41{ animation:hovFrames41 0.3s linear forwards;  }
@keyframes hovFrames41{		0%{ width:0%;  }		100%{ width:41%;  }	}
	
.hov42{ animation:hovFrames42 0.3s linear forwards;  }
@keyframes hovFrames42{		0%{ width:0%;  }		100%{ width:42%;  }	}
	
.hov43{ animation:hovFrames43 0.3s linear forwards;  }
@keyframes hovFrames43{		0%{ width:0%;  }		100%{ width:43%;  }	}
	
.hov44{ animation:hovFrames44 0.3s linear forwards;  }
@keyframes hovFrames44{		0%{ width:0%;  }		100%{ width:44%;  }	}
	
.hov45{ animation:hovFrames45 0.3s linear forwards;  }
@keyframes hovFrames45{		0%{ width:0%;  }		100%{ width:45%;  }	}
	
.hov46{ animation:hovFrames46 0.3s linear forwards;  }
@keyframes hovFrames46{		0%{ width:0%;  }		100%{ width:46%;  }	}
	
.hov47{ animation:hovFrames47 0.3s linear forwards;  }
@keyframes hovFrames47{		0%{ width:0%;  }		100%{ width:47%;  }	}
	
.hov48{ animation:hovFrames48 0.3s linear forwards;  }
@keyframes hovFrames48{		0%{ width:0%;  }		100%{ width:48%;  }	}
	
.hov49{ animation:hovFrames49 0.3s linear forwards;  }
@keyframes hovFrames49{		0%{ width:0%;  }		100%{ width:49%;  }	}
	
.hov50{ animation:hovFrames50 0.3s linear forwards;  }
@keyframes hovFrames50{		0%{ width:0%;  }		100%{ width:50%;  }	}
	
.hov51{ animation:hovFrames51 0.3s linear forwards;  }
@keyframes hovFrames51{		0%{ width:0%;  }		100%{ width:51%;  }	}
	
.hov52{ animation:hovFrames52 0.3s linear forwards;  }
@keyframes hovFrames52{		0%{ width:0%;  }		100%{ width:52%;  }	}
	
.hov53{ animation:hovFrames53 0.3s linear forwards;  }
@keyframes hovFrames53{		0%{ width:0%;  }		100%{ width:53%;  }	}
	
.hov54{ animation:hovFrames54 0.3s linear forwards;  }
@keyframes hovFrames54{		0%{ width:0%;  }		100%{ width:54%;  }	}
	
.hov55{ animation:hovFrames55 0.3s linear forwards;  }
@keyframes hovFrames55{		0%{ width:0%;  }		100%{ width:55%;  }	}
	
.hov56{ animation:hovFrames56 0.3s linear forwards;  }
@keyframes hovFrames56{		0%{ width:0%;  }		100%{ width:56%;  }	}
	
.hov57{ animation:hovFrames57 0.3s linear forwards;  }
@keyframes hovFrames57{		0%{ width:0%;  }		100%{ width:57%;  }	}
	
.hov58{ animation:hovFrames58 0.3s linear forwards;  }
@keyframes hovFrames58{		0%{ width:0%;  }		100%{ width:58%;  }	}
	
.hov59{ animation:hovFrames59 0.3s linear forwards;  }
@keyframes hovFrames59{		0%{ width:0%;  }		100%{ width:59%;  }	}
	
.hov60{ animation:hovFrames60 0.3s linear forwards;  }
@keyframes hovFrames60{		0%{ width:0%;  }		100%{ width:60%;  }	}
	
.hov61{ animation:hovFrames61 0.3s linear forwards;  }
@keyframes hovFrames61{		0%{ width:0%;  }		100%{ width:61%;  }	}
	
.hov62{ animation:hovFrames62 0.3s linear forwards;  }
@keyframes hovFrames62{		0%{ width:0%;  }		100%{ width:62%;  }	}
	
.hov63{ animation:hovFrames63 0.3s linear forwards;  }
@keyframes hovFrames63{		0%{ width:0%;  }		100%{ width:63%;  }	}
	
.hov64{ animation:hovFrames64 0.3s linear forwards;  }
@keyframes hovFrames64{		0%{ width:0%;  }		100%{ width:64%;  }	}
	
.hov65{ animation:hovFrames65 0.3s linear forwards;  }
@keyframes hovFrames65{		0%{ width:0%;  }		100%{ width:65%;  }	}
	
.hov66{ animation:hovFrames66 0.3s linear forwards;  }
@keyframes hovFrames66{		0%{ width:0%;  }		100%{ width:66%;  }	}
	
.hov67{ animation:hovFrames67 0.3s linear forwards;  }
@keyframes hovFrames67{		0%{ width:0%;  }		100%{ width:67%;  }	}
	
.hov68{ animation:hovFrames68 0.3s linear forwards;  }
@keyframes hovFrames68{		0%{ width:0%;  }		100%{ width:68%;  }	}
	
.hov69{ animation:hovFrames69 0.3s linear forwards;  }
@keyframes hovFrames69{		0%{ width:0%;  }		100%{ width:69%;  }	}
	
.hov70{ animation:hovFrames70 0.3s linear forwards;  }
@keyframes hovFrames70{		0%{ width:0%;  }		100%{ width:70%;  }	}
	
.hov71{ animation:hovFrames71 0.3s linear forwards;  }
@keyframes hovFrames71{		0%{ width:0%;  }		100%{ width:71%;  }	}
	
.hov72{ animation:hovFrames72 0.3s linear forwards;  }
@keyframes hovFrames72{		0%{ width:0%;  }		100%{ width:72%;  }	}
	
.hov2{ animation:hovFrames2 0.3s linear forwards;  }
@keyframes hovFrames2{		0%{ width:0%;  }		100%{ width:2%;  }	}
	
.hov73{ animation:hovFrames73 0.3s linear forwards;  }
@keyframes hovFrames73{		0%{ width:0%;  }		100%{ width:73%;  }	}
	
.hov74{ animation:hovFrames74 0.3s linear forwards;  }
@keyframes hovFrames74{		0%{ width:0%;  }		100%{ width:74%;  }	}
	
.hov75{ animation:hovFrames75 0.3s linear forwards;  }
@keyframes hovFrames75{		0%{ width:0%;  }		100%{ width:75%;  }	}
	
.hov76{ animation:hovFrames76 0.3s linear forwards;  }
@keyframes hovFrames76{		0%{ width:0%;  }		100%{ width:76%;  }	}
	
.hov77{ animation:hovFrames77 0.3s linear forwards;  }
@keyframes hovFrames77{		0%{ width:0%;  }		100%{ width:77%;  }	}
	
.hov78{ animation:hovFrames78 0.3s linear forwards;  }
@keyframes hovFrames78{		0%{ width:0%;  }		100%{ width:78%;  }	}
	
.hov79{ animation:hovFrames79 0.3s linear forwards;  }
@keyframes hovFrames79{		0%{ width:0%;  }		100%{ width:79%;  }	}
	
.hov80{ animation:hovFrames80 0.3s linear forwards;  }
@keyframes hovFrames80{		0%{ width:0%;  }		100%{ width:80%;  }	}
	
.hov81{ animation:hovFrames81 0.3s linear forwards;  }
@keyframes hovFrames81{		0%{ width:0%;  }		100%{ width:81%;  }	}
	
.hov82{ animation:hovFrames82 0.3s linear forwards;  }
@keyframes hovFrames82{		0%{ width:0%;  }		100%{ width:82%;  }	}
	
.hov83{ animation:hovFrames83 0.3s linear forwards;  }
@keyframes hovFrames83{		0%{ width:0%;  }		100%{ width:83%;  }	}
	
.hov84{ animation:hovFrames84 0.3s linear forwards;  }
@keyframes hovFrames84{		0%{ width:0%;  }		100%{ width:84%;  }	}
	
.hov85{ animation:hovFrames85 0.3s linear forwards;  }
@keyframes hovFrames85{		0%{ width:0%;  }		100%{ width:85%;  }	}
	
.hov86{ animation:hovFrames86 0.3s linear forwards;  }
@keyframes hovFrames86{		0%{ width:0%;  }		100%{ width:86%;  }	}
	
.hov87{ animation:hovFrames87 0.3s linear forwards;  }
@keyframes hovFrames87{		0%{ width:0%;  }		100%{ width:87%;  }	}
	
.hov88{ animation:hovFrames88 0.3s linear forwards;  }
@keyframes hovFrames88{		0%{ width:0%;  }		100%{ width:88%;  }	}
	
.hov89{ animation:hovFrames89 0.3s linear forwards;  }
@keyframes hovFrames89{		0%{ width:0%;  }		100%{ width:89%;  }	}
	
.hov90{ animation:hovFrames90 0.3s linear forwards;  }
@keyframes hovFrames90{		0%{ width:0%;  }		100%{ width:90%;  }	}
	
.hov91{ animation:hovFrames91 0.3s linear forwards;  }
@keyframes hovFrames91{		0%{ width:0%;  }		100%{ width:91%;  }	}
	
.hov92{ animation:hovFrames92 0.3s linear forwards;  }
@keyframes hovFrames92{		0%{ width:0%;  }		100%{ width:92%;  }	}
	
.hov93{ animation:hovFrames93 0.3s linear forwards;  }
@keyframes hovFrames93{		0%{ width:0%;  }		100%{ width:93%;  }	}
	
.hov94{ animation:hovFrames94 0.3s linear forwards;  }
@keyframes hovFrames94{		0%{ width:0%;  }		100%{ width:94%;  }	}
	
.hov95{ animation:hovFrames95 0.3s linear forwards;  }
@keyframes hovFrames95{		0%{ width:0%;  }		100%{ width:95%;  }	}
	
.hov96{ animation:hovFrames96 0.3s linear forwards;  }
@keyframes hovFrames96{		0%{ width:0%;  }		100%{ width:96%;  }	}
	
.hov97{ animation:hovFrames97 0.3s linear forwards;  }
@keyframes hovFrames97{		0%{ width:0%;  }		100%{ width:97%;  }	}
	
.hov98{ animation:hovFrames98 0.3s linear forwards;  }
@keyframes hovFrames98{		0%{ width:0%;  }		100%{ width:98%;  }	}
	
.hov99{ animation:hovFrames99 0.3s linear forwards;  }
@keyframes hovFrames99{		0%{ width:0%;  }		100%{ width:99%;  }	}
	
.hov100{ animation:hovFrames100 0.3s linear forwards;  }
@keyframes hovFrames100{		0%{ width:0%;  }		100%{ width:100%;  }	}
	

</style>
