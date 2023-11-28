
<template><div class="mainDiv overflow-x-hidden shadow-gray-400 drop-shadow-xl bg-white" :key='gridKey'>    
    <div v-if='spinShow' class='spinDiv'> <div class='spin1'> <div></div> <div></div> </div> </div>
    <div class="optionsDiv drop-shadow-lg">

        <div class="columnsDiv">
            <img :src="columnIcon" alt='' class='colIcon' @click='columnsClick'>
            <Transition name='colsOptionsTransition'>
                <div v-if='colsOptions' class="flex gap-x-2 origin-left">
                <template v-for="(hd,k) in headsIndexes" :key="k">
                    <div 
                        class="text-sm cursor-pointer"
                        @click="updateField($event,hd)"
                        :class="{'textGreen' : hd.marker, 'textRed' : !hd.marker}"
                    >{{hd.head}}</div>
                </template>
                </div>    
            </Transition>
        </div>

        <div style="position:absolute; right:4px; display:flex; justify-content:center; align-items:center; gap:10px;">
            <div style="display:flex; align-items:center; position:relative;">
                <input 
                    @focus='globalSearchInputFocused' 
                    @blur='globalSearchInputFocusedOff'
                    @change='globalSearchInputtaken'
                    type="text" 
                    name="" 
                    v-model='globals' 
                    class='globalSearchInputClass'
                >
                <div style="position:absolute; bottom:1px; right:0px; cursor:pointer; opacity: 0; transition: all 0.5s linear;" @click='globalSearchCross'>&#10008;</div>
            </div>
            <img class='logoClass' src="/assets/logo.png" title='logo'>
        </div>
        <!-- <div style="position:absolute; left:34px;">sort</div> -->
    </div>

    <!-- grid -->
    <div class="flex gap-x-2 mt-2">
    <template v-for="(data,i) in gridData" :key="i">
        <div 
            class="flex flex-col gap-y-2" 
            :class="`w${Math.floor(100 / heads.length)}`">
            <div class="headingStyle text-sm rounded p-0.5 text-center text-ellipsis overflow-hidden">{{data.a}}</div>
            <template v-for="(val,j) in data.b" :key="j">
                <div class="flex flex-col gap-y-4">
                    <div 
                        class="h-6 overflow-hidden cursor-pointer p-0.5 text-center"
                        @mouseenter="(e)=>{e.target.nextSibling.classList.remove('hidden')}"
                        @mouseleave="(e)=>{e.target.nextSibling.classList.add('hidden')}"
                        @click="dataClicked(data.a, val)"
                    >{{val}}</div>
                    <div class="hidden z-40 absolute bg-white drop-shadow-md p-0.5 text-sm text-center rounded cursor-pointer transition-all duration-300">{{val}}</div>
                </div>                
            </template>            
        </div>    
    </template>
    </div>
    <!-- grid -->

    <!-- pagination -->
    <!-- <div class="pagingDiv">
        <div class='pagingButton' @click="paginateLeftClick">&#10094;</div>
        <div 
            v-for='p in pages' 
            :key='p'
            class='pagingButton'
            :class='{"paginatedButton": currentPage == p}'
            @click="paginateClick($event,p)"
        >
            {{p}}
        </div>
        <div class='pagingButton' @click="paginateRightClick">&#10095;</div>
        <div style="position: absolute; right: 5%; font-size:12px">{{dataItemsCount}} items, {{pages}} pages</div>
    </div> -->
    <div class="pagingDiv">
        <div class='pagingButton' @click="paginateLeftClick">&#10094;</div>
        <div 
            v-for='p in finalPageButtons' 
            :key='p'
            class='pagingButton'
            :class='{"paginatedButton": currentPage == p}'
            @click="paginateClick($event,p)"
        >
            {{p}}
        </div>
        <div class='pagingButton' @click="paginateRightClick">&#10095;</div>
        <div style="position: absolute; right: 5%; font-size:12px">{{dataItemsCount}} items, {{pages}} pages</div>
    </div>
    <!-- pagination -->

<Teleport to='#dash'>
    <Transition name='telT'>
        <div class='telDiv' v-if='showTel' @click.self='showTel = false'>    
            <div class="telContentDiv animateContent p-8">
                <div @click='showTel = false' class='flex w-6 h-6 text-white rounded-full justify-center items-center cursor-pointer hover:scale-125'>&#9874;</div>
                <div>End point search can be made for data <b>{{dataToSearch}}</b> <span v-if='columnToSearch != ""'>under column <b>{{columnToSearch}}</b></span> </div>
            </div>
        </div>
    </Transition>
</Teleport>


</div></template>

<script setup>
    import { ref, computed, onMounted, watch } from 'vue'
    import axios from 'axios'
    
    const props = defineProps({
        dataEnd: String,
        rows: Number,
        pageButtons: Number,
    })

    const spinShow = ref(false)
    const showTel = ref(false)
    const colsOptions = ref(false)
    const dataEndPoint = ref('')
    const heads = ref([])
    const headsMarker = ref(true)
    const headsIndexes = ref([])
    const headers = ref([])
    const dummy = ref([])
    const limit = ref(0)
    const start = ref(0)
    const pages = ref(0)    
    const dataItemsCount = ref(0)
    const currentPage = ref(1)
    const gridKey = ref(0)
    const columnIcon = ref('/assets/grid/columns1.png')
    const globals = ref('')
    const rightPageMarker = ref(false)

    const allData = async () => {
        // for data items count
        await axios.get(`${dataEndPoint.value}`)
            .then((res)=>{ dataItemsCount.value = res.data.length })
            .catch((err)=>{ dataItemsCount.value = 5 })
        // for data items count
        spinShow.value = true        
        await axios.get(`${dataEndPoint.value}?_limit=${limit.value}&_start=${start.value}`)
        .then((res) => {
            dummy.value = res.data
            // pages.value = Math.ceil(dataItemsCount.value / props.rows)
            pages.value = Math.ceil(dataItemsCount.value / props.rows)

            if(headsMarker.value){
                for(let d in res.data[0]){
                    heads.value.push(d)                
                }    
                for(let i=0; i<heads.value.length; i++){
                    headsIndexes.value.push({
                        id: i,
                        head: heads.value[i],
                        marker: true
                    })
                }
            }            
            
            headers.value = []        
            let result = []
            heads.value.forEach((h)=>{
                result.push(getFields(dummy.value, h))
            })            

            for(let i=0; i<heads.value.length; i++){
                headers.value.push({
                    a: heads.value[i],
                    b: result[i]
                })
            }

        })
        .catch((err) => { console.log(err) })
        spinShow.value = false
    }

    const finalPageButtons = computed(()=>{
        let dots = []
        if(props.pageButtons && props.pageButtons < pages.value){
            for(let i=1; i<props.pageButtons+1; i++) dots.push(i)
        }
        else{
            for(let i=1; i<pages.value+1; i++) dots.push(i)  
        }
        if(rightPageMarker.value){
            let mainCondition = pages.value - Math.floor(props.pageButtons/2)
            let innerCondition = props.pageButtons - Math.floor(props.pageButtons/2)
            if(props.pageButtons %2 == 0){                
                if(currentPage.value <= mainCondition+1){                                        
                    if(currentPage.value > innerCondition){
                        dots = []
                        for(
                            let i = currentPage.value - innerCondition; 
                            i < currentPage.value + innerCondition; 
                            i++
                        ) dots.push(i)                            
                    }                
                }
                else{
                    dots = []
                    for(
                        let i = pages.value - props.pageButtons + 1; 
                        i < pages.value+1; 
                        i++
                    ) dots.push(i)
                }    
            }
            else{
                if(currentPage.value <= mainCondition){
                    if(currentPage.value >= innerCondition){
                        dots = []
                        for(
                            let i = currentPage.value - innerCondition+1; 
                            i < currentPage.value + innerCondition; 
                            i++
                        ) dots.push(i)
                    }
                }
                else{
                    dots = []
                    for(
                        let i = pages.value - props.pageButtons + 1; 
                        i < pages.value+1; 
                        i++
                    ) dots.push(i)
                } 
            }            
        }
        rightPageMarker.value = false
        return dots
    })

    const gridData = computed(()=>{
        headers.value = []        
        let result = []
            heads.value.forEach((h)=>{
                result.push(getFields(dummy.value, h))
            })            

            for(let i=0; i<heads.value.length; i++){
                headers.value.push({
                    a: heads.value[i],
                    b: result[i]
                })
            }
        return headers.value
    })

    function getFields(list, field) {
        return list.reduce(function(carry, item) {
            if (typeof item === 'object' && field in item) {
                carry.push(item[field]);
            }
           return carry;
        }, []);
    }
    
    const updateField = (e,field) => {
        // for (let item of e.target.parentElement.previousElementSibling.children) {
        //     item.classList.remove('animateColumn')
        // }
        if(field.marker){
            // document.getElementById(`columnsID${field.id}`).classList.remove("animateColumn")
            heads.value = heads.value.filter( h => h != field.head )
            field.marker = false            
        }
        else{            
            heads.value.splice(field.id, 0, field.head)
            field.marker = true
            // document.getElementById(`columnsID${field.id}`).classList.add("animateColumn")                        
        }        
    }

    const paginateClick = (e,p) => {
        currentPage.value = p
        for(let el of e.target.parentElement.children){
            el.classList.remove('paginatedButton')
        }
        e.target.classList.add('paginatedButton')

        spinShow.value = true
        headsMarker.value = false
        start.value = (limit.value * p) - limit.value
        allData()
    }

    const paginateLeftClick = () => {            
        if(currentPage.value <= 1) return
        rightPageMarker.value = true            
        spinShow.value = true
        headsMarker.value = false
        currentPage.value--
        start.value = (limit.value * currentPage.value) - limit.value
        allData()
    }

    const paginateRightClick = () => {            
        if(currentPage.value >= pages.value) return
        rightPageMarker.value = true
        spinShow.value = true
        headsMarker.value = false
        currentPage.value++
        start.value = (limit.value * currentPage.value) - limit.value
        allData()
    }

    const columnMarker = ref(1)
    const columnsClick = () => {
        columnMarker.value++
        if(columnMarker.value %2 == 0){
            colsOptions.value = true
            columnIcon.value = '/assets/grid/columns2.png'
        }
        else{
            colsOptions.value = false
            columnIcon.value = '/assets/grid/columns1.png'
        }
    }

    // search
    const dataToSearch = ref('')
    const columnToSearch = ref('')
    const dataClicked = (field, td) => {
        dataToSearch.value = td
        columnToSearch.value = field
        showTel.value = true
    }

    // const compareForAllDown = (p) => {
    //     return function(a,b) {
    //         if (a[p] < b[p]) return -1;
    //         if (a[p] > b[p]) return 1;
    //         return 0;
    //     };
    // }
    // const compareForAllUp = (p) => {
    //     return function(b,a) {
    //         if (a[p] < b[p]) return -1;
    //         if (a[p] > b[p]) return 1;
    //         return 0;
    //     };
    // }

    const globalSearchInputFocused = (e) => {
        e.target.nextElementSibling.style.opacity = 1
    }
    const globalSearchInputFocusedOff = (e) => {
        e.target.nextElementSibling.style.opacity = 0
        globals.value = ''
    }
    const globalSearchCross = () => {
        globals.value = ''
    }
    const globalSearchInputtaken = () => {
        dataToSearch.value = globals.value
        columnToSearch.value = ''
        showTel.value = true
    }

    onMounted(() => {        
        limit.value = props.rows
        dataEndPoint.value = props.dataEnd
        allData()
    })

    watch(() => props.rows, (n) => {
        limit.value = n
        gridKey.value++
        headsMarker.value = false
        allData()
    })

    watch(() => props.dataEnd, (n) => {
        dataEndPoint.value = n
        gridKey.value++
        heads.value = []
        headsIndexes.value = []
        headsMarker.value = true
        allData()
    })

    
</script>

<style scoped>
    .spinDiv{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    .spin, .spin1{
        display:flex;
        gap:4px;
    }
    .spin1{ animation:spin3A 1s linear infinite; width:50px; height:50px; border:2px solid red; border-radius:100%; }   
    .spin1 div:nth-child(1){ 
        width:8px; 
        height:8px; 
        background-color: red; 
        border-radius:100%; 
        position:absolute; 
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);       
    }
    .spin1 div:nth-child(2){ 
        width:0px; 
        height:45%; 
        border:2px solid red;       
        position:relative; 
        left:50%; 
        top:25%; 
        transform: translate(-50%, -25%);         
    }
    @keyframes spin3A{
        0%{  transform:rotate(0deg); }
        100%{  transform:rotate(360deg); }
    }
    .mainDiv{
        position: relative;
        width: 94%;
        left:3%;
        padding: 5px;
        border: 1px solid rgb(52, 50, 77, 0.2);
        border-radius: 3px;
    }        
    .pagingDiv{
        padding: 1.5% 0 1% 3%;
        position: relative;        
        display: flex;
        align-items: center;
        column-gap: 5px;
        margin-top: 5px;
    }
    .pagingButton{
        font-size: 12px;
        cursor: pointer;
        padding:5px;
        border-radius:50%;
        width: 25px;
        height: 25px;
        background-color: #f2f2f2;
        color:black;
        display:flex;
        justify-content: center;
        align-items: center;
        transition: all 0.3s linear;
    }
    .pagingButton:hover{
        background-color: #f91f1f;
        color:white;
    }
    .paginatedButton{
        background-color: #f91f1f;
        color:white;   
    }
    .optionsDiv{
        position: relative;
        display: flex;
        align-items: center;
        gap: 5px;
        padding: 15px 0 15px 10px;        
        background-color: rgb(242, 242, 242, 0.4);
    }
    .columnsDiv{
        position: absolute;
        display: flex;
        gap:5px;
        width:100%;
        display: flex;
        align-items: center;
    }
    .colIcon{
        width: 16px;
        height: 16px;
        cursor: pointer;
    }
    .colSortIcon{
        width: 14px;
        height: 16px;
        cursor: pointer;
    }
    .colsOptionsClass{
        position: absolute;
        left: 1.9%;
        bottom: -8px;
        display: flex;
        gap: 10px;
        align-items: center;
        background-color: #f2f2f2;        
        padding: 8px;
        border-radius: 5px;
        border-bottom: 1px solid #666666;
        transform-origin: left;
    }
    .allHeadsClass{
        cursor: pointer;
        color: green;
    }
    .selectedColumn{
        color: red;
    }
    .forHeadSpanClass{
        background-color: red;
        border-radius:10px;
        color:white;
        transition: all 0.5s linear;
    }
    .forHeadSpanClassOff{
        background-color: white;
        border-radius:0px;
        color:black;
        transition: all 0.5s linear;
    }
    .hClass{        padding: 5px;    }
    .hPadClass{        padding: 5px; cursor: pointer;    }
    .logoClass{
        width: 20px;
        height: 20px;        
    }
    .sortMarkerClass{
        position: absolute;
        top: -4%;
        left: 5%;
        display: none;
    }
    .filterInputClass{
        border: 1px solid transparent;
        outline: 1px solid transparent;
        border-bottom: 1px solid gray;
    }

    .globalSearchInputClass{
        outline: none;
        border: none;
        font-size:12px;
        border-bottom: 1px solid gray;
        box-shadow:0 0 0 white;
        transition: all 0.5s linear;
    }
    .globalSearchInputClass:focus{
        border-bottom: 1px solid red;
        box-shadow:0 1px 0 red;
    }

    .textGreen{
        color: #2d5986;
        text-shadow: 0px 0px 1px #e6e6e6;
        padding: 2px 4px;
    }
    .textGreen:hover{
        box-shadow: 3px 3px 6px #b3b3b3;
        border-radius: 6px;
    }

    .textRed{
        color: #ff3300;
        text-shadow: 0px 0px 1px #b3b3b3;
        padding: 2px 4px;
    }
    .textRed:hover{
        box-shadow: 3px 3px 6px rgb(255, 51, 0, 0.3);
        border-radius: 6px;
    }

    .headingStyle{
        background-color: #474b52;
        text-shadow: 1px 1px 2px #595959;
        color: white;
        box-shadow: 3px 3px 6px white inset;
    }

    .telDiv{
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0%;
        left: 0%;
        background-color: rgb(230, 230, 230, 0.4);
    }

    .telContentDiv{
        background-color: #4d4d4d;
        color:white;
        outline: 1px solid #d9d9d9;
        z-index: 5;
        box-shadow: 12px 12px 14px white inset;
        border-radius: 4px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        transform-origin: center;
    }    

    .telT-enter-from, .telT-leave-to{        opacity: 0; height:0%;   }
    .telT-enter-active, .telT-leave-active{        transition: all 0.5s ease-out;    }

    .animateContent{
        animation: animateContentFrames 1s ease-out forwards;
    }
    @keyframes animateContentFrames{
        0%{ top: 0%;   }
        100%{ top: 50%;  }
    }

    .colsOptionsTransition-enter-from, .colsOptionsTransition-leave-to{ opacity:0; transform:scale(0,0); }
    .colsOptionsTransition-enter-to, .colsOptionsTransition-leave{ opacity:1; transform:scale(1,1); }    
    .colsOptionsTransition-enter-active{ transition: all 0.3s linear; }
    .colsOptionsTransition-leave-active{ transition: all 0.5s linear; }

    .animateColumn{
        animation: animateColumnFrames 1s ease-out;
    }
    @keyframes animateColumnFrames{
        0%{ transform: rotateY(180deg); opacity:0; }
        100%{ transform: rotateY(360deg); opacity:1 }
    }

    .w10{ width: 10%;  }
    .w11{ width: 11%;  }
    .w12{ width: 12%;  }
    .w13{ width: 13%;  }
    .w14{ width: 14%;  }
    .w15{ width: 15%;  }
    .w16{ width: 16%;  }
    .w17{ width: 17%;  }
    .w18{ width: 18%;  }
    .w19{ width: 19%;  }
    .w20{ width: 20%;  }
    .w21{ width: 21%;  }
    .w22{ width: 22%;  }
    .w23{ width: 23%;  }
    .w24{ width: 24%;  }
    .w25{ width: 25%;  }
    .w26{ width: 26%;  }
    .w27{ width: 27%;  }
    .w28{ width: 28%;  }
    .w29{ width: 29%;  }
    .w30{ width: 30%;  }
    .w31{ width: 31%;  }
    .w32{ width: 32%;  }
    .w33{ width: 33%;  }
    .w34{ width: 34%;  }
    .w35{ width: 35%;  }
    .w36{ width: 36%;  }
    .w37{ width: 37%;  }
    .w38{ width: 38%;  }
    .w39{ width: 39%;  }
    .w40{ width: 40%;  }
    .w41{ width: 41%;  }
    .w42{ width: 42%;  }
    .w43{ width: 43%;  }
    .w44{ width: 44%;  }
    .w45{ width: 45%;  }
    .w46{ width: 46%;  }
    .w47{ width: 47%;  }
    .w48{ width: 48%;  }
    .w49{ width: 49%;  }
</style>










