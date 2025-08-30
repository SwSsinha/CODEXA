/**
 * Parses a clean, newline-separated string of bounties from AI output into a JSON array.
 * @param {string} bountiesText - The raw text containing the list of bounties, one per line.
 * @returns {Array<Object>} A list of bounty objects, each with a unique 'id' and a 'title'.
 */
const parseBounties = (bountiesText) => {
  // Return an empty array if the input is null, undefined, or an empty string.
  if (!bountiesText) {
    return [];
  }

  // Split the text by newlines and filter out any resulting empty lines.
  const lines = bountiesText.split('\n').filter(line => line.trim() !== '');

  // Map each clean line to an object with a unique ID and the task title.
  const bounties = lines.map((line, index) => {
    return {
      id: `bounty-${index + 1}`,
      title: line.trim(), // We just need to trim whitespace now.
    };
  });

  return bounties;
};

module.exports = {
  parseBounties,
};