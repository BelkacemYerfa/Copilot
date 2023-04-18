import { lazy, useState } from "react";
import { SignIn } from "../components/Auth/SignIn";
import NewPassword from "../components/Confirmation/NewPassword";
import Verify from "../components/Confirmation/Verify";
import { useQuery } from "@tanstack/react-query";
import Wrapper from "../components/wrapper/AnimateWrapper";
import PageWrapper from "../components/wrapper/PageWrapper";
const SignUp = lazy(() => import("../components/Auth/SignUp"));

export const Auth = (): JSX.Element => {
  const [isSignIn, setIsSignIn] = useState<boolean>(true);

  const displayElm: JSX.Element[] = [
    <SignIn isVisable={() => setIsSignIn(!isSignIn)} />,
    <Verify />,
    <NewPassword />,
  ];
  const { data } = useQuery({
    queryKey: ["data"],
    queryFn: () =>
      fetch("https://api.github.com/repos/tannerlinsley/react-query").then(
        (res) => res.json()
      ),
  });
  console.log(data);
  return (
    <PageWrapper checked={true}>
      {isSignIn ? (
        <Wrapper>
          <SignIn isVisable={() => setIsSignIn(!isSignIn)} />
        </Wrapper>
      ) : (
        <SignUp isVisable={() => setIsSignIn(!isSignIn)} />
      )}
    </PageWrapper>
  );
};
