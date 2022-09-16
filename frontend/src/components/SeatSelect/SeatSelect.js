import { useContext } from "react";
import { useHistory } from "react-router-dom";
import styled from 'styled-components';
import { Context } from "../Context";
import Plane from "./Plane";
import { v4 as uuidv4 } from "uuid";

const SeatSelect = () => {

  const id = uuidv4();

  const {
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
    setReservationAdded,
    slingAirHawaii,
    city,
    departure,
    arrival,
    travelTime,
    setCurrentReservation
  } = useContext(Context);

  const history = useHistory();

  const handleSubmit = (e) => {

    e.preventDefault();
  
    setFlightSelect("");
    setSeatSelect("");

    fetch("/add-reservation", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: id,
          flight: flightSelect,
          seat: seatSelect,
          givenName: givenName,
          surname: surname,
          email: email,
          city: city,
          departure: departure,
          arrival: arrival,
          travelTime: travelTime,
        })
    }).then((e) => {
      return e.json()
    }).then((res => {
      if (res.status === 201) {
        setCurrentReservation(res.data);
        setReservationAdded(true);
        history.push("/confirmed");
      }
    }))
  }

  return (
    <>
      <Wrapper>
        <TitleTextWrapper>
          <Title>{city} to Honolulu</Title>
          <Duration>{travelTime}</Duration>
          <InfoWrapper>
            <Departure><Span>Departure: </Span>{departure}</Departure>
            <Arrival><Span>Arrival: </Span>{arrival}</Arrival>
          </InfoWrapper>
        </TitleTextWrapper>
        <SelectTitle>Select your seat and provide your information!</SelectTitle>
        <BookingWrapper>
          <Plane flightSelect={flightSelect}/>
          <div>
            <Form onSubmit={handleSubmit}>
              <Input type="text" placeholder="First Name" onChange={(e) => setGivenName(e.target.value)} required />
              <Input type="text" placeholder="Last Name" onChange={(e) => setSurname(e.target.value)} required />
              <Input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
              { flightSelect && seatSelect
                ? <Submit type="submit">Submit</Submit>
                : <Submit type="submit" disabled>Submit</Submit>
              }
            </Form>
          </div>
        </BookingWrapper>
      </Wrapper>
      <CoverShade />
      <Background src={slingAirHawaii} alt="slingAir airplane flies over Hawaii." />
    </>
  );
};

const Wrapper = styled.div`
  z-index: 3;
`;

const TitleTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  margin-top: 35px;
`;

const InfoWrapper = styled.div`
  display: flex;
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
`;

const Span = styled.span`
  font-weight: 700;
`;

const SelectTitle = styled.h2`
  font-size: 28px;
  font-weight: 700;
  margin-top: 40px;
`;

const BookingWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  border-color: #0a254b;
  margin-top: 20px;
  font-size: 20px;
  width: 300px;
`;

const Submit = styled.button`
  background-color: #0a254b;
  margin-top: 30px;
  border-radius: 5px;
  padding: 10px 0;
  font-size: 20px;

  :disabled {
    opacity: 70%;
  }

  :hover {
    cursor: pointer;
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

export default SeatSelect;