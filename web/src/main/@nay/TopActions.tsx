import { ActionIcon } from '@lobehub/ui';
import { Workflow, Radar } from 'lucide-react';
import { memo } from 'react';

import { SidebarTabKey } from '@/store/global/initialState';
import { Link,useNavigate } from 'react-router-dom';

export interface TopActionProps {
    tab?: SidebarTabKey;
}

const TopActions = memo<TopActionProps>(({ tab }) => {
    const navigate = useNavigate();
    
    return (
        <>
            <Link
                aria-label={'知识图谱'}
                to={'/mind'}
                onClick={(e) => {
                    e.preventDefault();
                    navigate('/mind');
                }}
            >
                <ActionIcon
                    active={tab === SidebarTabKey.Mind}
                    icon={Radar}
                    placement={'right'}
                    size="large"
                    title={'知识图谱'}
                />
            </Link>
            <Link
                aria-label={'流程图'}
                to={'/flow-chart'}
                onClick={(e) => {
                    e.preventDefault();
                    navigate('/flow-chart');
                }}
            >
                <ActionIcon
                    active={tab === SidebarTabKey.FlowChart}
                    icon={Workflow}
                    placement={'right'}
                    size="large"
                    title={'流程图'}
                />
            </Link>
        </>
    );
});

export default TopActions;