const fetchCall = async (url: string, options: RequestInit = {}) => {
  const response = await fetch(url, options);
  return response.json();
};

const saveComment = async (name: string, message: string) => {
  const url = "/api/guestbook";

  return fetchCall(url, {
    method: "POST",
    body: JSON.stringify({ name, message }),
  });
};

const calls = { saveComment };

export default calls;
