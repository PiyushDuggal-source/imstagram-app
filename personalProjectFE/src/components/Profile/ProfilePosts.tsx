import styled from "styled-components";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Box, Img, MainContainer } from "../../utils";
import useMatchMedia from "../../hooks/useMatchMedia";
import Modal from "react-modal";
import { useState } from "react";
import { motion } from "framer-motion";
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
        shouldCloseOnOverlayClick
        ariaHideApp={false}
        style={{
          overlay: {
            backgroundColor: "#7d77776a",
          },

          content: {
            top: "30%",
            left: "40%",
            right: "auto",
            backgroundColor: "#2e2323",
            bottom: "auto",
            marginRight: "-50%",
          },
        }}
      >
        <motion.div
          initial={{ scale: 0.7 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.45 }}
        >
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
        </motion.div>
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
