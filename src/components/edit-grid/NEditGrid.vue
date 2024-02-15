<template><div class='relative flex flex-col gap-y-2'>
	<div class="flex gap-x-2 items-center">
		<div class="text-xl sm:text-2xl">Edit Grid</div>
	</div>	
	<div class="flex gap-x-2 items-center">		
		<div class="flex gap-x-2">
			<button :class="{'cursor-not-allowed': addStart, 'bg-gray-200 hover:border-gray-400': !addStart}" class="px-4 sm:px-6 py-0.5 text-xs sm:text-sm border-b-2 border-transparent" @click="(!addStart) && addRow()">add</button>
			<button :class="{'cursor-not-allowed': !addStart, 'bg-gray-200 hover:border-gray-400': addStart}" class="px-4 sm:px-6 py-0.5 text-xs sm:text-sm border-b-2 border-transparent" @click="addStart && updateRow()">update</button>	
		</div>
	</div>	
	<table class='border-separate border-spacing-x-1 sm:border-spacing-x-2 border-spacing-y-0.5 border border-slate-300'>
		<tr>
		<template v-for='(col,i) in fields' :key='i'>			
			<th class="text-left border-b py-1 text-xs sm:text-base"><span v-html='col'></span></th>
		</template>
		</tr>
		
		<template v-for='(row,j) in gridDate' :key='j'>		
		<tr>
			<td class="text-left">
				<div class="text-xs sm:text-sm flex gap-x-1">
					<img src="/assets/air1.png" class='hidden' @load='loaded(row)'>
					<button class="sm:p-1 sm:bg-gray-200 text-black" @click="editRow(row, j)">&#9998;</button>
					<button class="sm:p-1 sm:bg-gray-200" @click="deleteRow(row, j)">&#9984;</button>
				</div>
			</td>
			<template v-for='(data,k) in row' :key='k'>
				<td class='text-left'>
					<input v-if='!data.done && data.type=="text"' type="text" min='0' v-model='data.model' class='outline-none py-1 text-[10px] sm:text-[12px] md:text-[14px] border-b-2 border-gray-400 w-[70%]'>
					<input v-else-if='!data.done && data.type=="number"' type="number" min='0' v-model='data.model' class='outline-none py-1 text-[10px] sm:text-[12px] md:text-[14px] border-b-2 border-gray-400 w-[40%]'>
					<select v-else-if='!data.done && data.type=="select"' v-model='data.model' class="text-xs sm:text-sm w-[60%] sm:w-[80%]">
						<template v-for='(op,l) in data.options' :key='l'>
							<option :value='op'>{{op}}</option>
						</template>
					</select>
					<div v-else-if='data.type == "total"' class='text-xs sm:text-sm'>
						{{data.model}}&nbsp;<span v-if='data.model != 0'>{{data.unitUsed}}&sup3;</span>
					</div>
					<div v-else>{{data.model}}</div>
				</td>
			</template>		
		</tr>						
		</template>					

	</table>		
	
</div></template>

<script setup>
	import { ref, computed } from 'vue'
	
	const gridDate = ref([])	
	const addStart = ref(false)
	const rowToAdd = ref(null)
	const totalVolume = ref(0)
	const fields = ref(["&#9935;", "Box", "length", "width", "height", "unit", "volume"])
	const addRow = ()=> {
		addStart.value = true
		gridDate.value.push([
			{
				field: "name",
				type: 'text',
				options:[],
				model: '',
				done: false,
			},
			{
				field: "length",
				type: 'number',
				options:[],
				model: 0,
				done: false,
			},
			{
				field: "width",
				type: 'number',
				options:[],
				model: 0,
				done: false,
			},
			{
				field: "height",
				type: 'number',
				options:[],
				model: 0,
				done: false,
			},
			{
				field: "unit",
				type: 'select',
				options:['mm', 'cm', 'm'],
				model: '',
				done: false,
			},
			{
				field: "total",
				type: 'total',
				options:[],
				model: 0,
				done: false,
				unitUsed: ''
			}			
		])
	}
	const updateRow = () => {		
		let l, w, h, u
		let marker = false
		let updateMarker = false
		
		for(let data of rowToAdd.value){
			if(data.field != 'total'){
				if(data.model == 0 || data.model == ''){
					marker = true
					return
				}
			}
		}
		if(marker) return

		gridDate.value.forEach((data)=>{
			data.forEach((d)=>{
				d.done=true
				if(d.field == 'length') l = d.model
				if(d.field == 'width') w = d.model
				if(d.field == 'height') h = d.model
				if(d.field == 'unit') u = d.model
				if(d.field == 'total'){
					d.model = l * w * h
					d.unitUsed = u	
				} 
			})			
		})
		addStart.value = false		
	}
	const editRow = (row, index) => {
		rowToAdd.value = row
		row.forEach((d)=>{d.done=false})
		addStart.value = true		
	}
	const deleteRow = (row,index) => {
		row.forEach((d)=>{d.type='del'})
		gridDate.value = gridDate.value.filter( gd=> gd[0].type != row[0].type )
		if(row == rowToAdd.value) addStart.value = false
		else addStart.value = true
	}

	const loaded = (row) => {
		rowToAdd.value = row		
	}

	
	
</script>

<style scoped></style>
