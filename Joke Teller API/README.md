# 🎭 Joke Teller Agent

A delightful React-based web application that serves as your personal AI-powered joke companion! This app combines the humor of JokeAPI with the intelligence of Ollama's Llama3.2 model to deliver jokes with friendly, personalized responses.

## ✨ Features

- 🎪 **Clean Family-Friendly Jokes**: Only safe, appropriate humor from JokeAPI
- 🤖 **AI-Refined Jokes**: Ollama Llama3.2 enhances and polishes jokes for better humor
- 🎯 **Category Selection**: Choose from Programming, Miscellaneous, Puns, Spooky, Christmas, or Any
- 💬 **AI Companion Responses**: Friendly AI reactions to each refined joke
- 🎨 **Simple Clean UI**: Traditional web design with basic CSS styling
- 📱 **Responsive Design**: Works great on desktop and mobile
- ⚡ **Fast & Lightweight**: Built with Vite for optimal performance
- 🔄 **Graceful Fallbacks**: Works even when AI is offline

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- [Ollama](https://ollama.com/) installed locally (optional, app works without it)

### Installation

#### Quick Setup (Recommended)
```bash
# Make setup script executable and run it
chmod +x setup.sh
./setup.sh

# Start the development server
npm run dev
```

#### Manual Setup
1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up Ollama (Optional but recommended)**
   ```bash
   # Install Ollama from https://ollama.com/
   # Then use our helper script:
   chmod +x start-ollama.sh
   ./start-ollama.sh
   
   # OR manually:
   ollama serve &
   ollama pull llama3.2
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Visit `http://localhost:3000` to see the app!

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🏗️ Project Structure

```
src/
├── components/
│   ├── JokeDisplay.jsx      # Displays jokes with formatting
│   ├── CategorySelector.jsx  # Category selection buttons
│   └── AIResponse.jsx       # AI companion responses
├── services/
│   ├── jokeAPI.js          # JokeAPI integration
│   └── ollamaAPI.js        # Ollama AI integration
├── App.jsx                 # Main application component
├── main.jsx               # React entry point
└── index.css              # Global styles and animations
```

## 🔌 API Integration

### JokeAPI
- **Endpoint**: `https://v2.jokeapi.dev/joke`
- **Features**: Category filtering, safe mode, multiple joke types
- **Fallback**: Built-in jokes when API is unavailable

### Ollama Integration
- **Model**: Llama3.2 (local installation)
- **Endpoint**: `http://localhost:11434`
- **Features**: 
  - **Joke Refinement**: Enhances and polishes original jokes for better humor
  - **AI Responses**: Contextual responses with friendly tone
- **Fallback**: Original unrefined jokes and predefined responses when AI is offline

## 🎭 How It Works

1. **Fetch**: Gets a joke from JokeAPI based on selected category
2. **Refine**: Ollama Llama3.2 enhances the joke for better humor and clarity
3. **Display**: Shows the refined joke with an indicator
4. **Respond**: AI provides a friendly response to the refined joke

## 🎨 Design Features

- **Glassmorphism UI**: Modern frosted glass effects
- **Gradient Backgrounds**: Beautiful color transitions
- **Smooth Animations**: Hover effects and loading states
- **Responsive Layout**: Adapts to all screen sizes
- **Accessibility**: Proper ARIA labels and keyboard navigation

## 🧪 Usage Examples

1. **Basic Usage**: Click "Tell me a joke!" for a random joke
2. **Category Selection**: Choose a specific category for targeted humor
3. **AI Interaction**: Enjoy personalized AI responses to each joke
4. **Continuous Fun**: Keep clicking for endless entertainment!

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [JokeAPI](https://jokeapi.dev/) for providing clean, categorized jokes
- [Ollama](https://ollama.com/) for local AI model hosting
- [React](https://reactjs.org/) for the amazing framework
- [Vite](https://vitejs.dev/) for blazing fast development
- [Lucide React](https://lucide.dev/) for beautiful icons

## 🐛 Troubleshooting

### Common Issues

1. **Ollama not responding**: Make sure Ollama is installed and running with `ollama serve`
2. **Model not found**: Pull the Llama3.2 model with `ollama pull llama3.2`
3. **Network errors**: Check your internet connection for JokeAPI access
4. **Port conflicts**: Change the port in `vite.config.js` if needed

### Support

If you encounter any issues or have questions, please open an issue on GitHub or contact the maintainers.

---

Made with ❤️ for spreading joy and laughter! 🎭✨
