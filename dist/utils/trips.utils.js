"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateOpenAIQuery = generateOpenAIQuery;
exports.prepareTripDataObject = prepareTripDataObject;
// Function for generating a OpenAI query for a trip itinerary
function generateOpenAIQuery(tripData) {
    const { destination = '', startDate = '', endDate = '', numOfTravellers = '', modeOfTransport = '' } = tripData;
    return `I'd like your help to create a simple trip itinerary. 
    Destination is ${destination}. 
    I am arriving on this date: ${startDate}. 
    I will be ending my trip on this date: ${endDate}. 
    Number of travellers is ${numOfTravellers}. 
    Mode of transportation is ${modeOfTransport}. 
    Can you create a day-by-day itinerary that includes must-see attractions, 
    recommended restaurants, and any side trips a person could take there?`;
}
;
// Function for building a tripData object that is commonly used in trips service functions
function prepareTripDataObject(reqBody) {
    const { title, itinerary, destination, startDate, endDate, numOfTravellers, modeOfTransport } = reqBody;
    return {
        title,
        itinerary,
        destination,
        startDate,
        endDate,
        numOfTravellers,
        modeOfTransport
    };
}
;
