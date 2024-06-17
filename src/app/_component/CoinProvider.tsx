"use client"
import { Coin as ICoin} from "@/model/Coin";
import { ReactNode, createContext, useState } from "react";

interface SelectedCoinContextType{
    selectedCoin: string | undefined;
    setSelectedCoin: (value: string | undefined) => void;
}
export const SelectedCoinContext = createContext<SelectedCoinContextType>({
    selectedCoin: undefined,
    setSelectedCoin: ()=>{},
})

type Probs = {children:ReactNode};
export default function CoinProvider({children}:Probs){
    const [selectedCoin, setSelectedCoin] = useState<string|undefined>();

    return (
        <SelectedCoinContext.Provider value = {{selectedCoin,setSelectedCoin}}>
            {children}
        </SelectedCoinContext.Provider>
    )
}