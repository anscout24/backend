const csv=require('csvtojson');

async function ImportCSV () {
    var path = require('path');
    var csvFilePath = path.resolve( './src/db','./listings.csv' )
    const jsonArray = await csv().fromFile(csvFilePath);

    return jsonArray;
}

module.exports = {ImportCSV}

