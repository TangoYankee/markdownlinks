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
                "no-undef": "off"
            }
        },
        {   /* json specific quote syntax */
            "files": [
                "apps/markdownlinks/messages/messages.test.js",
                "apps/markdownlinks/messages/block-templates.js",
                "apps/markdownlinks/format/link-data.js",
                "apps/markdownlinks/format/format-tests/link-data.test.js",
                "apps/safe-browse/safe-browse.js",
                "apps/safe-browse/safe-browse.test.js",
                "apps/safe-browse/safe-browse-mock.js",
                "apps/safe-browse/warnings.js"
        ],
            "rules": {
                "quote-props": "off",
                "quotes": "off"
            }

        }
    ]
};
