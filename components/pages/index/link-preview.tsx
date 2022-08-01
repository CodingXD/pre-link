import { PhotographIcon, ExternalLinkIcon } from "@heroicons/react/solid";
import Skeleton from "../../shared/skeleton";

export default function LinkPreview() {
  return (
    <div className="lg:w-2/6 w-5/6 flex flex-col border rounded-md p-4">
      <a
        className="text-blue-400 text-xs mb-2 flex items-center"
        target="_blank"
        href="https://google.com"
        rel="noreferrer"
      >
        https://google.com&nbsp;
        <ExternalLinkIcon className="h-4 w-4" />
      </a>
      <div className="w-full min-h-[300px] bg-gray-300 rounded-t-md flex justify-center items-center">
        <PhotographIcon className="h-8 w-8 text-gray-400" />
      </div>
      <div className="py-5 px-3 border-b border-x rounded-b-md">
        <Skeleton size="sm" />
        <div className="mt-3 space-y-2">
          <Skeleton />
          <Skeleton size="md" />
        </div>
      </div>
    </div>
  );
}
