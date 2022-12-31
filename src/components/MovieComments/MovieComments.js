
const MovieComments = ({comments}) => {
  return (
    <div className='flex justify-center'>
      <h1>Comments</h1>
      <ul className='comments-list'>
        {comments.map((comment) => {
          return(
            <li>{comment.content}</li>
          )
        })}
      </ul>
    </div>
  )
}

export default MovieComments