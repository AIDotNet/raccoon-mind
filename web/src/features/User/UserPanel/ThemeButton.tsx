import { ActionIcon, Icon } from '@lobehub/ui';
import { Popover, type PopoverProps } from 'antd';
import { useTheme } from 'antd-style';
import { Monitor, Moon, Sun } from 'lucide-react';
import { memo, useMemo } from 'react';

import Menu, { type MenuProps } from '@/components/Menu';
import { useSystemStore } from '@/store/system';

const themeIcons = {
  auto: Monitor,
  dark: Moon,
  light: Sun,
};

const ThemeButton = memo<{ placement?: PopoverProps['placement'] }>(({ placement = 'right' }) => {
  const theme = useTheme();
  const [themeMode, switchThemeMode] = useSystemStore((s) => [s.theme, s.setTheme]);


  const items: MenuProps['items'] = useMemo(
    () => [
      {
        icon: <Icon icon={themeIcons.auto} />,
        key: 'auto',
        label: '跟随系统',
        onClick: () => switchThemeMode('auto'),
      },
      {
        icon: <Icon icon={themeIcons.light} />,
        key: 'light',
        label: '浅色模式',
        onClick: () => switchThemeMode('light'),
      },
      {
        icon: <Icon icon={themeIcons.dark} />,
        key: 'dark',
        label: '深色模式',
        onClick: () => switchThemeMode('dark'),
      },
    ],
    [],
  );

  return (
    <Popover
      arrow={false}
      content={<Menu items={items} selectable selectedKeys={[themeMode]} />}
      overlayInnerStyle={{
        padding: 0,
      }}
      placement={placement}
      trigger={['click', 'hover']}
    >
      <ActionIcon
        icon={themeIcons[themeMode]}
        size={{ blockSize: 32, fontSize: 16 }}
        style={{ border: `1px solid ${theme.colorFillSecondary}` }}
      />
    </Popover>
  );
});

export default ThemeButton;