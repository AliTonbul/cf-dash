// import { useAuth } from "@/hooks/useAuth";
// import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.section`
  display: flex;
  text-align: center;

  flex-direction: column;
  align-content: center;
  justify-content: center;
  align-items: center;
  height: 60vh;
`;

const Title = styled.h1`
  font-size: 2.5em;
`;
const SubText = styled.p`
  font-size: 1em;
`;

export const Home = () => {
  // const { token } = useAuth();

  return (
    <Container>
      <Title>CrewForce.app</Title>
      <SubText>Coming soon </SubText>
      {/* {token ? (
        <Link to="/admin" className="underline">
          admin
        </Link>
      ) : (
        <Link to="/login" className="underline">
          login
        </Link> */}
      {/* )} */}
    </Container>
  );
};
