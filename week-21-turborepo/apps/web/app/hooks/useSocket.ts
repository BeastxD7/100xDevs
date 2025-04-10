import { useEffect, useState } from "react";
import WebSocket from 'ws';
import { WS_URL } from "../config";

export function useSocket () {

    const [loading, setLoading] = useState(true);
    const [socket, setSocket] = useState<WebSocket>();

    useEffect(()=> {
        const ws = new WebSocket(WS_URL);
        ws.onopen = () => {
            setSocket(ws);
            setLoading(false);
        }
    }, []);
    
    return {
        socket,
        loading
    }
}