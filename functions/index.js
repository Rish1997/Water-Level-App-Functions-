const functions = require('firebase-functions');

const admin = require('firebase-admin');

const request = require('request');
const xhr = require('xmlhttprequest').XMLHttpRequest;

admin.initializeApp(functions.config().firebase);
var db = admin.firestore();


// const cors = require('cors')({
//     origin: true
// });




exports.sendData = functions.https.onRequest((req,res) => {
    const appName = req.body.app_id;
    const devName = req.body.dev_id;
    const value = req.body.payload_fields.Distance;
    const time = req.body.metadata.time;
    console.log(appName , devName , value, time);
    console.log(req.body);

    // return cors(req,res,() => {
        db.collection(appName).doc(devName).set(
            {   
                time : time,
                Value : value
            }
        ).then((success) => {
            return res.status(200).send("Successfully stored Data " + success);
        }).catch((reason) => {
            return res.send("Rejected Because " + reason);
        })
    // })
});

// exports.createUser = functions.firestore.document('morackcfc-cfcmorack/').onCreate((snap, context) => {
//       // Get an object representing the document
//       // e.g. {'name': 'Marie', 'age': 66}
//       const newValue = snap.data();

//       // access a particular field as you would any JS property
//       const time = newValue.time;
//       const Value = newValue.value;

//       // perform desired operations ...
//     });

exports.actuationControl = functions.https.onRequest((req,res) => {
    const value = req.body.value;
    const data = {
            "dev_id": "cfcmorack", 
            "port": 1,             
            "confirmed": false,    
            "payload_fields": {    
              "value": value
            }
    }
    const options ={
        "host" : 'integrations.thethingsnetwork.org',
        "path" : 'ttn-eu/api/v2/down/morackcfc/test'

    }

    var req = new XMLHttpRequest();

    const url = 'https://integrations.thethingsnetwork.org/ttn-eu/api/v2/down/morackcfc/test?key=ttn-account-v2.AEs3vkJ-RLJd0DLsrLJeNfTklrTZ1KFr-Ulv1jf410U';

    req.addEventListener('load', doSomethingWithDataFromResponse);
    req.open("POST",url)
    req.setRequestHeader('Content-type','application/json') 
    req.send(JSON.stringify(data))

    request.

    // request.post('https://integrations.thethingsnetwork.org/ttn-eu/api/v2/down/morackcfc/test?key=ttn-account-v2.AEs3vkJ-RLJd0DLsrLJeNfTklrTZ1KFr-Ulv1jf410U',options, (error , response , body) => {
    //     if(error){
            
    //         res.send(error)
    //     }
    //     else if (value == 0){
    //         res.status(200).send("Successfully Switched Off!");
    //     }
    //     else if (value == 1){
    //         res.status(200).send('Successfully Switched On');
    //     }
    // })
    
})