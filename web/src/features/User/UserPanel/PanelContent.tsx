import { memo } from 'react';
import { Flexbox } from 'react-layout-kit';

import BrandWatermark from '@/components/BrandWatermark';
import Menu from '@/components/Menu';
import ThemeButton from './ThemeButton';
import { useMenu } from './useMenu';
import { useUserStore } from '@/store/user';

const PanelContent = memo<{ closePopover: () => void }>(({ closePopover }) => {
    const { mainItems } = useMenu();
    const [isLogin,setIsLogin,onLogin] = useUserStore((state) => [state.isLogin,state.setIsLogin,state.onLogin]);
    return (
        <Flexbox gap={2} style={{ minWidth: 300 }}>
            <Menu items={mainItems} onClick={closePopover} />
            {
                !isLogin ? (
                    <Menu items={[
                        {
                            key: 'login',
                            label: '登录',
                            onClick: () => {
                                closePopover();
                                onLogin();
                            },
                        }
                    ]} onClick={closePopover} />) : 
                    <Menu items={[
                        {
                            key: 'logout',
                            label: '退出登录',
                            onClick: () => {
                                closePopover();
                                localStorage.removeItem('token');
                                setIsLogin(false);
                            },
                        }
                    ]} onClick={closePopover} /> 
            }
            <Flexbox
                align={'center'}
                horizontal
                justify={'space-between'}
                style={{ padding: '6px 6px 6px 16px' }}
            >
                <BrandWatermark />
                <Flexbox align={'center'} flex={'none'} gap={6} horizontal>
                    <ThemeButton />
                </Flexbox>
            </Flexbox>
        </Flexbox>
    );
});

export default PanelContent;