import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { io } from "socket.io-client";
export const useSocketStore  = defineStore('socket', {
    state: () => {
        return {
            connected: false,
            fooEvents: [],
            barEvents: [],
            error: null,
            socket: null,
        }
    },
    actions: {
        getSocket() {
            return this.socket
        },
        connectSocket(token: string) {
            if (this.socket) {
                this.socket.disconnect();
                this.connected = false;
            }

            const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:3000';

            this.socket = io(URL, {
                query: {token: token},
                transports: ['websocket'],
            });

            this.socket.on('connect', () => {
                this.connected = true;
                this.error = null;
            });

            this.socket.on('disconnect', () => {
                this.connected = false;
            });

            this.socket.on('error', (error) => {
                this.error = error.message;
                this.socket.disconnect();
            });

            this.socket.on('foo', (...args) => {
                this.fooEvents.push(args);
            });

            this.socket.on('bar', (...args) => {
                this.barEvents.push(args);
            });
        },
    }
})
