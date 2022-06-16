import { useEffect, useState } from "react";
import styled from "styled-components";
import { MdOutlineEdit } from "react-icons/md";
import { Box, Img, MainContainer } from "../../utils";
import LoadingButton from "@mui/lab/LoadingButton";
import { GiGlassHeart } from "react-icons/gi";
import { Button, Tooltip } from "@mantine/core";
import useMatchMedia from "../../hooks/useMatchMedia";
import { BsInfoCircleFill } from "react-icons/bs";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaUserPlus } from "react-icons/fa";
import { RiUserFollowFill } from "react-icons/ri";
import { checkFollow } from "../../services/profile.service";
import { isFollow } from "../../services/post.service";

export type ProfileProp = {
  data: {
    showEdit: boolean;
    firstName: string;
    lastName: string;
    userName: string;
    gender: string;
    imageUrl: string;
    likes: number;
    followers: string[];
    followings: string[];
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
  const [loading, setLoading] = useState(false);
  const [followStr, setFollowStr] = useState<"Follow Me" | "Followed">(
    "Follow Me"
  );
  const [followLabel, setFollowLabel] = useState<
    "Please Login to Follow this User" | true
  >(true);
  useEffect(() => {
    (async () => {
      if (prop.data.userName !== undefined) {
        const followed = await checkFollow(prop.data.userName);
        if (followed.data.followed) {
          setFollowStr("Followed");
        }
      }
    })();
  }, [prop.data.userName]);

  // sleep function
  const sleep = (ms: number | undefined) =>
    new Promise((r) => setTimeout(r, ms));

  const followUser = (userName: string) => {
    setLoading(true);
    isFollow(userName).then(async (res) => {
      if (!res.data.auth) {
        setFollowLabel("Please Login to Follow this User");
        await sleep(4000);
        setFollowLabel(true);
      } else {
        const followerEle = document.getElementById(userName)!;
        followerEle.innerHTML = `${Number(followerEle.innerHTML) + 1}`;
        setFollowStr("Followed");
      }
    });

    setLoading(false);
  };
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
            <GiGlassHeart color="red" size={25} style={{ marginRight: 5 }} />
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
          <FollowSection>
            <Follow>
              <Followings>
                Followings:{" "}
                <span
                  style={{
                    fontSize: 20,
                    color: "#fff",
                  }}
                >
                  {prop.data.followings?.length
                    ? prop.data.followings.length
                    : 0}
                </span>
              </Followings>
              <Followers>
                Followers:{" "}
                <span
                  style={{
                    fontSize: 20,
                    color: "#fff",
                  }}
                  id={`${prop.data.userName}`}
                >
                  {prop.data.followers?.length ? prop.data.followers.length : 0}
                </span>
              </Followers>
            </Follow>
            {!prop.data.showEdit ? (
              <Tooltip
                label={followLabel}
                opened={followLabel !== true}
                transition="slide-up"
                transitionDuration={300}
                transitionTimingFunction="ease"
              >
                <FollowBtn>
                  <LoadingButton
                    size="small"
                    onClick={() => {
                      if (followStr === "Follow Me") {
                        followUser(prop.data.userName);
                      }
                    }}
                    endIcon={
                      followStr === "Followed" ? (
                        <RiUserFollowFill />
                      ) : (
                        <FaUserPlus />
                      )
                    }
                    loading={loading}
                    loadingPosition="end"
                    variant="contained"
                  >
                    {followStr}
                  </LoadingButton>
                </FollowBtn>
              </Tooltip>
            ) : (
              <></>
            )}
          </FollowSection>
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
const Follow = styled(Box)`
  display: flex;
`;
const Followings = styled(Box)`
  margin-right: 10px;
`;
const Followers = styled(Box)``;
const FollowBtn = styled(Box)``;
const FollowSection = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Likes = styled(Box)`
  display: flex;
  align-items: baseline;
  justify-content: center;
  margin-top: 5px;
  color: #fff;
  font-size: 20px;
`;

export default ProfileCard;
