var configs = {
	"development":{
		env: "development",
		port: 8080,
		debug: true,
		db: {
			//server: 'palindromer-mongo'		//If mongo is running in a docker container on the same host as application container
			server: 'localhost'           //If mongo is running natively on the same host as the application
			//server: '<MONGO_IP_ADDRESS>'  //If mongo is running on a different server
		}
	},
	"production":{
		env: "production",
		port: 8080,
		debug: false,
		db: {
			server: 'palindromer-mongo'		//If mongo is running in a docker container on the same host as application container
			//server: '192.168.59.103'           //If mongo is running natively on the same host as the application
			//server: '<MONGO_IP_ADDRESS>'  //If mongo is running on a different server
		}
	}
}

var env = process.env.NODE_ENV === "production" ? "production" : "development";

module.exports = configs[env];