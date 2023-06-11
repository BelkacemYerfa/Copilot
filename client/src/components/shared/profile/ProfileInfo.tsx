import { useAuthUser, useUpdateUser } from "../../../hooks/useAuthUser";
import { UserProfile } from "../../../validation/auth";
import Input from "../Input/Input";
import SignBtn from "../btns/SignBtn";
import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

type UserProfileFormSchema = z.infer<typeof UserProfile>;

interface ProfileInfoProps {
  setOpen: () => void;
}

export const ProfileInfo = ({ setOpen }: ProfileInfoProps) => {
  const { user, set } = useAuthUser();
  const { register, handleSubmit } = useForm<UserProfileFormSchema>({
    resolver: zodResolver(UserProfile),
  });
  const { mutate: updateUserInfoAccount, isLoading } = useUpdateUser();
  const submiter: SubmitHandler<UserProfileFormSchema> = async (
    userInfo: UserProfileFormSchema
  ) => {
    console.log(userInfo);
    const { name, email, newPassword } = userInfo;
    const user = {
      name,
      email,
      password: newPassword,
    };
    updateUserInfoAccount(user, {
      onSuccess: (data) => {
        console.log(data.data);
        set(data.data.user);
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };
  return (
    <div className="flex flex-col gap-y-2 w-full sm:w-1/2 p-3">
      <h1 className="text-2xl font-semibold">Profile Info</h1>
      <form
        action=""
        onSubmit={handleSubmit(submiter, (err) => console.log(err))}
        className="w-full flex flex-col gap-y-2"
      >
        <div className="flex flex-col gap-y-1">
          <label htmlFor="" className="text-sm font-medium">
            Username
          </label>
          <Input
            placeholderType={user.name}
            placeholderCase="name"
            RegisterInput={register}
          />
        </div>
        <div className="flex flex-col gap-y-1">
          <label htmlFor="" className="text-sm font-medium">
            Email
          </label>
          <Input
            placeholderType={user.email}
            placeholderCase="email"
            RegisterInput={register}
          />
        </div>
        <div className="flex flex-col gap-y-1">
          <label htmlFor="" className="text-sm font-medium">
            Old Password
          </label>
          <Input
            placeholderType={"Old Password"}
            placeholderCase="oldPassword"
            RegisterInput={register}
          />
        </div>
        <div className="flex flex-col gap-y-1">
          <label htmlFor="" className="text-sm font-medium">
            New Password
          </label>
          <Input
            placeholderType={"New Password"}
            placeholderCase="newPassword"
            RegisterInput={register}
          />
        </div>
        <div className="flex flex-row-reverse items-center gap-x-2">
          <SignBtn disable={isLoading} isLoading={isLoading} text="save" />
          <button
            onClick={setOpen}
            className="text-[18px]/7 text-white font-semibold rounded-lg w-full bg-red-600 h-11"
          >
            Close
          </button>
        </div>
      </form>
    </div>
  );
};
