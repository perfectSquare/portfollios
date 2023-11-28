import { createRouter, createWebHistory } from 'vue-router'
const routes = [

////////////////////////////////////////////// amazon
{
  path:'/',
  name:'home',
  component: () => import('/src/Home.vue')
},    
{
  path:'/amazon-copy',
  name:'amazon-copy',
  component: () => import('/src/components/amazon-copy/Amazon.vue')
},    
{
  path:'/amazon-copy/electronics/accessories',
  name:'electronics-accessories',
  component: () => import('/src/components/amazon-copy/comps/electronics/Accessories.vue')
},    
{
  path:'/amazon-copy/products/details',
  name:'product-details',
  component: () => import('/src/components/amazon-copy/comps/Details.vue')
},    
////////////////////////////////////////////// amazon  
{
  path:'/airbnb-copy',
  name:'airbnb-copy',
  component: () => import('/src/components/airbnb-copy/Air.vue')
},    
{
  path:'/airbnb-copy/details',
  name:'details',
  component: () => import('/src/components/airbnb-copy/comps/DestDetails.vue')
},    
{
  path:'/airbnb-copy/host/details',
  name:'hostDetails',
  component: () => import('/src/components/airbnb-copy/comps/HostDetails.vue')
},    
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition){
    return savedPosition || { top:0 }
  }
})

export default router
