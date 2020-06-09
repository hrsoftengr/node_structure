const QueryInterface = require('../_query/Query');


class InterFace extends QueryInterface {

	static async CreateInterface(m , q){
		console.log("<<<<<<<<<<<<<< User Inter Face >>>>>>>>>>>>>>>>>>")
		const Res = await super.create_query(m , q);
	}

	static async CreateDynamicSubDomain (req) {
			var domain = req.get('host').match(/\w+/); // e.g., host: "subdomain.website.com"
			if (domain)
				var subdomain = domain[0]; // Use "subdomain"
		if (!req.subdomains.length || req.subdomains.slice(-1)[0] === 'www');
		// otherwise we have subdomain here
		var subdomain = req.subdomains.slice(-1)[0];
		// keep it
		req.subdomain = subdomain;

		console.log('============= >>>>> =======',req.subdomain)

	}

	static async getByCustomOptions(req, modelName, options) {
		let result;
		try {
			result = await req.app.get('db')[modelName].findOne(options);
		} catch (err) {
			return Promise.reject(err);
		}
		return result;
	}

}

module.exports = InterFace;
