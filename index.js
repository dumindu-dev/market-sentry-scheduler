import axios from 'axios';
import simpleOauth2 from 'simple-oauth2';
import config from './config.js';

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

const response = await axios.post(config.serviceURL+"/api/dividends/sendDividendTelegramUpdates",{},{
    headers:{
        "Authorization":`Bearer ${accessToken}`
    }
});

console.log(response);