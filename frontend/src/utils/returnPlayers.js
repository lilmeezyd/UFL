const returnPlayers = (
  players,
  sort,
  view,
  word,
  curPage,
  pageSize,
  cutPrice
) => {
  const filteredPlayers = [];
  let id;
  if (view.startsWith("position")) {
    id = view.slice(9);
    filteredPlayers.push(...players.filter((x) => x.playerPosition === id));
  } else if (view.startsWith("team")) {
    id = view.slice(5);
    filteredPlayers.push(...players.filter((x) => x.playerTeam === id));
  } else {
    filteredPlayers.push(...players);
  }
  console.log(view);

  const goalkeepers = filteredPlayers.filter(
    (player) => player.playerPosition === 1
  );

  const defenders = filteredPlayers.filter(
    (player) => player.playerPosition === 2
  );

  const midfielders = filteredPlayers.filter(
    (player) => player.playerPosition === 3
  );

  const forwards = filteredPlayers.filter(
    (player) => player.playerPosition === 4
  );
  return filteredPlayers;
};

export default returnPlayers;
