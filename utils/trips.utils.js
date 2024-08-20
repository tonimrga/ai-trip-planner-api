export const generateOpenAIQuery = (tripData) => {
    const { destination = '', duration = '', numOfTravellers = '', modeOfTransport = '' } = tripData;

    return `I'd like your help to create a trip itinerary. 
    Destination is ${destination}. 
    Duration is ${duration} days. 
    Number of travellers is ${numOfTravellers}. 
    Mode of transportation is ${modeOfTransport}. 
    Can you create a day-by-day itinerary that includes must-see attractions, 
    recommended restaurants, and any side trips a person could take there?`
};