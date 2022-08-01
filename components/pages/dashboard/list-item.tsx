import useSWR from "swr";
import { LinkEventStats } from "../../../pages/api/getStats";
import Skeleton from "../../shared/skeleton";
import { PhoneIcon } from "@heroicons/react/solid";

interface Props {
  url: string;
  redirectTo: string;
}

export default function ListItem({ url, redirectTo }: Props) {
  const { data, error } = useSWR("/api/getStats", (...args) =>
    fetch(...args).then((res) => res.json())
  ) as { data: LinkEventStats; error: any };
  return (
    <div className="text-sm py-4">
      <p className="font-medium">{url}</p>
      <p className="font-light text-gray-500">{redirectTo}</p>
      <div className="mt-3 flex space-x-4">
        {!data ? (
          <>
            <Skeleton size="xs" />
            <Skeleton size="xs" />
            <Skeleton size="xs" />
          </>
        ) : (
          <>
            <div className="flex space-x-2 border px-2 py-1 items-center rounded-md">
              <PhoneIcon className="h-4 w-4" />
              <p>
                {data.linkEventStats.find(
                  ({ platform }) => platform === "ANDROID"
                )?.count || 0}
              </p>
            </div>
            <div className="flex space-x-2 border px-2 py-1 items-center rounded-md">
              <PhoneIcon className="h-4 w-4" />
              <p>
                {data.linkEventStats.find(({ platform }) => platform === "IOS")
                  ?.count || 0}
              </p>
            </div>
            <div className="flex space-x-2 border px-2 py-1 items-center rounded-md">
              <PhoneIcon className="h-4 w-4" />
              <p>
                {data.linkEventStats.find(
                  ({ platform }) => platform === "DESKTOP"
                )?.count || 0}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
