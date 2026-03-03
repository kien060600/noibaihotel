import React from 'react';
import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
    children: React.ReactNode;
    title?: string;
    description?: string;
}

export default function Layout({
    children,
    title = "Noi Bai Airport Hotel | Khách sạn Tốt Nhất Gần Sân Bay",
    description = "Trải nghiệm lưu trú cao cấp tại Noi Bai Airport Hotel. Không gian tối giản hiện đại, dịch vụ tận tâm, chỉ cách sân bay 5 phút di chuyển."
}: LayoutProps) {
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="description" content={description} />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <main className="main-content">
                {children}
            </main>
            <Footer />
        </>
    );
}
