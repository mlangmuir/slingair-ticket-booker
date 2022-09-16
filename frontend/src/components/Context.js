import { useEffect, useState, createContext } from 'react';
import usePersistedState from "./usePersistedState";
import slingAirHawaii from "../assets/slingair-hawaii.jpg";

export const Context = createContext();

const Provider = ({ children }) => {

    const [flightData, setFlightData] = useState([]);
    const [flightSelect, setFlightSelect] = usePersistedState("flightSelect", "");
    const [seatSelect, setSeatSelect] = useState("");
    const [givenName, setGivenName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [reservationData, setReservationData] = usePersistedState("reservationData", {});
    const [reservationAdded, setReservationAdded] = usePersistedState("reservationAdded", false);
    const [currentReservation, setCurrentReservation] = usePersistedState("currentReservation", {});
    const [city, setCity] = usePersistedState("city", "");
    const [departure, setDeparture] = usePersistedState("departure", "");
    const [arrival, setArrival] = usePersistedState("arrival", "");
    const [travelTime, setTravelTime] = usePersistedState("travelTime", "");

    const flightInfo = [
        {
            flight: "SA231",
            city: "Montreal",
            departure: "August 5th at 8:50 (EST)",
            arrival: "August 5th at 15:46 (HST)",
            travelTime: "12 hours, 56 mins"
        },
        {
            flight: "SA454",
            city: "Vancouver",
            departure: "August 7th at 18:15 (PST)",
            arrival: "August 7th at 21:21 (HST)",
            travelTime: "6 hours, 6 mins"
        },
        {
            flight: "SA314",
            city: "Toronto",
            departure: "August 11th at 15:00 (EST)",
            arrival: "August 11th at 21:21 (HST)",
            travelTime: "12 hours, 21 mins"
        },
        {
            flight: "SA112",
            city: "Calgary",
            departure: "August 12th at 16:30 (MST)",
            arrival: "August 12th at 21:21 (HST)",
            travelTime: "8 hours, 51 mins"
        },
        {
            flight: "SA006",
            city: "Winnipeg",
            departure: "August 17th at 14:45 (CST)",
            arrival: "August 17th at 21:21 (HST)",
            travelTime: "11 hours, 36 mins"
        },
        {
            flight: "SA259",
            city: "Ottawa",
            departure: "August 20th at 6:40 (EST)",
            arrival: "August 20th at 13:32 (HST)",
            travelTime: "12 hours, 52 mins"
        },
        {
            flight: "SA737",
            city: "Edmonton",
            departure: "August 24th at 14:48 (MST)",
            arrival: "August 24th at 19:45 (HST)",
            travelTime: "8 hours, 57 mins"
        },
        {
            flight: "SA888",
            city: "Quebec City",
            departure: "August 28th at 8:50 (EST)",
            arrival: "August 28th at 15:46 (HST)",
            travelTime: "12 hours, 56 mins"
        },
    ];

    useEffect(() => {
        fetch("/get-flights")
            .then((res) => res.json())
            .then((data) => {
                setFlightData(data.data)
            });
    },[]);
    
    // list of flights for drop down flight select
    const flightList = [];

    flightData.map((item) => {
        return flightList.push(item)
    })

    return (
        <Context.Provider
            value={{
                flightData,
                flightSelect,
                setFlightSelect,
                seatSelect,
                setSeatSelect,
                givenName,
                setGivenName,
                surname,
                setSurname,
                email,
                setEmail,
                reservationData,
                setReservationData,
                reservationAdded,
                setReservationAdded,
                flightList,
                slingAirHawaii,
                flightInfo,
                city,
                setCity,
                departure,
                setDeparture,
                arrival,
                setArrival,
                travelTime,
                setTravelTime,
                currentReservation,
                setCurrentReservation
            }}
        >
            {children}
        </Context.Provider>
    );
}

export default Provider;