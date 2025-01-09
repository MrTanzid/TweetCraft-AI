import { GoogleGenerativeAI } from '@google/generative-ai';
import { TweetFormData, GeneratedTweet } from '../types';

const genAI = new GoogleGenerativeAI('AIzaSyCVkkK2AST6hcnp-Yg-MnlME41DmS9pKqw');

export async function generateTweetsWithGemini(formData: TweetFormData): Promise<GeneratedTweet[]> {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `Generate 3 highly engaging, viral-worthy Twitter posts about ${formData.topic}.
    Tone: ${formData.tone}
    Content Type: ${formData.contentType}
    Target Audience: ${formData.targetAudience}
    Sentiment: ${formData.sentiment}
    Include Call to Action: ${formData.callToAction}
    Include Emojis: ${formData.includeEmojis}
    Keywords: ${formData.keywords.join(', ')}
    Max Length: 280 characters

    Guidelines for viral potential:
    - Use attention-grabbing openings
    - Create FOMO (Fear of Missing Out)
    - Include relatable content
    - Use powerful emotional triggers
    - Add curiosity gaps
    - Make it easily shareable
    ${formData.callToAction ? '- Include compelling call-to-action' : ''}
    ${formData.includeEmojis ? '- Use relevant emojis strategically' : '- Do not use any emojis'}

    Format each tweet as a JSON object with:
    - content (the tweet text)
    - hashtags (array of relevant hashtags)
    - engagementScore (1-10)
    - characterCount
    
    Return only the JSON array.`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Extract JSON array from response
    const jsonStr = text.substring(text.indexOf('['), text.lastIndexOf(']') + 1);
    return JSON.parse(jsonStr);
  } catch (error) {
    console.error('Error generating tweets:', error);
    throw error;
  }
}