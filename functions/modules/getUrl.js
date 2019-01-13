const functions = require('firebase-functions')
const { db, isSupportedUrl, documentIdFromHashOrUrl, collection, normalizeUrl, cleanEmail } = require('../utils')
const FieldValue = require('firebase-admin').firestore.FieldValue

module.exports = functions.https.onRequest(async (req, res) => {
    // TODO: Add limit, paging
    let url = req.query.url
    if (!url) {
        return res.status(404).json({ err: 1, msg: 'not found.' })
    }

    let urlDoc = db.collection(collection.URLS).doc(documentIdFromHashOrUrl(url))

    urlDoc.get().then(snapshot => {
        if (!snapshot.exists) {
            return res.status(404).json({ err: 1, msg: 'not found' })
        }

        let data = snapshot.data()
        data['last_pull_at'] = data['last_pull_at'].toDate()
        return res.json(snapshot.data())
    })

})