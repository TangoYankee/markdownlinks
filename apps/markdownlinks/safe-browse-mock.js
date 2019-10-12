// 1
// Request
/*
    curl -d '{
        "client":
            {"clientId": "", "clientVersion": "1.5.2"},
        "threatInfo":
            {"platformTypes": ["ANY_PLATFORM"],
        "threatEntries": [
            {"url": "http://testsafebrowsing.appspot.com/s/malware.html"},
            {"url": "http://testsafebrowsing.appspot.com/apiv4/OSX/SOCIAL_ENGINEERING/URL/"}
        ],
        "threatEntryTypes": ["URL"],
        "threatTypes": [
            "MALWARE",
            "SOCIAL_ENGINEERING"
        ]}}'
        -H "Content-Type: application/json"
        -X POST https://safebrowsing.googleapis.com/v4/threatMatches:find?key=""
*/
// Response
/*
{
  "matches": [
    {
      "threatType": "MALWARE",
      "platformType": "ANY_PLATFORM",
      "threat": {
        "url": "http://testsafebrowsing.appspot.com/s/malware.html"
      },
      "cacheDuration": "300s",
      "threatEntryType": "URL"
    },
    {
      "threatType": "SOCIAL_ENGINEERING",
      "platformType": "ANY_PLATFORM",
      "threat": {
        "url": "http://testsafebrowsing.appspot.com/apiv4/OSX/SOCIAL_ENGINEERING/URL/"
      },
      "cacheDuration": "300s",
      "threatEntryType": "URL"
    }
  ]
}
*/

// 2
// Request
/*
curl -d '{
    "client":
        {"clientId": "", "clientVersion": "1.5.2"},
    "threatInfo":
        {"platformTypes": ["ANY_PLATFORM"],
    "threatEntries": [{"url": "http://testsafebrowsing.appspot.com/s/phishing.html"}],
    "threatEntryTypes": ["URL"],
    "threatTypes": [
        "SOCIAL_ENGINEERING"
    ]}}'
    -H "Content-Type: application/json"
    -X POST https://safebrowsing.googleapis.com/v4/threatMatches:find?key=""
*/
// Response
/*
{
    "matches": [
      {
        "threatType": "SOCIAL_ENGINEERING",
        "platformType": "ANY_PLATFORM",
        "threat": {
          "url": "http://testsafebrowsing.appspot.com/s/phishing.html"
        },
        "cacheDuration": "300s",
        "threatEntryType": "URL"
      }
    ]
  }
*/

// 3
// Request
/*
{
    "client":
        {"clientId": "", "clientVersion": "1.5.2"},
    "threatInfo":
    {"platformTypes": ["ANY_PLATFORM"],
    "threatEntries": [{"url": "http://testsafebrowsing.appspot.com/s/malware_in_iframe.html"}],
    "threatEntryTypes": ["URL"], "threatTypes": ["SOCIAL_ENGINEERING"]}}'
    -H "Content-Type: application/json"
    -X POST https://safebrowsing.googleapis.com/v4/threatMatches:find?key=""
*/
// Response
/*
{}
*/
