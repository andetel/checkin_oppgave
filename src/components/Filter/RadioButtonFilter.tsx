import {useRef} from "react";
import {RadioButtonItem} from "./RadioButtonItem";

interface Options {
    name: string,
    label: string,
    value: string,
    checked?: boolean
}

export const RadioButtonFilter = ({ heading, options, handler }: { heading: string, options: Options[], handler: Function }) => {
    const dropdown = useRef<null | HTMLDivElement>(null)

    const toggleDropdown = () => {
        if (dropdown.current?.classList.contains("hidden")) {
            dropdown.current?.classList.remove("hidden")
            dropdown.current?.classList.add("flex")
        } else {
            dropdown.current?.classList.remove("flex")
            dropdown.current?.classList.add("hidden")
        }
    }

    return (
        <div>
            <button
                id="dropdownHelperRadioButton"
                className="text-white focus:ring-4 focus:outline-none font-bold rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
                type="button"
                onClick={() => toggleDropdown()}
            >
                Filter by {heading}
                <svg className="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                </svg>
            </button>

            <div
                ref={dropdown}
                id="dropdownHelperRadio"
                className="z-10 hidden divide-y rounded-lg shadow w-60 bg-gray-700 divide-gray-600 mt-3"
                data-popper-reference-hidden=""
                data-popper-escaped=""
                data-popper-placement="top"
            >
                <ul
                    className="p-3 space-y-1 text-sm text-gray-200 w-full"
                >
                    {
                        options.map(option => (
                            <RadioButtonItem
                                key={option.value}
                                label={option.label}
                                name={option.name}
                                value={option.value}
                                handler={handler}
                                checked={option.checked !== undefined}
                            />
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}