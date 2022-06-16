import { useEffect, useState } from "react";
import { CenteredDiv, MainContainer } from "../../utils";
import PostCard from "../Card/PostCard";
import { motion } from "framer-motion";
import { BiErrorAlt } from "react-icons/bi";
import { Alert, Loader } from "@mantine/core";
import useSWR from "swr";
import { GET_ALL_POSTS, Local, LOCALHOST } from "../../ENV/env";

type SinglePostData = {
  _id: string;
  userName: string;
  title: string;
  img: string;
  body: string;
  likes: number;
};

const Home = () => {
  const [posts, setPosts] = useState<SinglePostData[] | undefined | []>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState<boolean>(true);
  const { data, error: postError } = useSWR<{ post: SinglePostData[] }>(
    Local ? "http://localhost:4000/api/getPosts" : GET_ALL_POSTS
  );
  useEffect(() => {
    try {
      const getPost = async () => {
        // const post = await getAllPosts();
        if (postError) {
          setError("Unable to fetch the POSTS");
        } else {
          setPosts(data?.post);
        }
        setLoading(false);
      };
      getPost();
    } catch (err: any) {
      setError("Unable to fetch the POSTS");
    }
  }, [data, postError]);

  return loading ? (
    <CenteredDiv>
      <Loader />
    </CenteredDiv>
  ) : (
    <MainContainer>
      {error && (
        <Alert
          icon={<BiErrorAlt size={16} />}
          title="Bummer!"
          color="red"
          radius="md"
          variant="outline"
        >
          {error}
        </Alert>
      )}
      <motion.div
        initial={{ scale: 0.5 }}
        transition={{ type: "spring" }}
        animate={{ scale: 1 }}
      >
        {posts?.map((ele, key) => {
          return <PostCard key={key} data={ele} />;
        })}
      </motion.div>
    </MainContainer>
  );
};

export default Home;
