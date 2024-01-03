import UserCard from "@/components/cards/UserCard";
import Filter from "@/components/shared/Filter";
import Pagination from "@/components/shared/Pagination";
import LocalSearch from "@/components/shared/search/LocalSearch";
import { UserFilters } from "@/constants/filters";
import { getAllUsers } from "@/lib/actions/user.action";
import Link from "next/link";

const Community = async ({
  searchParams,
}: {
  searchParams: { q: string; f: string; p: string };
}) => {
  const result = await getAllUsers({
    searchQuery: searchParams.q,
    filter: searchParams.f,
    page: searchParams.p ? +searchParams.p : 1,
    pageSize: 10,
  });

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">All Users</h1>

      <div className="mt-11 flex w-full flex-col justify-between gap-5 sm:flex-row sm:items-center">
        <LocalSearch
          route="/community"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for users"
          otherClasses="flex-1"
        />

        <Filter
          filters={UserFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
        />
      </div>

      <section className="mt-12 flex flex-wrap gap-4">
        {result.users.length > 0 ? (
          result.users.map((user) => <UserCard key={user._id} user={user} />)
        ) : (
          <div className="paragraph-regular text-dark200_light800 mx-auto max-w-4xl text-center">
            <p>No users yet</p>
            <Link href="/sign-up" className="font-bold text-accent-blue">
              Join to be the first
            </Link>
          </div>
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

export default Community;
