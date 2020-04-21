export const calculateTimeframe = (params) => {
  let allTimes = [];
  let timeToShow;

  params.trips.forEach((trip) => {
    allTimes.push(
      params.timeframe === "earliest" ? trip.startTime : trip.endTime
    );
  });

  timeToShow =
    params.timeframe === "earliest"
      ? Math.min(...allTimes)
      : Math.max(...allTimes);

  if (timeToShow && timeToShow !== Infinity && timeToShow !== -Infinity) {
    timeToShow = new Date(timeToShow * 1000).toISOString().substr(15, 4);
  }
  return timeToShow;
};

export const calculateWidth = (startTime, endTime) => {
  const tripWidth = endTime - startTime;
  return tripWidth;
};
