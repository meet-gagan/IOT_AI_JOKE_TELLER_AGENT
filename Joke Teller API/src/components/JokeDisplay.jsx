import React from 'react'

const JokeDisplay = ({ joke }) => 
  {
  if (!joke) return null

  return (
    <div className="joke-text">
      {joke.type === 'single' ? (
        <p>{joke.joke}</p>
      ) : (
        <div>
          <p>{joke.setup}</p>
          <p>{joke.delivery}</p>
        </div>
      )}
      
      <div className="mt-4 text-sm opacity-75">
        <span>Category: {joke.category}</span>
        {joke.flags && Object.entries(joke.flags).some(([key, value]) => value) && (
          <span> | Content Warning</span>
        )}
      </div>
    </div>
  )
}

export default JokeDisplay
