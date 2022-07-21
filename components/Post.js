import React from "react";
import {
  BookmarkIcon,
  ChatIcon,
  DotsHorizontalIcon,
  EmojiHappyIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import {
  addDoc,
  setDoc,
  deleteDoc,
  doc,
  collection,
  onSnapshot,
  orderBy,
  serverTimestamp,
  query,
} from "@firebase/firestore";
import { db } from "../firebase";
import Moment from "react-moment";

import { HeartIcon as HeartIconFilled } from "@heroicons/react/solid";

const Post = ({ id, username, caption, image, userImage }) => {
  const { data: session } = useSession();

  const [comments, setComments] = React.useState([]);
  const [comment, setComment] = React.useState("");
  const [likes, setLikes] = React.useState([]);
  const [hasLiked, setHasLiked] = React.useState(false);

  React.useEffect(() => {
    console.log("db: ", db);
    console.log("id: ", id);
    onSnapshot(
      query(
        collection(db, "posts", id, "comments"),
        orderBy("timestamp", "desc"),
      ),
      (snapshot) => setComments(snapshot.docs),
    );
  }, [db, id]);

  const likePost = async () => {
    if (hasLiked) {
      await deleteDoc(doc(db, "posts", id, "likes", session.user.uid));
    } else {
      await setDoc(doc(db, "posts", id, "likes", session?.user.uid), {
        username: session?.user.username,
      });
    }
  };

  React.useEffect(() => {
    setHasLiked(likes.findIndex((like) => like.id === session?.user.uid) > -1);
  }, [likes]);

  React.useEffect(() => {
    onSnapshot(collection(db, "posts", id, "likes"), (snapshot) => {
      setLikes(snapshot.docs);
    });
  }, [db, id]);

  const sendComment = async (e) => {
    e.preventDefault();

    const commentToSend = comment;
    setComment("");
    await addDoc(collection(db, "posts", id, "comments"), {
      comment: commentToSend,
      username: session.user.username,
      userImage: session.user.image,
      timestamp: serverTimestamp(),
    });
  };
  return (
    <div className="bg-white my-7  border rounded-sm">
      <div className="flex items-center p-5">
        <img
          src={userImage}
          className="rounded-full h-12 w-12 object-contain border p-1 mr-3"
          alt=""
        />
        <p className="flex-1">{username}</p>
        <DotsHorizontalIcon className="h-5" />
      </div>
      {/* img  */}
      <img className="object-cover  w-full" src={image} alt="" />
      {/* Button */}
      {session && (
        <div className="flex justify-between px-4 pt-4">
          <div className="flex space-x-4">
            {hasLiked ? (
              <HeartIconFilled
                onClick={likePost}
                className="btn text-red-500"
              />
            ) : (
              <HeartIcon onClick={likePost} className="btn" />
            )}
            <ChatIcon className="btn" />
            <PaperAirplaneIcon className="btn" />
          </div>
          <BookmarkIcon className="btn" />
        </div>
      )}
      {/* caption */}
      <p className="p-5 truncate">
        {likes.length > 0 && (
          <p className="font-bold mb-1">{likes.length} likes</p>
        )}
        <span className="font-bold mr-1">{username} </span>
        {caption}
      </p>
      {/* Comments  */}
      {comments.length > 0 && (
        <div className="ml-10 h-20 overflow-y-scroll  scrollbar-thumb-black scrollbar-thin">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="flex  items-center space-x-2 md-5 py-2"
            >
              <img
                className="h-7  rounded-full"
                src={comment.data().userImage}
                alt=""
              />
              <p className="text-sm flex-1">
                <span className="font-bold">{comment.data().username}</span>
                {comment.data().comment}
              </p>
              <Moment className="text-sm pr-5" fromNow>
                {comment.data().timestamp?.toDate()}
              </Moment>
            </div>
          ))}
        </div>
      )}
      {/* input box */}
      {session && (
        <form action="" className="flex p-4">
          <EmojiHappyIcon className="h-7" />
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a  comment..."
            className="border-none flex-1 focus:ring-0 outline-none"
          />
          <button
            type={"submit"}
            disabled={!comment.trim()}
            className="font-semibold text-blue-400"
            onClick={(e) => sendComment(e)}
          >
            Post
          </button>
        </form>
      )}
    </div>
  );
};

export default Post;
