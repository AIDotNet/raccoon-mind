import { Icon } from '@lobehub/ui';

import { ItemType } from 'antd/es/menu/interface';
import {
    Book,
    LifeBuoy,
    Mail,
} from 'lucide-react';
import type { MenuProps } from '@/components/Menu';
import { Link } from 'react-router-dom';


export const useMenu = () => {

    const helps: MenuProps['items'] = [
        {
            children: [
                {
                    icon: <Icon icon={Book} />,
                    key: 'ai-dotnet',
                    label: (
                        <Link to={'https://ai-dotnet.com'} target={'_blank'}>
                            AI-DotNet
                        </Link>
                    ),
                },
                {
                    icon: <Icon icon={Mail} />,
                    key: 'email',
                    label: (
                        <Link to={'mailto:239573049@qq.com'} target={'_blank'}>
                            邮箱联系
                        </Link>
                    ),
                },
            ],
            icon: <Icon icon={LifeBuoy} />,
            key: 'help',
            label: '帮助',
        },
        {
            type: 'divider',
        },
    ].filter(Boolean) as ItemType[];

    const mainItems = [
        {
            type: 'divider',
        },
        ...helps,
    ].filter(Boolean) as MenuProps['items'];


    return { mainItems };
};