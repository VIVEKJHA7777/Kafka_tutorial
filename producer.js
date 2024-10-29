const { kafka } = require("./client");

//for user giving value
const readline = require('readline');
const rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout,
});

async function init(){
    const producer = kafka.producer()
    console.log("producer connecting...");
    await producer.connect();
    console.log("producer connected successfully...");

    rl.setPrompt('>');
    rl.prompt();

    rl.on('line',async (line)=> {
    const [riderName, location] = line.split(' ');

    console.log("Message sending...");
    await producer.send({
    topic: 'rider-updates',
    messages: [
        {   
            partition: location.toLowerCase()==='north'? 0:1,
            key: 'location-update', 
            value: JSON.stringify({name: riderName, loc:location}) 
        },
    ],
    })
    console.log("message send...");
}).on('close',async ()=>{
    console.log("producer disconncting...");
    await producer.disconnect();
    console.log("producer disconnecting...");      
})
};

init();