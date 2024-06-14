
export interface Coin{
    coinId: number,
    name: string,
    symbol: string,
    market_type: 'binance-bitthumb' | 'binance-ubbit',
    image: string,
}