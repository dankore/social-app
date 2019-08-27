const threadCollection = require('../db').db().collection('thread2')
let Thread = function (data){
    this.data = data
}

Thread.prototype.create = function(){
    return new Promise(async (resolve, reject)=>{
        await threadCollection.insertOne(this.data).then(thread=>{
            resolve(thread)
        }).catch(()=>{
            reject(thread)
        })
    })
}

Thread.find= function() {
  return new Promise(async (resolve, reject) => {
    let threads = await threadCollection.find().toArray();
    if (threads) {
      resolve(threads);
    } else {
      reject();
    }
  });
};


module.exports = Thread