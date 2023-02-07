import { Fragment, useState } from 'react';
import '~/layouts/components/100So/100So.scss';
import { MinusIcon, PlusIcon } from '~/components/Icons';
import { useEffect, useContext } from 'react';
import { ThemeContext } from '~/pages/Game/Game';
import { useParams } from 'react-router-dom';
function DauDuoi({ PlayType, functionalCallback, datCuoc, callBackNoti }) {
    const [_Chuc, setChuc] = useState(true);
    const [_DonVi, setDonVi] = useState(false);
    const [PlayStyle, setPlayStyle] = useState('Dau');
    const [chooseNumberOk, setChooseNumberOk] = useState([]);
    const game = useParams()['link'];
    const Id_Game = useContext(ThemeContext);
    const [soNhan, setSoNhan] = useState(1);
    const [HeSo, setHeSo] = useState(0);
    const [Odd, setOdd] = useState(99.5);
    const [DaChon, setDachon] = useState(1);
    const [inputNumber] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    useEffect(() => {
        setChooseNumberOk([]);
        updateOdd();
    }, [PlayStyle]);
    // function update odd
    const updateOdd = () => {
        setOdd(9.9);
        setHeSo(1000);
    };
    const handleTypeClick = (e) => {
        const targetElement = e.target;
        if (!!document.querySelector('.type.active')) {
            document.querySelector('.type.active').classList.remove('active');
        }
        targetElement.classList.add('active');
        if (targetElement.getAttribute('data-so')) {
            const number = targetElement.getAttribute('data-so');
            if (String(number) === 'Dau') {
                setChuc(true);
                setDonVi(false);
                setPlayStyle('Dau');
            } else if (String(number) === 'Duoi') {
                setChuc(false);
                setDonVi(true);
                setPlayStyle('Duoi');
            }
        }
    };
    const handleLoc = (e) => {
        const targetElement = e.target;
        const action = targetElement.getAttribute('data-action');
        const row = targetElement.getAttribute('data-row');
        if (!!document.querySelector(`.btn-fast-choose.${row}.active`)) {
            document.querySelector(`.btn-fast-choose.${row}.active`).classList.remove('active');
        }
        targetElement.classList.add('active');
        let arr = [];
        if (action === 'all') {
            arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        } else if (action === 'tai') {
            arr = [5, 6, 7, 8, 9];
        } else if (action === 'xiu') {
            arr = [0, 1, 2, 3, 4];
        } else if (action === 'le') {
            arr = [1, 3, 5, 7, 9];
        } else if (action === 'chan') {
            arr = [0, 2, 4, 6, 8];
        } else {
            arr = [];
        }
        setChooseNumberOk(arr);
    };
    const handleChoose = async (e) => {
        const targetElement = e.target.offsetParent;
        if (targetElement.classList.contains('active')) {
            targetElement.classList.remove('active');
        } else {
            targetElement.classList.add('active');
        }
        const choose = Number(targetElement.getAttribute('data-choose'));
        let arr = chooseNumberOk;
        if (arr.includes(choose)) {
            arr = arr.filter((value) => value !== choose);
            setChooseNumberOk(arr);
        } else {
            setChooseNumberOk([...chooseNumberOk, choose]);
        }
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
    return (
        <div>
            <div className="flex justify-between text-xs font-thin py-2 mobile-game-content-bet">
                <ul className="flex justify-start items-center flex-1 ul1-mobile-game-content-bet">
                    <li data-so="Dau" onClick={handleTypeClick} className="type Dau active">
                        Đầu
                    </li>
                    <li data-so="Duoi" onClick={handleTypeClick} className="type Duoi">
                        Đuôi
                    </li>
                </ul>
            </div>
            <div>
                {_Chuc ? (
                    <div>
                        <div
                            style={{ backgroundColor: '#f5f5f5' }}
                            className="flex px-2 py-4 items-center flex-chon-so-mobile"
                        >
                            <h6 className={chooseNumberOk.length > 0 ? 'chuc active' : 'chuc'}>Chục</h6>
                            <ul className="flex ul-2so">
                                {inputNumber.map((value) => (
                                    <li
                                        onClick={handleChoose}
                                        className={chooseNumberOk.includes(value) ? 'active' : ''}
                                        key={value}
                                        data-choose={value}
                                        data-type="_10"
                                    >
                                        <h6>{value}</h6>
                                    </li>
                                ))}
                            </ul>
                            <div className="ml-auto button-fast-choose">
                                <button
                                    className="ul-btn btn-fast-choose _10"
                                    data-action="all"
                                    data-row="_10"
                                    onClick={handleLoc}
                                >
                                    Tất cả
                                </button>
                                <button
                                    className="ul-btn btn-fast-choose _10"
                                    data-action="tai"
                                    data-row="_10"
                                    onClick={handleLoc}
                                >
                                    Tài
                                </button>
                                <button
                                    className="ul-btn btn-fast-choose _10"
                                    data-action="xiu"
                                    data-row="_10"
                                    onClick={handleLoc}
                                >
                                    Xỉu
                                </button>
                                <button
                                    className="ul-btn btn-fast-choose _10"
                                    data-action="le"
                                    data-row="_10"
                                    onClick={handleLoc}
                                >
                                    Lẽ
                                </button>
                                <button
                                    className="ul-btn btn-fast-choose _10"
                                    data-action="chan"
                                    data-row="_10"
                                    onClick={handleLoc}
                                >
                                    Chẵn
                                </button>
                                <button
                                    className="ul-btn btn-fast-choose _10"
                                    data-action="xoa"
                                    data-row="_10"
                                    onClick={handleLoc}
                                >
                                    Xóa
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <Fragment></Fragment>
                )}
                {_DonVi ? (
                    <div>
                        <div className="flex px-2 py-4 items-center flex-chon-so-mobile">
                            <h6 className={chooseNumberOk.length > 0 ? 'chuc active' : 'chuc'}>Đơn vị</h6>
                            <ul className="flex ul-2so">
                                {inputNumber.map((value) => (
                                    <li
                                        onClick={handleChoose}
                                        className={chooseNumberOk.includes(value) ? 'active' : ''}
                                        key={value}
                                        data-choose={value}
                                        data-type="_1"
                                    >
                                        <h6>{value}</h6>
                                    </li>
                                ))}
                            </ul>
                            <div className="ml-auto button-fast-choose">
                                <button
                                    className="ul-btn btn-fast-choose _1"
                                    data-action="all"
                                    data-row="_1"
                                    onClick={handleLoc}
                                >
                                    Tất cả
                                </button>
                                <button
                                    className="ul-btn btn-fast-choose _1"
                                    data-action="tai"
                                    data-row="_1"
                                    onClick={handleLoc}
                                >
                                    Tài
                                </button>
                                <button
                                    className="ul-btn btn-fast-choose _1"
                                    data-action="xiu"
                                    data-row="_1"
                                    onClick={handleLoc}
                                >
                                    Xỉu
                                </button>
                                <button
                                    className="ul-btn btn-fast-choose _1"
                                    data-action="le"
                                    data-row="_1"
                                    onClick={handleLoc}
                                >
                                    Lẽ
                                </button>
                                <button
                                    className="ul-btn btn-fast-choose _1"
                                    data-action="chan"
                                    data-row="_1"
                                    onClick={handleLoc}
                                >
                                    Chẵn
                                </button>
                                <button
                                    className="ul-btn btn-fast-choose _1"
                                    data-action="xoa"
                                    data-row="_1"
                                    onClick={handleLoc}
                                >
                                    Xóa
                                </button>
                            </div>
                        </div>
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
export default DauDuoi;
