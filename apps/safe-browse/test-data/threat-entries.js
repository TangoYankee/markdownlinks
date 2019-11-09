var threatEntries = [
  { "url": "testsafebrowsing.appspot.com/apiv4/osx/social_engineering/url/" }, 
  { "url": "testsafebrowsing.appspot.com/s/malware.html" }, 
  { "url": "nasa.gov" }
]

var urlDomainKeysMeta = [
    {
      "cacheKeyFromUrl": "testsafebrowsing.appspot.com/apiv4/osx/social_engineering/url/",
      "cacheDuration": "300s",
      "markdownLink": "[Social Engineering Site](https://testsafebrowsing.appspot.com/apiv4/OSX/SOCIAL_ENGINEERING/URL/)",
      "messageLink": "<https://testsafebrowsing.appspot.com/apiv4/osx/sociakl_engineering/url/|Social Engineering Site>",
      "sharedAsHttpSecure": true,
      "threatMatch": "SOCIAL_ENGINEERING"
    },
    {
      "cacheKeyFromUrl": "testsafebrowsing.appspot.com/s/malware.html",
      "cacheDuration": "300s",
      "markdownLink": "[Malware Site](testsafebrowsing.appspot.com/s/malware.html)",
      "messageLink": "<https://testsafebrowsing.appspot.com/s/malware.html|Malware Site>",
      "sharedAsHttpSecure": false,
      "threatMatch": "MALWARE"
    },
    {
      "cacheKeyFromUrl": "nasa.gov",
      "cacheDuration": "",
      "markdownLink": "[Nasa](nasa.gov)",
      "messageLink": "<https://nasa.gov|Nasa>",
      "sharedAsHttpSecure": false,
      "threatMatch": ""
    }
  ]

    var requestBody = {
        "client": {
          "clientId": process.env.GOOGLE_SAFE_BROWSING_CLIENT_ID,
          "clientVersion": "1.5.2"
        },
        "threatInfo": {
          "platformTypes": ["ANY_PLATFORM"],
          "threatEntries": [
            { "url": "testsafebrowsing.appspot.com/apiv4/osx/social_engineering/url/" },
            { "url": "testsafebrowsing.appspot.com/s/malware.html" },
            { "url": "nasa.gov" }
          ],
          "threatEntryTypes": ["URL"],
          "threatTypes": [
            "THREAT_TYPE_UNSPECIFIED",
            "MALWARE",
            "SOCIAL_ENGINEERING",
            "UNWANTED_SOFTWARE",
            "POTENTIALLY_HARMFUL_APPLICATION"
          ]
        }
      }

module.exports = {  
  threatEntries,
    urlDomainKeysMeta,
    requestBody
}
