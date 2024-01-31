"use server";

export async function getJobs(params: any) {
  try {
    const { page = 1, country, filter } = params;

    const baseUrl = process.env.JOB_SEARCH_BASE_URL;

    if (!baseUrl) {
      throw new Error("Missing JOB_SEARCH_BASE_URL env variable");
    }

    const url = new URL(baseUrl);
    url.searchParams.append("query", "javascript");
    url.searchParams.append("page", page);
    if (country) url.searchParams.append("country", country);

    if (!process.env.JOB_SEARCH_RAPID_API_KEY)
      throw new Error("Missing JOB_SEARCH_RAPID_API_KEY env variable");
    if (!process.env.JOB_SEARCH_RAPID_API_HOST)
      throw new Error("Missing JOB_SEARCH_RAPID_API_HOST env variable");

    switch (filter) {
      case "remote_only":
        url.searchParams.append("remote_jobs_only", "true");
        break;
      case "fulltime":
        url.searchParams.append("employment_types", "FULLTIME");
        break;
      case "intern":
        url.searchParams.append("employment_types", "INTERN");
        break;
      case "no_degree_required":
        url.searchParams.append("job_requirements", "no_degree");
        break;
      case "no_experience_required":
        url.searchParams.append("job_requirements", "no_experience");
        break;
      default:
        break;
    }
    
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": process.env.JOB_SEARCH_RAPID_API_KEY,
        "x-rapidapi-host": process.env.JOB_SEARCH_RAPID_API_HOST,
      },
    };

    const response = await fetch(url, options);
    const result = await response.text();
    const parsedResult = JSON.parse(result);

    return {
      jobs: parsedResult.data,
<<<<<<< HEAD
      hasNext: parsedResult?.data?.length === 10,
=======
      hasNext: parsedResult.data.length === 10,
>>>>>>> 949d7d96d9eea53acb9b425f5399632bdac9e75b
    };
  } catch (error) {
    console.error(error);
  }
}
