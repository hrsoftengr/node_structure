const
	AXIOS =  require ('axios');


class Axios {

	Config(authorization){
		return new Promise((resolve) =>{

			// Axios.defaults.headers = {
			//     'Content-Type': 'application/json',
			//     'Micro-Services': 'yes',
			//     xsrfHeaderName: 'X-XSRF-TOKEN', // default
			//     maxContentLength: 10,
			//     Authorization: req.headers.authorization
			// }

			let config = {
				headers: {
					'Content-Type': 'application/json',
					'Micro-With': 'Yes',
					Authorization: authorization
				},
				//   browser only: 'blob'
				responseType: 'json', // default
				// maxContentLength: 710,
			};
			resolve (config);
		});
	}

	get_axios (url , authorization){
		return new Promise(async (resolve, reject) => {
			let config = await this.Config(authorization)
			AXIOS.get(url, config)
				.then((res)=>{resolve(res.data)})
				.catch((err) =>{reject (err)})
		})
	}

	// Post axios
	post_axios (url, key, authorization) {
		return new Promise(async (resolve , reject) => {
			let config = await this.Config(authorization);
			AXIOS.post(url, key, config)
				.then((res)=>{resolve(res.data)})
				.catch((err) =>{reject (err)})
		})
	}

    //
	get_axios_all_request(url_1 , url_2, url_3, authorization){
		return new Promise(async (resolve , reject) =>{
			let config = await this.Config(authorization);
			AXIOS.all([
				AXIOS.get(url_1),
				AXIOS.get(url_2),
				AXIOS.get(url_3)
			])
				.then(AXIOS.spread((res_1, res_2, res_3)=>{
					resolve (res_1 , res_2, res_3);
				}))
				.catch((error)=>{
					reject (error);
				})
		})
	}

}


module.exports ={
	Axios: Axios
} ;