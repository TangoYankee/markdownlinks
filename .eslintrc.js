module.exports = {
    "extends": "standard",
    "parserOptions": {
        "ecmaVersion": 2019
    },
    "overrides": [
        {
            "files": [ "public/js/*.js" ],
            "rules": {
                "no-undef": "off"
            }
        }
    ]
};
