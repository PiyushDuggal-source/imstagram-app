import { Box } from "@mantine/core";
import styled from "styled-components";
import { Anchor, CenteredDiv, Heading, Img, MainContainer } from "../../utils";
import { GrInstagram } from "react-icons/gr";

const NotImple = () => {
  return (
    <CenteredDiv>
      <MainContainer style={{ marginBottom: 30 }}>
        <Heading style={{ display: "flex" }} size={50}>
          <Not>Not</Not> Implemented
        </Heading>
      </MainContainer>
      <Lines>
        This is not Implemented Yet, If you like to contribute in any way
        (Implementations / Improvements / Suggestions / Code reviews) please let
        me know I would love to work with you.
      </Lines>
      <MainContainer>
        <Social href="https://www.instagram.com/piyush_duggal/" target="_blank">
          <GrInstagram size={25} style={{ marginBottom: -7, marginRight: 6 }} />
          @Piyush_Duggal
        </Social>
      </MainContainer>
    </CenteredDiv>
  );
};

const Not = styled(Box)`
  color: red;
  font-size: 50px;
  margin-right: 15px;
`;

const Lines = styled(Box)`
  color: #fff;
  text-align: center;
  font-size: 20px;
`;

const Social = styled(Anchor)`
  color: blue;
  margin: 30px;
  text-decoration: none;
  font-size: 20px;
`;
export default NotImple;
