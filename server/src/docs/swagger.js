const swaggerJsdoc = require("swagger-jsdoc");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Intern Task API - MongoDB Version",
            version: "1.0.0",
            description: "Auth + Tasks API using Node.js + MongoDB",
        },
        servers: [{ url: "http://localhost:4000/api/v1" }],
    },
    apis: ["./src/routes/v1/*.js"],
};

module.exports = swaggerJsdoc(options);
