<template><div class="flex flex-col gap-2 relative">
	<div v-if='arrowMarker' class="text-xl text-gray-505 absolute top-2 z-40 arrowAnimation flex flex-col">
		<div>&#10140;</div>		
		<div v-if='nightsLimit > 0' class="text-xs absolute left-1/2 bottom-3/4">{{nightsLimit}}</div>
	</div>
	<img 
		src="/assets/airbnb/left.png" 
		class="absolute top-3 left-4 z-40 w-1.5 sm:w-2 cursor-pointer hover:scale-110 transition-all duration-300"
		@click='prev'
	>
	<img 
		src="/assets/airbnb/right.png" 
		class="absolute top-3 right-4 z-40 w-1.5 sm:w-2 cursor-pointer hover:scale-110 transition-all duration-300"
		@click='next'
	>
	
	<div class="flex justify-between gap-2 relative">
	<Calendar 
		:marker1='marker1'
		:marker2='marker2'
		:month='forMonth1' 
		:year='forYear1'
		:monNumber='forMonNumber1'
		:checkIn='checkIn1' 
		:checkOut='checkOut1'
		:inDate='inDate'
		:outDate='outDate'
		@checkInSet='noteIn'
		@checkOutSet='noteOut'
		:wasChekedIn = 'testCheckedIn'
		:inDateMarker='dateMarker'
		:defaultIn='defaultIn'
	/>
	<Calendar 
		:marker1='marker1'
		:marker2='marker2'
		:month='forMonth2' 
		:year='forYear2'
		:monNumber='forMonNumber2' 
		:checkIn='checkIn2' 
		:checkOut='checkOut2'							
		:inDate='inDate'
		:outDate='outDate'
		@checkInSet='noteIn'
		@checkOutSet='noteOut'
		:wasChekedIn = 'testCheckedIn'
		:inDateMarker='dateMarker'
		:defaultIn='defaultIn'
	/>
	</div>
<!-- {{tripDays}}	 -->
</div></template>

<script setup>	
	import Calendar from '/src/components/airbnb-copy/comps/utils/Calendar.vue'
	import { ref, computed, inject } from 'vue'	

	const emit = defineEmits(['inSet', 'outSet'])

	const props = defineProps({
		marker1:String,
		marker2:String,
		month1:String,
		month2:String,
		year1:String,
		year2:String,
		monNumber1:Number,
		monNumber2:Number,
		checkIn1:String | Number,
		checkIn2:String | Number,
		checkOut1:String | Number,
		checkOut2:String | Number,
		nightsLimit:Number,
	})

	const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

	const forMonth1 = ref('')	
	forMonth1.value = props.month1
	const forMonth2 = ref('')	
	forMonth2.value = props.month2

	const forYear1 = ref('')
	forYear1.value = props.year1
	const forYear2 = ref('')
	forYear2.value = props.year2

	const forMonNumber1 = ref(0)
	forMonNumber1.value = props.monNumber1
	const forMonNumber2 = ref(0)
	forMonNumber2.value = props.monNumber2

	const next = (e) => {		
		let mon1 = new Date(`${forMonth1.value} 01 2022`).getMonth()
		let mon2 = new Date(`${forMonth2.value} 01 2022`).getMonth()

		if(mon1 > 7 && forYear1.value == 2023){
			e.target.classList.remove('cursor-pointer', 'hover:scale-110')
			e.target.classList.add('cursor-not-allowed')
			return
		} 

		if(mon1 >= 0 && mon1 < 11){
			forMonth1.value = months[mon1 + 1]	
			forMonNumber1.value++
		} 
		if(mon1 == 11){
			forMonth1.value = months[0]
			forYear1.value++
			forMonNumber1.value = 0
		} 
		if(mon2 >= 0 && mon2 < 11){
			forMonth2.value = months[mon2 + 1]	
			forMonNumber2.value++
		} 
		if(mon2 == 11){
			forMonth2.value = months[0]
			forYear2.value++
			forMonNumber2.value = 0
		} 
	}

	const prev = (e) => {
		e.target.nextElementSibling.classList.add('cursor-pointer', 'hover:scale-110')
		e.target.nextElementSibling.classList.remove('cursor-not-allowed')
		let mon1 = new Date(`${forMonth1.value} 01 2022`).getMonth()
		let mon2 = new Date(`${forMonth2.value} 01 2022`).getMonth()		

		if(mon1 > 0 && mon1 <= 11){
			forMonth1.value = months[mon1 - 1]	
			forMonNumber1.value--
		} 
		if(mon1 == 0){
			forMonth1.value = months[11]
			forYear1.value--
			forMonNumber1.value = 11
		} 
		if(mon2 > 0 && mon2 <= 11){
			forMonth2.value = months[mon2 - 1]	
			forMonNumber2.value--
		} 
		if(mon2 == 0){
			forMonth2.value = months[11]
			forYear2.value--
			forMonNumber2.value = 11
		} 
	}

	const testCheckedIn = ref(true)
	const dateMarker = ref(false)
	
	const arrowMarker = ref(false)

	const tripDays = computed(() => {
		if(inDate.value != null && outDate.value != null)						
    		return Math.ceil((new Date(outDate.value).getTime() - new Date(inDate.value).getTime()) / (1000 * 3600 * 24));
	})

	const inDate = ref()	
	const defaultIn = inject('defIn')
	const noteIn = (x) => {
		testCheckedIn.value = false
		dateMarker.value = true
		defaultIn.value = false
		arrowMarker.value = true
		inDate.value = x		
		emit('inSet', new Date(`${props.month1} ${x} ${props.year1}`))
	}
	const outDate = ref()
	const noteOut = (x) => {
		testCheckedIn.value = true
		dateMarker.value = false
		arrowMarker.value = false
		outDate.value = x
		if(props.nightsLimit > 0){
			if(Math.ceil( (new Date(x).getTime()) - new Date(inDate.value).getTime()) / (1000 * 3600 * 24) < props.nightsLimit)		
			return
		}		
		emit('outSet', new Date(`${props.month2} ${x} ${props.year2}`), tripDays.value)
	}
	
</script>

<style scoped>
	.arrowAnimation{ animation: arrowFreames 1.3s linear infinite;  }
	@keyframes arrowFreames{
		0%{ left:42%;  }
		100%{ left:55%;  }
	}
</style>