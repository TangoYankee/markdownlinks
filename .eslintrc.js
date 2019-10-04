module.exports = {
    "env":{
        "jest": true
    },
    "extends": "standard",
    "parserOptions": {
        "ecmaVersion": 2019
    },
    "overrides": [
        {   /* datalayer and jquery's '$' are not recongized by eslint */
            "files": [ "public/js/*.js" ],
            "rules": {
                "no-undef": "warn"
            }
        },
        {   /* slack's block kit builder is specific on quotes syntax */
            "files": [ "apps/markdownlinks/messages.js" ],
            "rules": {
                "quote-props": "warn",
                "quotes": "warn"
            }

        }
    ]
};
