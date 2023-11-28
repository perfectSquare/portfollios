<template><div class="relative">
	<div class="w-full pl-8 pr-8 pt-2 pb-4 md:pt-8 md:pl-12 md:pr-12 bg-white"> <!-- nav -->
      <AirNav :luxi = 'luxi' />
  </div> <!-- nav -->
  <hr>
    <div v-if='dataLoading' class="spin flex gap-1"><div></div><div></div><div></div></div>

    <div v-if='stickShow' class="sticky top-0 z-50 ring-1 ring-gray-200 bg-white pl-12 md:pl-20 pt-3 pb-6 md:pt-6 md:pb-3 flex justify-start gap-6">
    	<a @click='toIt("#photos")'  class="cursor-pointer border-b-2 border-transparent hover:border-gray-800 transition-all duration-500">Photos</a>
    	<a @click='toIt("#amenities")' class="cursor-pointer border-b-2 border-transparent hover:border-gray-800 transition-all duration-500">Amenities</a>
    	<a @click='toIt("#reviewsID")' class="cursor-pointer border-b-2 border-transparent hover:border-gray-800 transition-all duration-500">Reviews</a>
    	<a @click='toIt("#location")'  class="cursor-pointer border-b-2 border-transparent hover:border-gray-800 transition-all duration-500">Location</a>
    </div>
	
		<!-- details -->
	<div v-if='details' class="relative flex flex-col items-start gap-y-4 pl-8 pr-8 pt-3 pb-6 md:pt-6 md:pb-3 md:pl-12 md:pr-12 nameFont">
		<template v-for='(dt,i) in details' :key='i'>			
			<div class="text-2xl">{{dt.name}}</div>			

			<div class='flex justify-between gap-2 w-full'>
				<div class="flex">
					<div v-if='dt.stars != 0 && !dt.luxi' class='text-sm flex gap-1'>
						<img src="/assets/airbnb/star_black.png" class="w-4 h-4">
					<div>{{dt.stars}}</div>										
					</div>
					<div v-if='dt.stars != 0 && !dt.luxi' class="text-xl relative bottom-2">&nbsp;.&nbsp;</div>
					<div 			
						@click='loadReviewsToShow'			
						v-if='dt.reviewsNum != 0' class='text-sm border-b-2 border-gray-400 cursor-pointer flex gap-2'
					>				
						<div>{{dt.reviewsNum}}</div>
						<div>reviews</div> 
					</div>
					<div v-if='dt.reviewsNum != 0' class="text-xl relative bottom-2">&nbsp;.&nbsp;</div>
					<div v-if='dt.hostIntro[0] == "super" && dt.luxi' class='text-sm flex gap-2'>
						<img src="/assets/airbnb/super-icon.png" class="w-3 h-4 self-center">
						<div>Superhost</div>&nbsp;
					</div>
					<div 
						@click='loadCoordsShow'
						class='text-sm border-b-2 border-gray-400 cursor-pointer'
					>{{dt.nick}}</div>
				</div>

				<!-- <div class='text-sm border-b-2 border-gray-400 cursor-pointer'>share as link</div> -->
			</div>						
			
			<!-- images -->
			<div id="photos" class="relative pt-2 pb-2 pl-16 pr-16 w-full h-96"> 
				<ImageExplorer 
					v-if='!dt.luxi'
					:destinationId = 'id'
					:type = 'cat'
				/>
				<LuxImageExplorer 
					v-if='dt.luxi'
					:destinationId = 'id'
					:type = 'cat'
					toShow='one'
				/>
			</div> <!-- images -->

			<div class='relative grid grid-cols-12 gap-2 w-full'> <!-- after images -->
				<div class="col-span-11 lg:col-span-8"> <!-- after images details left -->

					<!-- intro + host logo -->
					<div class='flex justify-between pt-6 pb-6 pl-2 pb-2 md:pt-8 md:pb-8 bgM'> 
						<HostIntro
							v-if='!dt.luxi'
							:destinationId = 'id'
							:type = 'cat'
						/>
						<div v-else class='flex flex-col gap-1'>
							<div class="text-2xl">{{dt.hostIntro[1]}}</div>
							<div class="flex">
								<!-- <div>{{dt.guests.adults}} guests</div>				 -->
								<template v-for='(ho,i) in dt.hostIntro.slice(2)'>
									<div class="self-center text-xl relative bottom-2">&nbsp;.&nbsp;</div>
									<div>{{ho}}</div>					
								</template>											
							</div>			
						</div>	
					</div> 
					<!-- intro + host logo --> 
					<!-- <hr> --> <!-------------------------------------------- hr -------------------------------------------->
					<br>
					<div v-if='dt.destinationIntro.length != 0'  class='flex justify-between pt-6 pb-6 pl-2 pb-2 md:pt-8 md:pb-8 bgM'>   <!-- host offers -->
						<DestinationIntro
							:destinationId = 'id'
							:type = 'cat'
							:checkIn='inDay' 
						/>
					</div> <!-- host offers --> 
					<br v-if='dt.destinationIntro.length != 0' > <!-------------------------------------------- hr -------------------------------------------->
					<div v-if='!dt.luxi' class='p-2 md:p-4 flex flex-col items-start gap-y-6 bgM'> <!-- air cover -->
						<img src="https://a0.muscache.com/im/pictures/54e427bb-9cb7-4a81-94cf-78f19156faad.jpg" class="w-24">
						<div>Every booking includes free protection from Host cancellations, listing inaccuracies, and other issues like trouble checking in.</div>
						<div @click='airCoverShow = !airCoverShow' class='border-b-2 border-transparent hover:border-gray-800 cursor-pointer transition-all duration-300'>Learn more</div>
					</div> <!-- air cover --> 
					<hr v-if='!dt.luxi'> <!-------------------------------------------- hr -------------------------------------------->
					<div class='pt-4 pb-4 md:pt-6 md:pb-6 pl-2 pr-2 bgM'> <!-- dest description -->						
						<Description 
							:destinationId = 'id'
							:type = 'cat'							
						/>
					</div> <!-- dest description --> 
					 <!-------------------------------------------- hr -------------------------------------------->
					 <!-- lux images -->
					 <div v-if='dt.luxi' class='pt-4 pb-4 md:pt-6 md:pb-6 pl-2 pr-2 bgM flex flex-col gap-4'>
					 	<div class="flex gap-4 text-xl">
					 		<i>Hospitality by</i> <div class="font-medium">Luxury Retailers</div>
					 	</div>
					 	<LuxImageExplorer 
							:destinationId = 'id'
							:type = 'cat'
							toShow='more'
						/>
					 </div>
					 <!-- lux images -->
					<hr v-if='dt.luxi'> <!-------------------------------------------- hr -------------------------------------------->					 
					<!-- sleep -->										
					<div v-if='noBed' class='pt-4 pb-4 md:pt-6 md:pb-6 descFont flex flex-col items-start gap-2 bgM'> 
						<div class="sleepFont text-xl relative"> <b>Where you'll sleep</b> </div>
						<BedRooms 
							:destinationId = 'id'
							:type = 'cat'
							@noBed = 'noBed = false'
						/>
					</div> 
					<!-- sleep --> 
					 <!-------------------------------------------- hr -------------------------------------------->
					<!-- offers -->										
					<div v-if='!dt.luxi' class='flex justify-between pt-6 pb-6 md:pt-8 md:pb-8 bgM'>
						<Offers 
							:destinationId = 'id'
							:type = 'cat'
						/>
					</div>
					<div id='amenities'></div>
					<!-- offers --> 
					<hr v-if='!dt.luxi'> <!-------------------------------------------- hr -------------------------------------------->
					<div class='pt-4 pb-4 md:pt-6 md:pb-6 w-full flex flex-col gap-4'> <!-- Calendar -->
						<div class='text-xl'>{{trip}} nights in {{dt.nick}}</div>
						<div class='text-gray-600 text-sm'>{{dt.checkIn}} - {{dt.checkOut}}</div>
						<Calendars 
							:defaultIn='defIn'
							:marker1='dt.checkIn'
							:marker2='dt.checkOut'
							:month1='month1' 	
							:year1='year1'
							:monNumber1='monNumber1' 
							:checkIn1='inDay' 
							:checkOut1='outDay'
							:month2='month2' 	
							:year2='year2'
							:monNumber2='monNumber2' 
							:checkIn2=0 
							:checkOut2=0
							@inSet='setIn'
							@outSet='setOut'
							:nightsLimit='nightsLimit'
						/>
					</div> <!-- Calendar --> 
					<hr> <!-------------------------------------------- hr -------------------------------------------->					
				</div> <!-- after images details left -->

				<!-- sticky div -->
				<div class="hidden z-40 w-full bg-white fixed top-14 left-4 lg:sticky lg:top-12 lg:inline-block lg:col-span-4 p-2 lg:p-4"> 
					<div @click='rateOff' class="absolute right-6 z-50 top-6 flex justify-center items-center w-6 hover:bg-gray-100 rounded-full block lg:hidden cursor-pointer">&#9874;</div>
					<Rate
						:marker1='dt.checkIn'
						:marker2='dt.checkOut'
						:month1='month1' 	
						:year1='year1'
						:monNumber1='monNumber1' 
						:month2='month2' 	
						:year2='year2'
						:monNumber2='monNumber2' 
						:rent='dt.rent'
						:weekDiscount='dt.weekDiscount'
						:checkIn='inDay'
						:checkOut='outDay'
						:serviceCharges='dt.serviceCharges'
						:hospitalityFee='dt.hospitalityFee'
						:cleaningFee='dt.cleaningFee'
						:destinationId='id'
						:type='cat'
						:nightsLimit='nightsLimit'
					/>
				</div> <!-- sticky div -->

				<img 
					src='/assets/airbnb/bill.png'
					title="bill details" 
					@click='(e) => {e.target.previousElementSibling.classList.remove("hidden"); e.target.classList.add("hidden")}' 
					class='inline-block sticky top-1/2 left-4 col-span-1 lg:hidden lg:absolute hover:scale-105 transition-all duration-300 flex flex-col items-center justify-center cursor-pointer'
				>												
			</div> <!-- after images -->			
<div id="beds"></div>
			<div v-if='dt.luxi' class="p-16 bg-gray-100 w-full flex flex-col gap-6">
				<div class="flex gap-4">
					<img src="/assets/airbnb/airbnbLux.png">
					<div>Luxe</div>
				</div>
				<div class="text-2xl">Extraordinary homes with five-star everything</div>
				<div>Pristine and expertly designed, each Airbnb Luxe home comes with luxury amenities, services, and a dedicated trip designer.</div>
				<a href="https://www.airbnb.com/luxury" target="_blank" class="border-b-2 border-gray-200 hover:border-gray-600 self-start">Learn more <span class="text-xxs">not coded</span></a>
			</div>

			<div v-if='dt.luxi && dt.luxIncluded.length != 0' class='pt-6 pb-6 md:pt-8 md:pb-8 w-full bgM flex flex-col gap-2'>
				<div class="text-2xl">Included with this home</div>
				<div>Helpful essentials you can expect when booking this home.</div>
				<div class="grid grid-cols-3 md:grid-cols-4 gap-4">
					<template v-for='(inc,i) in dt.luxIncluded' :key='i'>
						<div class="flex flex-col gap-2 w-full">
							<img :src="inc.image" class='w-full h-40 lg:h-48'>
							<div>{{inc.about}}</div>
						</div>
					</template>
				</div>
			</div>
			<br> <!-------------------------------------------- hr -------------------------------------------->

			<div v-if='dt.luxi' class='pt-6 pb-6 md:pt-8 md:pb-8 w-full bgM flex flex-col gap-2'>
				<div class="text-2xl">Add on services</div>
				<div>After booking this home, a trip designer can arrange any of these add-on services.</div>
				<div class="grid grid-cols-3 md:grid-cols-4 gap-4">
					<template v-for='(inc,i) in dt.luxServices' :key='i'>
						<div class="flex flex-col gap-2 w-full">
							<img :src="inc.image" class='w-full h-40 lg:h-48'>
							<div>{{inc.about}}</div>
						</div>
					</template>
				</div>
				<div>Not seeing something that you would like to order?</div>
				<button
					class='pl-4 pr-4 pt-2 pb-2 bg-white rounded-xl ring-1 ring-gray-800 hover:bg-gray-100 transition-all duration-300 self-start'
					@click='messageToDesigner = !messageToDesigner'
				>
				Message a trip designer</button>

				<Teleport to='#air'>
				<Transition>
				<div 
					v-if='messageToDesigner' 
					class="fixedDivRelay z-50 p-6 flex flex-col gap-4 justify-start"
					@click.self='messageToDesigner = !messageToDesigner' 
				>
					<div class='flex flex-col gap-4 relayWid self-center p-6 bg-white shadow-xl rounded-2xl'>
						<div 
							@click='messageToDesigner = !messageToDesigner' 
							class="flex justify-center items-center w-6 h-6 hover:bg-gray-200 rounded-full cursor-pointer transition-all duration-200"
						>&#9874;</div>
						
						<div class="flex justify-between">
							<div class='flex flex-col gap-2 text-2xl'>
								<div>Questions about this home?</div>	
								<div>{{dt.name}}</div>		
								<div>$ {{dt.rent}} night</div>
							</div>
							<img :src="dt.images[0]" class="self-center w-24 h-16 rounded-lg">							
						</div>	

						<hr>
						<div>Your message</div>
						<textarea placeholder="for example, is this home family friendly" class='rounded-lg ring-1 ring-gray-200'></textarea>
						<button class='p-2 ring-1 ring-gray-200 rounded-lg'>send message</button>
					</div>							

					</div>
					</Transition>
					</Teleport>				
			</div>
			<br v-if='dt.luxi'> <!-------------------------------------------- hr -------------------------------------------->

			<div v-if='dt.luxi' class='pt-4 pb-4 w-full bgM flex flex-col gap-4 bgM'>
				<div class="text-2xl">Amenities</div>
				<div class='grid grid-cols-3'>
					<div class="flex flex-col gap-4">
						<div class="text-xl">{{dt.offers.moreOffers[0].cat}}</div>						
						<template v-for='(am, i) in dt.offers.moreOffers[0].catOffers.slice(0,6)' :key='i'>
							<div class="text-sm">{{am.about}}</div>
						</template>
					</div>
					<div class="flex flex-col gap-4">
						<div class="text-xl">{{dt.offers.moreOffers[1].cat}}</div>						
						<template v-for='(am, i) in dt.offers.moreOffers[1].catOffers.slice(0,6)' :key='i'>
							<div class="text-sm">{{am.about}}</div>
						</template>
					</div>
					<div class="flex flex-col gap-4">
						<div class="text-xl">{{dt.offers.moreOffers[2].cat}}</div>						
						<template v-for='(am, i) in dt.offers.moreOffers[2].catOffers.slice(0,6)' :key='i'>
							<div class="text-sm">{{am.about}}</div>
						</template>
					</div>
				</div>				
				<button @click='amenitiesShow = !amenitiesShow' class="mt-2 pl-4 pr-4 pt-2 pb-2 bg-white rounded-xl ring-1 ring-gray-800 hover:bg-gray-100 self-start">show all {{dt.offers.offsLength}} amenities</button>
				<Teleport to='#air'>
					<Transition>
							<div 
							v-if='amenitiesShow' 
							class="fixedDivRelay z-50 p-6 flex flex-col gap-4 justify-start"
							@click.self='amenitiesShow = !amenitiesShow' 
						>
						<div class='flex flex-col gap-2 relayWid self-center p-6 bg-white shadow-xl rounded-2xl'>
							<div 
								@click='amenitiesShow = !amenitiesShow' 
								class="flex justify-center items-center w-6 h-6 hover:bg-gray-200 rounded-full cursor-pointer transition-all duration-200"
							>&#9874;</div>															
						<div class="text-2xl">Amenities</div>
				<div class='grid grid-cols-1 overflow-y-scroll scrollStyle'>
					<div class="flex flex-col gap-4">						
						<template v-for='(am, i) in dt.offers.moreOffers' :key='i'>
							<div class="text-xl">{{am.cat}}</div>						
							<template v-for='(amCat, j) in am.catOffers' :key='j'>
								<div class="text-sm">{{amCat.about}}</div>
							</template>							
							<hr>
						</template>						
					</div>
					<hr>										
				</div>				
						</div>							
						</div>
					</Transition>
				</Teleport>				
			</div>

			<br v-if='dt.luxi'> <!-------------------------------------------- hr -------------------------------------------->

			<div v-if='dt.luxi' class='pb-6 pt-2 w-full bgM flex flex-col gap-4 bgM'>
				<div class="text-2xl">The Airbnb Luxe difference</div>
				<div class="grid grid-cols-3 gap-4">
					<div class="flex flex-col gap-2">
						<img class='w-full h-44 rounded-xl' src="https://a0.muscache.com/im/pictures/1e215e72-6d59-44f0-a3c1-0622172aa412.jpg?im_w=480">
						<div class="font-semibold">Start-to-finish trip planning</div>
						<div class="text-sm">Trip designers coordinate your arrival, departure, and everything in between.</div>
					</div>
					<div class="flex flex-col gap-2">
						<img class='w-full h-44 rounded-xl' src="https://a0.muscache.com/im/pictures/891157ae-e37e-4d13-9788-1903b2492935.jpg?im_w=480">
						<div class="font-semibold">300 point inspection and vetting</div>
						<div class="text-sm">Every Airbnb Luxe home is personally verified to be in pristine condition.</div>
					</div>
					<div class="flex flex-col gap-2">
						<img class='w-full h-44 rounded-xl' src="https://a0.muscache.com/im/pictures/5bb65d75-111c-4534-bdc5-87d5752d0a30.jpg?im_w=480">
						<div class="font-semibold">On-trip care</div>
						<div class="text-sm">Premium, on-demand assistance for any question.</div>
					</div>
				</div>
			</div>		
			<br v-if='dt.luxi'> <!-------------------------------------------- hr -------------------------------------------->

			<div v-if='!dt.luxi' class="w-full pt-6 pb-6 md:pt-8 md:pb-8 bgM" id='reviewsID'> <!-- reviews -->
				<Review 
					:destinationId = 'id'
					:type = 'cat'					
				/>						
			</div> <!-- reviews -->						


		</template></div> 
		<!-- details -->

	
	<div id='location' class="w-full pl-12 pr-12 pt-2 pb-2 sm:pl-24 sm:pr-24 bgM">
		<div v-if='!details.destination.luxi' class="p-2 text-2xl font-semibold">Where you'll be</div>
		<div v-if='details.destination.luxi' class="text-xl">Location</div>
		<div v-if='details.destination.luxi'>{{details.destination.nick}}</div>
		<br>
		<ExactLocation :latitude='details.destination.latitude' :longitude='details.destination.longitude' />
		<br>
		<div class="flex flex-col gap-6">
			<b>{{details.destination.nick}}</b>
			<div class="long-text"><span v-html='details.destination.description'></span></div>
			<button 
				v-if='details.destination.description.length > 300'
				class='self-start border-b-2 border-gray-200 hover:border-gray-600 transition-all duration-300'
				@click='(e) =>{
					e.target.previousElementSibling.classList.remove("long-text")
					e.target.classList.add("hidden")
				}'
			>show more</button>
		</div>
		<br>

	</div>
	<br> <!-------------------------------------------- hr -------------------------------------------->
	<!-- host -->
	<div class="w-full pt-6 pb-6 md:pt-8 md:pb-8 bgM" id='host'>
		<Host 
			:destinationId = 'id'
			:type = 'cat'
		/>						
	</div>
	<!-- host -->	
	<br> <!-------------------------------------------- hr -------------------------------------------->

	<!-- things to note -->
	<div class="w-full bgM" id='host'>
		<Things 
			:destinationId = 'id'
			:type = 'cat'
			:inDay='inDay' 
		/>						
	</div>
 <!-- things to note -->

	<br> <!-------------------------------------------- hr -------------------------------------------->

				<Teleport to='#air'>
					<Transition>
							<div 
							v-if='airCoverShow' 
							class="fixedDivRelay z-50 p-6 flex flex-col gap-4 justify-start"
							@click.self='airCoverShow = !airCoverShow' 
						>
						<div class='flex flex-col gap-2 relayWid self-center p-6 bg-white shadow-xl rounded-2xl'>
							<div 
								@click='airCoverShow = !airCoverShow' 
								class="flex justify-center items-center w-6 h-6 hover:bg-gray-200 rounded-full cursor-pointer transition-all duration-200"
							>&#9874;</div>
							<div class="text-3xl font-bold"><span class="col">air</span>cover</div>
		<div>AirCover is comprehensive protection included for free with every booking.</div>
		<hr>

		<div class="flex flex-col gap-4 md:grid md:grid-cols-2 md:gap-16 overflow-y-scroll scrollStyle">
			<div class="flex flex-col gap-2">
				<div class="font-bold">Booking Protection Guarantee</div>
				<div class="text-gray-700">In the unlikely event a Host needs to cancel your booking within 30 days of check-in, we’ll find you a similar or better home, or we’ll refund you.</div>
			</div>
			<div class="flex flex-col gap-2">
				<div class="font-bold">Check-In Guarantee</div>
				<div class="text-gray-700">If you can’t check into your home and the Host cannot resolve the issue, we’ll find you a similar or better home for the length of your original stay, or we’ll refund you.</div>
			</div>
			<div class="flex flex-col gap-2">
				<div class="font-bold">Get-What-You-Booked Guarantee</div>
				<div class="text-gray-700">If at any time during your stay you find your listing isn't as advertised—for example, the refrigerator stops working and your Host can’t easily fix it, or it has fewer bedrooms than listed—you'll have three days to report it and we’ll find you a similar or better home, or we’ll refund you.</div>
			</div>
			<div class="flex flex-col gap-2">
				<div class="font-bold">24-hour Safety Line</div>
				<div class="text-gray-700">If you ever feel unsafe, you’ll get priority access to specially-trained safety agents, day or night.</div>
			</div>			
		</div>
		<div>Find complete details on how AirCover protects your booking in our <a class='border-b-2 border-gray-400 cursor-pointer' href="https://www.airbnb.com/help/article/3218/getting-protected-through-aircover" target="_blank">Help Center <span class="text-xxs">not coded</span></a></div>
							
						</div>							
						</div>
					</Transition>
				</Teleport>				
	
	<div class="w-full bg-gray-200 p-36">footer</div>


<!-- fix all reviews -->
				<Teleport to='#air'>
					<Transition>
							<div 
							v-if='allReviewsShow' 
							class="fixedDivRelayForReview z-50 p-2 sm:p-4 md:p-6 flex flex-col gap-4 justify-start"
							@click.self='allReviewsShow = !allReviewsShow' 
						>
						<div class='flex flex-col gap-2 relayWidForReviews self-center p-6 bg-white shadow-xl rounded-2xl'>
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

<!-- map on click -->
<Teleport to='#air'>
<Transition>	
<div 
	v-if='mapShow' 
	class="fixedDivCoords bg-white shadow-xl z-50 p-2 sm:p-4 md:p-6 flex flex-col gap-4 justify-start overflow-y-scroll scrollStyle"
>
	<div v-if='coordsLoading' class="spin flex gap-1"><div></div><div></div><div></div></div>
	<div v-else-if='coords && coords.destination'>
	<div @click='mapShow = !mapShow' class="flex justify-center items-center w-8 h-8 hover:bg-gray-200 rounded-full cursor-pointer transition-all duration-200">&#9874;</div>						
	<div class="md:grid md:grid-cols-12 md:gap-1 flex flex-col gap-4">
		<div class="md:col-span-3 flex flex-col gap-6 overflow-y-scroll scrollStyle h-3/4">
			<div class="text-xl">Where you’ll be</div>
			<b>{{coords.destination.nick}}</b>
			<div class="long-text"><span v-html='coords.destination.description'></span></div>
			<button 
				v-if='coords.destination.description.length > 200'
				class='self-start border-b-2 border-gray-200 hover:border-gray-600 transition-all duration-300'
				@click='(e) =>{
					e.target.previousElementSibling.classList.remove("long-text")
					e.target.classList.add("hidden")
				}'
			>show more</button>
		</div>
		<div class="md:col-span-9">
			<ExactLocation :latitude='coords.destination.latitude' :longitude='coords.destination.longitude' />
		</div>
		<br>
	</div>	
	</div>

</div>
</Transition>
</Teleport>
<!-- map on click -->

	<!-- luxe convesration -->
	<div 
		v-if='details.destination.luxi'
		class="fixed bot right-2 bg-white shadow-xl rounded-xl p-4 flex gap-4 z-50 cursor-pointer" 
		@click='messageToDesigner = !messageToDesigner'
		:class='messageClass'
	>
		<img 
			src="/assets/airbnb/speaks.png" 
			class="w-4 h-4 self-center"			
		>
		<div :class='messageImageClass'>Ask a question</div>
	</div>
	<!-- luxe convesration -->
	
</div></template>

<script setup>
	import { ref, provide, watch } from 'vue'
	// import $ from 'jquery';
	import { useRoute } from 'vue-router'
	import { useQuery, useLazyQuery } from '@vue/apollo-composable'
	import { GET_DETAILS } from '/src/components/airbnb-copy/quries/quries.js'
	import gql from 'graphql-tag'
	import AirNav from '/src/components/airbnb-copy/comps/utils/AirNav.vue'
	import HostIntro from '/src/components/airbnb-copy/comps/details/HostIntro.vue'
	import DestinationIntro from '/src/components/airbnb-copy/comps/details/DestinationIntro.vue'
	import Description from '/src/components/airbnb-copy/comps/details/Description.vue'
	import ImageExplorer from '/src/components/airbnb-copy/comps/details/ImageExplorer.vue'
	import LuxImageExplorer from '/src/components/airbnb-copy/comps/details/LuxImageExplorer.vue'
	import BedRooms from '/src/components/airbnb-copy/comps/details/BedRooms.vue'
	import Offers from '/src/components/airbnb-copy/comps/details/Offers.vue'
	import Host from '/src/components/airbnb-copy/comps/details/Host.vue'
	import Review from '/src/components/airbnb-copy/comps/details/Review.vue'
	import Things from '/src/components/airbnb-copy/comps/details/Things.vue'
	import Rate from '/src/components/airbnb-copy/comps/utils/Rate.vue'
	import Calendars from '/src/components/airbnb-copy/comps/utils/Calendars.vue'
	import ExactLocation from '/src/components/airbnb-copy/comps/maps/ExactLocation.vue'
	
	const route = useRoute()
	const id = route.query.id
	const cat = route.query.cat

	const inDay = ref('')
	const outDay = ref('')
	const trip = ref(0)
	const noBed = ref(true)

	const setIn = (x) =>{	
		inDay.value = x 		
	}  // ok
	const setOut = (x,y) =>{	
		outDay.value = x 	
		trip.value = y
	} 	
	
	
	const defIn = ref(true)
	const airCoverShow = ref(false)
	const messageToDesigner = ref(false)
	const amenitiesShow = ref(false)
	provide('in', inDay)
	provide('out', outDay)
	provide('trip', trip)
	provide('defIn', defIn)

	const rateOff = (e) => {
		e.target.parentElement.nextElementSibling.classList.remove("hidden")
		e.target.parentElement.classList.add("hidden")
	}	

const { result:details, loading:dataLoading } = useQuery(GET_DETAILS, () => ({
	destinationId:id,
	"type": cat
}))

const monthsEnum = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const month1 = ref('')
const monNumber1 = ref(0)
const year1 = ref(0)
const month2 = ref('')
const monNumber2 = ref(0)
const year2 = ref(0)
const nightsLimit = ref(0)
const luxi = ref(false)

	 watch(details, val => {      
	 	inDay.value = val.destination.checkIn
		outDay.value = val.destination.checkOut
		month1.value = monthsEnum[new Date(inDay.value).getMonth()]
		year1.value = new Date(inDay.value).getFullYear()
		monNumber1.value = new Date(inDay.value).getMonth()		

		if(monNumber1 == 11) year2.value = new Date(inDay.value).getFullYear()+1
		else year2.value = new Date(inDay.value).getFullYear()

		month2.value = monthsEnum[new Date(inDay.value).getMonth()+1]
		monNumber2.value = new Date(inDay.value).getMonth()+1			

		trip.value = Math. ceil((new Date(outDay.value).getTime() - new Date(inDay.value).getTime()) / (1000 * 3600 * 24))

		nightsLimit.value = val.destination.nightsLimit

		luxi.value = val.destination.luxi

    })	 

const messageClass = ref('hidden')
const messageImageClass = ref('block')
	
	const stickShow = ref(false)
	window.onscroll = function() {scrolling()};
	function scrolling() {		
  	if(window.pageYOffset > 250) stickShow.value = true
  	else stickShow.value = false

  	if(window.pageYOffset > 0)  		messageClass.value = 'block messageAnimation'  	
  	else{
  		messageClass.value = 'messageAnimationR'  	
  		setTimeout(() => { messageClass.value = 'hidden' }, 500)
  	} 

  	if(document.documentElement.scrollTop > document.getElementById('beds').offsetTop)  		messageImageClass.value = 'hidden'  	
  	else messageImageClass.value = 'block'
	}

const toIt = (x) => {    
		window.scrollTo({
			top: document.querySelector(x).offsetTop,
			behavior: "smooth"
		})
	}

////////////////////////////////////////////// reviews
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
const allReviewsShow = ref(false)
const { result:reviews, loading:reviewsLoading, load:loadReviews } = useLazyQuery(  GET_REVIEWS,  
	{    
		destinationId:id,
		type: cat
	}
)

const loadReviewsToShow = () => {
	loadReviews()
	allReviewsShow.value = !allReviewsShow.value	
}
////////////////////////////////////////////// reviews

////////////////////////////////////////////// map on click
const GET_COORDS = gql`query ($destinationId: ID!, $type: String!) {
  destination(id: $destinationId, type: $type) {      
  	nick
  	description  
    latitude
    longitude            
  }
}`
const mapShow = ref(false)
const { result:coords, loading:coordsLoading, load:loadCoords } = useLazyQuery(  GET_COORDS,  
	{    
		destinationId:id,
		type: cat
	}
)
const loadCoordsShow = () => {
	loadCoords()
	mapShow.value = !mapShow.value
}
////////////////////////////////////////////// map on click
</script>

<style scoped>
	.col{ color: #fa004b; }
	.w41{ width:82%;  }
	.w42{ width:84%;  }
	.w43{ width:86%;  }
	.w44{ width:88%;  }
	.w45{ width:90%;  }
	.w46{ width:92%;  }
	.w47{ width:94%;  }
	.w48{ width:96%;  }
	.w49{ width:98%;  }

.fixedDivRelayForReview{
  position:fixed;
  top:0%;
  left:0%;  
  width: 100%;
  height: 100%;
  font-family: "Actor";
  background-color: rgb(204, 204, 204, 0.5);
}

.relayWidForReviews{ width:98%; height:98%;  }

@media screen and (min-width: 968px) {	
	.relayWidForReviews{ width:90%; height:95%;  }
}

.spin{
  position:fixed;
  top:4%;
  left:50%;
  transform: translate(-4%, -50%);  
}
.spin div{
  width:6px;
  height:6px;
  background-color:#2d404e;
  border-radius: 50%;
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
  0%{  opacity: 1; }
  100%{  opacity:0; }
}
.nameFont{ font-family: 'Laila';  }
.descFont{ font-family: 'Actor';  }
.sleepFont{ font-family: 'Neucha';  letter-spacing:2px; }

.imFilter:hover{		filter: brightness(.86);	}
.long-text{  
  /*overflow: hidden;  
 	line-height:22px;
  height:66px;

  white-space: nowrap;
  text-overflow: ellipsis;*/
   overflow: hidden;
   text-overflow: ellipsis;
   display: -webkit-box;
   line-clamp: 3; 
   -webkit-line-clamp: 3; /* number of lines to show */           
   -webkit-box-orient: vertical;
}
.fixedDivRelay{
  position:fixed;
  top:0%;
  left:0%;  
  width: 100%;
  height: 100%;
  font-family: "Actor";
  background-color: rgb(204, 204, 204, 0.5);
}
.relayWid{ width:75%; height:90%;  }
.fixedDivCoords{
  position:fixed;
  top:50%;
  left:50%;
  transform: translate(-50%, -50%);  
  width: 100%;
  height: 100%;
}
.fixedDiv{
  position:fixed;
  top:50%;
  left:50%;
  transform: translate(-50%, -50%);  
  width: 90%;
  height: 90%;
}
.fixedDiv1{
  position:fixed;
  top:50%;
  left:50%;
  transform: translate(-50%, -50%);  
  width: 80%;
  height: 80%;
}
.hScroll{ height:60%;  }
@media screen and (max-width: 768px) {
	.fixedDiv{  	width: 98%;  	height: 98%;	}
	.fixedDiv1{  	width: 95%;  	height: 95%;	}
	.hScroll{ height:40%;  }
}
	.v-enter-from{ width: 0%; opacity:0;  }
	.v-enter-to{ width: 100%; opacity:1; }
	.v-enter-active{  transition: all 0.3s linear;  }

	.v-leave-from{ width: 100%; opacity:1; }
	.v-leave-to{ width: 0%; opacity:0; }
	.v-leave-active{  transition: all 0.3s linear;  }

	.air-enter-from{ top: 110%; opacity:0;  }
	.air-enter-to{ top: 50%; opacity:1; }
	.air-enter-active{  transition: all 0.3s linear;  }

	.air-leave-from{ top: 50%; opacity:1; }
	.air-leave-to{ top: 110%; opacity:0; }
	.air-leave-active{  transition: all 0.5s linear;  }	

	.bgM{
		background-color: rgb(242, 242, 242, 0.5);
		box-shadow:  100px 100px 100px white inset;
		border-bottom: 1px solid #e6e6e6;
	}
	.bot{ bottom:10px;  }
	.messageAnimation{ animation: messageAnimationFrames 0.5s linear; }
	@keyframes messageAnimationFrames {
		0%{ bottom:-50px;  }
		100%{ bottom:10px;  }
	}
	.messageAnimationR{ animation: messageAnimationFramesR 0.5s linear; }
	@keyframes messageAnimationFramesR {
		0%{ bottom:10px;  }
		100%{ bottom:-50px;  }
	}
</style>

