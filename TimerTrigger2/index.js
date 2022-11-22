module.exports = async function (context, myTimer2) {
    
    const appConfig = require("@azure/app-configuration");
    const connection_string = process.env.AZURE_APP_CONFIG_CONNECTION_STRING;
    const client = new appConfig.AppConfigurationClient(connection_string);

    let retrievedSetting = await client.getConfigurationSetting({
        key: "TIMER_TRIGGER_2_ENABLED"
    });

    console.log("On TimerTrigger2");
    console.log("Retrieved key:", retrievedSetting.key);
    console.log("Retrieved value:", retrievedSetting.value);

    if (retrievedSetting.value === 'false')
    {
        return;
    }
    
    var timeStamp = new Date().toISOString();
    
    if (myTimer2.isPastDue)
    {
        context.log('JavaScript 2 is running late!');
    }
    
    context.log('JavaScript timer trigger 2 function ran!', timeStamp);   
};