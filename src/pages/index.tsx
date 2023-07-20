import { signIn, signOut, useSession } from "next-auth/react";
import type { ChangeEvent } from "react";
import { useEffect, useState } from "react";
import { api } from "../utils/api";
import { Card } from "../components/Card";
import { useRouter } from "next/router";
import { routerQueryToString } from "../utils/helpers";

const ProperyEntries = () => {
  const router = useRouter()

  const [page, setPage] = useState(0);
  const [priceSort, setPriceSort] = useState<'asc' | 'desc'>('asc');
  const [source, setSource] = useState('All');

  const itemsToShow = 24;

  const { data: sourceData, isLoading: sourceIsLoading } = api.property.getSources.useQuery();
  const { data, isLoading } = api.property.getPage.useQuery({ page, amount: itemsToShow, priceSort, source });

  useEffect(() => {
    if (!router.isReady) return;

    router.query?.page && setPage(Number(routerQueryToString(router.query.page)) || 0)
    router.query?.sort && setPriceSort(routerQueryToString(router.query.sort) as 'asc' | 'desc' || 'asc')
    router.query?.source && setSource(routerQueryToString(router.query.source) || 'All')

  }, [router]);

  const priceSorting = (e: ChangeEvent<HTMLSelectElement>) => {
    router.push({
      pathname: '/',
      query: { ...router.query, page: 0, sort: e.target.value }
    }, undefined, { shallow: true }).catch((e) => console.error(e))

    setPage(0)
    setPriceSort(e.target.value as 'asc' | 'desc')
  };

  const getSource = (e: ChangeEvent<HTMLSelectElement>) => {
    router.push({
      pathname: '/',
      query: { ...router.query, page: 0, source: e.target.value }
    }, undefined, { shallow: true }).catch((e) => console.error(e))

    setPage(0)
    setSource(e.target.value)
  };

  const toggleNextPage = () => {
    router.push({
      pathname: '/',
      query: { ...router.query, page: page + 1 }
    }, undefined, { shallow: true }).catch((e) => console.error(e))

    setPage(page + 1)
  }

  const togglePrevPage = () => {
    if (page > 0) {
      router.push({
        pathname: '/',
        query: { ...router.query, page: page - 1 }
      }, undefined, { shallow: true }).catch((e) => console.error(e))
      setPage(page - 1);
    }
  }

  return (
    <div className="p-10">
      <div className="flex">
        <label>Price: </label>
        <select onChange={(e) => priceSorting(e)} className="flex" value={priceSort}>
          <option value="asc">ASC</option>
          <option value="desc">DESC</option>
        </select>
      </div>
      {
        sourceIsLoading ? <div>Fetching sources...</div> :
          <div className="flex mb-10">
            <label>Source: </label>
            <select onChange={(e) => getSource(e)} value={source}>
              <option value='All'>All</option>
              {
                sourceData && sourceData.map(({ source }, index) => (
                  <option key={index} value={source} >{source}</option>
                ))
              }
            </select>
          </div>
      }

      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {data && !isLoading ? data?.map((entry, index) => <Card {...entry} key={index} />) : <div>Fetching Properties...</div>}
      </div>
      <div className="flex justify-between">
        <span onClick={togglePrevPage}>{`< Prev`}</span>
        <span>page: {page}</span>
        <span onClick={toggleNextPage}>{`Next >`}</span>
      </div>
    </div>
  );
};

const Home = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <main className="flex flex-col items-center pt-4">Loading...</main>;
  }

  return (
    <main>
      <h1 className="text-3xl p-10">Property Scanner</h1>
      <div className="pt-10">
        <div>
          {session ? (
            <>
              <p className="mb-4 text-center">hi {session.user?.name}</p>
              <button
                type="button"
                className="mx-auto block rounded-md py-3 px-6 text-center"
                onClick={() => {
                  signOut().catch(console.log);
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <button
              type="button"
              className="mx-auto block rounded-md py-3 px-6 text-center"
              onClick={() => {
                signIn("discord").catch(console.log);
              }}
            >
              Login with Discord
            </button>
          )}
          <div className="pt-10">
            <ProperyEntries />
          </div>
        </div>
      </div>
    </main>
  );
};
export default Home;