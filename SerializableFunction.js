function function1(resolve,reject){
	setTimeout(() => {
	console.log("first");
	//resolve("done");
	reject("something wrong");
	} , 3000);
}
function function2(resolve,reject){
	setTimeout(() => {
	console.log("second");resolve("done")}, 3000);
}
function function3(resolve,reject){
	setTimeout(() => {
	console.log("third");resolve("done")}, 3000);
}

let functionArray1=[function1,function2,function3];

function SerializableFunction(functionArray){
	return new Promise(function(resolve, reject) {
		let index=0;
		let funcLen=functionArray.length;
		let statusList=[];
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
						new Promise(functionArray[i]).then(
							result => {
								console.log(result);
								statusList.push(new Status(i,result,true));
								functionCallBack(n,++i);},
							reject=>{
								console.log(reject);
								statusList.push(new Status(i,reject,false));
								functionCallBack(n,++i);}
						);
					}
				})(funcLen,index);
			}
			catch(err){
				reject(err.message);
			}
		}
	);
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
