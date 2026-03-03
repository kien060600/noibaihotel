export interface Room {
    id: string;
    slug: string;
    name: string;
    price: number;
    size: number;
    capacity: string;
    bedType: string;
    view: string;
    image: string;
    images: string[];
    description: string;
    amenities: string[];
}

export const rooms: Room[] = [
    {
        id: '1',
        slug: 'superior-room',
        name: 'Superior Room',
        price: 1500000,
        size: 28,
        capacity: '2 Người Lớn',
        bedType: '1 Giường Đôi / 2 Giường Đơn',
        view: 'Thành Phố',
        image: '/images/room1/566856361.jpg',
        images: [
            '/images/room1/566856361.jpg',
            '/images/room1/566858978.jpg',
            '/images/room1/566859000.jpg',
            '/images/room1/592382826.jpg',
            '/images/room1/592382975.jpg'
        ],
        description: 'Phòng Superior mang đến không gian nghỉ ngơi thư giãn với thiết kế tối giản, ngập tràn ánh sáng tự nhiên. Các trang thiết bị cơ bản đi kèm đầy đủ, đảm bảo kỳ lưu trú thoải mái và tiện nghi.',
        amenities: ['Wifi Miễn Phí', 'TV Màn Hình Phẳng', 'Mini Bar', 'Điều Hòa', 'Phòng Tắm Đứng', 'Két Sắt']
    },
    {
        id: '2',
        slug: 'deluxe-city-view',
        name: 'Deluxe City View',
        price: 2200000,
        size: 35,
        capacity: '2 Người Lớn, 1 Trẻ Em',
        bedType: '1 Giường King',
        view: 'Panorama Thành Phố',
        image: '/images/room2/498246350.jpg',
        images: [
            '/images/room2/498246350.jpg'
        ],
        description: 'Nâng tầm trải nghiệm với phòng Deluxe City View. Tầm nhìn thoáng đãng ngắm nhìn nhịp sống sôi động của thành phố. Thiết kế kết hợp giữa sự sang trọng và ấm cúng.',
        amenities: ['Wifi Miễn Phí', 'Smart TV 55"', 'Bồn Tắm Nằm', 'Máy Pha Cà Phê', 'Ăn Sáng Miễn Phí', 'Áo Choàng Tắm']
    },
    {
        id: '3',
        slug: 'executive-suite',
        name: 'Executive Suite',
        price: 4500000,
        size: 65,
        capacity: '2 Người Lớn, 2 Trẻ Em',
        bedType: '1 Giường Super King',
        view: 'Thành Phố Tuyệt Đẹp',
        image: '/images/room-vip/567364470.jpg',
        images: [
            '/images/room-vip/567364470.jpg'
        ],
        description: 'Chốn bồng lai tiên cảnh giữa lòng thành phố. Executive Suite sở hữu không gian phòng khách riêng biệt, thiết kế cao cấp bậc nhất và dịch vụ quản gia 24/7 độc quyền. Lựa chọn tuyệt vời cho kỳ nghỉ kỷ niệm hoặc gia đình.',
        amenities: ['Đưa Đón Sân Bay', 'Dịch Vụ Quản Gia', 'Phòng Khách Riêng', 'Bồn Tắm Jacuzzi', 'Rượu Vang Chào Mừng', 'Buffet Sáng Cao Cấp']
    }
];

export const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
};
