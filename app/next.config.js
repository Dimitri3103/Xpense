const withPlugins = require("next-compose-plugins");
const withImages = require("next-images");
const withSass = require("@zeit/next-sass");
const withCSS = require("@zeit/next-css");


require('dotenv').config()

module.exports = withPlugins([[withSass], [withImages], [withCSS]], {

    rewrites: function () {
        return [
            {
                source: '/api/:slug*',
                destination: 'http://localhost:7000/api/:slug*', // Matched parameters can be used in the destination
            },
        ]
    }
});