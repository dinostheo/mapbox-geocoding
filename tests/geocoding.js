var geo = require('../');
var expect = require('chai').expect;
var config = require('../config/config');

describe('Mapbox-Geocoding module testing.', function () {
    describe('Error case without access token', function () {
        it('should return an error message when no access token is set.', function (done) {
            geo.geocode('mapbox.places', 'Dam Square, Amsterdam', function (err, geoData) {
                expect(err).to.equal('You have to set your mapbox public access token first.');
                expect(geoData).to.be.an('undefined');

                done();
            });
        });
    });

    describe('Mapbox API access token is set: ', function () {
        before(function (done) {
            geo.setAccessToken('12345678');

            done();
        });

        describe('Error case in empty parameters', function () {
            it('should return an error when no dataset is set.', function (done) {
                geo.geocode('', 'Some address', function (err, geoData) {
                    expect(err).to.equal('A mapbox dataset is required.');
                    expect(geoData).to.be.an('undefined');

                    done();
                });
            });

            it('should return an error when no query string is set.', function (done) {
                geo.geocode('mapbox.places', '', function (err, geoData) {
                    expect(err).to.equal('You have to specify the location to geocode.');
                    expect(geoData).to.be.an('undefined');

                    done();
                });
            });
        });

        describe('Error case in invalid access token', function () {
            it('should return an error in a API request with an invalid access token', function (done) {
                geo.geocode('mapbox.places', 'Dam Square, Amsterdam', function (err, geoData) {
                    expect(err).to.have.property('message');
                    expect(err.message).to.equal('Not Authorized - Invalid Token');
                    expect(geoData).to.be.an('undefined');

                    done();
                });
            });
        });
    });

    describe('Success case of the geocode method', function () {
        before(function (done) {
            geo.setAccessToken(config.access_token);

            done();
        });

        it('should return an object with geo data', function (done) {
            geo.geocode('mapbox.places', 'Dam Square, Amsterdam', function (err, geoData) {
                expect(err).to.be.a('null');
                expect(geoData).to.have.property('type');
                expect(geoData.type).to.equal('FeatureCollection');
                expect(geoData).to.have.property('query');
                expect(geoData.query).deep.equal([ 'dam', 'square', 'amsterdam' ]);
                expect(geoData).to.have.property('features');
                expect(geoData.features).to.be.an('array');
                expect(geoData.features[0]).to.have.property('id');
                expect(geoData.features[0]).to.have.property('type');
                expect(geoData.features[0]).to.have.property('text');
                expect(geoData.features[0]).to.have.property('place_name');
                expect(geoData.features[0]).to.have.property('relevance');
                expect(geoData.features[0]).to.have.property('center');
                expect(geoData.features[0]).to.have.property('geometry');
                expect(geoData.features[0]).to.have.property('bbox');
                expect(geoData.features[0]).to.have.property('properties');
                expect(geoData.features[0]).to.have.property('context');

                done();
            });
        });
    });

    describe('Success case of the reverse geocode method', function () {
        before(function (done) {
            geo.setAccessToken(config.access_token);

            done();
        });

        it('should return an object with geo data', function (done) {
            geo.reverseGeocode('mapbox.places', '4.8936580', '52.3731720', function (err, geoData) {
                expect(err).to.be.a('null');
                expect(geoData).to.have.property('type');
                expect(geoData.type).to.equal('FeatureCollection');
                expect(geoData).to.have.property('query');
                expect(geoData.query).deep.equal([ 4.893658, 52.373172 ]);
                expect(geoData).to.have.property('features');
                expect(geoData.features).to.be.an('array');
                expect(geoData.features[0]).to.have.property('id');
                expect(geoData.features[0]).to.have.property('type');
                expect(geoData.features[0]).to.have.property('text');
                expect(geoData.features[0].text).to.equal('Dam');
                expect(geoData.features[0]).to.have.property('place_name');
                expect(geoData.features[0]).to.have.property('relevance');
                expect(geoData.features[0]).to.have.property('center');
                expect(geoData.features[0]).to.have.property('geometry');
                expect(geoData.features[0]).to.have.property('bbox');
                expect(geoData.features[0]).to.have.property('properties');
                expect(geoData.features[0]).to.have.property('context');

                done();
            });
        });
    });
});
