import { useEffect, useState } from "react";
import { getRegisters } from "~/services/Registers";
import { AllRegisters, Register, Status } from "~/types/Registers";

const initialAllRegistersData: AllRegisters = {
    [Status.APROVED]: [],
    [Status.REPROVED]: [],
    [Status.REVIEW]: []
};

export function useRegisters() {
    const [data, setData] = useState<AllRegisters>(initialAllRegistersData);

    const fetchData = async() => {
        setData(initialAllRegistersData);

        await getRegisters()
        .then(response => response.json())
        .then(json => {
            json.map((item: Register) => {
                const currentStatus = Status[item.status]
                
                setData(currData => ({
                    ...currData, 
                    [currentStatus]: [...currData[currentStatus], item]
                }));
            });
        });
    }

    useEffect(() => {
        let ignore = false;

        if (!ignore) {
            fetchData();
        }

        return () => {
            ignore = true;
        };
    }, []);

    const updateColumnsData = async() => {
        return await fetchData();
    }

    return { data, updateColumnsData };
  }