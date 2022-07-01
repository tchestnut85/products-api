const express = require('express');
const routes = require('./controllers');
const swaggerUi = require('swagger-ui-express');

const swaggerDocV1 = require('./swagger-v1.json');
const swaggerDocV2 = require('./swagger-v2.json');

const app = express();
const PORT = process.env.PORT || 3001;
const swaggerOptions = {
	// defaultModelsExpandDepth: -1,  // uncomment to remove schemas from docs
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

app.use(
	'/docs/v1',
	swaggerUi.serveFiles(swaggerDocV1, { swaggerOptions }),
	swaggerUi.setup(swaggerDocV1)
);

app.use(
	'/docs/v2',
	swaggerUi.serveFiles(swaggerDocV2, { swaggerOptions }),
	swaggerUi.setup(swaggerDocV2)
);

app.listen(PORT, () => {
	console.log(`Server started on port: ${PORT}`);
});
