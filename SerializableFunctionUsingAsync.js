var flag=[0,0,0]; 
 
 async function function1(){
    try{
            await new Promise((resolve, reject) => setTimeout(resolve, 2000));
            alert("funct1");
        }
        
    catch
    {
        flag[0]=1;
        alert("exception funct1");
    }
}
async function function2(){
    try{
            await new Promise((resolve, reject) => setTimeout(reject, 2000));
            alert("funct2");
        }
        
    catch
    {
        flag[1]=1;
        alert("exception funct2");
    }
}
async function function3(){
    try{
            await new Promise((resolve, reject) => setTimeout(resolve, 2000));
            alert("funct3");        
    }
    catch
    {
        flag[2]=1;
        alert("exception funct3");
    }
}
 
var funArray=[function1,function2,function3];
 
async function SerializableFunction(functionArray){
    let index=0;
    while(index<functionArray.length)
    {
        if(flag.includes(1))
        {
            break;
        }
        await functionArray[index]();
        index++;
    }
    alert("aborted");
}
SerializableFunction(funArray);