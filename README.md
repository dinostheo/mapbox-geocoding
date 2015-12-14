mapbox-geocoding
==========
Simple node.js wrapper module for querying the geocoding api of mapbox v4.

## Installation
```
  npm install mapbox-geocoding --save
```

## Usage

The mapbox-geocoding module exposes three methods, one for setting the mapbox public access token `setAccessToken` and two for querying the mapbox geocoding API `geocode` & `reverseGeocode`.

```js
  var geo = require('mapbox-geocoding');

  geo.setAccessToken('YOUR MAPBOX PUBLIC TOKEN');

  // Geocode an address to coordinates
  geo.geocode('mapbox.places', 'Dam Square, Amsterdam', function (err, geoData) {
	  console.log(geoData);
  });

  // Reverse geocode coordinates to address.
  geo.reverseGeocode('mapbox.places', '4.8936580', '52.3731720', function (err, geoData) {
	  console.log(geoData);
  });
```

## Tests
To run the tests execute:
```
	npm test
```

The tests have a configuration dependency, which is git ignored. To run the tests you will need config.js file under the config directory and of the following structure:
```js
/**
 * Module configuration.
 *
 * Contains the mapbox public access token for the tests.
 *
 * config/config.js
 */
module.exports = {
	access_token: 'PLACE YOUR MAPBOX API ACCESS TOKEN HERE'
};
```

## Dependencies

[request](https://github.com/request/request)
