<template><div class='flex flex-col gap-4 p-4 md:p-18'>
	<div @click='codeShow = !codeShow' class="bg-gray-800 text-white p-2 rounded-md text-center cursor-pointer">code</div>
	<div class="grid grid-cols-3 gap-4">
		<template v-for='(u,j) in users' :key='j'>
			<div @click='forUser(u.id)' class="bg-blue-100 p-2 rounded-md text-center cursor-pointer border-b-2 border-transparent hover:border-gray-400 transition-all duration-300">{{u.name}}</div>
		</template>
	</div>
	<div class='flex flex-col gap-4 p-4 md:p-8 bg-white shadow-xl'>
		<div class="flex justify-between items-center">
			<div class="bg-gray-100 p-2 border-b-2 border-gray-400 self-start rounded-md">Activities</div>
			<div @click='addToDo' class="border-b-2 border-transparent hover:border-gray-400 cursor-pointer transition-all duration-300">add</div>
		</div>
		<table>
			<tr>
				<th>Activity</th>
				<th>End Date</th>
				<th>status</th>
				<th></th>
				<th></th>
			</tr>
		<template v-for='(ls,i) in list' :key='i'>
			<tr>
				<td>{{ls.activity}}</td>
				<td>{{ls.endDate}}</td>
				<td>
					<span v-if='ls.completed'>completed</span>
					<span v-else>not completed</span>
				</td>
				<td @click='gone(ls.id)' title='delete' class='cursor-pointer hover:scale-125 transition-all duration-300'>&#9874;</td>
				<td @click='up(ls.id, ls.activity, ls.endDate, ls.completed)' title='update' class='cursor-pointer hover:scale-125 transition-all duration-300'>&#10001;</td>				
			</tr>	
	</template>
		</table>
	</div>
	<Teleport to='#air'>
	<Transition>
	<div v-if='upShow' @click.self='forUpShow' class="fixedDiv">		
		<div class="centerIt centerItAnimation bg-white shadow-xl p-8 rounded-md flex flex-col gap-4 p-4">
			<div @click='forUpShowInner' class="absolute right-2 top-1 flex justify-center items-center w-6 h-6 hover:bg-gray-200 transition-all duration-300 rounded-full cursor-pointer">&#9874;</div>
			<div v-if='forNewID' class="grid grid-cols-12">
				<label class='col-span-5'>Id</label>
				<input class='col-span-7 outline-none ring ring-gray-100 hover:ring-gray-200 focus:ring-gray-300 transition-all duration-300 rounded-md' type="number" v-model='id'>
			</div>
			<div class="grid grid-cols-12">
				<label class='col-span-5'>Activity</label>
				<input class='col-span-7 outline-none ring ring-gray-100 hover:ring-gray-200 focus:ring-gray-300 transition-all duration-300 rounded-md' type="text" v-model='activity'>
			</div>
			<div class="grid grid-cols-12">
				<label class='col-span-5'>End Date<span class="text-xs">(M D Y)</span></label>
				<input class='col-span-7 outline-none ring ring-gray-100 hover:ring-gray-200 focus:ring-gray-300 transition-all duration-300 rounded-md' type="text" v-model='endDate'>
			</div>
			<div class="grid grid-cols-12">
				<label class='col-span-5'>Completed</label>
				<input class='col-span-7 transition-all duration-300 rounded-md' type="checkbox" v-model='completed'>
			</div>
			<div @click='updateGo' class="rounded-md cursor-pointer bg-gray-100 border-b-2 border-transparent hover:border-gray-400 p-2 text-center hover:bg-gray-200">go!</div>
		</div>
	</div>
	</Transition>		
	</Teleport>

	<Teleport to='#air'>
	<Transition>
	<div v-if='codeShow' @click.self='codeShow = !codeShow' class="fixedDiv flex flex-col gap-4">		
		<div @click='codeShow = !codeShow' class="absolute right-2 top-1 flex justify-center items-center w-6 h-6 hover:bg-gray-200 transition-all duration-300 rounded-full cursor-pointer">&#9874;</div>			
		<div class="codeCenter bg-white text-xs shadow-xl p-8 rounded-md flex flex-col gap-4 p-4 overflow-scroll scrollStyle">			
			<div class="flex gap-4">
				<div class="bg-gray-100 p-1">JSON server on herokuapp.com</div>
				<a href="https://sore-pleat-hen.cyclic.app/list" target="_blank">list of activites</a>
				<a href="https://sore-pleat-hen.cyclic.app/users" target="_blank">list of users</a>
			</div>			
			<pre v-pre>
&lt;template&gt;&lt;div class='flex flex-col gap-4 p-4 md:p-18'&gt;
	&lt;div @click='codeShow = !codeShow' class="bg-gray-800 text-white p-2 rounded-md text-center cursor-pointer"&gt;code&lt;/div&gt;
	&lt;div class="grid grid-cols-3 gap-4"&gt;
		&lt;template v-for='(u,j) in users' :key='j'&gt;
			&lt;div @click='forUser(u.id)' class="bg-blue-100 p-2 rounded-md text-center cursor-pointer border-b-2 border-transparent hover:border-gray-400 transition-all duration-300"&gt;{{u.name}}&lt;/div&gt;
		&lt;/template&gt;
	&lt;/div&gt;
	&lt;div class='flex flex-col gap-4 p-4 md:p-8 bg-white shadow-xl'&gt;
		&lt;div class="flex justify-between items-center"&gt;
			&lt;div class="bg-gray-100 p-2 border-b-2 border-gray-400 self-start rounded-md"&gt;Activities&lt;/div&gt;
			&lt;div @click='addToDo' class="border-b-2 border-transparent hover:border-gray-400 cursor-pointer transition-all duration-300"&gt;add&lt;/div&gt;
		&lt;/div&gt;
		&lt;table&gt;
			&lt;tr&gt;
				&lt;th&gt;Activity&lt;/th&gt;
				&lt;th&gt;End Date&lt;/th&gt;
				&lt;th&gt;status&lt;/th&gt;
				&lt;th&gt;&lt;/th&gt;
				&lt;th&gt;&lt;/th&gt;
			&lt;/tr&gt;
		&lt;template v-for='(ls,i) in list' :key='i'&gt;
			&lt;tr&gt;
				&lt;td&gt;{{ls.activity}}&lt;/td&gt;
				&lt;td&gt;{{ls.endDate}}&lt;/td&gt;
				&lt;td&gt;
					&lt;span v-if='ls.completed'&gt;completed&lt;/span&gt;
					&lt;span v-else&gt;not completed&lt;/span&gt;
				&lt;/td&gt;
				&lt;td @click='gone(ls.id)' title='delete' class='cursor-pointer hover:scale-125 transition-all duration-300'&gt;&#9874;&lt;/td&gt;
				&lt;td @click='up(ls.id, ls.activity, ls.endDate, ls.completed)' title='update' class='cursor-pointer hover:scale-125 transition-all duration-300'&gt;&#10001;&lt;/td&gt;				
			&lt;/tr&gt;	
	&lt;/template&gt;
		&lt;/table&gt;
	&lt;/div&gt;
	&lt;Teleport to='#air'&gt;
	&lt;Transition&gt;
	&lt;div v-if='upShow' @click.self='forUpShow' class="fixedDiv"&gt;		
		&lt;div class="centerIt centerItAnimation bg-white shadow-xl p-8 rounded-md flex flex-col gap-4 p-4"&gt;
			&lt;div @click='forUpShowInner' class="absolute right-2 top-1 flex justify-center items-center w-6 h-6 hover:bg-gray-200 transition-all duration-300 rounded-full cursor-pointer"&gt;&#9874;&lt;/div&gt;
			&lt;div v-if='forNewID' class="grid grid-cols-12"&gt;
				&lt;label class='col-span-5'&gt;Id&lt;/label&gt;
				&lt;input class='col-span-7 outline-none ring ring-gray-100 hover:ring-gray-200 focus:ring-gray-300 transition-all duration-300 rounded-md' type="number" v-model='id'&gt;
			&lt;/div&gt;
			&lt;div class="grid grid-cols-12"&gt;
				&lt;label class='col-span-5'&gt;Activity&lt;/label&gt;
				&lt;input class='col-span-7 outline-none ring ring-gray-100 hover:ring-gray-200 focus:ring-gray-300 transition-all duration-300 rounded-md' type="text" v-model='activity'&gt;
			&lt;/div&gt;
			&lt;div class="grid grid-cols-12"&gt;
				&lt;label class='col-span-5'&gt;End Date&lt;span class="text-xs"&gt;(M D Y)&lt;/span&gt;&lt;/label&gt;
				&lt;input class='col-span-7 outline-none ring ring-gray-100 hover:ring-gray-200 focus:ring-gray-300 transition-all duration-300 rounded-md' type="text" v-model='endDate'&gt;
			&lt;/div&gt;
			&lt;div class="grid grid-cols-12"&gt;
				&lt;label class='col-span-5'&gt;Completed&lt;/label&gt;
				&lt;input class='col-span-7 transition-all duration-300 rounded-md' type="checkbox" v-model='completed'&gt;
			&lt;/div&gt;
			&lt;div @click='updateGo' class="rounded-md cursor-pointer bg-gray-100 border-b-2 border-transparent hover:border-gray-400 p-2 text-center hover:bg-gray-200"&gt;go!&lt;/div&gt;
		&lt;/div&gt;
	&lt;/div&gt;
	&lt;/Transition&gt;		
	&lt;/Teleport&gt;

	&lt;Teleport to='#air'&gt;
	&lt;Transition&gt;
	&lt;div v-if='codeShow' @click.self='codeShow = !codeShow' class="fixedDiv flex flex-col gap-4"&gt;		
		&lt;div @click='codeShow = !codeShow' class="absolute right-2 top-1 flex justify-center items-center w-6 h-6 hover:bg-gray-200 transition-all duration-300 rounded-full cursor-pointer"&gt;&#9874;&lt;/div&gt;			
		&lt;div class="codeCenter bg-white shadow-xl p-8 rounded-md flex flex-col gap-4 p-4 overflow-y-scroll scrollStyle"&gt;			
			...
		&lt;/div&gt;
	&lt;/div&gt;
	&lt;/Transition&gt;		
	&lt;/Teleport&gt;	
&lt;/div&gt;&lt;/template&gt;

&lt;script setup&gt;
	import { ref } from 'vue'
	import axios from 'axios'

	const userID = ref(0)
	const list = ref([])	
	const users = ref([])
	const upShow = ref(false)
	const codeShow = ref(false)
	const activity = ref('')
	const endDate = ref('')
	const completed = ref(false)
	const id = ref(0)

	axios({
		baseURL: 'https://sore-pleat-hen.cyclic.app/users',
		method: 'get',		
	})
	.then((res) =&gt; {
		users.value = res.data
	})
	.catch((err) =&gt; console.log(err))
	.finally(() =&gt; {	})	

	const forUser =  async (x)=&gt; {
		userID.value = x
		await axios.get('https://sore-pleat-hen.cyclic.app/list', { params:{ userID:userID.value } })
		.then((res) =&gt; {
			list.value = res.data
		})
		.catch((err) =&gt; console.log(err))
		.finally(() =&gt; {	})	
	}	

const gone = async (x) =&gt; {
	await axios.delete(`https://sore-pleat-hen.cyclic.app/list/${x}`)
	.then(() =&gt; {
	    axios.get(`https://sore-pleat-hen.cyclic.app/list`, { params:{ userID:userID.value } })
		.then((res) =&gt; { list.value = res.data })
	})
}
const forThisId = ref(0)
const forNewID = ref(false)
const up = (x, a, b, c) =&gt; {
	forNewID.value = false	
	upShow.value = true
	forThisId.value = x
	activity.value = a
	endDate.value = b
	completed.value = c
}
const forUpShow = (e) =&gt; {
	upShow.value = !upShow.value
	if(e.target.children[0].classList.contains('centerItAnimationOut'))
		e.target.children[0].classList.add('centerItAnimation')	
	else
		e.target.children[0].classList.add('centerItAnimationOut')	
}
const forUpShowInner = (e) =&gt; {
	upShow.value = !upShow.value
	if(e.target.parentElement.classList.contains('centerItAnimationOut'))
		e.target.parentElement.classList.add('centerItAnimation')	
	else
		e.target.parentElement.classList.add('centerItAnimationOut')	
}
const updateGo = async () =&gt; {
	if(!forNewID.value){
	await axios.put(`https://sore-pleat-hen.cyclic.app/list/${forThisId.value}`, {
		userID: userID.value,
		activity: activity.value,
		endDate: endDate.value,
		completed: completed.value
		})
		.then((res) =&gt; {
			axios.get(`https://sore-pleat-hen.cyclic.app/list`, { params:{ userID:userID.value } })
			.then((res) =&gt; { list.value = res.data })
		})
		.finally(() =&gt; { 
			upShow.value = !upShow.value 
			forNewID.value = false
		})			
	}	
	if(forNewID.value){
	await axios.post(`https://sore-pleat-hen.cyclic.app/list`, {
		id: id.value,
		userID: userID.value,
		activity: activity.value,
		endDate: endDate.value,
		completed: completed.value
		})
		.then((res) =&gt; {
			axios.get(`https://sore-pleat-hen.cyclic.app/list`, { params:{ userID:userID.value } })
			.then((res) =&gt; { list.value = res.data })
		})
		.finally(() =&gt; { 
			upShow.value = !upShow.value 
			forNewID.value = false
		})			
	}		
}

const addToDo = async () =&gt; {
	forNewID.value = true
	upShow.value = !upShow.value
	
}
&lt;/script&gt;

&lt;style scoped&gt;
	th{		text-align: start;	}
	.fixedDiv{
		position: fixed;
		top: 0%;
		background-color: rgb(242, 242, 242, 0.5);
		width: 100%;
		height: 100%;
		z-index: 1;
	}
	.centerIt{
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);				
	}
	.codeCenter{
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);				
		width: 90%;
		height: 90%;
	}	
	.centerItAnimation{ animation: centerItAnimationFrames 0.5s linear forwards;  }
	@keyframes centerItAnimationFrames{
		0%{ top:0% }
		100%{ top:50% }
	}
	.centerItAnimationOut{ animation: centerItAnimationOutFrames 0.5s linear forwards;  }
	@keyframes centerItAnimationOutFrames{
		0%{ top:50% }
		100%{ top:0% }
	}
	.v-enter-from{ opacity:0;  }
	.v-enter-active{ transition:all 0.5s linear;  }
	.v-leave-from{ opacity:1;  }
	.v-leave-active{ transition:all 0.5s linear;  }
&lt;/style&gt;
				
			</pre>
		</div>
	</div>
	</Transition>		
	</Teleport>	
</div></template>

<script setup>
	import { ref } from 'vue'
	import axios from 'axios'

	const userID = ref(0)
	const list = ref([])	
	const users = ref([])
	const upShow = ref(false)
	const codeShow = ref(false)
	const activity = ref('')
	const endDate = ref('')
	const completed = ref(false)
	const id = ref(0)

	axios({
		baseURL: 'https://sore-pleat-hen.cyclic.app/users',
		method: 'get',		
	})
	.then((res) => {
		users.value = res.data
	})
	.catch((err) => console.log(err))
	.finally(() => {	})	

	const forUser =  async (x)=> {
		userID.value = x
		await axios.get('https://sore-pleat-hen.cyclic.app/list', { params:{ userID:userID.value } })
		.then((res) => {
			list.value = res.data
		})
		.catch((err) => console.log(err))
		.finally(() => {	})	
	}	

const gone = async (x) => {
	await axios.delete(`https://sore-pleat-hen.cyclic.app/list/${x}`)
	.then(() => {
	    axios.get(`https://sore-pleat-hen.cyclic.app/list`, { params:{ userID:userID.value } })
		.then((res) => { list.value = res.data })
	})
}
const forThisId = ref(0)
const forNewID = ref(false)
const up = (x, a, b, c) => {
	forNewID.value = false	
	upShow.value = true
	forThisId.value = x
	activity.value = a
	endDate.value = b
	completed.value = c
}
const forUpShow = (e) => {
	upShow.value = !upShow.value
	if(e.target.children[0].classList.contains('centerItAnimationOut'))
		e.target.children[0].classList.add('centerItAnimation')	
	else
		e.target.children[0].classList.add('centerItAnimationOut')	
}
const forUpShowInner = (e) => {
	upShow.value = !upShow.value
	if(e.target.parentElement.classList.contains('centerItAnimationOut'))
		e.target.parentElement.classList.add('centerItAnimation')	
	else
		e.target.parentElement.classList.add('centerItAnimationOut')	
}
const updateGo = async () => {
	if(!forNewID.value){
	await axios.put(`https://sore-pleat-hen.cyclic.app/list/${forThisId.value}`, {
		userID: userID.value,
		activity: activity.value,
		endDate: endDate.value,
		completed: completed.value
		})
		.then((res) => {
			axios.get(`https://sore-pleat-hen.cyclic.app/list`, { params:{ userID:userID.value } })
			.then((res) => { list.value = res.data })
		})
		.finally(() => { 
			upShow.value = !upShow.value 
			forNewID.value = false
		})			
	}	
	if(forNewID.value){
	await axios.post(`https://sore-pleat-hen.cyclic.app/list`, {
		id: id.value,
		userID: userID.value,
		activity: activity.value,
		endDate: endDate.value,
		completed: completed.value
		})
		.then((res) => {
			axios.get(`https://sore-pleat-hen.cyclic.app/list`, { params:{ userID:userID.value } })
			.then((res) => { list.value = res.data })
		})
		.finally(() => { 
			upShow.value = !upShow.value 
			forNewID.value = false
		})			
	}		
}

const addToDo = async () => {
	forNewID.value = true
	upShow.value = !upShow.value
	
}
</script>

<style scoped>
	th{		text-align: start;	}
	.fixedDiv{
		position: fixed;
		top: 0%;
		background-color: rgb(242, 242, 242, 0.5);
		width: 100%;
		height: 100%;
		z-index: 1;
	}
	.centerIt{
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);				
	}
	.codeCenter{
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);				
		width: 90%;
		height: 90%;
	}	
	.centerItAnimation{ animation: centerItAnimationFrames 0.5s linear forwards;  }
	@keyframes centerItAnimationFrames{
		0%{ top:0% }
		100%{ top:50% }
	}
	.centerItAnimationOut{ animation: centerItAnimationOutFrames 0.5s linear forwards;  }
	@keyframes centerItAnimationOutFrames{
		0%{ top:50% }
		100%{ top:0% }
	}
	.v-enter-from{ opacity:0;  }
	.v-enter-active{ transition:all 0.5s linear;  }
	.v-leave-from{ opacity:1;  }
	.v-leave-active{ transition:all 0.5s linear;  }
</style>