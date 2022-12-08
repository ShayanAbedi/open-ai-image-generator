const { Configuration, OpenAIApi } = require('openai');
const configuration = new Configuration({
  apiKey: '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',
});
const openai = new OpenAIApi(configuration);

const generateImage = async (req, res) => {
  console.log(req.body);
  const { prompt, size, n } = req.body;

  const imageSize =
    size === 'small' ? '256x256' : size === 'medium' ? '512x512' : '1024x1024';

  try {
    const response = await openai.createImage({
      prompt,
      n: +n,
      size: imageSize,
    });
    const imageUrl = response.data.data;
    res.status(200).json({
      success: true,
      data: imageUrl,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: 'The image could not be generated',
    });
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }
  }
};

module.exports = { generateImage };
