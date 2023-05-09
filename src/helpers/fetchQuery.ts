export async function fetcher(query: string) {
  const url = 'https://rickandmortyapi.com/graphql';
  const r = await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: query,
    }),
  });
  return await r.json();
}
