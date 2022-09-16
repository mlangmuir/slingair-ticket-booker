import styled from "styled-components";
import { useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { Context } from "./Context";

import slingAirLogo from "../assets/slingair-logo.png";

const Header = () => {

  const { reservationAdded, setFlightSelect } = useContext(Context);

  const history = useHistory();

  return (
    <Wrapper>
      <Logo
        onClick={(e) => {
          e.preventDefault();
          setFlightSelect("");
          history.push("/");
        }}>
          <LogoImage src={slingAirLogo} alt="slingAir logo" />
      </Logo>
      <Nav>
        {reservationAdded &&
          <div>
            <StyledNavLink to="/reservation">My Reservation</StyledNavLink>
          </div>
        }
      </Nav>
    </Wrapper>
  );
}

const Wrapper = styled.header`
  display: flex;
  justify-content: space-between;
  background-color: #0a254b;
  height: 80px;
  padding: var(--padding-page) 18px;
`;

const Logo = styled.div`

  &:hover {
    cursor: pointer
  }
`;

const LogoImage = styled.img`
  margin-top: -20px;
  height: 70px;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const StyledNavLink = styled(NavLink)`
  border-radius: 4px;
  background: #0a254b;
  color: white;
  border: 1px solid white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'League Spartan', sans-serif;
  font-size: 18px;
  height: 42px;
  margin: 0 0 0 8px;
  padding: 0 14px;
  width: 100%;
  text-decoration: none;
  transition: all ease 400ms;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  &:hover {
    background-color: #013580;
    color: white;
    border-color: white;
  }
`;

export default Header;
