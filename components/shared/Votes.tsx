"use client";

import { downvoteAnswer, upvoteAnswer } from "@/lib/actions/answer.action";
import {
  upvoteQuestion,
  downvoteQuestion,
} from "@/lib/actions/question.action";
import { toggleSaveQuestion } from "@/lib/actions/user.action";
import { formatNumber } from "@/lib/utils";
import Image from "next/image";
import { usePathname } from "next/navigation";

interface Props {
  type: string;
  itemId: string;
  userId: string;
  upvotes: number;
  downvotes: number;
  hasUpvoted: boolean;
  hasDownvoted: boolean;
  hasSaved?: boolean;
}

const Votes = ({
  type,
  itemId,
  userId,
  upvotes,
  downvotes,
  hasUpvoted,
  hasDownvoted,
  hasSaved,
}: Props) => {
  const pathname = usePathname();

  const handleVote = async (action: string) => {
    // Handling all upvotes
    if (action === "upvote") {
      if (type === "question") {
        try {
          await upvoteQuestion({
            questionId: itemId,
            userId,
            hasUpvoted,
            hasDownvoted,
            path: pathname,
          });
        } catch (error) {
          console.error(error);
        }
      }

      if (type === "answer") {
        try {
          await upvoteAnswer({
            answerId: itemId,
            userId,
            hasUpvoted,
            hasDownvoted,
            path: pathname,
          });
        } catch (error) {
          console.error(error);
        }
      }
    }

    // Handling all downvotes
    if (action === "downvote") {
      if (type === "question") {
        try {
          await downvoteQuestion({
            questionId: itemId,
            userId,
            hasUpvoted,
            hasDownvoted,
            path: pathname,
          });
        } catch (error) {
          console.error(error);
        }
      }

      if (type === "answer") {
        try {
          await downvoteAnswer({
            answerId: itemId,
            userId,
            hasUpvoted,
            hasDownvoted,
            path: pathname,
          });
        } catch (error) {
          console.error(error);
        }
      }
    }
  };

  const handleSave = async () => {
    try {
      await toggleSaveQuestion({
        questionId: itemId,
        userId,
        path: pathname,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex gap-5">
      <div className="flex-center gap-2.5">
        <div className="flex-center gap-1.5">
          <Image
            src={
              hasUpvoted
                ? "/assets/icons/upvoted.svg"
                : "/assets/icons/upvote.svg"
            }
            width={18}
            height={18}
            alt="upvote"
            className="cursor-pointer"
            onClick={() => handleVote("upvote")}
          />

          <div className="flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1">
            <p className="subtle-medium text-dark400_light900">
              {formatNumber(upvotes)}
            </p>
          </div>
        </div>

        <div className="flex-center gap-1.5">
          <Image
            src={
              hasDownvoted
                ? "/assets/icons/downvoted.svg"
                : "/assets/icons/downvote.svg"
            }
            width={18}
            height={18}
            alt="downvote"
            className="cursor-pointer"
            onClick={() => handleVote("downvote")}
          />

          <div className="flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1">
            <p className="subtle-medium text-dark400_light900">
              {formatNumber(downvotes)}
            </p>
          </div>
        </div>
      </div>

      <Image
        src={
          hasSaved
            ? "/assets/icons/star-filled.svg"
            : "/assets/icons/star-red.svg"
        }
        width={18}
        height={18}
        alt="star"
        className="cursor-pointer"
        onClick={handleSave}
      />
    </div>
  );
};

export default Votes;
