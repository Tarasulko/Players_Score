import React from 'react';
import classNames from 'classnames';
import { Table } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import './TablePlayers.css';
import Player from '../../types/Player';
import { TableRow } from '../TableRow/TableRow';

type Props = {
  preparedPlayers: Player[],
  isByGrowthSort: boolean,
  orderSortHandler: () => void,
}

export const TablePlayers: React.FC<Props> = ({
  preparedPlayers,
  isByGrowthSort,
  orderSortHandler
}) => (
  <Table striped bordered hover>
    <thead>
      <tr>
        <td colSpan={2}>
          {`Total count: ${preparedPlayers.length}`}
        </td>
      </tr>
      <tr>
        <th scope="col">Player Name</th>
        <th scope="col">
          <label htmlFor="sort-btn">
            Score
            <button
              type="button"
              id="sort-button"
              className={classNames(
              {'arrow-down': !isByGrowthSort}
              )}
              onClick={() => orderSortHandler()}
            ></button>
          </label>
        </th>
      </tr>
    </thead>
    <tbody>
        {preparedPlayers.map((currentPlayer: Player, index: number) => {
          const {player, score} = currentPlayer;

          return (
            <tr key={index}>
              <TableRow
                player={player}
                score={score}
              />
            </tr>
          )
        })}
      </tbody>
  </Table>
);
