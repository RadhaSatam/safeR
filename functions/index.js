const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

// The Firebase Admin SDK to access the Firebase Realtime Database. 
const admin = require('firebase-admin');
admin.initializeApp();

function arePointsNear(checkPoint, centerPoint, km) {
    var ky = 40000 / 360;
    var kx = Math.cos(Math.PI * centerPoint.lat / 180.0) * ky;
    var dx = Math.abs(centerPoint.lng - checkPoint.lng) * kx;
    var dy = Math.abs(centerPoint.lat - checkPoint.lat) * ky;
    return Math.sqrt(dx * dx + dy * dy) <= km;
}

exports.alertUsers = functions.database.ref('/collisionReport/{pushId}')
    .onCreate((snapshot, context) => {
      const original = snapshot.val(),
            collisionLatitude = original.latitude,
            collisionLongitude = original.longitude,
            updates = {};
            console.log('found some values', collisionLatitude, collisionLongitude)
        return admin.database().ref(`/session`).once('value').then(snap => {
          console.log('snap', snap.val())
          if(snap && snap.val() && Object.keys(snap.val()).length > 0) {
              for(let i in snap.val()) {
                  if( snap.val() &&  snap.val()[i] && snap.val()[i].latitude && snap.val()[i].longitude )
                  if(arePointsNear({ lat: snap.val()[i].latitude, lng: snap.val()[i].longitude }, { lat: collisionLatitude, lng: collisionLongitude }, 1)) {
                      console.log('in the radius', snap.val());
                      updates[`/session/${i}/alert`] = true;
                  }
                  else {
                      console.log('not in the radius', snap.val())
                  }
                  if(updates && Object.keys(updates).length > 0) {
                      return admin.database().ref().update(updates)
                  }
              }
          }
          return null;
      })
    });
