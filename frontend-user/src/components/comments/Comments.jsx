import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Comments(props) {
  const [comment, setComment] = useState("");
  const [allCommentsArray, setAllCommentsArray] = useState([]);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const handleCommentFormSubmit = async (e) => {
    try {
      e.preventDefault();

      // get userId and token
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");

      if (!userId) {
        // redirect to login
        navigate("/login");
        return;
      }

      const postId = props.postId;
      const content = comment;

      const res = await axios.post(
        `http://localhost:3000/comments/createComment/${postId}`,
        { content },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      //   add the new comment to the start
      setAllCommentsArray((prevArray) => [
        res.data.createdComment,
        ...prevArray,
      ]);

      //   clear the field
      setComment("");
      alert("Comment Added Successfully");
    } catch (err) {
      console.log(`An error occurred while creating comment: ${err}`);
    }
  };

  //   here, we handle backend deletion and frontend deletion seperately (and since frontend fetches data from backend on mount, so this separate frontend deletion handling is only for the purpose of instant display updation)
  const handleDeleteComment = async (commentId) => {
    try {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");

      if (!userId) {
        navigate("/login");
        return;
      }

      const res = await axios.delete(
        `http://localhost:3000/comments/deleteComment/${commentId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.status === 200) {
        // delete from frontend also
        setAllCommentsArray((prevArray) =>
          prevArray.filter((comment) => comment._id !== commentId)
        );
      }
    } catch (err) {
      console.log(`An error occurred while deleting comment: ${err}`);
    }
  };

  const handleUpdateComment = (commentId, comment) => {
    const data = { commentId: commentId, comment: comment };
    navigate("/comments/updateComment", {
      state: data,
    });
  };

  const handleOnChange = (e) => {
    setComment(e.target.value);
  };

  // used for fetching all comments
  useEffect(() => {
    async function fetchComments() {
      try {
        const postId = props.postId;
        const res = await axios.get(`http://localhost:3000/comments/${postId}`);

        setAllCommentsArray(res.data.allComments);
      } catch (err) {
        console.log(`An error Occurred while fetching comments: ${err}`);
      }
    }

    fetchComments();
  }, []);

  return (
    <div>
      <h1>Comments</h1>
      <form onSubmit={handleCommentFormSubmit}>
        <input
          type="text"
          name="comment"
          id="comment"
          placeholder="Write a comment"
          onChange={handleOnChange}
          value={comment}
        ></input>
        <button type="submit">Add Comment</button>
      </form>

      {allCommentsArray.map((comment) => {
        return (
          <div key={comment._id}>
            <p>username: {comment.userId.username}</p>
            <p>comment: {comment.content}</p>
            <p>created at: {comment.createdAt}</p>
            {userId === comment.userId._id && (
              <div>
                <button
                  onClick={() =>
                    handleUpdateComment(comment._id, comment.content)
                  }
                >
                  Update
                </button>
                <button onClick={() => handleDeleteComment(comment._id)}>
                  Delete
                </button>
              </div>
            )}
            <p>
              ----------------------------------------------------------------
            </p>
          </div>
        );
      })}
    </div>
  );
}

export default Comments;
