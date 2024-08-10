let inp=document.querySelector('.inp-box');
let btn=document.querySelector('.inp-btn');
let list =document.querySelector('.list');
let url="http://universities.hipolabs.com/search?country=india";
let state;
let clgArr;
inp.addEventListener('keypress', (event)=>{
    if(event.key=='Enter'){
         btn.click();
    }
})


btn.addEventListener('click',async ()=>{
    list.innerHTML="";
    state=inp.value;
    if(state!=""){
        //function call
        clgArr=await fnCall(state.toLowerCase());
        console.log(clgArr);
        //Updating List 
        updateList(clgArr,state);
    }
})


async function updateList(arr,state) {
    if(arr.length==0){
        let li=document.createElement('p');
        li.innerHTML=`Sorry, College Not Found or Updated yet for '${state}' :(`;
        li.classList.add('state-name');
        list.appendChild(li);
    }else{
        console.log(arr.length);
        let li=document.createElement('p');
        li.innerHTML=`Top Colleges and University Of ${state}<br><br>`;
        li.classList.add('state-name');
        list.appendChild(li);
        for(clg of arr){
            let li=document.createElement('li');
            li.classList.add('li');
            li.innerText=clg.name;
            list.appendChild(li);
            console.log(clg.name);
        }
    }
}


//Clg Differentiater By State Name
async function fnCall(state){
    let arr=[];
    try{
        const res = await axios.get(url);
        for(clg of res.data){
            
            let clgState=clg['state-province'];
            if(clgState!=null){
                if(clgState.toLowerCase()===state){
                    arr.push(clg);
                }                
            }
        }
        console.log(arr);
        return arr;
    }catch(e){
        console.log("error : ",e);
        list.innerText="Not Found";
    }
}
