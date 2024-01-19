import { formatNumber } from "@/lib/utils";
import Image from "next/image";
import React from "react";

interface StatsCardProps {
  imgUrl: string;
  imgAlt: string;
  value: number;
  title: string;
}

const StatsCard = ({ imgUrl, imgAlt, value, title }: StatsCardProps) => {
  return (
    <div className="light-border background-light900_dark300 flex flex-wrap items-center justify-start gap-4 rounded-md border p-6 shadow-light-300 dark:shadow-dark-200">
      <Image src={imgUrl} alt={imgAlt} width={40} height={50} />
      <div>
        <p className="paragraph-semibold text-dark200_light900">{value}</p>

        <p className="body-medium text-dark400_light700">{title}</p>
      </div>
    </div>
  );
};

interface ProfileStatsProps {
  totalQuestions: number;
  totalAnswers: number;
  goldBadges: number;
  silverBadges: number;
  bronzeBadges: number;
}

const ProfileStats = ({ totalQuestions, totalAnswers, goldBadges, silverBadges, bronzeBadges }: ProfileStatsProps) => {
  return (
    <div className="mt-10">
      <h4 className="h3-semibold text-dark200_light900">Stats</h4>

      <div className="mt-5 grid grid-cols-1 gap-5 xs:grid-cols-2 md:grid-cols-4">
        <div className="light-border background-light900_dark300 flex flex-wrap items-center justify-evenly gap-4 rounded-md border p-6 shadow-light-300 dark:shadow-dark-200">
          <div>
            <p className="paragraph-semibold text-dark200_light900">
              {formatNumber(totalQuestions)}
            </p>

            <p className="body-medium text-dark400_light700">Questions</p>
          </div>

          <div>
            <p className="paragraph-semibold text-dark200_light900">
              {formatNumber(totalAnswers)}
            </p>

            <p className="body-medium text-dark400_light700">Answers</p>
          </div>
        </div>

        <StatsCard
          imgUrl="/assets/icons/gold-medal.svg"
          imgAlt="Gold Badge"
          value={goldBadges}
          title="Gold Badges"
        />

        <StatsCard
          imgUrl="/assets/icons/silver-medal.svg"
          imgAlt="Silver Badge"
          value={silverBadges}
          title="Silver Badges"
        />

        <StatsCard
          imgUrl="/assets/icons/bronze-medal.svg"
          imgAlt="Bronze Badge"
          value={bronzeBadges}
          title="Bronze Badges"
        />
      </div>
    </div>
  );
};

export default ProfileStats;
