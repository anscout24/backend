const NodeGeocoder = require('node-geocoder');

const options = {
    provider: 'google',
    apiKey: process.env.GOOGLE_API_KEY,
    formatter: null // 'gpx', 'string', ...
};

const geocoder = NodeGeocoder(options);

module.exports = class GetGeodData {

    static async FetchFromGoogle (req) {

        // String so that google can achieve maximum hit accuracy
        let searchstring = ''+req.city+','+req.postCode+','+req.street+' '+req.houseNumber;

        const res = await geocoder.geocode(searchstring);

        return  {...req, ...res[0]};


    }

};

