'use strict';

class Query {
	constructor() {

	}
	// Create Query
/*	static createQuery(model, query) {
		return new Promise((resolve, reject) => {
			let SaveModel = new model(query);
			SaveModel.save().then((result) => {
				resolve(result);
			}).catch((error) =>{
				reject (error);
			});
		});
	}*/

	static async create_query (model , query) {
		console.log('<<<<<<<<<<<<<<<<<<<<< Query Inter face >>>>>>>>>>>>>>>>>>>')
	}

}

module.exports = Query;
