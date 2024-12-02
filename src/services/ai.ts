import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: 'your-api-key', // In production, use environment variables
  dangerouslyAllowBrowser: true
});

export function useAIService() {
  async function generateSuggestions(topic: string): Promise<string[]> {
    try {
      const completion = await openai.chat.completions.create({
        messages: [{
          role: 'user',
          content: `Generate 3 engaging social media post ideas about ${topic}. Keep them concise and engaging.`
        }],
        model: 'gpt-3.5-turbo',
      });

      return completion.choices
        .map(choice => choice.message.content)
        .filter((content): content is string => content !== null);
    } catch (error) {
      console.error('OpenAI API error:', error);
      return [];
    }
  }

  return {
    generateSuggestions
  };
}