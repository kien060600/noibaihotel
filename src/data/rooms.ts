export interface Room {
    id: string;
    slug: string;
    name: string;
    price: number;
    size: number | string;
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
        name: 'Phòng tiết kiệm',
        price: 400000,
        size: 17,
        capacity: '2 Người Lớn',
        bedType: '1 Giường Đơn',
        view: 'Thành Phố',
        image: '/images/room1/z7620978305474_f3b62a781a37d9e64d1fd7fa2905e08a.jpg',
        images: [
            '/images/room1/z7620978305474_f3b62a781a37d9e64d1fd7fa2905e08a.jpg'
        ],
        description: 'Phòng tiết kiệm với thiết kế tối giản, tiện nghi đầy đủ, phù hợp cho một giấc ngủ yên tĩnh',
        amenities: ['Wifi Miễn Phí', 'TV Màn Hình Phẳng', 'Điều Hòa', 'Nhà tắm riêng']
    },
    {
        id: '2',
        slug: 'deluxe-city-view',
        name: 'Deluxe City View',
        price: 800000,
        size: '22 - 30',
        capacity: '4 Người Lớn, 1 Trẻ Em',
        bedType: '1 Giường King - 2 giường đơn',
        view: 'Panorama Thành Phố',
        image: '/images/room2/z7621069390068_a9e3ce70eb3f05dc916464985d8ee72b.jpg',
        images: [
            '/images/room2/z7621069390068_a9e3ce70eb3f05dc916464985d8ee72b.jpg',
            '/images/room2/498246350.jpg',
            '/images/room2/z7621070355560_35d935466ed5f43722409fc55f5f0605.jpg'
        ],
        description: 'Nâng tầm trải nghiệm với phòng Deluxe City View. Tầm nhìn thoáng đãng ngắm nhìn nhịp sống sôi động của thành phố. Thiết kế kết hợp giữa sự sang trọng và ấm cúng.',
        amenities: ['Wifi Miễn Phí', 'Smart TV 55"', 'Bồn Tắm Nằm', 'Máy Pha Cà Phê', 'Ăn Sáng Miễn Phí']
    },
    {
        id: '3',
        slug: 'executive-suite',
        name: 'Executive Suite',
        price: 550000,
        size: 22,
        capacity: '2 Người Lớn, 2 Trẻ Em',
        bedType: '1 Giường Super King',
        view: 'Thành Phố Tuyệt Đẹp',
        image: '/images/room-vip/z7621073350652_008d9deba4296b90f4664da1daa31af5.jpg',
        images: [
            '/images/room-vip/z7621073350652_008d9deba4296b90f4664da1daa31af5.jpg',
            '/images/room-vip/567364470.jpg',
            '/images/room-vip/z7621073328842_a0e3284e64e94c793e2f4b7cb39d3f44.jpg',
            '/images/room-vip/z7621073333633_efd1301f8a14291a0720fcdf929f7f11.jpg',
            '/images/room-vip/z7621073346980_8a109d2816ccd14816cf1c216faa8be2.jpg'
        ],
        description: 'Phòng nghỉ phổ thông: Không gian đơn giản, sạch sẽ với các tiện nghi cơ bản, phù hợp cho nhu cầu nghỉ ngơi thoải mái với chi phí hợp lý',
        amenities: ['Wifi Miễn Phí', 'Smart TV 55"', 'Ăn Sáng Miễn Phí']
    }
];

export const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
};
