function function1(resolve,reject){
setTimeout(() => {
alert("fis");
resolve("done");
//reject("something wrong");
} , 3000);
}
function function2(resolve,reject){
setTimeout(() => {
alert("sec");resolve("done")}, 3000);
}
function function3(resolve,reject){
setTimeout(() => {
alert("thir");resolve("done")}, 3000);
}

let functionArray=[function1,function2,function3];

function SerializableFunction(functionArray){
let index=0;
let funcLen=functionArray.length;
(function functionCallBack(n,i){
	if(i>=n){
		return}
	else{
		new Promise(functionArray[i]).then(
			result => functionCallBack(n,++i)
		);
	}
})(funcLen,index);
}
SerializableFunction(functionArray);