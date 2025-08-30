/**
 * Parses a string of bounties, typically from AI output, into a JSON array.
 * @param {string} bountiesText - The raw text containing the list of bounties.
 * @returns {Array<Object>} A list of bounty objects, each with a 'title' and 'id'.
 */
const parseBounties = (bountiesText) => {
  if (!bountiesText) {
    return [];
  }

  // Split the text by newlines and filter out any empty lines.
  const lines = bountiesText.split('\n').filter(line => line.trim() !== '');

  // Map each line to an object with a title and a unique ID.
  const bounties = lines.map((line, index) => {
    // Clean up the line by removing markdown list characters like *, -, or numbers.
    const title = line.replace(/^[\d.*-]+\s*/, '').trim();
    return {
      id: `bounty-${index + 1}`,
      title: title,
    };
  });

  return bounties;
};

module.exports = {
  parseBounties,
};