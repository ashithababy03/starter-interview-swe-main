import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { selectAuth, LoginStatus } from '../Login/authslice';
import { useState } from 'react';
import axios from 'axios';



export function Note() {
  const auth = useAppSelector(selectAuth);
  const [noteState, setNoteState] = useState("");

  if (auth.status !== LoginStatus.LOGGED_IN) return null;
  const { apiToken, user } = auth;

  //  Set config defaults when creating the instance
  const instance = axios.create({ baseURL: 'https://60b793ec17d1dc0017b8a6bc.mockapi.io/users/' + user.id });
  // need to specify api token specifically using Bearer
  instance.defaults.headers.common['Authorization'] = `Bearer ${apiToken}`;
  const handleSubmitNotes = (e) => {
      e.preventDefault();

    instance({
      method: 'put',
      timeout: 5000, // 5 seconds timeout,
      data: {
        ...user, // need to provide the original user object so we don't overwrite e.g. the name
        note: noteState,
      },
    })
      .then((response) => {
        // For testing
        console.log(response.data);
      })
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <form onSubmit={handleSubmitNotes}>
        <textarea
          placeholder="Note goes here..."
          name="keynotes"
          defaultValue={user.note} // display the user's original note
          onChange={(e) => setNoteState(e.target.value)}
        ></textarea>

        <br />
        <button type="submit"> submit</button>
      </form>
    </div>
  );
}
