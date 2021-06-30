// in-memory db
var loki = require('lokijs');
// create virt db
var db = new loki('mvp.db');

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
}

// not yet unique listingId
const InsertListing = (obj) => {
    
    // Ensuring that multiple items can also be added
    if (isArray(obj) ){
        obj.forEach(function (value,i) {
            const filteredData = SchemaFilter(value)
            listings.insert(filteredData)
        });
    } else {
        const filteredData = SchemaFilter(obj)
        listings.insert(filteredData)
    }

}

const FindAll = () => {
    return listings.find({})
}

const FindOneByType = (type) => {
    return listings.findOne({'realEstateType': type})
}

module.exports = {InsertListing, FindAll};