import MainBtn from "../shared/btns/MainBtn";
import google from "../../assets/icons/google.svg";
import apple from "../../assets/icons/apple.svg";
import Text from "../shared/Text/Text";
import Switcher from "../shared/Switcher/Switcher";
import Input from "../shared/Input/Input";
import LinkSwitcher from "../shared/Link/LinkSwitcher";
import SignBtn from "../shared/btns/SignBtn";
import AcceptTerms from "../shared/Input/AcceptTerms";
import {
  Distination,
  SignProps,
} from "../../interfaces&types&static/Distination";
import { motion } from "framer-motion";
import { UserSchemaRegister } from "../../validation/auth";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { UserAuth } from "../../interfaces&types&static/User";
import { useState, useEffect } from "react";
import TextError from "../shared/Text/TextError";
import { useAuthUser, useRegisterUser } from "../../hooks/useAuthUser";
import { useNavigate } from "react-router-dom";
import { expression } from "../../interfaces&types&static/regExEmail";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type UserFormSchema = z.infer<typeof UserSchemaRegister>;

const SignUp = ({ isVisable }: SignProps) => {
  const navigate = useNavigate();
  const [emailValidation, setEmailValidation] = useState<boolean>(false);
  const [passwordValidation, setPasswordValidation] = useState<boolean>(false);
  const [confirmPasswordValidation, setConfirmPasswordValidation] =
    useState<boolean>(false);
  const dist: Distination = {
    text: "Terms",
    to: "/auth",
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<UserFormSchema>({
    mode: "onChange",
    resolver: zodResolver(UserSchemaRegister),
  });
  const { set } = useAuthUser();
  const { mutate: registerUser, isLoading, error } = useRegisterUser();
  const submiter: SubmitHandler<UserFormSchema> = async (userInfo) => {
    const { email, password } = userInfo;
    const userPostInfo: UserAuth = {
      email,
      password,
    };
    registerUser(userPostInfo, {
      onSuccess: (data) => {
        console.log(data);
        set(data?.data?.user);
        navigate("/");
      },
      onError: (data) => {
        console.log(data);
        toast.error("already an existing account", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
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
      if (
        value.RepeatPassword?.length
          ? value.RepeatPassword.length >= 8
          : "".length >= 8
      )
        setConfirmPasswordValidation(true);
      else setConfirmPasswordValidation(false);
    });
    return () => subscribe.unsubscribe();
  });

  return (
    <>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        className="w-full sm:w-fit text-center space-y-7 "
      >
        <div className="space-y-2">
          <h2 className="text-2xl/9 text-main_color font-semibold">Sing Up</h2>
          <Text text="Copilot" />
        </div>
        <div className="flex flex-col sm:flex-row gap-y-2 items-center gap-x-4">
          <MainBtn text="Sign in with Google" Icon={google} />
          <MainBtn text="Sign in with Apple" Icon={apple} />
        </div>
        <Switcher />
        <form
          onSubmit={handleSubmit(submiter, (err) => console.log(err))}
          className="space-y-3"
        >
          <div className="flex flex-col gap-y-5">
            <div className="flex flex-col gap-y-4">
              <div>
                <Input placeholderType="Email" RegisterInput={register} />
                {errors.email ? (
                  <TextError error={errors.email.message} />
                ) : null}
              </div>
              <div>
                <Input placeholderType="Password" RegisterInput={register} />
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
          <SignBtn
            text="Sign Up"
            isLoading={isLoading}
            disable={
              !emailValidation ||
              !passwordValidation ||
              !confirmPasswordValidation
            }
          />
        </form>
        <div className="flex justify-center gap-x-1">
          <Text text="Already have an Account?" />
          <LinkSwitcher to="/auth" text="Sign In" onClick={isVisable} />
        </div>
      </motion.div>
      {error ? <ToastContainer theme="colored" /> : null}
    </>
  );
};

export default SignUp;
