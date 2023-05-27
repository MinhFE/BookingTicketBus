export const filterListAddress = (location, listAddress) => {
  let list = [];
  if (location) {
    listAddress.forEach((item) => {
      if (item.name !== location) {
        return list.push(item);
      }
    });
    return list;
  }
  return listAddress;
};
export const filterListAddressByCity = (location, listAddress) => {
  let list = [];
  if (location) {
    listAddress.forEach((item) => {
      if (item.id !== location) {
        return list.push(item);
      }
    });
    return list;
  }
  return listAddress;
};
export const filterListAddressByValue = (location, listAddress) => {
  let list = [];
  if (location) {
    listAddress.forEach((item) => {
      if (item.value !== location) {
        return list.push(item);
      }
    });
    return list;
  }
  return listAddress;
};

export const filterListAddressRepeat = (listAddress) => {
  // let list = [];

  // listAddress.forEach((item) => {
  //   if (list.length > 0) {
  //     list.forEach((el) => {
  //       if (!el.label.includes(item.label)) {
  //         list.push(item);
  //       }
  //     });
  //   } else {
  //     list.push(item);
  //   }
  // });
  // return list;
  const uniqueArr = listAddress.filter((item, index, self) => {
    return index === self.findIndex((obj) => obj.label === item.label);
  });
  return uniqueArr;
};
