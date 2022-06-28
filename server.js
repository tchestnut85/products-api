const express = require('express');
const routes = require('./controllers');

const app = express();
const PORT = process.env.PORT || 3001;

const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require('./swagger.json');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

app.use('/docs', swaggerUi.serveFiles(swaggerDoc), swaggerUi.setup(swaggerDoc));

app.listen(PORT, () => {
	console.log(`Server started on port: ${PORT}`);
});
