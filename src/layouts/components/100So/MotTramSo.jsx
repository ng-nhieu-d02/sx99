import './100So.scss';
import { useState, useEffect } from 'react';
function MotTramSo() {
    const [numbers, setNumbers] = useState(Array.from(Array(100).keys()));
    return (
        <div className="py-4">
            <div className="flex w-full items-center justify-between mb-4">
                <button className="number-range">00 - 99</button>
                <h6 style={{ color: '#2175dc' }} className="font-thin text-sm">
                    Hướng dẫn
                </h6>
            </div>
            <div className="flex w-full items-start justify-between">
                <div style={{ width: '30%' }}>
                    <h6 className="nn">Ngẫu nhiên</h6>
                    <button className="one mt-4">1 Số</button>
                </div>
                <div style={{ width: '70%' }} className="flex flex-wrap ">
                    {numbers.map((number) => {
                        if (number < 10) {
                            number = `0${number}`;
                        }
                        return (
                            <h2 className="number-item" key={number}>
                                {number}
                            </h2>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default MotTramSo;
