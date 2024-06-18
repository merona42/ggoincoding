import { HttpResponse, http } from "msw";


export const handlers = [
    http.get('/api/coins/:today/route',async ({request,params})=>{
        // return HttpResponse.json([]);
        return HttpResponse.json([
            {
                coinId: 1,
                symbol: 'btc',
            },
            {
                coinId: 2,
                symbol: 'eth',
            },
            {
                coinId: 3,
                symbol: 'xrp',
            },
            {
                coinId: 4,
                symbol: 'ardr',
            },
            {
                coinId: 5,
                symbol: 'IOTA',
            },
            {
                coinId: 6,
                symbol: 'upp',
            },
            {
                coinId: 7,
                symbol: 'tt',
            },
        ])
 

        }),
    http.get('/api/charts/:coinName/:today/route',({request,params})=>{
        const {coinName,today} = params;
        let time = new Date(Date.now());

        return HttpResponse.json([
            {
                Coin: {
                    coinId: 1,
                    symbol: 'BTC',
                },
                timeStamp:"2024-06-18T00:31:00Z",
                price_diff:0.01121
            },
            {
                Coin: {
                    coinId: 1,
                    symbol: 'BTC',
                },
                timeStamp:"2024-06-18T00:31:10Z",
                price_diff:0.0211
            },
            {
                Coin: {
                    coinId: 1,
                    symbol: 'BTC',
                },
                timeStamp:"2024-06-18T00:31:20Z",
                price_diff:0.032112,

            },
            {
                Coin: {
                    coinId: 1,
                    symbol: 'BTC',
                },
                timeStamp:"2024-06-18T00:31:25Z",
                price_diff:0.04232,

            },
            {
                Coin: {
                    coinId: 1,
                    symbol: 'BTC',
                },
                timeStamp:"2024-06-18T00:31:30Z",
                price_diff:0.031233,
            },
            {
                Coin: {
                    coinId: 1,
                    symbol: 'BTC',
                },
                timeStamp:"2024-06-18T00:31:40Z",
                price_diff:0.05242,
            },
            {
                Coin: {
                    coinId: 1,
                    symbol: 'BTC',
                },
                timeStamp:"2024-06-18T00:31:50Z",
                price_diff:0.06121,
            },
            {
                Coin: {
                    coinId: 1,
                    symbol: 'BTC',
                },
                timeStamp:"2024-06-18T00:32:00Z",
                price_diff:0.041211,
            },
            {
                Coin: {
                    coinId: 1,
                    symbol: 'BTC',
                },
                timeStamp:"2024-06-18T00:32:10Z",
                price_diff:0.071232,

            },
            {
                Coin: {
                    coinId: 1,
                    symbol: 'BTC',
                },
                timeStamp:"2024-06-18T00:32:20Z",
                price_diff:0.02121,

            },
            {
                Coin: {
                    coinId: 1,
                    symbol: 'BTC',
                },
                timeStamp:"2024-06-18T00:32:30Z",
                price_diff:0.05121,

            },
            {
                Coin: {
                    coinId: 1,
                    symbol: 'BTC',
                },
                timeStamp:"2024-06-18T00:32:40Z",
                price_diff:0.02121,

            },
            
        ])
    }),
    http.get('/api/trades/:coinName/:today/route',({request,params})=>{
        const {coinName,today} = params;
        // return HttpResponse.json([]);
        return HttpResponse.json([
            {
                Coin: {
                    coinId: 1,
                    symbol: 'eth',
                },
                type: '전송 가능',
                timeStamp: new Date("2024-06-18T00:31:10Z"),
                price: 30000,
                isSuccess: false,
                tradeId:2,
            },
            {
                Coin: {
                    coinId: 1,
                    symbol: 'xrp',
                },
                type: '대출 실패',
                timeStamp: new Date("2024-06-18T00:31:20Z"),
                price: 20000,
                isSuccess: false,
                tradeId:3
            },
            {
                Coin: {
                    coinId: 1,
                    symbol: 'ardr',
                },
                type: '대출 성공',
                timeStamp: new Date("2024-06-18T00:31:30Z"),
                price: 20000,
                isSuccess: true,
                tradeId:4
            },
            {
                Coin: {
                    coinId: 1,
                    symbol: 'ardr',
                },
                type: '전송 성공',
                timeStamp: new Date("2024-06-18T00:31:40Z"),
                price: 20000,
                isSuccess: true,
                tradeId:5
            },
            {
                Coin: {
                    coinId: 1,
                    symbol: 'ardr',
                },
                type: '판매 성공',
                timeStamp: new Date("2024-06-18T00:31:50Z"),
                price: 20000,
                isSuccess: true,
                tradeId:5
            },
        ])
    }),
    http.get('/api/tradeCounts/route',()=>{
        return HttpResponse.json({
            '2024-06-03':{success: 2, failure: 4},
            '2024-06-08':{success: 13, failure: 0},
            '2024-06-12':{success: 7, failure: 0},
            '2024-06-13':{success: 3, failure: 1},
            '2024-06-14':{success: 3, failure: 0},
            '2024-06-15':{success: 0, failure: 0},
            '2024-06-16':{success: 0, failure: 1},
            '2024-06-17':{success: 0, failure: 1},
            '2024-06-18':{success: 4, failure: 1},  
            '2024-06-19':{success: 4, failure: 1},
        })
    })
    ,
    http.get('/api/logs/:today/route',({request,params})=>{
        const {today} = params;
        let time = new Date(Date.now());
        return HttpResponse.json([
            {
                Coin:{
                    coinId:1,
                    symbol:'eth',
                },
                timeStamp:"2024-06-18T00:31:10Z",
                isSuccess: true,
                tradeId: 2,
                type: "전송 가능"
            },
            {
                Coin:{
                    coinId:1,
                    symbol:'xrp',
                },
                timeStamp:"2024-06-18T00:31:20Z",
                isSuccess: false,
                tradeId: 3,
                type: "대출 실패"
            },
            {
                Coin:{
                    coinId:1,
                    symbol:'ardr',
                },
                timeStamp:"2024-06-18T00:31:30Z",
                isSuccess: true,
                tradeId: 4,
                type: "대출 성공"
            },
            {
                Coin:{
                    coinId:1,
                    symbol:'ardr',
                },
                timeStamp:"2024-06-18T00:31:40Z",
                isSuccess: true,
                tradeId: 5,
                type: "전송 성공"
            },
            {
                Coin:{
                    coinId:1,
                    symbol:'ardr',
                },
                timeStamp:"2024-06-18T00:31:50Z",
                isSuccess: true,
                tradeId: 6,
                type: "판매 성공",
                price: 20000
            },
        ])
    })
]