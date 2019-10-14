// Template https://developers.google.com/safe-browsing/v4/lookup-api
/*
  {
    "client": {
      "clientId": "process.env.GOOGLE_SAFE_BROWSING_CLIENT_ID
      "clientVersion": "1.5.2"
    },
    "threatInfo": {
      "threatTypes": ["THREAT_TYPE_UNSPECIFIED", "MALWARE", "SOCIAL_ENGINEERING", "UNWANTED_SOFTWARE", "POTENTIALLY_HARMFUL_APPLICATION"],
      "platformTypes": ["ANY_PLATFORM"],
      "threatEntryTypes": ["URL"],
      "threatEntries": [
        {"url": "http://www.urltocheck1.org/"},
        {"url": "http://www.urltocheck2.org/"},
        {"url": "http://www.urltocheck3.com/"}
      ]
    }
  }
*/

// Testing urls: http://testsafebrowsing.appspot.com/
/*
{"url": "http://testsafebrowsing.appspot.com/s/malware.html"},
{"url": "http://testsafebrowsing.appspot.com/s/malware_in_iframe.html"},
{"url": "http://testsafebrowsing.appspot.com/apiv4/OSX/SOCIAL_ENGINEERING/URL/"},
{"url": "http://testsafebrowsing.appspot.com/s/phishing.html"}
*/

// Removed tests to avoid API calls
// 1
/*
  test('the main function demonstrate the integration of all functions', () => {
   expect(safeBrowse(["http://testsafebrowsing.appspot.com/s/phishing.html", "http://testsafebrowsing.appspot.com/s/malware.html"])).toEqual({ "client": { "clientId": process.env.GOOGLE_SAFE_BROWSING_CLIENT_ID, "clientVersion": "1.5.2" }, "threatInfo": { "platformTypes": ["ANY_PLATFORM"], "threatEntries": [{ "url": "http://testsafebrowsing.appspot.com/s/phishing.html" }, { "url": "http://testsafebrowsing.appspot.com/s/malware.html" }], "threatEntryTypes": ["URL"], "threatTypes": ["MALWARE", "SOCIAL_ENGINEERING", "UNWANTED_SOFTWARE"] } })
  })
*/

// 2
/*
jest.mock('request')
test('should fetch threat matches', () => {
  const threatMatches = {
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
  const resp = { data: threatMatches }
  request.post.mockResolvedValue(resp)
  return postLookupApi(expect(body).toEqual(threatMatches))
})
*/

// Sample Requests
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
}
*/
// Response
/*
{}
*/

// 4
// Request
/*
{
  "client":
    {"clientId":"", "clientVersion": "1.5.2"},
    "threatInfo": {"platformTypes": ["ANY_PLATFORM"],
    "threatEntries": [{"url": "testsafebrowsing.appspot.com/s/malware.html"}],
    "threatEntryTypes": ["URL"],
    "threatTypes": ["MALWARE",]}}'
    -H "Content-Type: application/json"
    -X POST https://safebrowsing.googleapis.com/v4/threatMatches:find?key=
  {
  "matches": [
    {
      "threatType": "MALWARE",
      "platformType": "ANY_PLATFORM",
      "threat": {
        "url": "testsafebrowsing.appspot.com/s/malware.html"
      },
      "cacheDuration": "300s",
      "threatEntryType": "URL"
    }
  ]
}

// Curl
// curl -d '{"key1":"value1", "key2":"value2"}' -H "Content-Type: application/json" -X POST http://localhost:3000/data
// https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${process.env.GOOGLE_SAFE_BROWSING_KEY}

// curl -d '{"client": {"clientId": process.env.GOOGLE_SAFE_BROWSE_CLIENT_ID, "clientVersion": "1.5.2"}, "threatInfo": {"platformTypes": ["ANY_PLATFORM"], "threatEntries": [{"url": "http://testsafebrowsing.appspot.com/s/malware.html"}], "threatEntryTypes": ["URL"], "threatTypes": ["MALWARE",]}}' -H "Content-Type: application/json" -X POST https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${process.env.GOOGLE_SAFE_BROWSING_KEY}

const threatMatches = {
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
