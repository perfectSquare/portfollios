<template><div class="relative bg-gray-100 w-[40%] h-[40%] flex flex-col left-[5%]">
	<div>names</div>
	<div>about</div>
	<canvas id="can" />  
</div></template>

<script setup>
	import { ref, onMounted, computed, watch, onUpdated, nextTick } from 'vue'

	const lastend = ref(0)
	const data = ref([80,120,20,60,40,40])
	const myTotal = ref(0);
	const myColor = ref(['blue', 'red', 'green','yellow','brown', 'orange']);
	const labels = ref(['A', 'B', 'C', 'D', 'E', 'F']);

	const drawing = () => {
		const canvas = document.getElementById("can");

		let canvasLeft = canvas.offsetLeft + canvas.clientLeft
    let canvasTop = canvas.offsetTop + canvas.clientTop
    canvas.onmousemove = function(event) {
    	let x = event.pageX - canvasLeft
      let y = event.pageY - canvasTop;
      if(x > 258) console.log('E')
    }

		const ctx = canvas.getContext("2d");
		for(let e = 0; e < data.value.length; e++){
  			myTotal.value += data.value[e];
		}
		let off = 1
		let w = (canvas.width - off) / 2
		let h = (canvas.height - off) / 2

		for (var i = 0; i < data.value.length; i++) {
		  ctx.fillStyle = myColor.value[i];		  
		  ctx.strokeStyle ='white';
		  ctx.lineWidth = 2;
		  ctx.beginPath();
		  ctx.moveTo(w,h);
		  let len =  (data.value[i]/myTotal.value) * 2 * Math.PI
		  let r = h - off / 2
		  ctx.title = 'hi'
		  ctx.arc(w , h, r, lastend.value, lastend.value + len, false);
		  ctx.lineTo(w,h);
		  ctx.fill();
		  ctx.stroke();
		  ctx.fillStyle ='white';
		  // ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
// ctx.globalAlpha = 0.4;
		  ctx.font = "20px Arial";
		  ctx.textAlign = "center";
		  ctx.textBaseline = "middle";	  		  
		  let mid = lastend.value + len / 2
		  ctx.fillText(labels.value[i],w + Math.cos(mid) * (r/2) , h + Math.sin(mid) * (r/2));
		  lastend.value += Math.PI*2*(data.value[i]/myTotal.value);	
		}
	}

	const call = (e) =>{
		console.log(e.target.parentElement.parentElement)

		e.target.parentElement.parentElement.children[1].classList.remove('hidden')
	}

	onMounted(()=>{
		drawing()
	})



</script>

<style scoped>
	.layer::before{
		content: '';
		position: absolute;
		width: 100%;
		height: 100%;
		background-color: transparent;
		top: 0;
		left: 0;
	}
	.layer:nth-child(1){
		background-color: yellow;
		transform: translateX(250px) rotate(0deg);
	}
	#can{
		width: 100%;
	}

	.piesDiv{
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
	}
	.clp{
	    clip-path: polygon(100% 10%, 50% 50%, 100% 100%);
/*	    transform: rotate(180deg);*/
	}
	.clp1{
	    clip-path: polygon(100% 10%, 50% 50%, 100% 100%);
	    transform: rotate(84deg);
	}
	.dot{
		left: 50%;
		top:50%;
		transform: translate(-50%, -50%);
	}


	.cir:hover{		opacity:0.5;			}

	.type1 {    fill: crimson; stroke: white;    stroke-width: 1px; transition: all 0.1s linear;	}
	.type1H {   stroke: crimson; fill:none;  stroke-width: 1px; display:none;	}
	.type1:hover + .type1H{ display: inline; }

	.type2 {    fill: dodgerblue; stroke: white;    stroke-width: 1px; transition: all 0.1s linear;	}
	.type2H {   stroke: dodgerblue; fill:none;  stroke-width: 1px; display:none;	}
	.type2:hover + .type2H{ display: inline; }

	.type3 {    fill: red; stroke: white;    stroke-width: 1px; transition: all 0.1s linear;	}
	.type3H {   stroke: red; fill:none;  stroke-width: 1px; display:none;	}
	.type3:hover + .type3H{ display: inline; }

	.type4 {    fill: green; stroke: white;    stroke-width: 1px; transition: all 0.1s linear;	}
	.type4H {   stroke: green; fill:none;  stroke-width: 1px; display:none;	}
	.type4:hover + .type4H{ display: inline; }

	.type5 {    fill: gray;	 stroke: white;    stroke-width: 1px; transition: all 0.1s linear;}	
	.type5H {   stroke: gray; fill:none;  stroke-width: 1px; display:none;	}
	.type5:hover + .type5H{ display: inline; }

.hi{
	display:none;
}
.cir:hover .hi{
	display:block;
}


</style>

<!-- <svg viewBox=x y width height > -->
