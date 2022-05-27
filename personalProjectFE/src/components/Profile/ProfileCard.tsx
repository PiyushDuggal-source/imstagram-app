import styled from "styled-components";
import { MdOutlineEdit } from "react-icons/md";
import { Box, Img, MainContainer } from "../../utils";
import { GiGlassHeart } from "react-icons/gi";
import { Button, Tooltip } from "@mantine/core";
import useMatchMedia from "../../hooks/useMatchMedia";
import { BsInfoCircleFill } from "react-icons/bs";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export type ProfileProp = {
  data: {
    showEdit: boolean;
    firstName: string;
    lastName: string;
    userName: string;
    gender: string;
    imageUrl: string;
    likes: number;
  };
};

const spring = {
  type: "spring",
  damping: 20,
  stiffness: 100,
};
const ProfileCard = (prop: ProfileProp) => {
  const toggle600 = useMatchMedia();
  const navigate = useNavigate();
  return (
    <motion.div
      initial={{ scale: 0.7 }}
      transition={spring}
      animate={{ scale: 1 }}
    >
      <MainContainer
        style={{ display: "flex", flexDirection: "column", marginBottom: 16 }}
      >
        <Top>
          <ProfilePic src={prop.data.imageUrl} width="150px" />{" "}
          <UserName>{prop.data.userName}</UserName>
          <Name>
            {prop.data.firstName} {prop.data.lastName}
          </Name>
        </Top>
        <Middle>
          <Likes>
            <GiGlassHeart color="red" size={25} />
            {prop.data.likes}
            <Tooltip
              style={{ margin: "0 0 0 10px" }}
              label="This is your Like Points, 1L = 12 Points"
              position={toggle600 ? "bottom" : "right"}
            >
              <BsInfoCircleFill
                size={14}
                style={{ display: "block", opacity: 0.5 }}
              />
            </Tooltip>
          </Likes>
        </Middle>
        {prop.data.showEdit ? (
          <Button
            style={{ marginTop: 10 }}
            variant="outline"
            rightIcon={<MdOutlineEdit size={14} />}
            onClick={() => navigate("/edit")}
          >
            Edit Your Profile
          </Button>
        ) : (
          <></>
        )}
      </MainContainer>
    </motion.div>
  );
};

const ProfilePic = styled(Img)``;
const Top = styled(Box)`
  display: flex;
  align-items: center;
  flex-direction: column;
`;
const UserName = styled(Box)`
  font-size: 18px;
`;
const Name = styled(Box)`
  color: #fff;
  font-size: 22px;
`;
const Middle = styled(Box)``;

const Likes = styled(Box)`
  color: #fff;
  font-size: 20px;
`;

export default ProfileCard;
