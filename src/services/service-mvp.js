// import in-memory db

const { InsertListing, FindAll } = require('../db/in-memory-db');
const { ImportCSV } = require('../db/importCSV');

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


        if (respdata.length) {
            resp.status(200).send({ data: respdata });
        } else {

            // execute only if no data is stored
            const result = await ImportCSV();
            await InsertListing(result);

            // redundant but it makes sure that data is stored
            respdata = await FindAll();

            if (respdata) {
                resp.status(200).send({ data: respdata });
            } else {
                resp.status(406).send({message: ' no data and check if listings.csv is saved'});
            }

        }
    }


}

