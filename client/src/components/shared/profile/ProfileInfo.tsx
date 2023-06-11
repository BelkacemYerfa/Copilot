import { useAuthUser } from "../../../hooks/useAuthUser";
import Input from "../Input/Input";
import SignBtn from "../btns/SignBtn";

export const ProfileInfo = () => {
  const register = () => {};
  const { user } = useAuthUser();
  return (
    <div className="flex flex-col gap-y-2 w-1/2 p-3">
      <h1 className="text-2xl font-semibold">Profile Info</h1>
      <form action="" className="w-full flex flex-col gap-y-2">
        <div className="flex flex-col gap-y-1">
          <label htmlFor="" className="text-sm font-medium">
            Username
          </label>
          <Input placeholderType={user.name} RegisterInput={register} />
        </div>
        <div className="flex flex-col gap-y-1">
          <label htmlFor="" className="text-sm font-medium">
            Email
          </label>
          <Input placeholderType={user.email} RegisterInput={register} />
        </div>
        <div className="flex flex-col gap-y-1">
          <label htmlFor="" className="text-sm font-medium">
            Old Password
          </label>
          <Input placeholderType={"Old Password"} RegisterInput={register} />
        </div>
        <div className="flex flex-col gap-y-1">
          <label htmlFor="" className="text-sm font-medium">
            New Password
          </label>
          <Input placeholderType={"New Password"} RegisterInput={register} />
        </div>
        <SignBtn disable={false} isLoading={false} text="save" />
      </form>
    </div>
  );
};
