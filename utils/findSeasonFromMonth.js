const findSeasonFromMonth = (month) => {
  let [season, numMonth] = ['', +month];

  if(numMonth >= 3 && numMonth < 6){
    season = 'Spring'
  } else if (numMonth >= 6 && numMonth < 9){
    season = 'Summer'
  } else if (numMonth >= 9 && numMonth < 12){
    season = 'Fall'
  } else {
    season = 'Winter'
  }

  return season
}

export default findSeasonFromMonth