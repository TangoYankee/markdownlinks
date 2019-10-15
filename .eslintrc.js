module.exports = {
    "env":{
        "jest": true,
        /* jquery file still ignored because it is 'min' */
        "jquery": true
    },
    "extends": "standard",
    "parserOptions": {
        "ecmaVersion": 2019
    },
    "overrides": [
        {   /* datalayer is not recongized by eslint */
            "files": [ "public/js/analytics.js" ],
            "rules": {
                "no-undef": "warn"
            }
        },
        {   /* slack's block kit builder and google's lookup api are specific on quotes syntax */
            "files": [
                "apps/markdownlinks/messages.js",
                "apps/safebrowse/safe-browse.js",
                "apps/safebrowse/safe-browse.test.js"
        ],
            "rules": {
                "quote-props": "off",
                "quotes": "off"
            }

        }
    ]
};
