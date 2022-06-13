import { useEffect, useState } from "react";
import { Grid, Hr, MainContainer } from "../../utils";
import { useParams } from "react-router-dom";
import { getUserData, isUser } from "../../services/user.service";
import ProfileCard from "./ProfileCard";
import { useContext } from "react";
import { LoginInfo } from "../../App";
import ProfilePosts from "./ProfilePosts";
import { Loader } from "@mantine/core";
import { motion } from "framer-motion";
import useSWR from "swr";
import { LOCALHOST } from "../../ENV/env";

type PostData = {
  firstName: string;
  lastName: string;
  userName: string;
  showEdit: boolean;
  gender: string;
  imageUrl: string;
  likes: number;
};

type UserPostData = {
  img: string;
  title: string;
  likes: number;
};

const Profile = () => {
  const { userName } = useParams();
  const [show, setShow] = useState<boolean>(true);
  const [user, setUser] = useState<PostData>({
    firstName: "",
    showEdit: false,
    gender: "",
    imageUrl: "",
    lastName: "",
    likes: 0,
    userName: "",
  });
  const [userPosts, setUserPosts] = useState<UserPostData[]>([
    {
      img: "",
      title: "",
      likes: 0,
    },
  ]);
  const [, loggedInUser] = useContext(LoginInfo);
  const [loading, setLoading] = useState<boolean>(true);

  const { data: userData, error: profileError } = useSWR(
    `${LOCALHOST}/UserInfo/${userName}`
  );
  console.log(userData);
  console.log(profileError);
  useEffect(() => {
    (async () => {
      // const userData = await getUserData(userName as string);

      const likePoint = userData?.likePoints;
      // const likePoint = userData.data.likePoints;
      console.log(likePoint);
      setUser({
        ...userData?.userData,
        // ...userData.data.userData,
        likes: likePoint,
        showEdit: (loggedInUser as string) === (userName as string),
      });
      setUserPosts(userData?.posts);
      // setUserPosts(userData.data.posts);
      setLoading(false);
    })();
  }, [userName, loggedInUser, userData]);
  // }, [userName, loggedInUser]);

  useEffect(() => {
    (async () => {
      const isuser = await isUser(userName as string);
      const { data } = isuser;

      console.log(data);
      if (!data.exists) {
        setShow(false);
        return;
      }
    })();
  }, [show, userName]);
  return show ? (
    loading ? (
      <>
        <MainContainer>
          <Loader />
        </MainContainer>
      </>
    ) : (
      <MainContainer style={{ flexDirection: "column" }}>
        <ProfileCard data={user} />
        <Hr />
        <>
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 100 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.45 }}
          >
            <Grid gap="1rem">
              {userPosts?.map((userPost: UserPostData, index: number) => (
                <ProfilePosts data={userPost} key={index} />
              ))}
            </Grid>
          </motion.div>
        </>
      </MainContainer>
    )
  ) : (
    <>
      <MainContainer>
        This profile does not exists, please check the name
      </MainContainer>
    </>
  );
};

export default Profile;
