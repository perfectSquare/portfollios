<template><div class="w-full relative flex flex-col gap-4">

	<AirNav class='sticky top-0 bg-white border-b-2 border-gray-200 p-2 z-10 md:p-4' />

	<div v-if='host' class="relative grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 p-2 md:p-6">

		<!-- left -->
		<div class="hidden md:flex flex-col gap-4 md:col-span-4 bg-white p-4 md:p-6 ring-2 ring-gray-200 rounded-lg">
			<div 
			class="inline-block md:hidden text-xl flex justify-center items-center w-6 h-6 hover:bg-gray-200 cursor-pointer rounded-full transition-all duration-200"
			@click='(e) => {
				e.target.parentElement.classList.add("hidden");
				e.target.parentElement.classList.remove("flex", "absolute", "z-40");
			}'
			>&#9874;</div>
			<div class="relative">
				<img :src="host.host.hostLogo" class="w-28 h-28 self-center rounded-full">
				<img v-if='host.host.identity == "super"' src="/assets/airbnb/super.png" class="w-7 h-8 absolute left-2 bottom-1">
			</div>			
			<div v-if='host.host.identity == "super"' class="flex gap-2"><img src="/assets/airbnb/super-icon-white.png" class="self-center w-5 h-5"><div>Superhost</div></div>
			<div class="flex gap-2"><img src="/assets/airbnb/star_white.png" class="self-center w-5 h-5"><div>{{host.host.reviewsNum}} reviews</div></div>
			<div v-if='host.host.identity == "verified"' class="flex gap-2"><img src="/assets/airbnb/shield.png" class="self-center w-5 h-5"><div>identity verified</div></div>			
			<hr>
			<div v-if='host.host.verified.length > 0' class="flex flex-col gap-2">
				<div class="text-2xl font-semibold">{{host.host.name}} confirmed</div>				
				<br>
				<template v-for='(v,i) in host.host.verified' :key='i'>
					<div>&#10004;&nbsp;{{v}}</div>
				</template>
				<br>
				<div v-if='host.host.identity != "super"'>
					<span @click='learnShow = !learnShow' class="border-b-2 border-gray-200 hover:border-gray-600 cursor-pointer">Learn more</span> 
					about how confirming account info helps keep the Airbnb community secure.
				</div>
				<Teleport to='#air'>
					<Transition>
					<div v-if='learnShow' class="fixedDiv shadow-2xl bg-white rounded-xl p-6 flex flex-col gap-y-4">
						<div @click='learnShow = !learnShow' class="text-xl flex justify-center items-center w-8 h-8 hover:bg-gray-100 cursor-pointer rounded-full transition-all duration-200">&#9874;</div>
						<hr>
						<div class="text-2xl font-semibold">Why is this important?</div>
						<div>The Airbnb community works best when its members know and trust each other. That’s why, before booking a home or experience, or becoming a host, we may ask you to confirm some account info.</div>
						<div class="flex gap-2">
							<img src="/assets/airbnb/mobile.png" class="w-5 h-5">
							<div class="flex flex-col gap-4">
								<div class="font-semibold">Phone and email verification</div>
								<div>Having confirmed contact info gives your hosts, guests, and Airbnb a way to contact you about your reservations or your account. Hosts are required to confirm contact info before listing their homes, and guests must do the same before booking a reservation. You also need a verified phone number to complete identity verification.</div>
							</div>
						</div>
						<div class="flex gap-2">
							<img src="/assets/airbnb/shield.png" class="w-5 h-5">
							<div class="flex flex-col gap-4">
								<div class="font-semibold">Identity verification</div>
								<div>Airbnb checks that people are who they say they are by confirming identity information with third parties or by reviewing government-issued documents, like a government ID, passport, or national identity card.</div>
							</div>
						</div>
						<div>Airbnb does this differently depending on each person. This is because both the best data sources vary from country to country and our processes may evolve over time.</div>
					</div>
					</Transition>
				</Teleport>
			</div>
		</div>		
		<div 
			class="inline-block md:hidden text-xl cursor-pointer hover:scale-110 transition-all duration-100 w-4 self-center"
			@click='(e) => {
				e.target.previousElementSibling.classList.remove("hidden");
				e.target.previousElementSibling.classList.add("flex", "absolute", "z-40");
			}'
		>&#9776;</div>
		<!-- left -->


		<!-- right -->
		<div class="col-span-12 md:col-span-8 flex flex-col gap-2 p-6">
			<div class="text-3xl font-semibold">Hi, I’m {{host.host.name}}</div>
			<div class="text-sm text-gray-700">joined in {{host.host.joinedDate}}</div>
			<br>
			<div class="flex flex-col gap-4">
				<div class="text-2xl font-semibold">About</div>
				<div v-if='host.host.identity != "super"' class="long-text">{{host.host.description}}</div>
				<span 				
					v-if='(host.host.description.length > 200) && longText'
					class='border-b-2 border-transparent hover:border-gray-500 self-start cursor-pointer'
					@click='(e) => {
						longText = !longText;
						e.target.previousElementSibling.classList.remove("long-text")	
					}'
				>show more</span>
				<span 
					v-if='!longText'
					class='border-b-2 border-transparent hover:border-gray-500 self-start cursor-pointer'
					@click='(e) => {
						longText = !longText;
						if(e.target.previousElementSibling.tagName == "SPAN")
							e.target.previousElementSibling.previousElementSibling.classList.add("long-text")	
						if(e.target.previousElementSibling.tagName == "DIV")
							e.target.previousElementSibling.classList.add("long-text")	
					}'
				>show less</span>
			</div> <br>			
			<div v-if='host.host.lives != ""' class="flex gap-2">
				<img src="/assets/airbnb/home-black.png" class="w-4 h-4 self-center">
				<div>{{host.host.lives}}</div>
			</div>
			<div v-if='host.host.speaks != ""' class="flex gap-2">
				<img src="/assets/airbnb/speaks.png" class="w-4 h-4 self-center">
				<div>{{host.host.speaks}}</div>
			</div>
			<div v-if='host.host.work != ""' class="flex gap-2">
				<img src="/assets/airbnb/work-black.png" class="w-4 h-4 self-center">
				<div>{{host.host.work}}</div>
			</div>
			<br> <hr> <br>			
			<!-------------------------------------- hr --------------------------------------------->
		<div class="text-2xl font-semibold">{{host.host.name}}'s listings</div>				<br>

		<!-- listing 2 -->
		<div v-if='host.host.listing.length <= 2' class='grid grid-cols-1 sm:grid-cols-2 gap-x-2'>
			<template v-for='(lt,j) in host.host.listing' :key='j'>
				<div class="flex flex-col gap-2 cursor-pointer" @click='toDatails(lt.cat, lt.destinationID)'>
					<img :src="lt.image" class="rounded-xl h-full">
					<div class="flex leading-4">
						<img v-if='lt.stars != 0' src="/assets/airbnb/star_black.png" class="w-4 h-4 self-center">						
						<div v-if='lt.stars != 0'>{{lt.stars}}</div>
						<div v-if='lt.reviewsNum == -1'>no reviews yet</div>
						<div v-else-if='lt.reviewsNum == 0'></div>
						<div v-else>({{lt.reviewsNum}})</div>
					</div>
					<div>{{lt.about}}</div>
					<div class="long-text1">{{lt.name}}</div>
				</div>
			</template>
		</div>
		<!-- listing 2 -->

		<!-- listing more than 2 -->
		<div v-else class="relative h-64">

			<div 
				class="absolute z-40 flex justify-center items-center w-8 h-8 bgArrowLeft rounded-full hover:scale-110 cursor-pointer hover:shadow-xl transition-all duration-200"
				@click='one = true; two = false'
			>
				<img src="/assets/airbnb/left.png" class="w-2 h-3 self-center">
			</div>

			<div 
				class="absolute z-40 flex justify-center items-center w-8 h-8 bgArrowRight rounded-full hover:scale-110 cursor-pointer hover:shadow-xl transition-all duration-200"
				@click='one = false; two = true'
			>
				<img src="/assets/airbnb/right.png" class="w-2 h-3 self-center">
			</div>
			
		<Transition name='caroT'>
		<div v-if='one' class='grid grid-cols-2 gap-x-2 w-full absolute origin-bottom-left'>
			<template v-for='(lt,j) in host.host.listing.slice(0,2)' :key='j'>
				<div class="flex flex-col gap-2 cursor-pointer" @click='toDatails(lt.cat, lt.destinationID)'>
					<img :src="lt.image" class="rounded-xl h-full">
					<div class="flex leading-4 gap-2">
						<img v-if='lt.stars != 0' src="/assets/airbnb/star_black.png" class="w-4 h-4 self-center">						
						<div v-if='lt.stars != 0'>{{lt.stars}}</div>
						<div v-if='lt.reviewsNum == -1'>no reviews yet</div>
						<div v-else-if='lt.reviewsNum == 0'></div>
						<div v-else>({{lt.reviewsNum}})</div>
					</div>
					<div>{{lt.about}}</div>
					<div class="long-text1">{{lt.name}}</div>
				</div>
			</template>
		</div>
		</Transition>

		<Transition name='caroT'>
		<div v-if='two' class='grid grid-cols-1 sm:grid-cols-2 gap-x-2 w-full absolute origin-top-right'>
			<template v-for='(lt,j) in host.host.listing.slice(2)' :key='j'>
				<div class="flex flex-col gap-2 cursor-pointer" @click='toDatails(lt.cat, lt.destinationID)'>
					<img :src="lt.image" class="rounded-xl h-full">
					<div class="flex leading-4 gap-2">
						<img v-if='lt.stars != 0' src="/assets/airbnb/star_black.png" class="w-4 h-4 self-center">						
						<div v-if='lt.stars != 0'>{{lt.stars}}</div>
						<div v-if='lt.reviewsNum == -1'>no reviews yet</div>
						<div v-else-if='lt.reviewsNum == 0'></div>
						<div v-else>({{lt.reviewsNum}})</div>
					</div>
					<div>{{lt.about}}</div>
					<div class="long-text1">{{lt.name}}</div>
				</div>
			</template>
		</div>
		</Transition>

		</div>		<!-- listing more than 2 -->
		
		<hr class='mt-2 mb:mt-10 md:mt-24 lg:mt-36'>

		<!-- reviews 1 -->
		<div class="flex flex-col gap-2 mt-4">
			<div class="flex gap-2 text-xl">
				<img src="/assets/airbnb/star_black.png" class="w-4 h-4 self-center">
				<div>{{host.host.reviewsNum}}</div>
				<div>Reviews</div>
			</div>
			<div v-if='host.host.listing.length == 1 && reviews' class='flex flex-col gap-2'>
				<template v-for='(rv,m) in reviews.destination.reviews' :key='m'>
					<div class="text-gray-500 text-sm">{{rv.commentDate}}</div>
					<div><span v-html='rv.comment'></span></div>
					<div class="flex gap-2">
						<img v-if='rv.customerImage != ""' :src="rv.customerImage"  class="rounded-full w-10 h-10">
						<img v-else src="/assets/airbnb/man.png"  class="w-12 h-12 rounded-full">
						<div class="flex flex-col">
							<div>{{rv.customer}}</div>
							<div>{{rv.joineDate}}</div>
						</div>						
					</div>
					<hr>
				</template>
				<button :disabled='noMore' @click='loadMore' class="cursor-pointer self-center bg-white rounded-xl ring-1 ring-gray-600 pl-4 pr-4 pt-2 pb-2 hover:bg-gray-100">
					<div v-if='reviewsLenoading'>loading ...</div>
					<div v-else>show more</div>
				</button>
			</div>
		</div>
		<!-- reviews 1 -->

		<!-- reviews HR	-->
		<div v-if='reviewsHR' class="flex flex-col gap-6">
			<template v-for='(hr,n) in reviewsHR.host.hostReviews' :key='n'>				
				<div class="flex flex-col gap-2">
					<div class="flex gap-2 justify-between">
						<div class="flex flex-col self-center placeFont">
							<div class="text-xl font-semibol">{{hr.place}}</div>
							<div class="text-sm text-gray-700">{{hr.placeDate}}</div>
						</div>
						<img :src="hr.placeLogo" class="w-16 h-12 rounded-xl">
					</div>
					<div class="flex flex-col gap-2">
						<template v-for='(pr,o) in hr.placeReviews' :key='o'>				
							<div class="flex flex-col">
								<div class="long-text"><span v-html='pr.comment'></span></div>
								<button
									v-if='pr.comment.length > 200 & just'
									class='self-center border-b-2 border-transparent hover:border-gray-500 cursor-pointer transition-all duration-300'
									@click='textControl'
								>show more</button>
								<div class="flex gap-2">
									<img v-if='pr.customerImage != ""' :src="pr.customerImage"  class="w-12 h-12 rounded-full">
									<img v-else src="/assets/airbnb/man.png"  class="w-12 h-12 rounded-full">
									<div class="flex flex-col self-center placeFont">
										<div class="text-xl font-semibol">{{pr.customer}}</div>
										<div class="text-sm text-gray-700">{{pr.commentDate}}</div>	
									</div>
								</div>
							</div>
						</template>
					</div>					
				</div>
			</template>		
			<button :disabled='noMoreHR' @click='loadMoreHR' class="cursor-pointer self-center bg-white rounded-xl ring-1 ring-gray-600 pl-4 pr-4 pt-2 pb-2 hover:bg-gray-100">
				<div v-if='reviewsHRLenoading'>loading ...</div>
				<div v-else>show more</div>				
			</button>						
		</div>
		
		<!-- reviews HR	-->

		</div> <!-- right -->					
<div ref='hidRef'></div>


	</div>	
	<div class="w-full bg-gray-200 p-36">footer</div>
</div></template>

<script setup>
	import { ref, watch } from 'vue'
	import { useRoute, useRouter } from 'vue-router'
	import gql from 'graphql-tag'
	import { useQuery } from '@vue/apollo-composable'
	import AirNav from '/src/components/airbnb-copy/comps/utils/AirNav.vue'
	import { 
		GET_HOST, GET_REVIEWS, GET_REVIEWS_LENGTH, GET_REVIEWS_MULTIPLE_LISTING, GET_REVIEWS_MULTIPLE_LISTING_LENGTH
	} from '/src/components/airbnb-copy/quries/quries.js'

	const route = useRoute()
	const router = useRouter()
	const id = route.query.id

	const learnShow = ref(false)
	const longText = ref(true)
	const noMore = ref(false)

	const one = ref(true)
	const two = ref(false)
	
	const just = ref(true)
	const textControl = (e) => {		
		console.log(e.target.innerText)
		if(e.target.innerText == "show more") e.target.innerText = "show less"
		else e.target.innerText = "show more"
		if(e.target.previousElementSibling.classList.contains("long-text"))
			e.target.previousElementSibling.classList.remove("long-text")
		else e.target.previousElementSibling.classList.add("long-text")		
	}

	const { result:host, loading:hostLoading } = useQuery(GET_HOST, () => ({
		hostId: id,		
	}))

	const destinationID = ref(0)
	const type = ref('')
	const listingLength = ref(0)	

	watch(host, val => {
		destinationID.value = val.host.listing[0].destinationID
		type.value = val.host.listing[0].cat
		listingLength.value = val.host.listing.length
	})

	/////////////////////////////// reviews length
	const { result:reviewsLen, loading:reviewsLenoading } = useQuery(GET_REVIEWS_LENGTH, () => ({
		 "destinationId": destinationID.value,
  		"type": type.value,
	}))
	const reviewsLength = ref(0)
	watch(reviewsLen, val => {
		reviewsLength.value = val.destination.reviewsLength.length
	})
	/////////////////////////////// reviews length

	/////////////////////////////// reviews for 1 place only	
	const limit = ref(0)
	const offset = ref(0)
	const { result:reviews, loading:reviewsLoading, fetchMore } = useQuery(GET_REVIEWS, () => ({
		 "destinationId": destinationID.value,
  		"type": type.value,
  		"limit": limit.value,
  		"offset": offset.value
	}))

	const loadMore = (e) => {				
		limit.value += 2
		if(limit.value+2 >= reviewsLength.value){
			noMore.value = true
			// e.target.classList.remove('hover:bg-gray-100', 'cursor-pointer')			not working
			return
		}		
  fetchMore({
    variables: {
      offset: offset.value,      
      limit: limit.value,      
    },
    updateQuery(prev, { fetchMoreResult }) {
            // Make a copy of existing data
      const mergedData = {
        ...prev,
      };
                  // Merge nodes
      mergedData.destination = {
        ...prev.destination,
        reviews: [
          ...prev.destination.reviews,
          ...fetchMoreResult.destination.reviews,
        ],
      };           
      return mergedData;
    },
  });
};
	/////////////////////////////// reviews for 1 place only

	/////////////////////////////// reviews for more place for a host HostReviews
	const { result:reviewsHRLen, loading:reviewsHRLenLoading } = useQuery(GET_REVIEWS_MULTIPLE_LISTING_LENGTH, () => ({
		 	"hostId": id
	}))
	const reviewsHRLength = ref(0)
	watch(reviewsHRLen, val => {
		reviewsHRLength.value = val.host.hostReviewsLen.length
	})
	const limitHR = ref(0)
	const offsetHR = ref(0)
	const { result:reviewsHR, loading:reviewsHRLoading, fetchMore:fetchMoreHR } = useQuery(GET_REVIEWS_MULTIPLE_LISTING, () => ({
		 "hostId": id,
  		"limit": limitHR.value,
  		"offset": offsetHR.value
	}))
const noMoreHR = ref(false)
const hidRef = ref(null)

const loadMoreHR = (e) => {				
	console.log(hidRef.value)
	hidRef.value.scrollIntoView({ behavior:"smooth" })
		limitHR.value += 2
		if(limitHR.value+2 >= reviewsHRLength.value){
			noMoreHR.value = true
			e.target.classList.remove('hover:bg-gray-100', 'cursor-pointer')	
			return
		}		
  fetchMore({
    variables: {      
      limit: limitHR.value,      
    },
    updateQuery(prev, { fetchMoreResult }) {            
      const mergedData = {        ...prev,      };
      mergedData.host = {
        ...prev.host,
        hostReviews: [
          ...prev.host.hostReviews,
          ...fetchMoreResult.host.hostReviews,
        ],
      };           
      return mergedData;
    },
  });
};
	/////////////////////////////// reviews for more place for a host HostReviews

	const toDatails = (c,i) =>{
		window.open(router.resolve({	name: "details", query: { id:i, cat:c } }).href, '_blank')
	}
</script>

<style scoped>
	.fixedDiv{
  position:fixed;
  top:50%;
  left:50%;
  transform: translate(-50%, -50%);  
  width: 70%;
  height: 80%;
  font-family: "Actor";
}

@media screen and (max-width: 768px) {
	.fixedDiv{
  	width: 90%;
  	height: 90%;
	}
}
	.v-enter-from{ top: 110%; opacity:0;  }
	.v-enter-to{ top: 50%; opacity:1; }
	.v-enter-active{  transition: all 0.3s linear;  }

	.v-leave-from{ top: 50%; opacity:1; }
	.v-leave-to{ top: 110%; opacity:0; }
	.v-leave-active{  transition: all 0.5s linear;  }	


	.caroT-enter-from{ transform: scale(0,0); opacity:0;  }
	.caroT-enter-to{ transform: scale(1,1); opacity:1; }
	.caroT-enter-active{  transition: all 0.3s ease-out;  }

	.caroT-leave-from{ transform: scale(1,1); opacity:1; }
	.caroT-leave-to{ transform: scale(0,0); opacity:0; }
	.caroT-leave-active{  transition: all 0.3s linear;  }

.long-text{  
   overflow: hidden;
   text-overflow: ellipsis;
   display: -webkit-box;
   line-clamp: 3; 
   -webkit-line-clamp: 3; /* number of lines to show */           
   -webkit-box-orient: vertical;
}
.long-text1{  
   overflow: hidden;
   text-overflow: ellipsis;
   display: -webkit-box;
   line-clamp: 1; 
   -webkit-line-clamp: 1; /* number of lines to show */           
   -webkit-box-orient: vertical;
}
.bgArrowLeft{	
	background-color: rgb(255, 255, 255, 0.5);	
	right: 8%;
	top: -16%;
	transform: translate(16%);
}
.bgArrowRight{	
	background-color: rgb(255, 255, 255, 0.5);	
	right: 1%;
	top: -16%;
	transform: translate(16%);
}
.bgArrowLeft:hover{	background-color: rgb(255, 255, 255); box-shadow: 1px 1px 1px black;	}
.bgArrowRight:hover{	background-color: rgb(255, 255, 255); box-shadow: 1px 1px 1px black;	}
.placeFont{ font-family:'Glory';  }
</style>

