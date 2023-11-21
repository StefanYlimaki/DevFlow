import Link from "next/link";
import Metric from "../shared/Metric";
import { formatNumber, getTimeStamp } from "@/lib/utils";

interface AnswerCardProps {
  _id: number;
  author: { _id: number; name: string; picture: string; clerkId: string };
  upvotes: number;
  createdAt: Date;
  clerkId?: string;
  question: { _id: number; title: string };
}

const AnswerCard = ({
  clerkId,
  _id,
  question,
  author,
  upvotes,
  createdAt,
}: AnswerCardProps) => {
  return (
    <div className="card-wrapper rounded-[10px] px-11 py-9">
      <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
        <Link href={`/question/${question._id}/#${_id}}`}>
          <span className="subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden">
            {getTimeStamp(createdAt)}
          </span>
          <h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1">
            {question.title}
          </h3>
        </Link>
      </div>

      <div className="flex-between mt-6 w-full flex-wrap gap-3">
        <Metric
          imgUrl={author?.picture}
          alt="user avatar"
          value={author?.name}
          title={`• asked ${getTimeStamp(createdAt)} `}
          href={`/profile/${author?.clerkId}`}
          textStyles="body-medium text-dark400_light700"
        />

        <div className="flex-center gap-3">
          <Metric
            imgUrl="/assets/icons/like.svg"
            alt="like icon"
            value={formatNumber(upvotes)}
            title=" Votes"
            textStyles="small-medium text-dark400_light800"
          />
        </div>
      </div>
    </div>
  );
};

export default AnswerCard;
