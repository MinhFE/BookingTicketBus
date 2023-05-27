export const MenuData = {
  data: [
    { id: 1, name: "Trang chủ", path: "/" },
    { id: 2, name: "Lịch Trình", path: "/lich-trinh" },
    { id: 3, name: "Tin Tức", path: "/tin-tuc" },
    { id: 4, name: "Tuyển Dụng", path: "/tuyen-dung" },
    { id: 5, name: "Liên Hệ", path: "/lien-he" },
    { id: 6, name: "Về Chúng Tôi", path: "/ve-chung-toi" },
  ],
};

export const MenuDataAdmin = {
  data: [
    { id: 1, name: "Quản lý xe", path: "/admin/manage-car" },
    { id: 2, name: "Quản lý vé xe", path: "/admin/manage-ticket" },
    { id: 3, name: "Quản lý bến xe", path: "/admin/manage-bus-station" },
    {
      id: 4,
      name: "Quản lý lịch trình",
      path: "/admin/manage-bus-information",
    },
    { id: 5, name: "Quản lý người dùng", path: "/admin/manage-user" },
    { id: 6, name: "Thống kê", path: "/admin/manage-statistical" },
    { id: 7, name: "Quản lý tuyển dụng", path: "/admin/manage-hire" },
    { id: 7, name: "Hồ sơ tuyển dụng", path: "/admin/manage-resume" },
  ],
};

export const MenuDataDriver = {
  data: [
    {
      id: 1,
      name: "Quản lý thông tin cá nhân",
      path: "/driver/manage-profile",
    },
    { id: 2, name: "Quản lý xe của tôi", path: "/driver/manage-my-car" },
    { id: 3, name: "Quản lý lịch trình", path: "/driver/manage-info-bus" },
  ],
};

export const dataBooking = {
  typePrice: [
    { label: "Thấp - Cao", value: "1" },
    { label: "Cao - Thấp", value: "2" },
  ],
  typeCar: [
    { label: "Ghế", value: "chair" },
    { label: "Giường", value: "bed" },
    { label: "Limousine", value: "limousine" },
  ],
  typeHours: [
    { label: "0h - 6h", value: "1" },
    { label: "6h -12h", value: "2" },
    { label: "12h - 18h", value: "3" },
    { label: "18h - 24h", value: "4" },
  ],
};

export const hire = {
  nameWork: [
    { label: "Tiếp viên tuyến", value: "Tiếp viên tuyến" },
    { label: "Lái xe tuyến", value: "Lái xe tuyến" },
    { label: "Lái xe trung chuyển", value: "Lái xe trung chuyển" },
    // { label: "Nhân viên bán vé", value: "Nhân viên bán vé" },
    // { label: "Nhân viên kinh doanh", value: "Nhân viên kinh doanh" },
    // { label: "Nhân viên kế toán", value: "Nhân viên kế toán" },
    // { label: "Thợ phụ ô tô", value: "Thợ phụ ô tô" },
    // { label: "Nhân viên rửa xe", value: "Nhân viên rửa xe" },
    // { label: "Nhân viên bán xăng", value: "Nhân viên bán xăng" },
    // { label: "Nhân viên kho", value: "Nhân viên kho" },
    // { label: "Thủ kho", value: "Thủ kho" },
    // { label: "Nhân viên thiết kế", value: "Nhân viên thiết kế" },
    // { label: "Nhân viên ngoại kiểm xe", value: "Nhân viên ngoại kiểm xe" },
    // { label: "Thợ đồng", value: "Thợ đồng" },
    // { label: "Thợ tiện", value: "Thợ tiện" },
    // { label: "Trợ lý kinh doanh", value: "Trợ lý kinh doanh" },
    // { label: "Nhân viên điều đồ", value: "Nhân viên điều đồ" },
    // { label: "Chuyên viên pháp lý", value: "Chuyên viên pháp lý" },
  ],
  levelWork: [
    { label: "Thực tập sinh", value: "Thực tập sinh" },
    { label: "Nhân viên", value: "Nhân viên" },
    // { label: "Trưởng nhóm/ Giám sát", value: "Trưởng nhóm/ Giám sát" },
    { label: "Quản lý", value: "Quản lý" },
    // { label: "Phó giám đốc", value: "Phó giám đốc" },
    // { label: "Giám đốc", value: "Giám đốc" },
    // { label: "Phó tổng giám đốc", value: "Phó tổng giám đốc" },
    // { label: "Tổng giám đốc", value: "Tổng giám đốc" },
    // { label: "Chuyên viên", value: "Chuyên viên" },
  ],
  formWork: [
    { label: "Nhân viên chính thức", value: "Nhân viên chính thức" },
    { label: "Nhân viên thời vụ", value: "Nhân viên thời vụ" },
    { label: "Nhân viên bán thời gian", value: "Nhân viên bán thời gian" },
  ],
  expWork: [
    { label: "Chưa có kinh nghiệm", value: "Chưa có kinh nghiệm" },
    { label: "0 - 1 năm", value: "0 - 1 năm" },
    { label: "1 - 2 năm", value: "1 - 2 năm" },
    { label: "2 - 3 năm", value: "2 - 3 năm" },
    { label: "3 - 4 năm", value: "3 - 4 năm" },
    { label: "4 - 5 năm", value: "4 - 5 năm" },
    { label: "Trên 5 năm", value: "Trên 5 năm kinh nghiệm" },
    { label: "Trên 10 năm", value: "Trên 10 năm kinh nghiệm" },
  ],
  locationWork: [
    { label: "TP. Hồ Chí Minh", value: "TP. Hồ Chí Minh" },
    { label: "Hà Nội", value: "Hà Nội" },
    { label: "Đà Nẵng", value: "Đà Nẵng" },
    { label: "Cần Thơ", value: "Cần Thơ" },
    { label: "Gia Lai", value: "Gia Lai" },
    // { label: "Đồng Nai", value: "Đồng Nai" },
    // { label: "An Giang", value: "An Giang" },
    // { label: "Bình Dương", value: "Bình Dương" },
    // { label: "Hải Phòng", value: "Hải Phòng" },
    // { label: "Hải Dương", value: "Hải Dương" },
    // { label: "Hà Nam", value: "Hà Nam" },
  ],
};
