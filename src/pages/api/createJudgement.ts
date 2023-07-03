import { NextApiRequest, NextApiResponse } from 'next'
import query from '../../utils/sendMessage';
import judge from "../../utils/sendToJudge";




export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const {  lawer1, lawer2} = req.body;


        if (!lawer2 && !lawer1) {
            res.status(400).json({ answer: "Please Provide a prompt" });
            return;
        }


        // ChatGpt Query

        const response = await judge(lawer1,lawer2);


        res.status(200).json({response});
    }catch (e) {
        console.log(e)
    }

}
