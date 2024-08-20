import { OpenAI } from 'openai';

import { generateOpenAIQuery } from '../../utils/index.js';

export async function generateTripPlanService(tripData) {
    try {
        const openai = new OpenAI({
            apiKey: process.env.OPEN_AI_KEY
        });

        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "user",
                    content: generateOpenAIQuery(tripData)
                }
            ],
        });

        return completion.choices[0].message.content;
    } catch {
        throw "Error creating a trip plan.";
    }
}