import TagCard from "@/components/cards/TagCard";
import Filter from "@/components/shared/Filter";
import NoResult from "@/components/shared/NoResult";
import Pagination from "@/components/shared/Pagination";
import LocalSearch from "@/components/shared/search/LocalSearch";
import { TagFilters } from "@/constants/filters";
import { getAllTags } from "@/lib/actions/tag.actions";

const Tags = async ({
  searchParams,
}: {
  searchParams: { q: string; f: string; p: string };
}) => {
  const result = await getAllTags({
    searchQuery: searchParams.q,
    filter: searchParams.f,
    page: searchParams.p ? +searchParams.p : 1,
    pageSize: 10,
  });

  return (
    <>
      <div>
        <h1 className="h1-bold text-dark100_light900">Tags</h1>
      </div>

      <div className="mt-11 flex w-full flex-col justify-between gap-5 sm:flex-row sm:items-center">
        <LocalSearch
          route="/tags"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for tags"
          otherClasses="flex-1"
        />

        <Filter
          filters={TagFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
        />
      </div>

      <section className="mt-12 flex flex-wrap gap-4">
        {result.tags.length > 0 ? (
          result.tags.map((tag) => <TagCard key={tag._id} tag={tag} />)
        ) : (
          <NoResult
            title="No Tags Found"
            description="It looks like there are no tags created."
            link="/ask-question"
            linkTitle="Ask a Question"
          />
        )}
      </section>

      <div className="mt-10">
        <Pagination
          pageNumber={searchParams.p ? +searchParams.p : 1}
          hasNext={result.hasNext}
        />
      </div>
    </>
  );
};

export default Tags;
