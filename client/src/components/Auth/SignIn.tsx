import MainBtn from "../shared/btns/MainBtn";
import google from "../../assets/icons/google.svg";
import apple from "../../assets/icons/apple.svg";
import Text from "../shared/Text/Text";
import Swicher from "../shared/Switcher/Switcher";
import Input from "../shared/Input/Input";
import LinkSwitcher from "../shared/Link/LinkSwitcher";
import SignBtn from "../shared/btns/SignBtn";
import { SignProps } from "../../interfaces&types&static/Distination";
import { motion } from "framer-motion";
import { UserSchemaLogin } from "../../validation/auth";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import TextError from "../shared/Text/TextError";
import { useAuthUser, useLogUser } from "../../hooks/useAuthUser";
import { UserAuth } from "../../interfaces&types&static/User";
import { expression } from "../../interfaces&types&static/regExEmail";
import { useNavigate } from "react-router-dom";

export type UserFormSchema = z.infer<typeof UserSchemaLogin>;

interface SingInProps extends SignProps {
  setCount: () => void;
}

export const SignIn = ({ isVisable, setCount }: SingInProps) => {
  const navigate = useNavigate();
  const [emailValidation, setEmailValidation] = useState<boolean>(false);
  const [passwordValidation, setPasswordValidation] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<UserFormSchema>({
    resolver: zodResolver(UserSchemaLogin),
  });
  const { user, set } = useAuthUser();
  const { mutate: logUser, isLoading } = useLogUser();
  const submiter: SubmitHandler<UserFormSchema> = async (
    userInfo: UserFormSchema
  ) => {
    const { email, password } = userInfo;
    const userPostInfo: UserAuth = {
      email,
      password,
    };
    logUser(userPostInfo, {
      onSuccess: (data) => {
        console.log(data);
        set(data?.data.user);
        navigate("/");
      },
      onError: (data) => {
        console.log(data);
      },
    });
  };

  useEffect(() => {
    const subscribe = watch((value) => {
      if (expression.test(value.email ? value.email : ""))
        setEmailValidation(true);
      else setEmailValidation(false);
      if (value.password?.length ? value.password.length >= 8 : "".length >= 8)
        setPasswordValidation(true);
      else setPasswordValidation(false);
    });
    return () => subscribe.unsubscribe();
  });

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
        <h2 className="text-2xl/9 text-main_color font-semibold">Sing In</h2>
        <Text text="Copilot" />
      </div>
      <div className="flex flex-col sm:flex-row gap-y-2   items-center gap-x-4">
        <MainBtn text="Sign in with Google" Icon={google} />
        <MainBtn text="Sign in with Apple" Icon={apple} />
      </div>
      <Swicher />
      <div className="flex flex-col gap-y-2">
        <div className="flex flex-col gap-y-4">
          <div>
            <Input placeholderType="Email" RegisterInput={register} />
            {errors.email ? <TextError error={errors.email.message} /> : null}
          </div>
          <div>
            <Input placeholderType="Password" RegisterInput={register} />
            {errors.password ? (
              <TextError error={errors.password.message} />
            ) : null}
          </div>
        </div>
        <div className="flex justify-end w-full">
          <LinkSwitcher
            to="/auth"
            text="forgot password?"
            onClick={emailValidation ? setCount : () => null}
          />
        </div>
      </div>
      <SignBtn
        text="Sign In"
        disable={!emailValidation || !passwordValidation}
      />
      <div className="flex justify-center gap-x-1">
        <Text text="Not a Member yet?" />
        <LinkSwitcher to="/auth" text="Sign In" onClick={isVisable} />
      </div>
    </motion.form>
  );
};
