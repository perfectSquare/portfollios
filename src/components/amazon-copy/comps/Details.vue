<template><div class="relative">
	<!-- <div v-if='detLoading' class="spin flex gap-1"><div></div><div></div><div></div></div> -->
	<AmazonNav />
	<AmazonMenu />
	<div class='relative flex flex-col md:grid md:grid-cols-12 gap-4 p-4'>
		<div class="relative col-span-3 flex flex-col gap-y-2 lg:grid lg:grid-cols-8 lg:gap-2">

			<div class="col-span-1 flex flex-wrap lg:flex-col gap-2 sticky top-0">
				<template v-for='(im,l) in details.moreImages' :key='l'>
					<img :src="im" class="w-8 h-8 border border-gray-300" @mouseenter='takeThis'>
				</template>
			</div>
			<img 
				ref='imgRef'
				:src="details.largeImage" class="col-span-7 w-28 mb:w-40 h-64 md:w-full md:h-96 sticky top-12"
				@mouseenter='onEnter'
				@mouseleave='onLeave'
				@mousemove='onMove'
			>
		</div>

		<div class="relative col-span-9 md:col-span-6 flex flex-col gap-y-2">
			<div class="absolute" ref='res'></div>
			<div class="text-xl lg:text-2xl">{{details.description}}</div>
			<div class="text-blue-600">Brand: {{details.brand[0].val}}</div>

				<div class="flex relative">
					<div 
						class="flex relative"
						@mouseentOut='starsIn'
						@mouseenter='starsOut'
					>
					<div class="absolute top-4 -left-2 p-4 z-50 flex flex-col gap-y-2 hidden bg-white shadow-xl hovWidth">
						<div class="flex items-center">
							<img src="/assets/amazon/s1.png" class='w-4 h-4'>
							<img src="/assets/amazon/s1.png" class='w-4 h-4'>
							<img src="/assets/amazon/s1.png" class='w-4 h-4'>
							<img src="/assets/amazon/s1.png" class='w-4 h-4'>
							<img v-if='details.stars >= 4.8' src="/assets/amazon/s1.png" class='w-4 h-4'>
							<img v-if='details.stars >= 3 && details.stars < 4.8' src="/assets/amazon/s2.png" class='w-4 h-4'>
							<img v-if='details.stars < 4' src="/assets/amazon/s3.png" class='w-4 h-4'>				 			
							<div class="ml-2 font-medium">{{details.stars}} out of 5</div>
						</div>
						<div class="text-gray-500">{{details.globals}} global ratings</div>
						<template v-for='(st,j) in details.allStars' :key='j'>
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
						<img v-if='details.stars >= 4.8' src="/assets/amazon/s1.png" class='w-4 h-4'>
						<img v-if='details.stars >= 3 && details.stars < 4.8' src="/assets/amazon/s2.png" class='w-4 h-4'>
						<img v-if='details.stars < 4' src="/assets/amazon/s3.png" class='w-4 h-4'>				 	
						<div class="text-xxs ml-1">&#8744;</div>
					</div>
					<div class="text-blue-600 ml-1 relative bottom-1 ml-4">{{details.reviewsNum}} ratings</div>					
				</div>
				<hr> 
				<!----------------------------------------hr -------------------------------------------------->
				<div v-if='details.price != -1' class="text-2xl flex gap-2">
					<div v-if='details.safe != 0' class="text-red-500">-{{details.safe}}%</div>					
					<div v-if='details.price != -1' class="flex relative">					
						<sup class="relative top-3">$</sup>	
						<div class="text-2xl">{{parseInt(details.price)}}</div>
						<sup class="relative top-3">{{ (Number((details.price - Math.trunc(details.price)).toFixed(2)).toString()).slice(2) }}</sup>						
					</div>
				</div>
				<div v-else class="text-2xl text-red-500">
					currently unavialable
				</div>
				<div v-if='details.price != -1' class="relative text-sm flex gap-1">
					<div>List price: </div>					
					<div class="line-through">${{details.backPrice}}</div> 
					<div 
						class="cursor-pointer"
						@mouseenter='infoShow=true'
						@mouseleave='infoShow=false'
					>
						&#128441;
						<Transition>
						<div class='absolute right-3 p-3 ring-1 ring-gray-300 cursor-default z-40 bg-white' v-if='infoShow'>The List Price is the suggested retail price of a new product as provided by a manufacturer, supplier, or seller. Except for books, Amazon will display a List Price if the product was purchased by customers on Amazon or offered by other retailers at or above the List Price in at least the past 90 days. List prices may not necessarily reflect the product's prevailing market price.</div>
						</Transition>
					</div>
				</div>
				<div v-if='details.price != -1' class="relative flex gap-1 text-base text-gray-600">
					<div>${{Math.ceil(details.shipping + details.estimated)}}</div>
					<div>Shipping & Import Fees Deposit to Pakistan</div>
					<div 
						class="relative cursor-pointer text-blue-600 hover:text-red-500"
						@click.self='rateDetailsShow = true'
					>
						Details
						<Transition>
						<div v-if='rateDetailsShow' class='absolute z-50 rateWid ring-1 ring-gray-300 bg-white text-black p-4 flex flex-col gap-y-4'>
							<div class="text-lg font-medium flex justify-between">
								<div>Shipping & Fee Details</div>
								<div @click='rateDetailsShow = false' class="flex items-center justify-center text-sm w-6 h-6 hover:bg-gray-300 cursor-pointer rounded-full transition-all duration-200">&#9874;</div>
							</div>
							<hr>
							<div class="flex flex-col gap-y-1 text-sm">
								<div class="flex justify-between">
									<div class="text-gray-500">Price</div>
									<div>${{details.price}}</div>
								</div>
								<div class="flex justify-between">
									<div class="text-gray-500">AmazonGlobal Shipping</div>
									<div>${{details.shipping}}</div>
								</div>
								<div class="flex justify-between">
									<div class="text-blue-500">Estimated Import Fees Deposit</div>
									<div>${{details.estimated}}</div>
								</div>
							</div>
							<hr>
							<div class="flex justify-between text-sm">
								<div class="text-gray-500">Total</div>
								<div>${{ details.estimated + details.shipping + details.price }}</div>
							</div>
						</div>
						</Transition>
					</div>
				</div>				
				<!-- brand -->
				<div v-if='details.brand.length != 1' class="flex flex-col text-sm leading-3 h-48 overflow-hidden">
					<template v-for='(bd,k) in details.brand' :key='k'>						
						<div class="flex justify-between p-2 w-1/2">
							<div class="font-semibold">{{bd.name}}</div>
							<div>{{bd.val}}	</div>
						</div>						
					</template>					
				</div>
				<div 
				v-if='details.brand.length != 1'
				class='border-b-2 border-transparent hover:border-gray-600 self-start cursor-pointer'
				@click='(e)=>{					
					if(e.target.innerText == "show more"){
						e.target.previousElementSibling.classList.remove("h-48", "overflow-hidden")
						e.target.innerText = "show less"
					} 
					else{
						e.target.previousElementSibling.classList.add("h-48", "overflow-hidden")
						e.target.innerText = "show more"
					} 
				}'>show more</div>
				<!-- brand -->
				<hr> <!----------------------------------------hr -------------------------------------------------->
				<!-- dots    -->
				<div class="font-semibold">About this item</div>
				<ul style='list-style-type:disc'>
					<template v-for='(l,k) in details.dots' :key='k'><li>{{l}}</li></template>
				</ul>
				<!-- dots    -->				
				<div v-if='details.note'><b>Note:</b> Products with electrical plugs are designed for use in the US. Outlets and voltage differ internationally and this product may require an adapter or converter for use in your destination. Please check compatibility before purchasing.</div>
		</div>			
		<!-- cart -->
		<div class="hidden md:block md:col-span-3 relative">
			<div class="sticky top-2 flex flex-col gap-y-2">
				<div v-if='details.price != -1' class="ring-1 ring-gray-300 p-2 rounded-md flex flex-col gap-y-1">
					<div class="text-2xl flex">
						<sup class="relative text-sm top-0">$</sup>	
						<div class="text-xl">{{parseInt(details.price)}}</div>
						<sup class="relative text-sm top-0">{{ (Number((details.price - Math.trunc(details.price)).toFixed(2)).toString()).slice(2) }}</sup>												
					</div>						
					<div class="text-sm sm:text-base">delivery <span class="font-semibold">{{details.delivery}}</span></div>
					<div class="text-sm sm:text-base text-blue-600">deliver to Pakistan</div>
					<div v-if='details.stock' class="text-green-900 text-base sm:text-xl">In Stock</div>
					<select class='rounded-md bg-gray-100 self-start' v-model='selN'>
						<option disabled>Qty</option>
						<option>1</option>
						<option>2</option>
						<option>3</option>
						<option>4</option>
						<option>5</option>
						<option>6</option>
						<option>7</option>
						<option>8</option>
						<option>9</option>
						<option>10</option>
						<option>11</option>
						<option>12</option>
						<option>13</option>
						<option>14</option>
						<option>15</option>
					</select>
					<div 
						class="cursor-pointer p-2 rounded-lg bgor text-white text-center"
						@click='addToCart($event, details)'
					>add to cart</div>
					<div class="cursor-pointer p-2 rounded-lg ngor text-black text-center">buy now</div>
					<div class="text-sm">Ships from Amazon.com</div>
					<div class="text-sm">Sold by Amazon.com</div>
					<div class="text-sm longText">Packaging Shows what's inside. Item often ships in manufacturer container to reduce packaging. To hide what's inside, choose Ship in Amazon packaging at checkout.</div>
					<hr>
					<div @click='packShow = !packShow' class="text-sm cursor-pointer border-b-2 border-transparent hover:border-gray-400 self-start">Details</div>
						<Teleport to='#air'>
						<Transition>
						<div 
							v-if='packShow' 
							class="fixedDiv" 
							@click.self='(e)=>{
								packShow = !packShow;
								if(packShow == false){
									e.target.children[0].classList.remove("packA")
									e.target.children[0].classList.add("packR")
								} 					
							}'
						>
							<div class="innerFixed1 packA flex flex-col gap-y-2 bg-white text-black p-4">
								<div>Ships from Amazon.com</div><hr>
								<div>Sold by Amazon.com</div><hr>
								<div>Packaging Shows what's inside. Item often ships in manufacturer container to reduce packaging. To hide what's inside, choose Ship in Amazon packaging at checkout.</div>
							</div>
						</div>
						</Transition>						
						</Teleport>
				</div>


				<div v-else class="flex flex-col gap-y-1 items-center p-2 text-center ring-1 ring-gray-300">
					<div class="text-red-500 font-semibold">currently unavailable</div>
					<div class="text-sm">We don't know when or if this item will be back in stock.</div>
					<div class="bg-gray-200 p-2 text-sm rounded-md self-center">add to list</div>					
				</div>				

			</div>
		</div>
		<!-- cart -->
	</div>
	<!-- info	 -->
		<div class='w-full p-8 relative' ref='infoCap'>
		<table class='text-sm w-full ring-1 ring-gray-400'>
			<caption class='text-xl'>Product Information</caption>
			<template v-for='(dt,m) in details.info' :key='m'>
				<tr>
					<td class='p-1 sm:p-2'>{{dt.name}}</td>
					<td class='p-1 sm:p-2'>{{dt.val}}</td>
				</tr>
			</template>			
		</table>
		</div>
		<!-- info	 -->

		<!-- reviews -->
		<div class="text-xl pl-4 relative" ref='revRef'>Reviews</div>
		<div class="relative p-4 flex flex-col gap-y-4">			
			<template v-for='(rw,n) in details.reviews' :key='n'>
				<div class="relative flex flex-col leading-none">
					<div class="flex gap-2 items-center">
						<img v-if='rw.image == ""' src="/assets/amazon/man.png" class="self-center w-6">
						<img v-else :src="rw.image" class="self-center w-6">
						<div>{{rw.name}}</div>
						<div v-if='rw.verified' class='text-green-800 text-sm'>verified purchase</div>
					</div>
					<div class="text-sm">{{rw.date}}</div>											
					<div class="text-sm relative left-12 w-5/6"><span v-html='rw.comment'></span></div>
					<div v-if='rw.helpful != 0' class="text-sm">{{rw.helpful}} people found this helpful</div>
				</div>
				<hr>
			</template>
		</div>
		<!-- reviews -->
		<div class="bg-gray-200 p-24 text-center">footer</div>
</div></template>

<script setup>
	import { ref, watch, onMounted, computed } from 'vue'
	import { useQuery, useLazyQuery, useMutation } from '@vue/apollo-composable'
	import { useRoute, useRouter } from 'vue-router'
	import gql from 'graphql-tag'	

	import AmazonNav from '/src/components/amazon-copy/comps/AmazonNav.vue'
	import AmazonMenu from '/src/components/amazon-copy/comps/AmazonMenu.vue'
	
	import {useAppStore} from '/src/store/index.js'
	const store = useAppStore() 

	const route = useRoute()
	const router = useRouter()

	const id = route.query.id
	const type = route.query.type

	const infoShow = ref(false)
	const rateDetailsShow = ref(false)
	const packShow = ref(false)

	const details = ref([])
	const DETAILS_Q = gql`query ($productId: ID!, $type: String!) {
  product(id: $productId, type: $type) {
  	name
  	image
    description
    price
    backPrice
    globals
    reviewsNum
    stars
    allStars {
      num
      val
    }
    brand {
      name
      val
    }
    info {
      name
      val
    }    
    estimated
    shipping    
    dots
    note
    largeImage
    moreImages
    safe
    reviews {
      name
      image
      date
      verified
      comment
      helpful
    }
    stock
    delivery
  }
}`

	const nameForCart = ref('')
	const imageForCart = ref('')
	const priceForCart = ref(0)

	const { result: det, loading: detLoading } = useQuery(DETAILS_Q, () => ({
    	"type": type,
    	"productId": id
	}))

	watch(det, val => {		
		details.value = val.product		
		nameForCart.value = val.product.name
		imageForCart.value = val.product.image
		priceForCart.value = val.product.price
		console.log(imageForCart.value)		
	})


const res = ref(null)
const imgRef = ref(null)

const onEnter = (e) => {
	res.value.classList.add('z-50', 'overflow-hidden', 'h-full')
	let img = document.createElement("IMG")
	img.setAttribute("src", e.target.getAttribute("src"))
	img.classList.add('relative', 'w-full', 'h-1/2')
	if(window.innerWidth >= 768){
		img.classList.add('scale-150')
		res.value.classList.add('scale-150', 'bottom-0', 'left-28')		
	}
	else if(window.innerWidth >= 668 && window.innerWidth < 768){
		img.classList.add('scale-150')
		res.value.classList.add('scale-150', 'bottom-48', 'left-64')
	}		
	else if(window.innerWidth >= 468 && window.innerWidth < 668){
		img.classList.add('scale-150')
		res.value.classList.add('scale-150', 'bottom-80', 'left-64')
	}		
	else if(window.innerWidth < 468){
		img.classList.add('scale-150')
		res.value.classList.add('scale-110', 'bottom-96', 'left-44')
	}		
	res.value.appendChild(img)	
}

const onLeave = (e) => {
	res.value.classList.remove('z-50')
	res.value.innerHTML = ''	
}

const onMove = (e) => {
	if(window.innerWidth >= 768){
		res.value.firstChild.style.bottom = (e.offsetY-150) + 'px'
		res.value.firstChild.style.right = (e.offsetX-100) + 'px'	
	}
	else if(window.innerWidth >= 668 && window.innerWidth < 768){		
		res.value.firstChild.style.bottom = (e.offsetY-100) + 'px'
		res.value.firstChild.style.right = (e.offsetX-100) + 'px'
	}		
	else if(window.innerWidth >= 468 && window.innerWidth < 668){		
		res.value.firstChild.style.bottom = (e.offsetY-100) + 'px'
		res.value.firstChild.style.right = (e.offsetX-100) + 'px'
	}		
	else if(window.innerWidth < 468){		
		res.value.firstChild.style.bottom = (e.offsetY-50) + 'px'
		res.value.firstChild.style.right = (e.offsetX-50) + 'px'
	}		
}

const takeThis = (e) => {
	res.value.innerHTML = ''	
	imgRef.value.innerHTML = ''
	imgRef.value.setAttribute("src", e.target.getAttribute("src"))
}

/////////////////////////////////// intersection
const infoCap = ref(null)
const revRef = ref(null)
onMounted(() => {
	createObserver();
	reviewsObserver();
	revRefObserver();
})

function revRefObserver() {
  let observer = new IntersectionObserver((entries, observer) => {
  	entries.forEach((entry) => {
	    entry.target.classList.toggle('revA', entry.isIntersecting)
  	});
	}, {
    root: null,
    rootMargin: "0px",
    threshold: 0
  });  
  observer.observe(revRef.value);
  
}

function reviewsObserver() {
  let observer = new IntersectionObserver((entries, observer) => {
  	entries.forEach((entry) => {
	    entry.target.classList.toggle('textA', entry.isIntersecting)
  	});
	}, {
    root: null,
    rootMargin: "0px",
    threshold: 0
  });
  let docs = document.querySelectorAll('.leading-none');
  docs.forEach((d) => {
  	observer.observe(d);
  })  
}

function createObserver() {
  let observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    entry.target.classList.toggle('tabA', entry.isIntersecting)
  });
	}, {
    root: null,
    rootMargin: "0px",
    threshold: 0
  });
  observer.observe(infoCap.value);
}
/////////////////////////////////// intersection

////////////////////////////////// cart
const selN = ref(0)

const addToCart = (e,x) => {		
	if(selN.value == 0){
		store.updateCart(x)
		return
	}	
	else{				
		for (let i = selN.value; i>0; i--) {
  		store.updateCart(x)
		}
	}
}
////////////////////////////////// cart

const starsIn = (e) => {	e.target.children[0].classList.remove("hidden") }
const starsOut = (e) => {	e.target.children[0].classList.add("hidden") }

</script>

<style scoped>
.revA{	animation: revFrames 1s linear;	}	
@keyframes revFrames{
	0%{		
		opacity:0;		
		left:50%;
	}
	100%{		
		opacity:1;		
		left:0%;
	}
}

.tabA{	animation: tabFrames 1s linear;	}	
@keyframes tabFrames{
	0%{		
		opacity:0;		
	}
	100%{		
		opacity:1;		
	}
}

.textA{	animation: textFrames 1s linear;	}	
@keyframes textFrames{
	0%{		
		opacity:0;
		transform:scale(0.8,0.8);
	}
	100%{		
		opacity:1;
		transform:scale(1,1);
	}
}
	
	.text3Lines{
		overflow:  hidden;
		text-overflow:  ellipsis;		 
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
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
		top: 0%;
		right: 0%;
		width:50%;	
		height:100%;		
	}
	.packA{ animation:packFrame 0.4s linear;  }
	@keyframes packFrame{
		0%{ right:-30%;  }
		100%{ right:0%;  }
	}
	.packR{ animation:packFrameR 0.4s linear;  }
	@keyframes packFrameR{
		0%{ right:0%;  }
		100%{ right:-30%;  }
	}

	.innerA{ animation: innerFrames 0.4s linear; }
	@keyframes innerFrames{		0%{ top:0%; }		100%{ top:50%; }	}
	.innerAR{ animation: innerFramesR 0.4s linear; }
	@keyframes innerFramesR{		0%{ top:50%; }		100%{ top:100%; }	}

	.v-enter-from{ opacity:0; }
	.v-enter-active{ transition:all 0.4s linear; }
	.v-leave-from{ opacity:1; }
	.v-leave-active{ transition:all 0.4s linear; }
	

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

tr:nth-child(odd){
	background-color:#f2f2f2;
}

.bgor{	background-color:#576898;}
.bgor:hover{ background-color:#4e5b7e;  }
.ngor{	background-color:#ff6600;}
.ngor:hover{ background-color:#df600c;  }
.longText{
	white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/*spin*/

.rateWid{ width:700%; left:-300%; }

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


