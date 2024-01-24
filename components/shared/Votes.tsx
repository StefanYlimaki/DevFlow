"use client";

import { downvoteAnswer, upvoteAnswer } from "@/lib/actions/answer.action";
import { ViewQuestion } from "@/lib/actions/interaction.action";
import {
  upvoteQuestion,
  downvoteQuestion,
} from "@/lib/actions/question.action";
import { toggleSaveQuestion } from "@/lib/actions/user.action";
import { formatNumber } from "@/lib/utils";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "../ui/use-toast";

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
  const router = useRouter();

  useEffect(() => {
    if (type === "question")
      ViewQuestion({
        questionId: JSON.parse(itemId),
        userId: userId ? JSON.parse(userId) : null,
      });
  }, [itemId, userId, pathname, router, type]);

  const handleVote = async (action: string) => {
    if (!userId)
      return toast({
        title: "Please log in",
        description: "You need to be logged in to vote",
      });

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

          toast({
            title: !hasUpvoted
              ? "Question Upvoted Successfully"
              : "Upvote Removed",
            variant: !hasUpvoted ? "default" : "destructive",
          });
        } catch (error) {
          console.error(error);
          toast({
            title: "Something went wrong",
            description: "Please try again",
            variant: "destructive",
          });
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
          toast({
            title: !hasUpvoted
              ? "Answer Upvoted Successfully"
              : "Upvote Removed",
            variant: !hasUpvoted ? "default" : "destructive",
          });
        } catch (error) {
          console.error(error);
          toast({
            title: "Something went wrong",
            description: "Please try again",
            variant: "destructive",
          });
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
          toast({
            title: !hasDownvoted
              ? "Question Downvoted Successfully"
              : "Downvote Removed",
            variant: !hasDownvoted ? "default" : "destructive",
          });
        } catch (error) {
          console.error(error);
          toast({
            title: "Something went wrong",
            description: "Please try again",
            variant: "destructive",
          });
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
          toast({
            title: !hasDownvoted
              ? "Answer Downvoted Successfully"
              : "Downvote Removed",
            variant: !hasDownvoted ? "default" : "destructive",
          });
        } catch (error) {
          console.error(error);
          toast({
            title: "Something went wrong",
            description: "Please try again",
            variant: "destructive",
          });
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
      toast({
        title: !hasSaved
          ? "Question Saved Successfully"
          : "Question Removed from Saved Ones ",
        variant: !hasDownvoted ? "default" : "destructive",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Something went wrong",
        description: "Please try again",
        variant: "destructive",
      });
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

      {type === "question" && (
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
      )}
    </div>
  );
};

export default Votes;
