import React from "react";
import {formatNumber} from "../formatNumber";

export const RecieptItem = ({ name, price }: {name: string, price: number}) => {
    return (
        <li className="pb-3 sm:pb-4">
            <div className="flex items-center space-x-4 min-w-min">
                <div className="flex-1 min-w-fit">
                    <p className="md:text-xl font-medium truncate text-white text-left">
                        {name}
                    </p>
                </div>
                <div className="inline-flex items-center md:text-xl font-semibold text-white">
                    {formatNumber(price)}
                </div>
            </div>
        </li>
    )
}