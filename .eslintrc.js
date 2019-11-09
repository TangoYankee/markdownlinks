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
                "apps/messages/messages.test.js",
                "apps/messages/block-templates.js",
                "apps/format/link-data.js",
                "apps/format/link-data.test.js",
                "apps/format/format.test.js",
                "apps/format/format.js",
                "apps/safe-browse/safe-browse.js",
                "apps/safe-browse/safe-browse.test.js",
                "apps/safe-browse/safe-browse-mock.js",
                "apps/safe-browse/warnings.js",
                "async-tutorial/post-safe-browse.js",
                "async-tutorial/__tests__/post-safe-browse-test.js",
                "async-tutorial/__mocks__/post-safe-browse.js",
        ],
            "rules": {
                "quote-props": "off",
                "quotes": "off"
            }

        }
    ]
};
