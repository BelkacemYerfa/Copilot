import { Request, Response } from "express";
import { Configuration, OpenAIApi } from "openai";

export const gptText = async (req: Request, res: Response) => {
  try {
    const configuration = new Configuration({
      apiKey: process.env.API_KEY,
    });

    const openAi = new OpenAIApi(configuration);

    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({
        msg: "please provide your prompt",
      });
    }

    const response = await openAi.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "assistant",
          content:
            "hello I'm Copilote , a chat bot that can help you with your daily tasks , what can I help you with today ?",
        },
        { role: "user", content: prompt },
      ],
    });
    if (!response.data.choices[0].message) {
      return res.status(404).json({
        msg: "no response found for your current prompt , please try again",
      });
    }
    res.status(201).json({
      success: true,
      msg: "response is fetched successfully ",
      response: response.data.choices[0].message,
    });
  } catch (error) {
    return res.status(500).json({
      msg: error,
    });
  }
};
