
exports.swaggerOptions = {
    routePrefix: '/api/v1',
    exposeRoute: true,
    swaggerDefinition: {
        openapi: '3.0.1',
        info:{
            title:'API',
            description:"API Dokumentation",
            version: '1.0.1',
            contact:{
                name:"andreas neufeld",
            },
        },
        servers: [
            {
                url: "http://localhost:"+process.env.API_PORT_LISTEN
            },

        ],

        tags:[

            {
                name: 'SCOUT24',
                description: 'Challenge 2021-06',
            },

        ],

        components: {


            // SCHEMAS -------------------------------------------

            schemas: {

                // Success Messages

                Success_Jobs: {
                    type: "object",
                    properties: {
                        message: {
                            type: "string",
                            description: "Description of job response"
                        }
                    }
                },

                ErrorMessage_All_404: {
                    type: "object",
                    properties: {
                        error:{
                            type: "object",
                            properties: {
                                statuscode: {
                                    type: "string",
                                    description: "Statuscode",
                                    example: "404"
                                },
                                message: {
                                    type: "string",
                                    description: "Error description",
                                    enum: ["Auth failed. User not found."," wrong password"]
                                },
                                title: {
                                    type: "string",
                                    description: "Route: /api/v1/... or Method: <...> not defined.",
                                    enum: ["Not defined URL"]
                                }
                            }
                        }
                    }
                },



            },

        }, // end of components

    }, // end of swaggerDefinition

    // path to api routes
    apis: ['./src/routes/*.js']
};

