<template><Teleport to='#air'>
<div 
	ref='dialogMainDivRef' 
	class='dialogMainDiv' 
	@click.self='closed'
	:class="mainDivAnimation"
>
	<div ref='dialogWorkerRef' class="dialogWorker workerAnimation flex flex-col gap-y-2 rounded">
		<div class="bg-gray-200 px-3 py-2 rounded flex justify-between">
			<div>Dialog Heading</div>
			<div @click='closed' class="flex justify-center items-center w-[24px] h-[24px] text-center text-black hover:bg-gray-300 text-sm rounded-full cursor-pointer transition-all duration-200">&#10005;</div>
		</div>		
		<div class="dialogContent px-3 py-2 flex flex-col gap-y-2">			
			<div>Dialog Content</div>
			<div class="self-end btRed">save</div>
		</div>
	</div>
</div>
</Teleport></template>

<script setup>
	import { ref, computed } from 'vue'

	const props = defineProps({
		animationType: String
	})
	const emit = defineEmits(['dialogOff'])

	const dialogWorkerRef = ref(null)
	const dialogMainDivRef = ref(null)

	const closed = () => {
		if(props.animationType == 'A'){
			dialogMainDivRef.value.classList.remove('mainAnimationA')
			dialogMainDivRef.value.classList.add('mainAnimationAOff')
		}
		else if(props.animationType == 'B'){
			dialogMainDivRef.value.classList.remove('mainAnimationB')
			dialogMainDivRef.value.classList.add('mainAnimationBOff')
		}		
		dialogWorkerRef.value.classList.remove('workerAnimation')
		dialogWorkerRef.value.classList.add('workerAnimationOff')
		setTimeout(()=>{
			emit("dialogOff")
		}, 280)
		
	}
	const mainDivAnimation = computed(() => {
		if(props.animationType == 'A') return 'mainAnimationA'
		else if(props.animationType == 'B') return 'mainAnimationB'
	})
</script>

<style scoped>
	.dialogMainDiv{
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgb(128, 128, 128, 0.5);		
	}
	.mainAnimationA{ animation: mainDivAFrames 0.3s linear; }
	@keyframes mainDivAFrames{
		0%{ opacity: 0; }
		100%{ opacity: 1; }
	}	
	.mainAnimationAOff{ animation: mainDivAnimationOffFrames 0.3s linear; }
	@keyframes mainDivAnimationOffFrames{
		0%{ opacity: 1; }
		100%{ opacity: 0; }
	}
	.mainAnimationB{ animation: mainDivBFrames 0.3s linear; }
	@keyframes mainDivBFrames{
		0%{ opacity: 0; width:0%; }
		100%{ opacity: 1; width:100%; }
	}
	.mainAnimationBOff{ animation: mainDivBOffFrames 0.3s linear; }
	@keyframes mainDivBOffFrames{
		0%{ opacity: 1; width:100%; }
		100%{ opacity: 0; width:0%; }		
	}
	.dialogWorker{
		width: 40%;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background-color: white;
		box-shadow: 2px 2px 6px gray;		
	}
	.workerAnimation{ animation: dialogWorkerFrames 0.3s linear; }
	@keyframes dialogWorkerFrames{
		0%{ width: 35%; }
		100%{ width: 40%; }
	}
	.workerAnimationOff{ animation: workerAnimationOffFrames 0.3s linear; }
	@keyframes workerAnimationOffFrames{
		0%{ width: 40%; }
		100%{ width: 35%; }
	}
	
	.btRed{
		background-color: red;
		color: white;
		padding: 2px 10px 4px 10px;
		border-radius: 5px;
		cursor: pointer;
		margin-right: 5px;
	}
	
</style>

