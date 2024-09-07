import { ActionIcon } from '@lobehub/ui';
import { Book, Github } from 'lucide-react';
import { memo } from 'react';

import { DOCUMENTS_REFER_URL, GITHUB } from '@/const/url';
import { Link } from 'react-router-dom';

const BottomActions = memo(() => {

  return (
    <>
      <Link aria-label={'GitHub'} to={GITHUB} target={'_blank'}>
        <ActionIcon icon={Github} placement={'right'} title={'GitHub'} />
      </Link>
      <Link aria-label={'社区文档'} to={DOCUMENTS_REFER_URL} target={'_blank'}>
        <ActionIcon icon={Book} placement={'right'} title={'社区文档'} />
      </Link>
    </>
  );
});

export default BottomActions;