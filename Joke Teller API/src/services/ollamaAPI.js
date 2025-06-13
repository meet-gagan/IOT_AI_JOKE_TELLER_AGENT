import axios from 'axios'

const OLLAMA_BASE_URL = 'http://localhost:11434'

/**
 * Generate an AI response using Ollama Llama3.2
 * @param {Object} joke - The joke object to respond to
 * @returns {Promise<string>} - The AI generated response
 */
export const generateAIResponse = async (joke) => {
    try {
        const jokeText = joke.type === 'single'
            ? joke.joke
            : `${joke.setup} ${joke.delivery}`

        const prompt = `You just heard this joke: "${jokeText}"

Please respond in a friendly way that shows you enjoyed the joke. Keep your response short (1-2 sentences), positive, and maybe encourage them to tell another joke. Be supportive and friendly.`

        const response = await axios.post(`${OLLAMA_BASE_URL}/api/generate`,
            {
                model: 'llama3.2',
                prompt: prompt,
                stream: false,
                options:
                {
                    temperature: 0.7,
                    max_tokens: 100
                }
            })

        if (response.data && response.data.response) {
            return response.data.response.trim()
        }

        throw new Error('No response from Ollama')
    } catch (error) {
        console.error('Error generating AI response:', error)

        // Fallback responses if Ollama is not available
        const fallbackResponses = [
            "That's a good one! Got any more jokes?",
            "That made me chuckle! You've got great taste in humor!",
            "Nice joke! I love a good laugh - tell me another!",
            "That's hilarious! You're really brightening my day!",
            "Great joke! Your sense of humor is fantastic!",
            "I enjoyed that one! Keep the laughs coming!",
            "That's clever! I appreciate a well-crafted joke!",
            "Brilliant! You definitely know how to tell a good joke!"
        ]

        const randomIndex = Math.floor(Math.random() * fallbackResponses.length)
        return fallbackResponses[randomIndex]
    }
}

/**
 * Check if Ollama is running and has the llama3.2 model
 * @returns {Promise<boolean>} - Whether Ollama is available
 */
export const checkOllamaAvailability = async () => {
    try {
        const response = await axios.get(`${OLLAMA_BASE_URL}/api/tags`)
        const models = response.data.models || []
        return models.some(model => model.name.includes('llama3.2'))
    } catch (error) {
        console.warn('Ollama not available:', error.message)
        return false
    }
}

/**
 * Refine a joke using Ollama Llama3.2 to make it funnier or cleaner
 * @param {Object} joke - The joke object to refine
 * @returns {Promise<Object>} - The refined joke object
 */
export const refineJoke = async (joke) => 
    {
    try 
    {
        const jokeText = joke.type === 'single'
            ? joke.joke
            : `${joke.setup}\n${joke.delivery}`

        const prompt = `Please refine this joke to make it funnier, cleaner, and more engaging while keeping the same general meaning and structure. The joke should remain family-friendly and appropriate for all audiences.

Original joke:
${jokeText}

Please provide the refined version in the same format. If it's a single joke, just provide the refined joke text. If it's a two-part joke, provide the setup on the first line and the delivery/punchline on the second line, without any labels.

Make it more polished and entertaining while maintaining the original humor style.`

        const response = await axios.post(`${OLLAMA_BASE_URL}/api/generate`, 
            {
            model: 'llama3.2',
            prompt: prompt,
            stream: false,
            options: {
                temperature: 0.8,
                max_tokens: 200
            }
        })

        if (response.data && response.data.response) 
            {
            const refinedText = response.data.response.trim()

            // Parse the refined joke back into the original format
            if (joke.type === 'single') 
            {
                return {
                    ...joke,
                    joke: refinedText,
                    refined: true
                }
            } 
            else 
            {
                // Try to parse setup and delivery from refined text (expecting two lines)
                const lines = refinedText.split('\n').filter(line => line.trim())

                if (lines.length >= 2) 
                {
                    return {
                        ...joke,
                        setup: lines[0].trim(),
                        delivery: lines[1].trim(),
                        refined: true
                    }
                } 
                else if (lines.length === 1) 
                {
                    // If only one line, treat as single joke
                    return {
                        ...joke,
                        type: 'single',
                        joke: lines[0].trim(),
                        refined: true
                    }
                } 
                else 
                {
                    // Fallback: try to parse with old method
                    const setupMatch = refinedText.match(/Setup:\s*(.*?)(?:\n|Delivery:|$)/i)
                    const deliveryMatch = refinedText.match(/Delivery:\s*(.*?)$/i)

                    if (setupMatch && deliveryMatch) 
                    {
                        return {
                            ...joke,
                            setup: setupMatch[1].trim(),
                            delivery: deliveryMatch[1].trim(),
                            refined: true
                        }
                    } 
                    else 
                    {
                        // If all parsing fails, treat as single joke
                        return {
                            ...joke,
                            type: 'single',
                            joke: refinedText,
                            refined: true
                        }
                    }
                }
            }
        }

        throw new Error('No response from Ollama for joke refinement')
    } 
    
    catch (error) 
    {
        console.warn('Error refining joke with Ollama:', error.message)
        // Return original joke if refinement fails
        return {
            ...joke,
            refined: false
        }
    }
}
