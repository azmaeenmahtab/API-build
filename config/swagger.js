const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Todo App API",
            version: "1.0.0",
            description: "API documentation for the Todo App",
        },
        servers: [
            {
                url: "http://localhost:6543/api/todos",
                description: "Local Server",
            },
            {
                url: "https://todo-app-api-build.vercel.app/api/todos",
                description: "Production Server",
            }
        ],
        components: {
            securitySchemes: {
                BearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
        security: [{ BearerAuth: [] }],
    },
    apis: ["./routes/*.js"], // Path to route files with Swagger docs
};

const swaggerSpec = swaggerJSDoc(options);

const setupSwagger = (app) => {
    app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));
};

module.exports = { setupSwagger };
