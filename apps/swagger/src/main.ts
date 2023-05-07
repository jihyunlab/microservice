import * as express from 'express';
import * as swagger from 'swagger-ui-express';
import * as yaml from 'yamljs';
import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config({ path: `${process.cwd()}/apps/swagger/.env` });

const app = express();
const document = yaml.load(path.join(__dirname, '/openapis/openapi.yaml'));

app.use('/api', swagger.serve, swagger.setup(document));
app.listen(Number(process.env.SERVER_PORT));
