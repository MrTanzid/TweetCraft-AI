import React, { useState } from 'react';
import { TwitterIcon, Moon, Sun, Sparkles, RotateCcw } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';
import TweetForm from './components/TweetForm';
import TweetPreview from './components/TweetPreview';
import { TweetFormData, GeneratedTweet } from './types';
import { generateTweetsWithGemini } from './lib/gemini';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [generatedTweets, setGeneratedTweets] = useState<GeneratedTweet[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleSubmit = async (formData: TweetFormData) => {
    setIsLoading(true);
    try {
      const tweets = await generateTweetsWithGemini(formData);
      setGeneratedTweets(tweets);
    } catch (error) {
      console.error('Error generating tweets:', error);
      toast.error('Failed to generate tweets. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setGeneratedTweets([]);
    toast.success('Tweets cleared! Ready for new ideas ✨', {
      icon: '🔄',
      style: {
        background: isDarkMode ? '#374151' : '#ffffff',
        color: isDarkMode ? '#ffffff' : '#000000',
      },
    });
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <Toaster position="top-right" />
      
      {/* Theme Toggle */}
      <button
        onClick={toggleDarkMode}
        className="fixed top-4 right-4 p-2 rounded-full bg-opacity-20 backdrop-blur-sm hover:bg-opacity-30 transition-all duration-300 animate-fade-in"
      >
        {isDarkMode ? (
          <Sun className="h-6 w-6 text-yellow-400" />
        ) : (
          <Moon className="h-6 w-6 text-gray-600" />
        )}
      </button>

      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center mb-6 relative">
            <div className="absolute animate-ping opacity-75">
              <Sparkles className="h-16 w-16 text-blue-500" />
            </div>
            <TwitterIcon className="h-16 w-16 text-blue-500 animate-bounce" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text animate-gradient">
            TweetCraft AI
          </h1>
          <p className="mt-3 text-lg dark:text-gray-300 transition-colors duration-300">
            Craft magical tweets with AI-powered inspiration ✨
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-8 mb-8 transform hover:scale-[1.01] transition-all duration-300">
          <TweetForm onSubmit={handleSubmit} isLoading={isLoading} />
        </div>

        {generatedTweets.length > 0 && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold dark:text-white transition-colors duration-300">
                Your Crafted Tweets
              </h2>
              <button
                onClick={handleReset}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300"
              >
                <RotateCcw className="h-4 w-4" />
                Reset
              </button>
            </div>
            {generatedTweets.map((tweet, index) => (
              <TweetPreview key={index} tweet={tweet} />
            ))}
          </div>
        )}

        <footer className="mt-16 text-center text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300">
          <p>© 2025 TweetCraft AI. Crafted with 💙 by <a href="https://t.me/sp_mrt" target="_blank" rel="noopener noreferrer" className="font-semibold hover:text-blue-500 transition-colors duration-300">MrTanzid</a></p>
        </footer>
      </div>
    </div>
  );
}

export default App;