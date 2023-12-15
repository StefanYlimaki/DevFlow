import Profile from "@/components/forms/Profile";
import { getUserByClerkId } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";
import React from "react";

const EditProfile = async () => {
  const { userId } = auth();

  const user = await getUserByClerkId({ userId });

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Edit Profile</h1>

      <Profile user={JSON.stringify(user)} />
    </>
  );
};

export default EditProfile;
