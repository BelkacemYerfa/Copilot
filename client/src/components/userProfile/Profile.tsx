import { ProfileImage } from "../shared/profile/ProfileImage";
import { ProfileInfo } from "../shared/profile/ProfileInfo";

const Profile = () => {
  return (
    <section className="absolute left-0 top-0 h-full w-screen flex items-center justify-center bg-gray-700/80">
      <div className="w-[60%] h-[65%] bg-white rounded-xl p-3 flex  gap-x-2">
        <ProfileImage />
        <ProfileInfo />
      </div>
    </section>
  );
};

export default Profile;
