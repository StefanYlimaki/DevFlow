"use server";

export async function getJobs(params: any) {
  try {
    const { page = 1, country } = params;

    const baseUrl = "https://jsearch.p.rapidapi.com/search";

    const url = new URL(baseUrl);
    url.searchParams.append("query", "javascript");
    url.searchParams.append("page", page);
    if (country) url.searchParams.append("country", country);

    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "0ff7c6ceb0msh2ff4dfc4cfad886p1c4e41jsn6603f66f93a4",
        "x-rapidapi-host": "jsearch.p.rapidapi.com",
      },
    };

    const response = await fetch(url, options);
    const result = await response.text();
    console.log(JSON.parse(result));

    return { jobs: JSON.parse(result).data, hasNext: false};
  } catch (error) {
    console.error(error);
  }
}
