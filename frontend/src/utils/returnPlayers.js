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
  
  const sortPlayer = (x,y) => {
    if(x[sort]>y[sort]) return -1
    if(x[sort]<y[sort]) return 1
}

const returned = (event, idx) => {
  let start = (curPage-1)*pageSize
  let end = curPage*pageSize
  if(idx >= start && idx < end) return true
}
const originalPlayers = filteredPlayers
.sort(sortPlayer)
.filter(player => +(player.nowCost).toFixed(1)<=cutPrice)
.filter(player => player.appName.toLowerCase().startsWith(word?.toLowerCase()))

const returnedPlayers =
originalPlayers
.filter(returned)

  
  return {originalPlayers, returnedPlayers};
};

export default returnPlayers;
