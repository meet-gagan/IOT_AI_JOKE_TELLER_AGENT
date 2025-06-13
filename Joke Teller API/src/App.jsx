import React, { useState, useEffect } from 'react'
import JokeDisplay from './components/JokeDisplay'
import CategorySelector from './components/CategorySelector'
import AIResponse from './components/AIResponse'
import { fetchJoke } from './services/jokeAPI'
import { refineJoke, generateAIResponse } from './services/ollamaAPI'

function App() {
  const [joke, setJoke] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState('any')
  const [loading, setLoading] = useState(false)
  const [refining, setRefining] = useState(false)
  const [aiResponse, setAiResponse] = useState('')
  const [aiLoading, setAiLoading] = useState(false)
  const [error, setError] = useState('')

  const categories = [
    { id: 'any', name: 'Any' },
    { id: 'programming', name: 'Programming' },
    { id: 'misc', name: 'Miscellaneous' },
    { id: 'pun', name: 'Pun' },
    { id: 'spooky', name: 'Spooky' },
    { id: 'christmas', name: 'Christmas' }
  ]

  const handleGetJoke = async () => {
    setLoading(true)
    setError('')
    setAiResponse('')

    try {
      // Step 1: Fetch joke from JokeAPI
      const originalJoke = await fetchJoke(selectedCategory)

      // Step 2: Refine the joke using Ollama
      setRefining(true)
      const refinedJoke = await refineJoke(originalJoke)
      setJoke(refinedJoke)
      setRefining(false)

      // Step 3: Generate AI response to the refined joke
      setAiLoading(true)
      try 
      {
        const response = await generateAIResponse(refinedJoke)
        setAiResponse(response)
      } 
      catch (aiError) 
      {
        console.warn('AI response failed:', aiError.message)
        setAiResponse("I enjoyed that refined joke! Want to hear another one?")
      }
      setAiLoading(false)

    } 
    catch (error) 
    {
      setError(`Failed to fetch joke: ${error.message}`)
      setRefining(false)
      setAiLoading(false)
    } 
    finally 
    {
      setLoading(false)
    }
  }

  // Get initial joke on component mount
  useEffect(() => 
    {
    handleGetJoke()
  }, [])

  return (
    <div className="App">
      <div className="app-header">
        <h1 className="app-title">Joke Teller Agent</h1>
        <p className="app-subtitle">Your friendly AI-powered joke companion with refined humor!</p>
      </div>

      <div className="joke-container">
        <CategorySelector
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        <button
          className="joke-btn"
          onClick={handleGetJoke}
          disabled={loading || refining}
        >
          {loading ? 'Fetching joke...' :
            refining ? 'Refining joke with AI...' :
              'Tell me a refined joke!'}
        </button>

        {error && (
          <div className="error">
            {error}
          </div>
        )}

        {joke && (
          <>
            <JokeDisplay joke={joke} />
            {joke.refined && (
              <div className="refinement-indicator">
                ✨ This joke has been refined by AI for better humor!
              </div>
            )}
            <AIResponse response={aiResponse} loading={aiLoading} />
          </>
        )}
      </div>

      <div className="app-footer">
        <p>Powered by JokeAPI & Ollama Llama3.2</p>
        <p>Made with love for spreading refined smiles</p>
      </div>
    </div>
  )
}

export default App
