import type { ChangeEvent } from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { api } from "../utils/api";
import { clearFieldIfFalsey, routerQueryToString } from "../utils/helpers";
import Card from "../components/Card";
import Layout from "../components/Layout";
import { Skeleton } from "../components/Skeleton";

const sortingVals = ["asc", "desc"] as const;

type FiltersType = {
  page: number;
  sorting: (typeof sortingVals)[number];
  source: string;
  minPrice: number | null;
  maxPrice: number | null;
  itemsPerPage: number;
  bedrooms: number;
  bathrooms: number;
  search: string;
};

const Home = () => {
  const router = useRouter();

  const [filters, setFilters] = useState<FiltersType>({
    page: 1,
    sorting: "asc",
    source: "All",
    minPrice: null,
    maxPrice: null,
    itemsPerPage: 20,
    bedrooms: 0,
    bathrooms: 0,
    search: "",
  });

  const { data, isLoading } = api.property.getPage.useQuery({
    page: filters.page,
    take: filters.itemsPerPage,
    sorting: filters.sorting,
    source: filters.source,
    minPrice: filters.minPrice,
    maxPrice: filters.maxPrice,
    bedrooms: filters.bedrooms,
    bathrooms: filters.bathrooms,
    search: filters.search,
  });

  const totalCount = data ? data[0] : 0;

  useEffect(() => {
    if (Object.keys(router.query).length === 0) return;

    setFilters((prevState) => {
      return {
        ...prevState,
        ...(router.query.page && {
          page: Number(routerQueryToString(router.query.page)),
        }),
        ...(router.query.sorting && {
          sorting: routerQueryToString(
            router.query.sorting
          ) as FiltersType["sorting"],
        }),
        ...(router.query.source && {
          source: routerQueryToString(router.query.source) || "All",
        }),
        ...(router.query.maxPrice && {
          maxPrice: Number(routerQueryToString(router.query.maxPrice)),
        }),
        ...(router.query.minPrice && {
          minPrice: Number(routerQueryToString(router.query.minPrice)),
        }),
        ...(router.query.search && {
          search: routerQueryToString(router.query.search) || "",
        }),
      };
    });
  }, [router.query]);

  const pushToRouter = (params: typeof router.query) => {
    router
      .push(
        {
          pathname: "/",
          query: { ...router.query, ...params },
        },
        undefined,
        { shallow: true }
      )
      .catch((e) => console.error(e));
  };

  const changeHandler = (
    e: ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    pushToRouter({ page: "1", [e.target.name]: e.target.value });

    setFilters((prevState) => ({
      ...prevState,
      page: 1,
      [e.target.name]:
        e.target.type === "number" ? Number(e.target.value) : e.target.value,
    }));
  };

  const togglePage = (next = true) => {
    const notCondition = next
      ? filters.itemsPerPage * (filters.page + 1) >= totalCount
      : filters.page <= 1;

    const nextPage = next ? filters.page + 1 : filters.page - 1;

    if (notCondition) return;

    pushToRouter({ page: `${nextPage}` });

    setFilters({
      ...filters,
      page: nextPage,
    });
  };

  return (
    <Layout>
      <div className="mx-auto max-w-screen-xl p-4">
        <div className="mb-2 flex items-baseline">
          <label className="mr-4 text-xs uppercase tracking-wider text-gray-900">
            Search:
          </label>
          <input
            onChange={(e) => changeHandler(e)}
            name="search"
            value={filters.search}
            type="search"
            placeholder="Birkirkara"
            className="block max-w-[120px] cursor-pointer border-b px-2 py-1 text-sm text-gray-900 outline-none [appearance:textfield] focus:border-blue-500 focus:ring-blue-500 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          />
        </div>
        <div className="mb-2 flex items-baseline">
          <label className="mr-4 text-xs uppercase tracking-wider text-gray-900">
            Price Range:
          </label>
          <input
            className="block max-w-[100px] cursor-pointer border-b px-2 py-1 text-sm text-gray-900 outline-none [appearance:textfield] focus:border-blue-500 focus:ring-blue-500 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            onChange={(e) => changeHandler(e)}
            type="number"
            name="minPrice"
            placeholder="Min"
            value={clearFieldIfFalsey(filters.minPrice)}
          />
          <span className="mx-1 text-xs uppercase tracking-wider text-gray-900">
            to
          </span>
          <input
            className="block max-w-[100px] cursor-pointer border-b px-2 py-1 text-sm text-gray-900 outline-none [appearance:textfield] focus:border-blue-500 focus:ring-blue-500 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            onChange={(e) => changeHandler(e)}
            type="number"
            name="maxPrice"
            placeholder="Max"
            value={clearFieldIfFalsey(filters.maxPrice)}
          />
        </div>
        <div className="mb-2 flex items-baseline">
          <label className="mr-4 text-xs uppercase tracking-wider text-gray-900">
            Price Sorting:
          </label>
          <select
            onChange={(e) => changeHandler(e)}
            name="sorting"
            className="block cursor-pointer border-b px-2 py-1 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-blue-500"
            value={filters.sorting || "asc"}
          >
            <option value="asc">ASC</option>
            <option value="desc">DESC</option>
          </select>
        </div>

        <div className="mb-2 flex items-baseline">
          <label className="mr-4 text-xs uppercase tracking-wider text-gray-900">
            Bedrooms:
          </label>
          <input
            onChange={(e) => changeHandler(e)}
            name="bedrooms"
            value={clearFieldIfFalsey(filters.bedrooms)}
            type="number"
            placeholder="Any"
            className="block max-w-[50px] cursor-pointer border-b px-2 py-1 text-sm text-gray-900 outline-none [appearance:textfield] focus:border-blue-500 focus:ring-blue-500 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          />
        </div>

        <div className="mb-2 flex items-baseline">
          <label className="mr-4 text-xs uppercase tracking-wider text-gray-900">
            Bathrooms:
          </label>
          <input
            onChange={(e) => changeHandler(e)}
            name="bathrooms"
            value={clearFieldIfFalsey(filters.bathrooms)}
            type="number"
            placeholder="Any"
            className="block max-w-[50px] cursor-pointer border-b px-2 py-1 text-sm text-gray-900 outline-none [appearance:textfield] focus:border-blue-500 focus:ring-blue-500 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          />
        </div>

        <div className="mb-8 flex items-center">
          <label className="text-xs uppercase tracking-wider text-gray-900">
            Source:{" "}
          </label>
          {!isLoading && data && (
            <select
              name="source"
              onChange={(e) => changeHandler(e)}
              className="block cursor-pointer border-b px-2 py-1 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-blue-500"
              value={filters.source}
            >
              <option value="All">All</option>
              {data[2].map(({ source }, index) => (
                <option key={index} value={source}>
                  {source}
                </option>
              ))}
            </select>
          )}
        </div>

        {totalCount !== undefined && (
          <span className="text-xs uppercase tracking-wider text-gray-900">
            Total Results: {totalCount}
          </span>
        )}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {Array.isArray(data) && !isLoading
            ? data[1].map((entry, index) => <Card {...entry} key={entry.id} priority={index < 4} />)
            : [...Array(filters.itemsPerPage) as undefined[]].map((e, i) => (
                <div key={i} className="py-6">
                  <Skeleton className="aspect-video w-full bg-gray-300" />
                  <Skeleton className="mt-5 h-5 w-[80%] rounded-full bg-gray-300" />
                  <Skeleton className="mt-5 h-4 w-[50%]  bg-gray-300" />
                  <Skeleton className="mt-5 h-4 w-[50%]  bg-gray-300" />
                </div>
              ))}
        </div>
        <div className="flex justify-between">
          <span
            className={filters.page > 1 ? "cursor-pointer" : "invisible"}
            onClick={() => togglePage(false)}
          >{`< Prev`}</span>
          <span>
            page: {filters.page} /{" "}
            {Math.ceil(totalCount / filters.itemsPerPage)}
          </span>
          <span
            className={
              filters.itemsPerPage * filters.page <= totalCount
                ? "cursor-pointer"
                : "invisible"
            }
            onClick={() => togglePage()}
          >{`Next >`}</span>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
