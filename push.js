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
    "https://fcm.googleapis.com/fcm/send/fTgQYSx1nE4:APA91bFtE8VKE1O8cppWW4zfgd9vKIhKf5qxf6kcYFoczDuMlN0pFvpjKTo3nWvQl03AdEXyAkCHUkA35Jt6gucIZ6suhX2r8D0aYaJI36GNKRklEAI64bhDmcnFQD_rxpcWYYuQlAFx",
  keys: {
    p256dh:
      "BEXiBHq0iQBM/17KbteuCzr7/KW/MDsdJx/4jTnGd05HoTrqzvRiyQl2eqyfxaQB6vW5EvtG5ydkGsUz+Kx8o6g=",
    auth: "kQz2B0drM9VyPNX4jPRu4A=="
  }
};
var payload = "Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!";

var options = {
  gcmAPIKey: "509942219987",
  TTL: 60
};
webPush.sendNotification(pushSubscription, payload, options);
