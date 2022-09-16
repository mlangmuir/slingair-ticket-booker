import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { Context } from "../Context";

const Plane = ({ flightSelect }) => {

  const { seatSelect, setSeatSelect } = useContext(Context);

  const [seating, setSeating] = useState([]);

  // get specific flight
  useEffect(() => {
    if (flightSelect) {
      fetch(`/get-flight/${flightSelect}`)
          .then((res) => res.json())
          .then((data) => {
              setSeating(data.data?.seats)
          });
    }
  },[flightSelect]);

  return (
    <Wrapper>
      {seating && seating.length > 0 ? (
        seating.map((seat) => (
          <SeatWrapper key={`seat-${seat.id}`}>
            <label>
              {seat.isAvailable ? (
                <>
                  <Seat
                    type="radio"
                    name="seat"
                    onChange={() => {setSeatSelect(seat.id)}}
                  />
                  <Available
                    style={{
                      backgroundColor: seatSelect === seat.id && "#0a254b",
                      color: seatSelect === seat.id && "#fff"
                    }}
                  >
                    {seat.id}
                  </Available>
                </>
              ) : (
                <Unavailable>{seat.id}</Unavailable>
              )}
            </label>
          </SeatWrapper>
        ))
      ) : (
        <Placeholder>Loading...</Placeholder>
      )}
    </Wrapper>
  );
};

const Placeholder = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 404px;
  width: 260px;
  text-align: center;
  color: #0a254b;
  font-family: 'League Spartan', sans-serif;
  font-size: 32px;
  opacity: 0.5;
`;

const Wrapper = styled.ol`
  display: grid;
  grid-template-rows: repeat(10, 30px);
  grid-template-columns: 30px 30px 60px 30px 30px 30px;
  gap: 12px 10px;
  background: #fff;
  border-right: 15px solid #0a254b;
  border-left: 15px solid #0a254b;
  margin: 24px 24px 0 0;
  padding: 48px 5px;
  height: 500px;
  width: 300px;
  position: relative;
`;

const SeatWrapper = styled.li`
  display: flex;
  font-size: 12px;
  font-weight: 500;
  position: relative;
  height: 30px;
  width: 30px;
`;

const Seat = styled.input`
  opacity: 0;
  position: absolute;
  height: 30px;
  width: 30px;
  margin: 0;

  &:checked {
    span {
      background: #0a254b;
      color: #fff;
      font-weight: 700;
    }
  }
`;

const SeatNumber = styled.span`
  border-radius: 2px;
  color: #0a254b;
  font-family: 'League Spartan', sans-serif;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  height: 30px;
  width: 30px;
  transition: all ease 300ms;
`;

const Available = styled(SeatNumber)`
  background: #fff;
  border: 1px solid #0a254b;
  cursor: pointer;

  &.checked,
  &:hover {
    background: #0a254b;
    color: #fff;
    font-weight: 700;
  }
`;

const Unavailable = styled(SeatNumber)`
  background: grey;
  cursor: not-allowed;
  opacity: 0.4;
`;

export default Plane;