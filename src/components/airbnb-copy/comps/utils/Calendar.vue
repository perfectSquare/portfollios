<template><div class="relative w-full">		
	<table class="w-full bg-white">
		<caption class='p-2 relative bg-gradient-to-b text-xs sm:text-sm from-gray-50 via-gray-100 to-gray-50 rounded-md border-b border-gray-400'>
			{{month}} {{year}}			
		</caption>
		<tr>
			<th>Su</th> 
			<th>Mo</th> 
			<th>Tu</th> 
			<th>We</th> 
			<th>Th</th> 
			<th>Fr</th> 
			<th>Sa</th>
		</tr>
		<tr>
			<template v-for='(dt,i) in tds1' :key='i'>
				<td  				
				:class='[
				{"bg-gray-100" : new Date(`${month} ${dt} ${year}`) >= inDay && new Date(`${month} ${dt} ${year}`) <= outDay},
				{"bg-gray-100" : new Date(`${month} ${dt} ${year}`) > new Date(marker1) && new Date(`${month} ${dt} ${year}`) < new Date(marker2) && defaultIn},
				{"line-through" : new Date(`${month} ${dt} ${year}`) < inDay && inDateMarker},								
				{"line-through forCheckIn" : new Date(`${month} ${dt} ${year}`) < new Date(marker1)},								
				{"hover:bg-gray-700 hover:text-white" : new Date(`${month} ${dt} ${year}`) > inDay},								
				{"bg-gray-700 text-white": new Date(`${month} ${dt} ${year}`).getDate() == new Date(marker1).getDate() && new Date(`${month} ${dt} ${year}`).getMonth() == new Date(marker1).getMonth() && defaultIn},
				{"bg-gray-700 text-white": new Date(`${month} ${dt} ${year}`).getDate() == new Date(marker2).getDate() && new Date(`${month} ${dt} ${year}`).getMonth() == new Date(marker2).getMonth() && defaultIn},
				{"bg-gray-700 text-white": new Date(`${month} ${dt} ${year}`).getDate() == new Date(inDay).getDate() && new Date(`${month} ${dt} ${year}`).getMonth() == new Date(inDay).getMonth()},
				{"bg-gray-700 text-white": new Date(`${month} ${dt} ${year}`).getDate() == new Date(outDay).getDate() && new Date(`${month} ${dt} ${year}`).getMonth() == new Date(outDay).getMonth()},
				]'
				class='relative cursor-pointer'
				@click='checksClicked($event, dt)'
				>							
					<span v-if='dt != 0'>{{dt}}</span>
					<span v-if='new Date(`${month} ${dt} ${year}`).getMonth() == new Date(inDay).getMonth() && new Date(`${month} ${dt} ${year}`).getDate() == new Date(inDay).getDate()' :class='checkedClass'>in</span>
					<span v-if='new Date(`${month} ${dt} ${year}`).getDate() == new Date(marker1).getDate() && new Date(`${month} ${dt} ${year}`).getMonth() == new Date(marker1).getMonth() && defaultIn' :class='checkedClass'>in</span>
					<span v-if='new Date(`${month} ${dt} ${year}`).getMonth() == new Date(outDay).getMonth() && new Date(`${month} ${dt} ${year}`).getDate() == new Date(outDay).getDate()' :class='checkedClass'>out</span>
					<span v-if='new Date(`${month} ${dt} ${year}`).getDate() == new Date(marker2).getDate() && new Date(`${month} ${dt} ${year}`).getMonth() == new Date(marker2).getMonth() && defaultIn' :class='checkedClass'>out</span>
				
				</td>
			</template>
		</tr>
		<tr>
			<template v-for='(dt,i) in tds2' :key='i'>
				<td  				
				:class='[
				{"bg-gray-100" : new Date(`${month} ${dt} ${year}`) >= inDay && new Date(`${month} ${dt} ${year}`) <= outDay},
				{"bg-gray-100" : new Date(`${month} ${dt} ${year}`) > new Date(marker1) && new Date(`${month} ${dt} ${year}`) < new Date(marker2) && defaultIn},			

				{"line-through" : new Date(`${month} ${dt} ${year}`) < inDay && inDateMarker},								
				{"line-through forCheckIn" : new Date(`${month} ${dt} ${year}`) < new Date(marker1)},								
				{"hover:bg-gray-700 hover:text-white" : new Date(`${month} ${dt} ${year}`) > inDay},								
				{"bg-gray-700 text-white": new Date(`${month} ${dt} ${year}`).getDate() == new Date(marker1).getDate() && new Date(`${month} ${dt} ${year}`).getMonth() == new Date(marker1).getMonth() && defaultIn},
				{"bg-gray-700 text-white": new Date(`${month} ${dt} ${year}`).getDate() == new Date(marker2).getDate() && new Date(`${month} ${dt} ${year}`).getMonth() == new Date(marker2).getMonth() && defaultIn},
				{"bg-gray-700 text-white": new Date(`${month} ${dt} ${year}`).getDate() == new Date(inDay).getDate() && new Date(`${month} ${dt} ${year}`).getMonth() == new Date(inDay).getMonth()},
				{"bg-gray-700 text-white": new Date(`${month} ${dt} ${year}`).getDate() == new Date(outDay).getDate() && new Date(`${month} ${dt} ${year}`).getMonth() == new Date(outDay).getMonth()},
				]'
				class='relative cursor-pointer'
				@click='checksClicked($event, dt)'
				>
					<span v-if='dt != 0'>{{dt}}</span>
					<span v-if='new Date(`${month} ${dt} ${year}`).getMonth() == new Date(inDay).getMonth() && new Date(`${month} ${dt} ${year}`).getDate() == new Date(inDay).getDate()' :class='checkedClass'>in</span>
					<span v-if='new Date(`${month} ${dt} ${year}`).getDate() == new Date(marker1).getDate() && new Date(`${month} ${dt} ${year}`).getMonth() == new Date(marker1).getMonth() && defaultIn' :class='checkedClass'>in</span>
					<span v-if='new Date(`${month} ${dt} ${year}`).getMonth() == new Date(outDay).getMonth() && new Date(`${month} ${dt} ${year}`).getDate() == new Date(outDay).getDate()' :class='checkedClass'>out</span>
					<span v-if='new Date(`${month} ${dt} ${year}`).getDate() == new Date(marker2).getDate() && new Date(`${month} ${dt} ${year}`).getMonth() == new Date(marker2).getMonth() && defaultIn' :class='checkedClass'>out</span>
				</td>
			</template>
		</tr>
		<tr>
			<template v-for='(dt,i) in tds3' :key='i'>
				<td  				
				:class='[
				{"bg-gray-100" : new Date(`${month} ${dt} ${year}`) >= inDay && new Date(`${month} ${dt} ${year}`) <= outDay},
				{"bg-gray-100" : new Date(`${month} ${dt} ${year}`) > new Date(marker1) && new Date(`${month} ${dt} ${year}`) < new Date(marker2) && defaultIn},			

				{"line-through" : new Date(`${month} ${dt} ${year}`) < inDay && inDateMarker},								
				{"line-through forCheckIn" : new Date(`${month} ${dt} ${year}`) < new Date(marker1)},								
				{"hover:bg-gray-700 hover:text-white" : new Date(`${month} ${dt} ${year}`) > inDay},								
				{"bg-gray-700 text-white": new Date(`${month} ${dt} ${year}`).getDate() == new Date(marker1).getDate() && new Date(`${month} ${dt} ${year}`).getMonth() == new Date(marker1).getMonth() && defaultIn},
				{"bg-gray-700 text-white": new Date(`${month} ${dt} ${year}`).getDate() == new Date(marker2).getDate() && new Date(`${month} ${dt} ${year}`).getMonth() == new Date(marker2).getMonth() && defaultIn},
				{"bg-gray-700 text-white": new Date(`${month} ${dt} ${year}`).getDate() == new Date(inDay).getDate() && new Date(`${month} ${dt} ${year}`).getMonth() == new Date(inDay).getMonth()},
				{"bg-gray-700 text-white": new Date(`${month} ${dt} ${year}`).getDate() == new Date(outDay).getDate() && new Date(`${month} ${dt} ${year}`).getMonth() == new Date(outDay).getMonth()},
				]'
				class='relative cursor-pointer'
				@click='checksClicked($event, dt)'
				>
					<span v-if='dt != 0'>{{dt}}</span>
					<span v-if='new Date(`${month} ${dt} ${year}`).getMonth() == new Date(inDay).getMonth() && new Date(`${month} ${dt} ${year}`).getDate() == new Date(inDay).getDate()' :class='checkedClass'>in</span>
					<span v-if='new Date(`${month} ${dt} ${year}`).getDate() == new Date(marker1).getDate() && new Date(`${month} ${dt} ${year}`).getMonth() == new Date(marker1).getMonth() && defaultIn' :class='checkedClass'>in</span>
					<span v-if='new Date(`${month} ${dt} ${year}`).getMonth() == new Date(outDay).getMonth() && new Date(`${month} ${dt} ${year}`).getDate() == new Date(outDay).getDate()' :class='checkedClass'>out</span>
					<span v-if='new Date(`${month} ${dt} ${year}`).getDate() == new Date(marker2).getDate() && new Date(`${month} ${dt} ${year}`).getMonth() == new Date(marker2).getMonth() && defaultIn' :class='checkedClass'>out</span>
				</td>
			</template>
		</tr>
		<tr>
			<template v-for='(dt,i) in tds4' :key='i'>
				<td  				
				:class='[
				{"bg-gray-100" : new Date(`${month} ${dt} ${year}`) >= inDay && new Date(`${month} ${dt} ${year}`) <= outDay},
				{"bg-gray-100" : new Date(`${month} ${dt} ${year}`) > new Date(marker1) && new Date(`${month} ${dt} ${year}`) < new Date(marker2) && defaultIn},			

				{"line-through" : new Date(`${month} ${dt} ${year}`) < inDay && inDateMarker},								
				{"line-through forCheckIn" : new Date(`${month} ${dt} ${year}`) < new Date(marker1)},								
				{"hover:bg-gray-700 hover:text-white" : new Date(`${month} ${dt} ${year}`) > inDay},								
				{"bg-gray-700 text-white": new Date(`${month} ${dt} ${year}`).getDate() == new Date(marker1).getDate() && new Date(`${month} ${dt} ${year}`).getMonth() == new Date(marker1).getMonth() && defaultIn},
				{"bg-gray-700 text-white": new Date(`${month} ${dt} ${year}`).getDate() == new Date(marker2).getDate() && new Date(`${month} ${dt} ${year}`).getMonth() == new Date(marker2).getMonth() && defaultIn},
				{"bg-gray-700 text-white": new Date(`${month} ${dt} ${year}`).getDate() == new Date(inDay).getDate() && new Date(`${month} ${dt} ${year}`).getMonth() == new Date(inDay).getMonth()},
				{"bg-gray-700 text-white": new Date(`${month} ${dt} ${year}`).getDate() == new Date(outDay).getDate() && new Date(`${month} ${dt} ${year}`).getMonth() == new Date(outDay).getMonth()},
				]'
				class='relative cursor-pointer'
				@click='checksClicked($event, dt)'
				>
					<span v-if='dt != 0'>{{dt}}</span>
					<span v-if='new Date(`${month} ${dt} ${year}`).getMonth() == new Date(inDay).getMonth() && new Date(`${month} ${dt} ${year}`).getDate() == new Date(inDay).getDate()' :class='checkedClass'>in</span>
					<span v-if='new Date(`${month} ${dt} ${year}`).getDate() == new Date(marker1).getDate() && new Date(`${month} ${dt} ${year}`).getMonth() == new Date(marker1).getMonth() && defaultIn' :class='checkedClass'>in</span>
					<span v-if='new Date(`${month} ${dt} ${year}`).getMonth() == new Date(outDay).getMonth() && new Date(`${month} ${dt} ${year}`).getDate() == new Date(outDay).getDate()' :class='checkedClass'>out</span>
					<span v-if='new Date(`${month} ${dt} ${year}`).getDate() == new Date(marker2).getDate() && new Date(`${month} ${dt} ${year}`).getMonth() == new Date(marker2).getMonth() && defaultIn' :class='checkedClass'>out</span>
				</td>
			</template>
		</tr>
		<tr>
			<template v-for='(dt,i) in tds5' :key='i'>
				<td  				
				:class='[
				{"bg-gray-100" : new Date(`${month} ${dt} ${year}`) >= inDay && new Date(`${month} ${dt} ${year}`) <= outDay},
				{"bg-gray-100" : new Date(`${month} ${dt} ${year}`) > new Date(marker1) && new Date(`${month} ${dt} ${year}`) < new Date(marker2) && defaultIn},			

				{"line-through" : new Date(`${month} ${dt} ${year}`) < inDay && inDateMarker},								
				{"line-through forCheckIn" : new Date(`${month} ${dt} ${year}`) < new Date(marker1)},								
				{"hover:bg-gray-700 hover:text-white" : new Date(`${month} ${dt} ${year}`) > inDay},								
				{"bg-gray-700 text-white": new Date(`${month} ${dt} ${year}`).getDate() == new Date(marker1).getDate() && new Date(`${month} ${dt} ${year}`).getMonth() == new Date(marker1).getMonth() && defaultIn},
				{"bg-gray-700 text-white": new Date(`${month} ${dt} ${year}`).getDate() == new Date(marker2).getDate() && new Date(`${month} ${dt} ${year}`).getMonth() == new Date(marker2).getMonth() && defaultIn},
				{"bg-gray-700 text-white": new Date(`${month} ${dt} ${year}`).getDate() == new Date(inDay).getDate() && new Date(`${month} ${dt} ${year}`).getMonth() == new Date(inDay).getMonth()},
				{"bg-gray-700 text-white": new Date(`${month} ${dt} ${year}`).getDate() == new Date(outDay).getDate() && new Date(`${month} ${dt} ${year}`).getMonth() == new Date(outDay).getMonth()},
				]'
				class='relative cursor-pointer'
				@click='checksClicked($event, dt)'
				>
					<span v-if='dt != 0'>{{dt}}</span>
					<span v-if='new Date(`${month} ${dt} ${year}`).getMonth() == new Date(inDay).getMonth() && new Date(`${month} ${dt} ${year}`).getDate() == new Date(inDay).getDate()' :class='checkedClass'>in</span>
					<span v-if='new Date(`${month} ${dt} ${year}`).getDate() == new Date(marker1).getDate() && new Date(`${month} ${dt} ${year}`).getMonth() == new Date(marker1).getMonth() && defaultIn' :class='checkedClass'>in</span>
					<span v-if='new Date(`${month} ${dt} ${year}`).getMonth() == new Date(outDay).getMonth() && new Date(`${month} ${dt} ${year}`).getDate() == new Date(outDay).getDate()' :class='checkedClass'>out</span>
					<span v-if='new Date(`${month} ${dt} ${year}`).getDate() == new Date(marker2).getDate() && new Date(`${month} ${dt} ${year}`).getMonth() == new Date(marker2).getMonth() && defaultIn' :class='checkedClass'>out</span>
				</td>
			</template>
		</tr>
		<tr>
			<template v-for='(dt,i) in tds6' :key='i'>
				<td  				
				:class='[
				{"bg-gray-100" : new Date(`${month} ${dt} ${year}`) >= inDay && new Date(`${month} ${dt} ${year}`) <= outDay},
				{"bg-gray-100" : new Date(`${month} ${dt} ${year}`) > new Date(marker1) && new Date(`${month} ${dt} ${year}`) < new Date(marker2) && defaultIn},			

				{"line-through" : new Date(`${month} ${dt} ${year}`) < inDay && inDateMarker},								
				{"line-through forCheckIn" : new Date(`${month} ${dt} ${year}`) < new Date(marker1)},								
				{"hover:bg-gray-700 hover:text-white" : new Date(`${month} ${dt} ${year}`) > inDay},								
				{"bg-gray-700 text-white": new Date(`${month} ${dt} ${year}`).getDate() == new Date(marker1).getDate() && new Date(`${month} ${dt} ${year}`).getMonth() == new Date(marker1).getMonth() && defaultIn},
				{"bg-gray-700 text-white": new Date(`${month} ${dt} ${year}`).getDate() == new Date(marker2).getDate() && new Date(`${month} ${dt} ${year}`).getMonth() == new Date(marker2).getMonth() && defaultIn},
				{"bg-gray-700 text-white": new Date(`${month} ${dt} ${year}`).getDate() == new Date(inDay).getDate() && new Date(`${month} ${dt} ${year}`).getMonth() == new Date(inDay).getMonth()},
				{"bg-gray-700 text-white": new Date(`${month} ${dt} ${year}`).getDate() == new Date(outDay).getDate() && new Date(`${month} ${dt} ${year}`).getMonth() == new Date(outDay).getMonth()},
				]'
				class='relative cursor-pointer'
				@click='checksClicked($event, dt)'
				>
					<span v-if='dt != 0'>{{dt}}</span>
					<span v-if='new Date(`${month} ${dt} ${year}`).getMonth() == new Date(inDay).getMonth() && new Date(`${month} ${dt} ${year}`).getDate() == new Date(inDay).getDate()' :class='checkedClass'>in</span>
					<span v-if='new Date(`${month} ${dt} ${year}`).getDate() == new Date(marker1).getDate() && new Date(`${month} ${dt} ${year}`).getMonth() == new Date(marker1).getMonth() && defaultIn' :class='checkedClass'>in</span>
					<span v-if='new Date(`${month} ${dt} ${year}`).getMonth() == new Date(outDay).getMonth() && new Date(`${month} ${dt} ${year}`).getDate() == new Date(outDay).getDate()' :class='checkedClass'>out</span>
					<span v-if='new Date(`${month} ${dt} ${year}`).getDate() == new Date(marker2).getDate() && new Date(`${month} ${dt} ${year}`).getMonth() == new Date(marker2).getMonth() && defaultIn' :class='checkedClass'>out</span>
				</td>
			</template>
		</tr>				
	</table>	
</div></template>

<script setup>
	import { ref, computed, inject } from 'vue'	

	const emit = defineEmits(['checkInSet', 'checkOutSet'])
	const props = defineProps({
		marker1:String,
		marker2:String,
		month: String,
		year: String,
		monNumber:Number,
		checkIn:String,
		checkOut:String,
		inDate:String,
		outDate:String,
		wasChekedIn:Boolean,
		inDateMarker:Boolean,
		defaultIn:Boolean,
	})	
	const inDay = inject('in')
	const outDay = inject('out')
	const checkedClass = ref('txCheck bg-l1 rounded-md border-b-2 border-gray-400')
	const daysEnum = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']	
	
	const calendarFor = computed(() => {	return new Date(`${props.month} 01 ${props.year}`)	}) 
	const days = computed(() => {		return new Date(props.year, props.monNumber+1, 0).getDate();	}) 
	const startDay = computed(() => {	return daysEnum[new Date(`${props.month} 01 ${props.year}`).getDay()]	}) 

	const tds1 = computed(() => {
		if(startDay.value == 'Su') return [1,2,3,4,5,6,7]
		if(startDay.value == 'Mo') return [0,1,2,3,4,5,6]
		if(startDay.value == 'Tu') return [0,0,1,2,3,4,5]
		if(startDay.value == 'We') return [0,0,0,1,2,3,4]
		if(startDay.value == 'Th') return [0,0,0,0,1,2,3]
		if(startDay.value == 'Fr') return [0,0,0,0,0,1,2]
		if(startDay.value == 'Sa') return [0,0,0,0,0,0,1]
	})
	const tds2 = computed(() => {
		if(startDay.value == 'Su') return [8,9,10,11,12,13,14]
		if(startDay.value == 'Mo') return [7,8,9,10,11,12,13]
		if(startDay.value == 'Tu') return [6,7,8,9,10,11,12]
		if(startDay.value == 'We') return [5,6,7,8,9,10,11]
		if(startDay.value == 'Th') return [4,5,6,7,8,9,10]
		if(startDay.value == 'Fr') return [3,4,5,6,7,8,9]
		if(startDay.value == 'Sa') return [2,3,4,5,6,7,8]
	})
	const tds3 = computed(() => {
		if(startDay.value == 'Su') return [15,16,17,18,19,20,21]
		if(startDay.value == 'Mo') return [14,15,16,17,18,19,20]
		if(startDay.value == 'Tu') return [13,14,15,16,17,18,19]
		if(startDay.value == 'We') return [12,13,14,15,16,17,18]
		if(startDay.value == 'Th') return [11,12,13,14,15,16,17]
		if(startDay.value == 'Fr') return [10,11,12,13,14,15,16]
		if(startDay.value == 'Sa') return [9,10,11,12,13,14,15]
	})
	const tds4 = computed(() => {
		if(startDay.value == 'Su') return [22,23,24,25,26,27,28]
		if(startDay.value == 'Mo') return [21,22,23,24,25,26,27]
		if(startDay.value == 'Tu') return [20,21,22,23,24,25,26]
		if(startDay.value == 'We') return [19,20,21,22,23,24,25]
		if(startDay.value == 'Th') return [18,19,20,21,22,23,24]
		if(startDay.value == 'Fr') return [17,18,19,20,21,22,23]
		if(startDay.value == 'Sa') return [16,17,18,19,20,21,22]
	})
	const tds5 = computed(() => {
		if(days.value == 31){
			if(startDay.value == 'Su') return [29,30,31,0,0,0,0]
			if(startDay.value == 'Mo') return [28,29,30,31,0,0,0]
			if(startDay.value == 'Tu') return [27,28,29,30,31,0,0]
			if(startDay.value == 'We') return [26,27,28,29,30,31,0]
			if(startDay.value == 'Th') return [25,26,27,28,29,30,31]
			if(startDay.value == 'Fr') return [24,25,26,27,28,29,30]
			if(startDay.value == 'Sa') return [23,24,25,26,27,28,29]
		}
		else if(days.value == 30){
			if(startDay.value == 'Su') return [29,30,0,0,0,0,0]
			if(startDay.value == 'Mo') return [28,29,30,0,0,0,0]
			if(startDay.value == 'Tu') return [27,28,29,30,0,0,0]
			if(startDay.value == 'We') return [26,27,28,29,30,0,0]
			if(startDay.value == 'Th') return [25,26,27,28,29,30,0]
			if(startDay.value == 'Fr') return [24,25,26,27,28,29,30]
			if(startDay.value == 'Sa') return [23,24,25,26,27,28,29]		
		}
		else if(days.value == 28){
			if(startDay.value == 'Su') return [0,0,0,0,0,0,0]
			if(startDay.value == 'Mo') return [28,0,0,0,0,0,0]
			if(startDay.value == 'Tu') return [27,28,0,0,0,0,0]
			if(startDay.value == 'We') return [26,27,28,0,0,0,0]
			if(startDay.value == 'Th') return [25,26,27,28,0,0,0]
			if(startDay.value == 'Fr') return [24,25,26,27,28,0,0]
			if(startDay.value == 'Sa') return [23,24,25,26,27,28,0]
		}		
	})
	const tds6 = computed(() => {
		if(days.value == 31){
			if(startDay.value == 'Su') return [0,0,0,0,0,0,0]
			if(startDay.value == 'Mo') return [0,0,0,0,0,0,0]
			if(startDay.value == 'Tu') return [0,0,0,0,0,0,0]
			if(startDay.value == 'We') return [0,0,0,0,0,0,0]
			if(startDay.value == 'Th') return [0,0,0,0,0,0,0]
			if(startDay.value == 'Fr') return [31,0,0,0,0,0,0]
			if(startDay.value == 'Sa') return [30,31,0,0,0,0,0]
		}
		else if(days.value == 30){
			if(startDay.value == 'Su') return [0,0,0,0,0,0,0]
			if(startDay.value == 'Mo') return [0,0,0,0,0,0,0]
			if(startDay.value == 'Tu') return [0,0,0,0,0,0,0]
			if(startDay.value == 'We') return [0,0,0,0,0,0,0]
			if(startDay.value == 'Th') return [0,0,0,0,0,0,0]
			if(startDay.value == 'Fr') return [0,0,0,0,0,0,0]
			if(startDay.value == 'Sa') return [30,0,0,0,0,0,0]		
		}				
	})	
	////////////////////////////////////// function

	const checksClicked = (e,x) => {
		if(x == 0) return
		if(e.target.tagName == 'TD'){
				if(e.target.classList.contains('forCheckIn')) return
			}
			else if(e.target.tagName == 'SPAN'){
				if(e.target.parentElement.classList.contains('forCheckIn')) return
			}		
		if(props.wasChekedIn){ ////////////////////////// in set			
			emit('checkInSet', new Date(`${props.month} ${x} ${props.year}`))			
		}		
		else { ////////////////////////// out set
			if(e.target.tagName == 'TD'){
				if(e.target.classList.contains('line-through')) return
			}
			else if(e.target.tagName == 'SPAN'){
				if(e.target.parentElement.classList.contains('line-through')) return
			}		
			emit('checkOutSet', new Date(`${props.month} ${x} ${props.year}`))
		}		
	}
</script>

<style scoped>
	table{				border-spacing: 5px;		height: 250px;			}
	th, td{		text-align: center;		font-size: 14px;	}
	@media screen and (max-width: 540px) {
		th, td{		text-align: center;		font-size: 12px;	}
		table{				border-spacing: 0px;		height: 200px;			}
	}
	
	.txCheck{ 
		font-size:9px;  
		text-align: center;
		position: absolute;
		height: 12px;
		width: 106%;
		color: black;
		bottom: -20%;
		left: 50%;
		transform: translateX(-50%);
		z-index: 1;
	}
</style>