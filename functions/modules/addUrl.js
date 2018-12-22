
const functions = require('firebase-functions')
const { db, is_supported_url, hash, collection } = require('../utils')
var FieldValue = require('firebase-admin').firestore.FieldValue

module.exports = functions.https.onRequest((req, res) => {
	// Grab the text parameter.
	const url = req.query.url
	url = normalizeUrl(url)

	if (!is_supported_url(url)) {
		return res.status(400).json({
			status: 400, 
			error:1, 
			msg: 'Sorry, this url does not supported yet!'
		})
	}

	let urlDoc = db.collection(collection.URLS).doc(hash(url));
	let setUrl = urlDoc.set({
		url: url,
		created_at: FieldValue.serverTimestamp(),
		last_pull_at: null
	}, {
		merge: true
	});

	setUrl.then(snapshot => {
		return res.json(snapshot);
	}).catch(err => {
		return res.status(400).json(err);
	})
})