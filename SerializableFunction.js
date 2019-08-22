function function1(flag,args){
	return new Promise(function(resolve, reject) {
		setTimeout(() => {
		console.log("first");
		//resolve("done");
		reject("something wrong");
		} , 3000);
	});
}
function function2(flag,args){
	return new Promise(function(resolve, reject) {
		if(flag){
			setTimeout(() => {
				console.log("second when first is successfull "+args[0]);resolve("done")}, 3000);
		}
		else{
			setTimeout(() => {
				console.log("second when first is failed "+args[1]);resolve("done")}, 3000);
		}
	});
}
function function3(flag,args){
	return new Promise(function(resolve, reject) {
		setTimeout(() => {
		console.log("third \""+args[0]+"\"");resolve("done")}, 3000);
	});
}
function Function(fun,...args){
	this.fun=fun;
	this.args=args;
}

let functionArray1=[new Function(function1),new Function(function2,1,2),new Function(function3,1,"something as agrument")];

function SerializableFunction(functionArray){
	return new Promise(function(resolve, reject) {
		let index=0;
		let funcLen=functionArray.length;
		let statusList=[];
		let flag=true;
		function Status(index,status,isresolved) {
			this.index = index;
			this.status = status;
			this.isresolved = isresolved;
		}
		try{
			(function functionCallBack(n,i){
				if(i>=n){
					resolve(statusList);}
				else{
					functionArray[i].fun(flag,functionArray[i].args).then(
						result => {
							flag=true;
							console.log(result);
							statusList.push(new Status(i,result,flag));
							functionCallBack(n,++i);},
						reject=>{
							flag=false;
							console.log(reject);
							statusList.push(new Status(i,reject,flag));
							functionCallBack(n,++i);}
					);
				}
			})(funcLen,index);
		}
		catch(err){
			reject(err.message);
		}
	});
}
SerializableFunction(functionArray1).then(
	result => {
		for(let res of result){
			console.log(res.index+","+res.status+","+res.isresolved);
		}
	},
	reject => {
		console.error(reject);
	}
);
