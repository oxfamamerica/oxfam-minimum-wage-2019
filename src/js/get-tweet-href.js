export default function getTweetHref(stateData) {
  // Update twitter stuff
  const tweetMessage = `${stateData.senator1Twitter} ${stateData.senator2Twitter}: ${stateData.allCount} workers in ${stateData.districtName} could benefit from a $15 minimum wage. See this Oxfam report: http://oxfamamerica.org/raisethewage. It's time to `;
  const hashtag = "%23RaisetheWage"
  return (
    "https://twitter.com/home?status=" +
    encodeURI(tweetMessage) +
    hashtag
  );
}