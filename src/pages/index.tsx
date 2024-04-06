import Head from "next/head";
import { GetStaticProps, NextPage } from "next";
import { getData } from "@src/utils/page";
import { faGithub, faLinkedin, faXTwitter, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import React from "react";

export function CheckBox({ state }: { state: boolean }) {
    return (
        <input
            defaultChecked
            id="checked-checkbox"
            type="checkbox"
            checked={state}
            disabled
            className="w-4 h-4 text-blue-600 disabled:text-blue-600 disabled:bg-gray-100 disabled:border-gray-300 rounded"
        />
    );
}
interface Props {
    data: Awaited<ReturnType<typeof getData>>;
}
const LinkIcons: Record<string, React.ReactNode> = {
    linkedin: (
        <FontAwesomeIcon
            className="text-2xl hover:text-indigo-400"
            icon={faLinkedin}
        />
    ),
    twitter: (
        <FontAwesomeIcon
            className="text-2xl hover:text-indigo-500"
            icon={faXTwitter}
        />
    ),
    youtube: (
        <FontAwesomeIcon
            className="text-2xl hover:text-indigo-500"
            icon={faYoutube}
        />
    ),
    website: (
        <FontAwesomeIcon
            className="text-2xl hover:text-indigo-500"
            icon={faGlobe}
        />
    ),
    github: (
        <FontAwesomeIcon
            className="text-2xl hover:text-indigo-500"
            icon={faGithub}
        />
    ),
};
const Home: NextPage<Props> = ({ data }) => {
    return (
        <>
            <Head>
                <title>My Year{"'"}s resolutions</title>
            </Head>
            <div
                className="relative min-h-screen w-full flex items-center justify-center bg-contain bg-center text-center px-5"
                style={{
                    backgroundImage:
                        "url(https://images.pexels.com/photos/260689/pexels-photo-260689.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500)",
                }}
            >
                {/* <div className="h-[400rem]"></div> */}
                <div className="absolute top-0 right-0 bottom-0 left-0 bg-gray-900 opacity-75" />
                <div className="z-50 flex flex-col justify-center items-stretch text-white w-full h-screen">
                    <h1 className="text-5xl">
                        My <b>Year{"'"}s</b> Resolution
                    </h1>
                    <p>Stay tuned for something amazing!!!</p>
                    {data.resolutions.map((res) => {
                        return (
                            <div
                                key={res.id}
                                className="my-5 w-full max-w-2xl mx-auto"
                            >
                                <p className="text-start">{res.name}</p>
                                <div className="flex items-center gap-2">
                                    <div className="flex-1 shadow w-full bg-white rounded-full">
                                        <div
                                            className="rounded-full bg-indigo-600 text-sm leading-none text-center text-white py-1"
                                            style={{
                                                width: `${res.progress}%`,
                                            }}
                                        >
                                            {res.progress}%
                                        </div>
                                    </div>
                                    <CheckBox state={res.progress == 100} />
                                </div>
                            </div>
                        );
                    })}

                    <div className="mt-6 flex text-white mx-auto gap-2">
                        {data.links.map((link) => {
                            const icon = LinkIcons[link.label];
                            if (!icon) return null;
                            return (
                                <React.Fragment key={link.id}>
                                    <a href={link.link}>{icon}</a>
                                </React.Fragment>
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    );
};

export const getStaticProps: GetStaticProps<Props> = async (ctx) => {
    const res = await getData(new Date().getFullYear().toString());
    return {
        props: { data: res },
    };
};
export default Home;
