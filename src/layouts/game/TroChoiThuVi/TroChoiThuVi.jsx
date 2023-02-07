import './tctv.scss';
import { useState, useContext, useEffect } from 'react';
import { MinusIcon, PlusIcon } from '~/components/Icons';
import { ThemeContext } from '~/pages/Game/Game';
import { useParams } from 'react-router-dom';

function TroChoiThuVi({ PlayType, functionalCallback, datCuoc, callBackNoti }) {
    const [PlayStyle, setPlayStyle] = useState('lncl');
    const [chooseNumberOk, setChooseNumberOk] = useState([]);
    const [soNhan, setSoNhan] = useState(1);
    const [HeSo, setHeSo] = useState(1000);
    const [Odd, setOdd] = useState(0);
    const [Numbers, setNumber] = useState({
        0: 70,
        1: 36,
        2: 26.999,
        3: 20.5,
        4: 16.4,
        5: 13.666,
        6: 12.285,
        7: 10.875,
        8: 9.777,
        9: 9,
        10: 9.777,
        11: 10.875,
        12: 12.285,
        13: 13.666,
        14: 16.4,
        15: 20.5,
        16: 26.999,
        17: 36,
        18: 70,
        Tài: 1.995,
        Xỉu: 1.995,
        Chẳn: 1.995,
        Lẻ: 1.995,
    });

    const game = useParams()['link'];
    const Id_Game = useContext(ThemeContext);

    // số nhân
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
    // số nhân

    const handleDatCuoc = () => {
        // console.log('game : ' + game);
        // console.log('Kiểu chơi : ' + PlayType);
        // console.log('Cách chơi : ' + PlayStyle);
        // console.log('Id game : ' + Id_Game);
        // console.log('Hệ số : ' + HeSo);
        // console.log('Đã chọn : ' + chooseNumberOk.length);
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
        const arr = {
            game: game,
            PlayType: PlayType,
            PlayStyle: PlayStyle,
            Odd: Odd,
            HeSo: HeSo,
            DaChon: 1,
            Number: chooseNumberOk,
            SoNhan: x,
        };
        setChooseNumberOk([]);
        document.querySelectorAll('.lncl.active').forEach((element) => element.classList.remove('active'));
        functionalCallback(arr);
    };

    const handleReset = () => {
        setChooseNumberOk([]);
        setSoNhan(1);
    };

    const handleChoose = (e) => {
        const elementParent = e.currentTarget;
        const number = elementParent.getAttribute('data-number');
        const type = elementParent.getAttribute('data-type');
        const odds = elementParent.getAttribute('data-odds');
        if (elementParent.classList.contains('active')) {
            elementParent.classList.remove('active');
        } else {
            elementParent.classList.add('active');
        }
        if (type === 'tgt') {
            if (!!document.querySelectorAll('.lncl.active')) {
                document.querySelectorAll('.lncl.active').forEach((element) => element.classList.remove('active'));
            }
        }
        let arr = chooseNumberOk;
        let sum = Odd;
        if (PlayStyle !== type) {
            arr = [];
            setChooseNumberOk([]);
            setPlayStyle(type);
            sum = 0;
        }
        if (arr.includes(number)) {
            arr = arr.filter((value) => value !== number);
            sum -= Number(odds);
            console.log(sum);
            setOdd(sum);
            setChooseNumberOk(arr);
        } else {
            sum += Number(odds);
            setOdd(sum);
            console.log(sum);
            setChooseNumberOk([...arr, number]);
        }
    };
    return (
        <>
            <div className="flex justify-between text-xs font-thin py-2 mobile-game-content-bet">
                <ul className="flex justify-start items-center flex-1 ul1-mobile-game-content-bet">
                    <li data-so="l2sgdb" className="type active l2sgdb">
                        Lô 2 Số Giải Đặc Biệt
                    </li>
                </ul>
            </div>
            <div className="content">
                <div className="content-box">
                    <div className="title">
                        <h6>Lớn nhỏ chẵn lẻ</h6>
                    </div>
                    <div className="content-choose">
                        <li
                            onClick={handleChoose}
                            className="lncl"
                            data-odds="1.995"
                            data-number="Tai"
                            data-type="lncl"
                        >
                            <p>Tài</p>
                            <p>1.995</p>
                        </li>
                        <li
                            onClick={handleChoose}
                            className="lncl"
                            data-odds="1.995"
                            data-number="Xiu"
                            data-type="lncl"
                        >
                            <p>Xỉu</p>
                            <p>1.995</p>
                        </li>
                        <li
                            onClick={handleChoose}
                            className="lncl"
                            data-odds="1.995"
                            data-number="Chan"
                            data-type="lncl"
                        >
                            <p>Chẳn</p>
                            <p>1.995</p>
                        </li>
                        <li onClick={handleChoose} className="lncl" data-odds="1.995" data-number="Le" data-type="lncl">
                            <p>Lẻ</p>
                            <p>1.995</p>
                        </li>
                    </div>
                </div>
                <div className="content-box">
                    <div className="title">
                        <h6>Tổng giá trị</h6>
                    </div>
                    <div className="content-choose">
                        {Object.keys(Numbers).map((keys, index) => {
                            return (
                                <li
                                    key={index}
                                    onClick={handleChoose}
                                    data-number={keys}
                                    data-odds={Numbers[keys]}
                                    data-type="tgt"
                                    className={chooseNumberOk.includes(keys) ? 'active' : ''}
                                >
                                    <p>{keys}</p>
                                    <p>{Numbers[keys]}</p>
                                </li>
                            );
                        })}
                    </div>
                </div>
            </div>
            <div className="flex justify-between bet-input items-center">
                <div className="flex bet1-input items-center">
                    <div>
                        Đã chọn : <span style={{ color: '#3a81e5' }}>{chooseNumberOk.length}</span>
                    </div>
                    <div>
                        Số tiền :{' '}
                        <span style={{ color: '#3a81e5' }}>
                            {Intl.NumberFormat().format(chooseNumberOk.length * HeSo * soNhan)}
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
        </>
    );
}

export default TroChoiThuVi;
