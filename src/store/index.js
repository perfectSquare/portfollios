import { defineStore } from 'pinia'
import { useLocalStorage } from "@vueuse/core"

export const useAppStore = defineStore('appStore', {
  state: ()=>{
    return{      
    carts: useLocalStorage('carts', []),
    transD : 'transMor p-2 bg-white',    
    ballC : `relative ft bg-l3 text-center text-black text-sm rounded-md ring-1 
             ring-gray-600 hover:bg-gr-1 transform 
             hover:scale-105 sm:hover:scale-125 hover:z-50 cell pad transition-transform duration-500`,
    infoC : `hidden infoAnimation z-10 absolute top-12 left-12 sm:left-32 p-2 bg-gradient-to-r 
             from-s1 to-l1 text-black rounded-lg text-xl md:text-3xl`,    
    speaker: '/assets/components/soundMor.png',    
    pDivSame: `z60 scrollStyle flex flex-col gap-y-2 md:gap-y-4 fixed w-full top-12 h-5/6
                overflow-y-scroll overscroll-y-auto overflow-x-hidden p-2`,
    bombDiv: `sticky top-2 z-10 p-2 flex justify-center gap-x-2 md:gap-x-4 bg-l3`,

    pDivDiff:'bg-d2 ring-2 ring-offset-2 ring-white rounded-lg',
    givenHid:'hidden p-2 ring-2 ring-black rounded-lg bg-n8 text-white',
    info:'me inline-flex justify-around w-full p-2 text-2xl bg-l3 rounded-lg ring-2 ring-black',
    ////////////////////math///////////////////
    hidClass: 'hidden w-6 h-6 text-xxs text-center flex items-center justify-center cell rounded-lg ring-1 ring-gray-900 bg-white hover:scale-110 transition-all duration-300',
    job: 'cell inline-block text-black relative transform hover:scale-125 transition-all duration-300',
    jobDone: 'text-white z-10 hidden absolute p-1 md:p-2 text-xl md:text-2xl xl:text-3xl text-center rounded-lg ring-1 md:ring-offset-1 ring-black md:ring-offset-blue-900 bg-n8',
    ////////////////////math///////////////////
    }
  },
  getters:{
    getN (state) {      return state.carts.length    },
    getTotalPrice(state) {
      let t = 0;
      state.carts.forEach((c) => {
          t += c.price;
      })
      return t;
    },
  },
  actions:{
    updateCart(x){      this.carts.push(x)    },
    offCart(x){
      this.carts = this.carts.filter((c) => {
        return !(c.name == x.name)
      })
    },
    mathMor(state){
      // this.hidClass = 'hidden w-6 h-6 flex justify-center items-center text-sm cell rounded-lg ring-1 md:ring-offset-1 ring-black md:ring-offset-blue-900 transf orm hover:scale-110 transition-all duration-300'
      this.job = 'cell inline-block text-black relative transform hover:scale-125 transition-all duration-300'
      this.jobDone = 'text-white z-10 hidden absolute p-1 md:p-2 text-xl md:text-2xl xl:text-3xl text-center rounded-lg ring-1 md:ring-offset-1 ring-black md:ring-offset-blue-900 bg-n8'
    },
    mathDark(state){
      // this.hidClass = 'hidden w-6 h-6 flex justify-center items-center text-sm cell rounded-lg ring-1 md:ring-offset-1 ring-white md:ring-offset-black bg-gray-800 transform hover:scale-110 transition-all duration-300'
      this.job = 'cell inline-block text-white relative transform hover:scale-125 transition-all duration-300'
      this.jobDone = 'text-white z-10 hidden absolute p-1 md:p-2 text-xl md:text-2xl xl:text-3xl text-center rounded-lg ring-1 md:ring-offset-1 ring-white md:ring-offset-black bg-gray-800'
    },
    mathDeep(state){
      // this.hidClass = 'hidden w-6 h-6 flex justify-center items-center text-sm cell rounded-lg ring-1 md:ring-offset-1 ring-white md:ring-offset-blue-900 bg-s8 transform hover:scale-110 transition-all duration-300'
      this.job = 'cell inline-block text-white relative transform hover:scale-125 transition-all duration-300'
      this.jobDone = 'text-white z-10 hidden absolute p-1 md:p-2 text-xl md:text-2xl xl:text-3xl text-center rounded-lg ring-1 md:ring-offset-1 ring-white md:ring-offset-blue-900 bg-s8'
    },
    mathClouds(state){
      // this.hidClass = 'hidden w-6 h-6 flex justify-center items-center text-sm cell rounded-lg ring-1 md:ring-offset-1 ring-black md:ring-offset-blue-900 bgCloud transform hover:scale-110 transition-all duration-300'
      this.job = 'cell inline-block text-black relative transform hover:scale-125 transition-all duration-300'
      this.jobDone = 'text-black z-10 hidden absolute p-1 md:p-2 text-xl md:text-2xl xl:text-3xl text-center rounded-lg ring-1 md:ring-offset-1 ring-black md:ring-offset-blue-900 bgCloud'
    },
    //////////////////////////////////////bomb/////////////////////////////////////
    bombMor(state){
      this.pDivDiff = 'bg-d2 ring-2 ring-offset-2 ring-white rounded-lg'
      this.givenHid = 'hidden p-2 ring-2 ring-black rounded-lg bg-n8 text-white'
      this.info = 'me inline-flex justify-around w-full p-2 text-2xl bg-l3 rounded-lg ring-2 ring-black'
    },
    bombDark(state){
      this.pDivDiff = 'bg-gray-800 ring-2 ring-offset-2 ring-white rounded-lg'
      this.givenHid = 'hidden p-2 ring-2 ring-white rounded-lg bg-d4'
      this.info = 'me inline-flex justify-around w-full bg-d2 p-2 text-2xl rounded-lg ring-2 ring-white'
    },
    bombDeep(state){
      this.pDivDiff = 'bg-s6 ring-2 ring-offset-2 ring-black rounded-lg'
      this.givenHid = 'hidden p-2 ring-2 ring-white rounded-lg bg-s9'
      this.info = 'me inline-flex justify-around w-full bg-d2 p-2 rounded-lg text-2xl ring-2 ring-white'
    },
    bombClouds(state){
      this.pDivDiff = 'bgCloud'
      this.givenHid = 'hidden p-2 ring-2 ring-white rounded-lg'
      this.info = 'me inline-flex justify-around w-full text-2xl p-2 bg-l3 rounded-lg ring-2 ring-black'
    },
    //////////////////////////////////////bomb/////////////////////////////////////
    forMorning(state){
      this.transD = 'transMor p-2 bg-white'
      this.ballC = 'relative ft bg-l3 text-center text-black text-sm rounded-md ring-1 ring-gray-600 hover:bg-gr-1 transform hover:scale-105 sm:hover:scale-125 hover:z-50 cell pad transition-transform duration-500'
      this.infoC = 'hidden infoAnimation z-10 absolute top-12 left-12 sm:left-32 p-2 bg-gradient-to-r from-s1 to-l1 text-black rounded-lg text-xl md:text-3xl';      
      this.speaker = '/assets/components/soundMor.png'
    },
    forDark(state){
      this.transD = 'transDark rounded-xl p-2'                          
      this.ballC = 'relative ft bg-l1 text-center text-black text-sm rounded-md border border-gray-400 hover:border-white hover:bg-d2 hover:text-white transform hover:scale-105 sm:hover:scale-125 hover:z-50 cell pad transition-transform duration-500';
      this.infoC = 'hidden infoAnimation z-10 absolute top-12 left-12 sm:left-32 p-2 bg-gradient-to-r from-gray-800 to-d2 ring-2 ring-offset-1 ring-white text-white text-xl md:text-3xl';                
      this.speaker = '/assets/components/soundDark.png'
    },
    forDeep(state){
      this.transD = 'transDeep rounded-xl p-2'      
      this.ballC = 'relative ft bg-l5 text-center text-sm rounded-md text-white boxShadeDeep transform hover:scale-105 sm:hover:scale-125 hover:bg-s6 hover:z-50 cell pad transition-transform duration-500';
      this.infoC = 'hidden infoAnimation z-10 absolute top-12 left-12 sm:left-32 p-2 bg-gradient-to-r from-s5 to-s6 ring-2 ring-white ring-offset-1 text-white text-xl md:text-3xl';      
      this.speaker = '/assets/components/soundDark.png'
    },
    forClouds(state){
      this.transD = 'transClouds rounded-xl p-2'      
      this.ballC = 'relative ft cloud text-center text-sm rounded-md boxShadeDeep transform hover:scale-105 sm:hover:scale-125 hover:z-50 cell pad transition-transform duration-500';
      this.infoC = 'rounded-xl hidden infoAnimation z-10 absolute top-12 left-12 sm:left-32 p-2 infoCloud text-black text-xl md:text-3xl';      
      this.speaker = '/assets/components/soundDark.png'
    }
  }
})
