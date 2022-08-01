import { ArrowRightIcon } from "@heroicons/react/solid";
import type { NextPage } from "next";
import Layout from "../components/layouts";
import LinkPreview from "../components/pages/index/link-preview";
import Button from "../components/shared/buttons";
import googleSignup from "../firebase";

const Home: NextPage = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center">
        <LinkPreview />
        <div className="lg:w-2/6 w-5/6 mt-3 flex justify-between">
          <div>
            <p className="font-semibold">Create Preview Links with Ease</p>
            <p className="flex items-center text-gray-600 text-sm">
              Get started now <ArrowRightIcon className="h-3 w-5" />
            </p>
          </div>
          <Button onClick={googleSignup}>Create Account</Button>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
