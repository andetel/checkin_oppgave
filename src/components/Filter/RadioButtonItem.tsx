export const RadioButtonItem = ({ label, name, value, handler, checked = false}: { label: string, name: string, value: string, handler: Function, checked: boolean }) => {
    return (
        <li className="w-full">
            <label
                htmlFor={value}
                className="flex p-2 rounded hover:bg-gray-600"
            >
                <div className="flex items-center h-5">
                    <input
                        id={value}
                        name={name}
                        value={value}
                        type="radio"
                        className="w-4 h-4 text-blue-600 focus:ring-blue-600 ring-offset-gray-700 focus:ring-offset-gray-700 focus:ring-2 bg-gray-600 border-gray-500"
                        defaultChecked={checked}
                        onChange={event => handler(event.target.value)}
                    />
                </div>
                <div className="ml-2 text-sm">
                    <span
                        className="font-medium text-gray-300"
                    >
                        {label}
                    </span>
                </div>
            </label>
        </li>
    )
}