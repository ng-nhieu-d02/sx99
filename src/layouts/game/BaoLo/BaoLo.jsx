import './BaoLo.scss';
import { useState, Fragment } from 'react';
import { MinusIcon, PlusIcon } from '~/components/Icons';
import { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ThemeContext } from '~/pages/Game/Game';

function BaoLo({ PlayType, functionalCallback, datCuoc, callBackNoti }) {
    const [_2so, set2So] = useState(true);
    const [_3so, set3So] = useState(false);
    const [_4so, set4So] = useState(false);
    const [NhapSo, setNhapSo] = useState(false);
    const [_100so, set100So] = useState(false);
    const [PlayStyle, setPlayStyle] = useState('l2s');
    const [StyleInput, setStyleInput] = useState('hs');
    const [_1000, set1N] = useState([]);
    const [_100, set1T] = useState([]);
    const [_10, set1C] = useState([]);
    const [_1, set1D] = useState([]);

    const game = useParams()['link'];
    const Id_Game = useContext(ThemeContext);

    const [numbers] = useState(Array.from(Array(100).keys()));
    const [inputNumber] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    const [chooseNumberOk, setChooseNumberOk] = useState([]);
    const [soNhan, setSoNhan] = useState(1);
    const [HeSo, setHeSo] = useState(0);
    const [Odd, setOdd] = useState(99.5);

    const handleTypeClick = (e) => {
        const targetElement = e.target;
        if (!!document.querySelector('.type.active')) {
            document.querySelector('.type.active').classList.remove('active');
        }
        if (!!document.querySelector('.btn-fast-choose.active')) {
            document.querySelector('.btn-fast-choose.active').classList.remove('active');
        }
        targetElement.classList.add('active');
        if (targetElement.getAttribute('data-so')) {
            const number = targetElement.getAttribute('data-so');
            if (number === 'l2s') {
                set2So(true);
                set3So(false);
                set4So(false);
                setNhapSo(false);
                set100So(false);
                setPlayStyle('l2s');
            } else if (number === 'l2sd') {
                set2So(true);
                set3So(false);
                set4So(false);
                setNhapSo(false);
                set100So(false);
                setPlayStyle('l2sd');
            } else if (number === 'l2s1k') {
                set2So(true);
                set3So(false);
                set4So(false);
                setNhapSo(false);
                set100So(false);
                setPlayStyle('l2s1k');
            } else if (number === 'l3s') {
                set2So(false);
                set3So(true);
                set4So(false);
                setNhapSo(false);
                set100So(false);
                setPlayStyle('l3s');
            } else {
                set2So(false);
                set3So(false);
                set4So(true);
                setNhapSo(false);
                set100So(false);
                setPlayStyle('l4s');
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
    };
    const handleOptionClick = (e) => {
        const targetElement = e.target;
        if (!!document.querySelector('.btn-fast-choose.active')) {
            document.querySelector('.btn-fast-choose.active').classList.remove('active');
        }
        if (!!document.querySelector('.option.active')) {
            document.querySelector('.option.active').classList.remove('active');
        }
        targetElement.classList.add('active');
        if (targetElement.getAttribute('data-so')) {
            const number = targetElement.getAttribute('data-so');
            if (number === 'mts') {
                set2So(false);
                set3So(false);
                set4So(false);
                setNhapSo(false);
                set100So(true);
                setStyleInput('mts');
            } else if (number === 'hs') {
                if (PlayStyle === 'l2s' || PlayStyle === 'l2sd' || PlayStyle === 'l2s1k') {
                    set2So(true);
                    set3So(false);
                    set4So(false);
                    setNhapSo(false);
                    set100So(false);
                } else if (PlayStyle === 'l3s') {
                    set2So(false);
                    set3So(true);
                    set4So(false);
                    setNhapSo(false);
                    set100So(false);
                } else if (PlayStyle === 'l4s') {
                    set2So(false);
                    set3So(false);
                    set4So(true);
                    setNhapSo(false);
                    set100So(false);
                }
                setStyleInput('hs');
            } else {
                set2So(false);
                set3So(false);
                set4So(false);
                setNhapSo(true);
                set100So(false);
                setStyleInput('ns');
            }
        }
    };
    useEffect(() => {
        set1N([]);
        set1T([]);
        set1C([]);
        set1D([]);
        setChooseNumberOk([]);
        updateOdd();
    }, [PlayStyle, StyleInput]);

    // chọn số
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
        } else {
            arr = _1000;
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
        } else {
            set1N(arr);
        }
        let numberArr = [];
        if (PlayStyle === 'l2s' || PlayStyle === 'l2sd' || PlayStyle === 'l2s1k') {
            if (type === '_1') {
                _10.map((chuc) => {
                    arr.map((donVi) => {
                        const number = chuc + '' + donVi;
                        numberArr.push(Number(number));
                    });
                });
            } else {
                arr.map((chuc) => {
                    _1.map((donVi) => {
                        const number = chuc + '' + donVi;
                        numberArr.push(Number(number));
                    });
                });
            }
        } else if (PlayStyle === 'l3s') {
            if (type === '_100') {
                arr.map((tram) => {
                    _10.map((chuc) => {
                        _1.map((DonVi) => {
                            const number = tram + '' + chuc + '' + DonVi;
                            numberArr.push(Number(number));
                        });
                    });
                });
            } else if (type === '_10') {
                _100.map((tram) => {
                    arr.map((chuc) => {
                        _1.map((DonVi) => {
                            const number = tram + '' + chuc + '' + DonVi;
                            numberArr.push(Number(number));
                        });
                    });
                });
            } else {
                _100.map((tram) => {
                    _10.map((chuc) => {
                        arr.map((DonVi) => {
                            const number = tram + '' + chuc + '' + DonVi;
                            numberArr.push(Number(number));
                        });
                    });
                });
            }
        } else if (PlayStyle === 'l4s') {
            if (type === '_1000') {
                arr.map((nghin) => {
                    _100.map((tram) => {
                        _10.map((chuc) => {
                            _1.map((DonVi) => {
                                const number = nghin + '' + tram + '' + chuc + '' + DonVi;
                                numberArr.push(Number(number));
                            });
                        });
                    });
                });
            } else if (type === '_100') {
                _1000.map((nghin) => {
                    arr.map((tram) => {
                        _10.map((chuc) => {
                            _1.map((DonVi) => {
                                const number = nghin + '' + tram + '' + chuc + '' + DonVi;
                                numberArr.push(Number(number));
                            });
                        });
                    });
                });
            } else if (type === '_10') {
                _1000.map((nghin) => {
                    _100.map((tram) => {
                        arr.map((chuc) => {
                            _1.map((DonVi) => {
                                const number = nghin + '' + tram + '' + chuc + '' + DonVi;
                                numberArr.push(Number(number));
                            });
                        });
                    });
                });
            } else {
                _1000.map((nghin) => {
                    _100.map((tram) => {
                        _10.map((chuc) => {
                            arr.map((DonVi) => {
                                const number = nghin + '' + tram + '' + chuc + '' + DonVi;
                                numberArr.push(Number(number));
                            });
                        });
                    });
                });
            }
        }
        setChooseNumberOk(numberArr);
    };
    // chọn số

    // nhập số
    const handleNs = async (e) => {
        const value = e.target.value;
        let arr = value.replaceAll(';', '|').replaceAll(',', '|').replaceAll(' ', '|').split('|');
        if (arr[arr.length - 1] === '') {
            arr.pop();
        }
        arr.map((number) => {
            if (PlayStyle === 'l2s' || PlayStyle === 'l2sd' || PlayStyle === 'l2s1k') {
                if (number > 99 || number < 0 || isNaN(number)) {
                    callBackNoti('error', 'Cảnh báo !! bạn đang nhập sai định dạng của trò chơi !!!');

                    arr.pop();
                }
            } else if (PlayStyle === 'l3s') {
                if (number > 999 || number < 0 || isNaN(number)) {
                    callBackNoti('error', 'Cảnh báo !! bạn đang nhập sai định dạng của trò chơi !!!');
                    arr.pop();
                }
            } else {
                if (number > 9999 || number < 0 || isNaN(number)) {
                    callBackNoti('error', 'Cảnh báo !! bạn đang nhập sai định dạng của trò chơi !!!');
                    arr.pop();
                }
            }
        });
        setChooseNumberOk(arr);
    };
    // nhập số

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

    // function update odd
    const updateOdd = () => {
        if (PlayStyle === 'l2s') {
            setOdd(99.5);
            setHeSo(18000);
        } else if (PlayStyle === 'l2sd') {
            setOdd(99.5);
            setHeSo(15500);
        } else if (PlayStyle === 'l2s1k') {
            setOdd(5.5);
            setHeSo(1000);
        } else if (PlayStyle === 'l3s') {
            setOdd(980);
            setHeSo(17000);
        } else {
            setOdd(8880);
            setHeSo(16000);
        }
    };

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

    // đặt cược
    const handleDatCuoc = () => {
        // console.log('game : ' + game);
        // console.log('Kiểu chơi : ' + PlayType);
        // console.log('Cách chơi : ' + PlayStyle);
        // console.log('Id game : ' + Id_Game);
        // console.log('Hệ số : ' + HeSo);
        // console.log('Đã chọn : ' + 1);
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
    // đặt cược

    // thêm số
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
        set1N([]);
        set1T([]);
        set1C([]);
        set1D([]);
        setChooseNumberOk([]);
        functionalCallback(arr);
    };
    // thêm số

    // clear
    const handleReset = () => {
        setChooseNumberOk([]);
        setSoNhan(1);
        set1N([]);
        set1T([]);
        set1C([]);
        set1D([]);
    };
    // clear

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
        if (row === '_1000') {
            set1N(arr);
        } else if (row === '_100') {
            set1T(arr);
        } else if (row === '_10') {
            set1C(arr);
        } else {
            set1D(arr);
        }
        let numberArr = [];
        if (PlayStyle === 'l2s' || PlayStyle === 'l2sd' || PlayStyle === 'l2s1k') {
            if (row === '_1') {
                _10.map((chuc) => {
                    arr.map((donVi) => {
                        const number = chuc + '' + donVi;
                        numberArr.push(Number(number));
                    });
                });
            } else {
                arr.map((chuc) => {
                    _1.map((donVi) => {
                        const number = chuc + '' + donVi;
                        numberArr.push(Number(number));
                    });
                });
            }
        } else if (PlayStyle === 'l3s') {
            if (row === '_100') {
                arr.map((tram) => {
                    _10.map((chuc) => {
                        _1.map((DonVi) => {
                            const number = tram + '' + chuc + '' + DonVi;
                            numberArr.push(Number(number));
                        });
                    });
                });
            } else if (row === '_10') {
                _100.map((tram) => {
                    arr.map((chuc) => {
                        _1.map((DonVi) => {
                            const number = tram + '' + chuc + '' + DonVi;
                            numberArr.push(Number(number));
                        });
                    });
                });
            } else {
                _100.map((tram) => {
                    _10.map((chuc) => {
                        arr.map((DonVi) => {
                            const number = tram + '' + chuc + '' + DonVi;
                            numberArr.push(Number(number));
                        });
                    });
                });
            }
        } else if (PlayStyle === 'l4s') {
            if (row === '_1000') {
                arr.map((nghin) => {
                    _100.map((tram) => {
                        _10.map((chuc) => {
                            _1.map((DonVi) => {
                                const number = nghin + '' + tram + '' + chuc + '' + DonVi;
                                numberArr.push(Number(number));
                            });
                        });
                    });
                });
            } else if (row === '_100') {
                _1000.map((nghin) => {
                    arr.map((tram) => {
                        _10.map((chuc) => {
                            _1.map((DonVi) => {
                                const number = nghin + '' + tram + '' + chuc + '' + DonVi;
                                numberArr.push(Number(number));
                            });
                        });
                    });
                });
            } else if (row === '_10') {
                _1000.map((nghin) => {
                    _100.map((tram) => {
                        arr.map((chuc) => {
                            _1.map((DonVi) => {
                                const number = nghin + '' + tram + '' + chuc + '' + DonVi;
                                numberArr.push(Number(number));
                            });
                        });
                    });
                });
            } else {
                _1000.map((nghin) => {
                    _100.map((tram) => {
                        _10.map((chuc) => {
                            arr.map((DonVi) => {
                                const number = nghin + '' + tram + '' + chuc + '' + DonVi;
                                numberArr.push(Number(number));
                            });
                        });
                    });
                });
            }
        }
        setChooseNumberOk(numberArr);
    };

    const handleCSNbt = (e) => {
        const targetElement = e.target;
        const action = targetElement.getAttribute('data-action');
        if (!!document.querySelector(`.button-chose-csn.active`)) {
            document.querySelector(`.button-chose-csn.active`).classList.remove('active');
        }
        targetElement.classList.add('active');
        let arr = [];
        if (action === 'one') {
            arr.push(Math.floor(Math.random() * 100));
        } else if (action === 'two') {
            const number1 = Math.floor(Math.random() * 100);
            arr.push(number1);
            let number2 = Math.floor(Math.random() * 100);
            while (number1 === number2) {
                number2 = Math.floor(Math.random() * 100);
            }
            arr.push(number2);
        } else if (action === 'three') {
            const number1 = Math.floor(Math.random() * 100);
            arr.push(number1);
            let number2 = Math.floor(Math.random() * 100);
            while (number1 === number2) {
                number2 = Math.floor(Math.random() * 100);
            }
            arr.push(number2);
            let number3 = Math.floor(Math.random() * 100);
            while (number3 === number2 || number3 === number1) {
                number3 = Math.floor(Math.random() * 100);
            }
            arr.push(number3);
        } else if (action === 'five') {
            const number1 = Math.floor(Math.random() * 100);
            arr.push(number1);
            let number2 = Math.floor(Math.random() * 100);
            while (number1 === number2) {
                number2 = Math.floor(Math.random() * 100);
            }
            arr.push(number2);
            let number3 = Math.floor(Math.random() * 100);
            while (number3 === number2 || number3 === number1) {
                number3 = Math.floor(Math.random() * 100);
            }
            arr.push(number3);
            let number4 = Math.floor(Math.random() * 100);
            while (number4 === number3 || number4 === number2 || number4 === number1) {
                number3 = Math.floor(Math.random() * 100);
            }
            arr.push(number4);
            let number5 = Math.floor(Math.random() * 100);
            while (number5 === number4 || number5 === number3 || number5 === number2 || number5 === number1) {
                number3 = Math.floor(Math.random() * 100);
            }
            arr.push(number5);
        } else if (action === 'ten') {
            const number1 = Math.floor(Math.random() * 100);
            arr.push(number1);
            let number2 = Math.floor(Math.random() * 100);
            while (number1 === number2) {
                number2 = Math.floor(Math.random() * 100);
            }
            arr.push(number2);
            let number3 = Math.floor(Math.random() * 100);
            while (number3 === number2 || number3 === number1) {
                number3 = Math.floor(Math.random() * 100);
            }
            arr.push(number3);
            let number4 = Math.floor(Math.random() * 100);
            while (number4 === number3 || number4 === number2 || number4 === number1) {
                number3 = Math.floor(Math.random() * 100);
            }
            arr.push(number4);
            let number5 = Math.floor(Math.random() * 100);
            while (number5 === number4 || number5 === number3 || number5 === number2 || number5 === number1) {
                number3 = Math.floor(Math.random() * 100);
            }
            arr.push(number5);
            let number6 = Math.floor(Math.random() * 100);
            while (
                number6 === number5 ||
                number6 === number4 ||
                number6 === number3 ||
                number6 === number2 ||
                number6 === number1
            ) {
                number6 = Math.floor(Math.random() * 100);
            }
            arr.push(number6);
            let number7 = Math.floor(Math.random() * 100);
            while (
                number7 === number6 ||
                number7 === number5 ||
                number7 === number4 ||
                number7 === number3 ||
                number7 === number2 ||
                number7 === number1
            ) {
                number7 = Math.floor(Math.random() * 100);
            }
            arr.push(number7);
            let number8 = Math.floor(Math.random() * 100);
            while (
                number8 === number7 ||
                number8 === number6 ||
                number8 === number5 ||
                number8 === number4 ||
                number8 === number3 ||
                number8 === number2 ||
                number8 === number1
            ) {
                number8 = Math.floor(Math.random() * 100);
            }
            arr.push(number8);
            let number9 = Math.floor(Math.random() * 100);
            while (
                number9 === number8 ||
                number9 === number7 ||
                number9 === number6 ||
                number9 === number5 ||
                number9 === number4 ||
                number9 === number3 ||
                number9 === number2 ||
                number9 === number1
            ) {
                number9 = Math.floor(Math.random() * 100);
            }
            arr.push(number9);
            let number10 = Math.floor(Math.random() * 100);
            while (
                number10 === number9 ||
                number10 === number8 ||
                number10 === number7 ||
                number10 === number6 ||
                number10 === number5 ||
                number10 === number4 ||
                number10 === number3 ||
                number10 === number2 ||
                number10 === number1
            ) {
                number10 = Math.floor(Math.random() * 100);
            }
            arr.push(number10);
        } else if (action === 'tai') {
            arr = [
                50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75,
                76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99,
            ];
        } else if (action === 'xiu') {
            arr = [
                0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27,
                28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49,
            ];
        } else if (action === 'chan') {
            arr = [
                0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50, 52,
                54, 56, 58, 60, 62, 64, 66, 68, 70, 72, 74, 76, 78, 80, 82, 84, 86, 88, 90, 92, 94, 96, 98,
            ];
        } else {
            arr = [
                1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35, 37, 39, 41, 43, 45, 47, 49, 51, 53,
                55, 57, 59, 61, 63, 65, 67, 69, 71, 73, 75, 77, 79, 81, 83, 85, 87, 89, 91, 93, 95, 97, 99,
            ];
        }
        setChooseNumberOk(arr);
    };

    return (
        <>
            <div className="flex justify-between text-xs font-thin py-2 mobile-game-content-bet">
                <ul className="flex justify-start items-center flex-1 ul1-mobile-game-content-bet">
                    <li data-so="l2s" onClick={handleTypeClick} className="type active l2s">
                        Lô 2 Số
                    </li>
                    <li data-so="l2sd" onClick={handleTypeClick} className="type l2sd">
                        Lô 2 Số Đầu
                    </li>
                    <li data-so="l2s1k" onClick={handleTypeClick} className="type l2s1k">
                        Lô 2 Số 1K
                    </li>
                    <li data-so="l3s" onClick={handleTypeClick} className="type l3s">
                        Lô 3 Số
                    </li>
                    <li data-so="l4s" onClick={handleTypeClick} className="type l4s">
                        Lô 4 Số
                    </li>
                </ul>
                <ul className="flex option-cs ul2-mobile-game-content-bet">
                    <li onClick={handleOptionClick} data-so="hs" className="option hs active">
                        Chọn số
                    </li>
                    <li onClick={handleOptionClick} data-so="ns" className="option ns">
                        Nhập số
                    </li>
                    {PlayStyle === 'l4s' || PlayStyle === 'l3s' ? (
                        <Fragment></Fragment>
                    ) : (
                        <li data-so="mts" onClick={handleOptionClick} className="option fast">
                            Chọn số nhanh
                        </li>
                    )}
                </ul>
            </div>
            <div>
                {_2so ? (
                    <div>
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
                {_3so ? (
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
                        <div className="flex px-2 py-4 items-center flex-chon-so-mobile">
                            {/* add class active */}
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
                        <div
                            style={{ backgroundColor: '#f5f5f5' }}
                            className="flex px-2 py-4 items-center flex-chon-so-mobile"
                        >
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
                {_4so ? (
                    <div>
                        <div
                            style={{ backgroundColor: '#f5f5f5' }}
                            className="flex px-2 py-4 items-center flex-chon-so-mobile"
                        >
                            {/* add class active */}
                            <h6 className={_1000.length > 0 ? 'chuc active' : 'chuc'}>Ngàn</h6>
                            <ul className="flex ul-2so">
                                {inputNumber.map((value) => (
                                    <li
                                        onClick={handleChoose}
                                        className={_1000.includes(value) ? 'active' : ''}
                                        key={value}
                                        data-choose={value}
                                        data-type="_1000"
                                    >
                                        <h6>{value}</h6>
                                    </li>
                                ))}
                            </ul>
                            <div className="ml-auto button-fast-choose">
                                <button
                                    className="ul-btn btn-fast-choose _1000"
                                    data-action="all"
                                    data-row="_1000"
                                    onClick={handleLoc}
                                >
                                    Tất cả
                                </button>
                                <button
                                    className="ul-btn btn-fast-choose _1000"
                                    data-action="tai"
                                    data-row="_1000"
                                    onClick={handleLoc}
                                >
                                    Tài
                                </button>
                                <button
                                    className="ul-btn btn-fast-choose _1000"
                                    data-action="xiu"
                                    data-row="_1000"
                                    onClick={handleLoc}
                                >
                                    Xỉu
                                </button>
                                <button
                                    className="ul-btn btn-fast-choose _1000"
                                    data-action="le"
                                    data-row="_1000"
                                    onClick={handleLoc}
                                >
                                    Lẽ
                                </button>
                                <button
                                    className="ul-btn btn-fast-choose _1000"
                                    data-action="chan"
                                    data-row="_1000"
                                    onClick={handleLoc}
                                >
                                    Chẵn
                                </button>
                                <button
                                    className="ul-btn btn-fast-choose _1000"
                                    data-action="xoa"
                                    data-row="_1000"
                                    onClick={handleLoc}
                                >
                                    Xóa
                                </button>
                            </div>
                        </div>
                        <div className="flex px-2 py-4 items-center flex-chon-so-mobile">
                            {/* add class active */}
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
                            {/* add class active */}
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
                                <button className="one mt-4 button-chose-csn" data-action="one" onClick={handleCSNbt}>
                                    1 Số
                                </button>
                                <button className="one mt-4 button-chose-csn" data-action="two" onClick={handleCSNbt}>
                                    2 Số
                                </button>
                                <button className="one mt-4 button-chose-csn" data-action="three" onClick={handleCSNbt}>
                                    3 Số
                                </button>
                                <button className="one mt-4 button-chose-csn" data-action="five" onClick={handleCSNbt}>
                                    5 Số
                                </button>
                                <button className="one mt-4 button-chose-csn" data-action="ten" onClick={handleCSNbt}>
                                    10 Số
                                </button>
                                <h6 className="nn title-h6-csn">Gợi ý</h6>
                                <button className="one mt-4 button-chose-csn" data-action="chan" onClick={handleCSNbt}>
                                    Chẵn
                                </button>
                                <button className="one mt-4 button-chose-csn" data-action="le" onClick={handleCSNbt}>
                                    Lẻ
                                </button>
                                <button className="one mt-4 button-chose-csn" data-action="tai" onClick={handleCSNbt}>
                                    Tài
                                </button>
                                <button className="one mt-4 button-chose-csn" data-action="xiu" onClick={handleCSNbt}>
                                    Xĩu
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
                                    {PlayStyle === 'l3s' ? (
                                        <>
                                            123 <span style={{ color: 'red' }}>,</span>
                                            456 hoặc 123 456 hoặc 123
                                            <span style={{ color: 'red' }}>;</span>456 hoặc 123
                                            <span style={{ color: 'red' }}>|</span>456
                                        </>
                                    ) : PlayStyle === 'l4s' ? (
                                        <>
                                            1234 <span style={{ color: 'red' }}>,</span>
                                            5678 hoặc 1234 5678 hoặc 1234
                                            <span style={{ color: 'red' }}>;</span>5678 hoặc 1234
                                            <span style={{ color: 'red' }}>|</span>5678
                                        </>
                                    ) : (
                                        <>
                                            12 <span style={{ color: 'red' }}>,</span>
                                            34 hoặc 12 34 hoặc 12
                                            <span style={{ color: 'red' }}>;</span>34 hoặc 12
                                            <span style={{ color: 'red' }}>|</span>34
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
                <div className="flex items-center bet1-input">
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
                        Đã chọn : <span style={{ color: '#3a81e5' }}>{chooseNumberOk.length}</span>
                    </div>
                    <div className="input-so-tien">
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

export default BaoLo;
