import React from "react";
import { useAppSelector } from "../../app/hooks";
import { selectAuth, LoginStatus } from "../Login/authslice";
import { useState } from "react";
import axios from "axios";

export function Note() {
  const auth = useAppSelector(selectAuth);
  const [handleNotes] = useState("");


  //  Set config defaults when creating the instance
  const instance = axios.create({ baseURL: 'https://60b793ec17d1dc0017b8a6bc1.mockapi.io/users/{user_id}' });
  instance.defaults.headers.common['Authorization'] = auth;

  const handleSubmitNotes = (e) => {
      e.preventDefault();

    instance({
      method: 'put',
      timeout: 5000, // 5 seconds timeout,
      data: {
        data: e
      },
    })
      .then((response) => {
        // For testing
        console.log(response.data);
      })
      .catch((error) => console.error(error));
  };

  if (auth.status !== LoginStatus.LOGGED_IN) return null;
  const {
    apiToken,
    user: { id: userId },
  } = auth;

  return (
    <div>
      <form onSubmit={handleSubmitNotes}>
        <textarea
          placeholder="Note goes here..."
          name="keynotes"
          onChange={(e) => handleNotes(e.target.value)}
        ></textarea>

        <br />
        <button type="submit"> submit</button>
      </form>
    </div>
  );
}
