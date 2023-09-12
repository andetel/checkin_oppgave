import {Link} from "react-router-dom";
import {useStores} from "../context/storesContext";
import {observer} from "mobx-react";
import {useRef} from "react";

export const Navbar = observer(() => {
    const {cartStore} = useStores()
    const menu = useRef<null | HTMLDivElement>(null)

    const toggleMenu = () => {
        if (menu.current) {
            if (menu.current.classList.contains("hidden")) {
                menu.current.classList.remove("hidden")
            } else {
                menu.current.classList.add("hidden")
            }
        }
    }

    return (
        <nav className="border-gray-200 bg-gray-900">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a href="https://flowbite.com/" className="flex items-center">
                    <img src="https://flowbite.com/docs/images/logo.svg" className="h-8 mr-3" alt="Flowbite Logo"/>
                    <span
                        className="self-center text-2xl font-semibold whitespace-nowrap text-white">Flowbite</span>
                </a>
                <button
                    type="button"
                    className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm rounded-lg md:hidden focus:outline-none focus:ring-2 text-gray-400 hover:bg-gray-700 focus:ring-gray-600"
                    aria-controls="navbar-default" aria-expanded="false"
                    onClick={toggleMenu}
                >
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                         viewBox="0 0 17 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M1 1h15M1 7h15M1 13h15"/>
                    </svg>
                </button>
                <div
                    className="hidden w-full md:block md:w-auto"
                    ref={menu}
                >
                    <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 bg-gray-800 md:bg-gray-900 border-gray-700">
                        <li>
                            <Link
                                to={`/`}
                                className="block py-2 pl-3 pr-4 bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 text-blue-500"
                                aria-current="page"
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                to={`/shopping_cart`}
                                className="block py-2 pl-3 pr-4 rounded md:border-0 md:p-0 text-white md:hover:text-blue-500 hover:bg-gray-700 hover:text-white md:hover:bg-transparent"
                            >
                                Cart ({cartStore.itemsInCart})
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
})