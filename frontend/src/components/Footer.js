import styled from "styled-components";

const Footer = () => {

    const hubs = [
        "Montreal",
        "Vancouver",
        "Toronto",
        "Calgary",
        "Winnipeg",
        "Ottawa",
        "Edmonton",
        "Quebec City"
    ];

    const destinations = [
        "The Bahamas",
        "Canary Islands",
        "Cancun",
        "Cape Town",
        "French Polynesia",
        "Honululu",
        "The Maldives",
        "Maui"
    ];

    return (
        <Wrapper>
            <ListsWrapper>
                <Container>
                    <Title>HUBS</Title>
                        {hubs.map((item, index) => {
                            return (
                                <Item key={index}>{item}</Item>
                            )
                        })}
                </Container>
                <Container>
                    <Title>DESTINATIONS</Title>
                    {destinations.map((item, index) => {
                        return (
                            <Item key={index}>{item}</Item>
                        )
                    })}
                </Container>
                <Container>
                    <Title>CUSTOMER SERVICE</Title>
                    <p>support@slingair.ca</p>
                    <p>1-800-392-5827</p>
                </Container>
            </ListsWrapper>
            <Copyright>© 2022 slingAir. All rights reserved.</Copyright>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: #0a254a;
    width: 100vw;
    height: 400px;
    bottom: 0;
    margin-top: 100px;

    @media (max-width: 757px) {
        height: 550px;
    }

    @media (max-width: 525px) {
        height: 650px;
    }

    @media (max-width: 393px) {
        height: 750px;
    }

    @media (max-width: 359px) {
        height: 950px;
    }
`;

const ListsWrapper = styled.div`
    display: flex;
    justify-content: space-evenly;

    @media (max-width: 775px) {
        flex-wrap: wrap;
    }
`;

const Container = styled.div`
    color: white;
    line-height: 25px;
    font-size: 18px;
    margin: 20px;

    @media (max-width: 600px) {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
`;

const Title = styled.h3`
    font-weight: 700;
    font-size: 24px;
    text-align: left;
    margin-bottom: 5px;
`;

const Item = styled.p`
    line-height: 25px;
    font-size: 18px;
`;

const Copyright = styled.p`
    color: white;
    text-align: center;
    margin-top: 40px;
`;

export default Footer;