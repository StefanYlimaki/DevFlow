"use server";

export async function getJobs(params: any) {
  try {
    const { page = 1, country } = params;

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

    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": process.env.JOB_SEARCH_RAPID_API_KEY,
        "x-rapidapi-host": process.env.JOB_SEARCH_RAPID_API_HOST,
      },
    };

    const response = await fetch(url, options);
    const result = await response.text();

    return { jobs: JSON.parse(result).data, hasNext: false };
  } catch (error) {
    console.error(error);
  }
}
