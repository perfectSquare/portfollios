<template><div class='relative p-2 sm:p-4 flex flex-col gap-y-2'>
	<div class="bg-gradient-to-r from-gray-200 to-white p-1 rounded border-b-2 border-gray-300">Urdu Typer</div>
	<textarea ref='txArea' class='pt-1 ring-2 ring-gray-400 w-full text-md sm:text-xl ft' rows='2' style='resize: none; '></textarea>    

	<div class='relative left-[2%] w-[96%] flex justify-center flex-wrap flex-row-reverse gap-2 ring-2 ring-gray-200 rounded sm:gap-3 lg:gap-4 p-2 ft1 mt-2 mr-2 sm:mr-0'>

		<div :class='commonLetters' @click='commonWords'>آپ</div>
		<div :class='commonLetters' @click='commonWords'>اب</div>
		<div :class='commonLetters' @click='commonWords'>اس</div>
		<div :class='commonLetters' @click='commonWords'>اسے</div>		
		<div :class='commonLetters' @click='commonWords'>اگر</div>
		<div class='ring-2 ring-gray-400 ring-offset-2' :class='commonLetters' @click='commonWords'>اور</div>
		
		<div :class='commonLetters' @click='commonWords'>بھی</div>

		<div :class='commonLetters' @click='commonWords'>پر</div>		
		<div :class='commonLetters' @click='commonWords'>پھر</div>		

		<div :class='commonLetters' @click='commonWords'>تب</div>
		<div :class='commonLetters' @click='commonWords'>تک</div>

		<div :class='commonLetters' @click='commonWords'>جب</div>
		<div :class='commonLetters' @click='commonWords'>جس</div>
		<div class='ring-2 ring-gray-400 ring-offset-2' :class='commonLetters' @click='commonWords'>جو</div>
		<div :class='commonLetters' @click='commonWords'>جیسے</div>						

		<div :class='commonLetters' @click='commonWords'>دی</div>
		<div :class='commonLetters' @click='commonWords'>دے</div>

		<div :class='commonLetters' @click='commonWords'>سب</div>
		<div :class='commonLetters' @click='commonWords'>سا</div>
		<div :class='commonLetters' @click='commonWords'>سی</div>
		<div class='ring-2 ring-gray-400 ring-offset-2' :class='commonLetters' @click='commonWords'>سے</div>

		<div :class='commonLetters' @click='commonWords'>طور</div>		
		<div :class='commonLetters' @click='commonWords'>طرح</div>

		<div :class='commonLetters' @click='commonWords'>کر</div>

		<div :class='commonLetters' @click='commonWords'>لے</div>

		<div :class='commonLetters' @click='commonWords'>مگر</div>		
		<div :class='commonLetters' @click='commonWords'>میرا</div>
		<div :class='commonLetters' @click='commonWords'>میری</div>
		<div :class='commonLetters' @click='commonWords'>میرے</div>		
		<div class='ring-2 ring-gray-400 ring-offset-2' :class='commonLetters' @click='commonWords'>میں</div>

		<div :class='commonLetters' @click='commonWords'>نا</div>
		<div :class='commonLetters' @click='commonWords'>نہ</div>
		<div :class='commonLetters' @click='commonWords'>نے</div>

		<div :class='commonLetters' @click='commonWords'>ورنہ</div>
		<div :class='commonLetters' @click='commonWords'>وغیرہ</div>
		<div :class='commonLetters' @click='commonWords'> و </div>
		<div class='ring-2 ring-gray-400 ring-offset-2' :class='commonLetters' @click='commonWords'>وہ</div>

		<div :class='commonLetters' @click='commonWords'>ہو</div>
		<div :class='commonLetters' @click='commonWords'>ہر</div>

		<div :class='commonLetters' @click='commonWords'>یوں</div>		
		
		<div :class='commonLetters' @click='commonWords'>یہ</div>
		<div :class='commonLetters' @click='commonWords'>یا</div>								
		
		<div :class='commonLetters' @click='commonWords'>کا</div>
		<div :class='commonLetters' @click='commonWords'>کی</div>
		<div :class='commonLetters' @click='commonWords'>کے</div>
		<div class='ring-2 ring-gray-400 ring-offset-2' :class='commonLetters' @click='commonWords'>کہ</div>
		<div :class='commonLetters' @click='commonWords'>کو</div>
		<div :class='commonLetters' @click='commonWords'>رہا</div>
		<div :class='commonLetters' @click='commonWords'>رہی</div>
		<div :class='commonLetters' @click='commonWords'>رہے</div>
		<div :class='commonLetters' @click='commonWords'>رہیں</div>
		<div :class='commonLetters' @click='commonWords'>گا</div>
		<div :class='commonLetters' @click='commonWords'>گی</div>
		<div :class='commonLetters' @click='commonWords'>گے</div>
		<div :class='commonLetters' @click='commonWords'>گیں</div>
		<div :class='commonLetters' @click='commonWords'>ہے </div>		
		<div :class='commonLetters' @click='commonWords'>ہیں </div>
		<div :class='commonLetters' @click='commonWords'>ہے &#2042;</div>
		<div :class='commonLetters' @click='commonWords'>ہیں &#2042;</div>
		<div :class='commonLetters' @click='commonWords'>تھا </div>
		<div :class='commonLetters' @click='commonWords'>تھی </div>
		<div :class='commonLetters' @click='commonWords'>تھے </div>
		<div :class='commonLetters' @click='commonWords'>تھا &#2042;</div>
		<div :class='commonLetters' @click='commonWords'>تھی &#2042;</div>
		<div :class='commonLetters' @click='commonWords'>تھے &#2042;</div>					
	
	</div> 

	<div class='relative flex justify-center flex-row-reverse flex-wrap gap-2 text-xl pl-2 pr-2 sm:pl-4 sm:pr-4 md:pl-8 md:pr-8 lg:pl-24 lg:pr-24 ft1 mt-2'>
		<button :class='letters' @click='allLetters'>ا</button>
		<button :class='letters' @click='allLetters'>آ</button>
		<button :class='letters' @click='allLetters'>ب</button>
		<button :class='letters' @click='allLetters'>پ</button>
		<button :class='letters' @click='allLetters'>ت</button>
		<button :class='letters' @click='allLetters'>ٹ</button>
		<button :class='letters' @click='allLetters'>ث</button>
		<button :class='letters' @click='allLetters'>ج</button>
		<button :class='letters' @click='allLetters'>چ</button>
		<button :class='letters' @click='allLetters'>ح</button>
		<button :class='letters' @click='allLetters'>خ</button>
		<button :class='letters' @click='allLetters'>د</button>
		<button :class='letters' @click='allLetters'>ڈ</button>
		<button :class='letters' @click='allLetters'>ذ</button>
		<button :class='letters' @click='allLetters'>ر</button>
		<button :class='letters' @click='allLetters'>ڑ</button>
		<button :class='letters' @click='allLetters'>ز</button>
		<button :class='letters' @click='allLetters'>ژ</button>
		<button :class='letters' @click='allLetters'>س</button>
		<button :class='letters' @click='allLetters'>ش</button>
		<button :class='letters' @click='allLetters'>ص</button>
		<button :class='letters' @click='allLetters'>ض</button>
		<button :class='letters' @click='allLetters'>ط</button>
		<button :class='letters' @click='allLetters'>ظ</button>
		<button :class='letters' @click='allLetters'>ع</button>
		<button :class='letters' @click='allLetters'>غ</button>
		<button :class='letters' @click='allLetters'>ف</button>
		<button :class='letters' @click='allLetters'>ق</button>
		<button :class='letters' @click='allLetters'>ک</button>
		<button :class='letters' @click='allLetters'>گ</button>
		<button :class='letters' @click='allLetters'>ل</button>
		<button :class='letters' @click='allLetters'>م</button>
		<button :class='letters' @click='allLetters'>ن</button>
		<button :class='letters' @click='allLetters'>ں</button>
		<button :class='letters' @click='allLetters'>و</button>
		<button :class='letters' @click='allLetters'>ؤ</button>
		<button :class='letters' @click='allLetters'>ہ</button>
		<button :class='letters' @click='allLetters'>ھ</button>
		<button :class='letters' @click='allLetters'>ی</button>
		<button :class='letters' @click='allLetters'>ئ</button>
		<button :class='letters' @click='allLetters'>ے</button>
	</div>

	<button  :class='letter' @click='(e) => {txArea.value += " "; txArea.focus()}'>space</button>

	<div class='absolute top-[270px] mb:top-[240px] sm:top-[240px] lg:top-[220px] left-0 sm:left-1 md:left-2 flex flex-col gap-1 justify-center items-center ft1'>
		<!-- alif -->
		<div :class='letterAll'	@mouseenter='alif=true'	@mouseleave='alif=false'>ا
			<div v-if='alif' :class='menuItemsDivTypes' class='leftFP'>		
				<button  :class='menuItem' @click='commonWords'>اللّہ تعالىٰ</button>
				<button  :class='menuItem' @click='commonWords'>اپنا</button>
				<button  :class='menuItem' @click='commonWords'>اپنی</button>
				<button  :class='menuItem' @click='commonWords'>اپنے</button>
				<button  :class='menuItem' @click='commonWords'>اچھا</button>
				<button  :class='menuItem' @click='commonWords'>اچھی</button>
				<button  :class='menuItem' @click='commonWords'>اچھے</button>
				<button  :class='menuItem' @click='commonWords'>اِدھراُدھر</button>
				<button  :class='menuItem' @click='commonWords'>اکثر</button>
				<button  :class='menuItem' @click='commonWords'>الگ</button>
				<button  :class='menuItem' @click='commonWords'>انسان</button>
				<button  :class='menuItem' @click='commonWords'>اوپر</button>
			</div>
		</div>		
	<!-- alif -->

	<!-- alif aa -->
		<div :class='letterAll'	@mouseenter='alifaa=true' @mouseleave='alifaa=false'>آ
			<div v-if='alifaa' :class='menuItemsDivTypes' class='leftFP'>
				<button  :class='menuItem' @click='commonWords'>آيا</button>
				<button  :class='menuItem' @click='commonWords'>آئى</button>
				<button  :class='menuItem' @click='commonWords'>آئے</button>				
				<button  :class='menuItem' @click='commonWords'>آتا</button>
				<button  :class='menuItem' @click='commonWords'>آتی</button>
				<button  :class='menuItem' @click='commonWords'>آتے</button>
				<button  :class='menuItem' @click='commonWords'>آج</button>
				<button  :class='menuItem' @click='commonWords'>آدمی</button>				
			</div>
	</div><!-- alif aa -->

	<!-- bai -->
		<div :class='letterAll'	@mouseenter='bai=true' @mouseleave='bai=false'>ب
			<div v-if='bai' :class='menuItemsDivTypes' class='leftFP'>
				<button  :class='menuItem' @click='commonWords'>بہت</button>
				<button  :class='menuItem' @click='commonWords'>بظاہر</button>
				<button  :class='menuItem' @click='commonWords'>بقول</button>
				<button  :class='menuItem' @click='commonWords'>بطور</button>
				<button  :class='menuItem' @click='commonWords'>بہرحال</button>				
				<button  :class='menuItem' @click='commonWords'>بدولت</button>
				<button  :class='menuItem' @click='commonWords'>بالکل</button>
				<button  :class='menuItem' @click='commonWords'>بالعموم</button>
				<button  :class='menuItem' @click='commonWords'>باضابطہ</button>												
				<button  :class='menuItem' @click='commonWords'>بڑا</button>
				<button  :class='menuItem' @click='commonWords'>بڑی</button>
				<button  :class='menuItem' @click='commonWords'>بڑے</button>
			</div>
	</div><!-- bai -->	

	<!-- tai -->
		<div :class='letterAll'	@mouseenter='tai=true' @mouseleave='tai=false'>ت
			<div v-if='tai' :class='menuItemsDivTypes' class="leftFP">
				<button  :class='menuItem' @click='commonWords'>تجھے</button>
				<button  :class='menuItem' @click='commonWords'>تمھارا</button>
				<button  :class='menuItem' @click='commonWords'>تمھاری</button>
				<button  :class='menuItem' @click='commonWords'>تمھارے</button>
				<button  :class='menuItem' @click='commonWords'>تھوڑا</button>
				<button  :class='menuItem' @click='commonWords'>تھوڑی</button>
				<button  :class='menuItem' @click='commonWords'>تھوڑے</button>
				<button  :class='menuItem' @click='commonWords'>تیرا</button>
				<button  :class='menuItem' @click='commonWords'>تیری</button>
				<button  :class='menuItem' @click='commonWords'>تیرے</button>
			</div>
	</div><!-- tai -->		

	<!-- jeem -->
		<div :class='letterAll'	@mouseenter='jeem=true' @mouseleave='jeem=false'>ج
			<div v-if='jeem' :class='menuItemsDivTypes' class="leftFP">
				<button  :class='menuItem' @click='commonWords'>جاتا</button>
				<button  :class='menuItem' @click='commonWords'>جاتی</button>
				<button  :class='menuItem' @click='commonWords'>جاتے</button>
				<button  :class='menuItem' @click='commonWords'>جانب</button>
				<button  :class='menuItem' @click='commonWords'>جہاں</button>
				<button  :class='menuItem' @click='commonWords'>جتنا</button>
				<button  :class='menuItem' @click='commonWords'>جھوٹ</button>
				<button  :class='menuItem' @click='commonWords'>جھوٹا</button>
				<button  :class='menuItem' @click='commonWords'>جھوٹی</button>
				<button  :class='menuItem' @click='commonWords'>جھوٹے</button>				
			</div>
	</div><!-- jeem -->	

	<!-- chai -->
		<div :class='letterAll'	@mouseenter='chai=true' @mouseleave='chai=false'>چ
			<div v-if='chai' :class='menuItemsDivTypes' class="leftFP">	
				<button  :class='menuItem' @click='commonWords'>چکا</button>
				<button  :class='menuItem' @click='commonWords'>چکی</button>
				<button  :class='menuItem' @click='commonWords'>چکے</button>
				<button  :class='menuItem' @click='commonWords'>چونکہ</button>
				<button  :class='menuItem' @click='commonWords'>چنانچہ</button>
				<button  :class='menuItem' @click='commonWords'>چاھیئے</button>					
			</div>
	</div><!-- chai -->		

	<!-- hai -->
		<div :class='letterAll'	@mouseenter='hai=true' @mouseleave='hai=false'>ح
			<div v-if='hai' :class='menuItemsDivTypes' class="leftFP">
				<button  :class='menuItem' @click='commonWords'>حضرت</button>
				<button  :class='menuItem' @click='commonWords'>حالانکہ</button>
				<button  :class='menuItem' @click='commonWords'>حتیٰ کہ</button>
				<button  :class='menuItem' @click='commonWords'>حتی الامکان</button>
			</div>
	</div><!-- hai -->		

	<!-- daal1 -->
		<div :class='letterAll'	@mouseenter='daal1=true' @mouseleave='daal1=false'>د
			<div v-if='daal1' :class='menuItemsDivTypes' class="leftFP">
				<button  :class='menuItem' @click='commonWords'>دائيں</button>				
				<button  :class='menuItem' @click='commonWords'>دائیں بائیں</button>
				<button  :class='menuItem' @click='commonWords'>ديکھا</button>
				<button  :class='menuItem' @click='commonWords'>دیکھے</button>
			</div>
	</div><!-- daal1 -->			

	<!-- rai -->
		<div :class='letterAll'	@mouseenter='rai=true' @mouseleave='rai=false'>ر
			<div v-if='rai' :class='menuItemsDivTypes' class="leftFP">
				<button  :class='menuItem' @click='commonWords'>رَب</button>
				<button  :class='menuItem' @click='commonWords'>رَب العالمین</button>
				<button  :class='menuItem' @click='commonWords'>رہتا</button>
				<button  :class='menuItem' @click='commonWords'>رہتی</button>
				<button  :class='menuItem' @click='commonWords'>رہتے</button>
				<button  :class='menuItem' @click='commonWords'>رہا</button>
				<button  :class='menuItem' @click='commonWords'>رہی</button>
				<button  :class='menuItem' @click='commonWords'>رہے</button>
			</div>
	</div><!-- rai -->			

	<!-- sheen -->
		<div :class='letterAll'	@mouseenter='sheen=true' @mouseleave='sheen=false'>ش
			<div v-if='sheen' :class='menuItemsDivTypes' class="leftFP">
				<button  :class='menuItem' @click='commonWords'>شاعر</button>
				<button  :class='menuItem' @click='commonWords'>شاید</button>
				<button  :class='menuItem' @click='commonWords'>شے</button>				
			</div>		
	</div><!-- sheen -->

	<div :class='letterAll'	@mouseenter='kaff2=true' @mouseleave='kaff2=false'>ک
			<div v-if='kaff2' :class='menuItemsDivTypes' class="leftFP">
				<button  :class='menuItem' @click='commonWords'>کسی</button>
				<button  :class='menuItem' @click='commonWords'>کہا</button>
				<button  :class='menuItem' @click='commonWords'>کہیں</button>
				<button  :class='menuItem' @click='commonWords'>کہے</button>
				<button  :class='menuItem' @click='commonWords'>کل</button>
				<button  :class='menuItem' @click='commonWords'>کرتا</button>
				<button  :class='menuItem' @click='commonWords'>کرتی</button>
				<button  :class='menuItem' @click='commonWords'>کرتے</button>				
				<button  :class='menuItem' @click='commonWords'>کیونکہ</button>				
			</div>
	</div><!-- kaff2 -->		

	<!-- gaaf -->
		<div :class='letterAll'	@mouseenter='gaaf=true' @mouseleave='gaaf=false'>گ
			<div v-if='gaaf' :class='menuItemsDivTypes' class="leftFP">
				<button  :class='menuItem' @click='commonWords'>گیا</button>
				<button  :class='menuItem' @click='commonWords'>گئی</button>
				<button  :class='menuItem' @click='commonWords'>گئے</button>
			</div>
	</div><!-- gaaf -->			
	
	</div>

	<div class='flex justify-center flex-row-reverse flex-wrap gap-2 md:gap-4 pl-2 pr-2 sm:pl-4 sm:pr-4 lg:pl-44 lg:pr-44 ft1 mt-2'>
		<button :class='letterSP' @click='allLetters'>&#1616;</button>
		<button :class='letterSP' @click='allLetters'>&#1614;</button>
		<button :class='letterSP' @click='allLetters'>&#1615;</button>
		<button :class='letterSP' @click='allLetters'>&#1611;</button>
		<button :class='letterSP' @click='allLetters'>&#1613;</button>
		<button :class='letterSP' @click='allLetters'>&#1617;</button>
		<button :class='letterSP' @click='allLetters'>&#1648;</button>
		<button :class='letterSP' @click='allLetters'>&#1555;</button>
		<button :class='letterSP' @click='allLetters'>&#1554;</button>
		<button :class='letterSP' @click='allLetters'>&#1553;</button>
		<button :class='letterSP' @click='allLetters'>&#1552;</button>
		<button :class='letterSP' @click='allLetters'>&#2042;</button>
		<button :class='letterSP' @click='allLetters'>،</button>		
		<button :class='letterSP' @click='allLetters'>&#1567;</button>		
		
	</div> 
	<div class='flex justify-center flex-row-reverse flex-wrap gap-2 md:gap-4 pl-2 pr-2 sm:pl-4 sm:pr-4 lg:pl-44 lg:pr-44 ft1 mt-2 text-xl'>
		<button :class='numbers' @click='allLetters'>۰</button>		
		<button :class='numbers' @click='allLetters'>۱</button>		
		<button :class='numbers' @click='allLetters'>۲</button>		
		<button :class='numbers' @click='allLetters'>۳</button>		
		<button :class='numbers' @click='allLetters'>۴</button>		
		<button :class='numbers' @click='allLetters'>۵</button>		
		<button :class='numbers' @click='allLetters'>۶</button>		
		<button :class='numbers' @click='allLetters'>۷</button>		
		<button :class='numbers' @click='allLetters'>۸</button>		
		<button :class='numbers' @click='allLetters'>۹</button>		
	</div>

	<div class='relative self-center flex flex-wrap flex-row-reverse gap-2 ft1'>

		<div class="relative flex flex-col gap-y-2 cell"><!-- counting -->
		<div 
			:class='letterTypes'
			@click='counting=true'
			@mouseenter='(e)=>{counting=true; e.target.parentElement.classList.add("z-50")}' 
			@mouseleave='(e)=>{counting=false; e.target.parentElement.classList.remove("z-50")}'
		>&#10112;
			<div v-if='counting' :class='menuItemsDivTypes' class="sameFPNumbers countingWid">
			<button  :class='menuItem' @click='(e)=>{txArea.value += " صفر "; txArea.focus()}'>0</button>
			<button  :class='menuItem' @click='(e)=>{txArea.value += " ایک "; txArea.focus()}'>1</button>
			<button  :class='menuItem' @click='(e)=>{txArea.value += " دو "; txArea.focus()}'>2</button>
			<button  :class='menuItem' @click='(e)=>{txArea.value += " تین "; txArea.focus()}'>3</button>
			<button  :class='menuItem' @click='(e)=>{txArea.value += " چار "; txArea.focus()}'>4</button>
			<button  :class='menuItem' @click='(e)=>{txArea.value += " پانچ "; txArea.focus()}'>5</button>
			<button  :class='menuItem' @click='(e)=>{txArea.value += " چھ "; txArea.focus()}'>6</button>
			<button  :class='menuItem' @click='(e)=>{txArea.value += " سات "; txArea.focus()}'>7</button>
			<button  :class='menuItem' @click='(e)=>{txArea.value += " آٹھ "; txArea.focus()}'>8</button>
			<button  :class='menuItem' @click='(e)=>{txArea.value += " نو "; txArea.focus()}'>9</button>
			<button  :class='menuItem' @click='(e)=>{txArea.value += " دس "; txArea.focus()}'>10</button>				
			<button  :class='menuItem' @click='(e)=>{txArea.value += " گیارہ "; txArea.focus()}'>11</button>
			<button  :class='menuItem' @click='(e)=>{txArea.value += " بارہ "; txArea.focus()}'>12</button>
			<button  :class='menuItem' @click='(e)=>{txArea.value += " تیرہ "; txArea.focus()}'>13</button>
			<button  :class='menuItem' @click='(e)=>{txArea.value += " چودہ "; txArea.focus()}'>14</button>
			<button  :class='menuItem' @click='(e)=>{txArea.value += " پندرہ "; txArea.focus()}'>15</button>
			<button  :class='menuItem' @click='(e)=>{txArea.value += " سولہ "; txArea.focus()}'>16</button>
			<button  :class='menuItem' @click='(e)=>{txArea.value += " سترہ "; txArea.focus()}'>17</button>
			<button  :class='menuItem' @click='(e)=>{txArea.value += " اٹھارہ "; txArea.focus()}'>18</button>
			<button  :class='menuItem' @click='(e)=>{txArea.value += " انیس "; txArea.focus()}'>19</button>
			<button  :class='menuItem' @click='(e)=>{txArea.value += " بیس "; txArea.focus()}'>20</button>
			<button  :class='menuItem' @click='(e)=>{txArea.value += " اکیس "; txArea.focus()}'>21</button>
			<button  :class='menuItem' @click='(e)=>{txArea.value += " بائیس "; txArea.focus()}'>22</button>
			<button  :class='menuItem' @click='(e)=>{txArea.value += " تئیس "; txArea.focus()}'>23</button>
			<button  :class='menuItem' @click='(e)=>{txArea.value += " چوبیس "; txArea.focus()}'>24</button>
			<button  :class='menuItem' @click='(e)=>{txArea.value += " پچیس "; txArea.focus()}'>25</button>
			<button  :class='menuItem' @click='(e)=>{txArea.value += " چھبیس "; txArea.focus()}'>26</button>
			<button  :class='menuItem' @click='(e)=>{txArea.value += " ستائیس "; txArea.focus()}'>27</button>
			<button  :class='menuItem' @click='(e)=>{txArea.value += " اٹھائیس "; txArea.focus()}'>28</button>
			<button  :class='menuItem' @click='(e)=>{txArea.value += " انتیس "; txArea.focus()}'>29</button>
			<button  :class='menuItem' @click='(e)=>{txArea.value += " تیس "; txArea.focus()}'>30</button>
			<button  :class='menuItem' @click='(e)=>{txArea.value += " اکتیس "; txArea.focus()}'>31</button>
			<button  :class='menuItem' @click='(e)=>{txArea.value += " بتیس "; txArea.focus()}'>32</button>
			<button  :class='menuItem' @click='(e)=>{txArea.value += " تینتیس "; txArea.focus()}'>33</button>
			<button  :class='menuItem' @click='(e)=>{txArea.value += " چونتیس "; txArea.focus()}'>34</button>
			<button  :class='menuItem' @click='(e)=>{txArea.value += " پینتیس "; txArea.focus()}'>35</button>
			<button  :class='menuItem' @click='(e)=>{txArea.value += " چھتیس "; txArea.focus()}'>36</button>
			<button  :class='menuItem' @click='(e)=>{txArea.value += " سینتیس "; txArea.focus()}'>37</button>
			<button  :class='menuItem' @click='(e)=>{txArea.value += " اڑتیس "; txArea.focus()}'>38</button>
			<button  :class='menuItem' @click='(e)=>{txArea.value += " انتالیس "; txArea.focus()}'>39</button>
			<button  :class='menuItem' @click='(e)=>{txArea.value += " چالیس "; txArea.focus()}'>40</button>
			<button  :class='menuItem' @click='(e)=>{txArea.value += " اکتالیس "; txArea.focus()}'>41</button>
			<button  :class='menuItem' @click='(e)=>{txArea.value += " بیالیس "; txArea.focus()}'>42</button>
			<button  :class='menuItem' @click='(e)=>{txArea.value += " تینتالیس "; txArea.focus()}'>43</button>
			<button  :class='menuItem' @click='(e)=>{txArea.value += " چوالیس "; txArea.focus()}'>44</button>
			<button  :class='menuItem' @click='(e)=>{txArea.value += " پینتالیس "; txArea.focus()}'>45</button>
			<button  :class='menuItem' @click='(e)=>{txArea.value += " چھیالیس "; txArea.focus()}'>46</button>
			<button  :class='menuItem' @click='(e)=>{txArea.value += " سینتالیس "; txArea.focus()}'>47</button>
			<button  :class='menuItem' @click='(e)=>{txArea.value += " اڑتالیس "; txArea.focus()}'>48</button>
			<button  :class='menuItem' @click='(e)=>{txArea.value += " انچاس "; txArea.focus()}'>49</button>
			<button  :class='menuItem' @click='(e)=>{txArea.value += " پچاس "; txArea.focus()}'>50</button>
			<button  :class='menuItem' @click='(e)=>{txArea.value += " اکیاون "; txArea.focus()}'>51</button>
			<button  :class='menuItem' @click='(e)=>{txArea.value += " باون "; txArea.focus()}'>52</button>
			<button  :class='menuItem' @click='(e)=>{txArea.value += " ترپن "; txArea.focus()}'>53</button>
			<button  :class='menuItem' @click='(e)=>{txArea.value += " چون "; txArea.focus()}'>54</button>
			<button  :class='menuItem' @click='(e)=>{txArea.value += " پچپن "; txArea.focus()}'>55</button>
			<button  :class='menuItem' @click='(e)=>{txArea.value += " چھپن "; txArea.focus()}'>56</button>
			<button  :class='menuItem' @click='(e)=>{txArea.value += " ستاون "; txArea.focus()}'>57</button>
			<button  :class='menuItem' @click='(e)=>{txArea.value += " اٹھاون "; txArea.focus()}'>58</button>
			<button  :class='menuItem' @click='(e)=>{txArea.value += " انسٹھ "; txArea.focus()}'>59</button>
			<button  :class='menuItem' @click='(e)=>{txArea.value += " ساٹھ "; txArea.focus()}'>60</button>
			<button  :class='menuItem' @click='(e)=>{txArea.value += " اکسٹھ "; txArea.focus()}'>61</button>
			<button  :class='menuItem' @click='(e)=>{txArea.value += " باسٹھ "; txArea.focus()}'>62</button>
			<button  :class='menuItem' @click='(e)=>{txArea.value += " تریسٹھ "; txArea.focus()}'>63</button>
			<button  :class='menuItem' @click='(e)=>{txArea.value += " چونسٹھ "; txArea.focus()}'>64</button>
			<button  :class='menuItem' @click='(e)=>{txArea.value += " پینسٹھ "; txArea.focus()}'>65</button>
			<button  :class='menuItem' @click='(e)=>{txArea.value += " چھیاسٹھ "; txArea.focus()}'>66</button>
			<button  :class='menuItem' @click='(e)=>{txArea.value += " سڑسٹھ "; txArea.focus()}'>67</button>
			<button  :class='menuItem' @click='(e)=>{txArea.value += " اڑسٹھ "; txArea.focus()}'>68</button>				
			<button  :class='menuItem' @click='(e)=>{txArea.value += " انہتر "; txArea.focus()}'>69</button>
			<button  :class='menuItem' @click='(e)=>{txArea.value += " ستر "; txArea.focus()}'>70</button>
			<button  :class='menuItem' @click='(e)=>{txArea.value += " اکہتر "; txArea.focus()}'>71</button>
			<button  :class='menuItem' @click='(e)=>{txArea.value += " بہتر "; txArea.focus()}'>72</button>
			<button  :class='menuItem' @click='(e)=>{txArea.value += " تہتر "; txArea.focus()}'>73</button>
			<button  :class='menuItem' @click='(e)=>{txArea.value += " چوہتر "; txArea.focus()}'>74</button>
			<button  :class='menuItem' @click='(e)=>{txArea.value += " پچھتر "; txArea.focus()}'>75</button>
			<button  :class='menuItem' @click='(e)=>{txArea.value += " چھیئتر "; txArea.focus()}'>76</button>
			<button  :class='menuItem' @click='(e)=>{txArea.value += " ستتر "; txArea.focus()}'>77</button>
			<button  :class='menuItem' @click='(e)=>{txArea.value += " اٹھہتر "; txArea.focus()}'>78</button>
			<button  :class='menuItem' @click='(e)=>{txArea.value += " اناسی "; txArea.focus()}'>79</button>
			<button  :class='menuItem' @click='(e)=>{txArea.value += " اسی "; txArea.focus()}'>80</button>
			<button  :class='menuItem' @click='(e)=>{txArea.value += " اکیاسی "; txArea.focus()}'>81</button>
			<button  :class='menuItem' @click='(e)=>{txArea.value += " بیاسی "; txArea.focus()}'>82</button>
			<button  :class='menuItem' @click='(e)=>{txArea.value += " تیراسی "; txArea.focus()}'>83</button>
			<button  :class='menuItem' @click='(e)=>{txArea.value += " چوراسی "; txArea.focus()}'>84</button>
			<button  :class='menuItem' @click='(e)=>{txArea.value += " پچاسی "; txArea.focus()}'>85</button>
			<button  :class='menuItem' @click='(e)=>{txArea.value += " چھیاسی "; txArea.focus()}'>86</button>
			<button  :class='menuItem' @click='(e)=>{txArea.value += " ستاسی "; txArea.focus()}'>87</button>
			<button  :class='menuItem' @click='(e)=>{txArea.value += " اٹھاسی "; txArea.focus()}'>88</button>
			<button  :class='menuItem' @click='(e)=>{txArea.value += " نواسی "; txArea.focus()}'>89</button>				
			<button  :class='menuItem' @click='(e)=>{txArea.value += " نوے "; txArea.focus()}'>90</button>
			<button  :class='menuItem' @click='(e)=>{txArea.value += " اکیاوے "; txArea.focus()}'>91</button>
			<button  :class='menuItem' @click='(e)=>{txArea.value += " بانوے "; txArea.focus()}'>92</button>
			<button  :class='menuItem' @click='(e)=>{txArea.value += " تیرانوے "; txArea.focus()}'>93</button>
			<button  :class='menuItem' @click='(e)=>{txArea.value += " چورانوے "; txArea.focus()}'>94</button>
			<button  :class='menuItem' @click='(e)=>{txArea.value += " پچانوے "; txArea.focus()}'>95</button>
			<button  :class='menuItem' @click='(e)=>{txArea.value += " چھیانوے "; txArea.focus()}'>96</button>
			<button  :class='menuItem' @click='(e)=>{txArea.value += " ستانوے "; txArea.focus()}'>97</button>
			<button  :class='menuItem' @click='(e)=>{txArea.value += " اٹھانوے "; txArea.focus()}'>98</button>
			<button  :class='menuItem' @click='(e)=>{txArea.value += " ننانوے "; txArea.focus()}'>99</button>
			<button  :class='menuItem' @click='(e)=>{txArea.value += " سو "; txArea.focus()}'>100</button>
			</div>
		</div>		
	</div><!-- counting -->
	<div class="relative flex flex-col gap-y-2 cell"><!-- body parts -->
		<div 
			:class='letterTypes'
			@click='bodyParts=true'
			@mouseenter='(e)=>{bodyParts=true; e.target.parentElement.classList.add("z-50")}' 
			@mouseleave='(e)=>{bodyParts=false; e.target.parentElement.classList.remove("z-50")}'
		>&#128066;
			<div v-if='bodyParts' :class='menuItemsDivTypes' class="sameFPBody bodyWid">
			<button  :class='menuItem' @click='commonWords'>سر</button>
			<button  :class='menuItem' @click='commonWords'>دماغ</button>
			<button  :class='menuItem' @click='commonWords'>دماغی</button>
			<button  :class='menuItem' @click='commonWords'>دماغوں</button>
			<button  :class='menuItem' @click='commonWords'>بال</button>
			<button  :class='menuItem' @click='commonWords'>بالوں</button>
			<button  :class='menuItem' @click='commonWords'>ماتھا</button>
			<button  :class='menuItem' @click='commonWords'>ماتھے</button>			
			<button  :class='menuItem' @click='commonWords'>پیشانی</button>
			<button  :class='menuItem' @click='commonWords'>آنکھ</button>
			<button  :class='menuItem' @click='commonWords'>آنکھیں</button>
			<button  :class='menuItem' @click='commonWords'>آنکھوں</button>
			<button  :class='menuItem' @click='commonWords'>ناک</button>
			<button  :class='menuItem' @click='commonWords'>ناکوں</button>
			<button  :class='menuItem' @click='commonWords'>ہونٹ</button>
			<button  :class='menuItem' @click='commonWords'>ہونٹوں</button>
			<button  :class='menuItem' @click='commonWords'>رخسار</button>
			<button  :class='menuItem' @click='commonWords'>گال</button>
			<button  :class='menuItem' @click='commonWords'>گالوں</button>
			<button  :class='menuItem' @click='commonWords'>چہرہ</button>
			<button  :class='menuItem' @click='commonWords'>چہرے</button>
			<button  :class='menuItem' @click='commonWords'>چہروں</button>
			<button  :class='menuItem' @click='commonWords'>کان</button>
			<button  :class='menuItem' @click='commonWords'>کانوں</button>
			<button  :class='menuItem' @click='commonWords'>کندھا</button>
			<button  :class='menuItem' @click='commonWords'>کندھے</button>
			<button  :class='menuItem' @click='commonWords'>کندھوں</button>
			<button  :class='menuItem' @click='commonWords'>گردن</button>
			<button  :class='menuItem' @click='commonWords'>گردنیں</button>
			<button  :class='menuItem' @click='commonWords'>گردنوں</button>
			<button  :class='menuItem' @click='commonWords'>بازو</button>
			<button  :class='menuItem' @click='commonWords'>کہنی</button>
			<button  :class='menuItem' @click='commonWords'>کہنیوں</button>
			<button  :class='menuItem' @click='commonWords'>کہنیاں</button>
			<button  :class='menuItem' @click='commonWords'>ہاتھ</button>
			<button  :class='menuItem' @click='commonWords'>ہاتھوں</button>
			<button  :class='menuItem' @click='commonWords'>انگلی</button>
			<button  :class='menuItem' @click='commonWords'>انگلیاں</button>
			<button  :class='menuItem' @click='commonWords'>انگلیوں</button>
			<button  :class='menuItem' @click='commonWords'>ناخن</button>
			<button  :class='menuItem' @click='commonWords'>ناخنوں</button>
			<button  :class='menuItem' @click='commonWords'>چھاتی</button>
			<button  :class='menuItem' @click='commonWords'>چھاتیاں</button>
			<button  :class='menuItem' @click='commonWords'>چھاتیوں</button>
			<button  :class='menuItem' @click='commonWords'>سینہ</button>
			<button  :class='menuItem' @click='commonWords'>سینوں</button>
			<button  :class='menuItem' @click='commonWords'>سینے</button>			
			<button  :class='menuItem' @click='commonWords'>دل</button>
			<button  :class='menuItem' @click='commonWords'>دلی</button>
			<button  :class='menuItem' @click='commonWords'>دلوں</button>
			<button  :class='menuItem' @click='commonWords'>جگر</button>
			<button  :class='menuItem' @click='commonWords'>لبلبہ</button>
			<button  :class='menuItem' @click='commonWords'>لبلبے</button>
			<button  :class='menuItem' @click='commonWords'>آنت</button>
			<button  :class='menuItem' @click='commonWords'>آنتوں</button>
			<button  :class='menuItem' @click='commonWords'>آنتیں</button>
			<button  :class='menuItem' @click='commonWords'>پیٹ</button>
			<button  :class='menuItem' @click='commonWords'>پیٹوں</button>
			<button  :class='menuItem' @click='commonWords'>ٹانگ</button>
			<button  :class='menuItem' @click='commonWords'>ٹانگوں</button>
			<button  :class='menuItem' @click='commonWords'>ٹانگیں</button>
			<button  :class='menuItem' @click='commonWords'>ران</button>
			<button  :class='menuItem' @click='commonWords'>رانوں</button>
			<button  :class='menuItem' @click='commonWords'>رانیں</button>
			<button  :class='menuItem' @click='commonWords'>گھٹنا</button>
			<button  :class='menuItem' @click='commonWords'>گھٹنوں</button>
			<button  :class='menuItem' @click='commonWords'>گھٹنے</button>
			<button  :class='menuItem' @click='commonWords'>پاؤں</button>
			<button  :class='menuItem' @click='commonWords'>ٹخنہ</button>
			<button  :class='menuItem' @click='commonWords'>ٹخنوں</button>
			<button  :class='menuItem' @click='commonWords'>ٹخنے</button>
			</div>
		</div>		
	</div><!-- body parts -->
	<div class="relative flex flex-col gap-y-2 cell"><!-- fruits -->
		<div 
			:class='letterTypes'
			@click='fruits=true'
			@mouseenter='(e)=>{fruits=true; e.target.parentElement.classList.add("z-50")}' 
			@mouseleave='(e)=>{fruits=false; e.target.parentElement.classList.remove("z-50")}'
		>&#127822;
			<div v-if='fruits' :class='menuItemsDivTypes' class="sameFPFruits fruitsWid">
			<button  :class='menuItem' @click='commonWords'>بادام</button>
			<button  :class='menuItem' @click='commonWords'>باداموں</button>
			<button  :class='menuItem' @click='commonWords'>سیب</button>
			<button  :class='menuItem' @click='commonWords'>سیبوں</button>
			<button  :class='menuItem' @click='commonWords'>خوبانی</button>
			<button  :class='menuItem' @click='commonWords'>خوبانیاں</button>
			<button  :class='menuItem' @click='commonWords'>خوبانیوں</button>
			<button  :class='menuItem' @click='commonWords'>کیلا</button>
			<button  :class='menuItem' @click='commonWords'>کیلے</button>
			<button  :class='menuItem' @click='commonWords'>کیلوں</button>
			<button  :class='menuItem' @click='commonWords'>انجیر</button>
			<button  :class='menuItem' @click='commonWords'>انگور</button>
			<button  :class='menuItem' @click='commonWords'>انگوروں</button>
			<button  :class='menuItem' @click='commonWords'>لیموں</button>
			<button  :class='menuItem' @click='commonWords'>آم</button>
			<button  :class='menuItem' @click='commonWords'>آموں</button>
			<button  :class='menuItem' @click='commonWords'>گرما</button>
			<button  :class='menuItem' @click='commonWords'>گرمے</button>
			<button  :class='menuItem' @click='commonWords'>سنگترہ</button>
			<button  :class='menuItem' @click='commonWords'>سنگترے</button>
			<button  :class='menuItem' @click='commonWords'>سنگتروں</button>
			<button  :class='menuItem' @click='commonWords'>مالٹا</button>
			<button  :class='menuItem' @click='commonWords'>مالٹے</button>
			<button  :class='menuItem' @click='commonWords'>مالٹوں</button>
			<button  :class='menuItem' @click='commonWords'>آڑو</button>
			<button  :class='menuItem' @click='commonWords'>ناشپاتی</button>
			<button  :class='menuItem' @click='commonWords'>ناشپاتیاں</button>
			<button  :class='menuItem' @click='commonWords'>ناشپاتیوں</button>
			<button  :class='menuItem' @click='commonWords'>انناس</button>
			<button  :class='menuItem' @click='commonWords'>آلو بخارہ</button>
			<button  :class='menuItem' @click='commonWords'>آلو بخارے</button>
			<button  :class='menuItem' @click='commonWords'>انار</button>
			<button  :class='menuItem' @click='commonWords'>اناروں</button>
			<button  :class='menuItem' @click='commonWords'>تربوز</button>
			<button  :class='menuItem' @click='commonWords'>تربوزوں</button>
			</div>
		</div>		
	</div><!-- fruits -->
	<div class="relative flex flex-col gap-y-2 cell"><!-- vegs -->
		<div 
			:class='letterTypes'
			@click='vegs=true'
			@mouseenter='(e)=>{vegs=true; e.target.parentElement.classList.add("z-50")}' 
			@mouseleave='(e)=>{vegs=false; e.target.parentElement.classList.remove("z-50")}'
		>&#127798;
			<div v-if='vegs' :class='menuItemsDivTypes' class="sameFPVegs vegsWid">
			<button  :class='menuItem' @click='commonWords'>بھنڈی</button>
			<button  :class='menuItem' @click='commonWords'>بھنڈیوں</button>
			<button  :class='menuItem' @click='commonWords'>بھنڈیاں</button>
			<button  :class='menuItem' @click='commonWords'>بینگن</button>
			<button  :class='menuItem' @click='commonWords'>بینگنوں</button>
			<button  :class='menuItem' @click='commonWords'>کریلا</button>
			<button  :class='menuItem' @click='commonWords'>کریلے</button>
			<button  :class='menuItem' @click='commonWords'>کریلوں</button>
			<button  :class='menuItem' @click='commonWords'>گوبھی</button>
			<button  :class='menuItem' @click='commonWords'>کدو</button>
			<button  :class='menuItem' @click='commonWords'>ٹنڈا</button>
			<button  :class='menuItem' @click='commonWords'>ٹنڈے</button>
			<button  :class='menuItem' @click='commonWords'>ٹنڈوں</button>
			</div>
		</div>		
	</div><!-- vegs -->	
	<div class="relative flex flex-col gap-y-2 cell"><!-- clock -->
		<div 
			:class='letterTypes'
			@click='clock=true'
			@mouseenter='(e)=>{clock=true; e.target.parentElement.classList.add("z-50")}' 
			@mouseleave='(e)=>{clock=false; e.target.parentElement.classList.remove("z-50")}'
		>&#128343;
			<div v-if='clock' :class='menuItemsDivTypes' class="sameFPClock clockWid">
			<button  :class='menuItem' @click='commonWords'>صبح</button>
			<button  :class='menuItem' @click='commonWords'>دوپہر</button>
			<button  :class='menuItem' @click='commonWords'>سہ پہر</button>
			<button  :class='menuItem' @click='commonWords'>شام</button>
			<button  :class='menuItem' @click='commonWords'>رات</button>
			<button  :class='menuItem' @click='commonWords'>راتیں</button>
			<button  :class='menuItem' @click='commonWords'>راتوں</button>
			<button  :class='menuItem' @click='commonWords'>ہفتہ</button>
			<button  :class='menuItem' @click='commonWords'>ہفتے</button>
			<button  :class='menuItem' @click='commonWords'>ہفتوں</button>
			<button  :class='menuItem' @click='commonWords'>اتوار</button>
			<button  :class='menuItem' @click='commonWords'>سوموار</button>
			<button  :class='menuItem' @click='commonWords'>پیر</button>
			<button  :class='menuItem' @click='commonWords'>منگل</button>
			<button  :class='menuItem' @click='commonWords'>بدھ</button>
			<button  :class='menuItem' @click='commonWords'>جمعرات</button>
			<button  :class='menuItem' @click='commonWords'>جمعہ</button>
			<button  :class='menuItem' @click='commonWords'>جمعے</button>
			<button  :class='menuItem' @click='commonWords'>جنوری</button>
			<button  :class='menuItem' @click='commonWords'>فروری</button>
			<button  :class='menuItem' @click='commonWords'>مارچ</button>
			<button  :class='menuItem' @click='commonWords'>اپریل</button>
			<button  :class='menuItem' @click='commonWords'>مئی</button>
			<button  :class='menuItem' @click='commonWords'>جون</button>
			<button  :class='menuItem' @click='commonWords'>جولائی</button>
			<button  :class='menuItem' @click='commonWords'>اگست</button>
			<button  :class='menuItem' @click='commonWords'>ستمبر</button>
			<button  :class='menuItem' @click='commonWords'>اکتوبر</button>
			<button  :class='menuItem' @click='commonWords'>نومبر</button>
			<button  :class='menuItem' @click='commonWords'>دسمبر</button>
			</div>
		</div>		
	</div><!-- clock -->		
	<div class="relative flex flex-col gap-y-2 cell"><!-- questions -->
		<div 
			:class='letterTypes'
			@click='what=true'
			@mouseenter='(e)=>{what=true; e.target.parentElement.classList.add("z-50")}' 
			@mouseleave='(e)=>{what=false; e.target.parentElement.classList.remove("z-50")}'
		>&#10068;
			<div v-if='what' :class='menuItemsDivTypes' class="sameFPWhat whatWid">
			<button  :class='menuItem' @click='commonWords'>کیا</button>
			<button  :class='menuItem' @click='commonWords'>کون</button>
			<button  :class='menuItem' @click='commonWords'>کتنا</button>
			<button  :class='menuItem' @click='commonWords'>کتنی</button>
			<button  :class='menuItem' @click='commonWords'>کتنے</button>
			<button  :class='menuItem' @click='commonWords'>کیوں</button>
			<button  :class='menuItem' @click='commonWords'>کب</button>
			<button  :class='menuItem' @click='commonWords'>کیسے</button>
			<button  :class='menuItem' @click='commonWords'>کہاں</button>
			<button  :class='menuItem' @click='commonWords'>کس</button>
			<button  :class='menuItem' @click='commonWords'>کسے</button>
			<button  :class='menuItem' @click='commonWords'>کیونکر</button>
			<button  :class='menuItem' @click='commonWords'>کسطرح</button>
			</div>
		</div>		
	</div><!-- questions -->			
	</div> 

</div></template>

<script setup>
	import { ref, onMounted, computed } from 'vue'

	const txArea = ref(null)
	const letterTypes = ref('cell text-xl')
	const letter = ref('ring-2 ring-gray-100 hover:ring-gray-400 rounded p-1 sm:p-1 w-1/2 self-center mt-1 mb-1')
	const letterAll = ref('relative border-t-2 border-r-2 border-b-2 border-gray-200 hover:border-gray-500 rounded text-xs pr-1 pb-1 cell')	
	const letters = ref('hover:bg-gray-200 rounded p-1 sm:p-2 text-center text-base md:text-xl')
	const letterSingle = ref('ring-2 ring-gray-100 hover:ring-gray-400 rounded p-1 sm:p-2 text-sm sm:text-lg')
	const letterSP = ref('rounded p-1.5 sm:p-2 spFont bg-gray-800 text-white sm:w-6')
	const numbers = ref('rounded p-1 sm:p-1.5 bg-gray-800 text-white text-center')
	const commonLetters = ref('cursor-pointer commonText')

	const menuDiv = ref('rounded p-1 sm:p-2 text-xs sm:text-sm ft1 cell')
	const menuItem = ref('rounded p-1 sm:p-2 hover:text-green-200')
	const menuItemsDiv = ref('absolute top-0 flex flex-wrap gap-1 rounded ft1 bg-gray-800 text-white')
	const menuItemsDivTypes = ref('absolute -top-2 flex flex-wrap gap-1 rounded ft1 bg-gray-800 text-white')

	const counting = ref(false)
	const bodyParts = ref(false)
	const fruits = ref(false)
	const vegs = ref(false)
	const clock = ref(false)
	const what = ref(false)

	const alif  = ref(false)
	const alifaa  = ref(false)
	const bai = ref(false)
	const tai = ref(false)
	const jeem = ref(false)
	const chai = ref(false)
	const hai = ref(false)
	const khai = ref(false)
	const daal1 = ref(false)
	const rai = ref(false)
	const seen = ref(false)
	const sheen = ref(false)
	const kaff2 = ref(false)
	const gaaf = ref(false)

	onMounted(() => {		txArea.value.focus()	})

	const commonWords = (e) => {
		txArea.value.value += " " + e.target.innerText + " "
		txArea.value.focus()
	}
	const allLetters = (e) => {
		txArea.value.value += e.target.innerText
		txArea.value.focus()
	}

	const winWid = computed(() => {		return window.innerWidth/2	})

</script>

<style scoped>

	.ft {		font-family:'pak';		direction: rtl;	}
	.ft1 {		font-family:'pak';		}

	.gridCols{
		grid-template-columns: auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto ;
		direction: rtl;
	}

	.gridColsForTypes{
		grid-template-columns: auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto ;
		direction: rtl;
	}

	.spFont{ font-size:30px;  }
	.commonText{ font-size:12px;  }

	.leftFP{ font-size:12px; padding:5px; left:2px; width:300px; z-index:70; }
/*	.downLeftFP{ font-size:12px; padding:5px; left:2px; width:350px; direction:rtl; z-index:6; }*/
/*	.rightFP{ font-size:12px; padding:5px; right:2px; width:350px; direction:rtl; z-index:6; }*/
/*	.meemFP{ font-size:12px; padding:5px; right:2px; top:-100px; width:350px; direction:rtl; z-index:6; }*/

	.sameFPNumbers{ font-size:14px; padding:3px; }	
	.countingWid{ right:-100px; width:300px; top:-350px;  }
	.sameFPBody{ font-size:12px; padding:3px; }	
	.bodyWid{ right:-120px; width:300px; direction:rtl; top:-300px;  }
	.sameFPFruits{ font-size:12px; padding:3px; }	
	.fruitsWid{ right:-140px; width:300px; direction:rtl; top:-150px; }	
	.sameFPVegs{ font-size:16px; padding:5px;  }
	.vegsWid{ right:-170px; width:300px; direction:rtl; top:-60px; }
	.sameFPClock{ font-size:14px; padding:3px; }
	.clockWid{ right:-210px; width:300px; direction:rtl; top:-100px; }
	.sameFPWhat{ font-size:14px; padding:3px; }
	.whatWid{ right:-210px; width:300px; direction:rtl; top:-50px; }

	@media screen and (min-width:400px) and (max-width:639px){
		.leftFP{ font-size:12px; padding:5px; left:2px; width:250px;  }

		.gridCols{	grid-template-columns: auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto;	}

		.sameFPNumbers{ font-size:14px; padding:3px; }	
		.countingWid{ right:-100px; width:300px; top:-350px;  }
		.sameFPBody{ font-size:12px; padding:3px; }	
		.bodyWid{ right:-120px; width:300px; direction:rtl; top:-300px;  }
		.sameFPFruits{ font-size:12px; padding:3px; }	
		.fruitsWid{ right:-140px; width:300px; direction:rtl; top:-150px; }	
		.sameFPVegs{ font-size:16px; padding:5px;  }
		.vegsWid{ right:-170px; width:300px; direction:rtl; top:-60px; }
		.sameFPClock{ font-size:14px; padding:3px; }
		.clockWid{ right:-210px; width:300px; direction:rtl; top:-100px; }
		.sameFPWhat{ font-size:14px; padding:3px; }
		.whatWid{ right:-210px; width:300px; direction:rtl; top:-50px; }
	}

	@media screen and (min-width:640px) and (max-width:768px){
		.leftFP{ font-size:14px; padding:6px; width:380px;  }

		.gridCols{	grid-template-columns: auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto;	}

		.sameFPNumbers{ font-size:16px; padding:5px; }	
		.countingWid{ right:-200px; width:500px; top:-350px;  }
		.sameFPBody{ font-size:12px; padding:5px; }	
		.bodyWid{ right:-220px; width:500px; direction:rtl; top:-270px;  }
		.sameFPFruits{ font-size:12px; padding:5px; }	
		.fruitsWid{ right:-240px; width:500px; direction:rtl; top:-150px; }	
		.sameFPVegs{ font-size:16px; padding:5px;  }
		.vegsWid{ right:-260px; width:400px; direction:rtl; top:-60px; }
		.sameFPClock{ font-size:14px; padding:5px; }
		.clockWid{ right:-280px; width:500px; direction:rtl; top:-100px; }
		.sameFPWhat{ font-size:14px; padding:3px; }
		.whatWid{ right:-210px; width:300px; direction:rtl; top:-50px; }
	}

	@media screen and (min-width:769px) and (max-width:1024px){
		.leftFP{ font-size:16px; padding:6px; width:480px;  }
		.downLeftFP{ font-size:16px; padding:6px; top:-100px; width:580px;  }
		.rightFP{ font-size:16px; padding:6px; width:580px;  }
		.meemFP{ font-size:16px; padding:6px; top:-180px; width:580px;  }

		.gridCols{	grid-template-columns: auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto;	}

		.sameFPNumbers{ font-size:16px; padding:5px; }	
		.countingWid{ right:-200px; width:500px; top:-350px;  }
		.sameFPBody{ font-size:12px; padding:5px; }	
		.bodyWid{ right:-220px; width:500px; direction:rtl; top:-270px;  }
		.sameFPFruits{ font-size:12px; padding:5px; }	
		.fruitsWid{ right:-240px; width:500px; direction:rtl; top:-150px; }	
		.sameFPVegs{ font-size:16px; padding:5px;  }
		.vegsWid{ right:-260px; width:400px; direction:rtl; top:-60px; }
		.sameFPClock{ font-size:14px; padding:5px; }
		.clockWid{ right:-280px; width:500px; direction:rtl; top:-100px; }
		.sameFPWhat{ font-size:14px; padding:5px; }
		.whatWid{ right:-210px; width:300px; direction:rtl; top:-50px; }
	}

	@media screen and (min-width:1025px) and (max-width:1280px){
		.leftFP{ font-size:18px; padding:8px; width:580px;  }
		.commonText{ font-size:14px;  }
		/*.downLeftFP{ font-size:18px; padding:8px; top:-100px; width:680px;  }
		.rightFP{ font-size:18px; padding:8px; width:680px;  }
		.meemFP{ font-size:18px; padding:8px; top:-180px; width:680px;  }*/

		.gridCols{	grid-template-columns: auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto;	}

		.sameFPNumbers{ font-size:18px; padding:6px; }	
		.countingWid{ right:-330px; width:800px; top:-240px;  }
		.sameFPBody{ font-size:14px; padding:6px; }	
		.bodyWid{ right:-350px; width:700px; direction:rtl; top:-200px;  }
		.sameFPFruits{ font-size:14px; padding:6px; }	
		.fruitsWid{ right:-370px; width:700px; direction:rtl; top:-100px; }	
		.sameFPVegs{ font-size:16px; padding:6px;  }
		.vegsWid{ right:-360px; width:600px; direction:rtl; top:-40px; }
		.sameFPClock{ font-size:14px; padding:5px; }
		.clockWid{ right:-280px; width:500px; direction:rtl; top:-100px; }
		.sameFPWhat{ font-size:16px; padding:5px; }
		.whatWid{ right:-280px; width:490px; direction:rtl; top:-20px; }
	}

	@media screen and (min-width:1281px) and (max-width:1536px){
		.leftFP{ font-size:18px; padding:10px; width:680px;  }
		.commonText{ font-size:14px;  }
		/*.downLeftFP{ font-size:18px; padding:10px; top:-100px; width:780px;  }
		.rightFP{ font-size:18px; padding:10px; width:780px;  }
		.meemFP{ font-size:18px; padding:10px; top:-180px; width:780px;  }*/

		.gridCols{	grid-template-columns: auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto;	}

		.sameFPNumbers{ font-size:18px; padding:6px; }	
		.countingWid{ right:-330px; width:800px; top:-240px;  }
		.sameFPBody{ font-size:14px; padding:6px; }	
		.bodyWid{ right:-350px; width:700px; direction:rtl; top:-200px;  }
		.sameFPFruits{ font-size:14px; padding:6px; }	
		.fruitsWid{ right:-370px; width:700px; direction:rtl; top:-100px; }	
		.sameFPVegs{ font-size:16px; padding:6px;  }
		.vegsWid{ right:-360px; width:600px; direction:rtl; top:-40px; }
		.sameFPClock{ font-size:14px; padding:5px; }
		.clockWid{ right:-280px; width:500px; direction:rtl; top:-100px; }
		.sameFPWhat{ font-size:16px; padding:6px; }
		.whatWid{ right:-280px; width:490px; direction:rtl; top:-20px; }		
	}

</style>



