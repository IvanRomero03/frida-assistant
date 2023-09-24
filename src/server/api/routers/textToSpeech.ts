import { z } from "zod";
import AWS from 'aws-sdk';


import {
    createTRPCRouter,
    protectedProcedure,
    publicProcedure,
} from "rbrgs/server/api/trpc";

export const textToSpeechRouter = createTRPCRouter({

    talk: publicProcedure
        .input(z.object({ text: z.string() }))
        .query(({ input }) => {


            AWS.config.update({
                accessKeyId: process.env.AWS_POLLY_ACCESS_KEY,
                secretAccessKey: process.env.AWS_POLLY_SECRET_KEY,
                region: 'us-east-2',
            });


            const polly = new AWS.Polly();


            const textToSpeech = async (text: string) => {
                const params = {
                    OutputFormat: 'mp3',
                    Text: text,
                    VoiceId: 'Joanna', // You can change the voice as per your requirement
                };

                try {
                    const result = await polly.synthesizeSpeech(params).promise();

                    if (result.AudioStream) {

                        const response = result.AudioStream.toString('base64')
                        
                        return response

                    }

                } catch (error) {
                    console.error('Error synthesizing speech:', error);
                    return null;
                }
                return null
            };

            return textToSpeech(input.text)


        }),


});