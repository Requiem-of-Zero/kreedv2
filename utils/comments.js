export async function fetchComments(movieId, setComments) {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/movie/${movieId}`
  ).then((res) => res.json());
  setComments(data);
}

export async function createComment(data, currentUser, currentMovie, setComments, setComment, refreshData, router) {
  try {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/createComment`, {
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    }).then(() => {
      setComment({
        authorName: currentUser.email,
        authorId: currentUser.uid,
        movieId: currentMovie.id,
        content: "",
        createdAt: new Date(),
        id: 0,
      });
      refreshData(router);
      fetchComments(currentMovie.id, setComments);
    });
  } catch (error) {
    console.log(error);
  }
}