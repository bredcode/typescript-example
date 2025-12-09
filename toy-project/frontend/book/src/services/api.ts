import axios, { type AxiosInstance } from 'axios';
import type {
    ApiResponse,
    SignupRequest,
    LoginRequest,
    AuthResponse,
    Performance,
    Reservation,
    CreateBookingRequest,
    Booking,
    PaymentRequest,
    PaymentResponse
} from '../types';

const GATEWAY_URL = 'https://apigateway-iota.vercel.app';

class ApiService {
    private api: AxiosInstance;
    private token: string | null = null;

    constructor() {
        this.api = axios.create({
            baseURL: GATEWAY_URL,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Load token from localStorage
        this.token = localStorage.getItem('token');
        if (this.token) {
            this.setAuthHeader(this.token);
        }

        // Response interceptor for error handling
        this.api.interceptors.response.use(
            (response) => response,
            (error) => {
                if (error.response?.status === 401) {
                    this.logout();
                }
                return Promise.reject(error);
            }
        );
    }

    private setAuthHeader(token: string) {
        this.api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    private removeAuthHeader() {
        delete this.api.defaults.headers.common['Authorization'];
    }

    // Auth APIs
    async signup(data: SignupRequest): Promise<ApiResponse<{ user_id: string }>> {
        const response = await this.api.post('/auth/signup', data);
        return response.data;
    }

    async login(data: LoginRequest): Promise<ApiResponse<AuthResponse>> {
        const response = await this.api.post('/auth/login', data);
        if (response.data.success && response.data.data.token) {
            this.token = response.data.data.token;
            if (this.token) {
                localStorage.setItem('token', this.token);
                this.setAuthHeader(this.token);
            }
        }
        return response.data;
    }

    logout() {
        this.token = null;
        localStorage.removeItem('token');
        this.removeAuthHeader();
        window.location.href = '/';
    }

    isAuthenticated(): boolean {
        return !!this.token;
    }

    // Performance APIs
    async getPerformances(): Promise<Performance[]> {
        const response = await this.api.get('/performances/performances');
        return response.data;
    }

    async getPerformanceById(id: number): Promise<Performance> {
        const response = await this.api.get(`/performances/performances/${id}`);
        return response.data;
    }

    // Reservation APIs
    async createReservation(performanceId: number, seatCount: number): Promise<Reservation> {
        const response = await this.api.post(`/performances/reservations/${performanceId}`, {
            seatCount
        });
        return response.data;
    }

    async confirmReservation(performanceId: number, reservationId: number): Promise<Reservation> {
        const response = await this.api.patch(
            `/performances/reservations/${performanceId}/${reservationId}/confirm`
        );
        return response.data;
    }

    async cancelReservation(performanceId: number, reservationId: number): Promise<Reservation> {
        const response = await this.api.patch(
            `/performances/reservations/${performanceId}/${reservationId}/cancel`
        );
        return response.data;
    }

    async refundReservation(performanceId: number, reservationId: number): Promise<Reservation> {
        const response = await this.api.patch(
            `/performances/reservations/${performanceId}/${reservationId}/refund`
        );
        return response.data;
    }

    // Booking APIs
    async createBooking(data: CreateBookingRequest): Promise<{ message: string; bookingId: string }> {
        const response = await this.api.post('/booking/booking', data);
        return response.data;
    }

    async getMyBookings(): Promise<Booking[]> {
        const response = await this.api.get('/booking/booking/my');
        return response.data;
    }

    async cancelBooking(bookingId: string): Promise<{ message: string }> {
        const response = await this.api.delete('/booking/booking/my', {
            data: { bookingId }
        });
        return response.data;
    }

    // Payment APIs
    async executePayment(data: PaymentRequest): Promise<PaymentResponse> {
        const response = await this.api.post('/payment/payment/execute', data);
        return response.data;
    }
}

export const apiService = new ApiService();
