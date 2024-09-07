
import { Flexbox } from 'react-layout-kit';
import Nav from '../@nay';
import { Outlet } from 'react-router-dom';


export default function MainLayout() {
    return (
        <Flexbox
            height={'100%'}
            horizontal
            style={{
                position: 'relative',
            }}
            width={'100%'}
        >
            <Nav />
            <Outlet />
        </Flexbox>
    )
}