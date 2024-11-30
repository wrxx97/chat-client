import { useEffect } from "react";
import { useChatStore } from "../store";

const useSSE = (url: string) => {
  const setConnectionStatus = useChatStore(
    (state) => state.setConnectionStatus
  );
  const addMessage = useChatStore((state) => state.addMessage);
  const setUsers = useChatStore((state) => state.setUsers);

  useEffect(() => {
    const eventSource = new EventSource(url);

    // SSE 连接成功
    eventSource.onopen = () => {
      setConnectionStatus("connected");
    };

    // SSE 连接断开
    eventSource.onerror = () => {
      setConnectionStatus("disconnected");
      eventSource.close();
    };

    // 处理来自服务器的消息事件
    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      addMessage(data);
    };

    // 处理用户列表更新
    eventSource.addEventListener("user_list", (event: MessageEvent) => {
      const users = JSON.parse(event.data);
      setUsers(users);
    });

    // 清理 SSE
    return () => eventSource.close();
  }, [url, setConnectionStatus, addMessage, setUsers]);
};
