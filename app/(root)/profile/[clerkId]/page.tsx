import Link from "next/link";
import Image from "next/image";
import React from "react";
import { getUserInfo } from "@/lib/actions/user.action";
import { SignedIn, auth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatDate } from "@/lib/utils";

const Profile = async ({ params }: { params: { clerkId: string } }) => {
  const { userId: currentUserId } = auth();

  const { clerkId } = params;
  const userInfo = await getUserInfo({ clerkId });

  if (!userInfo) return null;

  return (
    <div className="mx-auto w-full max-w-5xl">
      <div className="flex flex-col-reverse items-start justify-between sm:flex-row">
        <div className="flex flex-col items-start gap-4 lg:flex-row">
          <Image
            className="rounded-full object-cover"
            src={userInfo?.user.picture}
            width={140}
            height={140}
            alt="profile-picture"
          />

          <div className="mt-3">
            <h2 className="h2-bold text-dark100_light900 ">
              {userInfo?.user.name}
            </h2>

            <p className="paragraph-regular text-dark200_light800">
              @{userInfo?.user.username}
            </p>

            <div className="mt-5 flex flex-wrap items-center justify-start gap-5">
              {userInfo?.user.location && <>Location</>}
              <div className="flex-center gap-1">
                <Image
                  src={"/assets/icons/calendar.svg"}
                  width={20}
                  height={20}
                  alt="calendar-icon"
                />
                <p className="paragraph-medium text-dark400_light700">
                  {formatDate(userInfo?.user.joinedAt)}
                </p>
              </div>
              {userInfo?.user.bio && <p>{userInfo.user.bio}</p>}
            </div>
          </div>
        </div>

        <div className="flex justify-end max-sm:mb-5 max-sm:w-full sm:mt-3">
          <SignedIn>
            {currentUserId === userInfo?.user.clerkId && (
              <Link href={"/profile/edit"}>
                <Button className="paragraph-medium btn-secondary text-dark300_light900 min-h-[46px] min-w-[175px] px-4 py-3">
                  Edit Profile
                </Button>
              </Link>
            )}
          </SignedIn>
        </div>
      </div>

      <div className="mt-10 flex gap-10">
        <Tabs defaultValue="top-posts" className="flex-1">
          <TabsList className="background-light800_dark400 min-h-[42px] p-1">
            <TabsTrigger value="top-posts" className="tab">
              Top posts
            </TabsTrigger>
            <TabsTrigger value="answers" className="tab">
              Answers
            </TabsTrigger>
          </TabsList>
          <TabsContent value="top-posts">POSTS</TabsContent>
          <TabsContent value="answers">ANSWERS</TabsContent>
        </Tabs>

        {/* <h4 className="h3-semibold text-dark200_light900">Stats</h4>
        <div className="mt-5 grid grid-cols-1 gap-5 xs:grid-cols-2 md:grid-cols-4">
          <div className="light-border background-light900_dark300 flex flex-wrap items-center justify-evenly gap-4 rounded-md border p-6 shadow-light-300 dark:shadow-dark-200">
            <div>
              <p className="paragraph-semibold text-dark200_light900">0</p>
              <p className="body-medium text-dark400_light700">Questions</p>
            </div>
            <div>
              <p className="paragraph-semibold text-dark200_light900">3</p>

              <p className="paragraph-medium text-dark400_light700">Answers</p>
            </div>
          </div>

          <div className="light-border background-light900_dark300 flex flex-wrap items-center justify-evenly gap-4 rounded-md border p-6 shadow-light-300 dark:shadow-dark-200">
            <Image
              src={"/assets/icons/gold-medal.svg"}
              width={40}
              height={50}
              alt="Gold Badge"
            />
            <div>
              <p className="paragraph-semibold text-dark200_light900">0</p>

              <p className="paragraph-medium text-dark400_light700">
                Gold Badges
              </p>
            </div>
          </div>

          <div className="light-border background-light900_dark300 flex flex-wrap items-center justify-evenly gap-4 rounded-md border p-6 shadow-light-300 dark:shadow-dark-200">
            <Image
              src={"/assets/icons/silver-medal.svg"}
              width={40}
              height={50}
              alt="Gold Badge"
            />
            <div>
              <p className="paragraph-semibold text-dark200_light900">0</p>

              <p className="paragraph-medium text-dark400_light700">
                Silver Badges
              </p>
            </div>
          </div>

          <div className="light-border background-light900_dark300 flex flex-wrap items-center justify-evenly gap-4 rounded-md border p-6 shadow-light-300 dark:shadow-dark-200">
            <Image
              src={"/assets/icons/bronze-medal.svg"}
              width={40}
              height={50}
              alt="Gold Badge"
            />
            <div>
              <p className="paragraph-semibold text-dark200_light900">0</p>

              <p className="paragraph-medium text-dark400_light700">
                Bronze Badges
              </p>
            </div>
          </div>
        </div> */}
      </div>
      <div className="mt-10 flex gap-10"></div>
    </div>
  );
};

export default Profile;
