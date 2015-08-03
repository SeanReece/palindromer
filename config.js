module.exports = {
	port: 8080,
	debug: true,
	db: {
		//server: 'palindromer-mongo'		//If mongo is running in a docker container on the same host as application
		server: 'localhost'           //If mongo is running natively on the same host as the application
		//server: '<MONGO_IP_ADDRESS>'  //If mongo is running on a different server
	}
}