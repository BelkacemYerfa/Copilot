import MainBtn from "../shared/btns/MainBtn";
import google from "../../assets/icons/google.svg";
import apple from "../../assets/icons/apple.svg";
import Text from "../shared/Text/Text";
import Swicher from "../shared/Switcher/Switcher";
import Input from "../shared/Input/Input";
import LinkSwitcher from "../shared/Link/LinkSwitcher";
import SignBtn from "../shared/btns/SignBtn";
import { SignProps } from "../../interfaces&types/Distination";
import { motion } from "framer-motion";
import { UserSchemaLogin } from "../../validation/auth";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useAxios from "../../hooks/useAxios";
import { useState } from "react";
import axios from "axios";
import { User } from "../../interfaces&types/User";
import TextError from "../shared/Text/TextError";

export type UserFormSchema = z.infer<typeof UserSchemaLogin>;

export const SignIn = ({ isVisable }: SignProps) => {
  const [check, setCheck] = useState<boolean>(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormSchema>({
    resolver: zodResolver(UserSchemaLogin),
  });
  const submiter: SubmitHandler<UserFormSchema> = async (
    userInfo: UserFormSchema
  ) => {
    //quick note this is not valid cause you can(t call a hook inside of function)
    /* const { data, isLoading } = useAxios({
      queryKey: "userInfo",
      fetchFunc: async (): Promise<User> => {
        const result = await axios.post<User>(
          "http://localhost:5000/api/v1/auth/login",
          userInfo
        );
        return result.data;
      },
    }); */
    if (userInfo) setCheck(true);
    const result = await axios.post<User>(
      "http://localhost:5000/api/v1/auth/login",
      userInfo
    );
    console.log(result.data);
  };

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
          <LinkSwitcher to="/auth" text="forgot password?" />
        </div>
      </div>
      <SignBtn text="Sign In" disable={check} />
      <div className="flex justify-center gap-x-1">
        <Text text="Not a Member yet?" />
        <LinkSwitcher to="/auth" text="Sign Up" onClick={isVisable} />
      </div>
    </motion.form>
  );
};
