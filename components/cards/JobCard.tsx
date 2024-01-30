import Image from "next/image";

const JobCard = ({
  employerName,
  employerLogo,
  jobTitle,
  jobDescription,
  JobCity,
  jobState,
  jobCountry,
  jobLink,
  jobType,
  jobMinPay,
  jobMaxPay,
}: any) => {
  console.log(
    employerName,
    employerLogo,
    jobTitle,
    jobDescription,
    JobCity,
    jobState,
    jobCountry,
    jobLink,
    jobType,
    jobMinPay,
    jobMaxPay
  );
  return (
    <div className="light-border mb-9 mt-11 flex flex-col gap-9 border-b pb-9">
      <div className="background-light900_dark200 light-border shadow-light100_darknone flex flex-col items-start gap-6 rounded-lg border p-6 sm:flex-row sm:p-8">
        <Image alt="employer-logo" src={employerLogo} width={64} height={64} />
        <div className="w-full">
          <div className="flex-between">
            <div className="base-semibold text-dark200_light900">
              {jobTitle}
            </div>
            <div className="hidden sm:flex">
              <div className="background-light800_dark400 flex items-center justify-end gap-2 rounded-2xl px-3 py-1.5">
                FLAG
                <p className="body-medium text-dark400_light700">LOCATION</p>
              </div>
            </div>
          </div>

          <p className="body-regular text-dark500_light700  mt-2 line-clamp-2">
            {jobDescription}
          </p>

          <div className="flex-between mt-8 flex-wrap gap-6">
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-2">
                <Image
                  alt="clock icon"
                  src={"/assets/icons/clock-2.svg"}
                  width={20}
                  height={20}
                />
                <p className="body-medium text-light-500">
                  {jobType ? `${jobType}` : "Not disclosed"}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Image
                  alt="clock icon"
                  src={"/assets/icons/currency-dollar-circle.svg"}
                  width={20}
                  height={20}
                />
                <p className="body-medium text-light-500">
                  {jobMaxPay ? `${jobMaxPay}` : "Not disclosed"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
