// Use the lookup API to determine whether the shared link is on a list of potentially harmful websites

// https://developers.google.com/safe-browsing/v4/lookup-api

// Construct the request to look for "phishing", "social_engineering", "malware" [for any OS], or "unwanted_software" [for any OS]
// If the link is associated with a risk, tag it as potentially harmful
// tag it as one of the listed categories. If there are multiple threats categories, use the tag 'multiple'. If there are no threats, use the tag "none"

// Master function
// - accept a list of "threat_urls"
// - read the cache (readCacheUrls(threat_urls))
// - set cached_threat_url array equal to variable
// - set uncached_threat_urls list equal to variable
// - call the Google safe browsing lookup API (lookupRequest(uncached_threat_urls))
// - set uncached_threat_url array equal to a variable
// - write the checked_uncached_threat_url array to the cache (createCacheUrls(checked_uncached_threat_url))
// - combine the cached and uncached threat url arrays into one array ("checked_threat_urls")
// - return an array of "threat_url" and its "threat_type" (checked_threat_urls)

// lookupBody
// The template JSON Object of the Lookup API body
// accept the uncached_threat_urls
// return the JSON object with the urls inserted

// readCacheUrls
// - accept full list of "threat_urls"
// - check against cached urls
// - return
// - list of "uncached_threat_urls" that were not avaible in the cache
// - array of "cached_threat_url" and "threat_type" [maybe "cache_error"]

// createCacheUrls
// - accept array of "uncached_threat_url" and "threat_type"
// - write the urls to the cache [threat_url, threat_type, cached_timeout]
// - return success or error state

// lookupRequest
// - accept the "uncached_threat_urls"
// - compose the body of the lookup request
// - make the post?get? request to the Safe Browsing database
// - return the body or error of the lookup response

// lookupParse
//
