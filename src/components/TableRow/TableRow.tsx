import React from 'react';

type Props = {
  player: string,
  score: number,
};

export const TableRow: React.FC<Props> = ({ player, score }) => {
  return (
    <>
      <td>{player}</td>
      <td>{score}</td>
    </>
  )
};
