// The solution view is best for a maximum array size of 10 and a maximum array element size of 10

let arr=[] // Input array

// Adding event listener to the add button to add array elements 
let input=document.querySelector(`input[type='number']`)
let btn=document.querySelector('.add')
btn.addEventListener('click',()=>{
    if(input.value=='' || parseInt(input.value)<0)return
    arr.push(parseInt(input.value))
    displayArray(arr)
    input.value=''
    input.focus()
})


//Adding event linstener to show only water in the table
let waterbtn=document.querySelector('.showonlywater')
// here switchcolor holds state of color such that we can switch its color (closure)
let switchcolor=showOnlywater()
waterbtn.addEventListener('click',()=>{
    switchcolor()
})

// Adding event listener to the solve button to get solution
let solvebtn=document.querySelector('.solve')
solvebtn.addEventListener('click',()=>{
    Solution()
    waterbtn.style.display=''
})

// Adding event listener to the reset button to set the array empty
let resetbtn=document.querySelector('.reset')
resetbtn.addEventListener('click',()=>{
    arr.length=0
    displayArray(arr)
    input.placeholder=''
})

function displayArray(arr){
    let s=''
    for(let i=0;i<arr.length;i++){
        s+=arr[i]
        if(i!=arr.length-1)s+=' , '
    }
    let array=document.querySelector('.arrayelements')
    array.innerHTML=s
    generateTable(arr)
    fillAllblocks('yellow')
}

function waterStored(arr){
    if(arr.length<=2)return 0
    let l=0,r=arr.length-1,lm=0,rm=0,sum=0
    while(l<r){
        if(arr[l]<arr[r]){
            if(lm<arr[l])lm=arr[l]
            sum+=lm-arr[l]
            if(lm-arr[l]!=0){
                fillCols(l,arr[l],lm-arr[l],'#1ca3ec')
            }
            l++
        }
        else{
            if(rm<arr[r])rm=arr[r]
            sum+=rm-arr[r]
            if(rm-arr[r]!=0){
                fillCols(r,arr[r],rm-arr[r],'#1ca3ec')
            }
            r--
        }
    }
    return sum
}


function generateTable(arr){
    let table=document.querySelector('.table')
    table.innerHTML=''

    let emptycolumn1=document.createElement('div')
    emptycolumn1.className='colm'
    for(let i=0;i<Math.max(...arr)+1;i++){
        let cell=document.createElement('div')
        cell.className='cell'
        emptycolumn1.appendChild(cell)
    }
    table.appendChild(emptycolumn1)

    for(let i=0;i<arr.length;i++){
        let column=document.createElement('div')
        column.className='colm'
        column.id='colm '+i
        let max=Math.max(...arr)+1
        for(let j=0;j<max;j++){
            let cell=document.createElement('div')
            cell.className='cell'
            cell.id='colm '+i+' cell '+ (max-j-1)
            column.appendChild(cell)
        }
        table.appendChild(column)
    }

    let emptycolumn2=document.createElement('div')
    emptycolumn2.className='colm'
    for(let i=0;i<Math.max(...arr)+1;i++){
        let cell=document.createElement('div')
        cell.className='cell'
        emptycolumn2.appendChild(cell)
    }
    table.appendChild(emptycolumn2)
}

function fillAllblocks(color){
    for(let i=0;i<arr.length;i++){
       fillCols(i,0,arr[i],color)
    }
}

function fillCols(columnno,from,number,color){
    for(let j=from;j<from+number;j++){
        let ele=document.getElementById('colm '+columnno+' cell '+j)
        ele.style.backgroundColor=color
    }
}

function Solution(){
    input.placeholder=waterStored(arr)+' Unit(s)'
}


function showOnlywater(){
    let color='rgb(226, 233, 236)'
    return function(){
        fillAllblocks(color)
        if(color=='rgb(226, 233, 236)'){
            color='yellow'
        }
        else{
            color='rgb(226, 233, 236)'
        }
    }
}

