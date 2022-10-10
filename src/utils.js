export const formatSummary = (summary, showShortened = true) => {
  const regex = /(<([^>]+)>)/gi;
  const withoutTags = summary.replace(regex, "");

  if (showShortened) {
    const shortened =
      withoutTags.length > 240
        ? `${withoutTags.substr(0, 240)}...`
        : withoutTags;

    return shortened;
  }

  return withoutTags;
};

export const formatDate = (dateStr) => {
  // Format: Month D, Yr
  const MONTHS = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const [year, month, date] = dateStr.split("-");

  return `${MONTHS[+month + 1]} ${date}, ${year}`;
};
