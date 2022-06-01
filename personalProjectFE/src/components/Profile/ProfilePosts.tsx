import styled from "styled-components";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Box, Img, MainContainer } from "../../utils";
import useMatchMedia from "../../hooks/useMatchMedia";
import Modal from "react-modal";
import { useState } from "react";
type ProfilePostData = {
  data: {
    img: string;
    title: string;
    likes: number;
  };
};

const ProfilePosts = (prop: ProfilePostData) => {
  const toggle600 = useMatchMedia();
  const [modalIsOpen, setIsOpen] = useState(false);
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  return (
    <MainContainer style={{ margin: "10px" }}>
      <ProfilePostCard onClick={() => openModal()}>
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
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
      >
        <button onClick={closeModal}>close</button>
        <div>I am a modal</div>
        <form>
          <input />
          <button>tab navigation</button>
          <button>stays</button>
          <button>inside</button>
          <button>the modal</button>
        </form>
      </Modal>
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
