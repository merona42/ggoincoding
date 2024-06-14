"use client"
import { Coin as ICoin} from "@/model/Coin";
import { ReactNode, createContext, useState } from "react";

interface SelectedCoinContextType{
    selectedCoin: ICoin | undefined;
    setSelectedCoin: (value: ICoin | undefined) => void;
}
export const SelectedCoinContext = createContext<SelectedCoinContextType>({
    selectedCoin: undefined,
    setSelectedCoin: ()=>{},
})

type Probs = {children:ReactNode};
export default function CoinProvider({children}:Probs){
    const [selectedCoin, setSelectedCoin] = useState<ICoin|undefined>();

    return (
        <SelectedCoinContext.Provider value = {{selectedCoin,setSelectedCoin}}>
            {children}
        </SelectedCoinContext.Provider>
    )
}