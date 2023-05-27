const saveStringLocal = (key, value) => {
  sessionStorage.setItem(key, value);
};
// lưu localStorage value là chuỗi
const getStringLocal = (key) => {
  return sessionStorage.getItem(key);
};
// lưu localStorage value là object hoặc list object
const saveLocal = (key, value) => {
  let data = JSON.stringify(value);
  sessionStorage.setItem(key, data);
};
const getLocal = (key) => {
  let data = JSON.parse(sessionStorage.getItem(key));
  return data;
};
const removeLocal = (key) => {
  sessionStorage.removeItem(key);
};

export { saveStringLocal, getStringLocal, saveLocal, getLocal, removeLocal };
