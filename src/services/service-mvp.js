// import in-memory db

const { execInsert, FindAll } = require('../db/in-memory-db');
const { ImportCSV } = require('../db/importCSV');

module.exports = class MvpService {

    static async Insert(req, resp) {
        const {data} = req.body;

        if (data) {
            await execInsert(data).then(
                () => resp.status(200).send({ message: 'data saved '})
            );

        } else {
            resp.status(406).send({message: 'missmatch type, req an obj'});
        }
    };

    static async GetAll(req, resp) {

        let respdata = await FindAll()


        if (respdata.length) {
            resp.status(200).send({ data: respdata });
        } else {

            // execute only if no data is stored
            const result = await ImportCSV();
            InsertListing(result);

            resp.status(406).send(
                {message: ' no data in db, import is initialised please refresh page'}
            );

        }
    }


}

