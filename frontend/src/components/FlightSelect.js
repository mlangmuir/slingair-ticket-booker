import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Context } from "./Context";
import styled from "styled-components";
import arrow from "../assets/arrow.png";

const FlightSelect = () => {

    const {
        flightSelect,
        setFlightSelect,
        flightList,
        slingAirHawaii,
        flightInfo,
        setCity,
        setDeparture,
        setArrival,
        setTravelTime
    } = useContext(Context);

    const [isFocus, setIsFocus] = useState(false);

    const history = useHistory()
    
    useEffect(() => {
        for (let i = 0; i < flightInfo.length; i++) {
            if (flightSelect === flightInfo[i].flight) {
                setCity(flightInfo[i].city);
                setDeparture(flightInfo[i].departure);
                setArrival(flightInfo[i].arrival);
                setTravelTime(flightInfo[i].travelTime);
            }
        }
    }, [flightSelect])
    
    return (
        <>
            <Wrapper>
                <Text>Congratulations! You have won a chance to book a FREE one-way ticket to Honolulu from a Canadian city of your choice. Book now while quantities last!</Text>
                <Select onClick={() => setIsFocus(true)}>
                    <SelectText>Select your flight!</SelectText>
                    <Arrow src={arrow} />
                </Select>
                {isFocus &&
                    <Dropdown>
                        {flightList.map((item, index) => {
                            return (
                                <Button
                                    key={index}
                                    onMouseEnter={() => {
                                        setFlightSelect(flightInfo[index].flight);
                                    }}
                                    onClick={() => {
                                        history.push(`/${flightSelect}`);
                                    }
                                }
                                >
                                    {item}: {flightInfo[index].city} to Honolulu - {flightInfo[index].departure}
                                </Button>
                            )
                        })}
                    </Dropdown>
                }
            </Wrapper>
            <CoverShade />
            <Background src={slingAirHawaii} alt="slingAir airplane flies over Hawaii." />
        </>
    )
}

const Wrapper = styled.div`
    z-index: 3;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Text = styled.h2`
    width: 800px;
    text-align: center;
    margin-top: 35px;
    line-height: 40px;
`;

const Select = styled.div`
    margin-top: 30px;
    height: 50px;
    font-size: 28px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-family: 'League Spartan', sans-serif;
    width: 800px;
    background-color: white;

    :hover {
        cursor: pointer;
    }
`;

const SelectText = styled.p`
    margin-left: 10px;
`;

const Arrow = styled.img`
    width: 20px;
    height: 20px;
    opacity: 60%;
    margin-right: 10px;
`;

const Dropdown = styled.div`
    background-color: white;
    width: 800px;
    height: 375px;
    margin-top: 10px;
`;

const Button = styled.button`
    width: 800px;
    text-align: left;
    font-size: 28px;
    color: #0a254b;
    font-weight: 700;
    padding: 10px 15px;
    background: transparent;
    border: none;

    :hover {
        cursor: pointer;
        background-color: #0a254b;
        color: white;
    }
`;

const CoverShade = styled.div`
    z-index: 2;
    position: absolute;
    width: 100vw;
    height: 100vh;
    object-fit: cover;
    background-color: black;
    opacity: 30%;
`;

const Background = styled.img`
    z-index: 1;
    position: absolute;
    width: 100vw;
    height: 100vh;
    object-fit: cover;
`;

export default FlightSelect;