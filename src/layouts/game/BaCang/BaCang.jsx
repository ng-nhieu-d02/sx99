import { Fragment, useState } from 'react';
import '~/layouts/components/100So/100So.scss';
import { MinusIcon, PlusIcon } from '~/components/Icons';
import { useEffect, useContext } from 'react';
import { ThemeContext } from '~/pages/Game/Game';
import { useParams } from 'react-router-dom';

function BaCang({ PlayType, functionalCallback, datCuoc, callBackNoti }) {
    const [_2so, set2So] = useState(true);
    const [_100so, set100So] = useState(false);
    const [NhapSo, setNhapSo] = useState(false);
    const [PlayStyle, setPlayStyle] = useState('bcdau');
    const [StyleInput, setStyleInput] = useState('hs');
    const [chooseNumberOk, setChooseNumberOk] = useState([]);
    const [numbers] = useState(Array.from(Array(1000).keys()));
    const game = useParams()['link'];
    const Id_Game = useContext(ThemeContext);
    const [soNhan, setSoNhan] = useState(1);
    const [HeSo, setHeSo] = useState(0);
    const [Odd, setOdd] = useState(99.5);
    const [DaChon, setDachon] = useState(1);
    const [_100, set1T] = useState([]);
    const [_10, set1C] = useState([]);
    const [_1, set1D] = useState([]);
    const [inputNumber] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);

    useEffect(() => {
        set1C([]);
        set1D([]);
        set1T([]);
        setChooseNumberOk([]);
        updateOdd();
    }, [PlayStyle, StyleInput]);

    // function update odd
    const updateOdd = () => {
        if (PlayStyle === 'bcdau') {
            setOdd(980);
            setHeSo(1000);
        } else if (PlayStyle === 'bcdb') {
            setOdd(980);
            setHeSo(1000);
        } else {
            setOdd(980);
            setHeSo(2000);
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
            if (String(number) === 'bcdau') {
                set2So(true);
                setNhapSo(false);
                set100So(false);
                setPlayStyle('bcdau');
            } else if (String(number) === 'bcdb') {
                set2So(true);
                setNhapSo(false);
                set100So(false);
                setPlayStyle('bcdb');
            } else if (String(number) === 'bcduoi') {
                set2So(true);
                setNhapSo(false);
                set100So(false);
                setPlayStyle('bcduoi');
            }
        }
        if (document.querySelector('.option.fast.active')) {
            document.querySelector('.option.fast.active').classList.remove('active');
        }
        if (document.querySelector('.option.ns.active')) {
            document.querySelector('.option.ns.active').classList.remove('active');
        }
        if (!document.querySelector('.option.hs').classList.contains('active')) {
            document.querySelector('.option.hs').classList.add('active');
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
                set2So(false);
                setNhapSo(false);
                set100So(true);
                setStyleInput('mts');
            } else if (number === 'ns') {
                set2So(false);
                setNhapSo(true);
                set100So(false);
                setStyleInput('ns');
            } else {
                set2So(true);
                setNhapSo(false);
                set100So(false);
                setStyleInput('hs');
            }
        }
    };

    const handleChoose = async (e) => {
        const targetElement = e.target.offsetParent;
        if (targetElement.classList.contains('active')) {
            targetElement.classList.remove('active');
        } else {
            targetElement.classList.add('active');
        }
        const choose = Number(targetElement.getAttribute('data-choose'));
        const type = targetElement.getAttribute('data-type');
        let arr = [];
        if (type === '_1') {
            arr = _1;
        } else if (type === '_10') {
            arr = _10;
        } else if (type === '_100') {
            arr = _100;
        }
        if (arr.includes(choose)) {
            arr = arr.filter((item) => Number(item) !== choose);
        } else {
            arr.push(choose);
        }
        if (type === '_1') {
            set1D(arr);
        } else if (type === '_10') {
            set1C(arr);
        } else if (type === '_100') {
            set1T(arr);
        }
        let numberArr = [];
        if (type === '_1') {
            _100.map((tram) => {
                _10.map((chuc) => {
                    arr.map((donVi) => {
                        const number = tram + '' + chuc + '' + donVi;
                        numberArr.push(Number(number));
                    });
                });
            });
        } else if (type === '_10') {
            _100.map((tram) => {
                arr.map((chuc) => {
                    _1.map((donVi) => {
                        const number = tram + '' + chuc + '' + donVi;
                        numberArr.push(Number(number));
                    });
                });
            });
        } else if (type === '_100') {
            arr.map((tram) => {
                _10.map((chuc) => {
                    _1.map((donVi) => {
                        const number = tram + '' + chuc + '' + donVi;
                        numberArr.push(Number(number));
                    });
                });
            });
        }
        setChooseNumberOk(numberArr);
    };

    const handleNs = async (e) => {
        const value = e.target.value;
        let arr = value.replaceAll(';', '|').replaceAll(',', '|').replaceAll(' ', '|').split('|');
        if (arr[arr.length - 1] === '') {
            arr.pop();
        }
        arr.map((number) => {
            if (number > 999 || number < 0 || isNaN(number)) {
                callBackNoti('error', 'Cảnh báo !! bạn đang nhập sai định dạng của trò chơi !!!');
                arr.pop();
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
        set1C([]);
        set1D([]);
        set1T([]);
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
        const action = targetElement.getAttribute('data-action');
        if (!!document.querySelector(`.button-chose-csn.active`)) {
            document.querySelector(`.button-chose-csn.active`).classList.remove('active');
        }
        targetElement.classList.add('active');
        let arr = [];

        while (arr.length < Number(action)) {
            const number = Math.floor(Math.random() * 1000);
            if (arr.includes(number)) {
            } else {
                arr.push(number);
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
        if (row === '_1') {
            set1D(arr);
        } else if (row === '_10') {
            set1C(arr);
        } else {
            set1T(arr);
        }
        let numberArr = [];
        if (row === '_1') {
            _100.map((tram) => {
                _10.map((chuc) => {
                    arr.map((donVi) => {
                        const number = tram + '' + chuc + '' + donVi;
                        numberArr.push(Number(number));
                    });
                });
            });
        } else if (row === '_10') {
            _100.map((tram) => {
                arr.map((chuc) => {
                    _1.map((donVi) => {
                        const number = tram + '' + chuc + '' + donVi;
                        numberArr.push(Number(number));
                    });
                });
            });
        } else {
            arr.map((tram) => {
                _10.map((chuc) => {
                    _1.map((donVi) => {
                        const number = tram + '' + chuc + '' + donVi;
                        numberArr.push(Number(number));
                    });
                });
            });
        }

        setChooseNumberOk(numberArr);
    };

    return (
        <div>
            <div className="flex justify-between text-xs font-thin py-2 mobile-game-content-bet">
                <ul className="flex justify-start items-center flex-1 ul1-mobile-game-content-bet">
                    <li className="type active bcdau" onClick={handleTypeClick} data-so="bcdau">
                        Ba Càng Đầu
                    </li>
                    <li className="type bcdb" onClick={handleTypeClick} data-so="bcdb">
                        3 Càng Đặc Biệt
                    </li>
                    <li className="type bcduoi" onClick={handleTypeClick} data-so="bcduoi">
                        3 Càng Đuôi
                    </li>
                </ul>
                <ul className="flex ul2-mobile-game-content-bet">
                    <li onClick={handleOptionClick} data-so="hs" className="option hs active">
                        Chọn số
                    </li>
                    <li className="option ns" onClick={handleOptionClick} data-so="ns">
                        Nhập số
                    </li>
                    <li
                        style={{ borderLeft: '1px' }}
                        onClick={handleOptionClick}
                        data-so="mts"
                        className="rounded-r-md option fast"
                    >
                        Chọn số nhanh
                    </li>
                </ul>
            </div>
            <div>
                {_2so ? (
                    <div>
                        <div
                            style={{ backgroundColor: '#f5f5f5' }}
                            className="flex px-2 py-4 items-center flex-chon-so-mobile"
                        >
                            <h6 className={_100.length > 0 ? 'chuc active' : 'chuc'}>Trăm</h6>
                            <ul className="flex ul-2so">
                                {inputNumber.map((value) => (
                                    <li
                                        onClick={handleChoose}
                                        className={_100.includes(value) ? 'active' : ''}
                                        key={value}
                                        data-choose={value}
                                        data-type="_100"
                                    >
                                        <h6>{value}</h6>
                                    </li>
                                ))}
                            </ul>
                            <div className="ml-auto button-fast-choose">
                                <button
                                    className="ul-btn btn-fast-choose _100"
                                    data-action="all"
                                    data-row="_100"
                                    onClick={handleLoc}
                                >
                                    Tất cả
                                </button>
                                <button
                                    className="ul-btn btn-fast-choose _100"
                                    data-action="tai"
                                    data-row="_100"
                                    onClick={handleLoc}
                                >
                                    Tài
                                </button>
                                <button
                                    className="ul-btn btn-fast-choose _100"
                                    data-action="xiu"
                                    data-row="_100"
                                    onClick={handleLoc}
                                >
                                    Xỉu
                                </button>
                                <button
                                    className="ul-btn btn-fast-choose _100"
                                    data-action="le"
                                    data-row="_100"
                                    onClick={handleLoc}
                                >
                                    Lẽ
                                </button>
                                <button
                                    className="ul-btn btn-fast-choose _100"
                                    data-action="chan"
                                    data-row="_100"
                                    onClick={handleLoc}
                                >
                                    Chẵn
                                </button>
                                <button
                                    className="ul-btn btn-fast-choose _100"
                                    data-action="xoa"
                                    data-row="_100"
                                    onClick={handleLoc}
                                >
                                    Xóa
                                </button>
                            </div>
                        </div>
                        <div
                            style={{ backgroundColor: '#f5f5f5' }}
                            className="flex px-2 py-4 items-center flex-chon-so-mobile"
                        >
                            <h6 className={_10.length > 0 ? 'chuc active' : 'chuc'}>Chục</h6>
                            <ul className="flex ul-2so">
                                {inputNumber.map((value) => (
                                    <li
                                        onClick={handleChoose}
                                        className={_10.includes(value) ? 'active' : ''}
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
                        <div className="flex px-2 py-4 items-center flex-chon-so-mobile">
                            <h6 className={_1.length > 0 ? 'chuc active' : 'chuc'}>Đơn vị</h6>
                            <ul className="flex ul-2so">
                                {inputNumber.map((value) => (
                                    <li
                                        onClick={handleChoose}
                                        className={_1.includes(value) ? 'active' : ''}
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
                                <button className="one mt-4 button-chose-csn" data-action="10" onClick={handleCSNbt}>
                                    10 Số
                                </button>
                                <button className="one mt-4 button-chose-csn" data-action="20" onClick={handleCSNbt}>
                                    20 Số
                                </button>
                                <button className="one mt-4 button-chose-csn" data-action="30" onClick={handleCSNbt}>
                                    30 Số
                                </button>
                                <button className="one mt-4 button-chose-csn" data-action="40" onClick={handleCSNbt}>
                                    40 Số
                                </button>
                                <button className="one mt-4 button-chose-csn" data-action="50" onClick={handleCSNbt}>
                                    50 Số
                                </button>
                                <button className="one mt-4 button-chose-csn" data-action="100" onClick={handleCSNbt}>
                                    100 Số
                                </button>
                                <button className="one mt-4 button-chose-csn" data-action="200" onClick={handleCSNbt}>
                                    200 Số
                                </button>
                                <button className="one mt-4 button-chose-csn" data-action="400" onClick={handleCSNbt}>
                                    400 Số
                                </button>
                            </div>
                            <div style={{ width: '70%' }} className="flex flex-wrap ">
                                {numbers.map((number) => {
                                    if (number < 10) {
                                        number = `0${number}`;
                                    }
                                    return (
                                        <h2
                                            className={
                                                chooseNumberOk.includes(Number(number))
                                                    ? 'number-item active'
                                                    : 'number-item'
                                            }
                                            onClick={handleMST}
                                            data-so={Number(number)}
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
                                    <>
                                        112 <span style={{ color: 'red' }}>,</span>
                                        145 hoặc 113 416 hoặc 113
                                        <span style={{ color: 'red' }}>;</span>146 hoặc 113
                                        <span style={{ color: 'red' }}>|</span>451
                                    </>
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

export default BaCang;
