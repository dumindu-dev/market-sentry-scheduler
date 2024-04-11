import axios from 'axios';
import simpleOauth2 from 'simple-oauth2';
import config from './config.js';

const environment = "prod";
const serviceURL = environment == "local"?"http://localhost:3000":config.serviceURL;

const oauthConfig = {
  client: {
    id:config.consumerKey, 
    secret: config.consumerSecret,
  },
  auth: {
    tokenHost: config.tokenUrl,
    tokenPath: config.tokenPath,
  },
};
const oauth2Client = new simpleOauth2.ClientCredentials(oauthConfig);
const getToken = await oauth2Client.getToken();
const accessToken=getToken.token.access_token;
//console.log(accessToken);

let response = await axios.post(serviceURL+"/api/views/updateViewPerformance",{},{
  headers:{
      "Authorization":`Bearer ${accessToken}`
  }
});

response = await axios.post(serviceURL+"/api/dividends/sendDividendTelegramUpdates",{},{
    headers:{
        "Authorization":`Bearer ${accessToken}`
    }
});

response = await axios.post(serviceURL+"/api/views/sendViewPerformanceTelegramAlerts",{},{
  headers:{
      "Authorization":`Bearer ${accessToken}`
  }
});



//console.log(response);
console.log("Execution is successful.");