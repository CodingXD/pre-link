import { GlobeAltIcon } from "@heroicons/react/solid";
import type { NextPage } from "next";
import Layout from "../components/layouts";
import { Dialog, Transition } from "@headlessui/react";
import { FormEvent, Fragment, useRef, useState } from "react";
import Button from "../components/shared/buttons";
import { PlusIcon } from "@heroicons/react/solid";
import useSWR from "swr";
import { AllUrls } from "./api/getAllUrls";
import ListItem from "../components/pages/dashboard/list-item";
import { URL } from "url";

const Dashboard: NextPage = () => {
  const [open, setOpen] = useState(false);
  const [payload, setPayload] = useState({
    suffix: {
      option: "SHORT",
    },
    dynamicLinkInfo: {
      domainUriPrefix: "pre-link.web.app",
      link: "",
      navigationInfo: {
        enableForcedRedirect: true,
      },
      socialMetaTagInfo: {
        socialTitle: "",
        socialDescription: "",
        socialImageLink: "",
      },
    },
  });
  const cancelButtonRef = useRef(null);
  const { data, error } = useSWR("/api/getAllUrls", (...args) =>
    fetch(...args).then((res) => res.json())
  ) as { data: AllUrls[]; error: any };

  const createPreviewLink = async (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <>
      <Layout>
        <div className="flex flex-col items-center justify-center divide-y">
          <div className="lg:w-2/6 w-5/6 mt-3">
            <Button
              onClick={() => setOpen(true)}
              variant="icon-button"
              icon={<PlusIcon className="h-4 w-4 mr-2" />}
            >
              New Link
            </Button>
          </div>
          <div className="lg:w-2/6 w-5/6 mt-3 divide-y">
            {data &&
              data.map(({ url, redirectTo }, i) => (
                <ListItem key={i} url={url} redirectTo={redirectTo} />
              ))}
          </div>
        </div>
      </Layout>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel
                  as="form"
                  onSubmit={createPreviewLink}
                  className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full p-5"
                >
                  <label
                    htmlFor="url"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Paste your link below
                  </label>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                      <GlobeAltIcon className="text-gray-500 h-4 w-4" />
                    </span>
                    <input
                      type="url"
                      name="url"
                      id="url"
                      value={payload.dynamicLinkInfo.link}
                      onChange={(e) =>
                        setPayload((prevState) => {
                          return {
                            ...prevState,
                            dynamicLinkInfo: {
                              ...prevState.dynamicLinkInfo,
                              link: e.target.value,
                            },
                          };
                        })
                      }
                      className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                      placeholder="https://www.example.com"
                      required
                      aria-required
                    />
                  </div>
                  <br />
                  <p className="block text-sm font-medium text-gray-700">
                    <strong>Preview Power</strong>
                  </p>
                  <label
                    htmlFor="social-title"
                    className="block text-sm font-medium text-gray-700 mt-3 mb-1"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    name="social-title"
                    id="social-title"
                    value={
                      payload.dynamicLinkInfo.socialMetaTagInfo.socialTitle
                    }
                    onChange={(e) =>
                      setPayload((prevState) => {
                        return {
                          ...prevState,
                          dynamicLinkInfo: {
                            ...prevState.dynamicLinkInfo,
                            socialMetaTagInfo: {
                              ...prevState.dynamicLinkInfo.socialMetaTagInfo,
                              socialTitle: e.target.value,
                            },
                          },
                        };
                      })
                    }
                    className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300"
                    placeholder="A Girafe is so small"
                    required
                    aria-required
                  />
                  <label
                    htmlFor="social-description"
                    className="block text-sm font-medium text-gray-700 mt-3 mb-1"
                  >
                    Description
                  </label>
                  <textarea
                    name="social-description"
                    id="social-description"
                    cols={30}
                    rows={10}
                    value={
                      payload.dynamicLinkInfo.socialMetaTagInfo
                        .socialDescription
                    }
                    onChange={(e) =>
                      setPayload((prevState) => {
                        return {
                          ...prevState,
                          dynamicLinkInfo: {
                            ...prevState.dynamicLinkInfo,
                            socialMetaTagInfo: {
                              ...prevState.dynamicLinkInfo.socialMetaTagInfo,
                              socialDescription: e.target.value,
                            },
                          },
                        };
                      })
                    }
                    className="focus:ring-indigo-500 focus:border-indigo-500 resize-none flex-1 block w-full rounded-md sm:text-sm border-gray-300"
                    placeholder="A single ant is bigger than 10 girafee's stacked on top of each other"
                    required
                    aria-required
                  ></textarea>
                  <label
                    htmlFor="social-image"
                    className="block text-sm font-medium text-gray-700 mt-3 mb-1"
                  >
                    Image Link
                  </label>
                  <input
                    type="url"
                    name="social-image"
                    id="social-image"
                    value={
                      payload.dynamicLinkInfo.socialMetaTagInfo.socialImageLink
                    }
                    onChange={(e) =>
                      setPayload((prevState) => {
                        return {
                          ...prevState,
                          dynamicLinkInfo: {
                            ...prevState.dynamicLinkInfo,
                            socialMetaTagInfo: {
                              ...prevState.dynamicLinkInfo.socialMetaTagInfo,
                              socialImageLink: e.target.value,
                            },
                          },
                        };
                      })
                    }
                    className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300 mb-4"
                    placeholder="https://example.com/a.jpg"
                    required
                    aria-required
                  />
                  <Button type="submit">Create</Button>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default Dashboard;
