var twoThreats = {
  /* Create original message to be used in tests that has three hyperlinks.
        1. Shared with https and no threat
        2. Social engineering with http
        3. Malware with no http prefix */
  "message": "create message",
  "lookupError": "false",
  "threatTypes": [
    "SOCIAL_ENGINEERING",
    "MALWARE"
  ],
  "links": [
    {
      "cacheKeyFromUrl": "testsafebrowsing.appspot.com/apiv4/OSX/SOCIAL_ENGINEERING/URL/",
      "cacheDuration": "300s",
      "markdownLink": "[Social Engineering Site](http://testsafebrowsing.appspot.com/apiv4/OSX/SOCIAL_ENGINEERING/URL/)",
      "messageLink": "<http://testsafebrowsing.appspot.com/apiv4/OSX/SOCIAL_ENGINEERING/URL/|Social Engineering Site>",
      "sharedAsHttpSecure": false,
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
      "cacheKeyFromUrl": "https://nasa.gov",
      "cacheDuration": "",
      "markdownLink": "[Nasa](https://nasa.gov)",
      "messageLink": "<https://nasa.gov|Nasa>",
      "sharedAsHttpSecure": true,
      "threatMatch": ""
    }
  ]
}
