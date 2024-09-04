import { ITrip } from '../types';

// Function for generating a OpenAI query for a trip itinerary
export function generateOpenAIQuery(tripData: ITrip): string {
  const {
    destination = '',
    startDate = '',
    endDate = '',
    numOfTravellers = '',
    modeOfTransport = '',
    interests = []
  } = tripData;

  if (destination === '') {
    throw 'Destination is empty.';
  }

  if (startDate === '') {
    throw 'Start date is empty.';
  }

  if (endDate === '') {
    throw 'End date is empty.';
  }

  let query = `I would like your help to create a simple trip itinerary. 
    Destination is ${destination}. 
    I am arriving on this date: ${startDate}. 
    I will be ending my trip on this date: ${endDate}.`;

  if (startDate === endDate) {
    query += 'This will be a day trip. I will be arriving and leaving on the same date.';
  }

  if (numOfTravellers) {
    query += `Number of travellers is ${numOfTravellers}.`;
  }

  if (modeOfTransport) {
    query += `I will be arriving to the destination by a ${modeOfTransport}.`;
  }

  if (interests.length !== 0) {
    query += `I am interested in ${interests.toString()}.`;
  }

  query += `Can you create a day-by-day itinerary based on my interests that includes must-see attractions, 
    recommended sights, and any side trips a person could take there? 
    The answer should only contain an itinerary without intro and outro text.`;

  return query;
}
