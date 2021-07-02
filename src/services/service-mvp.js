const { execInsert, FindAll, FindFiltered} = require('../db/in-memory-db');
const { ImportCSV } = require('../db/importCSV');

module.exports = class MvpService {

    static async Insert(req, resp) {
        const {data} = req.body;

        if (data) {
            await execInsert(data).then(
                () => resp.status(200).send({ message: 'data saved '})
            );

        } else {
            resp.status(400).send({message: 'missmatch type, req an obj'});
        }
    };

    static async GetAll(req, resp) {

        let respdata = await FindAll()


        if (respdata.length) {
            resp.status(200).send({ data: respdata });
        } else {
            resp.status(400).send(
                {message: ' no data in db, import is initialised please refresh page'}
            );

        }
    }

    static async Filter(req, resp) {

        try {
            let respdata = await FindFiltered(req);
            resp.status(200).send({ data: respdata });

        } catch {
            resp.status(400).send(
                {message: ' no data based on filter params'}
            );
        }
    }
}

