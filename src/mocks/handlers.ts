import { HttpResponse, http } from "msw";


export const handlers = [
    http.get('/api/coins/success/:today',({request,params})=>{
        const {today} = params;
        // return HttpResponse.json([]);
        return HttpResponse.json([
            {
                coinId: 1,
                name: `비트코인`,
                symbol: 'BTC',
                market_type:'binance-bitthumb',
                image: '/BTC.png',
            },
            {
                coinId: 2,
                name: `비트코인`,
                symbol: 'BTC',
                market_type:'binance-ubbit',
                image: '/BTC.png',
            },
            {
                coinId: 3,
                name: `이더리움`,
                symbol: 'ETH',
                market_type:'binance-bitthumb',
                image: '/ETH.png',
            },
            {
                coinId: 4,
                name: `폴리매쉬`,
                symbol: 'POLYX',
                market_type:'binance-ubbit',
                image: '/POLYX.png',
            },
            {
                coinId: 5,
                name: `시바이누`,
                symbol: 'SHIB',
                market_type:'binance-bitthumb',
                image: '/SHIB.png',
            },
            {
                coinId: 6,
                name: `솔라나`,
                symbol: 'SOL',
                market_type:'binance-bitthumb',
                image: '/SOL.png',
            },
            {
                coinId: 7,
                name: `스택스`,
                symbol: 'STX',
                market_type:'binance-bitthumb',
                image: '/STX.png',
            },
        ])
    }),
    http.get('/api/charts/:coinName/:marketType/:today',({request,params})=>{
        const {coinName,marketType,today} = params;
        let time = new Date(Date.now());
        return HttpResponse.json([
            {
                Coin: {
                    coinId: 1,
                    name: coinName,
                    symbol: 'BTC',
                    market_type: marketType,
                    image: '/BTC.png',
                },
                timeStamp:time.setSeconds(time.getSeconds() + 10),
                price_diff:0.01121
            },
            {
                Coin: {
                    coinId: 1,
                    name: coinName,
                    symbol: 'BTC',
                    market_type: marketType,
                    image: '/BTC.png',
                },
                timeStamp:time.setSeconds(time.getSeconds() + 10),
                price_diff:0.0211
            },
            {
                Coin: {
                    coinId: 1,
                    name: coinName,
                    symbol: 'BTC',
                    market_type: marketType,
                    image: '/BTC.png',
                },
                timeStamp:time.setSeconds(time.getSeconds() + 10),
                price_diff:0.032112,

            },
            {
                Coin: {
                    coinId: 1,
                    name: coinName,
                    symbol: 'BTC',
                    market_type: marketType,
                    image: '/BTC.png',
                },
                timeStamp:time.setSeconds(time.getSeconds() + 10),
                price_diff:0.04232,

            },
            {
                Coin: {
                    coinId: 1,
                    name: coinName,
                    symbol: 'BTC',
                    market_type: marketType,
                    image: '/BTC.png',
                },
                timeStamp:time.setSeconds(time.getSeconds() + 10),
                price_diff:0.031233,
            },
            {
                Coin: {
                    coinId: 1,
                    name: coinName,
                    symbol: 'BTC',
                    market_type: marketType,
                    image: '/BTC.png',
                },
                timeStamp:time.setSeconds(time.getSeconds() + 10),
                price_diff:0.05242,
            },
            {
                Coin: {
                    coinId: 1,
                    name: coinName,
                    symbol: 'BTC',
                    market_type: marketType,
                    image: '/BTC.png',
                },
                timeStamp:time.setSeconds(time.getSeconds() + 10),
                price_diff:0.06121,
            },
            {
                Coin: {
                    coinId: 1,
                    name: coinName,
                    symbol: 'BTC',
                    market_type: marketType,
                    image: '/BTC.png',
                },
                timeStamp:time.setSeconds(time.getSeconds() + 10),
                price_diff:0.041211,
            },
            {
                Coin: {
                    coinId: 1,
                    name: coinName,
                    symbol: 'BTC',
                    market_type: marketType,
                    image: '/BTC.png',
                },
                timeStamp:time.setSeconds(time.getSeconds() + 10),
                price_diff:0.071232,

            },
            {
                Coin: {
                    coinId: 1,
                    name: coinName,
                    symbol: 'BTC',
                    market_type: marketType,
                    image: '/BTC.png',
                },
                timeStamp:time.setSeconds(time.getSeconds() + 10),
                price_diff:0.02121,

            },
            {
                Coin: {
                    coinId: 1,
                    name: coinName,
                    symbol: 'BTC',
                    market_type: marketType,
                    image: '/BTC.png',
                },
                timeStamp:time.setSeconds(time.getSeconds() + 30),
                price_diff:0.05121,

            },
            {
                Coin: {
                    coinId: 1,
                    name: coinName,
                    symbol: 'BTC',
                    market_type: marketType,
                    image: '/BTC.png',
                },
                timeStamp:time.setSeconds(time.getSeconds() + 10),
                price_diff:0.02121,

            },
            
        ])
    }),
    http.get('/api/trades/:coinName/:marketType/:today',({request,params})=>{
        const {coinName,marketType,today} = params;
        // return HttpResponse.json([]);
        return HttpResponse.json([
            {
                Coin: {
                    coinId: 1,
                    name: coinName,
                    symbol: 'BTC',
                    market_type: marketType,
                    image: '/BTC.png',
                },
                type: 'borrow',
                timeStamp:new Date(Date.now()+19000),
                price: 30000,
                isSuccess: true,
            },
            {
                Coin: {
                    coinId: 1,
                    name: coinName,
                    symbol: 'BTC',
                    market_type: marketType,
                    image: '/BTC.png',
                },
                type: 'buy',
                timeStamp: new Date(Date.now()+28000),
                price: 30000,
                market: 'bitthumb',
                isSuccess: true,
            },
            {
                Coin: {
                    coinId: 1,
                    name: coinName,
                    symbol: 'BTC',
                    market_type: marketType,
                    image: '/BTC.png',
                },
                type: 'sell',
                timeStamp: new Date(Date.now()+35000),
                price: 20000,
                market: 'binance',
                isSuccess: true,
            },
            {
                Coin: {
                    coinId: 1,
                    name: coinName,
                    symbol: 'BTC',
                    market_type: marketType,
                    image: '/BTC.png',
                },
                type: 'sell',
                timeStamp: new Date(Date.now()+45000),
                price: 20000,
                market: 'binance',
                isSuccess: false,
            },
        ])
    }),
    http.get('/api/tradeCounts',()=>{
        return HttpResponse.json({
            '2024-06-03':{success: 2, failure: 4},
            '2024-06-08':{success: 13, failure: 0},
            '2024-06-12':{success: 7, failure: 0},
            '2024-06-13':{success: 3, failure: 1},
            '2024-06-14':{success: 3, failure: 0},
            '2024-06-15':{success: 0, failure: 0},
            '2024-06-16':{success: 0, failure: 1},
        })
    })
    ,
    http.get('/api/logs/:today',({request,params})=>{
        const {today} = params;
        let time = new Date(Date.now());
        return HttpResponse.json([
            {
                id:1,
                timeStamp:today,
                coin_symbol:'BTC',
                market: 'binance-bitthumb',
                gap: 0.3533,
                isSuccess: false,
            },
            {
                id:2,
                timeStamp:today,
                coin_symbol:'LMC',
                market: 'binance-bitthumb',
                gap: 0.4223,
                isSuccess: true,
            },
            {
                id:3,
                timeStamp:today,
                coin_symbol:'ATM',
                market: 'binance-bitthumb',
                gap: 0.544533,
                isSuccess: true,
            },
            {
                id:4,
                timeStamp:today,
                coin_symbol:'KCH',
                market: 'binance-bitthumb',
                gap: 0.744533,
                isSuccess: false,
            },
        ])
    })
]