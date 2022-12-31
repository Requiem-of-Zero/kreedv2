import CommentItem from "./CommentItem";

const MovieComments = ({ comments }) => {
  return (
    <div className="flex flex-col mx-auto w-[80%]">
      <h1 className="text-white/50 py-3 text-center">Comments</h1>
      <ul className="comments-list">
        {comments.length ? (
          comments.map((comment) => {
            return <li><CommentItem {...comment}/></li>;
          })
        ) : (
          <div className="py-4 text-white/50">
            <p className='text-center'>There are no comments...</p>
          </div>
        )}
      </ul>
    </div>
  );
};

export default MovieComments;
