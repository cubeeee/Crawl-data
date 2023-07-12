import { Request, Response } from "express";
import axios from "axios";
import qs from "qs";

const pageController =  {
    test: async(req: Request, res: Response) => {
        try {
            // const getData = await axios.post(
            //     'https://www.facebook.com/api/graphql',
            //     {
            //         __a: 1,
            //         __comet_req: 15,
            //         variables:{
            //             count: 8,
            //             cursor: null,
            //             scale: 1,
            //             id: "YXBwX2NvbGxlY3Rpb246MTAwMDAyNjM1MjY5MzkxOjIzNTYzMTgzNDk6Mg==",
            //         },
            //         doc_id: "5633912679952121",
            //     },
            //     {
            //         headers: {
            //             'content-type': 'application/json',
            //             'sec-fetch-site': 'same-origin',
            //         },
            //     }
            // )
            const getData = await axios({
                method: "POST",
                url: "https://www.facebook.com/api/graphql",
                data: qs.stringify({
                    '__a': '1',
                    '__comet_req': '15',
                    'variables': '{"count":8,"cursor":null,"scale":1,"id":"YXBwX2NvbGxlY3Rpb246MTAwMDAyNjM1MjY5MzkxOjIzNTYzMTgzNDk6Mg=="}',
                    'server_timestamps': 'true',
                    'doc_id': '5633912679952121' 
                }),
                headers: {
                    "Sec-Fetch-Site": "same-origin",
                    "Content-Type": "application/x-www-form-urlencoded",
                }
            })
            console.log(getData.data);
            res.json({
                status: 'success',
                data: getData.data,
            });
        } catch (error) {
            console.log(error);
            res.json({
                status: 'error',
                message: error.message,
            })
        }
    }
}

export default pageController;