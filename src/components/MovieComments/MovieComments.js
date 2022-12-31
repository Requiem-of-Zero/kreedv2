const MovieComments = ({ comments }) => {
  return (
    <div className="flex flex-col items-center ">
      <h1>Comments</h1>
      <ul className="comments-list">
        {comments.length ? (
          comments.map((comment) => {
            return <li>{comment.content}</li>;
          })
        ) : (
          <div>
            <p>There are no comments...</p>
          </div>
        )}
      </ul>
    </div>
  );
};

export default MovieComments;
