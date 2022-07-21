import React from "react";
import { useEffect } from "react";
import { faker } from "@faker-js/faker";
import Story from "./Story";
import { useSession } from "next-auth/react";

const Stories = () => {
  const [suggestions, setSuggestions] = React.useState([]);
  const { data: session } = useSession();
  useEffect(() => {
    const suggestions = [
      {
        address: faker.address.streetAddress(),
        avatar: faker.image.avatar(),
        username: faker.internet.userName(),
        company: faker.company.companyName(),
        email: faker.internet.email(),
        id: 1,
      },
      {
        address: faker.address.streetAddress(),
        avatar: faker.image.avatar(),
        username: faker.internet.userName(),
        company: faker.company.companyName(),
        email: faker.internet.email(),
        id: 2,
      },
      {
        address: faker.address.streetAddress(),
        avatar: faker.image.avatar(),
        username: faker.internet.userName(),
        company: faker.company.companyName(),
        email: faker.internet.email(),
        id: 3,
      },
      {
        address: faker.address.streetAddress(),
        avatar: faker.image.avatar(),
        username: faker.internet.userName(),
        company: faker.company.companyName(),
        email: faker.internet.email(),
        id: 4,
      },
      {
        address: faker.address.streetAddress(),
        avatar: faker.image.avatar(),
        username: faker.internet.userName(),
        company: faker.company.companyName(),
        email: faker.internet.email(),
        id: 5,
      },
      {
        address: faker.address.streetAddress(),
        avatar: faker.image.avatar(),
        username: faker.internet.userName(),
        company: faker.company.companyName(),
        email: faker.internet.email(),
        id: 6,
      },
      {
        address: faker.address.streetAddress(),
        avatar: faker.image.avatar(),
        username: faker.internet.userName(),
        company: faker.company.companyName(),
        email: faker.internet.email(),
        id: 7,
      },
      {
        address: faker.address.streetAddress(),
        avatar: faker.image.avatar(),
        username: faker.internet.userName(),
        company: faker.company.companyName(),
        email: faker.internet.email(),
        id: 8,
      },
      {
        address: faker.address.streetAddress(),
        avatar: faker.image.avatar(),
        username: faker.internet.userName(),
        company: faker.company.companyName(),
        email: faker.internet.email(),
        id: 9,
      },
      {
        address: faker.address.streetAddress(),
        avatar: faker.image.avatar(),
        username: faker.internet.userName(),
        company: faker.company.companyName(),
        email: faker.internet.email(),
        id: 10,
      },
      {
        address: faker.address.streetAddress(),
        avatar: faker.image.avatar(),
        username: faker.internet.userName(),
        company: faker.company.companyName(),
        email: faker.internet.email(),
        id: 11,
      },
      {
        address: faker.address.streetAddress(),
        avatar: faker.image.avatar(),
        username: faker.internet.userName(),
        company: faker.company.companyName(),
        email: faker.internet.email(),
        id: 12,
      },
    ];
    setSuggestions(suggestions);
    return () => {};
  }, []);

  return (
    <div className="flex  space-x-2 p-6 rounded-sm border border-gray-200 overflow-x-scroll scrollbar-thin scrollbar-thumb-black">
      {session && (
        <Story img={session.user.image} username={session?.user?.username} />
      )}
      {suggestions.map((profile) => (
        <Story
          key={profile.id}
          img={profile.avatar}
          username={profile.username}
        />
      ))}
    </div>
  );
};

export default Stories;
