import MainBtn from "../shared/btns/MainBtn";
import google from "../../assets/icons/google.svg";
import apple from "../../assets/icons/apple.svg";
import Text from "../shared/Text/Text";
import Swicher from "../shared/Switcher/Switcher";
import Input from "../shared/Input/Input";
import LinkSwitcher from "../shared/Link/LinkSwitcher";
import SignBtn from "../shared/btns/SignBtn";
import AcceptTerms from "../shared/Input/AcceptTerms";
import { Distination, SignProps } from "../../interfaces&types/Distination";
import { motion } from "framer-motion";
import { UserSchemaRegister } from "../../validation/auth";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { UserAuth } from "../../interfaces&types/User";
import { useState } from "react";
import TextError from "../shared/Text/TextError";
import { useRegisterUser } from "../../hooks/useAuthUser";
import { useNavigate } from "react-router-dom";

type UserFormSchema = z.infer<typeof UserSchemaRegister>;

const SignUp = ({ isVisable }: SignProps) => {
  const navigate = useNavigate();
  const [check, setCheck] = useState<boolean>(true);
  const dist: Distination = {
    text: "Terms",
    to: "/auth",
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormSchema>({
    mode: "onChange",
    resolver: zodResolver(UserSchemaRegister),
  });
  const { mutate: registerUser, isLoading, isSuccess } = useRegisterUser();
  const submiter: SubmitHandler<UserFormSchema> = async (userInfo) => {
    /*  if (userInfo) {
      setCheck(!check);
    } */
    const { email, password } = userInfo;
    const userPostInfo: UserAuth = {
      email,
      password,
    };
    registerUser(userPostInfo, {
      onSuccess: () => {
        navigate("/");
      },
    });
  };
  if (isLoading) return <h1>Loading...</h1>;

  return (
    <motion.form
      onSubmit={handleSubmit(submiter, (err) => console.log(err))}
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 20, opacity: 0 }}
      className="text-center space-y-7 "
    >
      <div className="space-y-2">
        <h2 className="text-2xl/9 text-main_color font-semibold">Sing Up</h2>
        <Text text="Copilot" />
      </div>
      <div className="flex flex-col sm:flex-row gap-y-2 items-center gap-x-4">
        <MainBtn text="Sign in with Google" Icon={google} />
        <MainBtn text="Sign in with Apple" Icon={apple} />
      </div>
      <Swicher />
      <div className="flex flex-col gap-y-5">
        <div className="flex flex-col gap-y-4">
          <div>
            <Input placeholderType="Email" RegisterInput={register} />
            {errors.email ? <TextError error={errors.email.message} /> : null}
          </div>
          <div>
            <Input
              placeholderType="Password"
              checkLenght={true}
              RegisterInput={register}
            />
            {errors.password ? (
              <TextError error={errors.password.message} />
            ) : null}
          </div>
          <div>
            <Input
              placeholderType="Password"
              placeholderCase="Repeat Password"
              RegisterInput={register}
            />
            {errors.RepeatPassword ? (
              <TextError error={errors.RepeatPassword.message} />
            ) : null}
          </div>
        </div>
        <div className="flex justify-start w-full">
          <AcceptTerms text="I Accept the " dist={dist} />
        </div>
      </div>
      <SignBtn text="Sign Up" disable={check} />
      <div className="flex justify-center gap-x-1">
        <Text text="Already have an Account?" />
        <LinkSwitcher to="/auth" text="Sign Up" onClick={isVisable} />
      </div>
    </motion.form>
  );
};

export default SignUp;
