import React from 'react';

import classes from './Genres.module.scss';

function Genres(props: {
  className?: string;
  genres: {
    id: string;
    name: string;
    color: string;
  }[];
}) {
  return (
    <div className={[classes.Genres, props.className].join(' ')}>
      {props.genres.map(genre => (
        <span style={{ backgroundColor: genre.color }} key={genre.id} className={classes.Genre}>
          {genre.name}
        </span>
      ))}
    </div>
  );
}

export default Genres;
