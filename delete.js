const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

const headers = {
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Methods': '*',
	'Content-Type': 'application/json'
}

exports.handler = async (event) => {

	console.log(event);

	const codigo = event.pathParameters.codigo;
	console.log(codigo)

	const params = {
		TableName: 'DemoServerless',
		Key: {
			'hk': 'EMPLEADO', 
			'sk': codigo
		}
	};

	let response = await dynamoDB.delete(params)
		.promise()
			.then(data => {
				console.log('Éxito', JSON.stringify(data));
				return {
					statusCode: 200,
					headers: headers,
					body: JSON.stringify({"Mensaje": `Registro '${codigo}' eliminado con éxito`}),
				};
			})
			.catch(err => {
				console.log('Error', JSON.stringify(err));
				return {
					statusCode: 500,
					headers: headers,
					body: JSON.stringify({"Código": err.statusCode, "Mensaje": err.message})
				};
			})
	;
	console.log(response);
	
	return response;

};
