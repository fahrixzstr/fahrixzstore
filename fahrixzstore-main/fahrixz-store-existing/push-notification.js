/* =========================
PUSH NOTIFICATION
========================= */

window.requestNotificationPermission =
async function(){

if(!("Notification" in window)){

alert(
'Browser tidak mendukung notifikasi'
);

return;

}

const permission =
await Notification.requestPermission();

if(permission === 'granted'){

showLocalNotification(
'FahriXZ Store',
'Notifikasi berhasil diaktifkan'
);

}

};

/* =========================
SHOW LOCAL NOTIFICATION
========================= */

window.showLocalNotification =
function(title,body){

new Notification(title,{

body:body,

icon:
'assets/icons/icon-192.png'

});

};