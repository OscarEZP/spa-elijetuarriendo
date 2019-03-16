const functions = require('firebase-functions');

const admin = require('firebase-admin');

const sgMail = require('@sendgrid/mail');

admin.initializeApp(functions.config().firebase);

const SENDGRID_API_KEY = functions.config().sengrid.key;

sgMail.setApiKey(SENDGRID_API_KEY);

exports.firestoreEmail = functions.firestore
  .document('users/{userId}')
  .onCreate(event => {
    const userId = event.params.userId;

    const db = admin.firestore();

    return db.collection('users').doc(userId)
      .get()
      .then(doc => {
        // return db
        const msg = {
          to: 'oskr96.oz@gmail.com',
          from: 'info@neat.cl',
          subject: 'Test Email',
          templateId: 'd-5ee2467e3a924addb7b4a837602bc6bb'
        }

        return sgMail.send(msg);

      }).then(() => console.log('Email Send!'))
      .catch((error) => console.log(error))  
  });
