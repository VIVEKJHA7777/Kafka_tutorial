const { kafka } = require("./client");

async function init(){
    const admin = kafka.admin();
    console.log("Admin connecting...");
    await admin.connect();
    console.log("Admin connection success");

    console.log('Creating Topic [rider-updates]');
    await admin.createTopics({
        topics: [{
            topic:'rider-updates',
            numPartitions: 2,
        }]
    });
    console.log("Topic created successfully");

    console.log("Disconnecting Admin...");
    await admin.disconnect();
};

init();