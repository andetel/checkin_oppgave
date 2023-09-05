import {useStores} from "../context/storesContext";
import {observer} from "mobx-react";
import {Card} from "./Card";

export const CardList = observer(() => {
    const {vehicleStore} = useStores()

    return (
        <div className="flex flex-row flex-wrap max-w-screen-xl justify-center gap-3">
            {
                vehicleStore.vehicles.map((data) => (
                    <Card vehicle={data} />
                ))
            }
        </div>
    )
})