// import in-memory db

const { InsertListing, FindAll } = require('../db/in-memory-db');


module.exports = class MvpService {

    static Insert(req, resp) {
        const {data} = req.body;

        if (data) {
            InsertListing(data);
            resp.status(200).send({ message: 'data saved '});
        } else {
            resp.status(406).send({message: 'missmatch type, req an obj'});
        }

    };

    static async GetAll(req, resp) {
        let respdata = null;
        respdata = await FindAll()

        if (respdata) {
            resp.status(200).send({ data: respdata });
        } else {
            resp.status(406).send({message: ' no data'});
        }
    }


}

