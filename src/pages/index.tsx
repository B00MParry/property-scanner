import type { ChangeEvent } from "react";
import { useEffect, useState } from "react";
import { api } from "../utils/api";
import { Card } from "../components/Card";
import { useRouter } from "next/router";
import { routerQueryToString } from "../utils/helpers";

const ProperyEntries = () => {
  const router = useRouter();

  const [page, setPage] = useState(0);
  const [priceSort, setPriceSort] = useState<"asc" | "desc">("asc");
  const [source, setSource] = useState("All");

  const itemsToShow = 24;

  const { data: sourceData, isLoading: sourceIsLoading } =
    api.property.getSources.useQuery();
  const { data, isLoading } = api.property.getPage.useQuery({
    page,
    amount: itemsToShow,
    priceSort,
    source,
  });

  useEffect(() => {
    if (!router.isReady) return;

    router.query?.page &&
      setPage(Number(routerQueryToString(router.query.page)) || 0);
    router.query?.sort &&
      setPriceSort(
        (routerQueryToString(router.query.sort) as "asc" | "desc") || "asc"
      );
    router.query?.source &&
      setSource(routerQueryToString(router.query.source) || "All");
  }, [router]);

  const priceSorting = (e: ChangeEvent<HTMLSelectElement>) => {
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

    setPage(0);
    setPriceSort(e.target.value as "asc" | "desc");
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

    setPage(0);
    setSource(e.target.value);
  };

  const toggleNextPage = () => {
    router
      .push(
        {
          pathname: "/",
          query: { ...router.query, page: page + 1 },
        },
        undefined,
        { shallow: true }
      )
      .catch((e) => console.error(e));

    setPage(page + 1);
  };

  const togglePrevPage = () => {
    if (page > 0) {
      router
        .push(
          {
            pathname: "/",
            query: { ...router.query, page: page - 1 },
          },
          undefined,
          { shallow: true }
        )
        .catch((e) => console.error(e));
      setPage(page - 1);
    }
  };

  return (
    <>
      <div className="mb-2 flex items-baseline">
        <label className="mr-4 text-xs uppercase tracking-wider text-gray-900">
          Price:{" "}
        </label>
        <select
          onChange={(e) => priceSorting(e)}
          className="block cursor-pointer border-b px-2 py-1 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-blue-500"
          value={priceSort}
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
            value={source}
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

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {data && !isLoading ? (
          data?.map((entry, index) => <Card {...entry} key={index} />)
        ) : (
          <div>Fetching Properties...</div>
        )}
      </div>
      <div className="flex justify-between">
        <span onClick={togglePrevPage}>{`< Prev`}</span>
        <span>page: {page}</span>
        <span onClick={toggleNextPage}>{`Next >`}</span>
      </div>
    </>
  );
};

const Home = () => {
  return (
    <main className="p-10">
      <h1 className="text-3xl pb-10">Property Scanner</h1>
      <ProperyEntries />
    </main>
  );
};
export default Home;
