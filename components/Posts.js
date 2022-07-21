import { faker } from "@faker-js/faker";
import React from "react";
import Post from "./Post";
import { db } from "../firebase";
import { onSnapshot, collection, orderBy, query } from "@firebase/firestore";

const Posts = () => {
  const [posts, setPosts] = React.useState([]);

  React.useEffect(
    () =>
      onSnapshot(
        query(collection(db, "posts"), orderBy("timestamp", "desc")),
        (snapshot) => {
          setPosts(snapshot.docs);
        },
      ),
    [db],
  );
  return (
    <div>
      {posts.map((post) => {
        return (
          <Post
            key={post.id}
            id={post.id}
            username={post.data().username}
            image={post.data().image}
            caption={post.data().caption}
            userImage={post.data().profileImage}
          />
        );
      })}
    </div>
  );
};

export default Posts;
