<template>
    <div class="relative">
        <div ref="mapDiv" style="width: 100%; height: 80vh" />        
    </div>
</template>
<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { Loader } from '@googlemaps/js-api-loader'
const GOOGLE_MAPS_API_KEY = 'AIzaSyCStZZSxHqrprt0HrJB2DFnL2Ua3ZeuWXg'

const props = defineProps({ latitude: Number, longitude:Number })

const loader = new Loader({ apiKey: GOOGLE_MAPS_API_KEY })
const mapDiv = ref(null)
let map = ref(null)

onMounted(async () => {
    await loader.load()
    map.value = new google.maps.Map(mapDiv.value, {
        center: { lat: props.latitude, lng: props.longitude },
        zoom: 15,
        panControl: true,
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: true,
        streetViewControl: true,        
    })
    const home = {












        url: "/assets/airbnb/home-black.png",
        scaledSize: new google.maps.Size(30, 30),
    };
    const air = {
        url: "/assets/airbnb/airbnb.png",
        scaledSize: new google.maps.Size(30, 30),
    };
    const marker = new google.maps.Marker({
        position: new google.maps.LatLng(props.latitude, props.longitude),
        icon: home,
        cursor: 'default',
        map: map.value,
    });
    const dest = document.createElement("DIV")
        dest.classList.add('bg-white', 'shadow-xl')
        dest.innerHTML = `Exact location`
    const infowindow = new google.maps.InfoWindow({
        content: dest
    });
    marker.addListener("mouseover", () => {
        marker.setIcon(air)
        infowindow.open({
            anchor: marker,
            map: map.value,
            shouldFocus: false,
        });
    });
    marker.addListener("mouseout", () => {
        marker.setIcon(home)
        infowindow.close()
    });
})

</script>
<style scoped>
</style>