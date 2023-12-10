<template><div class="relative p-1 sm:p-2 w-full flex">
  <!-- left -->
  <div class="leftFT relative flex flex-col items-center gap-y-2 ring-1 ring-gray-300 rounded-sm">
    <div class='flex flex-col items-center pl-1 pr-1 pb-1 pt-2 gap-y-2 sticky top-[0%] transition-all duration-300'>
    <div @click="detailsOff = !detailsOff" class='hidden md:flex cursor-pointer w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 items-center justify-center transition-all duration-300'>&#9776;</div>    
      <div class="hidden md:flex md:flex-col gap-y-2">
        <Transition name='leftT' mode='out-in'>
        <div v-if='detailsOff' class="flex flex-col gap-y-2 pl-1 pr-1 w-[40px] md:w-[110px]">
        <template v-for="(tx,i) in texts" :key='i'>
          <div 
            :class='[tx.clicked && tx.title != "HTML" ? leftTextClicked : leftTextNotClicked]'
            @click='textClicked(tx.title, tx)'
          >
          {{tx.title}}
          </div>  
            <Transition name='htmlT'>
            <div v-if='htmlShow && tx.elements' class='origin-top flex flex-col gap-y-1 ring-1 ring-gray-300 rounded-sm pt-1 pb-1 pl-2 pr-2 tems-center'>
            <template v-for="(ht,j) in tx.elements" :key='j'>
              <div 
                :class='[ht.clicked ? leftTextClicked : leftTextNotClicked]'
                @click='textClicked(ht.title, ht)'
              >
              {{ht.title}}
              </div>  
            </template>
            </div>
            </Transition>
        </template>        
        </div>
        <div v-else class="relative flex flex-col gap-y-2">
          <template v-for="(tx,j) in texts" :key='j'>
          <div 
            :class='leftIconParent' 
            @click='textClicked(tx.title, tx)'
            :title='tx.title'
          >
          <img :src="tx.image" :class="leftIconImage">
          </div>  

          <Transition name='htmlT'>
          <div v-if='htmlShow && tx.elements' class='origin-top flex flex-col gap-y-2 pl-1 -ml-0.5 border-l-2 border-gray-400 rounded-sm items-center'>
          <template v-for="(ht,j) in tx.elements" :key='j'>
            <div 
              class='cursor-pointer hover:scale-125 transition-all duration-300'
              @click='textClicked(ht.title, ht)'
              :title='ht.title'
            >
            <img :src="ht.image" class="w-[30px]">
            </div>  
          </template>
          </div>
          </Transition>



        </template>    
        </div>
        </Transition>
      </div>

    <div class="relative flex flex-col md:hidden gap-y-2">      
      <template v-for="(tx,j) in texts" :key='j'>
        <div 
          :class='leftIconParent' 
          @click='textClicked(tx.title, tx)'
          :title='tx.title'
        >
        <img :src="tx.image" :class="leftIconImage">
        </div>  
      </template>
    </div>    
    </div>
  </div>  
  <!-- left -->

  <div class='p-2 w-full flex flex-col gap-y-4'>
    <div class='naeemFT flex gap-x-4 p-2 shadow-md items-center'>
      <div class="text-3xl">Naeem bin Adam</div>
      <div>portfollio projects</div>      
    </div>
    <ChartDemo v-if='chartsShow' />
    <DataGridDemo v-if='gridShow' />    
    <UrduTyper v-if='urduShow' />    
    <Air v-if='airShow' />
    <Amazon v-if='amazonShow' />
    <Dash v-if='dashShow' />
    <EComm v-if='ecommShow' />
    <ToDos v-if='todosShow' />

    <ButtonsDemo v-if='buttonsShow' />    
    <InputDemo v-if='inputShow' />    
    <TabsDemo v-if='tabsShow' />    
  </div>  
  <router-view></router-view>
</div></template>

<script setup>
  import { ref } from 'vue'
  import DataGridDemo from '/src/components/data-grid/DataGridDemo.vue'
  import ChartDemo from '/src/components/data-grid/charts/ChartDemo.vue'
  import UrduTyper from '/src/components/urdu_typing/UrduTyper.vue'
  import Air from '/src/components/airbnb-copy/Air.vue'
  import Amazon from '/src/components/amazon-copy/Amazon.vue'
  import Dash from '/src/components/dashboard/Dash.vue'
  import EComm from '/src/components/ecomm/EComm.vue'
  import ToDos from '/src/components/todos/ToDos.vue'
  // html
  import ButtonsDemo from '/src/components/html/buttons/ButtonsDemo.vue'
  import InputDemo from '/src/components/html/input/InputDemo.vue'
  import TabsDemo from '/src/components/html/tabs/TabsDemo.vue'
  // html

  const detailsOff = ref(true)
  const chartsShow = ref(true)
  const gridShow = ref(false)
  const urduShow = ref(false)
  const airShow = ref(false)
  const amazonShow = ref(false)
  const dashShow = ref(false)
  const ecommShow = ref(false)
  const todosShow = ref(false)
  const htmlShow = ref(false)
  const buttonsShow = ref(false)
  const tabsShow = ref(false)
  const inputShow = ref(false)

  const leftTextClicked = ref('b1 pr-1 pl-1 rounded-r-2xl ronded-b-2xl transition duration-500')
  const leftTextNotClicked = ref('cursor-pointer b2 pr-1 pl-1 rounded-r-2xl ronded-b-2xl transition duration-500')  
  const leftIconParent = ref('cursor-pointer w-8 h-8 rounded-full hover:bg-gray-100 hover:border-transparent border border-gray-100 flex items-center justify-center transition-all duration-300')
  const leftIconImage = ref('w-[12px] h-[14px]')

  const texts = ref([
    { title: 'charts', clicked: true, image:'/assets/charts.png' },
    { title: 'grid', clicked: false, image:'/assets/grid.png' },
    { title: 'airbnb', clicked: false, image:'/assets/airbnb.png' },
    { title: 'amazon', clicked: false, image:'/assets/amazon.png' },
    { title: 'urdu typer', clicked: false, image:'/assets/urdu.png' },
    { title: 'dashboard', clicked: false, image:'/assets/logo.png' },
    { title: 'e-commerce', clicked: false, image:'/assets/cart1.png' },
    { title: 'todos', clicked: false, image:'/assets/todo.png' },
    { title: 'HTML', clicked: false, image:'/assets/html/html.png', 
      elements:[
        { title: 'button', clicked: false, image:'/assets/html/y.png' },
        { title: 'input', clicked: false, image:'/assets/todo.png' },
        { title: 'tabs', clicked: false, image:'/assets/todo.png' },        
        // { title: 'button1', clicked: false, image:'/assets/todo.png' },
        // { title: 'button1', clicked: false, image:'/assets/todo.png' },
        // { title: 'button1', clicked: false, image:'/assets/todo.png' },
        // { title: 'button1', clicked: false, image:'/assets/todo.png' },
      ] 
    },
  ])

  const setForElement = (elem) => {
    texts.value.forEach((d)=>{ 
        if(d.title == 'HTML'){
          d.elements.forEach(el => el.clicked = false)
        }          
      })
    texts.value.forEach((d)=>{ 
        if(d.title == 'HTML'){
          d.elements.forEach((el)=>{
            if(el.title == elem) el.clicked = true
          })
        }          
      })      
  }

  const textClicked = (t,tx) =>{
    texts.value.forEach((d)=> d.clicked = false)
    tx.clicked = true
    if(t == 'charts'){
      chartsShow.value = true
      gridShow.value = urduShow.value = airShow.value = amazonShow.value = dashShow.value = ecommShow.value = todosShow.value = htmlShow.value = buttonsShow.value = tabsShow.value = inputShow.value = false  
    }
    else if(t == 'grid'){
      gridShow.value = true
      chartsShow.value = urduShow.value = airShow.value = amazonShow.value = dashShow.value = ecommShow.value = todosShow.value = htmlShow.value = buttonsShow.value = tabsShow.value = inputShow.value = false          
    }
    else if(t == 'urdu typer'){
      urduShow.value = true
      chartsShow.value = gridShow.value = airShow.value = amazonShow.value = dashShow.value = ecommShow.value = todosShow.value = htmlShow.value = buttonsShow.value = tabsShow.value = inputShow.value = false    
    }    
    else if(t == 'airbnb'){
      airShow.value = true
      chartsShow.value = gridShow.value = urduShow.value = amazonShow.value = dashShow.value = ecommShow.value = todosShow.value = htmlShow.value = buttonsShow.value = tabsShow.value = inputShow.value = false      
    }
    else if(t == 'amazon'){
      amazonShow.value = true
      gridShow.value = urduShow.value = airShow.value = chartsShow.value = dashShow.value = ecommShow.value = todosShow.value = htmlShow.value = buttonsShow.value = tabsShow.value = inputShow.value = false      
    }
    else if(t == 'dashboard'){
      dashShow.value = true
      gridShow.value = urduShow.value = airShow.value = chartsShow.value = amazonShow.value = ecommShow.value = todosShow.value = htmlShow.value = buttonsShow.value = tabsShow.value = inputShow.value = false
    }
    else if(t == 'e-commerce'){
      ecommShow.value = true
      gridShow.value = urduShow.value = airShow.value = chartsShow.value = amazonShow.value = dashShow.value = todosShow.value = htmlShow.value = buttonsShow.value = tabsShow.value = inputShow.value = false  
    }
    else if(t == 'todos'){
      todosShow.value = true
      gridShow.value = urduShow.value = airShow.value = chartsShow.value = amazonShow.value = dashShow.value = ecommShow.value = htmlShow.value = buttonsShow.value = tabsShow.value = inputShow.value = false  
    }    
    else if(t == 'HTML'){
      htmlShow.value = !htmlShow.value
    }
    else if(t == 'button'){
      setForElement('button')
      buttonsShow.value = true
      gridShow.value = urduShow.value = airShow.value = chartsShow.value = amazonShow.value = dashShow.value = ecommShow.value = todosShow.value = tabsShow.value = inputShow.value = false  
    }
    else if(t == 'tabs'){
      setForElement('tabs')
      tabsShow.value = true
      gridShow.value = urduShow.value = airShow.value = chartsShow.value = amazonShow.value = dashShow.value = ecommShow.value = todosShow.value = buttonsShow.value = inputShow.value = false  
    }
    else if(t == 'input'){
      setForElement('input')
      inputShow.value = true
      gridShow.value = urduShow.value = airShow.value = chartsShow.value = amazonShow.value = dashShow.value = ecommShow.value = todosShow.value = buttonsShow.value = tabsShow.value = false  
    }

  }
</script>

<style scoped>
  .leftT-enter-from, .leftT-leave-to{ opacity:0; }
  .leftT-enter-active, .leftT-leave-active{ transition: all 0.3s ease-out; }
  .naeemFT{ font-family:'Exo 2';  }
  .leftFT{ font-family:'Inconsolata' }  
.b1{
    background-color:#999999;
    color: black;
    text-shadow: 12px 12px 15px #e6ffff;    
    box-shadow: 22px 22px 22px white inset; 
    border-bottom: 2px solid #d9d9d9;
}

.b2{
    background-color:#999999;
    color: black;
    text-shadow: 12px 12px 15px #e6ffff;    
    box-shadow: 22px 22px 22px white inset; 
    border-bottom: 2px solid #d9d9d9;
  }
.b2:hover{  
    background-color:#4d4d4d;
    box-shadow: 2px 2px 6px white inset; 
    color:white;
    text-shadow: 0 0 5px #e6ffff;    
}
.htmlT-enter-from, .htmlT-leave-to{ opacity:0; transform:scale(0.3,0.3); }
.htmlT-enter-active, .htmlT-leave-active{ transition: all 0.3s ease-out; }
</style>
