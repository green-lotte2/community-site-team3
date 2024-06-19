import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Moment from "moment";
import { globalPath } from "globalPaths";
import authSlice from "slices/authSlice";

const url = globalPath.path;

const ArticleView = () => {
  const { ano } = useParams();
  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    axios
      .get(`${url}/articles/${ano}`)
      .then((response) => {
        setArticle(response.data);
      })
      .catch((error) => {
        console.error("Failed to fetch the article:", error);
      });

    axios
      .get(`${url}/articles/${ano}/comments`)
      .then((response) => {
        setComments(response.data);
      })
      .catch((error) => {
        console.error("Failed to fetch comments:", error);
      });
  }, [ano]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    const uid = authSlice.uid;
    axios
      .post(`${url}/articles/comments/${ano}`, { content: newComment, uid })
      .then(() => {
        setNewComment("");
        return axios.get(`${url}/articles/comments/${ano}`);
      })
      .then((response) => {
        setComments(response.data);
      })
      .catch((error) => {
        console.error("Failed to post comment:", error);
      });
  };

  if (!article) {
    return <div>Loading...</div>;
  }

  return (
    <div className="article-view">
      <h2>{article.title}</h2>
      <div dangerouslySetInnerHTML={{ __html: article.content }}></div>
      <div className="article-details">
        <p>작성자: {article.uid}</p>
        <p>작성일: {Moment(article.rdate).format("YYYY-MM-DD")}</p>
        <p>조회수: {article.hit}</p>
      </div>
      <div className="comments-section">
        <h3>댓글</h3>
        <form onSubmit={handleCommentSubmit}>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="댓글을 입력하세요"
            required
          ></textarea>
          <button type="submit">댓글 작성</button>
        </form>
        <div className="comments-list">
          {comments.map((comment) => (
            <div key={comment.id} className="comment">
              <p>{comment.content}</p>
              <p>작성자: {comment.uid}</p>
              <p>작성일: {Moment(comment.rdate).format("YYYY-MM-DD")}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArticleView;