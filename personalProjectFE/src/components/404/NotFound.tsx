import React from "react";
import styled from "styled-components";
import { Box, CenteredDiv, Heading, MainContainer } from "../../utils";

const NotFound = () => {
  return (
    <CenteredDiv>
      <MainContainer style={{ marginBottom: 30 }}>
        <Heading style={{ display: "flex" }} size={50}>
          <Not>404</Not> Page Not Found
        </Heading>
      </MainContainer>
    </CenteredDiv>
  );
};

const Not = styled(Box)`
  color: red;
  font-size: 50px;
  margin-right: 15px;
`;
export default NotFound;
