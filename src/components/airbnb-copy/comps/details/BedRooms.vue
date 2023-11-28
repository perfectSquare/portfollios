<template>
    <div v-if='beds' class="w-full p-4 md:p-6">
        <!-- if more trhan 2 -->
        <div v-if='beds.destination.bedrooms.length > 2' class="flex gap-2 relative">
            <div class="absolute right-1 bot flex gap-4">
                <div>{{tx4}}</div>
                <div @click='one=true; two=false; tx4="1/2"' class="hover:bg-gray-100 flex justify-center w-8 h-8 rounded-full items-center transition-all duration-300 cursor-pointer">
                    <img src="/assets/airbnb/left.png" class='w-2 h-3'>
                </div>
                <div @click='one=false; two=true; tx4="2/2"' class="hover:bg-gray-100 flex justify-center w-8 h-8 rounded-full items-center transition-all duration-300 cursor-pointer">
                    <img src="/assets/airbnb/right.png" class='w-2 h-3'>
                </div>
            </div>
            <Transition>
                <div v-if='one' class="flex gap-2 w-full  relative">
                    <template v-for='(bd,i) in beds.destination.bedrooms.slice(0,2)' :key='i'>
                        <div class="flex flex-col w-full" :class='[
					{"h-56": bd.bedImage != ""},
					{"h-12": bd.bedImage == ""}
				]'>
                            <div class="text-xl">{{bd.roomType}}</div>
                            <img v-if='bd.bedImage != ""' :src='bd.bedImage' class='h-48 rounded-xl' :class='[{"w-1/2": bd.length == 1}, {"w-full": bd.length > 1}]'>
                            <div v-else class="flex gap-2">
                                <template v-for='(lg,o) in bd.logo'>
                                    <img :src="`/assets/airbnb/${lg}.png`" class='w-6 h-6'>
                                </template>
                            </div>
                            <div></div>
                            <div>{{bd.bedType}}</div>
                        </div>
                    </template>
                </div>
            </Transition>
            <Transition>
                <div v-if='two' class="flex gap-2 w-full  relative">
                    <template v-for='(bd,i) in beds.destination.bedrooms.slice(2)' :key='i'>
                        <div class="flex flex-col w-full" :class='[
					{"h-56": bd.bedImage != ""},
					{"h-12": bd.bedImage == ""}
				]'>
                            <div class="text-xl">{{bd.roomType}}</div>
                            <img v-if='bd.bedImage != ""' :src='bd.bedImage' class='h-48 rounded-xl' :class='[{"w-1/2": bd.length == 1}, {"w-full": bd.length > 1}]'>
                            <div v-else class="flex gap-2">
                                <template v-for='(lg,o) in bd.logo'>
                                    <img :src="`/assets/airbnb/${lg}.png`" class='w-6 h-6'>
                                </template>
                            </div>
                            <div></div>
                            <div>{{bd.bedType}}</div>
                        </div>
                    </template>
                </div>
            </Transition>
        </div>
        <!-- if more than 2 -->
        <div v-if='beds.destination.bedrooms.length <= 2' class="flex gap-y-4 relative">
            <div class="flex gap-2 w-full justify-start relative">
                <template v-for='(bd,i) in beds.destination.bedrooms' :key='i'>
                    <div class="flex flex-col gap-2 rounded-lg p-4" :class='[{"w-1/2": bd.length == 1}, {"w-full": bd.length > 1}]'>
                        <div class="text-xl">{{bd.roomType}}</div>
                        <img v-if='bd.bedImage != ""' :src='bd.bedImage' class='h-48 rounded-xl' :class='[{"w-1/2": bd.length == 1}, {"w-full": bd.length > 1}]'>
                        <div v-else class="flex gap-2">
                            <template v-for='(lg,o) in bd.logo'>
                                <img :src="`/assets/airbnb/${lg}.png`" class='w-6 h-6'>
                            </template>
                        </div>
                        <div></div>
                        <div>{{bd.bedType}}</div>
                    </div>
                </template>
            </div>
        </div>
        <!-- if not 4 -->
    </div>
</template>
<script setup>
import { ref, watch } from 'vue'
import gql from 'graphql-tag'
import { useQuery } from '@vue/apollo-composable'

const props = defineProps({ destinationId: Number, type: String, })
const emit = defineEmits(['noBed'])

const one = ref(true)
const two = ref(false)
const tx4 = ref('1/2')

const GET_BEDS = gql `query getRules($destinationId: ID!, $type: String!) {
  destination(id: $destinationId, type: $type) {
    bedrooms {
      bedImage
      bedType
      logo
      roomType
    }
    }
}`

const { result: beds, loading: bedsLoading } = useQuery(GET_BEDS, () => ({
    destinationId: props.destinationId,
    type: props.type
}))

watch(beds, val => {
    if (val.destination.bedrooms.length == 0) emit('noBed')
})
</script>
<style scoped>
.bot {
    bottom: 118%;
}

.v-enter-from {
    width: 0%;
    opacity: 0;
}

.v-enter-to {
    width: 100%;
    opacity: 1;
}

.v-enter-active {
    transition: all 0.3s ease-out;
}

.v-leave-from {
    width: 100%;
    opacity: 1;
}

.v-leave-to {
    width: 0%;
    opacity: 0;
}

.v-leave-active {
    transition: all 0.3s linear;
}
</style>