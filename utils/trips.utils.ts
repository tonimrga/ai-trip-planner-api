import { ITrip } from '../types';

// Function for generating a OpenAI query for a trip itinerary
export function generateOpenAIQuery(tripData: ITrip): string {
  const {
    destination = '',
    startDate = '',
    endDate = '',
    numOfTravellers = '',
    modeOfTransport = ''
  } = tripData;

  return `I'd like your help to create a simple trip itinerary. 
    Destination is ${destination}. 
    I am arriving on this date: ${startDate}. 
    I will be ending my trip on this date: ${endDate}. 
    Number of travellers is ${numOfTravellers}. 
    Mode of transportation is ${modeOfTransport}. 
    Can you create a day-by-day itinerary that includes must-see attractions, 
    recommended restaurants, and any side trips a person could take there? 
    The answer should only contain an itinerary without intro and outro text.`;
}
