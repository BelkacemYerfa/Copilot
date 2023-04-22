import { lazy, useState } from "react";
import { SignIn } from "../components/Auth/SignIn";
import NewPassword from "../components/Confirmation/NewPassword";
import Verify from "../components/Confirmation/Verify";
import axios from "axios";
import Wrapper from "../components/wrapper/AnimateWrapper";
import PageWrapper from "../components/wrapper/PageWrapper";
import useAxios from "../hooks/useAxios";
import { authFunct } from "../fetchFunctions/auth";
const SignUp = lazy(() => import("../components/Auth/SignUp"));

type Post = {
  id: number;
  title: string;
  body: string;
};

export const Auth = (): JSX.Element => {
  const [isSignIn, setIsSignIn] = useState<boolean>(true);
  const [count, setCount] = useState<number>(0);

  const displayElm: JSX.Element[] = [
    <SignIn
      isVisable={() => setIsSignIn(!isSignIn)}
      setCount={() => setCount((prev) => prev + 1)}
    />,
    <Verify setCount={() => setCount((prev) => prev + 1)} />,
    <NewPassword />,
  ];
  const fetchData = async () => {
    const result = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await result.json();
    return data;
  };
  const { data, isLoading } = useAxios<Post[]>({
    queryKey: "data",
    fetchFunc: fetchData,
  }); /* 
  console.log(data); */
  return (
    <PageWrapper checked={true}>
      {isSignIn ? (
        <Wrapper>{displayElm[count]}</Wrapper>
      ) : (
        <SignUp isVisable={() => setIsSignIn(!isSignIn)} />
      )}
    </PageWrapper>
  );
};
