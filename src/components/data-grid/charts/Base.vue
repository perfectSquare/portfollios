<template><div :key='baseKey' class="relative left-10 flex flex-col w-[60%] h-[100%] ring ring-gray-100 ring-opacity-40 ring-offset-2 ring-offset-gray-100">
	<div class="relative top-2 bg-white shadow-md border-b-2 border-gray-300 self-center p-2">
		{{cap}}
	</div>
	<div class="relative p-4 w-[100%] h-[100%]">
	<table class='relative w-full h-full'>		
		<tr>
			<template v-for='(n,i) in nH' :key='i'>
				<th class='dataTDClass'>&nbsp;</th>	
			</template>
		</tr>		
		<template v-for='(n,i) in nT' :key='i'>
			<tr>
				<template v-for='(n,i) in nH' :key='i'>
					<td class='dataTDClass'>&nbsp;</td>
				</template>
			</tr>	
		</template>		
		<tr>
			<template v-for="(d,i) in dataSetToDsiplay" :key='i'>
				<td>
					<div class='relative flex justify-center h-full w-full text-xs'>
						<div class='absolute -bottom-[15px] flex flex-col items-center w-full'>
							<div 
								class="barWidthResponsive" 
								:class='`h${d.rate}`'
								:style='`background-color:${d.background}`'
								@mouseenter="(e)=>e.target.nextSibling.classList.remove('hidden')"
								@mouseleave="(e)=>e.target.nextSibling.classList.add('hidden')"
								@click="called"
							></div>							
							<div class='hidden dropShade z-20 toolAnimation p-1 absolute left-[-12px] -top-12 ring-1 w-[130%] ring-gray-200 flex flex-col gap-y-1 bg-white text-xs rounded-md'>
								<div>{{d.name}}</div>
								<div>data set: {{d.rateHD}}</div>
								<div class="absolute text-base text-white top-[80%] left-[42%]">&#x25BC;</div>
							</div>
							<div>{{d.name}}</div>
						</div>
					</div>
				</td>	
			</template>
		</tr>			
	</table>
	<div class="flex flex-col absolute gap-y-[10.5px] top-2 text-xs rounded-lg border-l-2 border-t-2 border-b-2 border-gray-300 border-opacity-60 shadow-xl bg-gray-50 pl-1" :class='`YLeft${yLeftNumbers}`'>
		<template v-for="(y,i) in ys" :key='i'>
			<div class="text-right">{{y}}</div>
		</template>
	</div>	
</div></div></template>

<script setup>
	import { ref, computed, onMounted, watch } from 'vue'

	const props = defineProps({
		cap: String,
		names: Array,
		dataColors: Array,
		rates: Array,
		yMax: Number,
		yMin: Number,
		added: Boolean,
		removed: Boolean
	})

	const emits = defineEmits(['addedDone', 'removedDone'])

	const nH = ref(9)
	const nT = ref(7)
	const baseKey = ref(0)
	const min = ref(0)
	const max = ref(244)
	const ys = ref([])

	const yLeftNumbers = computed(()=>{
		if(max.value < 10){
			if(max.value %8 == 0) return 1
			else return 2		
		} 
		else if(max.value >= 10 && max.value <100){
			if(max.value %8 == 0) return 3
			else return 4
		} 
		else if(max.value >= 100 && max.value <1000){
			if(max.value %8 == 0) return 5
			else return 6
		}
		else if(max.value >= 1000 && max.value <10000){
			if(max.value %8 == 0) return 7
			else return 8
		}
		else if(max.value >= 10000){
			if(max.value %8 == 0) return 9
			else return 10
		} 
	})

	const setYS = () => {
		let precision
		if(max.value < 10){
			if(max.value %8 == 0) precision = 1
			else precision = 2
		} 
		else if(max.value >= 10 && max.value <100){
			if(max.value %8 == 0) precision = 3
			else precision = 2
		} 
		else if(max.value >= 100 && max.value <1000){
			if(max.value %8 == 0) precision = 3
			else precision = 4	
		} 
		else if(max.value >= 1000 && max.value <10000){
			if(max.value %8 == 0) precision = 4
			else precision = 5
		} 
		else if(max.value >= 10000){
			if(max.value %8 == 0) precision = 5
			else precision = 6
		} 

		let one = max.value/8
		let two = one
		ys.value.push(min.value)
		ys.value.push(one.toPrecision(precision))
		for(let i=0; i<6; i++){
			two += one
			ys.value.push(two.toPrecision(precision))
		}		
		ys.value.push(max.value)
		ys.value.reverse()
	}	

	const gapY = ref(6)
	const hh = computed(() => {
		return gapY.value * 12
	})

	const xGap = computed(() => {
		if(xs.value.length == 9) return 23
	})
	const yGap = computed(() => {
		if(ys.value.length == 9) return 5
	})

	const dataSetToDsiplay = computed(()=>{
		return props.names.map((name, index) => {
		  return {
		    name: name,
		    background: CSS.supports('color', props.dataColors[index]) ? props.dataColors[index] : 'gray',
		    rate: Math.round((217 - min.value) * (props.rates[index]/100)),
		    rateHD: Math.round((max.value - min.value) * (props.rates[index]/100))
		  }
		});
	})

	const called = (e) => {
		alert('any end point can be hit')
	}

	onMounted(()=>{
		max.value = props.yMax
		min.value = props.yMin
		setYS()
	})

	watch(()=>props.yMax, (n)=>{
		max.value = n
		ys.value= []
		setYS()
	})

	watch(()=>props.yMin, (n)=>{
		min.value = n
		ys.value= []
		setYS()
	})

	watch(()=>props.added, (n)=>{
		if(n){
			nH.value++
			emits('addedDone')
		}
	})

	watch(()=>props.removed, (n)=>{
		if(n){
			nH.value--
			emits('removedDone')
		}
	})
</script>

<style scoped>
	.baseWH{		
		background:gray;
		/*width: 100%;
		height: 100%;*/
		left:50%;
		top:50%;
		transform: translate(-50%, -50%);
	}
	.WHForX{
/*		background:red;*/
		width: 100%;
		height: 100%;
	}
	.WHForY{
		background:red;
		width: 100%;
	}
	.gapX23{ column-gap: 5%; }
	.gapY5{ row-gap: 4%; }

	.dataTDClass{
		border: 1px solid rgb(115, 115, 115, 0.3);
	}

	.barWidthResponsive{ 
		cursor: pointer;
		width: 20px; 
		border: 1px solid transparent;
		transition: all 0.3s linear;
		border-top-left-radius: 3px;
		border-top-right-radius: 3px;
	}
	@media screen and (min-width:900px) and (max-width:1100px){ .barWidthResponsive{ width: 25px; } }
	@media screen and (min-width:1100px) and (max-width:1300px){ .barWidthResponsive{ width: 30px; } }
	@media screen and (min-width:1300px) and (max-width:1500px){ .barWidthResponsive{ width: 45px; } }
	@media screen and (min-width:1500px) and (max-width:1700px){ .barWidthResponsive{ width: 50px; } }
	@media screen and (min-width:1700px) { .barWidthResponsive{ width: 60px; } }

	.barWidthResponsive:hover{
		opacity: 0.7;
		border: 1px solid gray;
	}

	.toolAnimation{
		transform-origin: bottom;
		animation: toolAnimationFrames 0.3s linear;
	}
	@keyframes toolAnimationFrames{
		0%{ opacity:0; transform:scale(0,0); }
		100%{ opacity:1; transform:scale(1,1); }
	}

	.dropShade{ 
		filter: drop-shadow(5px 5px 8px #bfbfbf);
	}

	.YLeft1{ left: -1px; }
	.YLeft2{ left: -14px; }

	.YLeft3{ left: -8px; }
	.YLeft4{ left: -16px; }

	.YLeft5{ left: -16px; }
	.YLeft6{ left: -24px; }

	.YLeft7{ left: -22px; }
	.YLeft8{ left: -30px; }

	.YLeft9{ left: -28px; }
	.YLeft10{ left: -34px; }

	.h1{ height: 1px; }
	.h2{ height: 2px; }
	.h3{ height: 3px; }
	.h4{ height: 4px; }
	.h5{ height: 5px; }
	.h6{ height: 6px; }
	.h7{ height: 7px; }
	.h8{ height: 8px; }
	.h9{ height: 9px; }
	.h10{ height: 10px; }
	.h11{ height: 11px; }
	.h12{ height: 12px; }
	.h13{ height: 13px; }
	.h14{ height: 14px; }
	.h15{ height: 15px; }
	.h16{ height: 16px; }
	.h17{ height: 17px; }
	.h18{ height: 18px; }
	.h19{ height: 19px; }
	.h20{ height: 20px; }
	.h21{ height: 21px; }
	.h22{ height: 22px; }
	.h23{ height: 23px; }
	.h24{ height: 24px; }
	.h25{ height: 25px; }
	.h26{ height: 26px; }
	.h27{ height: 27px; }
	.h28{ height: 28px; }
	.h29{ height: 29px; }
	.h30{ height: 30px; }
	.h31{ height: 31px; }
	.h32{ height: 32px; }
	.h33{ height: 33px; }
	.h34{ height: 34px; }
	.h35{ height: 35px; }
	.h36{ height: 36px; }
	.h37{ height: 37px; }
	.h38{ height: 38px; }
	.h39{ height: 39px; }
	.h40{ height: 40px; }	
	.h41{ height: 41px; }	
	.h42{ height: 42px; }	
	.h43{ height: 43px; }	
	.h44{ height: 44px; }	
	.h45{ height: 45px; }	
	.h46{ height: 46px; }	
	.h47{ height: 47px; }	
	.h48{ height: 48px; }	
	.h49{ height: 49px; }	
	.h50{ height: 50px; }	
	.h51{ height: 51px; }	
	.h52{ height: 52px; }	
	.h53{ height: 53px; }	
	.h54{ height: 54px; }	
	.h55{ height: 55px; }	
	.h56{ height: 56px; }	
	.h57{ height: 57px; }	
	.h58{ height: 58px; }	
	.h59{ height: 59px; }	
	.h60{ height: 60px; }	
	.h61{ height: 61px; }	
	.h62{ height: 62px; }	
	.h63{ height: 63px; }	
	.h64{ height: 64px; }	
	.h65{ height: 65px; }	
	.h66{ height: 66px; }	
	.h67{ height: 67px; }	
	.h68{ height: 68px; }	
	.h69{ height: 69px; }	
	.h70{ height: 70px; }	
	.h71{ height: 71px; }	
	.h72{ height: 72px; }	
	.h73{ height: 73px; }	
	.h74{ height: 74px; }	
	.h75{ height: 75px; }	
	.h76{ height: 76px; }	
	.h77{ height: 77px; }	
	.h78{ height: 78px; }	
	.h79{ height: 79px; }	
	.h80{ height: 80px; }	
	.h81{ height: 81px; }	
	.h82{ height: 82px; }	
	.h83{ height: 83px; }	
	.h84{ height: 84px; }	
	.h85{ height: 85px; }	
	.h86{ height: 86px; }	
	.h87{ height: 87px; }	
	.h88{ height: 88px; }	
	.h89{ height: 89px; }	
	.h90{ height: 90px; }	
	.h91{ height: 91px; }	
	.h92{ height: 92px; }	
	.h93{ height: 93px; }	
	.h94{ height: 94px; }	
	.h95{ height: 95px; }	
	.h96{ height: 96px; }	
	.h97{ height: 97px; }	
	.h98{ height: 98px; }	
	.h99{ height: 99px; }	
	.h100{ height: 100px; }	
	.h101{ height: 101px; }	
	.h102{ height: 102px; }	
	.h103{ height: 103px; }	
	.h104{ height: 104px; }	
	.h105{ height: 105px; }	
	.h106{ height: 106px; }	
	.h107{ height: 107px; }	
	.h108{ height: 108px; }	
	.h109{ height: 109px; }	
	.h110{ height: 110px; }	
	.h111{ height: 111px; }	
	.h112{ height: 112px; }	
	.h113{ height: 113px; }	
	.h114{ height: 114px; }	
	.h115{ height: 115px; }	
	.h116{ height: 116px; }	
	.h117{ height: 117px; }	
	.h118{ height: 118px; }	
	.h119{ height: 119px; }	
	.h120{ height: 120px; }	
	.h121{ height: 121px; }	
	.h122{ height: 122px; }	
	.h123{ height: 123px; }	
	.h124{ height: 124px; }	
	.h125{ height: 125px; }	
	.h126{ height: 126px; }	
	.h127{ height: 127px; }	
	.h128{ height: 128px; }	
	.h129{ height: 129px; }	
	.h130{ height: 130px; }	
	.h131{ height: 131px; }	
	.h132{ height: 132px; }	
	.h133{ height: 133px; }	
	.h134{ height: 134px; }	
	.h135{ height: 135px; }	
	.h136{ height: 136px; }	
	.h137{ height: 137px; }	
	.h138{ height: 138px; }	
	.h139{ height: 139px; }	
	.h140{ height: 140px; }	
	.h141{ height: 141px; }	
	.h142{ height: 142px; }	
	.h143{ height: 143px; }	
	.h144{ height: 144px; }	
	.h145{ height: 145px; }	
	.h146{ height: 146px; }	
	.h147{ height: 147px; }	
	.h148{ height: 148px; }	
	.h149{ height: 149px; }	
	.h150{ height: 150px; }	
	.h151{ height: 151px; }	
	.h152{ height: 152px; }	
	.h153{ height: 153px; }	
	.h154{ height: 154px; }	
	.h155{ height: 155px; }	
	.h156{ height: 156px; }	
	.h157{ height: 157px; }	
	.h158{ height: 158px; }	
	.h159{ height: 159px; }	
	.h160{ height: 160px; }	
	.h161{ height: 161px; }	
	.h162{ height: 162px; }	
	.h163{ height: 163px; }	
	.h164{ height: 164px; }	
	.h165{ height: 165px; }	
	.h166{ height: 166px; }	
	.h167{ height: 167px; }	
	.h168{ height: 168px; }	
	.h169{ height: 169px; }	
	.h170{ height: 170px; }	
	.h171{ height: 171px; }	
	.h172{ height: 172px; }	
	.h173{ height: 173px; }	
	.h174{ height: 174px; }	
	.h175{ height: 175px; }	
	.h176{ height: 176px; }	
	.h177{ height: 177px; }	
	.h178{ height: 178px; }	
	.h179{ height: 179px; }	
	.h180{ height: 180px; }	
	.h181{ height: 181px; }	
	.h182{ height: 182px; }	
	.h183{ height: 183px; }	
	.h184{ height: 184px; }	
	.h185{ height: 185px; }	
	.h186{ height: 186px; }	
	.h187{ height: 187px; }	
	.h188{ height: 188px; }	
	.h189{ height: 189px; }	
	.h190{ height: 190px; }	
	.h191{ height: 191px; }	
	.h192{ height: 192px; }	
	.h193{ height: 193px; }	
	.h194{ height: 194px; }	
	.h195{ height: 195px; }	
	.h196{ height: 196px; }	
	.h197{ height: 197px; }	
	.h198{ height: 198px; }	
	.h199{ height: 199px; }	
	.h200{ height: 200px; }	
	.h201{ height: 201px; }	
	.h202{ height: 202px; }	
	.h203{ height: 203px; }	
	.h204{ height: 204px; }	
	.h205{ height: 205px; }	
	.h206{ height: 206px; }	
	.h207{ height: 207px; }	
	.h208{ height: 208px; }	
	.h209{ height: 209px; }	
	.h210{ height: 210px; }	
	.h211{ height: 211px; }	
	.h212{ height: 212px; }	
	.h213{ height: 213px; }	
	.h214{ height: 214px; }	
	.h215{ height: 215px; }	
	.h216{ height: 216px; }	
	.h217{ height: 217px; }	
	.h218{ height: 218px; }	
	.h219{ height: 219px; }	
	.h220{ height: 220px; }	
	.h221{ height: 221px; }	
</style>













