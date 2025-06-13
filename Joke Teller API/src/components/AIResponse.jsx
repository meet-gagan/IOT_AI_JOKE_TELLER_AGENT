import React from 'react'

const AIResponse = ({ response, loading }) => 
  {
  if (!response && !loading) return null

  return (
    <div className="ai-response">
      <div className="mb-2">
        <strong>AI Companion says:</strong>
      </div>
      {loading ? (
        <div>
          <span className="loading"></span>
          <span> Thinking of something funny to say...</span>
        </div>
      ) : (
        <p>{response}</p>
      )}
    </div>
  )
}

export default AIResponse
