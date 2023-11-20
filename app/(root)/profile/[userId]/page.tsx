import { getUserByUserId } from "@/lib/actions/user.action";
import Link from "next/link";
import Image from "next/image";
import React from "react";

const Profile = async ({ params }: { params: { userId: string } }) => {
  const { userId } = params;

  const user = await getUserByUserId({ userId });

  return (
    <div className="mx-auto w-full max-w-5xl">
      <div className="flex flex-col-reverse items-start justify-between sm:flex-row">
        <div className="flex flex-col items-start gap-4 lg:flex-row">
          <Image
            className="rounded-full object-cover"
            src={user.picture}
            width={140}
            height={140}
            alt="profile-picture"
          />
          <div className="mt-3">
            <h2 className="h2-bold text-dark100_light900">{user.name}</h2>
            <p className="paragraph-regular text-dark200_light800">
              @{user.username}
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-start gap-5">
              <div className="flex-center gap-1">
                <Image
                  src={"/assets/icons/calendar.svg"}
                  width={20}
                  height={20}
                  alt="calendar-icon"
                />
                <p className="paragraph-medium text-dark400_light700">
                  Joined {user.createdAt}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end max-sm:mb-5 max-sm:w-full sm:mt-3">
          <Link href={"/profile/edit"}>Edit profile</Link>
        </div>
      </div>
      <div className="mt-10"></div>
      <div className="mt-10 flex gap-10"></div>
    </div>
  );
};

export default Profile;
