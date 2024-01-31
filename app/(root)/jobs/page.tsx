import LocalSearch from "@/components/shared/search/LocalSearch";
import { auth } from "@clerk/nextjs";
import React from "react";
import type { Metadata } from "next";
import LocationFilter from "@/components/LocationFilter";
import { getJobs } from "@/lib/actions/jobs.action";
import NoResult from "@/components/shared/NoResult";
import JobCard from "@/components/cards/JobCard";

export const metadata: Metadata = {
  title: "Collections",
};

const Home = async ({
  searchParams,
}: {
  searchParams: { location: string; p: string };
}) => {
  const { userId: clerkId } = auth();

  if (!clerkId) return null;

  const result = await getJobs({
    page: searchParams.p ? +searchParams.p : 1,
    country: searchParams.location,
  });

  if (!result) return null;

  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">Jobs</h1>
      </div>

      <div className="mt-11 flex w-full justify-between gap-5 max-sm:flex-col sm:items-center ">
        <LocalSearch
          route="/"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Job Title, Company, or Keywords"
          otherClasses="flex-1"
        />

        <LocationFilter otherClasses="min-h-[56px] sm:min-w-[170px]" />
      </div>

      <div className="light-border mb-9 mt-11 flex flex-col gap-9 border-b pb-9">
        {result.jobs.length > 0 ? (
          result.jobs.map((job: any) => (
            <React.Fragment key={job._id}>
              <JobCard
                employerName={job.employer_name}
                employerLogo={job.employer_logo}
                jobTitle={job.job_title}
                jobDescription={job.job_description}
                jobCity={job.job_city}
                jobState={job.job_state}
                jobCountry={job.job_country}
                jobLink={job.job_apply_link}
                jobType={job.job_employment_type}
                jobMinPay={job.job_min_salary}
                jobMaxPay={job.job_max_salary}
                jobSalaryCurrency={job.job_salary_currency}
                jobSalaryPeriod={job.job_salary_period}
              />
            </React.Fragment>
          ))
        ) : (
          <div>
            <NoResult
              title="No Jobs Found"
              description="It appears that there are no jobs that match your criteria at this time."
              link="/"
              linkTitle="Go to Home"
            />
          </div>
        )}
      </div>
      {/* 
      <div className="mt-10">
        <Pagination
          pageNumber={searchParams?.p ? +searchParams.p : 1}
          hasNext={result.hasNext}
        />
      </div> */}
    </>
  );
};

export default Home;
