import Link from "next/link";
import Image from "next/image";
import React from "react";
import { getUserInfo } from "@/lib/actions/user.action";
import { SignedIn, auth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatDate } from "@/lib/utils";
import ProfileLink from "@/components/profile/ProfileLink";
import ProfileStats from "@/components/profile/ProfileStats";
import AnswersTab from "@/components/profile/AnswersTab";
import QuestionsTab from "@/components/profile/QuestionsTab";

const Profile = async ({
  params,
  searchParams,
}: {
  params: { clerkId: string };
  searchParams: any;
}) => {
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
              {userInfo?.user.portfolioWebsite && (
                <ProfileLink
                  imgUrl="/assets/icons/link.svg"
                  imgAlt="link-icon"
                  href={userInfo.user.portfolioWebsite}
                  title="Portfolio"
                />
              )}

              {userInfo?.user.location && (
                <ProfileLink
                  imgUrl="/assets/icons/location.svg"
                  imgAlt="location-icon"
                  title={userInfo.user.location}
                />
              )}

              <ProfileLink
                imgUrl="/assets/icons/calendar.svg"
                imgAlt="calendar-icon"
                title={`Joined ${formatDate(userInfo?.user.joinedAt)}`}
              />

              {userInfo?.user.bio && (
                <p className="paragraph-regular text-dark400_light800 mt-8">
                  {userInfo.user.bio}
                </p>
              )}
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

      <ProfileStats
        totalQuestions={userInfo.totalQuestions}
        totalAnswers={userInfo.totalAnswers}
      />

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
          <TabsContent value="top-posts">
            <QuestionsTab
              searchParams={searchParams}
              userId={JSON.stringify(userInfo.user._id)}
              clerkId={clerkId}
            />
          </TabsContent>
          <TabsContent value="answers" className="flex w-full flex-col gap-6">
            <AnswersTab
              searchParams={searchParams}
              userId={JSON.stringify(userInfo.user._id)}
              clerkId={clerkId}
            />
          </TabsContent>
        </Tabs>
      </div>
      <div className="mt-10 flex gap-10"></div>
    </div>
  );
};

export default Profile;
