import icons from "ultils/icons"
import path from "./path";

const {
    DashboardOutlinedIcon,
    AccountCircleOutlinedIcon,
    CategoryIcon,
    AirportShuttleIcon,
    LocalParkingIcon,
    BookIcon,
    ReportIcon,
    FeedbackIcon,
    MapIcon
} = icons;
export const sidebarItemData = [
    {
        id: 1,
        value: 'Bảng điều khiển',
        paths: `${path.DASHBOARD}`,
        icon: <DashboardOutlinedIcon size={20} />
    },
    {
        id: 2,
        value: 'Quản lý người dùng',
        paths: `/dashboard/userlist`,
        icon: <AccountCircleOutlinedIcon size={20} />
    },
    {
        id: 3,
        value: 'Quản lý phản hồi',
        paths: `/dashboard/feedback`,
        icon: <FeedbackIcon size={20} />
    },
    {
        id: 4,
        value: 'Quản lý loại xe',
        paths: `/dashboard/vehiclecategory`,
        icon: <CategoryIcon size={20} />
    },
    {
        id: 5,
        value: 'Quản lý xe',
        paths: `/dashboard/vehicle`,
        icon: <AirportShuttleIcon size={20} />
    },
    {
        id: 6,
        value: 'Quản lý chỗ đỗ xe',
        paths: `/dashboard/parkingslot`,
        icon: <LocalParkingIcon size={20} />
    },
    {
        id: 7,
        value: 'Quản lý đặt chỗ',
        paths: `/dashboard/booking`,
        icon: <BookIcon size={20} />
    },
    {
        id: 8,
        value: 'Quản lý đánh giá',
        paths: `/dashboard/report`,
        icon: <ReportIcon size={20} />
    },
    {
        id: 9,
        value: 'Sơ đồ chỗ đỗ xe',
        paths: `/dashboard/diagramparkingslot`,
        icon: <MapIcon size={20} />
    }
];

export const statusReportData = [
    { code: 0, value: 'Processing' },
    { code: 1, value: 'Completed' }
]

export const statusData = [
    { code: false, value: 'Hoạt động' },
    { code: true, value: 'Không hoạt động' }
]

export const roleUserData = [
    { code: 'MANAGER', value: 'MANAGER' },
    { code: 'DRIVER', value: 'DRIVER' }
]