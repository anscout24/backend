// in-memory db
var loki = require('lokijs');
// create virt db
var db = new loki('mvp.db');
const {FetchFromGoogle} = require('../db/utils/get-geocode');
const { ImportCSV } = require('../db/importCSV');
// Add a collection to the database
var listings = db.addCollection('listings');

/**
 * Schema
 listingId: { type: Number },
 realEstateType: { type: String },
 street: {type: String},
 houseNr: {type: Number},
 postCode: {type: Number},
 city: {type: String},
 livingArea: {type: Number},
 siteArea: {type: String},
 rentalPrice: {type: Number},
 salesPrice: {type: Number},
 imgUrl: {type: String}
 */


// Ensuring a harmonized DB structure light solution
const SchemaFilter = (obj) => {
    const  {
        realEstateType,
        street,
        houseNumber,
        postcode,
        city,
        livingArea,
        siteArea,
        rentalPrice,
        salesPrice,
        imageURL
    } = obj;

    const listingId = new Date().getTime(); // unique id for list items
    return {
        listingId,
        realEstateType,
        street,
        houseNumber,
        postcode,
        city,
        livingArea,
        siteArea,
        rentalPrice,
        salesPrice,
        imageURL
    }
};

async function execInsert (value) {
    /**
     * Request for geodata is made on each database write but after
     * filtering the schema. This ensures that no entry is made in
     * the database without lng/lat data.
     *
     * @type {{livingArea, rentalPrice, imgUrl, siteArea, city, street, salesPrice, houseNumber, postCode, listingId, realEstateType}}
     */
    const filData = SchemaFilter(value);
    const resp = await FetchFromGoogle(filData);
    listings.insert(resp);

}


const FindAll = () => {
    return listings.find({})
};

const FindOneByType = (type) => {
    return listings.findOne({'realEstateType': type})
};

// init db
async function InitDB (){
    const result = await ImportCSV();
    result.map(value => execInsert(value))
}
// execute on load module
InitDB();

module.exports = {execInsert, FindAll};