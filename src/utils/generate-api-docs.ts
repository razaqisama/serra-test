import swaggerJSDoc, { Options } from 'swagger-jsdoc';
import fs from 'fs';

const options: Options = {
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'Serra Backend Test - API Documentation',
      version: '1.0.0',
    },
    // components: {
    //   securitySchemes: {
    //     bearerAuth: {
    //       type: 'http',
    //       scheme: 'bearer',
    //       bearerFormat: 'JWT',
    //     },
    //   },
    // },
  },
  apis: ['./src/controllers/**/*.ts'], // Path to the API docs, change to .ts if using TypeScript files
};

const swaggerSpec = swaggerJSDoc(options);

// Write JSON to file
fs.writeFileSync('./src/swagger.json', JSON.stringify(swaggerSpec, null, 2), 'utf8');

console.log('OpenAPI specification has been generated at ./src/swagger.json');
