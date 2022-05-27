import React, { useContext, useEffect, useState } from "react";
import { Input, Tooltip, Textarea, Loader, Alert } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { Box, MainContainer } from "../../utils";
import { MdTitle } from "react-icons/md";
import { BsInfoCircleFill } from "react-icons/bs";
import { IoBodySharp } from "react-icons/io5";
import Button from "@mui/material/Button";
import styled from "styled-components";
import { useFormik } from "formik";
import useMatchMedia from "../../hooks/useMatchMedia";
import { loggedInInfo } from "../../services/auth.services";
import { validatePostSchema } from "../../ValidateSchema&InitialValues/validateSchemas";
import { postInitialValues } from "../../ValidateSchema&InitialValues/initialValues";
import { createPost } from "../../services/user.service";
import { LoginInfo } from "../../App";
import { BiErrorAlt } from "react-icons/bi";

const Create = () => {
  const navigate = useNavigate();
  const toggle600 = useMatchMedia();
  const [login, setLogin] = useState(false);
  const [, userN] = useContext(LoginInfo);
  const [error, setError] = useState("");
  useEffect(() => {
    const getLoginInfo = async () => {
      const isLoggedIn = await loggedInInfo();
      setLogin(isLoggedIn.data.auth);
    };
    getLoginInfo();
  }, []);

  const formik = useFormik({
    validationSchema: validatePostSchema,
    initialValues: postInitialValues,
    onSubmit: async (values) => {
      try {
        const userName = userN as string;
        const postCreateRes = await createPost({ ...values, userName });
        if (postCreateRes.data.created) {
          navigate("/");
        }
      } catch (err: any) {
        if (err.response.data.message) {
          setError(err.response.data.message);
        } else {
          setError(err.message);
        }
      }
    },
  });

  const rightSectionTitle = (
    <Tooltip
      label="This will be display on the Post Title"
      position={toggle600 ? "bottom" : "right"}
    >
      <BsInfoCircleFill size={16} style={{ display: "block", opacity: 0.5 }} />
    </Tooltip>
  );
  const rightSectionBody = (
    <Tooltip
      label="This will be display on the Post Body"
      position={toggle600 ? "bottom" : "right"}
    >
      <BsInfoCircleFill
        size={16}
        style={{ display: "block", opacity: 0.5, marginTop: -40 }}
      />
    </Tooltip>
  );
  return (
    <>
      {!login ? (
        <MainContainer>
          <Loader size={30} style={{ marginTop: 40 }} />
        </MainContainer>
      ) : (
        <>
          <MainContainer style={{ display: "flex", flexDirection: "column" }}>
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
            <Heading>Create Your Post!</Heading>
            <form onSubmit={formik.handleSubmit}>
              <PostInput>
                <Input
                  radius="md"
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  size="md"
                  id="title"
                  name="title"
                  rightSectionWidth={50}
                  icon={<MdTitle size={16} />}
                  placeholder="Your Title"
                  rightSection={rightSectionTitle}
                  style={{ marginBottom: 30 }}
                />
                <Textarea
                  minRows={4}
                  value={formik.values.body}
                  onChange={formik.handleChange}
                  id="body"
                  name="body"
                  radius="md"
                  icon={<IoBodySharp style={{ marginTop: -70 }} size={16} />}
                  rightSection={rightSectionBody}
                  rightSectionWidth={50}
                  maxRows={8}
                />
                <PostButton>
                  <Button type="submit" variant="outlined">
                    Create!
                  </Button>
                </PostButton>
              </PostInput>
            </form>
          </MainContainer>
        </>
      )}
    </>
  );
};

const Heading = styled(Box)`
  font-size: 20px;
  margin-bottom: 20px;
`;

const PostInput = styled(Box)`
  display: flex;
  flex-direction: column;
`;
const PostButton = styled(Box)`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  margin-right: 4px;
`;
export default Create;
