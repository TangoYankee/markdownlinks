const mockSafeBrowseReponse = {
  "matches": [
    {
      "threatType": "MALWARE",
      "platformType": "ANY_PLATFORM",
      "threat": {
        "url": "testsafebrowsing.appspot.com/s/malware.html"
      },
      "cacheDuration": "300s",
      "threatEntryType": "URL"
    },
    {
      "threatType": "SOCIAL_ENGINEERING",
      "platformType": "ANY_PLATFORM",
      "threat": {
        "url": "testsafebrowsing.appspot.com/apiv4/OSX/SOCIAL_ENGINEERING/URL/"
      },
      "cacheDuration": "300s",
      "threatEntryType": "URL"
    },
    {
      // Takes place of nasa.gov
    }
  ]
}

module.exports = {
  mockSafeBrowseReponse
}
