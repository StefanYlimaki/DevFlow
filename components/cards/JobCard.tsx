import Image from "next/image";
import Link from "next/link";
import JobDescription from "../JobDescription";

const JobCard = ({
  employerName,
  employerLogo,
  jobTitle,
  jobDescription,
  jobCity,
  jobState,
  jobCountry,
  jobLink,
  jobType,
  jobMinPay,
  jobMaxPay,
  jobSalaryCurrency,
  jobSalaryPeriod,
}: any) => {
  let salaryFieldValue = "";
  if (jobMinPay && jobMaxPay) {
    if (jobMinPay === jobMaxPay) {
      salaryFieldValue = `${jobMinPay} ${jobSalaryCurrency} / ${jobSalaryPeriod}`;
    } else {
      salaryFieldValue = `${jobMinPay} - ${jobMaxPay} ${jobSalaryCurrency} / ${jobSalaryPeriod}`;
    }
  } else if (jobMinPay) {
    salaryFieldValue = `${jobMinPay} ${jobSalaryCurrency} / ${jobSalaryPeriod}`;
  } else if (jobMaxPay) {
    salaryFieldValue = `${jobMaxPay} ${jobSalaryCurrency} / ${jobSalaryPeriod}`;
  } else {
    salaryFieldValue = "Not disclosed";
  }

  return (
    <div className="background-light900_dark200 light-border shadow-light100_darknone flex flex-col items-start gap-6 rounded-lg border p-6 sm:flex-row sm:p-8">
      <Image
        alt="employer-logo"
        src={employerLogo || "/assets/images/logo.png"}
        width={64}
        height={64}
      />

      <div className="w-full">
        <div className="md:flex-between flex-col justify-start md:flex-row">
          <div className="base-semibold text-dark200_light900 max-w-[75%]">
            {jobTitle && jobTitle}
          </div>
          <div className="flex max-md:pb-4 max-md:pt-2">
            <div className="background-light800_dark400 flex items-center justify-end gap-2 rounded-2xl px-3 py-1.5">
              {jobCountry && (
                <Image
                  alt={`${jobCountry} flag`}
                  src={`https://flagsapi.com/${jobCountry}/flat/64.png`}
                  width={20}
                  height={20}
                />
              )}
              <p className="body-medium text-dark400_light700">
                {jobCountry
                  ? jobState
                    ? jobCity
                      ? `${jobCity}, ${jobState}, ${jobCountry}`
                      : `${jobState}, ${jobCountry}`
                    : `${jobCountry}`
                  : "Not disclosed"}
              </p>
            </div>
          </div>
        </div>

        <JobDescription jobDescription={jobDescription && jobDescription} />

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

              <p className="body-medium text-light-500">{salaryFieldValue}</p>
            </div>
          </div>

          {jobLink && (
            <Link href={jobLink} target="_blank" className="flex">
              <p className="body-semibold primary-text-gradient">Apply</p>
              <Image
                alt="arrow up right"
                src={"/assets/icons/arrow-up-right.svg"}
                height={20}
                width={20}
              />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobCard;
