import { useEffect, useState } from 'react';

import Player from './types/Player';
import { TablePlayers } from './components/TablePlayers/TablePlayers';

const App: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>(JSON.parse(sessionStorage.getItem('players') || '[]'));
  const [isByGrowthSort, setIsByGrowthSort] = useState<boolean>(JSON.parse(sessionStorage.getItem('orderSort') || 'true'));

  useEffect(() => {
    const eventSource = new EventSource('http://localhost:5000');

    eventSource.onmessage = function(event) {
      const newPlayer = JSON.parse(event.data);

      setPlayers(currentPlayers => {
        sessionStorage.setItem('players', JSON.stringify([...currentPlayers, newPlayer]));
        return [...currentPlayers, newPlayer]
      });
    }

    eventSource.onerror = function() {
      console.warn("Error while getting player");
      eventSource.close();
    }
  }, []);

  const orderSortHandler = () => {
    setIsByGrowthSort(() => {
      sessionStorage.setItem('orderSort', JSON.stringify(!isByGrowthSort));

      return !isByGrowthSort;
    });
  };

  return (
    <div className="App">
      <TablePlayers
        preparedPlayers={[...players.sort((a, b) => isByGrowthSort ? a.score - b.score : b.score - a.score)]}
        isByGrowthSort={isByGrowthSort}
        orderSortHandler={orderSortHandler}
      />
    </div>
  );
}

export default App;
