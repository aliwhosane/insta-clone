import { fromJSON } from "postcss";
import React from "react";
import Header from "../../components/Header";
import { getProviders, signIn as signIntoProvider } from "next-auth/react";

const signin = ({ providers }) => {
  return (
    <>
      <Header />
      <div className="flex flex-col justify-center items-center min-h-screen py-2 -mt-56 px-14 text-center">
        <img className="w-80" src="https://links.papareact.com/ocw" alt="" />
        <p>Just a clone of Instagram</p>
        <div className="mt-14">
          {Object.values(providers).map((provider) => {
            return (
              <div key={provider.name}>
                <button
                  className="p-3 rounded-lg text-white bg-blue-400"
                  onClick={() =>
                    signIntoProvider(provider.id, { callbackUrl: "/" })
                  }
                >
                  Sign in with {provider.name}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps(context) {
  const providers = await getProviders();
  return {
    props: {
      providers,
    },
  };
}

export default signin;
