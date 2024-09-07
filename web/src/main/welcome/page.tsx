import { useNavigate } from 'react-router-dom';
import { Flexbox } from 'react-layout-kit';
import {GradientButton } from '@lobehub/ui';

export default function WelcomePage() {
    const navigate = useNavigate();

    return (
        <Flexbox style={{
            height: '100%',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
        }}>
            <h1 style={{
                fontSize: 34,
                marginBottom: 32,
            }}>
                欢迎使用 TokenAI平台的智能业务分析工具
            </h1>
            <GradientButton 
                size='large'
                onClick={() => {
                    navigate('/mind');
                }}>
                开始使用
            </GradientButton>
        </Flexbox>
    )
}