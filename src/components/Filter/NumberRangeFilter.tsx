import {useEffect, useRef, useState} from "react";

export const NumberRangeFilter = ({ heading, handler }: { heading: string, handler: Function }) => {
    const dropdown = useRef<null | HTMLDivElement>(null)

    const [fromInput, setFromInput] = useState<number>(0)
    const [toInput, setToInput] = useState<number>(0)

    const toggleDropdown = () => {
        if (dropdown.current?.classList.contains("hidden")) {
            dropdown.current?.classList.remove("hidden")
            dropdown.current?.classList.add("flex")
        } else {
            dropdown.current?.classList.remove("flex")
            dropdown.current?.classList.add("hidden")
        }
    }

    const reset = () => {
        setFromInput(0)
        setToInput(0)
    }

    useEffect(() => {
        handler(fromInput, toInput)
    }, [fromInput, toInput])


    return (
        <div className="flex flex-col items-start">
            <button
                className="w-max m-auto text-white bg-blue-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-bold rounded-lg text-sm px-4 py-2.5 text-center flex items-center bg-primary-600 hover:bg-primary-700 focus:ring-primary-800"
                type="button"
                onClick={() => toggleDropdown()}
            >
                Filter by { heading }
                <svg
                    className="w-4 h-4 ml-2"
                    aria-hidden="true"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 9l-7 7-7-7"
                    >
                    </path>
                </svg>
            </button>
            <div
                ref={dropdown}
                className="z-10 hidden w-56 p-3 rounded-lg shadow bg-gray-700 flex-col gap-3 mt-3"
            >
                <div className="flex flex-row gap-3">
                    <div>
                        <label
                            htmlFor="from"
                            className="block mb-2 text-sm font-medium text-white text-left"
                        >
                            From
                        </label>
                        <input
                            type="number"
                            id="from"
                            className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                            placeholder="0"
                            min="0"
                            onChange={(event) => setFromInput(parseInt(event.target.value))}
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="from"
                            className="block mb-2 text-sm font-medium text-white text-left"
                        >
                            To
                        </label>
                        <input
                            type="number"
                            id="from"
                            className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                            placeholder="0"
                            min="0"
                            onChange={(event) => setToInput(parseInt(event.target.value))}
                        />
                    </div>
                </div>
                <button
                    type="button"
                    className="border focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center border-blue-500 text-blue-500 hover:text-white hover:bg-blue-500 focus:ring-blue-800"
                    onClick={() => reset()}
                >
                    Reset
                </button>
            </div>
        </div>
    )
}