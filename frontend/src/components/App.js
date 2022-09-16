import styled from "styled-components";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "./Header";
import SeatSelect from "./SeatSelect";
import Confirmation from "./Confirmation";
import GlobalStyles from "./GlobalStyles";
import Reservation from "./Reservation";
import FlightSelect from "./FlightSelect";
import Footer from "./Footer";

const App = () => {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Header />
      <Main>
        <Switch>
          <Route exact path="/">
            <FlightSelect />
          </Route>
          <Route exact path="/confirmed">
            <Confirmation />
          </Route>
          <Route exact path="/reservation">
            <Reservation />
          </Route>
          <Route exact path="/:flight">
            <SeatSelect />
          </Route>
          <Route path="">404: Oops!</Route>
        </Switch>
      </Main>
      <Footer />
    </BrowserRouter>
  );
};

const Main = styled.div`
  background: var(--color-orange);
  display: flex;
  flex-direction: column;
  height: calc(100vh - 110px);
`;

export default App;