/**
 * This file is written for backend functions to retrieve covid data from covid API.
 * This is not the file for backend API of for the server.
 * 
 * Functions in this file should be all "export function".
 * 
 * Coronavirus database currently used: disease.sh
 * NPMJS package docs: https://www.npmjs.com/package/novelcovid
 * Docs for disease.sh (not used, since we use its npm package): https://www.disease.sh/docs/#/
 * Github project link for disease.sh: https://github.com/disease-sh/API
 * 
 * the return for functions are 'Promise' since disease.sh API call is asynchronous.
 * 
 */

import novelcovid from 'novelcovid';

// api setting
const COVID_API = novelcovid;
COVID_API.settings({
    baseUrl: 'https://disease.sh'
})

export async function globalAll() {
    /**
     * Grab all covid global data.
     * return: Promise
     */

    // COVID_API.all().then(value => {
    //     console.log(typeof(value));
    //     console.log(value);
    //     console.log(JSON.parse(value));
    // })

    return await COVID_API.all();
}

export async function globalYesterdayAll() {
    /**
     * Grab all yesterday covid global data.
     * return: Promise
     */

    return await COVID_API.yesterday.all()
}

export async function countryCovidData(country) {
    /**
     * Grab covid data for a given country
     * return: Promise
     */

    return await COVID_API.countries({country: country});
}

export async function countryYesterdayCovidData(country) {
    /**
     * Grab yesterday covid data for a given country
     * return: Promise
     */

    return await COVID_API.yesterday.countries({country: country});
}

export async function statesCovidData(state) {
    /**
     * Grab covid data for a given state in United States
     * return: Promise
     */

    return await COVID_API.states({state: state})
}

export async function statesYesterdayCovidData(state) {
    /**
     * Grab yesterday covid data for a given state in United States
     * return: Promise
     */

    
    return await COVID_API.yesterday.states({state:state})
}

export async function globalHistorical(pastDays) {
    /**
     * Grab all historical global data
     * return: Promise
     */

    return await COVID_API.historical.all({days: pastDays});
}

export async function countryHistorical(country, pastDays) {
    /**
     * Grab all historical specified country data
     * return: Promise
     */

    return await COVID_API.historical.countries({country: country, days: pastDays});
}

