<template><div class="mainDiv">
   <!-- <div v-if='spinShow' class='spinDiv'> <div class='spin'> <div></div> <div></div> <div></div> </div> </div> -->
    <div v-if='spinShow' class='spinDiv'> <div class='spin1'> <div></div> <div></div> </div> </div>
    <div class="optionsDiv">
        <div class="columnsDiv">
            <img :src="columnIcon" alt='' class='colIcon' @click='columnsClick'>
            <img :src="sortIcon" alt='' class='colSortIcon' @click='sortClick'>
            <img :src="sortUpIcon" alt='' class='colSortIcon' @click='sortUpClick'>
            <img :src="filterIcon" alt='' class='colIcon' @click='filterClick'>
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
                <img class='logoClass' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAbgAAAByCAMAAAAWEDTnAAAA8FBMVEX///8AAADjBxP6+vosLCzj4+Pe3t7x8fGrq6vMzMzT09NnZ2fjAA0eHh7Y2NjkICdFRUWTk5NiYmLgAACioqJycnLdAAC4AADo1NXuwcGwsLDlAAC5ubnhBxXr6+tVVVXFxcW/Dg41NTV8fHw9PT2Li4uamprUAAD25OXojJC0AABZWVkSEhIiIiKQkJCEhITws7gVFRX30tLVpaTgdHbkICn+8PLgsLDmWmDHSEvfpanET1HEAADeIDDdQ0vHWVvrl53lNT7Lamu5EBLFOjrlnZzpbHTxv7/0wcTjYGbpkJLfPELpo6PXKDjjBR33ycoSioN8AAAJwElEQVR4nO2dC1fbNhSAHZuQBJwUcGJGjMkDSNMF2pQBazu6tWN9jtH//28mJ9bDtmRdKSHeObvfOaUk9eMmX64sXcmp4yAIgiAIgiAIgiAIgiAIgiAIgiAIgiAIgiBINTRq7QW11goH6S8PctFbW1iV8Evy49q9ebx5BiC+rTTYRi1lFXHN9Bi7awurCqaHv5Kfnu+7PoTgTaXRojjG28PDKfnrKopdCH4wrzJaFEd5dze6+y355TqIYerCKhtLFJdyezgaje4Wl7n3AURb7Ee/Vxgvikv54240uk8byzBOck6XdrEffqguXhS35Nck4Uajw7fJgxeB78e+zhvpw0TTygJGcQu8w7vR0ty75OHHMHb15kjKfawsYhS34M/D0f3o/j4xlyTRNNI2lKRbSTaJXlQVMYpLOFo2lAl3fyVPfIpiX6OONJXkR/RTRSGjOIJ3z8WN7j4lT72JtBm3TLtnFcWM4pykoRT4+eckiaYhTJwbfK4mZhRHEm5+JPDl6Cp5ch6ARuGxG36tJGgUp+IbpLH0Secz9qoID8Wp8ELdeGCRcH4cfasiPBSn5GtAsgnSXlZSbUZxaq6jRZdf315WUUBBcWq8Z7qxXEpYQbUZxZVwFQDNBZ82HhuKK+MFbFI1doONN5YorpRkak5b/EoqX/9sOjIUV8pVkBYlS7XFxNymq80orpzvgQtIODIOj642GxiK0/B3pBW3mC/fdLUZxWmYhlpx/mKdQ3C9lvM1+ucHgy3OeLY7GZLn99uLh+0J3U4hrnk629JwyTxxcSeTg7G4zeDgvK8r5Q33d2fj4j6ti+VZDuh2vctl6H0ywjre3x1kTkR4fSw5+DbZcKvG2Rrs7nfIAejjHbrd8mxbZ4UjPMAmeIi5H1orWloHNRkXp94k/fVluqVc3L509zwDujkV1xtKt5uVZHP9VH7s3e2d9Lc9uil9TX3VPgVxXvdSumF7wl42FddJH78uhvg7cGrOdVetNtcH6je7nf69n24rE9cYq/cXKYhTcnaiCFWhQIy0IO61ao+8uGPAa8iLaxdjvIVOzUUrTs31AfGWifMuIAeomYgjaSKLtAM5U0Gckqw4bwY4OEScMwemXBytVG1+BYm3TNwe6AA1M3G1V8VIIRlhLa4hbyXzQMQ53yArZB/Jn+crrG2GeSsRB0rYBUbiiuZg3izFecoGNQtI3K2+Z7lkhRtBQO9hrUwc8BXXTMXVmtlIt4FnsRMHbTZA4pyvkGG4m0zwPFh6qwPjVYvrlO2Vhb2lwE9LPRNqW79D9iwm4ia6bSkwcc5n8AoUy2qz0J8cd1t1znYr24YqxbGXfL5d18C6illxvWGHbdJqCoOoPTHSl8Ie5y3xXK1uxqlC3KRViK/BDn4ibDhoDnc6O52UVj/bZwGK8x4hM6qu7/p/W3nj46i2ZOwkjs6U4qhfkyqIKK5wKWtxDUP+rMf3aOb3EF+HQpy0k8rp8b23C/9YF9UBxTlX0JQLPpSHJoe9tr2G7J93eMBKcfRVTWQHUCCIk1Uv2PVmxp/jbVldsofj8aGkRNylaliYwhNO0pfNnBwsznkRufp1DEntK7SoNrOA24oxPP8kK8XRtCzWftRwcdJM4AND/oaf0ac68kPyjJSIk7oWYB3jmWIDnpFgcc570j3RlpuT5vLGvIDCAlbWmFilQimOSTjrqjjOpzPb58CR0qL/zvKRdaJeyvcQPmNFcV3N28Cv9Mq30ELcNPABOUeIzKvN9Po0Vm7B3jClOPG6ruQgmydM3I4jhzaW5/QJNoaTNukLlCUvtY4Ulq3yhjKBNZZwcc6HSH+z4yLtzKvN9MJQ8pGkTZR6HAcbAZ2KB6XilK96kt+gm7dSZD+/CRWn/VIO9pqKHRMK+3gaiHM+BoCMi2PfDU0bSxrNUL0JbSvV4oADOfHyQcUNHAW0DWdvCw2jpAtED1oQp20pWbOiTufCtA5E3C14gse02gwQR4dPJbXKc5g5YbzApnVUZ6VVkkv6BBVXIoFe5AriJMOHLEyc+oNvJQ44NefHxtXmooQC+ozjIwINvOevnQGn4taScdWJc95Aqs2k9+kbVpsB1zh6BSsTB8y5Lba9uTh60VM2riXXOK04dgFb8zWONJYB7EaQx8is2nyaf63qgEvFOZ1diLkh3dxcHKBXST+F5uIAvUraOTIU58xhKefHgVG1uZ8PpwArWJaLI4aHzZ4CNnZm74u5ONaaKdtK9ThOK453jNc5jlvyLQANCVyzajPLpy3FBrzHqBNXBh3fsuG2uTiWTzVF9YpXWyzEsXGlKiC+YsJUnAedmjOrNrOSgfzaIUz6rCKOFkIK0zoG4tgI+EJqzmNpbSNOV6sUqu2m4pwfkG/ScJN1DN+1cXJ4LXIsqQGKU86riKMXiMJEqoG4Bg9FUpfeEWZzLcQ5/BI9K34uGuIF3Ficcw1bOxT7gck3afAPam3W3BZpdcXlhWpx9W0NdXYlZcM2C3Fiz3XcbYkn6DQzq9RsxInzyb1uZtKu2RMPbiHOuQFNzbluYHIjCHQ9gFpcydK+PGzUYSPOUR01j4046MobG3FH2u+KWiSc6wdG8zuwpawl4rQLBDisK28lDrpGwkqcA1waai7uK+xmRz8ODb9zCDQCW4s4XuCyEgddTmYnzis9JsdU3NFzWENpcV94rzRQyhrE8UGSnTigOTtxzglsMZKhuKPQ9R8BGefbLBrqlkaasro4YZBvKc6R32qQw1Kc44Hmp8zEzQNf/3WItt7I23SmDlR77wBUnFicsRWX7ZkrIrUVB/sEG4n7Amsn48D6lvBjxaetV6edlxXF9TLDI2tx5A1TtOyDYWGYbyzO8V7KD147tyoyz8H9khVu5a/3d7Mdq9fj82GDD5+Ut1np53Quxt3cah0qTrHkhIuT3MTkNIavzrI3f5z1jk9K5uO0E6kircle9mLX3tsflkzryCJMAeYbGQes+hUMnkj+Sd1jNSVn0oZiEqouUjANkfRYeXH6o8+D+On6JQiQojgd89AFfE0zentijMXNn7xfgkAwFTeHTH0nyy6fo7cnxVDcHPLdlQTMt6fGTBy0XxLE6O2JMRJH+iWgudMQvT05JuKg/ZLIr/a/AvxfYCDuAdgv8THfNgBcHLhf4mK+bQCwuHfQfskjetsEUHEPoGWUPulPoreNABT3Lu2XxAuopzj/pfYxetsUMHEPUerNX3Y/KIvfuT4/eobeNgRI3APJt4Wc5f8bETMK1zf1HRDIeoGI+xRFURAkf8IgSH8wQuG5G8y3zbGzpFVy0+qPq5SfVEynwhQfgiAIgiAIgiAIgiAIgiAIgiAIgiAIgiDIf59/AYzV1lpeywo5AAAAAElFTkSuQmCC">
            </div>
            
            <Transition name='colsOptionsTransition'>
            <div v-if='colsOptions' class="colsOptionsClass">
                <div v-for='(col,n) in allHeads' :key='n'>
                    <span  @click='allHeadsClick($event, col)' class='allHeadsClass'>{{col}}</span>
                </div>
            </div>
            </Transition>
        </div>
    </div>
    <table class="tableClass">
        <tr>
            <template v-for="(h,i) in heads" :key='i'>
            <th class='thClass' :title='h'>
                <span @click="enableHClick && headClickForSorting(h)" :class='[headSpanClass, headPadClass]'>{{h}}</span>
                <img src="/assets/grid/sortMarker.png" alt="" class='sortMarkerClass'>
                <!-- <input type="" name="" class="filterInputClass"> -->                
            </th>
            </template>
        </tr>
        <template v-for='(d,j) in gridData' :key='j'>
        <tr>
            <template v-for='(dd,l) in d' :key='l'>
                <td 
                    class='tdClass' 
                    :class="{'hidden': false}"
                    :style=" forTD ? 'cursor: pointer;' : 'cursor: default;' "
                    @click="forTD && tdClicked(dd, l)"
                >{{dd}}</td>
            </template>
        </tr>
        </template>
    </table>
    <!-- pagination -->
    <div class="pagingDiv">
        <div class='pagingButton' @click="paginateLeftClick">&xlarr;</div>
        <template v-for='(p,s) in finalPageButtons' :key='s'>
            <div class='pagingButton' :class='{"paginatedButton": currentPage == p}' @click="paginateClick(p)">{{p}}</div>    
        </template>
        
        <div class='pagingButton' @click="paginateRightClick">&xrarr;</div>
        <div style="position: absolute; right: 5%; font-size:12px">{{noOfDataItems}} items, {{pages}} pages</div>
    </div>
    <!-- pagination -->

</div></template>

<script setup>
    import { ref, computed, onMounted } from 'vue'
    import axios from 'axios'
    // import { paramsDecider } from './paramsDecide'

    const props = defineProps({
        dataEnd: String,
        missFields: Array,
        rows: Number,
        customFields: Array,
        // ssr: Boolean,
        pageButtons: Number,
    })
            const spinShow = ref(false)
            const gridData = ref([])
            const dataForPagination = ref([])
            const dataForSSR = ref([])
            const dataForSorting = ref([])
            const dataForColumns = ref([])
            const heads = ref([])
            const headSpanClass = ref('')
            const headPadClass = ref('hClass')
            const enableHClick = ref(false)
            const allHeads = ref([])
            const allHeadsRef = ref(null)
            const missFieldsData = ref([])
            const noOfDataItems = ref(0)
            const pages = ref(0)
            const offset = ref(0)
            const columnIcon = ref('/assets/grid/columns1.png')
            const columnMarker = ref(1)
            const columnIndex = ref(0)
            const sortIcon = ref('/assets/grid/sortDown1.png')
            const sortUpIcon = ref('/assets/grid/sortUp1.png')
            const sortType = ref('DOWN')
            const sortMarkerDown = ref(1)
            const sortMarkerUp = ref(1)
            const filterIcon = ref('/assets/grid/filter1.png')
            const filterMarker = ref(1)
            const colsOptions = ref(false)
            const sorting = ref(false)
            const globals = ref('')
            const forTD = ref(false)
            const forTDPoint = ref('')
            const forTDField = ref('')
            const finalPageButtons = ref([])
            const currentPage = ref(1)

        const nextArrow = computed(() => {
            if(currentPage.value == pages.value){ return }
            return currentPage.value + 1
        })
        const prevArrow = computed(() => {
            if(currentPage.value == 1){ return }
            return currentPage.value - 1
        }) 

        const tdClicked = async (x,y) => {
            forTDPoint.value = x
            forTDField.value = y
            let params = paramsDecider(props.dataEnd, x, y)
            await axios.get(props.dataEnd, { params: params })
        .then((res) => {
            gridData.value = res.data
            dataForPagination.value = res.data
            noOfDataItems.value = gridData.value.length
            pages.value = Math.ceil(noOfDataItems.value / props.rows)

            if(props.customFields) heads.value = props.customFields
            for(let m of props.missFields){
                let firstCharacter = m.charAt(0).toUpperCase()                
                let fieldWithFirstCap = firstCharacter + m.slice(1)
                missFieldsData.value.push(fieldWithFirstCap)
            }
            //////////////////////////// missed fields //////////////////////////////
            if(missFieldsData.value.length != 0){
                for(let missed of missFieldsData.value){
                    heads.value = heads.value.filter(header => {
                        return header != missed
                    })
                }
                for(let missed of props.missFields){
                    for(let m of gridData.value){
                        delete m[missed];
                    }    
                }                
            }
            //////////////////////////// missed fields //////////////////////////////

            //////////////////////////// paginate dada //////////////////////////////
            if(props.rows > 0){
                gridData.value = dataForPagination.value.slice(0, props.rows)
            }       

            //////////////////////////// paginate dada //////////////////////////////            
        })
        .catch((err) => { console.log(err) })
        finalPageButtons.value = []
        for(let m=1; m<pages.value+1; m++) finalPageButtons.value.push(m)                    
        }

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
            console.log(globals.value)
        }
        const paginateClick = (e,p) => {
            currentPage.value = p
            for(let el of e.target.parentElement.children){
                el.classList.remove('paginatedButton')
            }
            e.target.classList.add('paginatedButton')
            gridData.value = dataForPagination.value.slice((props.rows * p) - props.rows, ((props.rows * p + props.rows) - props.rows))
        }











        
        const paginateRightClick = () => {            
            if(currentPage.value >= pages.value){
                return
            }
            currentPage.value++
            let mainCondition = pages.value - Math.floor(props.pageButtons/2)
            let innerCondition = props.pageButtons - Math.floor(props.pageButtons/2)
            if(props.pageButtons %2 == 0){                
                if(currentPage.value <= mainCondition+1){                                        
                    if(currentPage.value > innerCondition){
                        finalPageButtons.value = []
                        for(
                            let i = currentPage.value - innerCondition; 
                            i < currentPage.value + innerCondition; 
                            i++
                        ) finalPageButtons.value.push(i)                            
                    }
                }    
            }
            else{
                if(currentPage.value <= mainCondition){
                    if(currentPage.value >= innerCondition){
                        finalPageButtons.value = []
                        for(
                            let i = currentPage.value - innerCondition+1; 
                            i < currentPage.value + innerCondition; 
                            i++
                        ) finalPageButtons.value.push(i)
                    }
                }
            }            
            gridData.value = dataForPagination.value.slice((props.rows * currentPage.value) - props.rows, ((props.rows * currentPage.value + props.rows) - props.rows))
        }

        const paginateLeftClick = () => {            
            if(currentPage.value <= 1){
                return
            }
            currentPage.value--
            let mainCondition = pages.value - Math.floor(props.pageButtons/2)
            let innerCondition = props.pageButtons - Math.floor(props.pageButtons/2)
            if(props.pageButtons %2 == 0){
                if(currentPage.value <= mainCondition+1){                    
                    if(currentPage.value > innerCondition){
                        finalPageButtons.value = []
                        for(
                            let i = currentPage.value - innerCondition; 
                            i < currentPage.value + innerCondition; 
                            i++
                        ) finalPageButtons.value.push(i)
                    }
                }    
            }
            else{
                if(currentPage.value <= mainCondition){
                    if(currentPage.value >= innerCondition){
                        finalPageButtons.value = []
                        for(
                            let i = currentPage.value - innerCondition+1; 
                            i < currentPage.value + innerCondition; 
                            i++
                        ) finalPageButtons.value.push(i)
                    }
                }
            }
            gridData.value = dataForPagination.value.slice((props.rows * currentPage.value) - props.rows, ((props.rows * currentPage.value + props.rows) - props.rows))
        }

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

        const sortClick = (e) => {
            sortType.value = 'DOWN'
            sortMarkerDown.value++
            sortMarkerUp.value++
            sortUpIcon.value = '/assets/grid/sortUp1.png'
            if(sortMarkerDown.value %2 == 0){
                sortIcon.value = '/assets/grid/sortDown2.png'
                enableHClick.value = true
                headPadClass.value = 'hPadClass'
                headSpanClass.value = 'forHeadSpanClass'
                setTimeout(() => {
                    headSpanClass.value = 'forHeadSpanClassOff'
                }, 600)
            }
            else{
                sortIcon.value = '/assets/grid/sortDown1.png'
                headPadClass.value = 'hClass'
                enableHClick.value = false
                for(let ch of e.target.parentElement.parentElement.nextElementSibling.children[0].children){
                    for(let c of ch.children){
                       if(c.tagName == "IMG") c.style.display = 'none'
                    }
                }
            }
        }

        const sortUpClick = (e) => {
            sortType.value = 'UP'
            sortMarkerDown.value++
            sortMarkerUp.value++
            sortIcon.value = '/assets/grid/sortDown1.png'
            if(sortMarkerUp.value %2 == 0){
                sortUpIcon.value = '/assets/grid/sortUp2.png'
                enableHClick.value = true
                headPadClass.value = 'hPadClass'
                headSpanClass.value = 'forHeadSpanClass'
                setTimeout(() => {
                    headSpanClass.value = 'forHeadSpanClassOff'
                }, 600)
            }
            else{
                sortUpIcon.value = '/assets/grid/sortUp1.png'
                headPadClass.value = 'hClass'
                enableHClick.value = false
                for(let ch of e.target.parentElement.parentElement.nextElementSibling.children[0].children){
                    for(let c of ch.children){
                       if(c.tagName == "IMG") c.style.display = 'none'
                    }
                }
            }
        }

        const headClickForSorting = (e,x) => {
            for(let ch of e.target.parentElement.parentElement.children){
                for(let c of ch.children){
                    if(c.tagName == "IMG") c.style.display = 'none'
                }
            }
            e.target.nextElementSibling.style.display = 'inline'
            currentPage.value = 1

            if(sortType.value == "DOWN"){
                let first = x.slice(0,1)
                let last = x.slice(1)
                let small = first.toLowerCase() + last
                if(small.includes(' ')) small = small.split(' ').join('')

                dataForSorting.value.sort(compareForAllDown(small));                
                dataForPagination.value = dataForSorting.value
                gridData.value = dataForPagination.value.slice(0, props.rows)
            }
            else if(sortType.value == "UP"){
                let first = x.slice(0,1)
                let last = x.slice(1)
                let small = first.toLowerCase() + last
                if(small.includes(' ')) small = small.split(' ').join('')
                dataForSorting.value.sort(compareForAllUp(small));
                dataForPagination.value = dataForSorting.value
                gridData.value = dataForPagination.value.slice(0, props.rows)
            }
        }

        const compareForAllDown = (p) => {
            return function(a,b) {
                if (a[p] < b[p]) return -1;
                if (a[p] > b[p]) return 1;
                return 0;
            };
        }
        const compareForAllUp = (p) => {
            return function(b,a) {
                if (a[p] < b[p]) return -1;
                if (a[p] > b[p]) return 1;
                return 0;
            };
        }

        const filterClick = () => {
            filterMarker.value++
            if(filterMarker.value %2 == 0){
                filterIcon.value = '/assets/grid/filter2.png'
                forTD.value = true
            }
            else{
                filterIcon.value = '/assets/grid/filter1.png'
                forTD.value = false
                heads.value = []
                finalPageButtons.value = []
                allData()
            }
        }

        const allHeadsClick = (e,x) => {
            console.log(x)
            let test = []
            let xForData = x
            currentPage.value = 1
            x = changeLikeHeads(x)

            if(!e.target.classList.contains('selectedColumn')){
                e.target.classList.add('selectedColumn')
                for(let m of dataForColumns.value){
                    test.push(m[xForData])
                    delete m[xForData];
                }
                heads.value = heads.value.filter((h) => { return h != x })
                gridData.value = dataForColumns.value
                gridData.value = gridData.value.slice(0, props.rows)
            }
            else{
              e.target.classList.remove('selectedColumn')
              console.log(dataForColumns.value)
              heads.value.push(x)
              for(let m of dataForColumns.value){
                m[xForData] = test.pop()
              }
            } 
            console.log(test)
        }

        const changeLikeHeads = (x) => {
            let firstCharacter = x.charAt(0).toUpperCase()
                let fieldWithFirstCap = firstCharacter + x.slice(1)
                for(let all in fieldWithFirstCap){
                    if(fieldWithFirstCap.charAt(all) == fieldWithFirstCap.charAt(all).toUpperCase()){                        
                        if(all != 0){
                            let i = fieldWithFirstCap.indexOf(fieldWithFirstCap.charAt(all))
                            fieldWithFirstCap = fieldWithFirstCap.substr(0,i) + ' ' + fieldWithFirstCap.substr(i)
                            break
                        } 
                    }                    
                }
            return fieldWithFirstCap
        }


    const allData = async () => {
        let testData = {
            heads:[],
            tds:[]
        }
        await axios.get(props.dataEnd + '/1')
        .then((res)=>{
            for(let d in res.data){
                allHeads.value.push(d)
                testData.heads.push(d)
            }
        })
        .catch((err) => {console.log(err)})

        await axios.get(props.dataEnd)
        .then((res) => {            
            testData.tds = res.data
            console.log(testData)
            gridData.value = res.data
            dataForPagination.value = res.data
            dataForSorting.value = res.data
            dataForColumns.value = res.data
            noOfDataItems.value = gridData.value.length
            pages.value = Math.ceil(noOfDataItems.value / props.rows)
            for(let d in gridData.value[0]){
                let firstCharacter = d.charAt(0).toUpperCase()                
                let fieldWithFirstCap = firstCharacter + d.slice(1)
                for(let all in fieldWithFirstCap){
                    if(fieldWithFirstCap.charAt(all) == fieldWithFirstCap.charAt(all).toUpperCase()){                        
                        if(all != 0){
                            let i = fieldWithFirstCap.indexOf(fieldWithFirstCap.charAt(all))
                            fieldWithFirstCap = fieldWithFirstCap.substr(0,i) + ' ' + fieldWithFirstCap.substr(i)
                            break
                        } 
                    }                    
                }
                heads.value.push(fieldWithFirstCap)
            }            
            if(props.customFields) heads.value = props.customFields
            for(let d of props.missFields){
                let firstCharacter = d.charAt(0).toUpperCase()
                let fieldWithFirstCap = firstCharacter + d.slice(1)
                for(let all in fieldWithFirstCap){
                    if(fieldWithFirstCap.charAt(all) == fieldWithFirstCap.charAt(all).toUpperCase()){
                        if(all != 0){
                            let i = fieldWithFirstCap.indexOf(fieldWithFirstCap.charAt(all))
                            fieldWithFirstCap = fieldWithFirstCap.substr(0,i) + ' ' + fieldWithFirstCap.substr(i)
                            break
                        } 
                    }                    
                }
                missFieldsData.value.push(fieldWithFirstCap)
            }
            //////////////////////////// missed fields //////////////////////////////
            if(missFieldsData.value.length != 0){
                for(let missed of missFieldsData.value){
                    heads.value = heads.value.filter(header => {
                        return header != missed
                    })
                }
                for(let missed of props.missFields){
                    for(let m of gridData.value){
                        delete m[missed];
                    }    
                }
            }
            //////////////////////////// missed fields //////////////////////////////

            //////////////////////////// paginate dada //////////////////////////////
            if(props.rows > 0){
                gridData.value = dataForPagination.value.slice(0, props.rows)
            }
            //////////////////////////// paginate dada //////////////////////////////            
        })
        .catch((err) => { console.log(err) })
            if(props.pageButtons && props.pageButtons < pages.value){
                for(let i=1; i<props.pageButtons+1; i++) finalPageButtons.value.push(i)
            }
            else{
                for(let i=1; i<pages.value+1; i++) finalPageButtons.value.push(i)  
            } 
        }        

        const allDataTest = async (take, offset) => {
        let testData = {
            heads:[],
            tds:[]
        }
        await axios.get(props.dataEnd + '/1')
        .then((res)=>{
            for(let d in res.data){
                allHeads.value.push(d)
                testData.heads.push(d)
            }
        })
        .catch((err) => {console.log(err)})

        axios.get(props.dataEnd + `?_limit=${take}&_start=${offset}`)
        .then((res) => {            
            testData.tds = res.data
            console.log(testData)
            gridData.value = testData
            noOfDataItems.value = res.data.value.length
            pages.value = Math.ceil(noOfDataItems.value / props.rows)
            for(let d in gridData.value[0]){
                let firstCharacter = d.charAt(0).toUpperCase()                
                let fieldWithFirstCap = firstCharacter + d.slice(1)
                for(let all in fieldWithFirstCap){
                    if(fieldWithFirstCap.charAt(all) == fieldWithFirstCap.charAt(all).toUpperCase()){                        
                        if(all != 0){
                            let i = fieldWithFirstCap.indexOf(fieldWithFirstCap.charAt(all))
                            fieldWithFirstCap = fieldWithFirstCap.substr(0,i) + ' ' + fieldWithFirstCap.substr(i)
                            break
                        } 
                    }                    
                }
                heads.value.push(fieldWithFirstCap)
            }            
            if(props.customFields) heads.value = props.customFields
            for(let d of props.missFields){
                let firstCharacter = d.charAt(0).toUpperCase()
                let fieldWithFirstCap = firstCharacter + d.slice(1)
                for(let all in fieldWithFirstCap){
                    if(fieldWithFirstCap.charAt(all) == fieldWithFirstCap.charAt(all).toUpperCase()){
                        if(all != 0){
                            let i = fieldWithFirstCap.indexOf(fieldWithFirstCap.charAt(all))
                            fieldWithFirstCap = fieldWithFirstCap.substr(0,i) + ' ' + fieldWithFirstCap.substr(i)
                            break
                        } 
                    }                    
                }
                missFieldsData.value.push(fieldWithFirstCap)
            }
            //////////////////////////// missed fields //////////////////////////////
            if(missFieldsData.value.length != 0){
                for(let missed of missFieldsData.value){
                    heads.value = heads.value.filter(header => {
                        return header != missed
                    })
                }
                for(let missed of props.missFields){
                    for(let m of gridData.value){
                        delete m[missed];
                    }    
                }
            }
            //////////////////////////// missed fields //////////////////////////////

            //////////////////////////// paginate dada //////////////////////////////
            if(props.rows > 0){
                gridData.value = dataForPagination.value.slice(0, props.rows)
            }
            //////////////////////////// paginate dada //////////////////////////////            
        })
        .catch((err) => { console.log(err) })
            if(props.pageButtons && props.pageButtons < pages.value){
                for(let i=1; i<props.pageButtons+1; i++) finalPageButtons.value.push(i)
            }
            else{
                for(let i=1; i<pages.value+1; i++) finalPageButtons.value.push(i)  
            } 
        }        

    onMounted(() => {
        allDataTest(5,0)
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
/*    .spin div{  width:14px; height:14px; background-color: red; position:relative; border-radius:100%;  }
    .spin div:nth-child(1){ animation:spin2A 0.4s linear infinite alternate; }
    .spin div:nth-child(2){ animation:spin2A 0.4s 0.4s linear infinite alternate; }
    .spin div:nth-child(3){ animation:spin2A 0.4s 0.8s linear infinite alternate; }
    @keyframes spin2A{
        0%{  left:0px; }
        100%{  left:12px; }
    }*/
    .mainDiv{
        position: relative;
        width: 94%;
        left:3%;
        padding: 5px;
        border: 1px solid rgb(52, 50, 77, 0.2);
        border-radius: 3px;
        overflow-x: auto;
    }
    .tableClass{
        width: 100%;
        border-collapse: collapse;
    }
    .thClass{
        position: relative;
        font-size: 12px;
        color: #34324d;
        text-shadow: 0 0 1px white;
        text-align: left;
        padding: 8px 0 8px 0;
        border-bottom: 1px solid rgb(255, 0, 0, 0.8);          
        
        white-space: nowrap;
    }
    .tdClass{
        font-family: 'Dosis';
        font-size: 12px;
        text-align: left;
        padding: 6px;        
        border-bottom: 1px solid #e6e6e6;
   }
   @media screen and (min-width:900px) and (max-width:1200px){
    .thClass, .tdClass{
        font-size:14px;
    }
   }
   @media screen and (min-width:1200px){
    .thClass, .tdClass{
        font-size:16px;
    }
   }
    
    tr:nth-child(odd):hover {
        background-color: rgb(242, 242, 242, 0.6);
        color:black;
    }
    tr:nth-child(even):hover {
        background-color: rgb(242, 242, 242, 0.6);
        color:black;
    }
    tr:nth-child(1):hover {
        background-color: white;  
    }
    /*tr:last-child {
        border-bottom: 1px solid rgb(255, 0, 0, 0.8);
        box-shadow: 0px 0.8px 0px red;
    }*/
    .pagingDiv{
        padding-left: 5%;
        position: relative;
        display: flex;
        align-items: center;
        column-gap: 5px;
        margin-top: 5px;
    }
    .pagingButton{
        cursor: pointer;
        padding:5px;
        border-radius:50%;
        width: 30px;
        height: 30px;
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
        padding: 5px;
/*        outline: 1px solid gray;*/
        background-color: rgb(242, 242, 242, 0.4);
    }
    .columnsDiv{
        position: relative;
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
        width: 100px;
        height: 30px;        
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

    .colsOptionsTransition-enter, .colsOptionsTransition-leave-to{ opacity:0; transform:scale(0,0); }
    .colsOptionsTransition-enter-to, .colsOptionsTransition-leave{ opacity:1; transform:scale(1,1); }
    .colsOptionsTransition-enter-active{ transition: all 0.3s linear; }
    .colsOptionsTransition-leave-active{ transition: all 0.5s linear; }
</style>










