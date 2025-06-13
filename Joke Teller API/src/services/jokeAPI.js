import axios from 'axios'

const JOKE_API_BASE_URL = 'https://v2.jokeapi.dev/joke'

/**
 * Fetch a joke from JokeAPI
 * @param {string} category - The category of joke to fetch
 * @returns {Promise<Object>} - The joke object
 */
export const fetchJoke = async (category = 'any') => 
  {
  try 
  {
    const params = 
    {
      safe: true, // Only safe jokes
      type: 'single,twopart', // Both single and two-part jokes
      format: 'json'
    }

    const url = category === 'any' 
      ? `${JOKE_API_BASE_URL}/Any`
      : `${JOKE_API_BASE_URL}/${category}`

    const response = await axios.get(url, { params })
    
    if (response.data.error) 
    {
      throw new Error(response.data.message || 'Failed to fetch joke')
    }

    return response.data
  } 
  catch (error) 
  {
    console.error('Error fetching joke:', error)
    
    // Fallback joke if API fails
    return {
      type: 'single',
      category: 'Programming',
      joke: "Why do programmers prefer dark mode? Because light attracts bugs! 🐛",
      safe: true,
      id: 0,
      flags: {
        nsfw: false,
        religious: false,
        political: false,
        racist: false,
        sexist: false,
        explicit: false
      }
    }
  }
}

/**
 * Get available joke categories
 * @returns {Promise<Array>} - Array of available categories
 */
export const getJokeCategories = async () => 
  {
  try 
  {
    const response = await axios.get(`${JOKE_API_BASE_URL}/categories`)
    return response.data.categories || ['Programming', 'Misc', 'Pun', 'Spooky', 'Christmas']
  } 
  catch (error) 
  {
    console.error('Error fetching categories:', error)
    return ['Programming', 'Misc', 'Pun', 'Spooky', 'Christmas']
  }
}
