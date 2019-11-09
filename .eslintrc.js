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
        }
    ]
};
