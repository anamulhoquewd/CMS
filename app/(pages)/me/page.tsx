import { UserProfile } from "../../../components/me/profile-page";

function Me() {
  return (
    <div className="">
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold">Stay in Control of Your Profile</h1>
        <p className="text-gray-500 text-sm mb-8">
          Manage your Personal information.
        </p>
        <UserProfile />
      </div>
    </div>
  );
}

export default Me;
