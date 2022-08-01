import { PhotographIcon, ExternalLinkIcon } from "@heroicons/react/solid";

export default function LinkPreview() {
  return (
    <div className="lg:w-2/6 w-5/6 flex flex-col border rounded-md p-4">
      <a
        className="text-blue-400 text-xs mb-2 flex items-center"
        target="_blank"
        href="https://google.com"
      >
        https://google.com&nbsp;
        <ExternalLinkIcon className="h-4 w-4" />
      </a>
      <div className="w-full min-h-[300px] bg-gray-300 rounded-t-md flex justify-center items-center">
        <PhotographIcon className="h-8 w-8 text-gray-400" />
      </div>
      <div className="py-5 px-3 border-b border-x rounded-b-md">
        <div className="bg-gray-300 py-1 rounded-full w-1/3"></div>
        <div className="bg-gray-300 py-1 rounded-full mt-2"></div>
        <div className="bg-gray-300 py-1 rounded-full w-2/3 mt-1.5"></div>
      </div>
    </div>
  );
}
