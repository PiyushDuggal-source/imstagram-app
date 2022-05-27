import styled from "styled-components";

export const Box = styled.div``;
export const Img = styled.img``;
export const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const Grid = styled.div`
  display: grid;
  grid-gap: ${(props: { gap: string }) => props.gap || "1rem"};
  @media (min-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: 900px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const Hr = styled.hr`
  /* width: 80%;
  border: 0;
  height: 1px;
  background: #333;
  background-image: linear-gradient(to right, #333, #ccc, #333); */
  border: 0;
  width: 80%;
  height: 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.5);
`;
export const CenteredDiv = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const Heading = styled.div`
  font-size: ${(props: { size: number }) => props.size}px;
`;

export const Anchor = styled.a``;
