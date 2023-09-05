const swaggerAutogen = require("swagger-autogen")({ openapi: "3.0.0" });

const options = {
	info: {
		title: "swagger-example",
		description: "스웨거 자동 문서화",
	},
	servers: [
		{
			url: "http://localhost:3000",
		},
	],
	schemes: ["http"],
	securityDefinitions: {
		bearerAuth: {
			type: "http",
			scheme: "bearer",
			in: "header",
			bearerFormat: "JWT",
		},
	},
};
const outputFile = "./src/config/swagger-output.json";
const endpointsFiles = ["./src/app.js"];
swaggerAutogen(outputFile, endpointsFiles, options);
