const { kafka } = require("./client");
const group = process.argv[2];

async function init(){
    const consumer = kafka.consumer({ groupId: 'user-1' });
    console.log("consumer connecting...");
    await consumer.connect();
    console.log("consumer connected...");

    console.log("consumer subscribing the topic...");
    await consumer.subscribe({ topics: ['rider-updates'],fromBeginning: true });
    
    console.log("fetching messages...")
    await consumer.run({
        eachMessage: async ({ topic, partition, message, heartbeat, pause }) => {
            console.log(`[ ${group}: ${topic}]: PARTITION: ${partition}`, message.value.toString());  //actually message is a buffer...
        },
    })
};

init();