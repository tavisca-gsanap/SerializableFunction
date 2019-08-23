async function function1(){
    await new Promise((resolve, reject) => setTimeout(resolve, 3000));
    alert("funct1");
}
async function function2(){
    await new Promise((resolve, reject) => setTimeout(resolve, 3000));
    alert("funct2");
}
async function function3(){
    await new Promise((resolve, reject) => setTimeout(reject, 3000));
    alert("exception funct3");
}
 
var funArray=[function1,function2,function3];
 
async function SerializableFunction(functionArray){
    let index=0;
    while(index<functionArray.length)
    {
        await functionArray[index]();
        index++;
    }
}
SerializableFunction(funArray);