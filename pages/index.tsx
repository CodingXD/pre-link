import {
  ExternalLinkIcon,
  GlobeAltIcon,
  PhotographIcon,
  RefreshIcon,
  SearchIcon,
} from "@heroicons/react/solid";
import type { NextPage } from "next";
import { FormEvent, useEffect, useState } from "react";
import Layout from "../components/layouts";
import { IconButton, LinkButton } from "../components/button";
import Skeleton from "../components/skeleton";
import getStats from "../services/get-stats";
import { Preview } from "./api/getStats";
import Image from "next/future/image";
import getImage from "../services/get-image";
import Spinner from "../components/spinner";

const Home: NextPage = () => {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState<Preview>({
    url: "https://example.com",
  });
  const [image, setImage] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState<any[]>([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const data = localStorage.getItem("history");
    if (data) {
      const history = JSON.parse(data);
      setHistory(history);
    }
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    if (url === result.url) return;
    setResult({
      url: "https://example.com",
    });
    setImage(null);
    setIsLoading(true);

    // check if already in history
    const oldData = history.find((h) => h.url === url);
    if (oldData) {
      if (oldData?.images.length > 0) {
        const resp = await getImage(oldData.images[0]);
        if (resp?.error) {
          setErrorMessage("failed to load image");
          setIsLoading(false);
          return;
        }

        const reader = new FileReader();
        reader.readAsDataURL(resp.data);
        reader.onload = () => setImage(reader.result);
        reader.onerror = (e) => console.log(e);
      }

      setResult(oldData);
      setIsLoading(false);
      return;
    }

    // if not found, fetch new and save in history
    const { data, error } = await getStats(url);
    if (error) {
      setErrorMessage("failed to get website information");
      setIsLoading(false);
      return;
    }

    if (data?.images.length > 0) {
      const resp = await getImage(data.images[0]);
      if (resp?.error) {
        setErrorMessage("failed to load image");
        setIsLoading(false);
      }

      const reader = new FileReader();
      reader.readAsDataURL(resp.data);
      reader.onload = () => setImage(reader.result);
      reader.onerror = (e) => setErrorMessage("failed to load image");
    }
    setResult(data);
    setIsLoading(false);
    const newItems = [...history, data];
    localStorage.setItem("history", JSON.stringify(newItems));
    setHistory(newItems);
  };

  const loadOldData = async (data: any) => {
    if (data.url === result.url) return;
    setErrorMessage("");

    setResult({
      url: "https://example.com",
    });
    setImage(null);
    setIsLoading(true);

    if (data?.images.length > 0) {
      const resp = await getImage(data.images[0]);
      if (resp?.error) {
        console.error(resp?.error);
        setIsLoading(false);
        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(resp.data);
      reader.onload = () => setImage(reader.result);
      reader.onerror = (e) => console.log(e);
    }

    setResult(data);
    setIsLoading(false);
  };

  return (
    <Layout>
      <div className="grid md:grid-cols-2 grid-cols-none">
        <form
          onSubmit={handleSubmit}
          className="lg:w-2/3 md:w-3/4 w-4/5 mx-auto md:mt-0 mt-5 md:order-first order-last"
        >
          <label
            htmlFor="url"
            className="block text-sm font-medium text-gray-700"
          >
            Paste your link below
          </label>
          <div className="mt-1 flex relative rounded-md shadow-sm mb-4">
            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
              <GlobeAltIcon className="text-gray-500 h-4 w-4" />
            </span>
            <input
              type="url"
              name="url"
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block rounded-none rounded-r-md sm:text-sm border-gray-300 w-full"
              placeholder="https://www.example.com"
              required
              aria-required
            />
            <LinkButton
              type="submit"
              className="absolute inset-y-0 right-1 flex items-center bg-blue-300 my-1 px-3 rounded-none rounded-r-md"
            >
              {isLoading ? (
                <Spinner />
              ) : (
                <SearchIcon className="h-4 w-4 text-white cursor-pointer" />
              )}
            </LinkButton>
          </div>
          {errorMessage && (
            <small className="bg-red-200 text-red-500 px-4 py-2 rounded-md">
              {errorMessage}
            </small>
          )}
          {history.length > 0 && (
            <>
              <small className="mt-5 font-medium text-gray-400">
                Search History
              </small>
              <div className="mt-1 border rounded-md divide-y">
                {history.map((h, i) => (
                  <div key={i} className="px-4 py-3 flex justify-between">
                    <div className="flex-col space-y-2">
                      <p className="text-sm font-medium">{h.siteName}</p>
                      <a
                        href={h.url}
                        rel="noreferrer"
                        target="_blank"
                        className="text-blue-400 text-xs flex items-center"
                      >
                        {h.url}&nbsp;
                        <ExternalLinkIcon className="h-4 w-4" />
                      </a>
                    </div>
                    <IconButton
                      icon={<RefreshIcon className="h-4 w-4 text-gray-400" />}
                      onClick={() => loadOldData(h)}
                    >
                      Recheck
                    </IconButton>
                  </div>
                ))}
              </div>
            </>
          )}
        </form>
        <div className="lg:w-2/3 md:w-3/4 w-4/5 flex flex-col border rounded-md p-4 mx-auto md:order-last order-first">
          {isLoading ? (
            <div className="mb-1.5">
              <Skeleton size="sm" />
            </div>
          ) : (
            <a
              className="text-blue-400 text-xs mb-2 flex items-center"
              target="_blank"
              href={result.url}
              rel="noreferrer"
            >
              {result.url}&nbsp;
              <ExternalLinkIcon className="h-4 w-4" />
            </a>
          )}
          {image ? (
            <Image
              src={image}
              width={1190}
              height={300}
              className="bg-cover min-h-[300px] rounded-t-md border"
              alt={result.siteName}
            />
          ) : (
            <div className="w-full min-h-[300px] bg-gray-300 rounded-t-md flex justify-center items-center">
              <PhotographIcon className="h-8 w-8 text-gray-400" />
            </div>
          )}
          <div className="py-5 px-3 border-b border-x rounded-b-md">
            {result?.title ? (
              <p className="mb-0">{result.title}</p>
            ) : (
              <Skeleton size="sm" />
            )}
            <div className="mt-3 space-y-2">
              {result?.description ? (
                <p className="text-gray-400 text-sm">{result.description}</p>
              ) : (
                <>
                  <Skeleton />
                  <Skeleton size="md" />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
