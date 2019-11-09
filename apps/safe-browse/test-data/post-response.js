const response = {
    "body": {
      "matches": [
        {
          "cacheDuration": "300s",
          "platformType": "ANY_PLATFORM",
          "threat": {
            "url": "testsafebrowsing.appspot.com/s/malware.html"
          },
          "threatEntryType": "URL",
          "threatType": "MALWARE"
        }
      ]
    },
    "headers": {
      "accept-ranges": "none",
      "alt-svc": "quic=\":443\"; ma=2592000; v=\"46,43\",h3-Q050=\":443\"; ma=2592000,h3-Q049=\":443\"; ma=2592000,h3-Q048=\":443\"; ma=2592000,h3-Q046=\":443\"; ma=2592000,h3-Q043=\":443\"; ma=2592000",
      "cache-control": "private",
      "connection": "close",
      "content-type": "application/json; charset=UTF-8",
      "date": "Sat, 09 Nov 2019 03:22:00 GMT",
      "server": "ESF",
      "vary": "Accept-Encoding",
      "x-content-type-options": "nosniff",
      "x-frame-options": "SAMEORIGIN",
      "x-xss-protection": "0"
    },
    "request": {
      "headers": {
        "accept": "application/json",
        "content-length": 337,
        "content-type": "application/json"
      },
      "method": "POST",
      "uri": {
        "auth": null,
        "hash": null,
        "host": "safebrowsing.googleapis.com",
        "hostname": "safebrowsing.googleapis.com",
        "href": "https://safebrowsing.googleapis.com/v4/threatMatches:find?key=",
        "path": "/v4/threatMatches:find?key=",
        "pathname": "/v4/threatMatches:find",
        "port": null,
        "protocol": "https:",
        "query": "key=",
        "search": "?key=",
        "slashes": true
      }
    },
    "statusCode": 200
  }

  module.exports = {
      response
  }