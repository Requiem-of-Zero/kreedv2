export async function fetchComments(movieId, setComments) {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/movie/${movieId}`
  ).then((res) => res.json());
  setComments(data);
}

