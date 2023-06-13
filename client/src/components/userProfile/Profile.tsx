import { ProfileImage } from "../shared/profile/ProfileImage";
import { ProfileInfo } from "../shared/profile/ProfileInfo";

interface ProfileProps {
  setOpen: () => void;
}

const Profile = ({ setOpen }: ProfileProps) => {
  return (
    <section className="absolute left-0 top-0 h-full w-screen flex items-center justify-center bg-gray-700/80">
      <div className="w-[90%]  md:w-[60%] 2xl:w-1/2 h-fit sm:h-[65%] 2xl:min-h-1/3 2xl:max-h-[45%] bg-white rounded-xl p-3 flex flex-col sm:flex-row gap-x-2">
        <ProfileImage />
        <ProfileInfo setOpen={setOpen} />
      </div>
    </section>
  );
};

export default Profile;
