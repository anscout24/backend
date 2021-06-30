// in-memory db
var loki = require('lokijs');
// create virt db
var db = new loki('mvp.db');
const {FetchFromGoogle} = require('../db/utils/get-geocode');

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
        listingId,
        realEstateType,
        street,
        houseNumber,
        postCode,
        city,
        livingArea,
        siteArea,
        rentalPrice,
        salesPrice,
        imgUrl
    } = obj;

    return {
        listingId,
        realEstateType,
        street,
        houseNumber,
        postCode,
        city,
        livingArea,
        siteArea,
        rentalPrice,
        salesPrice,
        imgUrl
    }
};

const isArray = (obj) => {
    return Array.isArray(obj);
};

async function exec (value) {
    /**
     * Request for geodata is made on each database write but after
     * filtering the schema. This ensures that no entry is made in
     * the database without lng/lat data.
     *
     * @type {{livingArea, rentalPrice, imgUrl, siteArea, city, street, salesPrice, houseNumber, postCode, listingId, realEstateType}}
     */
    const filData = SchemaFilter(value);
    const resp = await FetchFromGoogle(filData);
    listings.insert(resp)
}

// not yet unique listingId
const InsertListing = (obj) => {
    
    // Ensuring that multiple items can also be added
    if (isArray(obj)) {
        Promise.all(obj.map(value => exec(value)))
    } else {
        exec(obj)
    }

};

const FindAll = () => {
    return listings.find({})
};

const FindOneByType = (type) => {
    return listings.findOne({'realEstateType': type})
};

module.exports = {InsertListing, FindAll};