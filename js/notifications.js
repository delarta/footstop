function showSimpleNotification() {
  const title = "Notifikasi Sederhana";
  const options = {
    body: "Ini adalah konten notifikasi. \nBisa menggunakan baris baru."
  };
  if (Notification.permission === "granted") {
    navigator.serviceWorker.ready.then(function(registration) {
      registration.showNotification(title, options);
    });
  } else {
    console.error("FItur notifikasi tidak diijinkan.");
  }
}
function showSimpleNotificationWithIcon() {
  const title = "Notifikasi Sederhana";
  const options = {
    body: "Simple Notif With Icon",
    icon: "./icon.png"
  };
  if (Notification.permission === "granted") {
    navigator.serviceWorker.ready.then(function(registration) {
      registration.showNotification(title, options);
    });
  } else {
    console.error("FItur notifikasi tidak diijinkan.");
  }
}
function showSimpleNotificationWithBadge() {
  const title = "Notifikasi Sederhana dengan badge";
  const options = {
    body: "Simple Notif With Badge",
    badge: "./icon.png"
  };
  if (Notification.permission === "granted") {
    navigator.serviceWorker.ready.then(function(registration) {
      registration.showNotification(title, options);
    });
  } else {
    console.error("FItur notifikasi tidak diijinkan.");
  }
}
function showSimpleNotificationAction() {
  const title = "Notifikasi Sederhana dengan badge";
  const options = {
    body: "Simple Notif With Badge",
    badge: "./icon.png",
    actions: [
      {
        action: "yes-action",
        title: "Yes"
      },
      {
        action: "no-action",
        title: "No"
      }
    ]
  };
  if (Notification.permission === "granted") {
    navigator.serviceWorker.ready.then(function(registration) {
      registration.showNotification(title, options);
    });
  } else {
    console.error("FItur notifikasi tidak diijinkan.");
  }
}

function showNotifikasiTag() {
  const title1 = "Notifikasi dengan Tag - 1";
  const options1 = {
    body: "Anggota tag 1",
    tag: "message-group-1"
  };
  // notifikasi kedua
  const title2 = "Notifikasi dengan Tag - 2";
  const options2 = {
    body: "Anggota tag 2",
    tag: "message-group-2"
  };
  // notifikasi ketiga
  const title3 = "Notifikasi dengan Tag - 3";
  const options3 = {
    body: "Anggota tag 1",
    tag: "message-group-1"
  };
  if (Notification.permission === "granted") {
    navigator.serviceWorker.ready.then(function(registration) {
      registration.showNotification(title1, options1);
      registration.showNotification(title2, options2);
      registration.showNotification(title3, options3);
    });
  } else {
    console.error("Fitur notifikasi tidak diijinkan.");
  }
}

function showNotifikasiRenotify() {
  const title = "Notifikasi dengan Renotify";
  const options = {
    body: "Renotify",
    tag: "message-group-1",
    renotify: true
  };
  if (Notification.permission === "granted") {
    navigator.serviceWorker.ready.then(function(registration) {
      registration.showNotification(title, options);
    });
  } else {
    console.error("Fitur notifikasi tidak diijinkan.");
  }
}

function showNotifikasiGambar() {
  const title = "Notifikasi dengan Gambar";
  const options = {
    body: "Ini adalah konten notifikasi dengan gambar latar.",
    image: "./icon.png"
  };
  if (Notification.permission === "granted") {
    navigator.serviceWorker.ready.then(function(registration) {
      registration.showNotification(title, options);
    });
  } else {
    console.error("Fitur notifikasi tidak diijinkan.");
  }
}
