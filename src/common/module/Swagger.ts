import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { getMetadataArgsStorage } from 'routing-controllers';
import { routingControllersToSpec } from 'routing-controllers-openapi';
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';
import { routingControllerOptions } from '../../config/RoutingConfig';
import { SWAGGER_CONFIG } from '../../config/EnvConfig';
import { SchemaObject } from 'openapi3-ts';

/**
 * Swagger를 사용하도록 한다.
 * @param app Express Application
 */
export function useSwagger(app: express.Application) {
  // Parse class-validator classes into JSON Schema:
  const schemas = validationMetadatasToSchemas({
    refPointerPrefix: '#/components/schemas',
  }) as SchemaObject;

  // Parse routing-controllers classes into OPENAPI spec:
  const storage = getMetadataArgsStorage();
  const spec = routingControllersToSpec(storage, routingControllerOptions, {
    components: {
      schemas,
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    info: {
      title: 'chatting Server',
      description: 'chatting Server API',
      version: '1.0.0',
    },
  });

  app.use(SWAGGER_CONFIG.ROUTE, swaggerUi.serve, swaggerUi.setup(spec));
}
