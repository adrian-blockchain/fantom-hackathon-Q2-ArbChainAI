import { NextApiRequest, NextApiResponse } from 'next'
import query from '../../utils/sendMessage';




export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const { prompt} = req.body;


        if (!prompt) {
            res.status(400).json({ answer: "Please Provide a prompt" });
            return;
        }

        console.log(prompt)





        // ChatGpt Query

        const response = await query(prompt);


        res.status(200).json({response});
    }catch (e) {
        console.log(e)
    }

}
