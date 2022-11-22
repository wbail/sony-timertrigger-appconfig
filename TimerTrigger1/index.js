module.exports = async function (context, myTimer1) {

    const appConfig = require("@azure/app-configuration");
    const connection_string = process.env.AZURE_APP_CONFIG_CONNECTION_STRING;
    const client = new appConfig.AppConfigurationClient(connection_string);

    let actualSetting = await client.getConfigurationSetting({ key: "TIMER_TRIGGER_2_ENABLED" });
    
    console.log("Retrieved key:", actualSetting.key);
    console.log("Retrieved value:", actualSetting.value);

    try {
        var timeStamp = new Date().toISOString();

        if (myTimer1.isPastDue)
        {
            context.log('JavaScript 1 is running late!');
        }
        
        context.log('JavaScript timer trigger 1 function ran!', timeStamp);

        if (actualSetting.value === 'true')
        {
            context.log("The timer2 will run! It's enabled");
        }
        
    } catch (error) {
        
        context.log('===> Settings the TIMER_TRIGGER_2_ENABLED to false! <===');
        actualSetting.value = 'false';
        await client.setConfigurationSetting(actualSetting);

        context.log("The timer2 will NOT run! It's unabled");
        console.error(error);
    }
};