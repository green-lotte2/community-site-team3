import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, Typography, IconButton } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';

const EventList = ({ events }) => {
    const scrollContainerRef = useRef(null);
    const [showScrollButtons, setShowScrollButtons] = useState(false);

    // 스크롤, 버튼 생성
    useEffect(() => {
        const checkScroll = () => {
            const { scrollWidth, clientWidth } = scrollContainerRef.current;
            setShowScrollButtons(scrollWidth > clientWidth);
        };

        checkScroll();
        window.addEventListener('resize', checkScroll);
        return () => window.removeEventListener('resize', checkScroll);
    }, []);

    const scroll = (direction) => {
        if (scrollContainerRef.current) {
            const { current } = scrollContainerRef;
            if (direction === 'left') {
                current.scrollLeft -= 450;
            } else {
                current.scrollLeft += 450;
            }
        }
    };

    // 이벤트 날짜 포맷팅()

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); //월은 0부터 시작하므로 1을 더함
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        return `${year}년 ${month} 월 ${day}일 ${hours}시`;
    };

    return (
        <div>
            <h3>예정된 이벤트</h3>
            <div className="scroll-wrapper">
                <IconButton
                    className={`scroll-button scroll-button-left ${!showScrollButtons ? 'scroll-button-hidden' : ''}`}
                    onClick={() => scroll('left')}
                >
                    <ArrowBackIos />
                </IconButton>
                <div className="scroll-container" ref={scrollContainerRef}>
                    {events.map((event) => (
                        <div className="scroll-item" key={event.id}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6" component="h2">
                                        {event.title}
                                    </Typography>
                                    <Typography color="textSecondary">
                                        {formatDate(event.start)} - {formatDate(event.end)}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </div>
                    ))}
                </div>
                <IconButton
                    className={`scroll-button scroll-button-right ${!showScrollButtons ? 'scroll-button-hidden' : ''}`}
                    onClick={() => scroll('right')}
                >
                    <ArrowForwardIos />
                </IconButton>
            </div>
        </div>
    );
};

export default EventList;
