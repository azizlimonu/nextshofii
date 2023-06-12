import { useRouter } from "next/router";


// function to create multiple query to filter in mongoDB
export const createRegex = (data, styleRegex) => {
  if (data.length > 1) {
    for (var i = 1; i < data.length; i++) {
      styleRegex += `|^${data[i]}`;
    }
  }
  return styleRegex;
}

// function to check if query have store in url
export const IsQueryChecked = (queryName, value) => {
  const router = useRouter();
  if (router.query[queryName]?.search(value) !== -1) {
    return true;
  } else {
    return false;
  }
};

// function to replace query so the multiple query isnt duplicate
export const OldReplaceQuery = (queryName, value) => {
  const router = useRouter();
  // Get the existing query parameter value
  const existedQuery = router.query[queryName];
  // Search for the provided value within the existing query value
  const valueCheck = existedQuery?.search(value);
  // Search for the search value within the existing query value
  const _check = existedQuery?.search(`_${value}`);

  let result = '';

  // If the existing query value is truthy (not null or undefined)
  if (existedQuery) {
    // If the existing query value is equal to the provided value
    if (existedQuery == value) {
      // Set the result as an empty object
      result = {};
    } else {
      // If the value query is exist
      if (valueCheck !== -1) {
        // If the search value is found within the existing query value
        if (_check !== -1) {
          // Remove the search value from the existing query value
          result = existedQuery?.replace(`_${value}`, '');
        // If the provided value is at the beginning of the existing query value
        } else if (valueCheck == 0) {
          // Remove the provided value from the existing query value
          result = existedQuery?.replace(`${value}_`, '');
        } else {
          // Remove the provided value from the existing query value
          result = existedQuery?.replace(value, '');
        }
      } else {
        // Append the provided value to the existing query value
        result = `${existedQuery}_${value}`;
      }
    }
  } else {
    // Set the result as the provided value since the existing query value is falsy (null or undefined)
    result = value;
  }

  return {
    // The modified query parameter value
    result,
    // Check if the existing query value is truthy and the provided value is found within it
    active: existedQuery && valueCheck !== -1 ? true : false,
  };
};

// this function not working properly
export const ReplaceQuery = (queryName, value) => {
  const router = useRouter();
  // Get the existing query parameter value or use an empty string if it doesn't exist
  const existedQuery = router.query[queryName] || '';
  // Create a search value by appending an underscore to the provided value
  const searchValue = `_${value}`;

  let result = existedQuery;

  // If the existing query value is equal to the provided value
  if (existedQuery === value) {
    // Set the result as an empty string
    result = '';
    // If the search value is found within the existing query value
  } else if (existedQuery.includes(searchValue)) {
    // Remove the search value from the existing query value
    result = existedQuery.replace(searchValue, '');
  } else {
    // Append the provided value to the existing query value
    result = `${existedQuery}_${value}`;
  }

  return {
    // The modified query parameter value
    result,
    // Check if the existing query value includes the provided value or the search value
    active: existedQuery.includes(value) || existedQuery.includes(searchValue),
  };
};