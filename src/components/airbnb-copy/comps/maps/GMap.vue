<template>
    <div class="relative">
        <div ref="mapDiv" style="width: 100%; height: 80vh" />        

                    <!-- <div 
                class="w-6 z-50 h-6 flex items-center justify-center absolute right-5 top-1/4 cursor-pointer bg-gray-100 hover:bg-white rounded-full hover:scale-105 transition-all duration-300" 
                onclick='above()'
            ><img src="/assets/airbnb/right.png" class="w-2 h-2"></div>
            <div 
                class="w-6 z-50 h-6 flex items-center justify-center absolute left-4 top-1/4 cursor-pointer bg-gray-100 hover:bg-white rounded-full hover:scale-105 transition-all duration-300" 
                onclick='behind()'
            ><img src="/assets/airbnb/left.png" class="w-2 h-2"></div> -->

    </div>
</template>
<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { Loader } from '@googlemaps/js-api-loader'
import Dest from '/src/components/airbnb-copy/comps/Dest.vue'
const GOOGLE_MAPS_API_KEY = 'AIzaSyCStZZSxHqrprt0HrJB2DFnL2Ua3ZeuWXg'

const props = defineProps({ coords: Array, cat:String })

const loader = new Loader({ apiKey: GOOGLE_MAPS_API_KEY })
const mapDiv = ref(null)
let map = ref(null)

onMounted(async () => {
    await loader.load()
    map.value = new google.maps.Map(mapDiv.value, {
        center: { lat: 30.3753, lng: 69.3451 },
        zoom: 3,
        panControl: false,
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        overviewMapControl: false,
        rotateControl: false
    })
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const icon = {
        url: "/assets/airbnb/map-marker.png",
        scaledSize: new google.maps.Size(50, 30),
    };
    const iconHover = {
        url: "/assets/airbnb/map-marker.png",
        scaledSize: new google.maps.Size(52, 32),
    };
    for (let i = 0; i < props.coords.length; i++) {
        const marker = new google.maps.Marker({
            position: new google.maps.LatLng(props.coords[i].latitude, props.coords[i].longitude),
            icon: icon,
            map: map.value,
            label: { color: 'black', fontWeight: 'bold', fontSize: '10px', text: `$ ${props.coords[i].rent}` },
        });
        const dest = document.createElement("DIV")
        dest.classList.add('bg-white', 'shadow-xl', 'w-64', 'h-64')
        dest.innerHTML = `
			<div class="flex flex-col gap-2 text-sm leading-3">

        	<img src="${props.coords[i].images[0]}" class="w-full h-40">
        	<div class="flex justify-between">
        		<div class="font-semibold">${props.coords[i].nick}</div>
        		<div class="flex gap-2">
        			<img src="/assets/airbnb/star_black.png" class="w-3 h-3 self-center">
        			<div>${props.coords[i].stars==0 ? "New": props.coords[i].stars}</div>
        		</div>
        	</div>        	
        	<div>${props.coords[i].distance}</div>
        	<div>${months[new Date(props.coords[i].checkIn).getMonth()]} ${new Date(props.coords[i].checkIn).getDate()} - ${new Date(props.coords[i].checkOut).getDate()}</div>
        	<div>$ <b class="font-semibold">${props.coords[i].rent}</b> night</div>
        </div>
		`

        dest.addEventListener('click', () => window.open(router.resolve({ name: "details", query: { id: props.coords[i].id, cat: props.cat } }).href, '_blank'))
        const infowindow = new google.maps.InfoWindow({
            content: dest
        });
        marker.addListener("mouseover", () => {
            marker.setIcon(iconHover)
            marker.setZIndex(10)
        });
        marker.addListener("mouseout", () => {
            marker.setIcon(icon)
            marker.setZIndex(null)
        });
        marker.addListener("click", () => {
            infowindow.open({
                anchor: marker,
                map: map.value,
                shouldFocus: false,
            });
        });
    }
})
import { useRouter } from 'vue-router'
const router = useRouter()

const toDestination = (id) => {
    console.log(id)
    // window.open(router.resolve({ name: "details", query: { id: id, cat: "islands" } }).href, '_blank')
}
</script>
<style scoped>
.price-tag {
    background-color: #4285F4;
    border-radius: 8px;
    color: #FFFFFF;
    font-size: 14px;
    padding: 10px 15px;
    position: relative;
}
</style>