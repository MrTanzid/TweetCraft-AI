import React, { useState } from 'react';
import { Hash, Users, MessageCircle, Target, Volume2, Sparkles, Zap, Smile } from 'lucide-react';
import { TweetFormData, ContentType, Tone, Sentiment } from '../types';

interface TweetFormProps {
  onSubmit: (data: TweetFormData) => void;
  isLoading: boolean;
}

export default function TweetForm({ onSubmit, isLoading }: TweetFormProps) {
  const [formData, setFormData] = useState<TweetFormData>({
    topic: '',
    keywords: [''],
    tone: 'casual',
    targetAudience: '',
    maxLength: 280,
    contentType: 'statement',
    sentiment: 'positive',
    callToAction: false,
    includeEmojis: false,
    languageStyle: 'default'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const updateKeyword = (index: number, value: string) => {
    const newKeywords = [...formData.keywords];
    newKeywords[index] = value;
    setFormData({ ...formData, keywords: newKeywords });
  };

  const addKeyword = () => {
    if (formData.keywords.length < 3) {
      setFormData({ ...formData, keywords: [...formData.keywords, ''] });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Topic Input */}
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-4 border-2 border-blue-100 dark:border-blue-900 hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-300">
        <label className="flex items-center text-lg font-medium text-blue-600 dark:text-blue-400 mb-2">
          <MessageCircle className="h-5 w-5 mr-2" />
          What's your topic?
        </label>
        <input
          type="text"
          required
          value={formData.topic}
          onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
          className="w-full px-4 py-2.5 rounded-lg bg-blue-50/50 dark:bg-gray-700 border-2 border-blue-100 dark:border-blue-900 focus:border-blue-300 dark:focus:border-blue-700 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 transition-all duration-300 placeholder-blue-400 dark:placeholder-blue-500 text-gray-900 dark:text-gray-100"
          placeholder="e.g., Technology, Business, Entertainment"
        />
      </div>

      {/* Keywords Section */}
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-4 border-2 border-purple-100 dark:border-purple-900 hover:border-purple-200 dark:hover:border-purple-800 transition-all duration-300">
        <label className="flex items-center text-lg font-medium text-purple-600 dark:text-purple-400 mb-2">
          <Hash className="h-5 w-5 mr-2" />
          Keywords & Hashtags
        </label>
        <div className="space-y-2">
          {formData.keywords.map((keyword, index) => (
            <div key={index} className="relative group">
              <input
                type="text"
                value={keyword}
                onChange={(e) => updateKeyword(index, e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg bg-purple-50/50 dark:bg-gray-700 border-2 border-purple-100 dark:border-purple-900 focus:border-purple-300 dark:focus:border-purple-700 focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-800 transition-all duration-300 placeholder-purple-400 dark:placeholder-purple-500 text-gray-900 dark:text-gray-100"
                placeholder={`Keyword ${index + 1}`}
              />
              <Sparkles className="absolute right-3 top-3 h-4 w-4 text-purple-400 dark:text-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
          {formData.keywords.length < 3 && (
            <button
              type="button"
              onClick={addKeyword}
              className="flex items-center px-3 py-1.5 mt-1 text-sm text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors duration-300"
            >
              <Zap className="h-4 w-4 mr-1" />
              Add another keyword
            </button>
          )}
        </div>
      </div>

      {/* Style Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Tone Selection */}
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-4 border-2 border-green-100 dark:border-green-900 hover:border-green-200 dark:hover:border-green-800 transition-all duration-300">
          <label className="flex items-center text-lg font-medium text-green-600 dark:text-green-400 mb-2">
            <Volume2 className="h-5 w-5 mr-2" />
            Tone
          </label>
          <select
            value={formData.tone}
            onChange={(e) => setFormData({ ...formData, tone: e.target.value as Tone })}
            className="w-full px-4 py-2.5 rounded-lg bg-green-50/50 dark:bg-gray-700 border-2 border-green-100 dark:border-green-900 focus:border-green-300 dark:focus:border-green-700 focus:ring-2 focus:ring-green-200 dark:focus:ring-green-800 transition-all duration-300 text-gray-900 dark:text-gray-100"
          >
            <option value="casual">✨ Casual</option>
            <option value="professional">👔 Professional</option>
            <option value="humorous">😄 Humorous</option>
          </select>
        </div>

        {/* Target Audience */}
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-4 border-2 border-amber-100 dark:border-amber-900 hover:border-amber-200 dark:hover:border-amber-800 transition-all duration-300">
          <label className="flex items-center text-lg font-medium text-amber-600 dark:text-amber-400 mb-2">
            <Users className="h-5 w-5 mr-2" />
            Target Audience
          </label>
          <input
            type="text"
            value={formData.targetAudience}
            onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
            className="w-full px-4 py-2.5 rounded-lg bg-amber-50/50 dark:bg-gray-700 border-2 border-amber-100 dark:border-amber-900 focus:border-amber-300 dark:focus:border-amber-700 focus:ring-2 focus:ring-amber-200 dark:focus:ring-amber-800 transition-all duration-300 placeholder-amber-400 dark:placeholder-amber-500 text-gray-900 dark:text-gray-100"
            placeholder="e.g., Tech professionals"
          />
        </div>
      </div>

      {/* Additional Options */}
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-4 border-2 border-gray-100 dark:border-gray-700 hover:border-gray-200 dark:hover:border-gray-600 transition-all duration-300">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <select
            value={formData.contentType}
            onChange={(e) => setFormData({ ...formData, contentType: e.target.value as ContentType })}
            className="px-4 py-2.5 rounded-lg bg-gray-50/50 dark:bg-gray-700 border-2 border-gray-100 dark:border-gray-600 focus:border-blue-300 dark:focus:border-blue-700 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 transition-all duration-300 text-gray-900 dark:text-gray-100"
          >
            <option value="statement">📝 Statement</option>
            <option value="question">❓ Question</option>
            <option value="poll">📊 Poll</option>
            <option value="thread">🧵 Thread</option>
          </select>

          <select
            value={formData.sentiment}
            onChange={(e) => setFormData({ ...formData, sentiment: e.target.value as Sentiment })}
            className="px-4 py-2.5 rounded-lg bg-gray-50/50 dark:bg-gray-700 border-2 border-gray-100 dark:border-gray-600 focus:border-blue-300 dark:focus:border-blue-700 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 transition-all duration-300 text-gray-900 dark:text-gray-100"
          >
            <option value="positive">😊 Positive</option>
            <option value="neutral">😐 Neutral</option>
            <option value="controversial">🤔 Controversial</option>
          </select>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mt-3">
          <button
            type="button"
            onClick={() => setFormData({ ...formData, callToAction: !formData.callToAction })}
            className={`flex-1 px-4 py-2.5 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
              formData.callToAction
                ? 'bg-blue-500 dark:bg-blue-600 text-white hover:bg-blue-600 dark:hover:bg-blue-700 shadow-lg'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            {formData.callToAction ? '✓ Include Call-to-Action' : '+ Add Call-to-Action'}
          </button>

          <button
            type="button"
            onClick={() => setFormData({ ...formData, includeEmojis: !formData.includeEmojis })}
            className={`flex-1 px-4 py-2.5 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
              formData.includeEmojis
                ? 'bg-yellow-500 dark:bg-yellow-600 text-white hover:bg-yellow-600 dark:hover:bg-yellow-700 shadow-lg'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            <Smile className={`h-5 w-5 ${formData.includeEmojis ? 'text-white' : 'text-gray-500 dark:text-gray-400'}`} />
            {formData.includeEmojis ? 'Emojis Enabled' : 'Add Emojis'}
          </button>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full mt-4 flex items-center justify-center px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium text-lg hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:opacity-50 transition-all duration-300 shadow-lg hover:shadow-xl"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Crafting Magic...
          </>
        ) : (
          <>
            <Sparkles className="mr-2 h-5 w-5" />
            Generate Tweets
          </>
        )}
      </button>
    </form>
  );
}