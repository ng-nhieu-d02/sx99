import './Game.scss';
import Image from '~/components/Image';
import CountDown from '~/components/Countdown';
import {
    BaoLo,
    LoXien,
    DanhDe,
    DauDuoi,
    BaCang,
    BonCang,
    LoTruot,
    TroChoiThuVi,
    LoTruotMega,
    SoThuong,
    NhieuSo,
    Chon1,
} from '~/layouts/game';
import { useState, useEffect, Fragment, createContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { TrashIcon } from '~/components/Icons';
import { useDispatch, useSelector } from 'react-redux';
import { getHistoryBet, getInfoUser, huyDon, UserBet } from '~/Redux/apiRequest';
import { createAxios } from '../../createInstance';
import { function_loadding_create, function_loadding_delete } from '~/components/Loadding/Loadding';
import logoVlot from '~/assets/images/logoVLot.svg';

export const ThemeContext = createContext();

function Game() {
    const url = {
        'mien-bac': {
            img: 'https://hr681.com/static/img/gameicons/cp/miba.png',
            name: 'Miền Bắc',
            param: 'miba',
        },
        'ha-noi': {
            img: 'https://hr681.com/static/img/gameicons/cp/hano.png',
            name: 'Hà Nội',
            param: 'hano',
        },
        'quang-ninh': {
            img: 'https://hr681.com/static/img/gameicons/cp/quni.png',
            name: 'Quảng Ninh',
            param: 'bani',
        },
        'hai-phong': {
            img: 'https://hr681.com/static/img/gameicons/cp/haph.png',
            name: 'Hải Phòng',
            param: 'haph',
        },
        'bac-ninh': {
            img: 'https://hr681.com/static/img/gameicons/cp/bani.png',
            name: 'Bắc Ninh',
            param: 'bani',
        },
        'nam-dinh': {
            img: 'https://hr681.com/static/img/gameicons/cp/nadi.png',
            name: 'Nam Định',
            param: 'nadi',
        },
        'thai-binh': {
            img: 'https://hr681.com/static/img/gameicons/cp/thbi.png',
            name: 'Nam Định',
            param: 'thbi',
        },
        'ha-noi-vip': {
            img: 'https://hr681.com/static/img/gameicons/cp/hnvip.png',
            name: 'Hà Nội VIP',
            param: 'hnvip',
        },
        'ho-chi-minh-vip': {
            img: 'https://hr681.com/static/img/gameicons/cp/hcmvip.png',
            name: 'Hồ Chí Minh VIP',
            param: 'hcmvip',
        },
        'sieu-toc-45-giay': {
            img: 'https://hr681.com/static/img/gameicons/cp/st45g.png',
            name: 'Siêu tốc 45 giây',
            param: 'st45g',
        },
        'sieu-toc-1-phut': {
            img: 'https://hr681.com/static/img/gameicons/cp/st1p.png',
            name: 'Siêu tốc 1 phút',
            param: 'st1p',
        },
        'sieu-toc-90-giay': {
            img: 'https://hr681.com/static/img/gameicons/cp/st90p.png',
            name: 'Siêu tốc 1.5 phút',
            param: 'st90p',
        },
        'sieu-toc-2-phut': {
            img: 'https://hr681.com/static/img/gameicons/cp/st2p.png',
            name: 'Siêu Tốc 2 Phút',
            param: 'st2p',
        },
        'sieu-toc-5-phut': {
            img: 'https://hr681.com/static/img/gameicons/cp/st5p.png',
            name: 'Siêu Tốc 5 Phút',
            param: 'st5p',
        },
        'mien-bac-75-giay': {
            img: 'https://hr681.com/static/img/gameicons/cp/mbmg.png',
            name: 'M.Bắc 75 Giây',
            param: 'mbmg',
        },
        'mien-nam-sieu-toc-45-giay': {
            img: 'https://hr681.com/static/img/gameicons/cp/mnmg.png',
            name: 'M.Nam Siêu Tốc 45s',
            param: 'mnmg',
        },
        'mien-trung-75-giay': {
            img: 'https://hr681.com/static/img/gameicons/cp/mtmg.png',
            name: 'M.Trung 75 Giây',
            param: 'mtmg',
        },
        'mega-645-1-phut': {
            img: 'https://hr681.com/static/img/gameicons/cp/mg1p.png',
            name: 'Mega 6/45 1 Phút',
            param: 'mg1p',
        },
        'bac-lieu': {
            img: 'https://hr681.com/static/img/gameicons/cp/bali.png',
            name: 'Bạc Liêu',
            param: 'bali',
        },
        'vung-tau': {
            img: 'https://hr681.com/static/img/gameicons/cp/vuta.png',
            name: 'Vũng Tàu',
            param: 'vuta',
        },
        'tien-giang': {
            img: 'https://hr681.com/static/img/gameicons/cp/tigi.png',
            name: 'Tiền Giang',
            param: 'tigi',
        },
        'kien-giang': {
            img: 'https://hr681.com/static/img/gameicons/cp/kigi.png',
            name: 'Kiên Giang',
            param: 'kigi',
        },
        'da-lat': {
            img: 'https://hr681.com/static/img/gameicons/cp/dalat.png',
            name: 'Đà Lạt',
            param: 'dalat',
        },
        'ca-mau': {
            img: 'https://hr681.com/static/img/gameicons/cp/cama.png',
            name: 'Cà mau',
            param: 'cama',
        },
        'binh-phuoc': {
            img: 'https://hr681.com/static/img/gameicons/cp/biph.png',
            name: 'Bình Phước',
            param: 'biph',
        },
        'binh-duong': {
            img: 'https://hr681.com/static/img/gameicons/cp/bidu.png',
            name: 'Bình Dương',
            param: 'bidu',
        },
        'an-giang': {
            img: 'https://hr681.com/static/img/gameicons/cp/angi.png',
            name: 'An Giang',
            param: 'angi',
        },
        'binh-thuan': {
            img: 'https://hr681.com/static/img/gameicons/cp/bith.png',
            name: 'Bình Thuận',
            param: 'bith',
        },
        'can-tho': {
            img: 'https://hr681.com/static/img/gameicons/cp/cath.png',
            name: 'Cần Thơ',
            param: 'cath',
        },
        'hau-giang': {
            img: 'https://hr681.com/static/img/gameicons/cp/hagi.png',
            name: 'Hậu Giang',
            param: 'hagi',
        },
        'dong-thap': {
            img: 'https://hr681.com/static/img/gameicons/cp/doth.png',
            name: 'Đồng Tháp',
            param: 'doth',
        },
        'tay-ninh': {
            img: 'https://hr681.com/static/img/gameicons/cp/tani.png',
            name: 'Tây Ninh',
            param: 'tani',
        },
        'vinh-long': {
            img: 'https://hr681.com/static/img/gameicons/cp/vilo.png',
            name: 'Vĩnh Long',
            param: 'vilo',
        },
        'tra-vinh': {
            img: 'https://hr681.com/static/img/gameicons/cp/trvi.png',
            name: 'Trà Vinh',
            param: 'trvi',
        },
        'soc-trang': {
            img: 'https://hr681.com/static/img/gameicons/cp/sotr.png',
            name: 'Sóc Trăng',
            param: 'sotr',
        },
        'tp-ho-chi-minh': {
            img: 'https://hr681.com/static/img/gameicons/cp/tphc.png',
            name: 'TP. HCM',
            param: 'tphc',
        },
        'dong-nai': {
            img: 'https://hr681.com/static/img/gameicons/cp/dona.png',
            name: 'Đồng Nai',
            param: 'dona',
        },
        'da-nang': {
            img: 'https://hr681.com/static/img/gameicons/cp/dana.png',
            name: 'Đà Nẵng',
            param: 'dana',
        },
        'thua-thien-hue': {
            img: 'https://hr681.com/static/img/gameicons/cp/thth.png',
            name: 'Thừa Thiên Huế',
            param: 'thth',
        },
        'quang-tri': {
            img: 'https://hr681.com/static/img/gameicons/cp/qutr.png',
            name: 'Quảng Trị',
            param: 'qutr',
        },
        'phu-yen': {
            img: 'https://hr681.com/static/img/gameicons/cp/phye.png',
            name: 'Phú Yên',
            param: 'phye',
        },
        'quang-binh': {
            img: 'https://hr681.com/static/img/gameicons/cp/qubi.png',
            name: 'Quảng Bình',
            param: 'qubi',
        },
        'quang-nam': {
            img: 'https://hr681.com/static/img/gameicons/cp/quna.png',
            name: 'Quảng Nam',
            param: 'quna',
        },
        'quang-ngai': {
            img: 'https://hr681.com/static/img/gameicons/cp/qung.png',
            name: 'Quảng Ngãi',
            param: 'qung',
        },
        'kon-tum': {
            img: 'https://hr681.com/static/img/gameicons/cp/kotu.png',
            name: 'Kon Tum',
            param: 'kotu',
        },
        'khanh-hoa': {
            img: 'https://hr681.com/static/img/gameicons/cp/khho.png',
            name: 'Khánh Hòa',
            param: 'khho',
        },
        'gia-lai': {
            img: 'https://hr681.com/static/img/gameicons/cp/gila.png',
            name: 'Gia Lai',
            param: 'gila',
        },
        'binh-dinh': {
            img: 'https://hr681.com/static/img/gameicons/cp/bidi.png',
            name: 'Bình Định',
            param: 'bidi',
        },
        'dak-lak': {
            img: 'https://hr681.com/static/img/gameicons/cp/dalak.png',
            name: 'Đắk Lắk',
            param: 'dalak',
        },
        'dak-nong': {
            img: 'https://hr681.com/static/img/gameicons/cp/dano.png',
            name: 'Đắk Nông',
            param: 'dano',
        },
    };

    const notification = async (name, text) => {
        if (document.querySelector('.notification-waring')) {
            const box = document.querySelector('.notification-waring');
            if (!box.classList.contains('active')) {
                box.innerHTML = text;

                if (name === 'success') {
                    if (box.classList.contains('error')) {
                        box.classList.remove('error');
                    }
                    box.classList.add('success');
                    box.classList.add('active');
                } else {
                    if (box.classList.contains('success')) {
                        box.classList.remove('success');
                    }
                    box.classList.add('error');
                    box.classList.add('active');
                }
                const element = setTimeout(function () {
                    box.classList.remove('active');
                }, 10000);
            } else {
                box.innerHTML = text;

                if (name === 'success') {
                    if (box.classList.contains('error')) {
                        box.classList.remove('error');
                    }
                    box.classList.add('success');
                    box.classList.add('active');
                } else {
                    if (box.classList.contains('success')) {
                        box.classList.remove('success');
                    }
                    box.classList.add('error');
                    box.classList.add('active');
                }
            }
        }
    };
    const functionCallBack = (arr) => {
        if (arr.Number.length < 75) {
            const list = storage5;
            list.push(arr);
            Setstorage5(list);
            setNumberCheck(arr);
        } else {
            notification('error', 'Chỉ được phép đặt cược tối đa 75 số 1 ván cược');
        }
    };
    const hideModals = () => {
        if (storage5.length > 0) {
            const modals = document.querySelector('.content-modals');
            modals.classList.add('active');
        } else {
            notification('error', 'Cảnh báo: Chưa chọn số !!!');
        }
    };

    const [noti, setNoti] = useState(false);
    const listGames = {
        BaoLo: (
            <BaoLo
                PlayType="BaoLo"
                functionalCallback={functionCallBack}
                datCuoc={hideModals}
                callBackNoti={notification}
            />
        ),
        LoXien: (
            <LoXien
                PlayType="LoXien"
                functionalCallback={functionCallBack}
                datCuoc={hideModals}
                callBackNoti={notification}
            />
        ),
        DanhDe: (
            <DanhDe
                PlayType="DanhDe"
                functionalCallback={functionCallBack}
                datCuoc={hideModals}
                callBackNoti={notification}
            />
        ),
        DauDuoi: (
            <DauDuoi
                PlayType="DauDuoi"
                functionalCallback={functionCallBack}
                datCuoc={hideModals}
                callBackNoti={notification}
            />
        ),
        BaCang: (
            <BaCang
                PlayType="BaCang"
                functionalCallback={functionCallBack}
                datCuoc={hideModals}
                callBackNoti={notification}
            />
        ),
        BonCang: (
            <BonCang
                PlayType="BonCang"
                functionalCallback={functionCallBack}
                datCuoc={hideModals}
                callBackNoti={notification}
            />
        ),
        LoTruot: (
            <LoTruot
                PlayType="LoTruot"
                functionalCallback={functionCallBack}
                datCuoc={hideModals}
                callBackNoti={notification}
            />
        ),
        TroChoiThuVi: (
            <TroChoiThuVi
                PlayType="TroChoiThuVi"
                functionalCallback={functionCallBack}
                datCuoc={hideModals}
                callBackNoti={notification}
            />
        ),
        LoTruotMega: (
            <LoTruotMega
                PlayType="LoTruotMega"
                functionalCallback={functionCallBack}
                datCuoc={hideModals}
                callBackNoti={notification}
            />
        ),
        SoThuong: (
            <SoThuong
                PlayType="SoThuong"
                functionalCallback={functionCallBack}
                datCuoc={hideModals}
                callBackNoti={notification}
            />
        ),
        NhieuSo: (
            <NhieuSo
                PlayType="NhieuSo"
                functionalCallback={functionCallBack}
                datCuoc={hideModals}
                callBackNoti={notification}
            />
        ),
        Chon1: (
            <Chon1
                PlayType="Chon1"
                functionalCallback={functionCallBack}
                datCuoc={hideModals}
                callBackNoti={notification}
            />
        ),
    };

    const paramsLink = useParams()['link'];

    const [days, setDays] = useState(false);
    const [gameIn, setGameIn] = useState([]);

    const [game, setGame] = useState(listGames['BaoLo']);
    const [result, setResult] = useState([]);
    const [resultSx, setResultSx] = useState([]);
    const [kq1, setKq1] = useState([]);
    const [issueList, setIssueList] = useState([]);
    const [resultToday, setResultToday] = useState([]);
    const [infoGame, setInfoGame] = useState([]);
    const [storage5, Setstorage5] = useState([]);
    const [numberCheck, setNumberCheck] = useState([]);
    const [total, setTotal] = useState(0);
    const user = useSelector((state) => state.auth.login.currentUser);
    const infoUser = useSelector((state) => state.auth.info?.infoUser);
    const [history, setHistory] = useState([]);
    const dispatch = useDispatch();
    const axiosJWT = createAxios(user, dispatch);
    const [StypeActive, setStyleActive] = useState('l2s');

    async function fetch() {
        if (user) {
            setTimeout(async () => {
                const response = await getHistory(user.access_token);
                setHistory(response.data.data);
                const res = await getInfoUser(user, dispatch, axiosJWT, infoUser.money);
                if (res !== false) {
                    notification('success', `+ ${Intl.NumberFormat().format(res)} VNĐ`);
                }
            }, 3000);
        }
    }

    const refresh = () => {
        getData(url[paramsLink].param, 0);
        setTimeout(function () {
            getData(url[paramsLink].param, 0);
        }, 4000);
        setTimeout(function () {
            getData(url[paramsLink].param, 0);
        }, 7000);
    };

    const handleClick = (e) => {
        const targetElement = e.target;
        const name = targetElement.getAttribute('data-name');
        setGame(listGames[name]);
        document.querySelector('.game-item.active').classList.remove('active');
        targetElement.classList.add('active');
        const changeNameClick = document.querySelector('.game-name-click');

        if (name === 'BaoLo') {
            changeNameClick.innerHTML = 'Lô 2 Số';
            setStyleActive('l2s');
        } else if (name === 'LoXien') {
            changeNameClick.innerHTML = 'Xiên 2';
            setStyleActive('x2');
        } else if (name === 'DanhDe') {
            changeNameClick.innerHTML = 'Đề Đầu';
            setStyleActive('DeDau');
        } else if (name === 'DauDuoi') {
            changeNameClick.innerHTML = 'Đầu';
            setStyleActive('Dau');
        } else if (name === 'BaCang') {
            changeNameClick.innerHTML = '3 Càng Đầu';
            setStyleActive('bcdau');
        } else if (name === 'BonCang') {
            changeNameClick.innerHTML = '4 Càng Đặc Biệt';
            setStyleActive('boncdb');
        } else if (name === 'LoTruot') {
            changeNameClick.innerHTML = 'Trượt Xiên 4';
            setStyleActive('tx4');
        } else if (name === 'TroChoiThuVi') {
            changeNameClick.innerHTML = 'Lô 2 Số Giải ĐB';
            setStyleActive('lncl');
        } else if (name === 'SoThuong') {
            changeNameClick.innerHTML = 'Số Thường';
        } else if (name === 'NhieuSo') {
            changeNameClick.innerHTML = 'Trúng 4 Số';
        } else if (name === 'LoTruotMega') {
            changeNameClick.innerHTML = 'Trượt Xiên 5';
        } else if (name === 'Chon1') {
            changeNameClick.innerHTML = 'Chọn 5 Ăn 1';
        }
    };
    const handleViewResult = (e) => {
        const targetElement = e.target;
        const index = targetElement.getAttribute('data-index');
        getData(url[paramsLink].param, index);
    };
    const handleRemoveNumber = (e) => {
        const targetElement = e.target;
        const index = targetElement.getAttribute('data-index');
        let arr = storage5;
        arr.splice(index, 1);
        Setstorage5(arr);
        setNumberCheck([1, 4, 6, 2, 1000]);
    };
    const handleRemove = () => {
        let arr = storage5;
        arr.length = 0;
        Setstorage5(arr);
        setNumberCheck([1, 4, 3, 5, 10, 9]);
    };
    const handleHuyDon = async (id) => {
        await function_loadding_create();
        const response = await huyDon(id, user.access_token, axiosJWT);
        if (response.status === 200) {
            const res = await getHistory(user.access_token);
            setHistory(res.data.data);
            await function_loadding_delete();
            notification('success', `Đã huỷ bỏ cược id ${id}`);
            setTimeout(async () => {
                await getInfoUser(user, dispatch, axiosJWT, infoUser.money);
            }, 500);
        } else {
            await function_loadding_delete();
            notification('error', `Không thể huỷ bỏ đơn đặt cược ${id}`);
        }
    };
    window.addEventListener('click', (event) => {
        const targetElement = event.target;
        const changeNameClick = document.querySelector('.game-name-click');
        if (targetElement.classList.contains('l2s')) {
            changeNameClick.innerHTML = 'Lô 2 Số';
            setStyleActive('l2s');
        } else if (targetElement.classList.contains('l2sd')) {
            changeNameClick.innerHTML = 'Lô 2 Số Đầu';
            setStyleActive('l2sd');
        } else if (targetElement.classList.contains('l2s1k')) {
            changeNameClick.innerHTML = 'Lô 2 Số 1K';
            setStyleActive('l2s1k');
        } else if (targetElement.classList.contains('l3s')) {
            changeNameClick.innerHTML = 'Lô 3 Số';
            setStyleActive('l3s');
        } else if (targetElement.classList.contains('l4s')) {
            changeNameClick.innerHTML = 'Lô 4 Số';
            setStyleActive('l4s');
        } else if (targetElement.classList.contains('x2')) {
            changeNameClick.innerHTML = 'Xiên 2';
            setStyleActive('x2');
        } else if (targetElement.classList.contains('x3')) {
            changeNameClick.innerHTML = 'Xiên 3';
            setStyleActive('x3');
        } else if (targetElement.classList.contains('x4')) {
            changeNameClick.innerHTML = 'Xiên 4';
            setStyleActive('x4');
        } else if (targetElement.classList.contains('DeDau')) {
            changeNameClick.innerHTML = 'Đề Đầu';
            setStyleActive('DeDau');
        } else if (targetElement.classList.contains('DeDB')) {
            changeNameClick.innerHTML = 'Đề Đặc Biệt';
            setStyleActive('DeDB');
        } else if (targetElement.classList.contains('DDD')) {
            changeNameClick.innerHTML = 'Đề Đầu Đuôi';
            setStyleActive('DDD');
        } else if (targetElement.classList.contains('Dau')) {
            changeNameClick.innerHTML = 'Đầu';
            setStyleActive('Dau');
        } else if (targetElement.classList.contains('Duoi')) {
            changeNameClick.innerHTML = 'Đuôi';
            setStyleActive('Duoi');
        } else if (targetElement.classList.contains('bcdau')) {
            changeNameClick.innerHTML = 'Ba Càng Đầu';
            setStyleActive('bcdau');
        } else if (targetElement.classList.contains('bcdb')) {
            changeNameClick.innerHTML = 'Ba Càng Đặc Biệt';
            setStyleActive('bcdb');
        } else if (targetElement.classList.contains('bcduoi')) {
            changeNameClick.innerHTML = 'Ba Càng Đuôi';
            setStyleActive('bcduoi');
        } else if (targetElement.classList.contains('tx4')) {
            changeNameClick.innerHTML = 'Trượt Xiên 4';
            setStyleActive('tx4');
        } else if (targetElement.classList.contains('tx5')) {
            changeNameClick.innerHTML = 'Trượt Xiên 5';
            setStyleActive('tx5');
        } else if (targetElement.classList.contains('tx6')) {
            changeNameClick.innerHTML = 'Trượt Xiên 6';
            setStyleActive('tx6');
        } else if (targetElement.classList.contains('tx7')) {
            changeNameClick.innerHTML = 'Trượt Xiên 7';
            setStyleActive('tx7');
        } else if (targetElement.classList.contains('tx8')) {
            changeNameClick.innerHTML = 'Trượt Xiên 8';
            setStyleActive('tx8');
        } else if (targetElement.classList.contains('tx9')) {
            changeNameClick.innerHTML = 'Trượt Xiên 9';
            setStyleActive('tx9');
        } else if (targetElement.classList.contains('tx10')) {
            changeNameClick.innerHTML = 'Trượt Xiên 10';
            setStyleActive('tx10');
        } else if (targetElement.classList.contains('t4s')) {
            changeNameClick.innerHTML = 'Trúng 4 Số';
            setStyleActive('t4s');
        } else if (targetElement.classList.contains('t3s')) {
            changeNameClick.innerHTML = 'Trúng 3 Số';
            setStyleActive('t3s');
        } else if (targetElement.classList.contains('t2s')) {
            changeNameClick.innerHTML = 'Trúng 2 Số';
            setStyleActive('t2s');
        } else if (targetElement.classList.contains('3st2')) {
            changeNameClick.innerHTML = '3 Số Trúng 2';
            setStyleActive('3st2');
        }

        if (targetElement.classList.contains('day-active')) {
            setDays(!days);
        } else if (days) {
            setDays(!days);
        }
    });

    const displayModals = () => {
        const modals = document.querySelector('.content-modals');
        modals.classList.remove('active');
    };

    async function getData(params, index) {
        try {
            const res = await axios.get(`https://xskt.vip/api/front/open/lottery/history/list/20/${params}`);

            if (paramsLink !== 'mega-645-1-phut') {
                setGameIn(res.data.t);
                setKq1(Array.from(JSON.parse(res.data.t.issueList[0].detail)[0]));
                setResult(res.data.t.issueList[index]);
                setResultToday(res.data.t.issueList[0]);
                setIssueList(res.data.t.issueList);
                setResultSx(JSON.parse(res.data.t.issueList[index].detail));
            } else {
                setGameIn(res.data.t);
                setResultToday(res.data.t.issueList[0]);
                setKq1(res.data.t.issueList[0].openNum.split(','));
                setResult(res.data.t.issueList[index]);
                setIssueList(res.data.t.issueList);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const getHistory = async (token) => {
        const res = await getHistoryBet(token, axiosJWT, 'http://127.0.0.1:8000/api/history/bet?page=1');
        return res;
    };

    const handleBet = async () => {
        if (!user) {
            return notification('error', 'Bạn cần đăng nhập để sử dụng dịch vụ này');
        }
        if (storage5.length === 0) {
            return notification('error', 'Chưa chọn số !!!!');
        } else {
            let bet = 0;
            storage5.map((check) => {
                bet += check.HeSo * check.SoNhan * (check.Number.length / check.DaChon);
            });
            if (bet > infoUser.money) {
                return notification('error', 'Tài khoản của bạn không đủ tiền');
            }
            await function_loadding_create();
            storage5.map(async (value) => {
                const game = url[value.game].name;

                let C1 = '';
                let C2 = '';
                if (value.PlayStyle === 'l2s') {
                    C1 = 'Lô 2 Số';
                } else if (value.PlayStyle === 'l2sd') {
                    C1 = 'Lô 2 số đầu';
                } else if (value.PlayStyle === 'l2s1k') {
                    C1 = 'Lô 2 số 1k';
                } else if (value.PlayStyle === 'l3s') {
                    C1 = 'Lô 3 số';
                } else if (value.PlayStyle === 'x2') {
                    C1 = 'Xiên 2';
                } else if (value.PlayStyle === 'x3') {
                    C1 = 'Xiên 3';
                } else if (value.PlayStyle === 'x4') {
                    C1 = 'Xiên 4';
                } else if (value.PlayStyle === 'DeDau') {
                    C1 = 'Đề Đầu';
                } else if (value.PlayStyle === 'DeDB') {
                    C1 = 'Đề Đặc Biệt';
                } else if (value.PlayStyle === 'DDD') {
                    C1 = 'Đề Đầu Đuôi';
                } else if (value.PlayStyle === 'Dau') {
                    C1 = 'Đầu';
                } else if (value.PlayStyle === 'Duoi') {
                    C1 = 'Đuôi';
                } else if (value.PlayStyle === 'bcdau') {
                    C1 = 'Ba Càng Đầu';
                } else if (value.PlayStyle === 'bcdb') {
                    C1 = 'Ba Càng Đặc Biệt';
                } else if (value.PlayStyle === 'bcduoi') {
                    C1 = 'Ba Càng Đuôi';
                } else if (value.PlayStyle === 'boncdb') {
                    C1 = 'Bốn Càng Đặc Biệt';
                } else if (value.PlayStyle === 'lncl') {
                    C1 = 'Lớn Nhỏ Chẳn Lẻ';
                } else if (value.PlayStyle === 'tgt') {
                    C1 = 'Tổng Giá Trị';
                } else if (value.PlayStyle === 'tx4') {
                    C1 = 'Trượt Xiên 4';
                } else if (value.PlayStyle === 'tx5') {
                    C1 = 'Trượt Xiên 5';
                } else if (value.PlayStyle === 'tx6') {
                    C1 = 'Trượt Xiên 6';
                } else if (value.PlayStyle === 'tx7') {
                    C1 = 'Trượt Xiên 7';
                } else if (value.PlayStyle === 'Trượt Xiên 8') {
                    C1 = 'Trượt Xiên 8';
                } else if (value.PlayStyle === 'tx9') {
                    C1 = 'Trượt Xiên 9';
                } else if (value.PlayStyle === 'tx10') {
                    C1 = 'Trượt Xiên 10';
                } else if (value.PlayStyle === 'st') {
                    C1 = 'Số Thường';
                } else if (value.PlayStyle === 't4s') {
                    C1 = 'Trúng 4 Số';
                } else if (value.PlayStyle === 't3s') {
                    C1 = 'Trúng 3 Số';
                } else if (value.PlayStyle === 't2s') {
                    C1 = 'Trúng 2 Số';
                } else if (value.PlayStyle === '3t2s') {
                    C1 = '3 Trúng 2 Số';
                } else if (value.PlayStyle === 'c5a1') {
                    C1 = 'Chọn 5 Ăn 1';
                } else if (value.PlayStyle === 'c6a1') {
                    C1 = 'Chọn 6 Ăn 1';
                } else if (value.PlayStyle === 'c7a1') {
                    C1 = 'Chọn 7 Ăn 1';
                } else if (value.PlayStyle === 'c8a1') {
                    C1 = 'Chọn 8 Ăn 1';
                } else if (value.PlayStyle === 'c9a1') {
                    C1 = 'Chọn 9 Ăn 1';
                } else if (value.PlayStyle === 'c10a1') {
                    C1 = 'Chọn 10 Ăn 1';
                } else {
                    C1 = 'Lô 4 số';
                }

                if (value.PlayType === 'BaoLo') {
                    C2 = 'Bao Lô';
                } else if (value.PlayType === 'LoXien') {
                    C2 = 'Lô Xiên';
                } else if (value.PlayType === 'DanhDe') {
                    C2 = 'Đánh Đề';
                } else if (value.PlayType === 'DauDuoi') {
                    C2 = 'Đầu Đuôi';
                } else if (value.PlayType === 'BaCang') {
                    C2 = '3 Càng';
                } else if (value.PlayType === 'LoTruot') {
                    C2 = 'Lô Trượt';
                } else if (value.PlayType === 'LoTruotMega') {
                    C2 = 'Lô trượt';
                } else if (value.PlayType === 'SoThuong') {
                    C2 = 'Số Thường';
                } else if (value.PlayType === 'NhieuSo') {
                    C2 = 'Nhiều Số';
                } else if (value.PlayType === 'Chon1') {
                    C2 = 'Chọn 1';
                } else {
                    C2 = 'Trò chơi thú vị';
                }
                const day = new Date(Date.now());
                let arrNumber = [];
                let numberFix = '';
                value.Number.forEach((element) => {
                    if (element < 10) {
                        numberFix = `0${element}`;
                    } else {
                        if (element === 'Chan' || element === 'Chẳn') {
                            numberFix = 'chan';
                        } else if (element === 'Le' || element === 'Lẻ') {
                            numberFix = 'le';
                        } else if (element === 'Tai' || element === 'Tài') {
                            numberFix = 'tai';
                        } else if (element === 'Xiu' || element === 'Xỉu') {
                            numberFix = 'xiu';
                        } else {
                            numberFix = element;
                        }
                    }
                    arrNumber.push(numberFix);
                });

                const data = {
                    category: game,
                    money: value.HeSo * value.SoNhan * (value.Number.length / value.DaChon),
                    infor_bet: arrNumber.toString(),
                    sodoncuoc: value.Number.length / value.DaChon,
                    capdonhan: value.SoNhan,
                    cachchoi: C2 + ' - ' + C1,
                    luotso: day.toISOString().slice(0, 10),
                    status: 1,
                    thangthua: 0,
                };

                const res = await UserBet(data, user.access_token, axiosJWT);
                if (res.status === 200) {
                    const modals = document.querySelector('.content-modals');
                    modals.classList.remove('active');
                    const response = await getHistory(user.access_token);
                    setHistory(response.data.data);
                }
            });
            setTimeout(async () => {
                await getInfoUser(user, dispatch, axiosJWT, infoUser.money);
            }, 500);
            // console.log(res);
            let arr = storage5;
            arr.length = 0;
            Setstorage5(arr);
            await function_loadding_delete();
            return notification(
                'success',
                'Hệ thống đã ghi nhận số bạn đặt !! Kết quả sẽ sổ sau khi đồng hồ hẹn giờ kết thúc',
            );
        }
    };

    async function loadding_game() {
        await function_loadding_create();
        await fetch();
        await function_loadding_delete();
    }

    useEffect(() => {
        loadding_game();
    }, []);

    async function loadding_game_info() {
        await function_loadding_create();
        await getData(url[paramsLink].param, 0);
        await function_loadding_delete();
    }

    useEffect(() => {
        loadding_game_info();
        setInfoGame(url[paramsLink]);
        if (paramsLink === 'mega-645-1-phut') {
            setGame(listGames['SoThuong']);
        }
        setNoti(false);
    }, [paramsLink]);

    useEffect(() => {
        getData(url[paramsLink].param, 0);
        setInfoGame(url[paramsLink]);
        let totai = 0;
        storage5.map((value) => {
            totai += Number((value.Number.length / value.DaChon) * value.HeSo * value.SoNhan);
        });
        setTotal(totai);
    }, [numberCheck]);

    return (
        <ThemeContext.Provider value={gameIn.turnNum}>
            <div className="content-modals">
                <div className="modals-box">
                    <h6 className="title-modals mx-1 pt-2 text-center text-sm font-thin py-2 border-l border-r border-gray-200 title-ncd">
                        Danh Sách Cá Cược ( {gameIn.turnNum} )
                    </h6>
                    <div className="mx-1 border-l border-r border-gray-200 modals-box-mobile">
                        <div
                            style={{ backgroundColor: '#e7f0fc' }}
                            className="py-2 flex text-xs items-center font-thin border-t border-b border-gray-200 div-modals-box-1"
                        >
                            <div style={{ width: '24%' }} className="text-center">
                                Cách chơi
                            </div>
                            <div style={{ width: '24%' }} className="text-center">
                                Thông tin đặt cược
                            </div>
                            <div style={{ width: '10%' }} className="text-center">
                                Số đơn cược
                            </div>
                            <div style={{ width: '10%' }} className="text-center">
                                Cấp số nhân
                            </div>
                            <div style={{ width: '10%' }} className="text-center">
                                Số tiền cược
                            </div>
                            <div style={{ width: '12%' }} className="text-center">
                                Tiền thắng /1 lần
                            </div>
                            <div style={{ width: '10%' }} className="text-center">
                                Thao tác
                            </div>
                        </div>
                        <div className="h-28 border-b border-gray-200 flex div-modals-box-1">
                            <div className="flex-1 overflow-y-auto bet-scroll">
                                {storage5?.length > 0 ? (
                                    <>
                                        {storage5?.map((value, index) => (
                                            <ul
                                                className="flex items-center text-xs font-thin py-2 hover:bg-gray-200"
                                                key={index}
                                            >
                                                <li style={{ width: '24%' }} className="text-center">
                                                    {value.PlayType === 'BaoLo'
                                                        ? 'Bao Lô'
                                                        : value.PlayType === 'LoXien'
                                                        ? 'Lô Xiên'
                                                        : value.PlayType === 'DanhDe'
                                                        ? 'Đánh Đề'
                                                        : value.PlayType === 'DauDuoi'
                                                        ? 'Đầu Đuôi'
                                                        : value.PlayType === 'BaCang'
                                                        ? '3 Càng'
                                                        : value.PlayType === 'BonCang'
                                                        ? '4 Càng'
                                                        : value.PlayType === 'LoTruot'
                                                        ? 'Lô Trượt'
                                                        : value.PlayType === 'LoTruotMega'
                                                        ? 'Lô trượt'
                                                        : value.PlayType === 'SoThuong'
                                                        ? 'Số Thường'
                                                        : value.PlayType === 'NhieuSo'
                                                        ? 'Nhiều Số'
                                                        : value.PlayType === 'Chon1'
                                                        ? 'Chọn 1'
                                                        : 'Trò chơi thú vị'}
                                                    {' | '}
                                                    {value.PlayStyle === 'l2s'
                                                        ? 'Lô 2 số'
                                                        : value.PlayStyle === 'l2sd'
                                                        ? 'Lô 2 số đầu'
                                                        : value.PlayStyle === 'l2s1k'
                                                        ? 'Lô 2 số 1k'
                                                        : value.PlayStyle === 'l3s'
                                                        ? 'Lô 3 số'
                                                        : value.PlayStyle === 'x2'
                                                        ? 'Xiên 2'
                                                        : value.PlayStyle === 'x3'
                                                        ? 'Xiên 3'
                                                        : value.PlayStyle === 'x4'
                                                        ? 'Xiên 4'
                                                        : value.PlayStyle === 'DeDau'
                                                        ? 'Đề Đầu'
                                                        : value.PlayStyle === 'DeDB'
                                                        ? 'Đề Đặc Biệt'
                                                        : value.PlayStyle === 'DDD'
                                                        ? 'Đề Đầu Đuôi'
                                                        : value.PlayStyle === 'Dau'
                                                        ? 'Đầu'
                                                        : value.PlayStyle === 'Duoi'
                                                        ? 'Đuôi'
                                                        : value.PlayStyle === 'bcdau'
                                                        ? 'Ba Càng Đầu'
                                                        : value.PlayStyle === 'bcdb'
                                                        ? 'Ba Càng Đặc Biệt'
                                                        : value.PlayStyle === 'bcduoi'
                                                        ? 'Ba Càng Đuôi'
                                                        : value.PlayStyle === 'boncdb'
                                                        ? 'Bốn Càng Đặc Biệt'
                                                        : value.PlayStyle === 'lncl'
                                                        ? 'Lớn Nhỏ Chẳn Lẻ'
                                                        : value.PlayStyle === 'tgt'
                                                        ? 'Tổng Giá Trị'
                                                        : value.PlayStyle === 'tx4'
                                                        ? 'Trượt Xiên 4'
                                                        : value.PlayStyle === 'tx5'
                                                        ? 'Trượt Xiên 5'
                                                        : value.PlayStyle === 'tx6'
                                                        ? 'Trượt Xiên 6'
                                                        : value.PlayStyle === 'tx7'
                                                        ? 'Trượt Xiên 7'
                                                        : value.PlayStyle === 'Trượt Xiên 8'
                                                        ? 'Trượt Xiên 8'
                                                        : value.PlayStyle === 'tx9'
                                                        ? 'Trượt Xiên 9'
                                                        : value.PlayStyle === 'tx10'
                                                        ? 'Trượt Xiên 10'
                                                        : value.PlayStyle === 'st'
                                                        ? 'Số Thường'
                                                        : value.PlayStyle === 't4s'
                                                        ? 'Trúng 4 Số'
                                                        : value.PlayStyle === 't3s'
                                                        ? 'Trúng 3 Số'
                                                        : value.PlayStyle === 't2s'
                                                        ? 'Trúng 2 Số'
                                                        : value.PlayStyle === '3t2s'
                                                        ? '3 Trúng 2 Số'
                                                        : value.PlayStyle === 'c5a1'
                                                        ? 'Chọn 5 Ăn 1'
                                                        : value.PlayStyle === 'c6a1'
                                                        ? 'Chọn 6 Ăn 1'
                                                        : value.PlayStyle === 'c7a1'
                                                        ? 'Chọn 7 Ăn 1'
                                                        : value.PlayStyle === 'c8a1'
                                                        ? 'Chọn 8 Ăn 1'
                                                        : value.PlayStyle === 'c9a1'
                                                        ? 'Chọn 9 Ăn 1'
                                                        : value.PlayStyle === 'c10a1'
                                                        ? 'Chọn 10 Ăn 1'
                                                        : 'Lô 4 số'}
                                                </li>
                                                <li style={{ width: '24%' }} className="text-center">
                                                    {value.Number.map((value, index) => (
                                                        <span key={index}>
                                                            {value} {'|'}
                                                        </span>
                                                    ))}
                                                </li>
                                                <li style={{ width: '10%' }} className="text-center">
                                                    {value.Number.length / value.DaChon}
                                                </li>
                                                <li style={{ width: '10%' }} className="text-center">
                                                    {value.SoNhan}
                                                </li>
                                                <li style={{ width: '10%' }} className="text-center text-red-500">
                                                    {Intl.NumberFormat().format(
                                                        (value.Number.length / value.DaChon) *
                                                            value.HeSo *
                                                            value.SoNhan,
                                                    )}
                                                </li>
                                                <li style={{ width: '12%' }} className="text-center">
                                                    {Intl.NumberFormat().format(
                                                        (value.Number.length / value.DaChon) *
                                                            value.SoNhan *
                                                            value.Odd *
                                                            1000,
                                                    )}
                                                </li>
                                                <li
                                                    style={{ width: '10%' }}
                                                    className="text-center flex justify-center"
                                                    onClick={handleRemoveNumber}
                                                    data-index={index}
                                                >
                                                    <TrashIcon
                                                        width={16}
                                                        height={16}
                                                        className="fill-red-500 trashIcon-format"
                                                    />
                                                </li>
                                            </ul>
                                        ))}
                                    </>
                                ) : (
                                    <div className="flex flex-1 items-center justify-center">
                                        <h4 className="font-thin text-xs kcdl-h4">Không có dữ liệu</h4>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="bottom-footer-modals">
                        <div className="total">
                            <p>Tổng số tiền: &nbsp;</p>
                            <p>
                                <span>{storage5.length === 0 ? '0' : Intl.NumberFormat().format(total)}</span> VNĐ
                            </p>
                        </div>
                        <div className="action">
                            <button onClick={handleBet} className="primary">
                                Xác nhận
                            </button>
                            <button className="cancel" onClick={displayModals}>
                                Huỷ bỏ
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="game-bg">
                <div className="max-w-screen-2xl 2xl:m-auto xl:max-w-screen-xl xl:m-auto pb-4">
                    <div className="pt-4" style={{ backgroundColor: '#e6e6e6' }}>
                        <div className="grid grid-cols-4 gap-x-2 grid-game-container">
                            <div className="col-span-3">
                                <div style={{ backgroundColor: '#fafafa' }}>
                                    <div className="top-game-bg flex">
                                        <div className="flex justify-center items-center space-x-4 content-top-game-home">
                                            <Image className="h-24 w-2h-24" src={infoGame.img} alt="MB" />
                                            <div className="text-sm flex flex-col justify-center">
                                                <h3 className="font-semibold">{infoGame.name}</h3>
                                                <h5 className="mt-1 game-name-click">Lô 2 Số</h5>
                                                <Link to="/">
                                                    <button
                                                        style={{ background: '#f9bf5b', padding: '10px 6px' }}
                                                        className="btn mt-2"
                                                    >
                                                        Sảnh trò chơi <span>▶</span>
                                                    </button>
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="flex justify-center items-center flex-col content-top-game-result">
                                            <div className="flex mb-4">
                                                {kq1.map((value, index) => (
                                                    <h5 className="red-circle" key={index}>
                                                        {value}
                                                    </h5>
                                                ))}
                                            </div>
                                            <p className="text-base">
                                                Kết quả lượt xổ <span>{resultToday?.turnNum}</span>{' '}
                                            </p>
                                        </div>
                                        <div className="flex flex-col justify-center items-center content-top-game-time">
                                            <p className="text-sm text-center mb-2">
                                                Thời gian đặt cược Lượt xổ <br /> <span>{gameIn.turnNum}</span>{' '}
                                            </p>
                                            <div
                                                style={{ color: '#ea524d', backgroundColor: '#e6e6e6' }}
                                                className="p-2 rounded-lg text-xl font-medium"
                                            >
                                                <CountDown
                                                    refresh={refresh}
                                                    fetch={fetch}
                                                    day={gameIn?.openTime}
                                                    timeServe={gameIn?.serverTime}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        style={{ borderColor: '#ddd' }}
                                        className="flex justify-between items-center border-b border-t flex-menu-game"
                                    >
                                        {paramsLink !== 'mega-645-1-phut' ? (
                                            <ul className="flex font-light text-sm p-2 ml-4 ul-flex-menu-game">
                                                <li
                                                    onClick={handleClick}
                                                    data-name="BaoLo"
                                                    className="game-item active"
                                                >
                                                    Bao Lô
                                                </li>
                                                <li onClick={handleClick} data-name="LoXien" className="game-item">
                                                    Lô Xiên
                                                </li>
                                                <li onClick={handleClick} data-name="DanhDe" className="game-item">
                                                    Đánh Đề
                                                </li>
                                                <li onClick={handleClick} data-name="DauDuoi" className="game-item">
                                                    Đầu Đuôi
                                                </li>
                                                <li onClick={handleClick} data-name="BaCang" className="game-item">
                                                    3 Càng
                                                </li>
                                                <li onClick={handleClick} data-name="BonCang" className="game-item">
                                                    4 Càng
                                                </li>
                                                <li onClick={handleClick} data-name="LoTruot" className="game-item">
                                                    Lô Trượt
                                                </li>
                                                <li
                                                    onClick={handleClick}
                                                    data-name="TroChoiThuVi"
                                                    className="game-item"
                                                >
                                                    Trò chơi thú vị
                                                </li>
                                            </ul>
                                        ) : (
                                            <ul className="flex font-light text-sm p-2 ml-4 ul-flex-menu-game">
                                                <li
                                                    onClick={handleClick}
                                                    data-name="SoThuong"
                                                    className="game-item active"
                                                >
                                                    Số Thường
                                                </li>
                                                <li onClick={handleClick} data-name="NhieuSo" className="game-item">
                                                    Nhiều Số
                                                </li>
                                                <li onClick={handleClick} data-name="LoTruotMega" className="game-item">
                                                    Lô Trượt
                                                </li>
                                                <li onClick={handleClick} data-name="Chon1" className="game-item">
                                                    Chọn 1
                                                </li>
                                            </ul>
                                        )}
                                        <h6 className="flex space-x-2 p-2">
                                            <Image
                                                className="w-4 h-4"
                                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAABy1BMVEUAAACwlffFpv+dePOceu64nvu8mv+khvKjhfK1mfqWdu2ukfaWdO61mfuLZ+eKZ+epi/S9ov24nvqhg/CNauiefu+WdeyskPWig/Goi/WafO+/n/+zjf+Zee2Xd+yhgvCwk/eWduuWduyylvmnifOTcuqxlfetkPW0mPiQbumjhPGWdeyObOiXd+ywlPedfO6sjvWig/K5pP2cfe6vk/eRcOqqjvO9pf2skfW8pP21m/mNa+elifKQbumSceq7ofq9pP20m/mZee2+pfyafO64nvqliPO9o/yni/OlifK+pP2MaOeqjvSJZueYee2ffvCNaue7o/29pvyzmPqNa+i7ovyJZ+ifgvSUc+qdfu6KZ+eJZuajhvKvlPapjPSWduyKZuaIZuavkvexlPenifSjhfGqjvSoi/OtkPWbfO6TcuqmiPKhg/CfgO+ae+2vlPa0mfiukvaRcOm5n/uggfCdfu6yl/iVdeuXd+yQbumzmPikh/KPbeiZee2ObOiYeOyWduu3nfmef+62nPmojPOrj/WMaue1m/mSceq7ofuxlviNa+e4nvunifKKZ+apjPSLaOahgvC3nfqZeu2VdOqJZuawlPe8ovuLaeckmLHpAAAAZXRSTlMA/gMRCz0H+ex2UTAoGfjv5N3HxL2dkG9kSzkIBvDp4eDc0s6+vaqmo5ePbmBbWlVTLCPz8fDt6Ofj4eHe3NvZzsnHsbGhoJuYloqKhIOCdXRnYVxZUkY07tjT09CzsrGsrJZiQ7QkNo8AAAPYSURBVEjHzZaHUxNREMYvXoxApAqoSO8gSrH33nvv3ZjEkAYJhITQjImYLoL8uW52391L8u4gOuOMv/mG3bff++C4kpz03zF2//qFs7VHjtSevXD9/tifJLdeOba8/Gv5F4jqsStbS0tuuVe7rEHtvS2bZx+dmdThzKPNDrguMZmY1KNuw4MvTyQSi4lFEK8A78t1o6ZLi8CPxR8gXgtnl0za2cq62JfYlw2BDXWVmtnjsZgn5kGgQaAR+uMa6T3nPDwIP/Q5t0cI9wc3wRP0gHJdv3Ceg1PBKYFg/4j5QZcwLi+6vobvOaa+T4F4fYC3XG+BBxgKr3eXwbBmWAMZDG6DG4S1l0z5IJ9T7crP7ndr8oHZr5TBmnsNBM1+njW1e91ur9sLwqqgbOnlM7annd8rO21eG8gLwqrwnj1n7flz6neqD+FRmw50Ym5qOEeVB3S37avtqwAMbQfLx0zmPnUNogrsZuG+T39BHzvqw5FPEZpAo/biumB+mI7bnE5b01ZrxBqJpCNpEFWYgXANFvkAFJqb6Vxbtal5fbm7Jpm0JrVtOt9Xk4gj6QDhZlDN4CiaIzW5tcPqAFFV9lxFv9shclP9qBzd5tCmG+2TIRVHiIyQ+cnIR5a/BjMwmM/7k+iWhUKWkKWAUG52jcK72Aw2gXhfhu42izYv2S2kY2+j8LiKZdwCYnUH+8s0R8ijSuGy8QKy41kQ1MsUHiyaK9Bht2WzvqxPILuLwjvyZz6+t41cp4rP6QOxxXZ0jTQT99B/1eB0LjmXQGpF2tj5KpzzvgHtO35kyb+EQIOQKQ2Sp8x5fwftJr/f7rcrQEvrYQo/I0+ZY0Wa6JE8YNdCRrPSrsMBdgNedBVjd9nPs6vs0uGiRAy7wq4wiKYrrhWQq5G8BlyHV8IgnCt7h5XvuJYwMB+eR6DJsY+8TlyTTx7Ron7b3Z4PzIMCoFwc+yayWgLcowpAuS0pGFsDxEJgAYHmCVkdyhqElfa1GiWVvQvTyMI0haFhh13R2Xq+EdaqD4K6V+I0d5D5c/onCNs33K3In2Pf0YyG4n8WUH65aV+n4FVIBTSK6Z6KUblpaOCp6DQWvzT2fGNMfJsA8SrOe4QXSfn0RImcliWB7YdmSuIQPudC+tRsPjOzM6DZYk5hVkSuz7lzs3MCMGTzeln3VXsgzpmLYw4KX8cHtkj6PDwRLSYejYOwPfFQ2pDmu9WZ9fXoejSaiWaQdWVdfbdZ2gz5RlUqk8qAUmoFqm7IUikYh+qrVldTqykQ1ar6IaNUMsbHt96+qIboavXzd7ceQ/LPMULqX/Ebzajn5vS0cekAAAAASUVORK5CYII="
                                            />{' '}
                                            <span className="font-normal text-sm"></span>
                                        </h6>
                                    </div>
                                    <div className="p-2 ml-4 mgl-game-moble">
                                        <div>
                                            {game}
                                            <div className="border-t-4 border-gray-200 ">
                                                <h6 className="pt-2 text-center text-sm font-thin py-2 border-l border-r border-gray-200 title-ncd">
                                                    Nội dung cược
                                                </h6>
                                                <div className="border-l border-r border-gray-200 game-in-choose-mobile">
                                                    <div
                                                        style={{ backgroundColor: '#e7f0fc' }}
                                                        className="py-2 flex text-xs items-center font-thin border-t border-b border-gray-200 div-mobile"
                                                    >
                                                        <div style={{ width: '24%' }} className="text-center">
                                                            Cách chơi
                                                        </div>
                                                        <div style={{ width: '24%' }} className="text-center">
                                                            Thông tin đặt cược
                                                        </div>
                                                        <div style={{ width: '10%' }} className="text-center">
                                                            Số đơn cược
                                                        </div>
                                                        <div style={{ width: '10%' }} className="text-center">
                                                            Cấp số nhân
                                                        </div>
                                                        <div style={{ width: '10%' }} className="text-center">
                                                            Số tiền cược
                                                        </div>
                                                        <div style={{ width: '12%' }} className="text-center">
                                                            Tiền thắng /1 lần
                                                        </div>
                                                        <div style={{ width: '10%' }} className="text-center">
                                                            Thao tác
                                                        </div>
                                                    </div>
                                                    <div className="h-28 border-b border-gray-200 flex div-mobile height-content-table-bet">
                                                        <div className="flex-1 overflow-y-auto bet-scroll">
                                                            {storage5?.length > 0 ? (
                                                                <>
                                                                    {storage5?.map((value, index) => (
                                                                        <ul
                                                                            className="flex items-center text-xs font-thin py-2 hover:bg-gray-200"
                                                                            key={index}
                                                                        >
                                                                            <li
                                                                                style={{ width: '24%' }}
                                                                                className="text-center"
                                                                            >
                                                                                {value.PlayType === 'BaoLo'
                                                                                    ? 'Bao Lô'
                                                                                    : value.PlayType === 'LoXien'
                                                                                    ? 'Lô Xiên'
                                                                                    : value.PlayType === 'DanhDe'
                                                                                    ? 'Đánh Đề'
                                                                                    : value.PlayType === 'DauDuoi'
                                                                                    ? 'Đầu Đuôi'
                                                                                    : value.PlayType === 'BaCang'
                                                                                    ? '3 Càng'
                                                                                    : value.PlayType === 'BonCang'
                                                                                    ? '4 Càng'
                                                                                    : value.PlayType === 'LoTruot'
                                                                                    ? 'Lô Trượt'
                                                                                    : value.PlayType === 'LoTruotMega'
                                                                                    ? 'Lô trượt'
                                                                                    : value.PlayType === 'SoThuong'
                                                                                    ? 'Số Thường'
                                                                                    : value.PlayType === 'NhieuSo'
                                                                                    ? 'Nhiều Số'
                                                                                    : value.PlayType === 'Chon1'
                                                                                    ? 'Chọn 1'
                                                                                    : 'Trò chơi thú vị'}
                                                                                {' | '}
                                                                                {value.PlayStyle === 'l2s'
                                                                                    ? 'Lô 2 số'
                                                                                    : value.PlayStyle === 'l2sd'
                                                                                    ? 'Lô 2 số đầu'
                                                                                    : value.PlayStyle === 'l2s1k'
                                                                                    ? 'Lô 2 số 1k'
                                                                                    : value.PlayStyle === 'l3s'
                                                                                    ? 'Lô 3 số'
                                                                                    : value.PlayStyle === 'x2'
                                                                                    ? 'Xiên 2'
                                                                                    : value.PlayStyle === 'x3'
                                                                                    ? 'Xiên 3'
                                                                                    : value.PlayStyle === 'x4'
                                                                                    ? 'Xiên 4'
                                                                                    : value.PlayStyle === 'DeDau'
                                                                                    ? 'Đề Đầu'
                                                                                    : value.PlayStyle === 'DeDB'
                                                                                    ? 'Đề Đặc Biệt'
                                                                                    : value.PlayStyle === 'DDD'
                                                                                    ? 'Đề Đầu Đuôi'
                                                                                    : value.PlayStyle === 'Dau'
                                                                                    ? 'Đầu'
                                                                                    : value.PlayStyle === 'Duoi'
                                                                                    ? 'Đuôi'
                                                                                    : value.PlayStyle === 'bcdau'
                                                                                    ? 'Ba Càng Đầu'
                                                                                    : value.PlayStyle === 'bcdb'
                                                                                    ? 'Ba Càng Đặc Biệt'
                                                                                    : value.PlayStyle === 'bcduoi'
                                                                                    ? 'Ba Càng Đuôi'
                                                                                    : value.PlayStyle === 'boncdb'
                                                                                    ? 'Bốn Càng Đặc Biệt'
                                                                                    : value.PlayStyle === 'lncl'
                                                                                    ? 'Lớn Nhỏ Chẳn Lẻ'
                                                                                    : value.PlayStyle === 'tgt'
                                                                                    ? 'Tổng Giá Trị'
                                                                                    : value.PlayStyle === 'tx4'
                                                                                    ? 'Trượt Xiên 4'
                                                                                    : value.PlayStyle === 'tx5'
                                                                                    ? 'Trượt Xiên 5'
                                                                                    : value.PlayStyle === 'tx6'
                                                                                    ? 'Trượt Xiên 6'
                                                                                    : value.PlayStyle === 'tx7'
                                                                                    ? 'Trượt Xiên 7'
                                                                                    : value.PlayStyle === 'Trượt Xiên 8'
                                                                                    ? 'Trượt Xiên 8'
                                                                                    : value.PlayStyle === 'tx9'
                                                                                    ? 'Trượt Xiên 9'
                                                                                    : value.PlayStyle === 'tx10'
                                                                                    ? 'Trượt Xiên 10'
                                                                                    : value.PlayStyle === 'st'
                                                                                    ? 'Số Thường'
                                                                                    : value.PlayStyle === 't4s'
                                                                                    ? 'Trúng 4 Số'
                                                                                    : value.PlayStyle === 't3s'
                                                                                    ? 'Trúng 3 Số'
                                                                                    : value.PlayStyle === 't2s'
                                                                                    ? 'Trúng 2 Số'
                                                                                    : value.PlayStyle === '3t2s'
                                                                                    ? '3 Trúng 2 Số'
                                                                                    : value.PlayStyle === 'c5a1'
                                                                                    ? 'Chọn 5 Ăn 1'
                                                                                    : value.PlayStyle === 'c6a1'
                                                                                    ? 'Chọn 6 Ăn 1'
                                                                                    : value.PlayStyle === 'c7a1'
                                                                                    ? 'Chọn 7 Ăn 1'
                                                                                    : value.PlayStyle === 'c8a1'
                                                                                    ? 'Chọn 8 Ăn 1'
                                                                                    : value.PlayStyle === 'c9a1'
                                                                                    ? 'Chọn 9 Ăn 1'
                                                                                    : value.PlayStyle === 'c10a1'
                                                                                    ? 'Chọn 10 Ăn 1'
                                                                                    : 'Lô 4 số'}
                                                                            </li>
                                                                            <li
                                                                                style={{ width: '24%' }}
                                                                                className="text-center"
                                                                            >
                                                                                {value.Number.map((value, index) => (
                                                                                    <span key={index}>{value} |</span>
                                                                                ))}
                                                                            </li>
                                                                            <li
                                                                                style={{ width: '10%' }}
                                                                                className="text-center"
                                                                            >
                                                                                {value.Number.length / value.DaChon}
                                                                            </li>
                                                                            <li
                                                                                style={{ width: '10%' }}
                                                                                className="text-center"
                                                                            >
                                                                                {value.SoNhan}
                                                                            </li>
                                                                            <li
                                                                                style={{ width: '10%' }}
                                                                                className="text-center text-red-500"
                                                                            >
                                                                                {Intl.NumberFormat().format(
                                                                                    (value.Number.length /
                                                                                        value.DaChon) *
                                                                                        value.HeSo *
                                                                                        value.SoNhan,
                                                                                )}
                                                                            </li>
                                                                            <li
                                                                                style={{ width: '12%' }}
                                                                                className="text-center"
                                                                            >
                                                                                {Intl.NumberFormat().format(
                                                                                    (value.Number.length /
                                                                                        value.DaChon) *
                                                                                        value.SoNhan *
                                                                                        value.Odd *
                                                                                        1000,
                                                                                )}
                                                                            </li>
                                                                            <li
                                                                                style={{ width: '10%' }}
                                                                                className="text-center flex justify-center"
                                                                                onClick={handleRemoveNumber}
                                                                                data-index={index}
                                                                            >
                                                                                <TrashIcon
                                                                                    width={16}
                                                                                    height={16}
                                                                                    className="fill-red-500 trashIcon-format"
                                                                                />
                                                                            </li>
                                                                        </ul>
                                                                    ))}
                                                                </>
                                                            ) : (
                                                                <div className="flex flex-1 items-center justify-center">
                                                                    <h4 className="font-thin text-xs kcdl-h4">
                                                                        Không có dữ liệu
                                                                    </h4>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex justify-between font-thin text-sm py-4 items-center button-game-mobile-v2">
                                                <div className="div1-vutton">
                                                    <h6>
                                                        Tổng số tiền :{' '}
                                                        <span className="text-red-500">
                                                            {storage5.length === 0
                                                                ? '0'
                                                                : Intl.NumberFormat().format(total)}
                                                        </span>{' '}
                                                        VND
                                                    </h6>
                                                </div>
                                                <div className="space-x-4 div2-vutton">
                                                    <button className="bet-btn b-left" onClick={handleRemove}>
                                                        Xóa hết
                                                    </button>
                                                    <button onClick={hideModals} className="bet-btn b-right">
                                                        Đặt cược
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-1">
                                <div style={{ backgroundColor: '#f5f5f5' }}>
                                    <div className="p-2">
                                        <div
                                            style={{ backgroundColor: '#3a81e5' }}
                                            className="h-10 flex justify-center items-center"
                                        >
                                            <Image className="w-3/5" src={logoVlot} />
                                        </div>
                                        <div className="font-medium pt-2 relative">
                                            {paramsLink !== 'mega-645-1-phut' ? (
                                                <h6
                                                    className="text-center day-active px-2 py-3284 py-3 text-red-600"
                                                    style={{ backgroundColor: '#e7f0fc' }}
                                                >
                                                    {result.turnNum}
                                                </h6>
                                            ) : (
                                                <h6
                                                    className="text-center px-2 py-3284 py-3 text-red-600"
                                                    style={{ backgroundColor: '#e7f0fc' }}
                                                >
                                                    {result.turnNum}
                                                </h6>
                                            )}

                                            {days ? (
                                                <div className="history-wrapper">
                                                    <ul className="history-days">
                                                        {issueList.map((item, index) => (
                                                            <li
                                                                onClick={handleViewResult}
                                                                data-index={index}
                                                                className={`day-item ${
                                                                    item.turnNum === result.turnNum ? 'active' : ''
                                                                }`}
                                                                key={index}
                                                            >
                                                                {item.turnNum}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            ) : (
                                                <Fragment></Fragment>
                                            )}
                                            {paramsLink !== 'mega-645-1-phut' ? (
                                                <div className="mt-2">
                                                    <h6
                                                        className="px-2 py-2 text-xs font-extralight"
                                                        style={{ backgroundColor: '#e7f0fc' }}
                                                    >
                                                        Kết quả <span>{result.turnNum}</span>
                                                    </h6>

                                                    <ul style={{ fontSize: '13px' }} className="font-normal">
                                                        <li className="flex items-center py-1 text-center border-b border-gray-300">
                                                            <h6 className="w-2/5 ">Giải ĐB</h6>
                                                            {resultSx[0] ? (
                                                                <>
                                                                    {StypeActive === 'l3s' ||
                                                                    StypeActive === 'bcdb' ||
                                                                    StypeActive === 'bcduoi' ? (
                                                                        <h6 className="flex-1 res-result">
                                                                            {resultSx[0].slice(0, -3)}
                                                                            <span className="number-active">
                                                                                {resultSx[0].slice(-3)}
                                                                            </span>
                                                                        </h6>
                                                                    ) : StypeActive === 'l4s' ||
                                                                      StypeActive === 'boncdb' ? (
                                                                        <h6 className="flex-1 res-result">
                                                                            {resultSx[0].slice(0, -4)}
                                                                            <span className="number-active">
                                                                                {resultSx[0].slice(-4)}
                                                                            </span>
                                                                        </h6>
                                                                    ) : StypeActive === 'DeDau' ||
                                                                      StypeActive === 'bcdau' ? (
                                                                        <h6 className="flex-1 res-result">
                                                                            {resultSx[0]}
                                                                        </h6>
                                                                    ) : StypeActive === 'Dau' ? (
                                                                        <h6 className="flex-1 res-result">
                                                                            {resultSx[0].slice(0, -2)}
                                                                            <span className="number-active">
                                                                                {resultSx[0].slice(-2).split('')[0]}
                                                                            </span>
                                                                            {resultSx[0].slice(-2).split('')[1]}
                                                                        </h6>
                                                                    ) : StypeActive === 'Duoi' ? (
                                                                        <h6 className="flex-1 res-result">
                                                                            {resultSx[0].slice(0, -1)}
                                                                            <span className="number-active">
                                                                                {resultSx[0].slice(-1)}
                                                                            </span>
                                                                        </h6>
                                                                    ) : (
                                                                        <h6 className="flex-1 res-result">
                                                                            {resultSx[0].slice(0, -2)}
                                                                            <span className="number-active">
                                                                                {resultSx[0].slice(-2)}
                                                                            </span>
                                                                        </h6>
                                                                    )}
                                                                </>
                                                            ) : (
                                                                <></>
                                                            )}
                                                        </li>
                                                        <li className="flex items-center py-1 text-center border-b border-gray-300">
                                                            <h6 className="w-2/5 ">Giải nhất</h6>
                                                            {resultSx[1] ? (
                                                                <>
                                                                    {StypeActive === 'DeDau' ||
                                                                    StypeActive === 'DeDB' ||
                                                                    StypeActive === 'DDD' ||
                                                                    StypeActive === 'Dau' ||
                                                                    StypeActive === 'Duoi' ||
                                                                    StypeActive === 'bcduoi' ||
                                                                    StypeActive === 'bcdau' ||
                                                                    StypeActive === 'bcdb' ||
                                                                    StypeActive === 'boncdb' ||
                                                                    StypeActive === 'lncl' ? (
                                                                        <h6 className="flex-1 res-result">
                                                                            {resultSx[1]}
                                                                        </h6>
                                                                    ) : (
                                                                        <>
                                                                            {StypeActive === 'l3s' ? (
                                                                                <h6 className="flex-1 res-result">
                                                                                    {resultSx[1].slice(0, -3)}
                                                                                    <span className="number-active">
                                                                                        {resultSx[1].slice(-3)}
                                                                                    </span>
                                                                                </h6>
                                                                            ) : StypeActive === 'l4s' ? (
                                                                                <h6 className="flex-1 res-result">
                                                                                    {resultSx[1].slice(0, -4)}
                                                                                    <span className="number-active">
                                                                                        {resultSx[1].slice(-4)}
                                                                                    </span>
                                                                                </h6>
                                                                            ) : (
                                                                                <h6 className="flex-1 res-result">
                                                                                    {resultSx[1].slice(0, -2)}
                                                                                    <span className="number-active">
                                                                                        {resultSx[1].slice(-2)}
                                                                                    </span>
                                                                                </h6>
                                                                            )}
                                                                        </>
                                                                    )}
                                                                </>
                                                            ) : (
                                                                <></>
                                                            )}
                                                        </li>
                                                        <li className="flex items-center py-1 text-center border-b border-gray-300">
                                                            <h6 className="w-2/5 ">Giải nhì</h6>
                                                            <h6 className="flex-1 res-result">
                                                                {resultSx[2] ? (
                                                                    <>
                                                                        {StypeActive === 'DeDau' ||
                                                                        StypeActive === 'DeDB' ||
                                                                        StypeActive === 'DDD' ||
                                                                        StypeActive === 'Dau' ||
                                                                        StypeActive === 'Duoi' ||
                                                                        StypeActive === 'bcdau' ||
                                                                        StypeActive === 'bcduoi' ||
                                                                        StypeActive === 'bcdb' ||
                                                                        StypeActive === 'boncdb' ||
                                                                        StypeActive === 'lncl' ? (
                                                                            <div className="inline-box">
                                                                                {resultSx[2]
                                                                                    .split(',')
                                                                                    .map((value, index) => (
                                                                                        <div key={index}>{value}</div>
                                                                                    ))}
                                                                            </div>
                                                                        ) : (
                                                                            <>
                                                                                {StypeActive === 'l3s' ? (
                                                                                    <div className="inline-box">
                                                                                        {resultSx[2]
                                                                                            .split(',')
                                                                                            .map((value, index) => (
                                                                                                <div key={index}>
                                                                                                    {value.slice(0, -3)}
                                                                                                    <span className="number-active">
                                                                                                        {value.slice(
                                                                                                            -3,
                                                                                                        )}
                                                                                                    </span>
                                                                                                </div>
                                                                                            ))}
                                                                                    </div>
                                                                                ) : StypeActive === 'l4s' ? (
                                                                                    <div className="inline-box">
                                                                                        {resultSx[2]
                                                                                            .split(',')
                                                                                            .map((value, index) => (
                                                                                                <div key={index}>
                                                                                                    {value.slice(0, -4)}
                                                                                                    <span className="number-active">
                                                                                                        {value.slice(
                                                                                                            -4,
                                                                                                        )}
                                                                                                    </span>
                                                                                                </div>
                                                                                            ))}
                                                                                    </div>
                                                                                ) : (
                                                                                    <div className="inline-box">
                                                                                        {resultSx[2]
                                                                                            .split(',')
                                                                                            .map((value, index) => (
                                                                                                <div key={index}>
                                                                                                    {value.slice(0, -2)}
                                                                                                    <span className="number-active">
                                                                                                        {value.slice(
                                                                                                            -2,
                                                                                                        )}
                                                                                                    </span>
                                                                                                </div>
                                                                                            ))}
                                                                                    </div>
                                                                                )}
                                                                            </>
                                                                        )}
                                                                    </>
                                                                ) : (
                                                                    <></>
                                                                )}
                                                            </h6>
                                                        </li>
                                                        <li className="flex items-center py-1 text-center border-b border-gray-300">
                                                            <h6 className="w-2/5 ">Giải ba</h6>
                                                            <h6
                                                                className="flex-1 res-result"
                                                                style={{ lineHeight: '20px' }}
                                                            >
                                                                {resultSx[3] ? (
                                                                    <>
                                                                        {StypeActive === 'DeDau' ||
                                                                        StypeActive === 'DeDB' ||
                                                                        StypeActive === 'DDD' ||
                                                                        StypeActive === 'Dau' ||
                                                                        StypeActive === 'Duoi' ||
                                                                        StypeActive === 'bcdau' ||
                                                                        StypeActive === 'bcduoi' ||
                                                                        StypeActive === 'bcdb' ||
                                                                        StypeActive === 'boncdb' ||
                                                                        StypeActive === 'lncl' ? (
                                                                            <div className="inline-box">
                                                                                {resultSx[3]
                                                                                    .split(',')
                                                                                    .map((value, index) => (
                                                                                        <div key={index}>{value}</div>
                                                                                    ))}
                                                                            </div>
                                                                        ) : (
                                                                            <>
                                                                                {StypeActive === 'l3s' ? (
                                                                                    <div className="inline-box">
                                                                                        {resultSx[3]
                                                                                            .split(',')
                                                                                            .map((value, index) => (
                                                                                                <div key={index}>
                                                                                                    {value.slice(0, -3)}
                                                                                                    <span className="number-active">
                                                                                                        {value.slice(
                                                                                                            -3,
                                                                                                        )}
                                                                                                    </span>
                                                                                                </div>
                                                                                            ))}
                                                                                    </div>
                                                                                ) : StypeActive === 'l4s' ? (
                                                                                    <div className="inline-box">
                                                                                        {resultSx[3]
                                                                                            .split(',')
                                                                                            .map((value, index) => (
                                                                                                <div key={index}>
                                                                                                    {value.slice(0, -4)}
                                                                                                    <span className="number-active">
                                                                                                        {value.slice(
                                                                                                            -4,
                                                                                                        )}
                                                                                                    </span>
                                                                                                </div>
                                                                                            ))}
                                                                                    </div>
                                                                                ) : (
                                                                                    <div className="inline-box">
                                                                                        {resultSx[3]
                                                                                            .split(',')
                                                                                            .map((value, index) => (
                                                                                                <div key={index}>
                                                                                                    {value.slice(0, -2)}
                                                                                                    <span className="number-active">
                                                                                                        {value.slice(
                                                                                                            -2,
                                                                                                        )}
                                                                                                    </span>
                                                                                                </div>
                                                                                            ))}
                                                                                    </div>
                                                                                )}
                                                                            </>
                                                                        )}
                                                                    </>
                                                                ) : (
                                                                    <></>
                                                                )}
                                                            </h6>
                                                        </li>
                                                        <li className="flex items-center py-1 text-center border-b border-gray-300">
                                                            <h6 className="w-2/5 ">Giải tư</h6>
                                                            <h6 className="flex-1 res-result">
                                                                {resultSx[4] ? (
                                                                    <>
                                                                        {StypeActive === 'DeDau' ||
                                                                        StypeActive === 'DeDB' ||
                                                                        StypeActive === 'DDD' ||
                                                                        StypeActive === 'Dau' ||
                                                                        StypeActive === 'Duoi' ||
                                                                        StypeActive === 'bcduoi' ||
                                                                        StypeActive === 'bcdau' ||
                                                                        StypeActive === 'bcdb' ||
                                                                        StypeActive === 'boncdb' ||
                                                                        StypeActive === 'lncl' ? (
                                                                            <div className="inline-box">
                                                                                {resultSx[4]
                                                                                    .split(',')
                                                                                    .map((value, index) => (
                                                                                        <div key={index}>{value}</div>
                                                                                    ))}
                                                                            </div>
                                                                        ) : (
                                                                            <>
                                                                                {StypeActive === 'l3s' ? (
                                                                                    <div className="inline-box">
                                                                                        {resultSx[4]
                                                                                            .split(',')
                                                                                            .map((value, index) => (
                                                                                                <div key={index}>
                                                                                                    {value.slice(0, -3)}
                                                                                                    <span className="number-active">
                                                                                                        {value.slice(
                                                                                                            -3,
                                                                                                        )}
                                                                                                    </span>
                                                                                                </div>
                                                                                            ))}
                                                                                    </div>
                                                                                ) : StypeActive === 'l4s' ? (
                                                                                    <div className="inline-box">
                                                                                        {resultSx[4]
                                                                                            .split(',')
                                                                                            .map((value, index) => (
                                                                                                <div key={index}>
                                                                                                    {value.slice(0, -4)}
                                                                                                    <span className="number-active">
                                                                                                        {value.slice(
                                                                                                            -4,
                                                                                                        )}
                                                                                                    </span>
                                                                                                </div>
                                                                                            ))}
                                                                                    </div>
                                                                                ) : (
                                                                                    <div className="inline-box">
                                                                                        {resultSx[4]
                                                                                            .split(',')
                                                                                            .map((value, index) => (
                                                                                                <div key={index}>
                                                                                                    {value.slice(0, -2)}
                                                                                                    <span className="number-active">
                                                                                                        {value.slice(
                                                                                                            -2,
                                                                                                        )}
                                                                                                    </span>
                                                                                                </div>
                                                                                            ))}
                                                                                    </div>
                                                                                )}
                                                                            </>
                                                                        )}
                                                                    </>
                                                                ) : (
                                                                    <></>
                                                                )}
                                                            </h6>
                                                        </li>
                                                        <li className="flex items-center py-1 text-center border-b border-gray-300">
                                                            <h6 className="w-2/5 ">Giải năm</h6>
                                                            <h6
                                                                className="flex-1 res-result"
                                                                style={{ lineHeight: '20px' }}
                                                            >
                                                                {resultSx[5] ? (
                                                                    <>
                                                                        {StypeActive === 'DeDau' ||
                                                                        StypeActive === 'DeDB' ||
                                                                        StypeActive === 'DDD' ||
                                                                        StypeActive === 'Dau' ||
                                                                        StypeActive === 'Duoi' ||
                                                                        StypeActive === 'bcdau' ||
                                                                        StypeActive === 'bcduoi' ||
                                                                        StypeActive === 'bcdb' ||
                                                                        StypeActive === 'boncdb' ||
                                                                        StypeActive === 'lncl' ? (
                                                                            <div className="inline-box">
                                                                                {resultSx[5]
                                                                                    .split(',')
                                                                                    .map((value, index) => (
                                                                                        <div key={index}>{value}</div>
                                                                                    ))}
                                                                            </div>
                                                                        ) : (
                                                                            <>
                                                                                {StypeActive === 'l3s' ? (
                                                                                    <div className="inline-box">
                                                                                        {resultSx[5]
                                                                                            .split(',')
                                                                                            .map((value, index) => (
                                                                                                <div key={index}>
                                                                                                    {value.slice(0, -3)}
                                                                                                    <span className="number-active">
                                                                                                        {value.slice(
                                                                                                            -3,
                                                                                                        )}
                                                                                                    </span>
                                                                                                </div>
                                                                                            ))}
                                                                                    </div>
                                                                                ) : StypeActive === 'l4s' ? (
                                                                                    <div className="inline-box">
                                                                                        {resultSx[5]
                                                                                            .split(',')
                                                                                            .map((value, index) => (
                                                                                                <div key={index}>
                                                                                                    {value.slice(0, -4)}
                                                                                                    <span className="number-active">
                                                                                                        {value.slice(
                                                                                                            -4,
                                                                                                        )}
                                                                                                    </span>
                                                                                                </div>
                                                                                            ))}
                                                                                    </div>
                                                                                ) : (
                                                                                    <div className="inline-box">
                                                                                        {resultSx[5]
                                                                                            .split(',')
                                                                                            .map((value, index) => (
                                                                                                <div key={index}>
                                                                                                    {value.slice(0, -2)}
                                                                                                    <span className="number-active">
                                                                                                        {value.slice(
                                                                                                            -2,
                                                                                                        )}
                                                                                                    </span>
                                                                                                </div>
                                                                                            ))}
                                                                                    </div>
                                                                                )}
                                                                            </>
                                                                        )}
                                                                    </>
                                                                ) : (
                                                                    <></>
                                                                )}
                                                            </h6>
                                                        </li>
                                                        <li className="flex items-center py-1 text-center border-b border-gray-300">
                                                            <h6 className="w-2/5 ">Giải sáu</h6>
                                                            <h6 className="flex-1 res-result">
                                                                {resultSx[6] ? (
                                                                    <>
                                                                        {StypeActive === 'DeDau' ||
                                                                        StypeActive === 'DeDB' ||
                                                                        StypeActive === 'DDD' ||
                                                                        StypeActive === 'Dau' ||
                                                                        StypeActive === 'Duoi' ||
                                                                        StypeActive === 'boncdb' ||
                                                                        StypeActive === 'bcdb' ||
                                                                        StypeActive === 'lncl' ? (
                                                                            <div className="inline-box">
                                                                                {resultSx[6]
                                                                                    .split(',')
                                                                                    .map((value, index) => (
                                                                                        <div key={index}>{value}</div>
                                                                                    ))}
                                                                            </div>
                                                                        ) : (
                                                                            <>
                                                                                {StypeActive === 'l3s' ? (
                                                                                    <div className="inline-box">
                                                                                        {resultSx[6]
                                                                                            .split(',')
                                                                                            .map((value, index) => (
                                                                                                <div key={index}>
                                                                                                    {value.slice(0, -3)}
                                                                                                    <span className="number-active">
                                                                                                        {value.slice(
                                                                                                            -3,
                                                                                                        )}
                                                                                                    </span>
                                                                                                </div>
                                                                                            ))}
                                                                                    </div>
                                                                                ) : StypeActive === 'l4s' ? (
                                                                                    <div className="inline-box">
                                                                                        {resultSx[6]
                                                                                            .split(',')
                                                                                            .map((value, index) => (
                                                                                                <div key={index}>
                                                                                                    {!resultSx[8] ? (
                                                                                                        <>{value}</>
                                                                                                    ) : (
                                                                                                        <>
                                                                                                            {value.slice(
                                                                                                                0,
                                                                                                                -4,
                                                                                                            )}
                                                                                                            <span className="number-active">
                                                                                                                {value.slice(
                                                                                                                    -4,
                                                                                                                )}
                                                                                                            </span>
                                                                                                        </>
                                                                                                    )}
                                                                                                </div>
                                                                                            ))}
                                                                                    </div>
                                                                                ) : StypeActive === 'bcdau' ||
                                                                                  StypeActive === 'bcduoi' ? (
                                                                                    <>
                                                                                        {resultSx[8] ? (
                                                                                            <div className="inline-box">
                                                                                                {resultSx[6]
                                                                                                    .split(',')
                                                                                                    .map(
                                                                                                        (
                                                                                                            value,
                                                                                                            index,
                                                                                                        ) => (
                                                                                                            <div
                                                                                                                key={
                                                                                                                    index
                                                                                                                }
                                                                                                            >
                                                                                                                {value}
                                                                                                            </div>
                                                                                                        ),
                                                                                                    )}
                                                                                            </div>
                                                                                        ) : (
                                                                                            <div className="inline-box">
                                                                                                {resultSx[6]
                                                                                                    .split(',')
                                                                                                    .map(
                                                                                                        (
                                                                                                            value,
                                                                                                            index,
                                                                                                        ) => (
                                                                                                            <div
                                                                                                                key={
                                                                                                                    index
                                                                                                                }
                                                                                                            >
                                                                                                                {value.slice(
                                                                                                                    0,
                                                                                                                    -3,
                                                                                                                )}
                                                                                                                <span className="number-active">
                                                                                                                    {value.slice(
                                                                                                                        -3,
                                                                                                                    )}
                                                                                                                </span>
                                                                                                            </div>
                                                                                                        ),
                                                                                                    )}
                                                                                            </div>
                                                                                        )}
                                                                                    </>
                                                                                ) : (
                                                                                    <div className="inline-box">
                                                                                        {resultSx[6]
                                                                                            .split(',')
                                                                                            .map((value, index) => (
                                                                                                <div key={index}>
                                                                                                    {value.slice(0, -2)}
                                                                                                    <span className="number-active">
                                                                                                        {value.slice(
                                                                                                            -2,
                                                                                                        )}
                                                                                                    </span>
                                                                                                </div>
                                                                                            ))}
                                                                                    </div>
                                                                                )}
                                                                            </>
                                                                        )}
                                                                    </>
                                                                ) : (
                                                                    <></>
                                                                )}
                                                            </h6>
                                                        </li>
                                                        <li className="flex py-2 text-center">
                                                            <h6 className="w-2/5 ">Giải bảy</h6>
                                                            <h6 className="flex-1 res-result">
                                                                {resultSx[7] ? (
                                                                    <>
                                                                        {StypeActive === 'DeDB' ||
                                                                        StypeActive === 'Dau' ||
                                                                        StypeActive === 'Duoi' ||
                                                                        StypeActive === 'bcdb' ||
                                                                        StypeActive === 'boncdb' ||
                                                                        StypeActive === 'lncl' ? (
                                                                            <div className="inline-box">
                                                                                {resultSx[7]
                                                                                    .split(',')
                                                                                    .map((value, index) => (
                                                                                        <div key={index}>{value}</div>
                                                                                    ))}
                                                                            </div>
                                                                        ) : (
                                                                            <>
                                                                                {!resultSx[8] ? (
                                                                                    <>
                                                                                        {StypeActive === 'l3s' ||
                                                                                        StypeActive === 'l4s' ||
                                                                                        StypeActive === 'bcdau' ||
                                                                                        StypeActive === 'bcdb' ||
                                                                                        StypeActive === 'bcduoi' ? (
                                                                                            <div className="inline-box">
                                                                                                {resultSx[7]
                                                                                                    .split(',')
                                                                                                    .map(
                                                                                                        (
                                                                                                            value,
                                                                                                            index,
                                                                                                        ) => (
                                                                                                            <div
                                                                                                                key={
                                                                                                                    index
                                                                                                                }
                                                                                                            >
                                                                                                                {value}
                                                                                                            </div>
                                                                                                        ),
                                                                                                    )}
                                                                                            </div>
                                                                                        ) : (
                                                                                            <div className="inline-box">
                                                                                                {resultSx[7]
                                                                                                    .split(',')
                                                                                                    .map(
                                                                                                        (
                                                                                                            value,
                                                                                                            index,
                                                                                                        ) => (
                                                                                                            <div
                                                                                                                key={
                                                                                                                    index
                                                                                                                }
                                                                                                            >
                                                                                                                {value.slice(
                                                                                                                    0,
                                                                                                                    -2,
                                                                                                                )}
                                                                                                                <span className="number-active">
                                                                                                                    {value.slice(
                                                                                                                        -2,
                                                                                                                    )}
                                                                                                                </span>
                                                                                                            </div>
                                                                                                        ),
                                                                                                    )}
                                                                                            </div>
                                                                                        )}
                                                                                    </>
                                                                                ) : (
                                                                                    <>
                                                                                        {StypeActive === 'bcdau' ||
                                                                                        StypeActive === 'bcduoi' ||
                                                                                        StypeActive === 'l3s' ? (
                                                                                            <>
                                                                                                <div className="inline-box">
                                                                                                    {resultSx[7]
                                                                                                        .split(',')
                                                                                                        .map(
                                                                                                            (
                                                                                                                value,
                                                                                                                index,
                                                                                                            ) => (
                                                                                                                <div
                                                                                                                    key={
                                                                                                                        index
                                                                                                                    }
                                                                                                                >
                                                                                                                    {value.slice(
                                                                                                                        0,
                                                                                                                        -3,
                                                                                                                    )}
                                                                                                                    <span className="number-active">
                                                                                                                        {value.slice(
                                                                                                                            -3,
                                                                                                                        )}
                                                                                                                    </span>
                                                                                                                </div>
                                                                                                            ),
                                                                                                        )}
                                                                                                </div>
                                                                                            </>
                                                                                        ) : StypeActive === 'l4s' ||
                                                                                          StypeActive === 'DeDau' ||
                                                                                          StypeActive === 'DDD' ? (
                                                                                            <div className="inline-box">
                                                                                                {resultSx[7]
                                                                                                    .split(',')
                                                                                                    .map(
                                                                                                        (
                                                                                                            value,
                                                                                                            index,
                                                                                                        ) => (
                                                                                                            <div
                                                                                                                key={
                                                                                                                    index
                                                                                                                }
                                                                                                            >
                                                                                                                {value}
                                                                                                            </div>
                                                                                                        ),
                                                                                                    )}
                                                                                            </div>
                                                                                        ) : (
                                                                                            <div className="inline-box">
                                                                                                {resultSx[7]
                                                                                                    .split(',')
                                                                                                    .map(
                                                                                                        (
                                                                                                            value,
                                                                                                            index,
                                                                                                        ) => (
                                                                                                            <div
                                                                                                                key={
                                                                                                                    index
                                                                                                                }
                                                                                                            >
                                                                                                                {value.slice(
                                                                                                                    0,
                                                                                                                    -2,
                                                                                                                )}
                                                                                                                <span className="number-active">
                                                                                                                    {value.slice(
                                                                                                                        -2,
                                                                                                                    )}
                                                                                                                </span>
                                                                                                            </div>
                                                                                                        ),
                                                                                                    )}
                                                                                            </div>
                                                                                        )}
                                                                                    </>
                                                                                )}
                                                                            </>
                                                                        )}
                                                                    </>
                                                                ) : (
                                                                    <></>
                                                                )}
                                                            </h6>
                                                        </li>
                                                        {resultSx[8] ? (
                                                            <li className="flex py-2 text-center">
                                                                <h6 className="w-2/5 ">Giải tám</h6>
                                                                <h6 className="flex-1 res-result">
                                                                    {resultSx[8] ? (
                                                                        <>
                                                                            {StypeActive === 'DeDB' ||
                                                                            StypeActive === 'Dau' ||
                                                                            StypeActive === 'Duoi' ||
                                                                            StypeActive === 'bcdau' ||
                                                                            StypeActive === 'bcdb' ||
                                                                            StypeActive === 'l3s' ||
                                                                            StypeActive === 'l4s' ||
                                                                            StypeActive === 'bcduoi' ||
                                                                            StypeActive === 'boncdb' ||
                                                                            StypeActive === 'lncl' ? (
                                                                                <div className="inline-box">
                                                                                    {resultSx[8]
                                                                                        .split(',')
                                                                                        .map((value, index) => (
                                                                                            <div key={index}>
                                                                                                {value}
                                                                                            </div>
                                                                                        ))}
                                                                                </div>
                                                                            ) : (
                                                                                <div className="inline-box">
                                                                                    {resultSx[8]
                                                                                        .split(',')
                                                                                        .map((value, index) => (
                                                                                            <div key={index}>
                                                                                                {value.slice(0, -2)}
                                                                                                <span className="number-active">
                                                                                                    {value.slice(-2)}
                                                                                                </span>
                                                                                            </div>
                                                                                        ))}
                                                                                </div>
                                                                            )}
                                                                        </>
                                                                    ) : (
                                                                        <></>
                                                                    )}
                                                                </h6>
                                                            </li>
                                                        ) : (
                                                            <></>
                                                        )}
                                                    </ul>
                                                    <div
                                                        style={{ backgroundColor: '#e7f0fc' }}
                                                        className="flex items-center text-center py-2 text-sm font-light mt-2"
                                                    >
                                                        <h6 className="flex-1">Đầu</h6>
                                                        <h6 className="flex-1 border-l border-gray-300">Đuôi</h6>
                                                    </div>
                                                    <ul style={{ fontSize: '14px' }} className="text-center font-light">
                                                        <li style={{ padding: '7px 0' }} className="flex">
                                                            <h6 className="flex-1">0</h6>
                                                            <h6 className="flex-1 box-kq1s">
                                                                {resultSx &&
                                                                    resultSx?.map((value, idx) => {
                                                                        value = value.split(',');
                                                                        return (
                                                                            <Fragment key={idx}>
                                                                                {value?.map((val, idx) => {
                                                                                    if (val.slice(-2) < 10) {
                                                                                        return (
                                                                                            <Fragment key={idx}>
                                                                                                <span>&nbsp;</span>
                                                                                                <span>
                                                                                                    {val.slice(-1)}
                                                                                                </span>
                                                                                                <span>&nbsp;</span>
                                                                                            </Fragment>
                                                                                        );
                                                                                    } else {
                                                                                        return (
                                                                                            <Fragment
                                                                                                key={idx}
                                                                                            ></Fragment>
                                                                                        );
                                                                                    }
                                                                                })}
                                                                            </Fragment>
                                                                        );
                                                                    })}
                                                            </h6>
                                                        </li>
                                                        <li style={{ padding: '7px 0' }} className="flex">
                                                            <h6 className="flex-1">1</h6>
                                                            <h6 className="flex-1">
                                                                {resultSx &&
                                                                    resultSx?.map((value, idx) => {
                                                                        value = value.split(',');
                                                                        return (
                                                                            <Fragment key={idx}>
                                                                                {value?.map((val, idx) => {
                                                                                    if (
                                                                                        val.slice(-2) >= 10 &&
                                                                                        val.slice(-2) < 20
                                                                                    ) {
                                                                                        return (
                                                                                            <Fragment key={idx}>
                                                                                                <span>&nbsp;</span>
                                                                                                <span>
                                                                                                    {val.slice(-1)}
                                                                                                </span>
                                                                                                <span>&nbsp;</span>
                                                                                            </Fragment>
                                                                                        );
                                                                                    } else {
                                                                                        return (
                                                                                            <Fragment
                                                                                                key={idx}
                                                                                            ></Fragment>
                                                                                        );
                                                                                    }
                                                                                })}
                                                                            </Fragment>
                                                                        );
                                                                    })}
                                                            </h6>
                                                        </li>
                                                        <li style={{ padding: '7px 0' }} className="flex">
                                                            <h6 className="flex-1">2</h6>
                                                            <h6 className="flex-1">
                                                                {resultSx &&
                                                                    resultSx?.map((value, idx) => {
                                                                        value = value.split(',');
                                                                        return (
                                                                            <Fragment key={idx}>
                                                                                {value?.map((val, idx) => {
                                                                                    if (
                                                                                        val.slice(-2) >= 20 &&
                                                                                        val.slice(-2) < 30
                                                                                    ) {
                                                                                        return (
                                                                                            <Fragment key={idx}>
                                                                                                <span>&nbsp;</span>
                                                                                                <span>
                                                                                                    {val.slice(-1)}
                                                                                                </span>
                                                                                                <span>&nbsp;</span>
                                                                                            </Fragment>
                                                                                        );
                                                                                    } else {
                                                                                        return (
                                                                                            <Fragment
                                                                                                key={idx}
                                                                                            ></Fragment>
                                                                                        );
                                                                                    }
                                                                                })}
                                                                            </Fragment>
                                                                        );
                                                                    })}
                                                            </h6>
                                                        </li>
                                                        <li style={{ padding: '7px 0' }} className="flex">
                                                            <h6 className="flex-1">3</h6>
                                                            <h6 className="flex-1">
                                                                {resultSx &&
                                                                    resultSx?.map((value, idx) => {
                                                                        value = value.split(',');
                                                                        return (
                                                                            <Fragment key={idx}>
                                                                                {value?.map((val, idx) => {
                                                                                    if (
                                                                                        val.slice(-2) >= 30 &&
                                                                                        val.slice(-2) < 40
                                                                                    ) {
                                                                                        return (
                                                                                            <Fragment key={idx}>
                                                                                                <span>&nbsp;</span>
                                                                                                <span>
                                                                                                    {val.slice(-1)}
                                                                                                </span>
                                                                                                <span>&nbsp;</span>
                                                                                            </Fragment>
                                                                                        );
                                                                                    } else {
                                                                                        return (
                                                                                            <Fragment
                                                                                                key={idx}
                                                                                            ></Fragment>
                                                                                        );
                                                                                    }
                                                                                })}
                                                                            </Fragment>
                                                                        );
                                                                    })}
                                                            </h6>
                                                        </li>
                                                        <li style={{ padding: '7px 0' }} className="flex">
                                                            <h6 className="flex-1">4</h6>
                                                            <h6 className="flex-1">
                                                                {resultSx &&
                                                                    resultSx?.map((value, idx) => {
                                                                        value = value.split(',');
                                                                        return (
                                                                            <Fragment key={idx}>
                                                                                {value?.map((val, idx) => {
                                                                                    if (
                                                                                        val.slice(-2) >= 40 &&
                                                                                        val.slice(-2) < 50
                                                                                    ) {
                                                                                        return (
                                                                                            <Fragment key={idx}>
                                                                                                <span>&nbsp;</span>
                                                                                                <span>
                                                                                                    {val.slice(-1)}
                                                                                                </span>
                                                                                                <span>&nbsp;</span>
                                                                                            </Fragment>
                                                                                        );
                                                                                    } else {
                                                                                        return (
                                                                                            <Fragment
                                                                                                key={idx}
                                                                                            ></Fragment>
                                                                                        );
                                                                                    }
                                                                                })}
                                                                            </Fragment>
                                                                        );
                                                                    })}
                                                            </h6>
                                                        </li>
                                                        <li style={{ padding: '7px 0' }} className="flex">
                                                            <h6 className="flex-1">5</h6>
                                                            <h6 className="flex-1">
                                                                {resultSx &&
                                                                    resultSx?.map((value, idx) => {
                                                                        value = value.split(',');
                                                                        return (
                                                                            <Fragment key={idx}>
                                                                                {value?.map((val, idx) => {
                                                                                    if (
                                                                                        val.slice(-2) >= 50 &&
                                                                                        val.slice(-2) < 60
                                                                                    ) {
                                                                                        return (
                                                                                            <Fragment key={idx}>
                                                                                                <span>&nbsp;</span>
                                                                                                <span>
                                                                                                    {val.slice(-1)}
                                                                                                </span>
                                                                                                <span>&nbsp;</span>
                                                                                            </Fragment>
                                                                                        );
                                                                                    } else {
                                                                                        return (
                                                                                            <Fragment
                                                                                                key={idx}
                                                                                            ></Fragment>
                                                                                        );
                                                                                    }
                                                                                })}
                                                                            </Fragment>
                                                                        );
                                                                    })}
                                                            </h6>
                                                        </li>
                                                        <li style={{ padding: '7px 0' }} className="flex">
                                                            <h6 className="flex-1">6</h6>
                                                            <h6 className="flex-1">
                                                                {resultSx &&
                                                                    resultSx?.map((value, idx) => {
                                                                        value = value.split(',');
                                                                        return (
                                                                            <Fragment key={idx}>
                                                                                {value?.map((val, idx) => {
                                                                                    if (
                                                                                        val.slice(-2) >= 60 &&
                                                                                        val.slice(-2) < 70
                                                                                    ) {
                                                                                        return (
                                                                                            <Fragment key={idx}>
                                                                                                <span>&nbsp;</span>
                                                                                                <span>
                                                                                                    {val.slice(-1)}
                                                                                                </span>
                                                                                                <span>&nbsp;</span>
                                                                                            </Fragment>
                                                                                        );
                                                                                    } else {
                                                                                        return (
                                                                                            <Fragment
                                                                                                key={idx}
                                                                                            ></Fragment>
                                                                                        );
                                                                                    }
                                                                                })}
                                                                            </Fragment>
                                                                        );
                                                                    })}
                                                            </h6>
                                                        </li>
                                                        <li style={{ padding: '7px 0' }} className="flex">
                                                            <h6 className="flex-1">7</h6>
                                                            <h6 className="flex-1">
                                                                {resultSx &&
                                                                    resultSx?.map((value, idx) => {
                                                                        value = value.split(',');
                                                                        return (
                                                                            <Fragment key={idx}>
                                                                                {value?.map((val, idx) => {
                                                                                    if (
                                                                                        val.slice(-2) >= 70 &&
                                                                                        val.slice(-2) < 80
                                                                                    ) {
                                                                                        return (
                                                                                            <Fragment key={idx}>
                                                                                                <span>&nbsp;</span>
                                                                                                <span>
                                                                                                    {val.slice(-1)}
                                                                                                </span>
                                                                                                <span>&nbsp;</span>
                                                                                            </Fragment>
                                                                                        );
                                                                                    } else {
                                                                                        return (
                                                                                            <Fragment
                                                                                                key={idx}
                                                                                            ></Fragment>
                                                                                        );
                                                                                    }
                                                                                })}
                                                                            </Fragment>
                                                                        );
                                                                    })}
                                                            </h6>
                                                        </li>
                                                        <li style={{ padding: '7px 0' }} className="flex">
                                                            <h6 className="flex-1">8</h6>
                                                            <h6 className="flex-1">
                                                                {resultSx &&
                                                                    resultSx?.map((value, idx) => {
                                                                        value = value.split(',');
                                                                        return (
                                                                            <Fragment key={idx}>
                                                                                {value?.map((val, idx) => {
                                                                                    if (
                                                                                        val.slice(-2) >= 80 &&
                                                                                        val.slice(-2) < 90
                                                                                    ) {
                                                                                        return (
                                                                                            <Fragment key={idx}>
                                                                                                <span>&nbsp;</span>
                                                                                                <span>
                                                                                                    {val.slice(-1)}
                                                                                                </span>
                                                                                                <span>&nbsp;</span>
                                                                                            </Fragment>
                                                                                        );
                                                                                    } else {
                                                                                        return (
                                                                                            <Fragment
                                                                                                key={idx}
                                                                                            ></Fragment>
                                                                                        );
                                                                                    }
                                                                                })}
                                                                            </Fragment>
                                                                        );
                                                                    })}
                                                            </h6>
                                                        </li>
                                                        <li style={{ padding: '7px 0' }} className="flex">
                                                            <h6 className="flex-1">9</h6>
                                                            <h6 className="flex-1">
                                                                {resultSx &&
                                                                    resultSx?.map((value, idx) => {
                                                                        value = value.split(',');
                                                                        return (
                                                                            <Fragment key={idx}>
                                                                                {value?.map((val, idx) => {
                                                                                    if (
                                                                                        val.slice(-2) >= 90 &&
                                                                                        val.slice(-2) < 100
                                                                                    ) {
                                                                                        return (
                                                                                            <Fragment key={idx}>
                                                                                                <span>&nbsp;</span>
                                                                                                <span>
                                                                                                    {val.slice(-1)}
                                                                                                </span>
                                                                                                <span>&nbsp;</span>
                                                                                            </Fragment>
                                                                                        );
                                                                                    } else {
                                                                                        return (
                                                                                            <Fragment
                                                                                                key={idx}
                                                                                            ></Fragment>
                                                                                        );
                                                                                    }
                                                                                })}
                                                                            </Fragment>
                                                                        );
                                                                    })}
                                                            </h6>
                                                        </li>
                                                    </ul>
                                                </div>
                                            ) : (
                                                <div className="mt-2">
                                                    <div className="contentResult">
                                                        {issueList.map((value, index) => (
                                                            <li key={index}>
                                                                <div className="title">{value.turnNum}</div>
                                                                <div className="ball">
                                                                    <span>{value.openNum.split(',')[0]}</span>
                                                                    <span>{value.openNum.split(',')[1]}</span>
                                                                    <span>{value.openNum.split(',')[2]}</span>
                                                                    <span>{value.openNum.split(',')[3]}</span>
                                                                    <span>{value.openNum.split(',')[4]}</span>
                                                                    <span>{value.openNum.split(',')[5]}</span>
                                                                </div>
                                                            </li>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white mt-4" style={{ padding: '3px', paddingBottom: '15px' }}>
                            <div className="flex justify-between items-center px-6 text-sm font-thin">
                                <div>
                                    {/* <p>Tổng đơn cược: 2 , Tổng tiền cược: 54,000 vnd , Tiền thắng: 199,000 vnd</p> */}
                                </div>
                                <div className="ml-auto py-2">
                                    <ul className="flex">
                                        <li style={{ borderRadius: '5px' }} className="option  active">
                                            Lịch sử
                                        </li>
                                        {/* <li className="option ">Thắng thua</li> */}
                                        {/* <li className="option ">Chọn số nhanh</li> */}
                                    </ul>
                                </div>
                                {/* <span className="text-xs ml-2">làm mới</span> */}
                            </div>
                            <div className="mobile-history-bet-game">
                                <div
                                    style={{ backgroundColor: 'rgb(231, 240, 252)' }}
                                    className="flex font-thin text-sm text-center py-1 div-history-bet-game"
                                >
                                    <h5 className="border-r border-gray-300" style={{ width: '10%' }}>
                                        Kiểu cược
                                    </h5>
                                    <h5 className="border-r border-gray-300" style={{ width: '10%' }}>
                                        Lượt xổ
                                    </h5>
                                    <h5 className="border-r border-gray-300" style={{ width: '5%' }}>
                                        Số thứ tự
                                    </h5>
                                    <h5 className="border-r border-gray-300" style={{ width: '13%' }}>
                                        Thời gian cược
                                    </h5>
                                    <h5 className="border-r border-gray-300" style={{ width: '15%' }}>
                                        Cách chơi
                                    </h5>
                                    <h5 className="border-r border-gray-300" style={{ width: '9%' }}>
                                        Nội dung cược
                                    </h5>
                                    <h5 className="border-r border-gray-300" style={{ width: '7%' }}>
                                        Số đơn cược
                                    </h5>
                                    <h5 className="border-r border-gray-300" style={{ width: '7%' }}>
                                        Cấp số nhân
                                    </h5>
                                    <h5 className="border-r border-gray-300" style={{ width: '8%' }}>
                                        Tổng số tiền
                                    </h5>
                                    <h5 className="border-r border-gray-300" style={{ width: '8%' }}>
                                        Thắng thua
                                    </h5>
                                    <h5 className="border-r border-gray-300" style={{ width: '8%' }}>
                                        Thao tác
                                    </h5>
                                </div>
                                <div className="flex h-36 div-history-bet-game content-history-bet-game-height">
                                    {history.length === 0 ? (
                                        <div className="flex flex-1 items-center justify-center">
                                            <h4 className="font-thin text-xs">Không có dữ liệu</h4>
                                        </div>
                                    ) : (
                                        <div className="flex-1 overflow-y-auto bet-scroll awef9h3h1">
                                            {history.map((value, index) => (
                                                <ul
                                                    className="flex font-thin text-xs text-center py-2 hover:bg-gray-200"
                                                    key={index}
                                                >
                                                    <li style={{ width: '10%' }}>{value.category}</li>
                                                    <li style={{ width: '10%' }}>{value.luotso}</li>
                                                    <li style={{ width: '5%' }} className="truncate">
                                                        {value.id}
                                                    </li>
                                                    <li style={{ width: '13%' }}>{value.created_at}</li>
                                                    <li style={{ width: '15%' }}>{value.cachchoi}</li>
                                                    <li
                                                        style={{
                                                            width: '9%',
                                                            whiteSpace: 'nowrap',
                                                            overflow: 'hidden',
                                                            textOverflow: 'ellipsis',
                                                        }}
                                                    >
                                                        {value.infor_bet}
                                                    </li>
                                                    <li style={{ width: '7%' }}>{value.sodoncuoc}</li>
                                                    <li style={{ width: '7%' }}>{value.capdonhan}</li>
                                                    <li style={{ width: '8%' }}>
                                                        <span>{Intl.NumberFormat().format(value.money)}</span>
                                                    </li>
                                                    <li style={{ width: '8%' }}>
                                                        {value.thangthua === 0 ? (
                                                            <span>---</span>
                                                        ) : value.thangthua > 0 ? (
                                                            <span style={{ color: 'green' }}>
                                                                {Intl.NumberFormat().format(value.thangthua)}
                                                            </span>
                                                        ) : (
                                                            <span style={{ color: 'red' }}>
                                                                {Intl.NumberFormat().format(value.thangthua)}
                                                            </span>
                                                        )}
                                                    </li>
                                                    <li style={{ width: '8%' }}>
                                                        <button type="button">
                                                            <span>
                                                                {value.status === '0' ? (
                                                                    <>Đã đóng</>
                                                                ) : (
                                                                    <div
                                                                        onClick={() => handleHuyDon(value.id)}
                                                                        style={{ color: 'red' }}
                                                                    >
                                                                        Huỷ đơn
                                                                    </div>
                                                                )}
                                                            </span>
                                                        </button>
                                                    </li>
                                                </ul>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ThemeContext.Provider>
    );
}

export default Game;
