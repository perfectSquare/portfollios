<template><div class="w-full relative"><div v-if='reviews'>

	<!-- zero review -->
	<div v-if='reviews.destination.reviewsNum == 0' class='pt-2 pb-2 md:pt-4 md:pb-4 w-full grid grid-cols-2 gap-2 md:gap-4'> 

		<div class="flex flex-col gap-4 items-start">
			<div class="text-2xl">No reviews (yet)</div>	
			<div class="flex gap-4 justify-start items-center">
				<img src="/assets/airbnb/star_white.png">
				<div class="flex flex-col">
					<div>This host has {{}} <b>click</b> reviews for other places to stay.</div>
					<div class="self-start cursor-pointer border-b border-gray-400">Show other reviews</div>								 
				</div>
			</div>
		</div>

		<div class="flex flex-col gap-4 items-start">						
			<div></div> <div></div>
			<div class="flex gap-4 justify-start items-center">
				<img src="/assets/airbnb/world.png">
				<div class="flex flex-col">
				<div>We’re here to help your trip go smoothly. Every reservation is covered by</div>
					<a href='https://www.airbnb.com/help/article/544/canceling-during-your-stay' target='_blank' class="self-start cursor-pointer border-b border-gray-400">Airbnb’s Guest Refund Policy. <span class="text-xxs">link: not coded</span></a>								 
				</div>
			</div>
		</div>					
	</div> <!-- zero review -->	

	<!-- multi review -->
	<div v-else class="flex flex-col gap-2"> 
		<div class="text-2xl flex justify-start gap-1">
			<div>&starf;</div> <div>{{reviews.destination.stars}}</div> <div>{{reviews.destination.reviewsNum}} reviews</div>
		</div>
		
		<div class="flex flex-col gap-1 md:grid md:grid-cols-2 md:gap-x-16 pl-4 pr-4">  <!-- level -->
			<template v-for='(vl,ky) in reviews.destination.level' :key='k'>						
			<div class="flex justify-between gap-2 p-2 text-sm text-gray-800">
				<div><span v-if='ky != "val"'>{{ky}}</span><span v-else>value</span></div>
				<div class="flex justify-center gap-2">
					<div class="bg-gray-400 w-28 h-1 rounded-lg relative self-center">
						<div 
							class="border-2 border-black absolute self-center" 
							:class='[											
											{"w41": vl == 4.1},
											{"w42": vl == 4.2},
											{"w43": vl == 4.3},
											{"w44": vl == 4.4},
											{"w45": vl == 4.5},
											{"w46": vl == 4.6},
											{"w47": vl == 4.7},
											{"w48": vl == 4.8},
											{"w49": vl == 4.9},
											{"w-full": vl == 5},
										]'>
						</div>
					</div>
					<div v-if='vl == 5'>5.0</div>
					<div v-else>{{vl}}</div>
				</div>
			</div>						
			</template>
		</div> <!-- level -->

		<div></div>

		<div class="flex flex-col gap-2 md:grid md:grid-cols-2 md:gap-x-8"> <!-- 6 reviews -->							
							<template v-for='(re,j) in reviews.destination.reviewsLength.slice(0,6)' :key='j'>
								<div class="flex flex-col gap-4 mt-4 p-2 md:p-l-6 md:pr-6 text-sm text-gray-800">
									<div class="flex justify-start gap-2">
										<img v-if='re.customerImage != ""' :src="re.customerImage" class="rounded-full w-10 h-10">
										<img v-else src="/assets/airbnb/man.png" class="rounded-full w-10 h-10">
										<div class="flex flex-col gap-1">
											<div> <b>{{re.customer}}</b> </div>
											<div>{{re.commentDate}}</div>
										</div>
									</div>
									<p class="long-text"><span v-html='re.comment'></span></p>
									<div 
										v-if='re.comment.length > 200' 
										class='cursor-pointer border-b border-gray-400 hover:border-gray-800 self-start'
										@click='allReviewsShow = !allReviewsShow'
									>show more</div>
								</div>	
							</template>													
						</div> <!-- 6 reviews -->
						<div 
							v-if='reviews.destination.reviewsNum > 6'
							class="bg-white hover:bg-gray-100 rounded-lg pl-4 pr-4 pt-2 pb-2 md:pl-8 md:pr-8 md:pt-2 md:pb-2 self-start ring-1 ring-gray-600 ring-offset-2 cursor-pointer"
							@click='allReviewsShow = !allReviewsShow'
						>show all {{reviews.destination.reviewsNum}} reviews</div>
				</div> <!-- multi review -->				
		
	<!-- fix all reviews -->
				<Teleport to='#air'>
					<Transition>
							<div 
							v-if='allReviewsShow' 
							class="fixedDivRelay z-50 p-2 sm:p-4 md:p-6 flex flex-col gap-4 justify-start"
							@click.self='allReviewsShow = !allReviewsShow' 
						>
						<div class='flex flex-col gap-2 relayWid self-center p-6 bg-white shadow-xl rounded-2xl'>
							<div 
								@click='allReviewsShow = !allReviewsShow' 
								class="flex justify-center items-center w-6 h-6 hover:bg-gray-200 rounded-full cursor-pointer transition-all duration-200"
							>&#9874;</div>						
							<div class="flex flex-col gap-2 md:grid md:grid-cols-12 md:gap-2 leading-4">
					<div class="col-span-5 lg:col-span-4 flex flex-col sm:gap-y-1 md:gap-y-2 p-2"> 
						<div class="md:text-xl flex justify-start gap-1"> 
							<div>&starf;</div> <div>{{reviews.destination.stars}}</div> <div>{{reviews.destination.reviewsNum}} reviews</div>
						</div> 
					<template v-for='(vl,ky) in reviews.destination.level' :key='k'>						
						<div class="flex text-xs md:text-base justify-between gap-1 md:gap-2 p-2 text-sm text-gray-800">
							<div><span v-if='ky != "val"'>{{ky}}</span><span v-else>value</span></div>
								<div class="flex justify-center gap-2">
									<div class="bg-gray-400 w-28 h-1 rounded-lg relative self-center">
										<div 
											class="border-2 border-black absolute self-center" 
											:class='[															
												{"w41": vl == 4.1},
												{"w42": vl == 4.2},
												{"w43": vl == 4.3},
												{"w44": vl == 4.4},
												{"w45": vl == 4.5},
												{"w46": vl == 4.6},
												{"w47": vl == 4.7},
												{"w48": vl == 4.8},
												{"w49": vl == 4.9},
												{"w-full": vl == 5},
											]'>
										</div>
									</div>
									<div v-if='reviews.destination.level.cleanliness == 5'>5.0</div>
									<div v-else>{{reviews.destination.level.cleanliness}}</div>
								</div>
							</div>						
						</template>
						</div>
						
						<div class="col-span-7 lg:col-span-8 overflow-y-scroll overscroll-y-auto h-64 md:h-120 scrollStyle">
							<div class="flex flex-col gap-2 md:grid md:grid-cols-2 md:gap-x-8"> <!-- 6 reviews -->							
							<template v-for='(re,j) in reviews.destination.reviewsLength' :key='j'>
								<div class="flex flex-col gap-4 mt-4 p-2 md:p-l-6 md:pr-6 text-sm text-gray-800">
									<div class="flex justify-start gap-2">
										<img v-if='re.customerImage != ""' :src="re.customerImage" class="rounded-full w-10 h-10">
										<img v-else src="/assets/airbnb/man.png" class="rounded-full w-10 h-10">
										<div class="flex flex-col gap-1">
											<div> <b>{{re.customer}}</b> </div>
											<div>{{re.commentDate}}</div>
										</div>
									</div>
									<p><span v-html='re.comment'></span></p>									
								</div>	
							</template>													
						</div> 
						</div> 						
					</div>
							<br> <br>
						</div>													
						</div>
					</Transition>
				</Teleport>					
<!-- fix all reviews -->

</div></div></template>
<script setup>
	import { ref } from 'vue'
	import gql from 'graphql-tag'
	import { useQuery } from '@vue/apollo-composable'

	const props = defineProps({		destinationId:Number,		type:String,	})

	const allReviewsShow = ref(false)

	const GET_REVIEWS = gql`query getReviews($destinationId: ID!, $type: String!) {
  destination(id: $destinationId, type: $type) {
    reviewsNum
    stars
    level {
        accuracy
        checkIn
        cleanliness
        communication
        location
        val      
      }     
    reviewsLength {
      commentDate
      comment
      customer
      customerImage             
    }
  }
}`

	const { result:reviews, loading:reviewsLoading } = useQuery(GET_REVIEWS, () => ({
		destinationId: props.destinationId,
		type: props.type
	}))
</script>

<style scoped>
	.w41{ width:82%;  }
	.w42{ width:84%;  }
	.w43{ width:86%;  }
	.w44{ width:88%;  }
	.w45{ width:90%;  }
	.w46{ width:92%;  }
	.w47{ width:94%;  }
	.w48{ width:96%;  }
	.w49{ width:98%;  }
	.fixedDivRelay{
  position:fixed;
  top:0%;
  left:0%;  
  width: 100%;
  height: 100%;
  font-family: "Actor";
  background-color: rgb(204, 204, 204, 0.5);
}
.hScroll{ height:60%;  }
.relayWid{ width:98%; height:98%;  }
@media screen and (max-width: 768px) {	
	.hScroll{ height:40%;  }
}
@media screen and (min-width: 968px) {	
	.relayWid{ width:90%; height:95%;  }
}
		.v-enter-from{ top: 110%; opacity:0;  }
	.v-enter-to{ top: 0%; opacity:1; }
	.v-enter-active{  transition: all 0.5s linear;  }

	.v-leave-from{ top: 0%; opacity:1; }
	.v-leave-to{ top: 110%; opacity:0; }
	.v-leave-active{  transition: all 0.5s linear;  }	

	.long-text{
		overflow:  hidden;
		text-overflow:  ellipsis;		 
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
	}
</style>

