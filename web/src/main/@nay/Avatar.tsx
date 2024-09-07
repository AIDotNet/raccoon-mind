import { ActionIcon } from '@lobehub/ui';
import { Tooltip } from 'antd';
import { LucideX } from 'lucide-react';
import { memo } from 'react';
import { Flexbox } from 'react-layout-kit';

import UserAvatar from '@/features/User/UserAvatar';
import UserPanel from '@/features/User/UserPanel';
import { useUserStore } from '@/store/user';

const Avatar = memo(() => {
    const [hideSettingsMoveGuide, updateGuideState] = useUserStore((s) => [s.hideSettingsMoveGuide, s.updateGuideState]);
    const content = (
        <UserPanel>
            <UserAvatar clickable />
        </UserPanel>
    );

    return hideSettingsMoveGuide ? (
        content
    ) : (
        <Tooltip
            color={'blue'}
            open
            placement={'right'}
            prefixCls={'guide'}
            title={
                <Flexbox align={'center'} gap={8} horizontal>
                    <div style={{ lineHeight: '22px' }}>
                        点击头像查看个人信息
                    </div>
                    <ActionIcon
                        icon={LucideX}
                        onClick={() => {
                            updateGuideState(true);
                        }}
                        role={'close-guide'}
                        size={'small'}
                        style={{ color: 'inherit' }}
                    />
                </Flexbox>
            }
        >
            {content}
        </Tooltip>
    );
});

Avatar.displayName = 'Avatar';

export default Avatar;