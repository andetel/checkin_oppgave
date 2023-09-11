import {Navbar} from "../components/Navbar";
import React from "react";
import {Outlet} from "react-router-dom";
// import {useStores} from "../context/storesContext";

export const Layout = () => {
    // const navigation = useNavigation()
    // const {vehicleStore} = useStores()
    //
    // useEffect(() => {
    //     console.log(vehicleStore.totalVehicles)
    //     console.log(navigation.location)
    // }, [navigation.location, vehicleStore.totalVehicles])

    return (
        <div className="App">
            <Navbar />
            <Outlet />
        </div>
    )
}