import Head from "next/head";
import Link from "next/link";

interface Props {
  children: JSX.Element | JSX.Element[];
}

export default function Layout({ children }: Props) {
  return (
    <>
      <Head>
        <title>PRELink</title>
        <meta name="description" content="Generate preview links with ease" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex justify-center py-10">
        <Link href="/">
          <a className="font-medium text-xs">
            <span className="bg-blue-400 text-white px-3 py-2 rounded-md">
              PRE
            </span>
            <span className="ml-1">Link</span>
          </a>
        </Link>
      </div>
      <main className="mt-10">{children}</main>
    </>
  );
}
