import { SubmitHandler, useForm } from "react-hook-form";
import { Distination } from "../../interfaces&types&static/Distination";
import AcceptTerms from "../shared/Input/AcceptTerms";
import Input from "../shared/Input/Input";
import LinkSwitcher from "../shared/Link/LinkSwitcher";
import Text from "../shared/Text/Text";
import SignBtn from "../shared/btns/SignBtn";
import { motion } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import { PasswordVerification } from "../../validation/reponseCode";
import { z } from "zod";
import TextError from "../shared/Text/TextError";
import { useEffect, useState } from "react";
import { useAuthUser } from "../../hooks/useAuthUser";
import { useNewPass } from "../../hooks/useCreaptedPass";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type PasswordConfirmation = z.infer<typeof PasswordVerification>;

interface NewPasswordProps {
  setCount: () => void;
  setNewCount: () => void;
}

const dist: Distination = {
  text: "Terms & Conditions",
  to: "/auth",
};

const NewPassword = ({ setCount, setNewCount }: NewPasswordProps) => {
  const [isSame, setIsSame] = useState<boolean>(false);

  const { user } = useAuthUser();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<PasswordConfirmation>({
    resolver: zodResolver(PasswordVerification),
  });
  const { mutate: newPass, isLoading: newPassLoading } = useNewPass();
  const submiter: SubmitHandler<PasswordConfirmation> = (
    data: PasswordConfirmation
  ) => {
    console.log(data);
    const userInfo = { password: data.password, email: user?.email };
    newPass(userInfo, {
      onSuccess: (data) => {
        toast.success(data.data?.msg, {
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
      onError: (err) => {
        console.log(err);
      },
    });
  };
  useEffect(() => {
    const subscribe = watch((value) => {
      setIsSame(value.password === value.RepeatPassword);
    });
    return () => {
      subscribe.unsubscribe();
    };
  });
  return (
    <>
      <motion.div
        initial={{ x: "60%" }}
        animate={{ x: 0 }}
        exit={{ x: "-60%" }}
        className="text-center space-y-7 w-full md:w-fit"
      >
        <div>
          <h2 className="text-2xl/9 text-main_color font-semibold">
            Setup New Password
          </h2>
          <div className="flex items-center justify-center gap-x-1">
            <Text text="Have you already reset the Password?" />
            <LinkSwitcher to="/auth" text="Sign in" onClick={setNewCount} />
          </div>
        </div>
        <form
          onSubmit={handleSubmit(submiter, (err) => console.log(err))}
          className="space-y-4"
        >
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
          <div className="flex justify-start w-full">
            <AcceptTerms text="I Accept the " dist={dist} />
          </div>
          <SignBtn text="Submit" isLoading={newPassLoading} disable={!isSame} />
        </form>
      </motion.div>
      <ToastContainer position="top-right" />
    </>
  );
};

export default NewPassword;
