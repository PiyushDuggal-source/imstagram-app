import styled from "styled-components";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Box, Img, MainContainer } from "../../utils";
import useMatchMedia from "../../hooks/useMatchMedia";
type ProfilePostData = {
  data: {
    img: string;
    title: string;
    likes: number;
  };
};

const ProfilePosts = (prop: ProfilePostData) => {
  const toggle600 = useMatchMedia();
  return (
    <MainContainer style={{ margin: "10px" }}>
      <ProfilePostCard>
        <Img
          style={
            toggle600
              ? {
                  margin: "-60px -20px",
                }
              : {
                  margin: "-40px -20px",
                }
          }
          width="280px"
          src={prop.data.img}
        />
        <Title>{prop.data.title}</Title>
        <Likes>
          <FavoriteIcon style={{ marginRight: "5px" }} />
          {prop.data.likes}
        </Likes>
      </ProfilePostCard>
    </MainContainer>
  );
};

const ProfilePostCard = styled(Box)`
  display: flex;
  align-items: center;
  flex-direction: column;
  border-left: 2px solid #fff;
  border-right: 2px solid #fff;
`;

const Title = styled(Box)`
  font-size: 20px;
`;
const Likes = styled(Box)``;
export default ProfilePosts;
