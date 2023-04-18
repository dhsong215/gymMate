export const nowDate = () => {
  const currentDate = new Date(Date.now());
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const date = String(currentDate.getDate()).padStart(2, '0');
  return `${year}-${month}-${date}`;
};
