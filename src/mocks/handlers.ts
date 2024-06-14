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
        return HttpResponse.json([
            {
                Coin: {
                    coinId: 1,
                    name: coinName,
                    symbol: 'BTC',
                    market_type: marketType,
                    image: '/BTC.png',
                },
                timeStamp:new Date(Date.now()-11000),
                price_diff:1
            },
            {
                Coin: {
                    coinId: 1,
                    name: coinName,
                    symbol: 'BTC',
                    market_type: marketType,
                    image: '/BTC.png',
                },
                timeStamp:new Date(Date.now()-10000),
                price_diff:2
            },
            {
                Coin: {
                    coinId: 1,
                    name: coinName,
                    symbol: 'BTC',
                    market_type: marketType,
                    image: '/BTC.png',
                },
                timeStamp:new Date(Date.now()-9000),
                price_diff:3,

            },
            {
                Coin: {
                    coinId: 1,
                    name: coinName,
                    symbol: 'BTC',
                    market_type: marketType,
                    image: '/BTC.png',
                },
                timeStamp:new Date(Date.now()-7000),
                price_diff:4,

            },
            {
                Coin: {
                    coinId: 1,
                    name: coinName,
                    symbol: 'BTC',
                    market_type: marketType,
                    image: '/BTC.png',
                },
                timeStamp:new Date(Date.now()-6000),
                price_diff:3,
            },
            {
                Coin: {
                    coinId: 1,
                    name: coinName,
                    symbol: 'BTC',
                    market_type: marketType,
                    image: '/BTC.png',
                },
                timeStamp:new Date(Date.now()-5000),
                price_diff:5,
            },
            {
                Coin: {
                    coinId: 1,
                    name: coinName,
                    symbol: 'BTC',
                    market_type: marketType,
                    image: '/BTC.png',
                },
                timeStamp:new Date(Date.now()-4000),
                price_diff:6,
            },
            {
                Coin: {
                    coinId: 1,
                    name: coinName,
                    symbol: 'BTC',
                    market_type: marketType,
                    image: '/BTC.png',
                },
                timeStamp:new Date(Date.now()-3000),
                price_diff:4,
            },
            {
                Coin: {
                    coinId: 1,
                    name: coinName,
                    symbol: 'BTC',
                    market_type: marketType,
                    image: '/BTC.png',
                },
                timeStamp:new Date(Date.now()-2000),
                price_diff:7,

            },
            {
                Coin: {
                    coinId: 1,
                    name: coinName,
                    symbol: 'BTC',
                    market_type: marketType,
                    image: '/BTC.png',
                },
                timeStamp:new Date(Date.now()-1000),
                price_diff:2,

            },

            
        ])
    }),
    http.get('/api/trades/:coinName/:marketType/:today',({request,params})=>{
        const {coinName,marketType,today} = params;
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
                timeStamp: new Date(Date.now()-10000),
                price: 30000,
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
                timeStamp: new Date(Date.now()-8000),
                price: 30000,
                market: 'bitthumb'
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
                timeStamp: new Date(Date.now()-5000),
                price: 20000,
                market: 'binance'
            },
        ])
    })
]