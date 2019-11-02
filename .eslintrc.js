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
        {   /* json specific quote syntax */
            "files": [
                "apps/markdownlinks/messages.js",
                "apps/markdownlinks/messages.test.js",
                "apps/safe-browse/safe-browse.js",
                "apps/safe-browse/safe-browse.test.js",
                "apps/safe-browse/warnings.js"
        ],
            "rules": {
                "quote-props": "warn",
                "quotes": "warn"
            }

        }
    ]
};
