import { Fragment, useState } from 'react';
import '~/layouts/components/100So/100So.scss';
import { MinusIcon, PlusIcon } from '~/components/Icons';
import { useEffect, useContext } from 'react';
import { ThemeContext } from '~/pages/Game/Game';
import { useParams } from 'react-router-dom';

function LoTruot({ PlayType, functionalCallback, datCuoc, callBackNoti }) {
    const [_100so, set100So] = useState(true);
    const [NhapSo, setNhapSo] = useState(false);
    const [PlayStyle, setPlayStyle] = useState('tx4');
    const [StyleInput, setStyleInput] = useState('mts');
    const [chooseNumberOk, setChooseNumberOk] = useState([]);
    const [numbers] = useState(Array.from(Array(100).keys()));
    const game = useParams()['link'];
    const Id_Game = useContext(ThemeContext);
    const [soNhan, setSoNhan] = useState(1);
    const [HeSo, setHeSo] = useState(0);
    const [Odd, setOdd] = useState(99.5);
    const [DaChon, setDachon] = useState(1);

    useEffect(() => {
        setChooseNumberOk([]);
        updateOdd();
    }, [PlayStyle, StyleInput]);

    // function update odd
    const updateOdd = () => {
        if (PlayStyle === 'tx4') {
            setDachon(4);
            setOdd(1.8);
            setHeSo(1000);
        } else if (PlayStyle === 'tx8') {
            setDachon(8);
            setOdd(3.3);
            setHeSo(1000);
        } else {
            setDachon(10);
            setOdd(4.3);
            setHeSo(1000);
        }
    };

    const handleTypeClick = (e) => {
        const targetElement = e.target;
        if (!!document.querySelector('.type.active')) {
            document.querySelector('.type.active').classList.remove('active');
        }
        targetElement.classList.add('active');
        if (targetElement.getAttribute('data-so')) {
            const number = targetElement.getAttribute('data-so');
            if (String(number) === 'tx4') {
                setNhapSo(false);
                set100So(true);
                setPlayStyle('tx4');
            } else if (String(number) === 'tx8') {
                setNhapSo(false);
                set100So(true);
                setPlayStyle('tx8');
            } else if (String(number) === 'tx10') {
                setNhapSo(false);
                set100So(true);
                setPlayStyle('tx10');
            }
        }

        if (document.querySelector('.option.ns.active')) {
            document.querySelector('.option.ns.active').classList.remove('active');
        }
        if (!document.querySelector('.option.fast').classList.contains('active')) {
            document.querySelector('.option.fast').classList.add('active');
        }
        if (!!document.querySelector(`.button-chose-csn.active`)) {
            document.querySelector(`.button-chose-csn.active`).classList.remove('active');
        }
    };
    const handleOptionClick = (e) => {
        const targetElement = e.target;
        if (!!document.querySelector('.option.active')) {
            document.querySelector('.option.active').classList.remove('active');
        }
        targetElement.classList.add('active');
        if (targetElement.getAttribute('data-so')) {
            const number = targetElement.getAttribute('data-so');
            if (number === 'mts') {
                setNhapSo(false);
                set100So(true);
                setStyleInput('mts');
            } else {
                setNhapSo(true);
                set100So(false);
                setStyleInput('ns');
            }
        }
    };
    const handleNs = async (e) => {
        const value = e.target.value;
        let arr = value.replaceAll(';', '|').replaceAll(',', '|').replaceAll(' ', '|').split('|');
        if (arr[arr.length - 1] === '') {
            arr.pop();
        }
        arr.map((number) => {
            if (PlayStyle === 'tx4') {
                if (number > 99 || number < 0 || isNaN(number) || arr.length > 4) {
                    callBackNoti('error', 'Cảnh báo !! bạn đang nhập sai định dạng của trò chơi !!!');
                    arr.pop();
                }
            } else if (PlayStyle === 'tx8') {
                if (number > 99 || number < 0 || isNaN(number) || arr.length > 8) {
                    callBackNoti('error', 'Cảnh báo !! bạn đang nhập sai định dạng của trò chơi !!!');
                    arr.pop();
                }
            } else {
                if (number > 99 || number < 0 || isNaN(number) || arr.length > 10) {
                    callBackNoti('error', 'Cảnh báo !! bạn đang nhập sai định dạng của trò chơi !!!');
                    arr.pop();
                }
            }
        });
        setChooseNumberOk(arr);
    };

    const handleDatCuoc = () => {
        // console.log('game : ' + game);
        // console.log('Kiểu chơi : ' + PlayType);
        // console.log('Cách chơi : ' + PlayStyle);
        // console.log('Id game : ' + Id_Game);
        // console.log('Hệ số : ' + HeSo);
        // console.log('Đã chọn: ' + DaChon);
        // console.log('Số đã chọn : ' + chooseNumberOk);
        // if (soNhan === '') {
        //     console.log('số nhân : 1');
        // } else {
        //     console.log('số nhân : ' + soNhan);
        // }
        // if (chooseNumberOk.length === 0) {
        //     alert('Chưa nhập số');
        // } else {
        //     window.confirm('Are you sure??');
        // }
        const result = handleAddNumber();
        if (result !== false) {
            datCuoc();
        }
    };
    const handleAddNumber = () => {
        let x = 1;
        if (soNhan === '') {
            x = 1;
        } else {
            x = soNhan;
        }
        if (chooseNumberOk.length === 0) {
            callBackNoti('error', 'Chưa chọn số !!!!');
            return false;
        }
        if (PlayStyle === 'tx4') {
            if (chooseNumberOk.length < 4) {
                callBackNoti('error', 'Chưa chọn số !!!!');
                return false;
            }
        } else if (PlayStyle === 'tx8') {
            if (chooseNumberOk.length < 8) {
                callBackNoti('error', 'Chưa chọn số !!!!');
                return false;
            }
        } else {
            if (chooseNumberOk.length < 10) {
                callBackNoti('error', 'Chưa chọn số !!!!');
                return false;
            }
        }

        const arr = {
            game: game,
            PlayType: PlayType,
            PlayStyle: PlayStyle,
            Odd: Odd,
            HeSo: HeSo,
            DaChon: DaChon,
            Number: chooseNumberOk,
            SoNhan: x,
        };
        setChooseNumberOk([]);
        functionalCallback(arr);
    };
    const handleReset = () => {
        setChooseNumberOk([]);
        setSoNhan(1);
    };
    const handleSoNhan = (action) => {
        let sn = Number(soNhan);
        if (action === 'minus') {
            if (sn > 1) {
                sn = sn - 1;
            } else {
                return;
            }
        } else {
            sn = sn + 1;
        }
        setSoNhan(sn);
    };
    const handleInputSoNhan = (e) => {
        const value = e.target.value;
        if ((value <= 0 && value !== '') || (isNaN(value) && value !== '')) {
            setSoNhan(1);
        } else {
            setSoNhan(value);
        }
    };

    const handleCSNbt = (e) => {
        const targetElement = e.target;
        if (!!document.querySelector(`.button-chose-csn.active`)) {
            document.querySelector(`.button-chose-csn.active`).classList.remove('active');
        }
        targetElement.classList.add('active');
        let arr = [];
        if (PlayStyle === 'tx4') {
            while (arr.length < 4) {
                const number = Math.floor(Math.random() * 99);
                if (arr.includes(number)) {
                } else {
                    arr.push(number);
                }
            }
        } else if (PlayStyle === 'tx8') {
            while (arr.length < 8) {
                const number = Math.floor(Math.random() * 99);
                if (arr.includes(number)) {
                } else {
                    arr.push(number);
                }
            }
        } else {
            while (arr.length < 10) {
                const number = Math.floor(Math.random() * 99);
                if (arr.includes(number)) {
                } else {
                    arr.push(number);
                }
            }
        }
        setChooseNumberOk(arr);
    };

    // nhập số nhanh
    const handleMST = async (e) => {
        const targetElement = e.target;
        let arr = chooseNumberOk;
        const number = Number(targetElement.getAttribute('data-so'));
        if (targetElement.classList.contains('active')) {
            targetElement.classList.remove('active');
            arr = arr.filter((value) => value !== number);
            setChooseNumberOk(arr);
        } else {
            targetElement.classList.add('active');
            setChooseNumberOk([...chooseNumberOk, number]);
        }
    };
    // nhập số nhanh

    return (
        <div>
            <div className="flex justify-between text-xs font-thin py-2 mobile-game-content-bet">
                <ul className="flex justify-start items-center flex-1 ul1-mobile-game-content-bet">
                    <li className="type active tx4" onClick={handleTypeClick} data-so="tx4">
                        Trượt Xiên 4
                    </li>
                    <li className="type tx8" onClick={handleTypeClick} data-so="tx8">
                        Trượt Xiên 8
                    </li>
                    <li className="type tx10" onClick={handleTypeClick} data-so="tx10">
                        Trượt Xiên 10
                    </li>
                </ul>
                <ul className="flex ul2-mobile-game-content-bet">
                    <li className="option ns" onClick={handleOptionClick} data-so="ns">
                        Nhập số
                    </li>
                    <li
                        style={{ borderLeft: '1px' }}
                        onClick={handleOptionClick}
                        data-so="mts"
                        className="rounded-r-md option fast active"
                    >
                        Chọn số nhanh
                    </li>
                </ul>
            </div>
            <div>
                {_100so ? (
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
                                <button className="one mt-4 button-chose-csn" data-action="one" onClick={handleCSNbt}>
                                    1 Số
                                </button>
                            </div>
                            <div style={{ width: '70%' }} className="flex flex-wrap ">
                                {numbers.map((number) => {
                                    if (number < 10) {
                                        number = `0${number}`;
                                    }
                                    if (chooseNumberOk.length / DaChon === 1) {
                                        if (chooseNumberOk.includes(Number(number))) {
                                            return (
                                                <h2
                                                    className={'number-item active'}
                                                    data-so={Number(number)}
                                                    onClick={handleMST}
                                                    key={number}
                                                >
                                                    {number}
                                                </h2>
                                            );
                                        } else {
                                            return (
                                                <h2
                                                    className={'number-item num_disable'}
                                                    data-so={Number(number)}
                                                    key={number}
                                                >
                                                    {number}
                                                </h2>
                                            );
                                        }
                                    }
                                    return (
                                        <h2
                                            className={
                                                chooseNumberOk.includes(Number(number))
                                                    ? 'number-item active'
                                                    : 'number-item'
                                            }
                                            data-so={Number(number)}
                                            onClick={handleMST}
                                            key={number}
                                        >
                                            {number}
                                        </h2>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                ) : (
                    <Fragment></Fragment>
                )}
                {NhapSo ? (
                    <div className="relative bg-white">
                        <textarea
                            className="text-area-ns"
                            onChange={handleNs}
                            name="play-textarea"
                            cols="30"
                            rows="10"
                        ></textarea>
                        {chooseNumberOk.length === 0 ? (
                            <div className="play-explain">
                                Cách chơi:
                                <br />
                                <span>
                                    Giữa mỗi cược cần phân cách bởi dấu ; hoặc dấu , hoặc thanh dọc | hoặc khoảng trống{' '}
                                </span>
                                <br />
                                <span>
                                    Ví dụ:{' '}
                                    {PlayStyle === 'tx4' ? (
                                        <>
                                            12 <span style={{ color: 'red' }}>,</span>
                                            45<span style={{ color: 'red' }}>,</span>34
                                            <span style={{ color: 'red' }}>,</span>21 hoặc 13 46 83 90 hoặc 13
                                            <span style={{ color: 'red' }}>;</span>46{' '}
                                            <span style={{ color: 'red' }}>;</span> 38{' '}
                                            <span style={{ color: 'red' }}>;</span>74 hoặc 13
                                            <span style={{ color: 'red' }}>|</span>45
                                            <span style={{ color: 'red' }}>|</span>79{' '}
                                            <span style={{ color: 'red' }}>|</span>83
                                        </>
                                    ) : PlayStyle === 'tx8' ? (
                                        <>
                                            12,90,38,48,83,91,94,39 hoặc 31 38 43 58 23 43 49 59 17 hoặc
                                            12|9|98|53|21|44|31|77
                                        </>
                                    ) : (
                                        <>
                                            12,90,38,48,83,91,94,39,87,23 hoặc 31 38 43 58 23 43 49 59 17 89 17 hoặc
                                            12|9|98|53|21|44|31|77|64|38
                                        </>
                                    )}
                                </span>
                            </div>
                        ) : (
                            <Fragment></Fragment>
                        )}
                    </div>
                ) : (
                    <Fragment></Fragment>
                )}
            </div>
            <div className="flex justify-between bet-input items-center">
                <div className="flex bet1-input items-center">
                    <div className="input-odds">
                        Tỉ lệ cược :{' '}
                        <span className="font-bold italic" style={{ color: '#ea524d' }}>
                            1
                        </span>{' '}
                        ăn{' '}
                        <span id="bet-rate-number" className="font-semibold italic" style={{ color: '#ea524d' }}>
                            {Odd}
                        </span>
                    </div>
                    <div className="input-da-chon">
                        Đã chọn : <span style={{ color: '#3a81e5' }}>{chooseNumberOk.length / DaChon}</span>
                    </div>
                    <div className="input-so-tien">
                        Số tiền :{' '}
                        <span style={{ color: '#3a81e5' }}>
                            {Intl.NumberFormat().format((chooseNumberOk.length / DaChon) * HeSo * soNhan)}
                        </span>{' '}
                        VND
                    </div>
                </div>
                <div className="flex bet2-input">
                    <div className="input-x">
                        <span>Số nhân: </span>
                        <div onClick={() => handleSoNhan('minus')} className="quantity-minus">
                            <MinusIcon width={14} height={14} />
                        </div>
                        <input
                            type="number"
                            className="quantity-value"
                            value={soNhan}
                            onChange={handleInputSoNhan}
                        ></input>
                        <div onClick={() => handleSoNhan('plus')} className="quantity-plus">
                            <PlusIcon width={14} height={14} />
                        </div>
                    </div>
                    <button className="bet-btn primary" onClick={handleDatCuoc}>
                        Cược ngay
                    </button>
                    <button className="bet-btn secondary" onClick={handleAddNumber}>
                        Thêm số
                    </button>
                    <button className="bet-btn reset" onClick={handleReset}>
                        Cài đặt lại
                    </button>
                </div>
            </div>
        </div>
    );
}

export default LoTruot;
