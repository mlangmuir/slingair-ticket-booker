import styled from "styled-components";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Context } from "./Context";

const Confirmation = () => {

    const { reservationAdded, slingAirHawaii, currentReservation } = useContext(Context);

    const history = useHistory();

    if (!reservationAdded) {
        history.push(`/`);
    }

    return (
        <>
            <Wrapper>
                <TitleTextWrapper>
                    <Title>Your flight is confirmed!</Title>
                    <Flight>{currentReservation?.flight} {currentReservation?.city} to Honolulu</Flight>
                    <Duration>{currentReservation?.travelTime}</Duration>
                    <InfoWrapper>
                        <Departure><Span>Departure: </Span>{currentReservation?.departure}</Departure>
                        <Arrival><Span>Arrival: </Span>{currentReservation?.arrival}</Arrival>
                    </InfoWrapper>
                </TitleTextWrapper>
                <div>
                    <Text><Span>Reservation: </Span>{currentReservation?.id}</Text>
                    <Text><Span>Seat: </Span>{currentReservation?.seat}</Text>
                    <Text><Span>Name: </Span>{currentReservation?.givenName} {currentReservation?.surname}</Text>
                    <Text><Span>Email: </Span>{currentReservation?.email}</Text>
                </div>
            </Wrapper>
            <CoverShade />
            <Background src={slingAirHawaii} alt="slingAir airplane flies over Hawaii." />
        </>
    )
};
    
    const Wrapper = styled.div`
        z-index: 3;
        color: white;
        height: 100vh;
        width: 100vw;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    `;

    const TitleTextWrapper = styled.div`
        width: 700px;
        margin-bottom: 40px;
    `;

    const Title = styled.h1`
        margin-bottom: 75px;
        font-size: 40px;
    `;
    
    const Flight = styled.h2`
        margin-top: 30px;
    `;

    const InfoWrapper = styled.div`
        display: flex;
        justify-content: center;
        margin-top: 5px;
    `;

    const Departure = styled.p`
        color: white;
        font-size: 20px;
        margin-right: 10px;
    `;

    const Arrival = styled.p`
        color: white;
        font-size: 20px;
        margin-left: 10px;
    `;

    const Duration = styled.p`
        line-height: 35px;
        color: white;
        font-size: 22px;
        text-align: center;
        margin-bottom: 20px;
    `;

    const Span = styled.span`
        font-weight: 700;
    `;

    const Text = styled.p`
        z-index: 3;
        line-height: 40px;
        color: white;
        font-size: 26px;
    `;

    const CoverShade = styled.div`
        z-index: 2;
        position: absolute;
        width: 100vw;
        height: 100vh;
        object-fit: cover;
        background-color: black;
        opacity: 70%;
    `;

    const Background = styled.img`
        z-index: 1;
        position: absolute;
        width: 100vw;
        height: 100vh;
        object-fit: cover;
    `;

export default Confirmation;