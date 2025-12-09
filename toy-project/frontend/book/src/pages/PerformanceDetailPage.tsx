import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { apiService } from '../services/api';
import type { Performance } from '../types';
import './PerformanceDetailPage.css';

export default function PerformanceDetailPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [performance, setPerformance] = useState<Performance | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [seatCount, setSeatCount] = useState(1);

    useEffect(() => {
        if (id) {
            loadPerformance(parseInt(id));
        }
    }, [id]);

    const loadPerformance = async (performanceId: number) => {
        try {
            setLoading(true);
            const data = await apiService.getPerformanceById(performanceId);
            setPerformance(data);
        } catch (err: any) {
            setError(err.message || '공연 정보를 불러오는데 실패했습니다.');
        } finally {
            setLoading(false);
        }
    };

    const handleBooking = () => {
        if (!performance) return;
        navigate(`/booking/${performance.id}`, {
            state: { performance, seatCount }
        });
    };

    const getCategoryBadge = (category: string) => {
        const badges: Record<string, string> = {
            MUSICAL: '🎭 뮤지컬',
            THEATER: '🎪 연극',
            CONCERT: '🎵 콘서트',
            EXHIBITION: '🖼️ 전시',
            MOVIE: '🎬 영화'
        };
        return badges[category] || category;
    };

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading"></div>
                <p>공연 정보를 불러오는 중...</p>
            </div>
        );
    }

    if (error || !performance) {
        return (
            <div className="error-container">
                <p className="error-message">{error || '공연을 찾을 수 없습니다.'}</p>
                <button className="btn btn-primary" onClick={() => navigate('/performances')}>
                    목록으로 돌아가기
                </button>
            </div>
        );
    }

    const totalPrice = performance.price * seatCount;
    const canBook = performance.availableSeats >= seatCount && seatCount > 0 && seatCount <= 10;

    return (
        <div className="performance-detail-page">
            <button className="btn-back" onClick={() => navigate('/performances')}>
                ← 목록으로
            </button>

            <div className="detail-container">
                <div className="detail-image-section">
                    {performance.imageUrl ? (
                        <img src={performance.imageUrl} alt={performance.title} className="detail-image" />
                    ) : (
                        <div className="detail-placeholder">
                            <span className="placeholder-icon">🎭</span>
                        </div>
                    )}
                    <div className="image-overlay">
                        <div className="category-badge">
                            {getCategoryBadge(performance.category)}
                        </div>
                    </div>
                </div>

                <div className="detail-content">
                    <h1 className="detail-title">{performance.title}</h1>

                    <div className="detail-info-grid">
                        <div className="info-item">
                            <span className="info-icon">📍</span>
                            <div>
                                <div className="info-label">공연장</div>
                                <div className="info-value">{performance.venue}</div>
                            </div>
                        </div>

                        <div className="info-item">
                            <span className="info-icon">💰</span>
                            <div>
                                <div className="info-label">가격</div>
                                <div className="info-value">{performance.price.toLocaleString()}원</div>
                            </div>
                        </div>

                        <div className="info-item">
                            <span className="info-icon">🎫</span>
                            <div>
                                <div className="info-label">잔여 좌석</div>
                                <div className={`info-value ${performance.availableSeats > 0 ? 'available' : 'sold-out'}`}>
                                    {performance.availableSeats > 0
                                        ? `${performance.availableSeats}석 / ${performance.totalSeats}석`
                                        : '매진'
                                    }
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="detail-description">
                        <h3>공연 소개</h3>
                        <p>{performance.description}</p>
                    </div>

                    {performance.availableSeats > 0 && (
                        <div className="booking-section">
                            <h3>예매하기</h3>

                            <div className="seat-selector">
                                <label htmlFor="seatCount">좌석 수</label>
                                <div className="seat-input-group">
                                    <button
                                        className="seat-btn"
                                        onClick={() => setSeatCount(Math.max(1, seatCount - 1))}
                                        disabled={seatCount <= 1}
                                    >
                                        -
                                    </button>
                                    <input
                                        type="number"
                                        id="seatCount"
                                        value={seatCount}
                                        onChange={(e) => {
                                            const value = parseInt(e.target.value) || 1;
                                            setSeatCount(Math.min(10, Math.max(1, value)));
                                        }}
                                        min="1"
                                        max="10"
                                    />
                                    <button
                                        className="seat-btn"
                                        onClick={() => setSeatCount(Math.min(10, seatCount + 1))}
                                        disabled={seatCount >= 10}
                                    >
                                        +
                                    </button>
                                </div>
                                <span className="seat-hint">최대 10석까지 예매 가능합니다</span>
                            </div>

                            <div className="price-summary">
                                <div className="price-row">
                                    <span>좌석 수</span>
                                    <span>{seatCount}석</span>
                                </div>
                                <div className="price-row">
                                    <span>좌석당 가격</span>
                                    <span>{performance.price.toLocaleString()}원</span>
                                </div>
                                <div className="price-row total">
                                    <span>총 금액</span>
                                    <span className="total-price">{totalPrice.toLocaleString()}원</span>
                                </div>
                            </div>

                            <button
                                className="btn btn-primary btn-book"
                                onClick={handleBooking}
                                disabled={!canBook}
                            >
                                {canBook ? '예매하기' : '예매 불가'}
                            </button>

                            {seatCount > performance.availableSeats && (
                                <p className="warning-message">
                                    선택한 좌석 수가 잔여 좌석보다 많습니다.
                                </p>
                            )}
                        </div>
                    )}

                    {performance.availableSeats === 0 && (
                        <div className="sold-out-message">
                            <h3>😢 매진되었습니다</h3>
                            <p>다음 기회에 만나요!</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
