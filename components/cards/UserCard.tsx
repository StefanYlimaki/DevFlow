import React from "react";
import Image from "next/image";
import RenderTag from "../shared/RenderTag";
import Link from "next/link";
import { getTopInteractedTags } from "@/lib/actions/tag.actions";
import { Badge } from "../ui/badge";

interface Props {
  user: {
    _id: string;
    clerkId: string;
    picture: string;
    name: string;
    username: string;
  };
}

const UserCard = async ({ user }: Props) => {
  const interactedTags = await getTopInteractedTags({
    userId: user._id,
    limit: 3,
  });

  return (
    <div className="shadow-light100_darknone background-light900_dark200 light-border  rounded-2xl border p-8 max-xs:min-w-full xs:w-[260px]">
      <Link
        href={`/profile/${user.clerkId}`}
        className="flex w-full flex-col items-center justify-center"
      >
        <Image
          src={user.picture}
          alt="user profile photo"
          width={100}
          height={100}
          className="min-h-[100px] rounded-full object-cover"
        />

        <div className="mt-4 text-center">
          <h3 className="h3-bold text-dark200_light900 line-clamp-1">
            {user.name}
          </h3>
          <p className="body-regular text-dark500_light500 mt-2">
            @{user.username}
          </p>
        </div>
      </Link>
      <div className="mt-5">
        {interactedTags.length > 0 ? (
          <div className="flex items-center">
            {interactedTags.map((tag) => (
              <RenderTag
                key={tag._id}
                _id={tag._id}
                name={tag.name}
                className="p-1"
              />
            ))}
          </div>
        ) : (
          <Badge>No tags yet</Badge>
        )}
      </div>
    </div>
  );
};

export default UserCard;
