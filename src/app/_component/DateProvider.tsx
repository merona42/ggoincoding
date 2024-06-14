"use client"
import { Coin as ICoin} from "@/model/Coin";
import { ReactNode, createContext, useState } from "react";

interface SelectedDateContextType{
    selectedDate: Date;
    setSelectedDate: (value: Date) => void;
}
export const SelectedDateContext = createContext<SelectedDateContextType>({
    selectedDate: new Date(Date.now()),
    setSelectedDate: ()=>{},
})

type Probs = {children:ReactNode};
export default function DateProvider({children}:Probs){
    const [selectedDate, setSelectedDate] = useState<Date>(new Date(Date.now()));

    return (
        <SelectedDateContext.Provider value = {{selectedDate,setSelectedDate}}>
            {children}
        </SelectedDateContext.Provider>
    )
}