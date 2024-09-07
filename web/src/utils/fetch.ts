import { message } from "antd";


export async function fetchRaw(url: string, data: any) {
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    try {
      url = `${url}`.replace(/([^:]\/)\/+/g, "$1");
      const response = await window.fetch(url, {
        headers,
        method: "POST",
        body: JSON.stringify(data),
      });
      if (response.ok === false) {
  
        if (response.status === 401) {
          window.location.href = "/login";
        }
  
        if(response.status === 422){
          message.error('用户参数未配置！');
          window.location.href = "/profile";
        }
  
        const reader = await response.json();
        throw new Error(reader);
      }
  
      const reader = response.body!.getReader();
      return {
        [Symbol.asyncIterator]() {
          return {
            async next() {
              const { done, value } = await reader.read();
              if (done) {
                  return { done: true, value: null };
              }
              const text = new TextDecoder("utf-8").decode(value);
  
              const lines = text.split('\n').filter((line) => line.trim() !== '');
  
              const values = [];
              for (let i = 0; i < lines.length; i++) {
                  const line = lines[i].substring("data: ".length);
                  values.push(JSON.parse(line));
              }
              return {
                  done: false,
                  value: values,
              };
            },
          };
        },
      };
    } catch (error: any) {
      throw error;
    }
  }
  