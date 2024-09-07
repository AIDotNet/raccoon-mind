
import { ActionIcon, ActionsBar, ChatInputActionBar, ChatInputArea, ChatList, ChatSendButton, Highlighter } from '@lobehub/ui';
import { Flexbox } from 'react-layout-kit';
import { Eraser } from 'lucide-react';
import { useEffect, useState } from 'react';
import './index.css'
import MindElixir from 'mind-elixir'
import "@mind-elixir/node-menu/dist/style.css";
import Divider from '@lobehub/ui/es/Form/components/FormDivider';
import { fetchRaw } from '@/utils/fetch';
import { Button, message } from 'antd';
// @ts-ignore
import exportXmind from '@mind-elixir/export-xmind';
// @ts-ignore
import nodeMenu from '@mind-elixir/node-menu';
// @ts-ignore
import nodeMenuNeo from '@mind-elixir/node-menu-neo';
import { marked } from 'marked';
import { useUserStore } from '@/store/user';



export default function MindPage() {
    const [data, setData] = useState<any[]>([]);
    const [instance, setInstance] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [isLogin, onLogin] = useUserStore((state) => [state.isLogin, state.onLogin]);

    useEffect(() => {
        const instance = new MindElixir({
            el: "#map",
            direction: MindElixir.SIDE,
            editable: true,
            theme: MindElixir.THEME,
            draggable: true, // default true
            contextMenu: true, // default true
            toolBar: true, // default true
            nodeMenu: true, // default true
            keypress: true // default true
        });

        instance.init(exportXmind)
        instance.install(nodeMenuNeo)

        const mind = localStorage.getItem('mind');

        if (mind) {
            try {
                const data = JSON.parse(mind);
                instance.init({
                    nodeData: data
                });
            } catch (e) {
                message.error('加载知识图谱失败');
            }
        } else {
            instance.init({
                nodeData: {
                    topic: "浣熊社区官方论坛",
                    id: "root",
                }
            });
        }


        setInstance(instance)
    }, []);

    // 解析markdown
    function parseMarkdownToMindElixirData(markdown: string) {
        const json = marked.lexer(markdown);

        var values = [] as any[];
        json.forEach((item: any) => {
            if (item.type === 'heading') {
                if (item.depth === 1) {
                    values.push({
                        id: item.text,
                        topic: item.text,
                        children: []
                    });
                } else if (item.depth === 2) {
                    values[values.length - 1].children.push({
                        id: item.text,
                        topic: item.text,
                        children: []
                    });
                } else if (item.depth === 3) {
                    let lastFirstLevel = values[values.length - 1];
                    let lastSecondLevel = lastFirstLevel.children[lastFirstLevel.children.length - 1];
                    lastSecondLevel.children.push({
                        id: item.text,
                        topic: item.text,
                        children: []
                    });
                } else if (item.depth === 4) {
                    let lastFirstLevel = values[values.length - 1];
                    let lastSecondLevel = lastFirstLevel.children[lastFirstLevel.children.length - 1];
                    let lastThirdLevel = lastSecondLevel.children[lastSecondLevel.children.length - 1];
                    lastThirdLevel.children.push({
                        id: item.text,
                        topic: item.text,
                        children: []
                    });
                } else if (item.depth === 5) {
                    let lastFirstLevel = values[values.length - 1];
                    let lastSecondLevel = lastFirstLevel.children[lastFirstLevel.children.length - 1];
                    let lastThirdLevel = lastSecondLevel.children[lastSecondLevel.children.length - 1];
                    let lastFourthLevel = lastThirdLevel.children[lastThirdLevel.children.length - 1];
                    lastFourthLevel.children.push({
                        id: item.text,
                        topic: item.text,
                        children: []
                    });
                } else if (item.depth === 6) {
                    let lastFirstLevel = values[values.length - 1];
                    let lastSecondLevel = lastFirstLevel.children[lastFirstLevel.children.length - 1];
                    let lastThirdLevel = lastSecondLevel.children[lastSecondLevel.children.length - 1];
                    let lastFourthLevel = lastThirdLevel.children[lastThirdLevel.children.length - 1];
                    let lastFifthLevel = lastFourthLevel.children[lastFourthLevel.children.length - 1];
                    lastFifthLevel.children.push({
                        id: item.text,
                        topic: item.text,
                        children: []
                    });
                } else if (item.depth === 7) {
                    let lastFirstLevel = values[values.length - 1];
                    let lastSecondLevel = lastFirstLevel.children[lastFirstLevel.children.length - 1];
                    let lastThirdLevel = lastSecondLevel.children[lastSecondLevel.children.length - 1];
                    let lastFourthLevel = lastThirdLevel.children[lastThirdLevel.children.length - 1];
                    let lastFifthLevel = lastFourthLevel.children[lastFourthLevel.children.length - 1];
                    let lastSixthLevel = lastFifthLevel.children[lastFifthLevel.children.length - 1];
                    lastSixthLevel.children.push({
                        id: item.text,
                        topic: item.text,
                        children: []
                    });
                }
            }
        });
        return values[0];
    }

    const [value, setValue] = useState('')
    // 封装一个随机字符串
    function uuid() {
        return Math.random().toString(36).substring(3, 8);
    }

    async function sendMessage() {

        // 如果未登录则 return
        if (!isLogin) {
            message.error('请先登录');
            // 跳转到登录页面
            onLogin();
            return;
        }

        if (!value) {
            return;
        }

        if (!value.trim()) {
            return;
        }

        setLoading(true);
        try {

            // 获取当前时间戳
            const timestamp = new Date().getTime();

            data.push({
                content: value,
                createAt: timestamp,
                extra: {},
                id: uuid(),
                meta: {
                    avatar: 'https://avatars.githubusercontent.com/u/17870709?v=4',
                    title: '您',
                },
                role: 'user',
                updateAt: timestamp,
            })

            setData([...data])

            setValue('')

            const chat = {
                content:
                    '',
                createAt: timestamp,
                extra: {},
                id: uuid(),
                meta: {
                    avatar: '🤖',
                    backgroundColor: '#E8DA5A',
                    title: '机器人',
                },
                role: 'assistant',
                updateAt: timestamp,
            }

            const messages = data.map((item) => {
                return {
                    content: item.content,
                    role: item.role,
                }
            });

            data.push(chat)
            setData([...data]);


            const response = await fetchRaw('/api/v1/mind/mind-stream', {
                messages: messages
            });


            for await (const v of response) {
                if (v) {
                    v.forEach((item: any) => {
                        if (item.type === 'text') {
                            chat.content += item.content
                        }
                    });
                    try {
                        const mind = parseMarkdownToMindElixirData(chat.content);
                        instance.refresh({
                            nodeData: mind
                        })
                    } catch (e) {
                        console.log(e)
                    }
                    // 更新chat的内容
                    setData([...data]);
                }
            }

            const mind = parseMarkdownToMindElixirData(chat.content);
            localStorage.setItem('mind', JSON.stringify(mind));
            instance.refresh({
                nodeData: mind
            })

        } catch (e) {
            console.log(e);
        }
        setLoading(false);
    }

    return (
        <Flexbox horizontal style={{
            width: '100%',
            height: '100%',
            display: 'flex',
        }}>
            <Flexbox
                height={'100%'}
                style={{ overflow: 'hidden', position: 'relative' }}
                width={'50%'}>
                <Flexbox
                    flex={1}
                    style={{
                        overflowX: 'hidden',
                        overflowY: 'auto',
                        position: 'relative',
                        flex: 1,
                    }}
                    width={'100%'}
                >
                    <ChatList
                        renderMessages={{
                            ["assistant"]: ({
                                key, content
                            }: any) => {
                                return (<Highlighter
                                    key={key}
                                    language='json'
                                >
                                    {content}
                                </Highlighter>)
                            },
                            default: ({ id, editableContent }) => <div id={id}>{editableContent}</div>,
                        }}
                        text={{
                            placeholder: '请输入内容',
                            send: '发送',
                            copy: '复制',
                            edit: '编辑',
                            delete: '删除',
                            save: '保存',
                            regenerate: '重新生成',
                            cancel: '取消',
                            confirm: '确认',
                        }}
                        onMessageChange={(id: string, content: string) => {
                            const index = data.findIndex((item) => item.id === id);
                            if (index !== -1) {
                                data[index].content = content;
                                setData([...data]);
                            }

                        }}
                        onActionsClick={(id, action) => {
                            console.log(id, action);

                            if (id.key === 'del') {
                                const index = data.findIndex((item) => item.id === action.id);
                                if (index !== -1) {
                                    data.splice(index, 1);
                                    setData([...data]);
                                }
                            }
                        }}
                        renderActions={ActionsBar as any}
                        style={{ width: '100%' }}
                        data={data}
                    />
                </Flexbox>
                <Divider />
                <Flexbox
                    gap={8}
                    height={'100%'}
                    padding={'12px 0 16px'}
                    style={{
                        minHeight: 300,
                        height: '300px',
                        position: 'relative'
                    }}
                >
                    <ChatInputArea
                        value={value}
                        onSend={() => {
                            sendMessage();
                        }}

                        loading={loading}
                        onChange={(e) => setValue(e.target.value)}
                        bottomAddons={<ChatSendButton
                            loading={loading}
                            onSend={() => sendMessage()} />}
                        topAddons={
                            <ChatInputActionBar
                                leftAddons={
                                    <>
                                    </>
                                }
                                rightAddons={
                                    <>
                                        <ActionIcon style={{
                                            cursor: 'pointer',
                                        }} onClick={() => {
                                            setData([])
                                        }} icon={Eraser} />
                                    </>
                                }
                            />
                        }
                    />
                </Flexbox>
            </Flexbox>
            <div style={{
                height: '100%',
                display: 'flex',
                width: '46%',
                flexDirection: 'column',
            }} >
                <div style={{
                    height: '64px',
                    width: '100%',
                    paddingTop: '16px',
                }}>
                    <span style={{
                        padding: '8px',
                        fontSize: '20px',
                        fontWeight: 'bold',
                    }}>
                        智能知识图谱
                    </span>
                    <Button
                        loading={loading}
                        style={{
                            float: 'right',
                            marginRight: '16px',
                        }}
                        onClick={() => {
                            const data = instance.getDataMd();
                            const blob = new Blob([data], { type: 'text/plain' });
                            const url = URL.createObjectURL(blob);
                            const a = document.createElement('a');
                            a.href = url;
                            a.download = '知识图谱.md';
                            a.click();
                            URL.revokeObjectURL(url);
                        }}
                    >
                        下载MD
                    </Button>
                    <Button
                        loading={loading}
                        style={{
                            float: 'right',
                            marginRight: '16px',
                        }}
                        onClick={async () => {
                            try {
                                let blob = null
                                blob = await instance.exportPng(false)
                                const url = URL.createObjectURL(blob)
                                const a = document.createElement('a')
                                a.href = url
                                a.download = '智能图谱.png'
                                a.click()
                                URL.revokeObjectURL(url)
                            } catch (e) {
                                message.error('导出失败');
                            }
                        }}
                    >
                        下载图片
                    </Button>
                </div>
                <Divider type='horizontal' />
                <div style={{
                    overflow: 'auto',
                    height: '100%',
                    width: '100%'
                }} id="map"></div>
            </div>
        </Flexbox>
    )
}