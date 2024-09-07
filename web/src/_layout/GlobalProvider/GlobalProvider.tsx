import { createStyles } from 'antd-style';
import { useSystemStore } from '../../store/system';
import { ThemeProvider } from '@lobehub/ui';

import { ConfigProvider } from '@lobehub/ui';
import { Link,useNavigate,useLocation } from 'react-router-dom';
import { memo, useEffect } from 'react';

import { useUserStore } from '@/store/user';


const useStyles = createStyles(({ css, token }) => ({
  app: css`
      position: relative;
  
      overscroll-behavior: none;
      display: flex;
      flex-direction: column;
      align-items: center;
  
      height: 100%;
      min-height: 100dvh;
      max-height: 100dvh;
  
      @media (min-device-width: 576px) {
        overflow: hidden;
      }
    `,
  // scrollbar-width and scrollbar-color are supported from Chrome 121
  // https://developer.mozilla.org/en-US/docs/Web/CSS/scrollbar-color
  scrollbar: css`
      scrollbar-color: ${token.colorFill} transparent;
      scrollbar-width: thin;
  
      #lobe-mobile-scroll-container {
        scrollbar-width: none;
  
        ::-webkit-scrollbar {
          width: 0;
          height: 0;
        }
      }
    `,

  // so this is a polyfill for older browsers
  scrollbarPolyfill: css`
      ::-webkit-scrollbar {
        width: 0.75em;
        height: 0.75em;
      }
  
      ::-webkit-scrollbar-thumb {
        border-radius: 10px;
      }
  
      :hover::-webkit-scrollbar-thumb {
        background-color: ${token.colorText};
        background-clip: content-box;
        border: 3px solid transparent;
      }
  
      ::-webkit-scrollbar-track {
        background-color: transparent;
      }
    `,
}));

const GlobalProvider = memo(({
  children
}: any) => {
  const systemStore = useSystemStore();
  const navigate = useNavigate();
  const { search } = useLocation();
  const [setIsLogin] = useUserStore((state) => [state.setIsLogin]);

  const { styles, cx } = useStyles();
  
  useEffect(() => {
    const params = new URLSearchParams(search);
    const token = params.get('token') || localStorage.getItem('token');
    if (token) {
      setIsLogin(true);
      localStorage.setItem('token', token);
      // 删除token参数
      params.delete('token');
      navigate({ search: params.toString() });
    }
  }, []);

  return (
    <ThemeProvider
      className={cx(styles.app, styles.scrollbar, styles.scrollbarPolyfill)}
      onAppearanceChange={(appearance) => {
        systemStore.setTheme(appearance as "light" | "dark" | "auto");
      }}
      themeMode={systemStore.theme}
    >
      <ConfigProvider config={{ aAs: Link, imgUnoptimized: true }}>
        {children}
      </ConfigProvider>
    </ThemeProvider>
  );
})

export default GlobalProvider;