import { getTimeStamp, formatNumber } from "@/lib/utils";
import { Link } from "lucide-react";
import { title } from "process";
import EditRemoveButtons from "../shared/EditRemoveButtons";
import Metric from "../shared/Metric";
import RenderTag from "../shared/RenderTag";

const jobDetails = {
  employer_name: "Upwork",
  employer_logo: "https://image.status.io/z6aeO6kAGsAG.png",
  employer_website: null,
  employer_company_type: null,
  job_publisher: "Upwork",
  job_id: "ZtSmBnDzOd6vrQ-jAAAAAA==",
  job_employment_type: null,
  job_title: "Junior JavaScript Engineer",
  job_apply_link:
    "https://www.upwork.com/freelance-jobs/apply/Junior-JavaScript-Engineer_~01149a71f780b3d77f/",
  job_apply_is_direct: true,
  job_apply_quality_score: null,
  apply_options: [
    {
      publisher: "Upwork",
      apply_link:
        "https://www.upwork.com/freelance-jobs/apply/Junior-JavaScript-Engineer_~01149a71f780b3d77f/",
      is_direct: true,
    },
  ],
  job_description:
    "We are looking for a skilled Junior JavaScript Engineer to join our team for a project. You will be responsible for developing and maintaining web applications, as well as collaborating with the team to design and implement new features. The ideal candidate should have a strong understanding of JavaScript and experience working with HTML and CSS. Good problem-solving skills and attention to detail are also essential.\n\nResponsibilities:\n\n- Develop and maintain web applications\n\n- Collaborate with the team to design and implement new features\n\n- Troubleshoot and debug code\n\n- Optimize application performance\n\nSkills:\n\n- Strong understanding of JavaScript\n\n- Experience with HTML and CSS\n\n- Familiarity with front-end frameworks (e.g. React, Angular)\n\n- Knowledge of version control systems (e.g. Git)\n\n- Problem-solving skills\n\n- Attention to detail\n\nThis is a small-sized project expected to be completed within 1 to 3 months. We are looking for an entry-level JavaScript engineer with a solid foundation in web development.",
  job_is_remote: null,
  job_posted_at_timestamp: 1706399028,
  job_posted_at_datetime_utc: "2024-01-27T23:43:48.000Z",
  job_city: null,
  job_state: null,
  job_country: null,
  job_latitude: null,
  job_longitude: null,
  job_benefits: null,
  job_google_link:
    "https://www.google.com/search?gl=fi&hl=en&rciv=jb&q=javascript&start=0&ibp=htl;jobs#fpstate=tldetail&htivrt=jobs&htiq=javascript&htidocid=ZtSmBnDzOd6vrQ-jAAAAAA%3D%3D",
  job_offer_expiration_datetime_utc: null,
  job_offer_expiration_timestamp: null,
  job_required_experience: {
    no_experience_required: false,
    required_experience_in_months: null,
    experience_mentioned: false,
    experience_preferred: false,
  },
  job_required_skills: null,
  job_required_education: {
    postgraduate_degree: false,
    professional_certification: false,
    high_school: false,
    associates_degree: false,
    bachelors_degree: false,
    degree_mentioned: false,
    degree_preferred: false,
    professional_certification_mentioned: false,
  },
  job_experience_in_place_of_education: false,
  job_min_salary: null,
  job_max_salary: null,
  job_salary_currency: null,
  job_salary_period: null,
  job_highlights: {
    Qualifications: [
      "The ideal candidate should have a strong understanding of JavaScript and experience working with HTML and CSS",
      "Good problem-solving skills and attention to detail are also essential",
      "Familiarity with front-end frameworks (e.g. React, Angular)",
      "Knowledge of version control systems (e.g. Git)",
      "This is a small-sized project expected to be completed within 1 to 3 months",
      "We are looking for an entry-level JavaScript engineer with a solid foundation in web development",
    ],
    Responsibilities: [
      "You will be responsible for developing and maintaining web applications, as well as collaborating with the team to design and implement new features",
      "Troubleshoot and debug code",
      "Optimize application performance",
    ],
  },
  job_job_title: null,
  job_posting_language: null,
  job_onet_soc: null,
  job_onet_job_zone: null,
};

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
  return (
    <div className="card-wrapper rounded-[10px] p-9 sm:px-11">
      <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
        <div>
          <span className="subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden">
            {getTimeStamp(createdAt)}
          </span>
          <Link href={`/question/${_id}`}>
            <h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1">
              {title}
            </h3>
          </Link>
        </div>

        <EditRemoveButtons
          contentType="question"
          contentId={JSON.stringify(_id)}
          contentOwnerClerkId={author.clerkId}
        />
      </div>

      <div className="mt-3.5 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <RenderTag key={tag._id} _id={tag._id} name={tag.name} />
        ))}
      </div>

      <div className="flex-between mt-6 w-full flex-wrap gap-3">
        <Metric
          imgUrl={author.picture}
          alt="user"
          value={author.name}
          title={` - asked ${getTimeStamp(createdAt)}`}
          href={`/profile/${author.clerkId}`}
          isAuthor
          textStyles="body-medium text-dark400_light700"
        />

        <div className="flex items-center gap-3 max-sm:justify-start">
          <Metric
            imgUrl="/assets/icons/like.svg"
            alt="Upvotes"
            value={formatNumber(upvotes.length)}
            title=" Votes"
            textStyles="small-medium text-dark400_light800"
          />

          <Metric
            imgUrl="/assets/icons/message.svg"
            alt="message"
            value={formatNumber(answers.length)}
            title=" Answers"
            textStyles="small-medium text-dark400_light800"
          />

          <Metric
            imgUrl="/assets/icons/eye.svg"
            alt="eye"
            value={formatNumber(views)}
            title=" Views"
            textStyles="small-medium text-dark400_light800"
          />
        </div>
      </div>
    </div>
  );
};

export default JobCard;
