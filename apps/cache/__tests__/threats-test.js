const { setUrlDomainKeys, setCacheThreats, setCacheDuration } = require('../threats')
const { 
    hyperTexts, urlDomainKeys, hyperTextThreats,
    cacheThreats, cacheDurationUnits, cacheDuration 
} = require('../test-data/threats-data')

test(
    'setUrlDomainKeys() /* list of urls to look for in cache */',
    () => {
        expect(setUrlDomainKeys(hyperTexts)).toEqual(urlDomainKeys)
    })

test(
    'setCacheDuration() /* string with units to integar */',
    () => {
        expect(setCacheDuration(cacheDurationUnits)).toEqual(cacheDuration)
    }
    )

test(
    'setCacheThreats() /* cache-friendly threat format */',
    () => {
        expect(setCacheThreats(hyperTextThreats)).toEqual(cacheThreats)
    }
)
