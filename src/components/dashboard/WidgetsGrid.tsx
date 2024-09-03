'use client'

import { IoCarOutline } from 'react-icons/io5';
import { SimpleWidget } from './SimpleWidget';
import { useAppSelector } from '@/store';

export const WidgetsGrid = () => {

    const isCart = useAppSelector(state => state.counter.count);
    
    const item = {
        title: `${isCart}`,
        subTitle: 'Subtitulo',
        label: 'Contador',
        icon: <IoCarOutline size={70} className="text-blue-600" />,
        href:'/dashboard/counter'
    }

    return (
        <div className="flex flex-wrap p-2 items-center justify-center">
            <SimpleWidget {...item} />
        </div>
    )
}
