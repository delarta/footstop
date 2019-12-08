var webPush = require('web-push');

const vapidKeys = {
  publicKey:
    "BN3dCLFsOBvCdXBbaNXFfm2pKAcEU0FNE5bXJLRf5VkTgOjPl08-9Rg8k5auHNWd-2EZ_yP5xjx29xNgP8IN-4k",
  privateKey: "qmzWKy6pVRgcuztJ4avbNUqz6glhk7plJ_Gn4Mk3Krg"
};

webPush.setVapidDetails(
  "mailto:example@yourdomain.org",
  vapidKeys.publicKey,
  vapidKeys.privateKey
);
var pushSubscription = {
  endpoint:
    "https://fcm.googleapis.com/fcm/send/d9jALvEqHeU:APA91bHvpB-hhERXq3QA_xpzoE07hoHG7xA0C_Rqz-Sjvg3l48dmRW9983dF_Otoo6qjHqGZULEqlS9gFBZeaTkuZLjmvQVXxm4Srd6zzyamp_Fu3_wkibwXg4Qv5Ors_48uKgKYpnjA",
  keys: {
    p256dh:
      "BP6FY7qN2nck2mwWQ7EEvrxyXIsSgSLMtI3lFQXKnfECuKNvQeA7GOs2rNVIkn3onGLszgMxtGEF3iVUV5nLw3M=",
    auth: "utND96XMOhBnFXbwXjVnBw=="
  }
};
var payload = "This is a sample notification";

var options = {
  gcmAPIKey: "509942219987",
  TTL: 60
};
webPush.sendNotification(pushSubscription, payload, options);
