import type { ChangeEvent } from "react";
import { useEffect, useState } from "react";
import { api } from "../utils/api";
import { Card } from "../components/Card";
import { useRouter } from "next/router";
import { routerQueryToString } from "../utils/helpers";

const sortingVals = ["asc", "desc"] as const;

type FiltersType = {
  page: number;
  sorting: (typeof sortingVals)[number];
  source: string;
  priceRange: [number | null, number | null];
};

const ProperyEntries = () => {
  const router = useRouter();

  const [filters, setFilters] = useState<FiltersType>({
    page: 0,
    sorting: "asc",
    source: "All",
    priceRange: [null, null],
  });

  const itemsToShow = 24;
  const { data: sourceData, isLoading: sourceIsLoading } =
    api.property.getSources.useQuery();
  const { data, isLoading } = api.property.getPage.useQuery({
    page: filters.page,
    take: itemsToShow,
    sorting: filters.sorting,
    source: filters.source,
    priceRange: filters.priceRange,
  });
  const totalCount = Array.isArray(data) ? data[0] : 0;

  useEffect(() => {
    if (!router.isReady) return;

    router.query?.page &&
      setFilters((prevState) => {
        return {
          ...prevState,
          page: Number(routerQueryToString(router.query.page)) || 0,
        };
      });

    router.query?.sort &&
      setFilters((prevState) => {
        return {
          ...prevState,
          sorting: routerQueryToString(
            router.query.sort
          ) as FiltersType["sorting"],
        };
      });

    router.query?.source &&
      setFilters((prevState) => {
        return {
          ...prevState,
          source: routerQueryToString(router.query.source) || "All",
        };
      });

    router.query?.maxPrice &&
      setFilters((prevState) => {
        return {
          ...prevState,
          priceRange: [
            prevState.priceRange[0],
            Number(routerQueryToString(router.query.maxPrice)),
          ],
        };
      });

    router.query?.minPrice &&
      setFilters((prevState) => {
        return {
          ...prevState,
          priceRange: [
            Number(routerQueryToString(router.query.minPrice)),
            prevState.priceRange[1],
          ],
        };
      });
  }, [router]);

  const sorting = (e: ChangeEvent<HTMLSelectElement>) => {
    router
      .push(
        {
          pathname: "/",
          query: { ...router.query, page: 0, sort: e.target.value },
        },
        undefined,
        { shallow: true }
      )
      .catch((e) => console.error(e));

    setFilters({
      ...filters,
      page: 0,
      sorting: e.target.value as FiltersType["sorting"],
    });
  };

  const priceRange = (e: ChangeEvent<HTMLInputElement>, max = true) => {
    router
      .push(
        {
          pathname: "/",
          query: {
            ...router.query,
            page: 0,
            [max ? "maxPrice" : "minPrice"]: e.target.value,
          },
        },
        undefined,
        { shallow: true }
      )
      .catch((e) => console.error(e));

    setFilters({
      ...filters,
      page: 0,
      priceRange: max
        ? [filters.priceRange[0], Number(e.target.value)]
        : [Number(e.target.value), filters.priceRange[1]],
    });
  };

  const getSource = (e: ChangeEvent<HTMLSelectElement>) => {
    router
      .push(
        {
          pathname: "/",
          query: { ...router.query, page: 0, source: e.target.value },
        },
        undefined,
        { shallow: true }
      )
      .catch((e) => console.error(e));

    setFilters({
      ...filters,
      page: 0,
      source: e.target.value as FiltersType["sorting"],
    });
  };

  const toggleNextPage = () => {
    if (itemsToShow * (filters.page + 1) >= totalCount) return;

    router
      .push(
        {
          pathname: "/",
          query: { ...router.query, page: filters.page + 1 },
        },
        undefined,
        { shallow: true }
      )
      .catch((e) => console.error(e));

    setFilters({
      ...filters,
      page: filters.page + 1,
    });
  };

  const togglePrevPage = () => {
    if (filters.page > 0) {
      router
        .push(
          {
            pathname: "/",
            query: { ...router.query, page: filters.page - 1 },
          },
          undefined,
          { shallow: true }
        )
        .catch((e) => console.error(e));

      setFilters({
        ...filters,
        page: filters.page - 1,
      });
    }
  };

  return (
    <>
      <div className="mb-2 flex items-baseline">
        <label className="mr-4 text-xs uppercase tracking-wider text-gray-900">
          Price Range:
        </label>
        <input
          onChange={(e) => priceRange(e, false)}
          type="number"
          placeholder="Min"
          value={filters.priceRange[0] === null || filters.priceRange[0] === 0 ? "" : filters.priceRange[0]}
          className="block max-w-[100px] cursor-pointer border-b px-2 py-1 text-sm text-gray-900 outline-none [appearance:textfield] focus:border-blue-500 focus:ring-blue-500 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
        <span className="mx-1 text-xs uppercase tracking-wider text-gray-900">
          to
        </span>
        <input
          onChange={(e) => priceRange(e)}
          type="number"
          placeholder="Max"
          value={filters.priceRange[1] === null || filters.priceRange[1] === 0  ? "" : filters.priceRange[1]}
          className="block max-w-[100px] cursor-pointer border-b px-2 py-1 text-sm text-gray-900 outline-none [appearance:textfield] focus:border-blue-500 focus:ring-blue-500 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
      </div>
      <div className="mb-2 flex items-baseline">
        <label className="mr-4 text-xs uppercase tracking-wider text-gray-900">
          Price Sorting:
        </label>
        <select
          onChange={(e) => sorting(e)}
          className="block cursor-pointer border-b px-2 py-1 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-blue-500"
          value={filters.sorting || "asc"}
        >
          <option value="asc">ASC</option>
          <option value="desc">DESC</option>
        </select>
      </div>
      {sourceIsLoading ? (
        <div>Fetching sources...</div>
      ) : (
        <div className="mb-8 flex items-baseline">
          <label className="text-xs uppercase tracking-wider text-gray-900">
            Source:{" "}
          </label>
          <select
            onChange={(e) => getSource(e)}
            className="block cursor-pointer border-b px-2 py-1 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-blue-500"
            value={filters.source}
          >
            <option value="All">All</option>
            {sourceData &&
              sourceData.map(({ source }, index) => (
                <option key={index} value={source}>
                  {source}
                </option>
              ))}
          </select>
        </div>
      )}

      {totalCount !== undefined && (
        <span className="text-xs uppercase tracking-wider text-gray-900">
          Total Results: {totalCount}
        </span>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {Array.isArray(data) && !isLoading ? (
          data[1]?.map((entry, index) => <Card {...entry} key={index} />)
        ) : (
          <div>Fetching Properties...</div>
        )}
      </div>
      <div className="flex justify-between">
        <span onClick={togglePrevPage}>{`< Prev`}</span>
        <span>page: {filters.page}</span>
        <span onClick={toggleNextPage}>{`Next >`}</span>
      </div>
    </>
  );
};

const Home = () => {
  return (
    <main className="p-10">
      <h1 className="pb-10 text-3xl">Property Scanner</h1>
      <ProperyEntries />
    </main>
  );
};
export default Home;
