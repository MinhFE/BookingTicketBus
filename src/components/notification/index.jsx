import { notification } from 'antd';

export const openNotificationWithIcon = (type, desc) => {
  notification[type]({
    message: 'Thông báo!!.',
    description: desc
  });
};