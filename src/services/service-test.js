

module.exports = class ProjectControllerEdifactQue {

    static getTestReq(request,response) {

            response.json({
                name: 'API',
                version: '1.0.0',
                port: process.env.API_PORT_LISTEN
            })

    }
};