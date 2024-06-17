"use client"
import { ReactNode, createContext, useState } from "react";
import { Trade as ITrade } from "@/model/Trade";
interface SelectedBarContextType{
    selectedBar: ITrade | undefined;
    setSelectedBar: (value: ITrade | undefined) => void;
}
export const SelectedBarContext = createContext<SelectedBarContextType>({
    selectedBar: undefined,
    setSelectedBar: ()=>{},
})

type Probs = {children:ReactNode};
export default function CoinProvider({children}:Probs){
    const [selectedBar, setSelectedBar] = useState<ITrade|undefined>();

    return (
        <SelectedBarContext.Provider value = {{selectedBar,setSelectedBar}}>
            {children}
        </SelectedBarContext.Provider>
    )
}