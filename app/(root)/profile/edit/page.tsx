import Profile from "@/components/forms/Profile";
import { getUserByClerkId } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";
import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Profile",
};

const EditProfile = async () => {
  const { userId: clerkId } = auth();

  const user = await getUserByClerkId({ clerkId });

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Edit Profile</h1>

      <Profile user={JSON.stringify(user)} />
    </>
  );
};

export default EditProfile;
