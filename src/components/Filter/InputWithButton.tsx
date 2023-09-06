
export const InputWithButton = ({ label, placeholder, inputType, buttonText }: { label: string, placeholder: string, inputType: string, buttonText: string }) => {
    return (
        <div className="flex flex-row items-end gap-2">
            <div className="flex flex-col items-start">
                <label
                    htmlFor="input"
                    className="mb-2 text-sm font-medium text-white"
                >
                    { label }
                </label>
                <input
                    type={inputType}
                    id="input"
                    className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                    placeholder={placeholder}
                />
            </div>
            <button
                type="button"
                className="text-white focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-blue-800"
            >
                {buttonText}
            </button>
        </div>
    )
}