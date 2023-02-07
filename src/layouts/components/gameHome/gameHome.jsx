import './gameHome.scss';
import axios from 'axios';
import CountDown from '~/components/Countdown';
import { Link } from 'react-router-dom';
import Image from '~/components/Image';
import { useEffect } from 'react';
import { useState } from 'react';

function GameHome({ data }) {
    const [item, setItem] = useState([]);

    function loading_countDown(action) {
        if (action === 1) {
            document.querySelectorAll('.loadding-countDown').forEach((element) => element.classList.add('active'));
        } else {
            document.querySelectorAll('.loadding-countDown').forEach((element) => element.classList.remove('active'));
        }
    }
    async function load() {
        loading_countDown(1);
        await getData(data.param);
        setTimeout(function () {
            loading_countDown(0);
        }, 500);
    }

    useEffect(() => {
        load();
    }, [data.param]);

    async function getData(params) {
        try {
            const res = await axios.get(`https://xskt.vip/api/front/open/lottery/history/list/1/${params}`);
            await setItem(res.data.t);
        } catch (error) {
            console.log(error);
        }
    }
    const refresh = () => {
        getData(data.param);
    };
    async function fetch() {}
    return (
        <div className="body-box-target">
            <div className="flex body-box">
                <div className="flex w-1/3 justify-center">
                    <Image style={{ width: '80%' }} src={data.img} className="object-contain" />
                </div>
                <div className="flex-1 flex justify-center items-center flex-col space-y-4">
                    <h2 style={{ color: '#ebb663' }}>{data.name}</h2>
                    <h3>{item?.turnNum} Lượt</h3>
                    <div className="count">
                        <div className="loadding-countDown"></div>
                        <CountDown
                            refresh={refresh}
                            day={String(item?.openTime)}
                            fetch={fetch}
                            timeServe={String(item?.serverTime)}
                        />
                    </div>
                    <Link to={data.link}>
                        <button className="btn btn-ingame">VÀO TRÒ CHƠI</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default GameHome;
