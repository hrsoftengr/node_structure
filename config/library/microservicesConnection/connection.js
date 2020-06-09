const mongoose = require('mongoose');

class MicroServicesConn {
	connCreate = async (Url,CollectionName, Query) => {
		return new Promise((resolve, reject) =>{
			const connection = mongoose.createConnection(Url);
			connection.on('error', console.error.bind(console, 'connection error:'));
			connection.on('open', function () {
				connection.db.collection(CollectionName).find(Query).toArray((err, result)=> {
					connection.close();
					resolve (result);

				});
			});

		})

	}

}


module.exports = {
	MicroServicesConn : MicroServicesConn
};
