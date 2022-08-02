import {
  ExternalLinkIcon,
  GlobeAltIcon,
  PhotographIcon,
} from "@heroicons/react/solid";
import type { NextPage } from "next";
import { useState } from "react";
import Layout from "../components/layouts";
import Button from "../components/button";
import Skeleton from "../components/skeleton";
import getStats from "../services/get-stats";
import { Preview } from "./api/getStats";
import Image from "next/future/image";
import getImage from "../services/get-image";

const Home: NextPage = () => {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState<Preview>({
    url: "https://example.com",
  });
  const [image, setImage] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Layout>
      <div className="grid md:grid-cols-2 grid-cols-none">
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            if (url === result.url) return;
            setIsLoading(true);
            const { data, error } = await getStats(url);
            if (error) {
              console.error(error);
              setIsLoading(false);
              return;
            }

            if (data?.images.length > 0) {
              const resp = await getImage(data.images[0]);
              if (resp?.error) {
                console.error(error);
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
          }}
          className="lg:w-2/3 md:w-3/4 w-4/5 m-auto md:order-first order-last"
        >
          <label
            htmlFor="url"
            className="block text-sm font-medium text-gray-700"
          >
            Paste your link below
          </label>
          <div className="mt-1 flex rounded-md shadow-sm mb-4">
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
          </div>
          <Button
            loading={isLoading}
            type="submit"
            icon={<PhotographIcon className="h-4 w-4 text-gray-400 mr-1.5" />}
          >
            See Preview
          </Button>
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
