import { useState, useEffect } from 'react';

function Clock() {
    const [clock, setClock] = useState();

    useEffect(() => {
        setInterval(() => {
            const today = new Date();
            let year = today.getFullYear();
            let month = today.getMonth() + 1;
            let date = today.getDate();
            let h = today.getHours();
            let m = today.getMinutes();
            let s = today.getSeconds();
            m = checkTime(m);
            s = checkTime(s);
            month = checkTime(month);
            setClock(`Ngày ${date} Tháng ${month} Năm ${year}  ${h} : ${m} : ${s}`);
        });
    }, []);
    return <h4 className="text-white">{clock}</h4>;
}
function checkTime(i) {
    if (i < 10) {
        i = '0' + i;
    }
    return i;
}

export default Clock;
