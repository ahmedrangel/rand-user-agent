interface IntervalArray {
  [key: string]: { minIndex: number, maxIndex: number };
}

interface FrequencyJson {
  [key: string]: { [key: string]: number };
}

interface IntervalJson {
  [key: string]: IntervalArray;
}

export const randomElement = function (array: IntervalArray): string {

  /* Gets a random element from an array */
  let index = Math.floor(
    Math.random() * (array[Object.keys(array).pop() as any].maxIndex + 1)
  );
  for (let [userAgent, indexes] of Object.entries(array)) {
    if (index >= indexes.minIndex && index <= indexes.maxIndex) {
      return userAgent;
    }
  }
  return "No Agent Found";
};

export const JSONIsFrequency = function (json: FrequencyJson): boolean {
  /*
    Checks the format of a given json.
    If the first value of the first property is not a number
    then it will return true as the json has the format
    { deviceType: { userAgent: frequency }}
    */
  if (Object.keys(json).length === 0) return false;
  const [, frequency] = Object.entries(json[Object.keys(json)[0]])[0];
  return !isNaN(frequency);
};


export const JSONfrequency = function (
  content: IntervalJson
): FrequencyJson {
  /*
    Transforms an interval json to a frequency json. So for example if you have
    a json in the format { deviceType: { userAgent: {minIndex: 0, maxIndex: 5} }}
    it will become { deviceType: { userAgent: 5 }}
    */
  let contentParsed: FrequencyJson = {};
  for (let key in content) {
    contentParsed[key] = {};
    for (let [userAgent, indexes] of Object.entries(content[key])) {
      contentParsed[key][userAgent] = indexes.maxIndex - indexes.minIndex + 1;
    }
  }
  return contentParsed;
};

export const JSONfrequencyNormalize = function (
  content: FrequencyJson
): FrequencyJson {
  /*
    Sometimes a user agent might have a frequency too big.
    To prevent that user agent from being returned most of the times, we should normalize
    the frequency values, in a way so that all user agents might show up. For this
    we replace the frequency value with the position the freqeuency is in the sorted array
    of all values. So for example if we have the following frequencies for various user agents:
    [1, 1, 2, 5, 100] we will associate for the user agents with frequency 1, the value 1,
    for the ones with 2, 2, for the ones with 5 the value 3 and for the ones with 100 the value 4
    */
  let contentParsed: FrequencyJson = {};
  for (let key in content) {
    contentParsed[key] = {};
    let sortedFrequencies = Array.from(
      new Set(Object.values(content[key]))
    ).sort();
    for (let [userAgent, frequency] of Object.entries(content[key])) {
      contentParsed[key][userAgent] = sortedFrequencies.indexOf(frequency) + 1;
    }
  }
  return contentParsed;
};

export const JSONinterval = function (content: FrequencyJson): IntervalJson {
  /*
    Transforms a frequency json to an interval json. So, for example, if you have
    a json in the format { deviceType: { userAgent: 5 }}
    it will become { deviceType: { userAgent: {minIndex: 0, maxIndex: 5} }}
    */
  let contentParsed: IntervalJson = {};
  for (let key in content) {
    contentParsed[key] = {};
    let minIndex = 0;
    for (let [userAgent, frequency] of Object.entries(content[key])) {
      contentParsed[key][userAgent] = {
        minIndex: minIndex,
        maxIndex: minIndex + frequency - 1
      };
      minIndex = minIndex + frequency;
    }
  }
  return contentParsed;
};

