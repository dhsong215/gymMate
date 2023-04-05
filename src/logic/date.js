export const nowDate = () => {
  const currentDate = new Date(Date.now());
  const datePart = currentDate.toLocaleDateString().split('/');
  return `${datePart[2]}-${
    datePart[0].length > 1 ? datePart[0] : '0' + datePart[0]
  }-${datePart[1].length > 1 ? datePart[1] : '0' + datePart[1]}`;
};
