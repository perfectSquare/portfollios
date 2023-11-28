<template><div class='relative pl-6 pr-6'>      
    <div class="sticky top-0 z-50 w-full"> <!-- nav -->
      <div class="w-full pl-8 pr-8 pt-2 pb-4 md:pt-8 md:pl-12 md:pr-12 bg-white"> <!-- nav -->
        <AirNav />      
        <hr class='mt-2'>
      <div class="flex gap-4 pl-6 mt-6 shadow-sm">
        <div @click='meShow = !meShow' class="cursor-pointer bg-gray-800 text-white p-2 rounded-lg">code</div>
      <div ref='islandsRef' class='border-b-2 border-gray-900 transition-all duration-200 flex flex-col gap-1' 
        @click='islandsCall'
      >
        <img src="/assets/airbnb/boat.png" class='w-4 h-4 self-center'>
        <div class="text-sm">islands</div>
      </div>
      <div ref='parksRef' class='cursor-pointer border-b-2 border-transparent hover:border-gray-400 transition-all duration-200 flex flex-col gap-1' 
        @click='parksCall'>
        <img src="/assets/airbnb/patio.png" class='w-4 h-4 self-center'>
        <div class="text-sm">National Parks</div>
      </div>
      <div ref='luxeRef' class='cursor-pointer border-b-2 border-transparent hover:border-gray-400 transition-all duration-200 flex flex-col gap-1' 
        @click='luxeCall'>
        <img src="/assets/airbnb/books.png" class='w-4 h-4 self-center'>
        <div class="text-sm">Luxe</div>
      </div>
      <div ref='castlesRef' class='cursor-pointer border-b-2 border-transparent hover:border-gray-400 transition-all duration-200 flex flex-col gap-1' 
        @click='castlesCall'
      >     
        <img src="/assets/airbnb/fireplace.png" class='w-4 h-4 self-center'>
        <div class="text-sm">Castles</div>   
       </div>
      </div>
      </div> <!-- nav -->
    </div> <!-- nav -->                    
    <!-- islands -->
    <div v-if='islandsShow' class="relative p-2 sm:p-4 md:p-6"> 

      <div class='fixed fixedBT text-sm cursor-pointer bg-gray-800 text-white pl-4 pr-4 pt-2 pb-2 z-50 rounded-lg' @click='islandsTX'>{{islandsBT}}</div>

      <div v-if='islandsListShow'>
      <div v-if='resAllLoading' class="spin flex gap-1"><div></div><div></div><div></div></div>
      <div v-else-if='resAll && resAll.destinations' class='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2'>
      <template v-for='(nicks, i) in resAll.destinations' :key='i'>
        <Dest 
          :id='nicks.id'
          cat='islands'
          :nick='nicks.nick' 
          :rent='nicks.rent' 
          :items='nicks.images' 
          :stars='nicks.stars'
          :checkIn='nicks.checkIn'
          :checkOut='nicks.checkOut'
          :distance='nicks.distance'
        />  
      </template>
      </div>
      </div>

      <div v-if='!islandsListShow'>
        <GMap :coords='islandsCoords' cat='islands' />
      </div>

    </div> <!-- islands -->

    <!-- parks -->
    <div v-if='parksShow' class="relative p-2 sm:p-4 md:p-6"> 

      <div class='fixed fixedBT text-sm cursor-pointer bg-gray-800 text-white pl-4 pr-4 pt-2 pb-2 z-50 rounded-lg' @click='parksTX'>{{parksBT}}</div>      

      <div v-if='parksListShow'>
      <div v-if='parksLoading' class="spin flex gap-1"><div></div><div></div><div></div></div>
      <div v-else-if='parks && parks.destinations' class='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2'>
      <template v-for='(nicks, i) in parks.destinations' :key='i'>
        <Dest 
          :id='nicks.id'
          cat='parks'
          :nick='nicks.nick' 
          :rent='nicks.rent' 
          :items='nicks.images' 
          :stars='nicks.stars'
          :checkIn='nicks.checkIn'
          :checkOut='nicks.checkOut'
          :distance='nicks.distance'
        />  
      </template>
      </div>
      </div>

      <div v-if='!parksListShow'>
        <GMap :coords='parksCoords' cat='parks' />
      </div>
    </div> <!-- parks -->

    <!-- luxies -->
    <div v-if='luxiesShow' class="relative p-2 sm:p-4 md:p-6"> 

      <div class='fixed fixedBT text-sm cursor-pointer bg-gray-800 text-white pl-4 pr-4 pt-2 pb-2 z-50 rounded-lg' @click='luxiesTX'>{{luxiesBT}}</div>      

      <div v-if='luxiesListShow'>
      <div v-if='luxiesLoading' class="spin flex gap-1"><div></div><div></div><div></div></div>
      <div v-else-if='luxies && luxies.destinations' class='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2'>
      <template v-for='(nicks, i) in luxies.destinations' :key='i'>
        <Dest 
          :id='nicks.id'
          cat='luxies'
          :nick='nicks.nick' 
          :rent='nicks.rent' 
          :items='nicks.images' 
          :stars='nicks.stars'
          :checkIn='nicks.checkIn'
          :checkOut='nicks.checkOut'
          :distance='nicks.distance'
        />  
      </template>
      </div>
      </div>

      <div v-if='!luxiesListShow'>
        <GMap :coords='luxiesCoords' cat='luxies' />
      </div>
    </div> <!-- luxies -->

    <!-- islands -->
    <div v-if='castlesShow' class="relative p-2 sm:p-4 md:p-6"> 

      <div class='fixed fixedBT text-sm cursor-pointer bg-gray-800 text-white pl-4 pr-4 pt-2 pb-2 z-50 rounded-lg' @click='castlesTX'>{{castlesBT}}</div>

      <div v-if='castlesListShow'>
      <div v-if='castlesLoading' class="spin flex gap-1"><div></div><div></div><div></div></div>
      <div v-else-if='castles && castles.destinations' class='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2'>
      <template v-for='(nicks, i) in castles.destinations' :key='i'>
        <Dest 
          :id='nicks.id'
          cat='castles'
          :nick='nicks.nick' 
          :rent='nicks.rent' 
          :items='nicks.images' 
          :stars='nicks.stars'
          :checkIn='nicks.checkIn'
          :checkOut='nicks.checkOut'
          :distance='nicks.distance'
        />  
      </template>
      </div>
      </div>

      <div v-if='!castlesListShow'>
        <GMap :coords='castlesCoords' cat='islands' />
      </div>
    </div> <!-- islands -->
<router-view /> 

<Teleport to='#air'>
<Transition>
<div v-if='meShow' class="fixedMe bg-white overflow-scroll z-50 flex flex-col gap-2 p-2">
  <div @click='meShow = !meShow' class="p-2 text-center bg-gray-800 text-white rounded-lg cursor-pointer">close</div>  
<div class=" grid grid-cols-12 gap-2 p-4">  
  <div class="col-span-2 flex flex-col gap-4 p-2">
    <div @click='crShow = !crShow; tdShow = chShow = dtShow = lxShow = false' class="cursor-pointer bg-gray-800 text-white p-2 rounded-lg text-center">one row of Calendar</div>
    <div @click='tdShow = !tdShow; crShow = chShow = dtShow = lxShow = false' class="cursor-pointer bg-gray-800 text-white p-2 rounded-lg text-center">tds1 array</div>
    <div @click='chShow = !chShow; crShow = tdShow = dtShow = lxShow = false' class="cursor-pointer bg-gray-800 text-white p-2 rounded-lg text-center">checksClicked()</div>
    <hr>
    <div @click='dtShow = !dtShow; crShow = tdShow = chShow = lxShow = false' class="cursor-pointer bg-gray-800 text-white p-2 rounded-lg text-center">details components</div>
    <hr>
    <div @click='lxShow = !lxShow; crShow = tdShow = chShow = dtShow = false' class="cursor-pointer bg-gray-800 text-white p-2 rounded-lg text-center">luxe images</div>    
  </div>
  <div class="col-span-10">
    <div v-if='lxShow' class="text-xs">
      <pre v-pre>
        <div class="text-base">Luxe images are displayed in different way that is for a category page scrolls to target. This
        is not a big deal for coder, but i want to share something slightly other</div>

        images for a category are taken from database as 
        {
          "cat": "Pool",
          "id": "pool",
          "images": [
            "https://a0.muscache.com/im/pictures/a615d7cc-bc0b-4e0e-aaf2-e258221e17fd.jpg?im_w=720",
            "https://a0.muscache.com/im/pictures/19a0dc54-9bc0-42a3-8cc4-35d4672da327.jpg?im_w=720",
            "https://a0.muscache.com/im/pictures/19a0dc54-9bc0-42a3-8cc4-35d4672da327.jpg?im_w=720",
            "https://a0.muscache.com/im/pictures/b82c56ac-a349-4005-8e49-fb70797795d3.jpg?im_w=1200"
          ]
        },

        Now in component, this id is dynamically assigned
        &lt;template v-for='(ct,i) in allImages.destination.luxImages' :key='i'&gt;
            &lt;div class='flex flex-col gap-y-8 w-full'&gt;              
                &lt;div <span class="text-blue-500 text-lg">:id="ct.id"</span> class="text-2xl mt-4"&gt;{{ct.cat}}&lrt;/div&gt; ...


        Ok, next on click
        @click='toIt(`#${ct.id}`)'

        const toIt = (<span class="text-blue-500 text-lg">x</span>) => {    
          mainRef.value.scrollTo({
            top: document.querySelector(x).offsetTop-70,
            behavior: "smooth"
          })
        }

        <span class="text-blue-500 text-lg">
        I want to say that with this code we are able to provide whatever 
        category with whatever id with whatever images in databse
        </span>
      </pre>
    </div>
    <div v-if='dtShow' class="text-xs">
      <pre v-pre>
<div class="text-base">
  When we click on a destination, all components in details/ are loaded
  with their own GQL query, for example for bed rooms, component is BedRooms.vue
</div>        
<span class="text-blue-500 text-lg">GQL and Vue-apollo</span>
const GET_BEDS = gql`query getRules($destinationId: ID!, $type: String!) {
  destination(id: $destinationId, type: $type) {
    bedrooms {
      bedImage
      bedType
      logo
      roomType
    }
    }
}`
const { result:beds, loading:bedsLoading } = useQuery(GET_BEDS, () => ({
  destinationId: props.destinationId,
  type: props.type
}))
<span class="text-blue-500 text-lg">For example. for one or two beds</span>
&lt;div v-if='beds.destination.bedrooms.length &lt;= 2' class="flex gap-y-4 relative"&gt;
  &lt;div class="flex gap-2 w-full justify-start relative"&gt;
    &lt;template v-for='(bd,i) in beds.destination.bedrooms' :key='i'&gt;
      &lt;div class="flex flex-col gap-2 rounded-lg p-4" :class='[{"w-1/2": bd.length == 1}, {"w-full": bd.length &gt; 1}]'&gt;
          &lt;div class="text-xl"&gt;{{bd.roomType}}&lt;/div&gt;
          &lt;img v-if='bd.bedImage != ""' :src='bd.bedImage' class='h-48 rounded-xl' :class='[{"w-1/2": bd.length == 1}, {"w-full": bd.length &gt; 1}]'&gt;
          &lt;div v-else class="flex gap-2"&gt;
            &lt;template v-for='(lg,o) in bd.logo'&gt;
              &lt;img :src="`/assets/airbnb/${lg}.png`" class='w-6 h-6'&gt;
            &lt;/template&gt;
          &lt;/div&gt;
          &lt;div&gt;&lt;/div&gt;
        &lt;div&gt;{{bd.bedType}}&lt;/div&gt;
        &lt;/div&gt;
      &lt;/template&gt;
    &lt;/div&gt;
&lt;/div>
      </pre>
    </div>
    <div v-if='chShow' class="text-xs">
      <pre v-pre>
  const <span class="text-blue-500 text-lg">checksClicked</span> = (e,x) => {
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
      </pre>
    </div>
    <div v-if='tdShow' class="text-xs">
      <pre v-pre>
  const <span class="text-blue-500 text-lg">tds1</span> = computed(() => {
    if(startDay.value == 'Su') return [1,2,3,4,5,6,7]
    if(startDay.value == 'Mo') return [0,1,2,3,4,5,6]
    if(startDay.value == 'Tu') return [0,0,1,2,3,4,5]
    if(startDay.value == 'We') return [0,0,0,1,2,3,4]
    if(startDay.value == 'Th') return [0,0,0,0,1,2,3]
    if(startDay.value == 'Fr') return [0,0,0,0,0,1,2]
    if(startDay.value == 'Sa') return [0,0,0,0,0,0,1]
  })
  used to populate first row of calendar
      </pre>
    </div>
<div v-if='crShow' class="text-xs">
    <pre v-pre>
      &lt;tr&gt;
      &lt;template v-for='(dt,i) in <span class="text-blue-500 text-lg">tds1</span>' :key='i'&gt;
        &lt;td         
        :class='[
        {"bg-gray-100" : new Date(`${month} ${dt} ${year}`) &gt;= inDay && new Date(`${month} ${dt} ${year}`) &lt;= outDay},
        {"bg-gray-100" : new Date(`${month} ${dt} ${year}`) &gt; new Date(marker1) && new Date(`${month} ${dt} ${year}`) &lt; new Date(marker2) && defaultIn},
        {"line-through" : new Date(`${month} ${dt} ${year}`) &lt; inDay && inDateMarker},                
        {"line-through forCheckIn" : new Date(`${month} ${dt} ${year}`) &lt; new Date(marker1)},               
        {"hover:bg-gray-700 hover:text-white" : new Date(`${month} ${dt} ${year}`) &gt; inDay},                
        {"bg-gray-700 text-white": new Date(`${month} ${dt} ${year}`).getDate() == new Date(marker1).getDate() && new Date(`${month} ${dt} ${year}`).getMonth() == new Date(marker1).getMonth() && defaultIn},
        {"bg-gray-700 text-white": new Date(`${month} ${dt} ${year}`).getDate() == new Date(marker2).getDate() && new Date(`${month} ${dt} ${year}`).getMonth() == new Date(marker2).getMonth() && defaultIn},
        {"bg-gray-700 text-white": new Date(`${month} ${dt} ${year}`).getDate() == new Date(inDay).getDate() && new Date(`${month} ${dt} ${year}`).getMonth() == new Date(inDay).getMonth()},
        {"bg-gray-700 text-white": new Date(`${month} ${dt} ${year}`).getDate() == new Date(outDay).getDate() && new Date(`${month} ${dt} ${year}`).getMonth() == new Date(outDay).getMonth()},
        ]'
        class='relative cursor-pointer'
        @click='<span class="text-blue-500 text-lg">checksClicked</span>($event, dt)'
        &gt;             
          &lt;span v-if='dt != 0'&gt;{{dt}}&lt;/span&gt;
          &lt;span v-if='new Date(`${month} ${dt} ${year}`).getMonth() == new Date(inDay).getMonth() && new Date(`${month} ${dt} ${year}`).getDate() == new Date(inDay).getDate()' :class='checkedClass'&gt;in&lt;/span&gt;
          &lt;span v-if='new Date(`${month} ${dt} ${year}`).getDate() == new Date(marker1).getDate() && new Date(`${month} ${dt} ${year}`).getMonth() == new Date(marker1).getMonth() && defaultIn' :class='checkedClass'&gt;in&lt;/span&gt;
          &lt;span v-if='new Date(`${month} ${dt} ${year}`).getMonth() == new Date(outDay).getMonth() && new Date(`${month} ${dt} ${year}`).getDate() == new Date(outDay).getDate()' :class='checkedClass'&gt;out&lt;/span&gt;
          &lt;span v-if='new Date(`${month} ${dt} ${year}`).getDate() == new Date(marker2).getDate() && new Date(`${month} ${dt} ${year}`).getMonth() == new Date(marker2).getMonth() && defaultIn' :class='checkedClass'&gt;out&lt;/span&gt;
        
        &lt;/td&gt;
      &lt;/template&gt;
    &lt;/tr&gt;
    </pre>
    </div>
</div>

</div>  
</div>
</Transition>
</Teleport>

</div></template>


<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useQuery, useLazyQuery } from '@vue/apollo-composable'
import AirNav from '/src/components/airbnb-copy/comps/utils/AirNav.vue'
import Dest from '/src/components/airbnb-copy/comps/Dest.vue'
import GMap from '/src/components/airbnb-copy/comps/maps/GMap.vue'
import { GET_NICK, GET_ISLANDS_COORDS } from '/src/components/airbnb-copy/quries/quries.js'

const meShow = ref(false)
const crShow = ref(false)
const tdShow = ref(false)
const chShow = ref(false)
const dtShow = ref(false)
const lxShow = ref(false)

const islandsShow = ref(true)
const parksShow = ref(false)
const luxiesShow = ref(false)
const castlesShow = ref(false)

const islandsRef = ref(null)
const parksRef = ref(null)
const castlesRef = ref(null)
const luxeRef = ref(null)

const islandsBT = ref('show map')
const islandsListShow = ref(true)
const islandsTX = (e) => {
  if(islandsBT.value == "show map") islandsBT.value = "show list"
  else islandsBT.value = "show map"
  islandsListShow.value = !islandsListShow.value  
}

const parksBT = ref('show map')
const parksListShow = ref(true)
const parksTX = (e) => {
  if(parksBT.value == "show map") parksBT.value = "show list"
  else parksBT.value = "show map"
  parksListShow.value = !parksListShow.value  
}

const luxiesBT = ref('show map')
const luxiesListShow = ref(true)
const luxiesTX = (e) => {
  if(luxiesBT.value == "show map") luxiesBT.value = "show list"
  else luxiesBT.value = "show map"
  luxiesListShow.value = !luxiesListShow.value  
}

const castlesBT = ref('show map')
const castlesListShow = ref(true)
const castlesTX = (e) => {
  if(castlesBT.value == "show map") castlesBT.value = "show list"
  else castlesBT.value = "show map"
  castlesListShow.value = !castlesListShow.value  
}


const { result:resAll, loading:resAllLoading } = useQuery(  GET_NICK,  {    "type": "islands"  })
const { result:iC, loading:ICLoading, } = useQuery(  GET_ISLANDS_COORDS,  {    "type": "islands"  })

const { result:parks, loading:parksLoading, load:loadParks } = useLazyQuery(  GET_NICK,  {    "type": "parks"  })
const { result:pC, loading:PCLoading, } = useQuery(  GET_ISLANDS_COORDS,  {    "type": "parks"  })

const { result:luxies, loading:luxiesLoading, load:loadLuxies } = useLazyQuery(  GET_NICK,  {    "type": "luxies"  })
const { result:lx, loading:LXLoading, } = useQuery(  GET_ISLANDS_COORDS,  {    "type": "luxies"  })

const { result:castles, loading:castlesLoading, load:loadCastles } = useLazyQuery(  GET_NICK,  {    "type": "castles"  })
const { result:cs, loading:CSLoading, } = useQuery(  GET_ISLANDS_COORDS,  {    "type": "castles"  })

const islandsCoords = ref([])
watch(iC, val =>{  islandsCoords.value = val.destinations })

const parksCoords = ref([])
watch(pC, val =>{  parksCoords.value = val.destinations })

const luxiesCoords = ref([])
watch(lx, val =>{  luxiesCoords.value = val.destinations })

const castlesCoords = ref([])
watch(cs, val =>{  castlesCoords.value = val.destinations })

const islandsCall = () => {  
    islandsShow.value = true
    parksShow.value = luxiesShow.value = castlesShow.value = false

    islandsRef.value.classList.remove('border-transparent', 'hover:border-gray-400', 'cursor-pointer')
    islandsRef.value.classList.add('border-gray-900')

    parksRef.value.classList.add('border-transparent', 'hover:border-gray-400', 'cursor-pointer')
    parksRef.value.classList.remove('border-gray-900')
    luxeRef.value.classList.add('border-transparent', 'hover:border-gray-400', 'cursor-pointer')
    luxeRef.value.classList.remove('border-gray-900')
    castlesRef.value.classList.add('border-transparent', 'hover:border-gray-400', 'cursor-pointer')
    castlesRef.value.classList.remove('border-gray-900')
    loadDestination()               
}

const parksCall = (e) => {  
    parksShow.value = true
    islandsShow.value = luxiesShow.value = castlesShow.value = false
    parksRef.value.classList.remove('border-transparent', 'hover:border-gray-400', 'cursor-pointer')
    parksRef.value.classList.add('border-gray-900')
    islandsRef.value.classList.add('border-transparent', 'hover:border-gray-400', 'cursor-pointer')
    islandsRef.value.classList.remove('border-gray-900')
    luxeRef.value.classList.add('border-transparent', 'hover:border-gray-400', 'cursor-pointer')
    luxeRef.value.classList.remove('border-gray-900')
    castlesRef.value.classList.add('border-transparent', 'hover:border-gray-400', 'cursor-pointer')
    castlesRef.value.classList.remove('border-gray-900')
    loadParks()  
}

const luxeCall = (e) => {  
    luxiesShow.value = true
    islandsShow.value = parksShow.value = castlesShow.value = false
    luxeRef.value.classList.remove('border-transparent', 'hover:border-gray-400', 'cursor-pointer')
    luxeRef.value.classList.add('border-gray-900')
    islandsRef.value.classList.add('border-transparent', 'hover:border-gray-400', 'cursor-pointer')
    islandsRef.value.classList.remove('border-gray-900')
    castlesRef.value.classList.add('border-transparent', 'hover:border-gray-400', 'cursor-pointer')
    castlesRef.value.classList.remove('border-gray-900')
    parksRef.value.classList.add('border-transparent', 'hover:border-gray-400', 'cursor-pointer')
    parksRef.value.classList.remove('border-gray-900')
    loadLuxies()  
}

const castlesCall = (e) => {  
  castlesShow.value = true
  islandsShow.value = parksShow.value = luxiesShow.value = false
  castlesRef.value.classList.remove('border-transparent', 'hover:border-gray-400', 'cursor-pointer')
  castlesRef.value.classList.add('border-gray-900')
  parksRef.value.classList.add('border-transparent', 'hover:border-gray-400', 'cursor-pointer')
  parksRef.value.classList.remove('border-gray-900')
  islandsRef.value.classList.add('border-transparent', 'hover:border-gray-400', 'cursor-pointer')
  islandsRef.value.classList.remove('border-gray-900')
  luxeRef.value.classList.add('border-transparent', 'hover:border-gray-400', 'cursor-pointer')
  luxeRef.value.classList.remove('border-gray-900')
  loadCastles()
}


</script>

<style scoped>
.fixedMe{
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 95%;
  height: 90%;
}  
  .fixedBT{
    top: 90%;
    left: 50%;
    transform: translate(-90%, -50%);
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
</style>











