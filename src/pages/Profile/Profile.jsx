import './Profile.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faUser,
    faGamepad,
    faAnchorCircleExclamation,
    faCircleDollarToSlot,
    faHandHoldingDollar,
    faClockRotateLeft,
    faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import Image from '~/components/Image';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBanking, getHistoryBet, getInfoUser, HistoryPayment, logoutUser, napTien } from '~/Redux/apiRequest';
import { createAxios } from '../../createInstance';
import { function_loadding_create, function_loadding_delete } from '~/components/Loadding/Loadding';

function Profile() {
    // const banks = [
    //     {
    //         bank: 'agriBank',
    //         stk: '0888800032',
    //         name: 'Nguyễn Văn A',
    //     },
    //     {
    //         bank: 'Momo',
    //         stk: '0888800032',
    //         name: 'Phạm Thị B',
    //     },
    //     {
    //         bank: 'ACB',
    //         stk: '0888800032',
    //         name: 'Trần Văn C',
    //     },
    // ];
    const [banks, setBanks] = useState([]);
    const paramLink = useParams()['link'];
    const [tabLeft, setTabLeft] = useState('thongtintaikhoan');
    const [tabRight, setTabRight] = useState('ttcn');
    const [modalsActive, setModalsActive] = useState(false);
    const infoUser = useSelector((state) => state.auth.info.infoUser);
    const user = useSelector((state) => state.auth.login.currentUser);
    const [history, setHistory] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [bank, setBank] = useState(0);
    const [money, setMoney] = useState(0);
    const [bankNap, setBankNap] = useState('');
    const [stkNap, setStkNap] = useState('');
    const [chuTk, setChuTk] = useState('');
    const [chuTkr, setChuTkR] = useState('');
    const [bankRut, setBankRut] = useState('');
    const [stkRut, setSoTkR] = useState('');
    const [moneyRut, setMoneyR] = useState(0);
    const axiosJWT = createAxios(user, dispatch);
    const [page, setPage] = useState(1);

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
    const fetch_banking = async () => {
        await function_loadding_create();
        const response = await getBanking(user.access_token, axiosJWT);
        setBanks(response.data.data);
        await function_loadding_delete();
    };

    const handleLogout = () => {
        logoutUser(user, dispatch, navigate, axiosJWT);
    };

    async function fetch_history_payments(url) {
        await function_loadding_create();
        const response = await HistoryPayment(user.access_token, axiosJWT, url);
        setHistory(response.data.data);
        setPage(response.data);
        await function_loadding_delete();
    }

    async function fetch(url) {
        await function_loadding_create();
        const response = await getHistoryBet(user.access_token, axiosJWT, url);
        setHistory(response.data.data);
        setPage(response.data);
        await function_loadding_delete();
    }

    useEffect(() => {
        if (paramLink && paramLink === 'nap-tien') {
            setTabLeft('naptien');
            setTabRight('cn247');
            fetch_banking();
        } else if (paramLink && paramLink === 'rut-tien') {
            setTabLeft('ruttien');
            setTabRight('rt');
        } else if (paramLink && paramLink === 'lich-su-dat-cuoc') {
            setTabLeft('lichsucuoc');
            setTabRight('lsc');
            fetch('http://127.0.0.1:8000/api/history/bet?page=1');
        }
    }, [paramLink]);

    const handleTabLeft = (e) => {
        const targetElement = e.target.parentElement;
        if (targetElement.classList.contains('active')) {
            return;
        }
        const activeElement = document.querySelector('.menu-left-profile.active');
        activeElement?.classList.remove('active');
        targetElement.classList.add('active');
        const type = targetElement.getAttribute('data-tab');
        if (type === 'thongtintaikhoan') {
            setTabLeft('thongtintaikhoan');
            setTabRight('ttcn');
        } else if (type === 'mieutatrochoi') {
            setTabLeft('mieutatrochoi');
            setTabRight('soxo');
        } else if (type === 'cachchoi') {
            setTabLeft('cachchoi');
            setTabRight('ccsoxo');
        } else if (type === 'naptien') {
            setTabLeft('naptien');
            setTabRight('cn247');
            fetch_banking();
        } else if (type === 'ruttien') {
            setTabLeft('ruttien');
            setTabRight('rt');
        } else if (type === 'lichsucuoc') {
            setTabLeft('lichsucuoc');
            setTabRight('lsc');
            fetch('http://127.0.0.1:8000/api/history/bet?page=1');
        } else {
            setTabLeft('dangxuat');
        }
    };
    const handleTableRight = (e) => {
        const targetElement = e.target;
        const type = targetElement.getAttribute('data-tab');
        if (targetElement.classList.contains('active')) {
            return;
        }
        if (type === 'lsnt' || type === 'hsrt') {
            fetch_history_payments('http://127.0.0.1:8000/api/history/payments?page=1');
        }
        setTabRight(type);
    };
    const handleBank = (e) => {
        const targetElement = e.target;
        if (targetElement.classList.contains('active')) {
            return;
        }
        const activeElement = document.querySelector('.bank-button.active');
        activeElement?.classList.remove('active');
        targetElement.classList.add('active');
        const id_bank = targetElement.getAttribute('data-bank');
        setBank(id_bank);
    };
    const handleXacNhanNt = async () => {
        if (money === 0 || money < 100000 || chuTk === '' || bankNap === '' || stkNap === '') {
            notification('error', 'Chưa nhập tiền hoặc nội dung nạp !! please try again !!');
            return;
        }
        await function_loadding_create();
        const data = {
            bank_id: stkNap,
            money: money,
            bank_name: chuTk,
            banker: bankNap,
            type: 'Nạp Tiền',
            status: 0,
        };
        const res = await napTien(data, user.access_token, axiosJWT);
        await function_loadding_delete();
        if (res.status === 200) {
            notification('success', 'Tạo đơn thành công hệ thống sẽ xử lý');
            setModalsActive(false);

            setTabRight('lsnt');
            fetch_history_payments('http://127.0.0.1:8000/api/history/payments?page=1');

            const response = await HistoryPayment(user.access_token, axiosJWT);
            setHistory(response.data.data);
        }
    };
    const handleClickXNrt = async () => {
        if (moneyRut === '' || bankRut === '' || chuTkr === '' || stkRut === '') {
            notification('error', 'Chưa nhập tiền hoặc nội dung nạp !! please try again !!');
            return;
        }
        if (moneyRut > infoUser.money) {
            notification('error', 'Tài khoản không đủ số dư vui lòng kiểm tra lại');
            return;
        }
        await function_loadding_create();
        const data = {
            bank_id: stkRut,
            money: moneyRut,
            bank_name: chuTkr,
            banker: bankRut,
            type: 'Rút tiền',
            status: 0,
        };
        const res = await napTien(data, user.access_token, axiosJWT);
        await function_loadding_delete();
        if (res.status === 200) {
            setTimeout(async () => {
                await getInfoUser(user, dispatch, axiosJWT, infoUser.money);
            }, 500);
            notification('success', 'Tạo đơn thành công hệ thống sẽ xử lý');
            setModalsActive(false);

            setTabRight('hsrt');
            fetch_history_payments('http://127.0.0.1:8000/api/history/payments?page=1');

            const response = await HistoryPayment(user.access_token, axiosJWT);
            setHistory(response.data.data);
        }
    };

    return (
        <div>
            {modalsActive ? (
                <div className="modals-nap-tien">
                    <div className="content-box-modals">
                        <div className="headedr-modals">
                            <p>Thông tin đơn: </p>
                            <hr />
                        </div>
                        <div className="content-modals-nap-tien">
                            <p>Vui lòng chuyển khoản theo thông tin ngân hàng sau: </p>
                            <hr />
                            <div className="stk-nap-tien">
                                <b>{banks[bank].bank_name}</b>
                                <p>
                                    Số tài khoản: <span>{banks[bank].bank_id}</span>
                                </p>
                                <p>
                                    Chủ tài khoản: <span>{banks[bank].name}</span>
                                </p>
                                <hr />
                            </div>
                            <p>Thông tin nạp tiền: </p>
                            <hr />
                            <form>
                                <div className="group-input-naptien">
                                    <span>Số tiền nạp: </span>
                                    <input
                                        type="text"
                                        name="SoTienNap"
                                        onChange={(e) =>
                                            setMoney(
                                                e.target.value.replaceAll(
                                                    /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/\D]/gi,
                                                    '',
                                                ),
                                            )
                                        }
                                        id="SoTienNap"
                                        placeholder="Giới hạn từ 100.000 vnđ đến 1.000.000.000 vnđ"
                                        value={money > 0 ? Intl.NumberFormat().format(money) : ''}
                                    />
                                </div>
                                <div className="group-input-naptien">
                                    <span>Số tài khoản nạp tiền: </span>
                                    <input
                                        type="text"
                                        onChange={(e) => setStkNap(e.target.value)}
                                        name="SoTienNap"
                                        id="SoTienNap"
                                        placeholder="Điền số tài khoản nạp tiền"
                                    />
                                </div>
                                <div className="group-input-naptien">
                                    <span>Nạp từ ngân hàng: </span>
                                    <input
                                        type="text"
                                        onChange={(e) => setBankNap(e.target.value)}
                                        name="SoTienNap"
                                        id="SoTienNap"
                                        placeholder="Điền ngân hàng nạp"
                                    />
                                </div>
                                <div className="group-input-naptien">
                                    <span>Chủ tài khoản: </span>
                                    <input
                                        type="text"
                                        onChange={(e) => setChuTk(e.target.value)}
                                        name="SoTienNap"
                                        id="SoTienNap"
                                        placeholder="Điền tên chủ tài khoản"
                                    />
                                </div>
                            </form>
                            <div className="group-buttom-post-form">
                                <button
                                    onClick={() => {
                                        setModalsActive(false);
                                    }}
                                    className="huy-nap"
                                >
                                    Huỷ bỏ nạp tiền
                                </button>
                                <button onClick={handleXacNhanNt}>Xác nhận nạp tiền</button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <></>
            )}
            <div className="body-bg">
                <div className="max-w-screen-2xl 2xl:m-auto xl:max-w-screen-xl xl:m-auto pb-12">
                    <div
                        style={{ backgroundColor: 'rgba(18,43,71,.74)' }}
                        className="text-white px-6 py-7 box-profile-mobile"
                    >
                        <div className="mt-4 flex flex-wrap">
                            <div className="container-profile">
                                <div className="menu-left">
                                    <li
                                        data-tab="thongtintaikhoan"
                                        className={paramLink ? 'menu-left-profile' : 'menu-left-profile active'}
                                    >
                                        <span className="icon">
                                            <FontAwesomeIcon icon={faUser} className="fa-icon" />
                                        </span>
                                        <span style={{ width: '100%' }} onClick={handleTabLeft}>
                                            Thông tin tài khoản
                                        </span>
                                    </li>
                                    <li data-tab="mieutatrochoi" className="menu-left-profile">
                                        <span className="icon">
                                            <FontAwesomeIcon icon={faGamepad} className="fa-icon" />
                                        </span>
                                        <span style={{ width: '100%' }} onClick={handleTabLeft}>
                                            Miêu tả trò chơi
                                        </span>
                                    </li>
                                    <li data-tab="cachchoi" className="menu-left-profile">
                                        <span className="icon">
                                            <FontAwesomeIcon icon={faAnchorCircleExclamation} className="fa-icon" />
                                        </span>
                                        <span style={{ width: '100%' }} onClick={handleTabLeft}>
                                            Cách chơi
                                        </span>
                                    </li>
                                    <li
                                        data-tab="naptien"
                                        className={
                                            paramLink && paramLink === 'nap-tien'
                                                ? 'menu-left-profile active'
                                                : 'menu-left-profile'
                                        }
                                    >
                                        <span className="icon">
                                            <FontAwesomeIcon icon={faCircleDollarToSlot} className="fa-icon" />
                                        </span>
                                        <span style={{ width: '100%' }} onClick={handleTabLeft}>
                                            Nạp tiền
                                        </span>
                                    </li>
                                    <li
                                        data-tab="ruttien"
                                        className={
                                            paramLink && paramLink === 'rut-tien'
                                                ? 'menu-left-profile active'
                                                : 'menu-left-profile'
                                        }
                                    >
                                        <span className="icon">
                                            <FontAwesomeIcon icon={faHandHoldingDollar} className="fa-icon" />
                                        </span>
                                        <span style={{ width: '100%' }} onClick={handleTabLeft}>
                                            Rút tiền
                                        </span>
                                    </li>
                                    <li
                                        data-tab="lichsucuoc"
                                        className={
                                            paramLink && paramLink === 'lich-su-dat-cuoc'
                                                ? 'menu-left-profile active'
                                                : 'menu-left-profile'
                                        }
                                    >
                                        <span className="icon">
                                            <FontAwesomeIcon icon={faClockRotateLeft} className="fa-icon" />
                                        </span>
                                        <span style={{ width: '100%' }} onClick={handleTabLeft}>
                                            Lịch sử cược
                                        </span>
                                    </li>
                                    <li className="menu-left-profile" data-tab="dangxuat">
                                        <span className="icon">
                                            <FontAwesomeIcon icon={faRightFromBracket} className="fa-icon" />
                                        </span>
                                        <span style={{ width: '100%' }} onClick={handleLogout}>
                                            Đăng Xuất
                                        </span>
                                    </li>
                                </div>
                                <div className="main-right">
                                    {tabRight === 'cn247' ? (
                                        <>
                                            <div className="header-main-right">
                                                <li onClick={handleTableRight} className="active" data-tab="cn247">
                                                    Chuyển tiền nhanh 24/7
                                                </li>
                                                <li onClick={handleTableRight} data-tab="lsnt">
                                                    Lịch sử nạp tiền
                                                </li>
                                            </div>
                                            <div className="content-main-right">
                                                <h2 className="h2">Chuyển tiền qua thẻ ngân hàng</h2>
                                                <div className="form-ct">
                                                    <h2>Ngân hàng</h2>
                                                    {banks.map((value, index) => (
                                                        <button
                                                            key={index}
                                                            onClick={handleBank}
                                                            data-bank={index}
                                                            className={
                                                                bank === index ? 'active bank-button' : 'bank-button'
                                                            }
                                                        >
                                                            {value.bank_name}
                                                        </button>
                                                    ))}
                                                </div>
                                                <div className="content-h3-h4">
                                                    <h2 className="titleh3">
                                                        Mức nạp tiền tối thiểu 100.000 vnđ - tối đa 1.000.000.000 vnđ
                                                    </h2>
                                                    <h2 className="titleh3">
                                                        Lời khuyên: Chúng tôi khuyên bạn nên chuyển tiền không phải là
                                                        số nguyên. Ví dụ 1023.18
                                                    </h2>
                                                    <h4 className="contenth4">
                                                        Lưu ý: để đảm bảo an toàn và bảo mật, số tài khoản ngân hàng hệ
                                                        thống thay đổi liên tục ... vì vậy mỗi lần chuyển tiền quý khách
                                                        vui lòng đăng nhập vào game để lấy số tài khoản. Nếu quý khách
                                                        chuyển khoản vào ngân hàng đã đóng, hệ thống sẽ không hỗ trợ cho
                                                        quý khách !
                                                    </h4>
                                                </div>
                                                <button
                                                    className="button-thnt"
                                                    onClick={() => {
                                                        setModalsActive(true);
                                                    }}
                                                >
                                                    Tiến hành nạp tiền
                                                </button>
                                            </div>
                                        </>
                                    ) : tabRight === 'lsnt' ? (
                                        <>
                                            <div className="header-main-right">
                                                <li onClick={handleTableRight} data-tab="cn247">
                                                    Chuyển tiền nhanh 24/7
                                                </li>
                                                <li onClick={handleTableRight} className="active" data-tab="lsnt">
                                                    Lịch sử nạp tiền
                                                </li>
                                            </div>
                                            <div className="table-box-profile mx-1 border-l border-r border-gray-200">
                                                <div
                                                    style={{ backgroundColor: '#e7f0fc' }}
                                                    className="py-2 flex text-xs items-center font-thin border-t border-b border-gray-200"
                                                >
                                                    <div style={{ width: '15%' }} className="text-center">
                                                        Thời gian
                                                    </div>
                                                    <div style={{ width: '20%' }} className="text-center">
                                                        Phương thức
                                                    </div>
                                                    <div style={{ width: '15%' }} className="text-center">
                                                        Số tiền
                                                    </div>
                                                    <div style={{ width: '20%' }} className="text-center">
                                                        Ngân hàng
                                                    </div>
                                                    <div style={{ width: '15%' }} className="text-center">
                                                        Số tài khoản
                                                    </div>
                                                    <div style={{ width: '15%' }} className="text-center">
                                                        Trạng thái
                                                    </div>
                                                </div>
                                                <div className="table-height border-b border-gray-200 flex">
                                                    <div className="flex-1 overflow-y-auto bet-scroll">
                                                        {history.map((value, index) => (
                                                            <ul
                                                                key={index}
                                                                className="flex items-center text-xs font-thin py-2 hover:bg-gray-200"
                                                            >
                                                                <li style={{ width: '15%' }} className="text-center">
                                                                    {value.created_at}
                                                                </li>
                                                                <li style={{ width: '20%' }} className="text-center">
                                                                    {value.type}
                                                                </li>
                                                                <li style={{ width: '15%' }} className="text-center">
                                                                    {Intl.NumberFormat().format(value.money)}
                                                                </li>
                                                                <li style={{ width: '20%' }} className="text-center">
                                                                    {value.banker}
                                                                </li>
                                                                <li style={{ width: '15%' }} className="text-center">
                                                                    {value.bank_id}
                                                                </li>
                                                                <li style={{ width: '15%' }} className="text-center">
                                                                    {value.status === 1 ? (
                                                                        <span style={{ color: 'green' }}>Đã xử lý</span>
                                                                    ) : (
                                                                        <span style={{ color: 'red' }}>Chưa xử lý</span>
                                                                    )}
                                                                </li>
                                                            </ul>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div className="pagination">
                                                    <button
                                                        className="page"
                                                        onClick={() => fetch_history_payments(page.first_page_url)}
                                                    >
                                                        {' '}
                                                        Trang đầu{' '}
                                                    </button>
                                                    {page.prev_page_url !== null && page.prev_page_url ? (
                                                        <button
                                                            className="page"
                                                            onClick={() => fetch_history_payments(page.prev_page_url)}
                                                        >
                                                            {' '}
                                                            &laquo;{' '}
                                                        </button>
                                                    ) : (
                                                        <button className="page disable"> &laquo; </button>
                                                    )}

                                                    <button className="page active">{page.current_page}</button>
                                                    {page.next_page_url !== null && page.next_page_url ? (
                                                        <button
                                                            className="page"
                                                            onClick={() => fetch_history_payments(page.next_page_url)}
                                                        >
                                                            {' '}
                                                            &raquo;{' '}
                                                        </button>
                                                    ) : (
                                                        <button className="page disable"> &raquo; </button>
                                                    )}

                                                    <button
                                                        className="page"
                                                        onClick={() => fetch_history_payments(page.last_page_url)}
                                                    >
                                                        {' '}
                                                        Trang cuối{' '}
                                                    </button>
                                                </div>
                                            </div>
                                        </>
                                    ) : tabRight === 'tdtnh' ? (
                                        <>
                                            <div className="header-main-right">
                                                <li onClick={handleTableRight} data-tab="rutt" className="active">
                                                    Rút tiền
                                                </li>
                                                <li onClick={handleTableRight} data-tab="hsrt">
                                                    Lịch sử rút tiền
                                                </li>
                                            </div>
                                            <div className="content-main-right">
                                                <div className="css-box-rt">
                                                    <div className="grid-input">
                                                        <div>Loại kênh :</div>
                                                        <span className="csstnh">Thẻ ngân hàng</span>
                                                    </div>
                                                    <div className="grid-input">
                                                        <div>Tên chủ thẻ :</div>
                                                        <input className="inputRt" type="text" />
                                                    </div>
                                                    <div className="grid-input">
                                                        <div>
                                                            <span style={{ color: 'red' }}>*</span> Chọn ngân hàng :{' '}
                                                        </div>
                                                        <select className="inputRt" defaultValue={'Vui lòng chọn'}>
                                                            <option value="SHB">SHB</option>
                                                            <option value="SaigonBank">SaigonBank</option>
                                                            <option value="SeaBank">SeaBank</option>
                                                            <option value="ShinhanBank">ShinHanBank</option>
                                                        </select>
                                                    </div>
                                                    <div className="grid-input">
                                                        <div>
                                                            <span style={{ color: 'red' }}>*</span> Số tải khoản :{' '}
                                                        </div>
                                                        <input className="inputRt" type="text" />
                                                    </div>
                                                    <div className="grid-input">
                                                        <div>
                                                            <span style={{ color: 'red' }}>*</span> Chi nhánh :{' '}
                                                        </div>
                                                        <input className="inputRt" type="text" />
                                                    </div>
                                                    <div className="grid-input">
                                                        <div>
                                                            <span style={{ color: 'red' }}>*</span> Mật khẩu rút tiền :{' '}
                                                        </div>
                                                        <input className="inputRt" type="password" />
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    ) : tabRight === 'ttcn' ? (
                                        <>
                                            <div className="header-main-right">
                                                <li onClick={handleTableRight} className="active" data-tab="ttcn">
                                                    Thông tin cá nhân
                                                </li>
                                                <li onClick={handleTableRight} data-tab="tdmkdn">
                                                    Thay đổi mật khẩu đăng nhập
                                                </li>
                                                {/* <li onClick={handleTableRight} data-tab="tdmkrt">
                                                    Thay đổi mật khẩu rút tiền
                                                </li> */}
                                            </div>
                                            <div className="wrapper">
                                                <div className="profile-card js-profile-card">
                                                    <div className="profile-card__img">
                                                        <Image
                                                            className="h-24 w-2h-24"
                                                            src="	
                                                            https://hr681.com/home/static-center/img/avatar.5d2f6c00.png"
                                                            alt="MB"
                                                        />
                                                    </div>
                                                    <div className="profile-card__cnt js-profile-cnt">
                                                        <div className="profile-card__name">{infoUser?.name}</div>
                                                        <div className="profile-card__txt">
                                                            Số dư:{' '}
                                                            <strong>
                                                                {Intl.NumberFormat().format(infoUser?.money)} VND
                                                            </strong>
                                                        </div>
                                                        <div className="profile-card-ctr">
                                                            <button className="profile-card__button button--blue js-message-btn"></button>
                                                            <button className="profile-card__button button--orange"></button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    ) : tabRight === 'tdmkdn' ? (
                                        <>
                                            <div className="header-main-right">
                                                <li onClick={handleTableRight} data-tab="ttcn">
                                                    Thông tin cá nhân
                                                </li>
                                                <li onClick={handleTableRight} className="active" data-tab="tdmkdn">
                                                    Thay đổi mật khẩu đăng nhập
                                                </li>
                                                {/* <li onClick={handleTableRight} data-tab="tdmkrt">
                                                    Thay đổi mật khẩu rút tiền
                                                </li> */}
                                            </div>
                                            <div className="content-main-right">
                                                <div className="css-box-rt">
                                                    <div className="grid-input">
                                                        <div>
                                                            <span style={{ color: 'red' }}>*</span> Mật khẩu hiện tại :{' '}
                                                        </div>
                                                        <input className="inputRt" type="password" />
                                                    </div>
                                                    <div className="grid-input">
                                                        <div>
                                                            <span style={{ color: 'red' }}>*</span> Mật khẩu mới :{' '}
                                                        </div>
                                                        <input className="inputRt" type="password" />
                                                    </div>
                                                    <div className="grid-input">
                                                        <div>
                                                            <span style={{ color: 'red' }}>*</span> Xác nhận mật khẩu :{' '}
                                                        </div>
                                                        <input className="inputRt" type="password" />
                                                    </div>
                                                </div>
                                                <div className="form-button-submit">
                                                    <button className="profile-card__button button--blue js-message-btn button-form">
                                                        Đổi mật khẩu đăng nhập
                                                    </button>
                                                </div>
                                            </div>
                                        </>
                                    ) : tabRight === 'tdmkrt' ? (
                                        <>
                                            <div className="header-main-right">
                                                <li onClick={handleTableRight} data-tab="ttcn">
                                                    Thông tin cá nhân
                                                </li>
                                                <li onClick={handleTableRight} data-tab="tdmkdn">
                                                    Thay đổi mật khẩu đăng nhập
                                                </li>
                                                <li onClick={handleTableRight} data-tab="tdmkrt" className="active">
                                                    Thay đổi mật khẩu rút tiền
                                                </li>
                                            </div>
                                            <div className="content-main-right">
                                                <div className="css-box-rt">
                                                    <div className="grid-input">
                                                        <div>
                                                            <span style={{ color: 'red' }}>*</span> Mật khẩu hiện tại :{' '}
                                                        </div>
                                                        <input className="inputRt" type="password" />
                                                    </div>
                                                    <div className="grid-input">
                                                        <div>
                                                            <span style={{ color: 'red' }}>*</span> Mật khẩu mới :{' '}
                                                        </div>
                                                        <input className="inputRt" type="password" />
                                                    </div>
                                                    <div className="grid-input">
                                                        <div>
                                                            <span style={{ color: 'red' }}>*</span> Xác nhận mật khẩu :{' '}
                                                        </div>
                                                        <input className="inputRt" type="password" />
                                                    </div>
                                                </div>
                                                <div className="form-button-submit">
                                                    <button className=" profile-card__button button--blue js-message-btn button-form">
                                                        Đổi mật khẩu rút tiền
                                                    </button>
                                                </div>
                                            </div>
                                        </>
                                    ) : tabRight === 'soxo' ? (
                                        <>
                                            <div className="header-main-right">
                                                <li className="active" onClick={handleTableRight} data-tab="soxo">
                                                    Sổ xố
                                                </li>
                                                <li onClick={handleTableRight} data-tab="mega645">
                                                    Mega 6/45
                                                </li>
                                            </div>
                                            <table className="table-mieutratrochoi">
                                                <thead>
                                                    <tr>
                                                        <th width="15%">Thể loại</th>
                                                        <th width="20%">Cách chơi</th>
                                                        <th width="9%">Tỉ lệ</th>
                                                        <th width="9%">Hoàn trả</th>
                                                        <th width="15%">Số tiền đặt cược</th>
                                                        <th>Đặt cược cao nhất</th>
                                                        <th>Kỳ cược cao nhất</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <th width="15%" rowSpan="5">
                                                            Bao Lô
                                                        </th>
                                                        <th width="20%">Lô 2 Số</th>
                                                        <th width="9%">99.5</th>
                                                        <th width="9%">0</th>
                                                        <th width="15%">27.000</th>
                                                        <th>5.000.000.000</th>
                                                        <th>5.000.000.000</th>
                                                    </tr>
                                                    <tr>
                                                        <th>Lô 2 Số Đầu</th>
                                                        <th>99.5</th>
                                                        <th>0</th>
                                                        <th>27.000</th>
                                                        <th>5.000.000.000</th>
                                                        <th>5.000.000.000</th>
                                                    </tr>
                                                    <tr>
                                                        <th>Lô 2 Số 1k</th>
                                                        <th>3.7</th>
                                                        <th>0</th>
                                                        <th>1.000</th>
                                                        <th>5.000.000.000</th>
                                                        <th>5.000.000.000</th>
                                                    </tr>
                                                    <tr>
                                                        <th>Lô 3 Số</th>
                                                        <th>980</th>
                                                        <th>0</th>
                                                        <th>23.000</th>
                                                        <th>5.000.000.000</th>
                                                        <th>5.000.000.000</th>
                                                    </tr>
                                                    <tr>
                                                        <th>Lô 4 Số</th>
                                                        <th>8880</th>
                                                        <th>0</th>
                                                        <th>20.000</th>
                                                        <th>5.000.000.000</th>
                                                        <th>5.000.000.000</th>
                                                    </tr>
                                                    <tr>
                                                        <th rowSpan="3">Lô Xiên</th>
                                                        <th>Xiên 2</th>
                                                        <th>16</th>
                                                        <th>0</th>
                                                        <th>1.000</th>
                                                        <th>5.000.000.000</th>
                                                        <th>5.000.000.000</th>
                                                    </tr>
                                                    <tr>
                                                        <th>Xiên 3</th>
                                                        <th>65</th>
                                                        <th>0</th>
                                                        <th>1.000</th>
                                                        <th>5.000.000.000</th>
                                                        <th>5.000.000.000</th>
                                                    </tr>
                                                    <tr>
                                                        <th>Xiên 4</th>
                                                        <th>180</th>
                                                        <th>0</th>
                                                        <th>1.000</th>
                                                        <th>5.000.000.000</th>
                                                        <th>5.000.000.000</th>
                                                    </tr>
                                                    <tr>
                                                        <th rowSpan="5">Đánh Đề</th>
                                                        <th>Đề Đặc Biệc</th>
                                                        <th>99.5</th>
                                                        <th>0</th>
                                                        <th>1.000</th>
                                                        <th>5.000.000.000</th>
                                                        <th>5.000.000.000</th>
                                                    </tr>
                                                    <tr>
                                                        <th>Đề Đầu Đặc Biệc</th>
                                                        <th>99.5</th>
                                                        <th>0</th>
                                                        <th>1.000</th>
                                                        <th>5.000.000.000</th>
                                                        <th>5.000.000.000</th>
                                                    </tr>
                                                    <tr>
                                                        <th>Đề Giải 7</th>
                                                        <th>98</th>
                                                        <th>0</th>
                                                        <th>4.000</th>
                                                        <th>5.000.000.000</th>
                                                        <th>5.000.000.000</th>
                                                    </tr>
                                                    <tr>
                                                        <th>Đề Giải Nhất</th>
                                                        <th>98</th>
                                                        <th>0</th>
                                                        <th>1.000</th>
                                                        <th>5.000.000.000</th>
                                                        <th>5.000.000.000</th>
                                                    </tr>
                                                    <tr>
                                                        <th>Đề Đầu Giải Nhất</th>
                                                        <th>98</th>
                                                        <th>0</th>
                                                        <th>1.000</th>
                                                        <th>5.000.000.000</th>
                                                        <th>5.000.000.000</th>
                                                    </tr>
                                                    <tr>
                                                        <th rowSpan="2">Đầu Đuôi</th>
                                                        <th>Đầu</th>
                                                        <th>9.9</th>
                                                        <th>0</th>
                                                        <th>1.000</th>
                                                        <th>5.000.000.000</th>
                                                        <th>5.000.000.000</th>
                                                    </tr>
                                                    <tr>
                                                        <th>Đuôi</th>
                                                        <th>9.9</th>
                                                        <th>0</th>
                                                        <th>1.000</th>
                                                        <th>5.000.000.000</th>
                                                        <th>5.000.000.000</th>
                                                    </tr>
                                                    <tr>
                                                        <th rowSpan="4">3 Càng</th>
                                                        <th>3 Càng Đầu</th>
                                                        <th>960</th>
                                                        <th>0</th>
                                                        <th>3.000</th>
                                                        <th>50.000.000</th>
                                                        <th>50.000.000</th>
                                                    </tr>
                                                    <tr>
                                                        <th>3 Càng Đặc Biệt</th>
                                                        <th>980</th>
                                                        <th>0</th>
                                                        <th>1.000</th>
                                                        <th>5.000.000.000</th>
                                                        <th>5.000.000.000</th>
                                                    </tr>
                                                    <tr>
                                                        <th>3 Càng Giải Nhất</th>
                                                        <th>980</th>
                                                        <th>0</th>
                                                        <th>1.000</th>
                                                        <th>5.000.000.000</th>
                                                        <th>5.000.000.000</th>
                                                    </tr>
                                                    <tr>
                                                        <th>3 Càng Đầu Đuôi</th>
                                                        <th>980</th>
                                                        <th>0</th>
                                                        <th>4.000</th>
                                                        <th>50.000.000</th>
                                                        <th>50.000.000</th>
                                                    </tr>
                                                    <tr>
                                                        <th>4 Càng</th>
                                                        <th>4 Càng Đặc Biệt</th>
                                                        <th>8880</th>
                                                        <th>0</th>
                                                        <th>3.000</th>
                                                        <th>5.000.000.000</th>
                                                        <th>5.000.000.000</th>
                                                    </tr>
                                                    <tr>
                                                        <th rowSpan="3">Lô Trượt</th>
                                                        <th>Trượt Xiên 4</th>
                                                        <th>2.3</th>
                                                        <th>0</th>
                                                        <th>3.000</th>
                                                        <th>5.000.000.000</th>
                                                        <th>5.000.000.000</th>
                                                    </tr>
                                                    <tr>
                                                        <th>Trượt Xiên 8</th>
                                                        <th>8</th>
                                                        <th>0</th>
                                                        <th>1.000</th>
                                                        <th>5.000.000.000</th>
                                                        <th>5.000.000.000</th>
                                                    </tr>
                                                    <tr>
                                                        <th>Trượt Xiên 10</th>
                                                        <th>12</th>
                                                        <th>0</th>
                                                        <th>1.000</th>
                                                        <th>5.000.000.000</th>
                                                        <th>5.000.000.000</th>
                                                    </tr>
                                                    <tr>
                                                        <th rowSpan="3">Lô 2 Số Giải Đặt Biệt</th>
                                                        <th>Lớn nhỏ chẳn lẻ</th>
                                                        <th>1.999</th>
                                                        <th>0</th>
                                                        <th>1.000</th>
                                                        <th>5.000.000.000</th>
                                                        <th>5.000.000.000</th>
                                                    </tr>
                                                    <tr>
                                                        <th></th>
                                                        <th>1.999</th>
                                                        <th>0</th>
                                                        <th>1.000</th>
                                                        <th>5.000.000.000</th>
                                                        <th>5.000.000.000</th>
                                                    </tr>
                                                    <tr>
                                                        <th></th>
                                                        <th>1.999</th>
                                                        <th>0</th>
                                                        <th>1.000</th>
                                                        <th>5.000.000.000</th>
                                                        <th>5.000.000.000</th>
                                                    </tr>
                                                    <tr>
                                                        <th rowSpan="13">Lô 2 Số Giải Đặt Biệt [Tổng giá trị]</th>
                                                        <th>0.18</th>
                                                        <th>70</th>
                                                        <th>0</th>
                                                        <th>1.000</th>
                                                        <th>50.000.000</th>
                                                        <th>50.000.000</th>
                                                    </tr>
                                                    <tr>
                                                        <th>1.17</th>
                                                        <th>36</th>
                                                        <th>0</th>
                                                        <th>1.000</th>
                                                        <th>50.000.000</th>
                                                        <th>50.000.000</th>
                                                    </tr>
                                                    <tr>
                                                        <th>2.16</th>
                                                        <th>26.999</th>
                                                        <th>0</th>
                                                        <th>1.000</th>
                                                        <th>5.000.000.000</th>
                                                        <th>5.000.000.000</th>
                                                    </tr>
                                                    <tr>
                                                        <th>3.15</th>
                                                        <th>20.5</th>
                                                        <th>0</th>
                                                        <th>1.000</th>
                                                        <th>5.000.000.000</th>
                                                        <th>5.000.000.000</th>
                                                    </tr>
                                                    <tr>
                                                        <th>4.14</th>
                                                        <th>16.4</th>
                                                        <th>0</th>
                                                        <th>1.000</th>
                                                        <th>5.000.000.000</th>
                                                        <th>5.000.000.000</th>
                                                    </tr>
                                                    <tr>
                                                        <th>5.13</th>
                                                        <th>13.668</th>
                                                        <th>0</th>
                                                        <th>1.000</th>
                                                        <th>5.000.000.000</th>
                                                        <th>5.000.000.000</th>
                                                    </tr>
                                                    <tr>
                                                        <th>6.12</th>
                                                        <th>12.285</th>
                                                        <th>0</th>
                                                        <th>1.000</th>
                                                        <th>5.000.000.000</th>
                                                        <th>5.000.000.000</th>
                                                    </tr>
                                                    <tr>
                                                        <th>7.11</th>
                                                        <th>10.875</th>
                                                        <th>0</th>
                                                        <th>1.000</th>
                                                        <th>5.000.000.000</th>
                                                        <th>5.000.000.000</th>
                                                    </tr>
                                                    <tr>
                                                        <th>8.10</th>
                                                        <th>9.777</th>
                                                        <th>0</th>
                                                        <th>1.000</th>
                                                        <th>5.000.000.000</th>
                                                        <th>5.000.000.000</th>
                                                    </tr>
                                                    <tr>
                                                        <th>9</th>
                                                        <th>9</th>
                                                        <th>0</th>
                                                        <th>1.000</th>
                                                        <th>50.000.000</th>
                                                        <th>50.000.000</th>
                                                    </tr>
                                                    <tr>
                                                        <th>Lớn</th>
                                                        <th>1.999</th>
                                                        <th>0</th>
                                                        <th>1.000</th>
                                                        <th>50.000.000</th>
                                                        <th>50.000.000</th>
                                                    </tr>
                                                    <tr>
                                                        <th>Nhỏ</th>
                                                        <th>1.999</th>
                                                        <th>0</th>
                                                        <th>1.000</th>
                                                        <th>50.000.000</th>
                                                        <th>50.000.000</th>
                                                    </tr>
                                                    <tr>
                                                        <th>Chẳn Lẻ</th>
                                                        <th>1.999</th>
                                                        <th>0</th>
                                                        <th>1.000</th>
                                                        <th>50.000.000</th>
                                                        <th>50.000.000</th>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </>
                                    ) : tabRight === 'mega645' ? (
                                        <>
                                            <div className="header-main-right">
                                                <li onClick={handleTableRight} data-tab="soxo">
                                                    Sổ xố
                                                </li>
                                                <li className="active" onClick={handleTableRight} data-tab="mega645">
                                                    Mega 6/45
                                                </li>
                                            </div>

                                            <table className="table-mieutratrochoi">
                                                <thead>
                                                    <tr>
                                                        <th width="15%">Thể loại</th>
                                                        <th width="20%">Cách chơi</th>
                                                        <th width="9%">Tỉ lệ</th>
                                                        <th width="9%">Hoàn trả</th>
                                                        <th width="15%">Số tiền đặt cược</th>
                                                        <th>Đặt cược cao nhất</th>
                                                        <th>Kỳ cược cao nhất</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <th width="15%">Số Thường</th>
                                                        <th width="20%">Số Thường</th>
                                                        <th width="9%">7.1</th>
                                                        <th width="9%">0</th>
                                                        <th width="15%">1.000</th>
                                                        <th>5.000.000.000</th>
                                                        <th>5.000.000.000</th>
                                                    </tr>
                                                    <tr>
                                                        <th width="15%" rowSpan="5">
                                                            Nhiều Số
                                                        </th>
                                                        <th width="20%">Trúng 4 số</th>
                                                        <th width="9%">7000</th>
                                                        <th width="9%">0</th>
                                                        <th width="15%">1.000</th>
                                                        <th>50.000.000</th>
                                                        <th>50.000.000</th>
                                                    </tr>
                                                    <tr>
                                                        <th width="20%">Trúng 3 số</th>
                                                        <th width="9%">500</th>
                                                        <th width="9%">0</th>
                                                        <th width="15%">1.000</th>
                                                        <th>50.000.000</th>
                                                        <th>50.000.000</th>
                                                    </tr>
                                                    <tr>
                                                        <th width="20%">Trúng 2 số</th>
                                                        <th width="9%">50</th>
                                                        <th width="9%">0</th>
                                                        <th width="15%">1.000</th>
                                                        <th>50.000.000</th>
                                                        <th>50.000.000</th>
                                                    </tr>
                                                    <tr>
                                                        <th width="20%">3 Trúng 2 Trúng 2</th>
                                                        <th width="9%">16</th>
                                                        <th width="9%">0</th>
                                                        <th width="15%">1.000</th>
                                                        <th>50.000.000</th>
                                                        <th>50.000.000</th>
                                                    </tr>
                                                    <tr>
                                                        <th width="20%">3 Trúng 2 Trúng 3</th>
                                                        <th width="9%">80</th>
                                                        <th width="9%">0</th>
                                                        <th width="15%">1.000</th>
                                                        <th>50.000.000</th>
                                                        <th>50.000.000</th>
                                                    </tr>
                                                    <tr>
                                                        <th width="15%" rowSpan="6">
                                                            Lô Trượt
                                                        </th>
                                                        <th width="20%">Trượt Xiên 5</th>
                                                        <th width="9%">2.07</th>
                                                        <th width="9%">0</th>
                                                        <th width="15%">1.000</th>
                                                        <th>50.000.000</th>
                                                        <th>50.000.000</th>
                                                    </tr>
                                                    <tr>
                                                        <th width="20%">Trượt Xiên 6</th>
                                                        <th width="9%">2.43</th>
                                                        <th width="9%">0</th>
                                                        <th width="15%">1.000</th>
                                                        <th>50.000.000</th>
                                                        <th>50.000.000</th>
                                                    </tr>
                                                    <tr>
                                                        <th width="20%">Trượt Xiên 7</th>
                                                        <th width="9%">2.88</th>
                                                        <th width="9%">0</th>
                                                        <th width="15%">1.000</th>
                                                        <th>50.000.000</th>
                                                        <th>50.000.000</th>
                                                    </tr>
                                                    <tr>
                                                        <th width="20%">Trượt Xiên 8</th>
                                                        <th width="9%">3.42</th>
                                                        <th width="9%">0</th>
                                                        <th width="15%">1.000</th>
                                                        <th>50.000.000</th>
                                                        <th>50.000.000</th>
                                                    </tr>
                                                    <tr>
                                                        <th width="20%">Trượt Xiên 9</th>
                                                        <th width="9%">4.08</th>
                                                        <th width="9%">0</th>
                                                        <th width="15%">1.000</th>
                                                        <th>50.000.000</th>
                                                        <th>50.000.000</th>
                                                    </tr>
                                                    <tr>
                                                        <th width="20%">Trượt Xiên 10</th>
                                                        <th width="9%">4.9</th>
                                                        <th width="9%">0</th>
                                                        <th width="15%">1.000</th>
                                                        <th>50.000.000</th>
                                                        <th>50.000.000</th>
                                                    </tr>
                                                    <tr>
                                                        <th width="15%" rowSpan="6">
                                                            Chọn 1
                                                        </th>
                                                        <th width="20%">Chọn 5 Ăn 1</th>
                                                        <th width="9%">2.31</th>
                                                        <th width="9%">0</th>
                                                        <th width="15%">1.000</th>
                                                        <th>50.000.000</th>
                                                        <th>50.000.000</th>
                                                    </tr>
                                                    <tr>
                                                        <th width="20%">Chọn 6 Ăn 1</th>
                                                        <th width="9%">2.2</th>
                                                        <th width="9%">0</th>
                                                        <th width="15%">1.000</th>
                                                        <th>50.000.000</th>
                                                        <th>50.000.000</th>
                                                    </tr>
                                                    <tr>
                                                        <th width="20%">Chọn 7 Ăn 1</th>
                                                        <th width="9%">2.17</th>
                                                        <th width="9%">0</th>
                                                        <th width="15%">1.000</th>
                                                        <th>50.000.000</th>
                                                        <th>50.000.000</th>
                                                    </tr>
                                                    <tr>
                                                        <th width="20%">Chọn 8 Ăn 1</th>
                                                        <th width="9%">2.18</th>
                                                        <th width="9%">0</th>
                                                        <th width="15%">1.000</th>
                                                        <th>50.000.000</th>
                                                        <th>50.000.000</th>
                                                    </tr>
                                                    <tr>
                                                        <th width="20%">Chọn 9 Ăn 1</th>
                                                        <th width="9%">2.24</th>
                                                        <th width="9%">0</th>
                                                        <th width="15%">1.000</th>
                                                        <th>50.000.000</th>
                                                        <th>50.000.000</th>
                                                    </tr>
                                                    <tr>
                                                        <th width="20%">Chọn 10 Ăn 1</th>
                                                        <th width="9%">2.35</th>
                                                        <th width="9%">0</th>
                                                        <th width="15%">1.000</th>
                                                        <th>50.000.000</th>
                                                        <th>50.000.000</th>
                                                    </tr>

                                                    <tr>
                                                        <th rowSpan="4">Lô 2 Số Giải Đặt Biệt [Tổng giá trị]</th>
                                                        <th>0.18</th>
                                                        <th>70</th>
                                                        <th>0</th>
                                                        <th>1.000</th>
                                                        <th>50.000.000</th>
                                                        <th>50.000.000</th>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </>
                                    ) : tabRight === 'ccsoxo' ? (
                                        <>
                                            <div className="header-main-right">
                                                <li className="active" onClick={handleTableRight} data-tab="ccsoxo">
                                                    Sổ xố
                                                </li>
                                                <li onClick={handleTableRight} data-tab="ccmega645">
                                                    Mega 6/45
                                                </li>
                                            </div>
                                            <div className="content-cachchoisx">
                                                <h4>Tuyên bố quan trọng</h4>
                                                <p>
                                                    1.Nếu khách hàng nghi ngờ thông tin của mình bị đánh cắp cần thông
                                                    báo ngay cho công ty và thay đổi dữ liệu chi tiết, tên đăng nhập và
                                                    mật khẩu trước đó đều sẽ không hợp lệ.
                                                </p>
                                                <p>
                                                    2.Khách hàng có trách nhiệm đảm bảo bí mật về tài khoản và thông tin
                                                    đăng nhập của mình. Mọi cá cược trực tuyến được thực hiện bằng tên
                                                    người dùng và mật khẩu sẽ được coi là hợp lệ.
                                                </p>
                                                <p>
                                                    3.Đối với bất kỳ lỗi đánh máy nào hoặc lỗi vô ý của con người trong
                                                    việc thông báo tỷ lệ cược, công ty có quyền sửa lỗi và giải quyết
                                                    đặt cược theo tỷ lệ cược chính xác. Luật nơi bạn cư trú có thể quy
                                                    định rằng chơi game trực tuyến là bất hợp pháp, nếu điều này là
                                                    đúng, công ty sẽ không chấp thuận cho bạn sử dụng thẻ thanh toán để
                                                    giao dịch.
                                                </p>
                                                <p>
                                                    4.Khách hàng nên kiểm tra số dư tài khoản của mình mỗi khi đăng
                                                    nhập. Nếu bạn có bất kỳ câu hỏi nào về số dư, vui lòng thông báo cho
                                                    công ty càng sớm càng tốt.
                                                </p>
                                                <p>5.Một khi cược được chấp nhận, nó không thể bị hủy bỏ.</p>
                                                <p>
                                                    6.Tỷ lệ cược của tất cả các con số sẽ biến động theo thời gian, và
                                                    tỷ lệ cược tại thời điểm thanh toán sẽ dựa trên tỷ lệ cược khi cược
                                                    được xác nhận.
                                                </p>
                                                <p>
                                                    7.Số tiền đặt cược tối đa cho mỗi lần đặt cược thay đổi tùy theo cài
                                                    đặt [thể thao], [mục cá cược] và [tài khoản thành viên] khác nhau.
                                                    Nếu số tiền đặt cược vượt quá cài đặt trên, công ty có quyền hủy bỏ
                                                    số tiền đặt cược vượt quá.
                                                </p>
                                                <p>
                                                    8.Tất cả các cược phải được thực hiện trong thời gian trước khi kết
                                                    quả hòa, nếu không các cược sẽ không hợp lệ.
                                                </p>
                                                <p>9.Tất cả các khoản thanh toán cá cược bao gồm tiền gốc.</p>
                                                <p>
                                                    10.Trang web chính thức:{' '}
                                                    <a href="https://vnlottery.com/" style={{ color: 'red' }}>
                                                        https://vnlottery.com/
                                                    </a>
                                                </p>
                                                <h4>Sổ xố mô tả quy tắc</h4>
                                                <p>
                                                    ● Thời gian đặt cược, thời gian mở thưởng và kết quả mở thưởng của
                                                    trò chơi này hoàn toàn đồng bộ với Xổ số Miền Bắc,theo giờ Việt Nam
                                                    (GMT + 7) quay thưởng vào lúc 18:15 hàng tuần, mỗi ngày một lần.
                                                </p>
                                                <p>
                                                    ● Kết quả xổ số Miền Bắc có 8 giải (từ giải đặc biệt đến giải bảy),
                                                    gồm 27 bộ số, tương đương với 27 lần quay thưởng.
                                                </p>

                                                <table>
                                                    <thead>
                                                        <tr>
                                                            <td>Giải thưởng</td>
                                                            <td></td>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>Giải 7</td>
                                                            <td>2 chữ số * 4 nhóm</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Giải 6</td>
                                                            <td>3 chữ số * 3 nhóm</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Giải 5</td>
                                                            <td>4 chữ số * 6 nhóm</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Giải 4</td>
                                                            <td>4 chữ số * 4 nhóm</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Giải 3</td>
                                                            <td>5 chữ số * 6 nhóm</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Giải 2</td>
                                                            <td>5 chữ số * 2 nhóm</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Giải 1</td>
                                                            <td>5 chữ số * 1 nhóm</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Giải Đặc Biệt</td>
                                                            <td>5 chữ số * 1 nhóm</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Tổng số</td>
                                                            <td>27 nhóm số</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                <div>
                                                    <p>Luật chơi cụ thể như sau:</p>
                                                    <h4>1､Bao Lô</h4>
                                                    <p>
                                                        <b>Lô 2 số : </b>
                                                        Chọn một số từ hàng chục và hàng đơn vị để tạo thành bộ gồm 2
                                                        chữ số để đặt cược, Nếu số được bình chọn trùng với 2 chữ số
                                                        cuối của bất kỳ vị trí nào trong số 27 vị trí của kết quả xổ số,
                                                        thì đó là chiến thắng. Nếu có nhiều hơn một số trúng thưởng, số
                                                        tiền trúng thưởng sẽ được nhân đôi tương ứng. Ví dụ, bạn đặt
                                                        cược vào 45, nếu có 27 bộ số có 2 chữ số cuối là 45 trong kết
                                                        quả xổ số thì đó là thắng. Trong 27 nhóm số có N số có 2 chữ số
                                                        tận cùng là 45 thì được thưởng nhân với N.
                                                    </p>
                                                    <p>
                                                        <b>Lô 2 Số Đầu :</b>
                                                        Chọn một số từ hàng chục và hàng đơn vị để tạo thành bộ gồm 2
                                                        chữ số để đặt cược, Nếu số được bình chọn trùng với 2 chữ số đầu
                                                        của bất kỳ bộ số nào từ giải đặc biệt đến giải 6 trong kết quả
                                                        xổ số thì trúng thưởng. Nếu có nhiều hơn một số trúng thưởng, số
                                                        tiền trúng thưởng sẽ được nhân đôi tương ứng. Ví dụ bạn đặt cược
                                                        vào 45, nếu kết quả xổ số từ giải đặc biệt đến giải sáu có hai
                                                        số đầu là 45 thì trúng thưởng. Nếu có N số có 2 chữ số đầu là 45
                                                        từ giải đặc biệt đến giải sáu thì phần thưởng nhân với N.
                                                    </p>
                                                    <p>
                                                        <b>Lô 2 Số 1K :</b>
                                                        Chọn một số từ hàng chục và hàng đơn vị để tạo thành bộ gồm 2
                                                        chữ số để đặt cược, Nếu số được bình chọn trùng với 2 chữ số
                                                        cuối của bất kỳ vị trí nào trong số 27 vị trí của kết quả xổ số,
                                                        thì đó là chiến thắng. Nếu có nhiều hơn một số trúng thưởng, số
                                                        tiền trúng thưởng sẽ được nhân đôi tương ứng. Ví dụ, bạn đặt
                                                        cược vào 45, nếu có 27 bộ số có 2 chữ số cuối là 45 trong kết
                                                        quả xổ số thì đó là thắng. Trong 27 nhóm số có N số có 2 chữ số
                                                        tận cùng là 45 thì được thưởng nhân với N.
                                                    </p>
                                                    <p>
                                                        <b>Lô 3 Số :</b>
                                                        Chọn một số từ các chữ số hàng trăm, hàng chục và hàng đơn vị để
                                                        tạo thành bộ 3 chữ số để đặt cược. Nếu số được bình chọn trùng
                                                        với 3 chữ số cuối của bất kỳ vị trí nào trong số 23 vị trí của
                                                        kết quả xổ số, thì đó là một chiến thắng. Nếu có nhiều hơn một
                                                        số trúng thưởng, số tiền trúng thưởng sẽ được nhân đôi tương
                                                        ứng. Ví dụ bạn đặt cược vào 456, nếu trong kết quả xổ số có 23
                                                        nhóm số mà 3 số cuối là 456 thì đó là trúng thưởng. Trong 23
                                                        nhóm số có N số có 3 chữ số tận cùng là 456 thì được thưởng nhân
                                                        với N.
                                                    </p>
                                                    <p>
                                                        <b>Lô 4 Số :</b>
                                                        Chọn 1 số từ hàng nghìn, hàng trăm, hàng chục và hàng đơn vị để
                                                        tạo thành bộ 4 chữ số để đặt cược. Nếu số được bình chọn trùng
                                                        với 4 chữ số cuối cùng của bất kỳ vị trí nào trong số 20 vị trí
                                                        của kết quả xổ số, thì đó là một chiến thắng. Nếu có nhiều hơn
                                                        một số trúng thưởng, số tiền trúng thưởng sẽ được nhân đôi tương
                                                        ứng. Ví dụ, nếu bạn đặt cược vào 4567, 4 số cuối của 20 bộ số
                                                        trong kết quả xổ số là 4567. Nếu có N số có 4 chữ số tận cùng là
                                                        4567 trong 20 nhóm số thì được thưởng nhân với N.
                                                    </p>
                                                    <h4>2､Lô Xiên</h4>
                                                    <p>
                                                        <b>Xiên 2:</b>
                                                        Chọn 2 bộ số tùy ý để đặt cược,Nếu số được bình chọn trùng với 2
                                                        chữ số cuối cùng của 2 bộ bất kỳ trong số 27 vị trí trong kết
                                                        quả xổ số, thì đó là chiến thắng. Ví dụ bạn đặt cược vào 45/55,
                                                        nếu có 27 bộ số với hai số cuối là 45 và 55 thì đó là người
                                                        chiến thắng.
                                                    </p>
                                                    <p>
                                                        <b>Xiên 3:</b>
                                                        Chọn 3 bộ số để đặt cược ngẫu nhiên. Nếu con số được bình chọn
                                                        trùng với 2 chữ số cuối của 3 con số bất kỳ trong 27 vị trí của
                                                        kết quả xổ số thì đó là chiến thắng. Ví dụ bạn đặt cược cho
                                                        45/55/65 mà có 27 bộ số có hai số cuối là 45/55/65 thì đó là
                                                        người thắng cuộc.
                                                    </p>
                                                    <p>
                                                        <b>Xiên 4:</b>
                                                        Chọn 4 bộ số tùy ý để đặt cược. Nếu số được bình chọn trùng với
                                                        2 chữ số cuối cùng của 4 số bất kỳ trong 27 vị trí của kết quả
                                                        xổ số thì đó là chiến thắng. Ví dụ bạn đặt cược vào 45/55/65/75,
                                                        nếu có 27 bộ số có 2 chữ số cuối là 45/55/65/75 là thắng.
                                                    </p>
                                                    <h4>3､Đánh Đề</h4>
                                                    <p>
                                                        <b>Đề đặc biệt :</b>
                                                        Chọn một số từ hàng chục và hàng đơn vị để tạo thành bộ gồm 2
                                                        chữ số để đặt cược, Nếu số được bình chọn trùng với 2 số cuối
                                                        của giải đặc biệt của kết quả xổ số thì trúng thưởng. Ví dụ bạn
                                                        đặt cược cho 45, 2 số cuối giải đặc biệt của kết quả xổ số là 45
                                                        thì trúng thưởng.
                                                    </p>
                                                    <p>
                                                        <b>Đề đầu đặc biệt :</b>
                                                        Chọn một số từ hàng chục và hàng đơn vị để tạo thành bộ gồm 2
                                                        chữ số để đặt cược, Nếu số bình chọn trùng với 2 chữ số đầu của
                                                        giải đặc biệt của kết quả xổ số thì trúng thưởng. Ví dụ bạn đặt
                                                        cược vào 45 và 2 chữ số đầu của giải đặc biệt của kết quả mở
                                                        thưởng là 45 thì đó là thắng.
                                                    </p>
                                                    <p>
                                                        <b>Đề đầu giải nhất:</b>
                                                        Chọn một số từ hàng chục và hàng đơn vị để tạo thành bộ gồm 2
                                                        chữ số để đặt cược, nếu số bạn chọn trùng với 2 chữ số đầu tiên
                                                        của giải nhất kết quả xổ số thì bạn trúng thưởng. Ví dụ, nếu bạn
                                                        đặt cược vào 45 và đầu 2 của giải nhất của kết quả xổ số là 45,
                                                        là bạn trúng thưởng.
                                                    </p>
                                                    <p>
                                                        <b>Đề Giải 7:</b>
                                                        Chọn một số từ hàng chục và hàng đơn vị để tạo thành bộ gồm 2
                                                        chữ số để đặt cược, Nếu có nhiều hơn một số trúng thưởng, số
                                                        tiền trúng thưởng sẽ được nhân đôi tương ứng. Nếu số được bình
                                                        chọn trùng với bất kỳ bộ số nào trong giải bảy của kết quả xổ số
                                                        thì đó là người chiến thắng. Ví dụ bạn đặt cược vào 45, nếu giải
                                                        7 mở ra 45 là thắng. Nếu trong dãy số mở thưởng thứ bảy có N 45
                                                        chữ số thì phần thưởng được nhân với N.
                                                    </p>
                                                    <p>
                                                        <b>Đề Giải Nhất :</b>
                                                        Chọn một số từ hàng chục và hàng đơn vị để tạo thành bộ gồm 2
                                                        chữ số để đặt cược, Nếu số được bình chọn trùng với 2 số cuối
                                                        của giải nhất của kết quả xổ số thì trúng thưởng. Ví dụ, nếu bạn
                                                        đặt cược vào 45 và 2 vị trí cuối cùng của giải nhất của kết quả
                                                        xổ số là 45, đó là một chiến thắng.
                                                    </p>
                                                    <h4>4､Đầu Đuôi</h4>
                                                    <p>
                                                        <b>Đầu :</b>
                                                        Chọn 1 số bất kỳ từ 0 đến 9 để đặt cược. Khi kết quả xổ số mở
                                                        thưởng, nếu số được chọn trùng với chữ số hàng chục của giải đặc
                                                        biệt thì được tính là trúng thưởng. Ví dụ bạn đặt cược vào 4 mà
                                                        hàng chục của giải đặc biệt trùng với số 4 thì bạn chiến thắng.
                                                    </p>
                                                    <p>
                                                        <b>Đuôi :</b>
                                                        Chọn 1 số bất kỳ từ 0 đến 9 để đặt cược. Khi kết quả xổ số mở
                                                        thưởng, nếu số được chọn trùng với chữ số hàng đơn vị của giải
                                                        đặc biệt thì được tính là trúng thưởng. Ví dụ bạn đặt cược vào 4
                                                        mà hàng đơn vị của giải đặc biệt trùng với số 4 thì bạn chiến
                                                        thắng
                                                    </p>
                                                    <h4>5､3 Càng</h4>
                                                    <p>
                                                        <b>3 Càng Đầu :</b>
                                                        Chọn một số từ các chữ số hàng trăm, hàng chục và hàng đơn vị để
                                                        tạo thành bộ 3 chữ số để đặt cược.Nếu số được bình chọn trùng
                                                        với số của giải sáu trong kết quả xổ số thì đó là chiến thắng.
                                                        Ví dụ, nếu bạn đặt cược vào 456, giải sáu của kết quả xổ số là
                                                        456, thì bạn chiến thắng.Nếu có nhiều hơn một số trúng thưởng,
                                                        số tiền trúng thưởng sẽ được nhân đôi tương ứng.
                                                    </p>
                                                    <p>
                                                        <b>3 Càng Đặc Biệt :</b>
                                                        Chọn một số từ các chữ số hàng trăm, hàng chục và hàng đơn vị để
                                                        tạo thành bộ 3 chữ số để đặt cược. Nếu số bình chọn trùng với 3
                                                        số cuối của giải đặc biệt của kết quả xổ số thì trúng thưởng. Ví
                                                        dụ bạn đặt cược 456 thì 3 số cuối của giải đặc biệt của kết quả
                                                        xổ số là 456 và bạn trúng thưởng.
                                                    </p>
                                                    <p>
                                                        <b>3 Càng Giải Nhất :</b>
                                                        Chọn một số từ các chữ số hàng trăm, hàng chục và hàng đơn vị để
                                                        tạo thành bộ 3 chữ số để đặt cược. Nếu số bình chọn trùng với 3
                                                        số cuối của giải nhất của kết quả xổ số thì trúng thưởng. Ví dụ
                                                        bạn đặt cược 456 thì 3 số cuối của giải nhất của kết quả xổ số
                                                        là 456 và bạn trúng thưởng.
                                                    </p>
                                                    <p>
                                                        <b>3 Càng Đầu Đuôi:</b>
                                                        Chọn một số từ các chữ số hàng trăm, hàng chục và hàng đơn vị để
                                                        tạo thành bộ 3 chữ số để đặt cược.Nếu số bình chọn trùng với 3
                                                        số cuối của giải đặc biệt và giải sáu của kết quả xổ số thì
                                                        trúng thưởng. Nếu có nhiều hơn một số trúng thưởng, số tiền
                                                        trúng thưởng sẽ được nhân đôi tương ứng. Ví dụ bạn đặt cược vào
                                                        456, nếu 3 vị trí cuối cùng của giải đặc biệt hoặc giải sáu là
                                                        456 thì bạn chiến thắng. Nếu 3 vị trí cuối cùng của giải đặc
                                                        biệt và giải sáu đều là 456 thì giải thưởng được nhân 2.
                                                    </p>
                                                    <h4>6､4Càng</h4>
                                                    <p>
                                                        <b>4 Càng Đặc Biệt :</b>4 Càng Đặc Biệt :Chọn 1 số từ hàng
                                                        nghìn, hàng trăm, hàng chục và hàng đơn vị để tạo thành bộ 4 chữ
                                                        số để đặt cược. Nếu số được bình chọn trùng với 4 số cuối của
                                                        giải đặc biệt của kết quả xổ số thì trúng thưởng. Ví dụ bạn đặt
                                                        cược cho 4567, 4 số cuối của giải đặc biệt trong kết quả xổ số
                                                        là 4567 tức là bạn trúng giải.
                                                    </p>
                                                    <h4>7､Lô Trượt</h4>
                                                    <p>
                                                        <b>Trượt Xiên 4:</b>
                                                        Chọn 4 bộ số tùy ý để đặt cược, Nếu kết quả quay số không trùng
                                                        với tất cả 2 chữ số cuối cùng trong 27 vị trí của kết quả xổ số
                                                        là trúng thưởng. Ví dụ, nếu bạn đặt cược vào 45/55/66/77, nếu
                                                        không có 2 chữ số cuối cùng là 45/55/66/77 trong 27 bộ số thì đó
                                                        là người chiến thắng.
                                                    </p>
                                                    <p>
                                                        <b>Trượt Xiên 8:</b>
                                                        Chọn 8 bộ số để đặt cược theo ý muốn, Nếu kết quả quay số không
                                                        trùng với tất cả 2 chữ số cuối cùng trong 27 vị trí của kết quả
                                                        xổ số là trúng thưởng. Ví dụ, nếu bạn đặt cược vào
                                                        45/55/66/77/88/99/11/22, 27 bộ số không có hai chữ số cuối là
                                                        45/55/66/77/88/99/11/22 sẽ là người chiến thắng.
                                                    </p>
                                                    <p>
                                                        <b>Trượt Xiên 10:</b>
                                                        Chọn ngẫu nhiên 10 bộ số để đặt cược, Nếu kết quả quay số không
                                                        trùng với tất cả 2 chữ số cuối cùng trong 27 vị trí của kết quả
                                                        xổ số là trúng thưởng. Ví dụ, đặt cược
                                                        45/55/66/77/88/99/11/22/33/44, kết quả của 27 bộ số không có 2
                                                        chữ số cuối là 45/55/66/77/88/99/11/22/33/44 thì bạn là người
                                                        chiến thắng.
                                                    </p>
                                                    <h4>8､Chơi hai mặt (hai số cuối cùng trong giải đặc biệt)</h4>
                                                    <p>
                                                        <b>Tài:</b>
                                                        Hai chữ số cuối cùng lớn hơn hoặc bằng 50, là tài.
                                                    </p>
                                                    <p>
                                                        <b>Xỉu:</b>
                                                        Nếu hai chữ số cuối cùng nhỏ hơn hoặc bằng 49, là xỉu.
                                                    </p>
                                                    <p>
                                                        <b>Lẻ:</b>
                                                        Hai chữ số cuối cùng là số lẻ, ví dụ như 01/11/35/47
                                                    </p>
                                                    <p>
                                                        <b>Chẵn:</b>
                                                        Hai chữ số cuối cùng là số chẵn, ví dụ như 18/20/34/42
                                                    </p>
                                                    <h4>9､Tổng giá trị (tổng giá trị hai số cuối giải đặc biệt)</h4>
                                                    <p>
                                                        Giá trị tổng là tổng của hai chữ số cuối của giải đặc biệt cộng
                                                        lại. Giá trị nhỏ nhất là 0 và lớn nhất là 18.
                                                    </p>
                                                    <p>
                                                        <b>Tài:</b>
                                                        Nếu tổng lớn hơn hoặc bằng 10, là tài.
                                                    </p>
                                                    <p>
                                                        <b>Xỉu:</b>
                                                        Nếu tổng nhỏ hơn hoặc bằng 8, là xỉu.
                                                    </p>
                                                    <p>
                                                        <b>Hòa:</b>
                                                        Nếu tổng là 9, nó được coi là hòa và tiền gốc được hoàn trả.
                                                    </p>
                                                    <p>
                                                        <b>Chẵn:</b>
                                                        là tổng của hai chữ số cuối cộng với nhau khi giải đặc biệt được
                                                        trao giải là số chẵn, ví dụ: số được mở ra là 24, 2 + 4 = 6, là
                                                        số chẵn. Nếu 00 được mở ra, nó cũng là một số chẵn.
                                                    </p>
                                                    <p>
                                                        <b>Lẻ:</b>
                                                        có nghĩa là tổng của hai chữ số cộng với nhau khi giải đặc biệt
                                                        được trao là một số lẻ, ví dụ, số được mở là 23, 2 + 3 = 5, là
                                                        một số lẻ.
                                                    </p>
                                                </div>
                                            </div>
                                        </>
                                    ) : tabRight === 'ccmega645' ? (
                                        <>
                                            <div className="header-main-right">
                                                <li onClick={handleTableRight} data-tab="ccsoxo">
                                                    Sổ xố
                                                </li>
                                                <li className="active" onClick={handleTableRight} data-tab="ccmega645">
                                                    Mega 6/45
                                                </li>
                                            </div>
                                            <div className="content-cachchoisx">
                                                <h4>Tuyên bố quan trọng</h4>
                                                <p>
                                                    1.Nếu khách hàng nghi ngờ thông tin của mình bị đánh cắp cần thông
                                                    báo ngay cho công ty và thay đổi dữ liệu chi tiết, tên đăng nhập và
                                                    mật khẩu trước đó đều sẽ không hợp lệ.
                                                </p>
                                                <p>
                                                    2.Khách hàng có trách nhiệm đảm bảo bí mật về tài khoản và thông tin
                                                    đăng nhập của mình. Mọi cá cược trực tuyến được thực hiện bằng tên
                                                    người dùng và mật khẩu sẽ được coi là hợp lệ.
                                                </p>
                                                <p>
                                                    3.Đối với bất kỳ lỗi đánh máy nào hoặc lỗi vô ý của con người trong
                                                    việc thông báo tỷ lệ cược, công ty có quyền sửa lỗi và giải quyết
                                                    đặt cược theo tỷ lệ cược chính xác. Luật nơi bạn cư trú có thể quy
                                                    định rằng chơi game trực tuyến là bất hợp pháp, nếu điều này là
                                                    đúng, công ty sẽ không chấp thuận cho bạn sử dụng thẻ thanh toán để
                                                    giao dịch.
                                                </p>
                                                <p>
                                                    4.Khách hàng nên kiểm tra số dư tài khoản của mình mỗi khi đăng
                                                    nhập. Nếu bạn có bất kỳ câu hỏi nào về số dư, vui lòng thông báo cho
                                                    công ty càng sớm càng tốt.
                                                </p>
                                                <p>5.Một khi cược được chấp nhận, nó không thể bị hủy bỏ.</p>
                                                <p>
                                                    6.Tỷ lệ cược của tất cả các con số sẽ biến động theo thời gian, và
                                                    tỷ lệ cược tại thời điểm thanh toán sẽ dựa trên tỷ lệ cược khi cược
                                                    được xác nhận.
                                                </p>
                                                <p>
                                                    7.Số tiền đặt cược tối đa cho mỗi lần đặt cược thay đổi tùy theo cài
                                                    đặt [thể thao], [mục cá cược] và [tài khoản thành viên] khác nhau.
                                                    Nếu số tiền đặt cược vượt quá cài đặt trên, công ty có quyền hủy bỏ
                                                    số tiền đặt cược vượt quá.
                                                </p>
                                                <p>
                                                    8.Tất cả các cược phải được thực hiện trong thời gian trước khi kết
                                                    quả hòa, nếu không các cược sẽ không hợp lệ.
                                                </p>
                                                <p>9.Tất cả các khoản thanh toán cá cược bao gồm tiền gốc.</p>
                                                <p>
                                                    10.Trang web chính thức:{' '}
                                                    <a href="https://vnlottery.com/" style={{ color: 'red' }}>
                                                        https://vnlottery.com/
                                                    </a>
                                                </p>
                                                <h4>Mega645 mô tả quy tắc</h4>
                                                <p>
                                                    ● Kết quả xổ số của trò chơi này áp dụng hình thức Mega 6/45 là quay
                                                    số ngay lập tức, không giới hạn khoảng thời gian và số lần quay,
                                                    người dùng có thể đặt cược bất cứ lúc nào và nhận ngay kết quả.
                                                </p>
                                                <div>
                                                    <p>Luật chơi cụ thể như sau:</p>
                                                    <h4>1､Số Thường</h4>
                                                    <p>
                                                        <b>Số Thường：</b>
                                                        Chọn một số để đặt cược, Nếu số được bình chọn trùng với bất kỳ
                                                        số nào trong kết quả xổ số thì đó là chiến thắng. Ví dụ, bạn đặt
                                                        cược vào 45, nếu có 45 trong kết quả xổ số thì chiến thắng.
                                                    </p>
                                                    <h4>2､Nhiều Số</h4>
                                                    <p>
                                                        <b>Trúng 4 số：</b>
                                                        Chọn 4 số tùy ý để đặt cược, Nếu số được bình chọn trùng với bất
                                                        kỳ số nào trong 4 số trong kết quả xổ số thì đó là chiến thắng.
                                                        Ví dụ: nếu bạn đặt cược vào 14/21/24/45 và kết quả là
                                                        14/21/24/45 /, thì chiến thắng
                                                    </p>
                                                    <p>
                                                        <b>Trúng 3 số：</b>
                                                        Chọn 3 số tùy ý để đặt cược, Nếu số được bình chọn trùng với 3
                                                        số bất kỳ trong kết quả xổ số thì đó là chiến thắng. Ví dụ, nếu
                                                        bạn đặt cược vào 14/21/24 và kết quả là 14/21/24, thì chiến
                                                        thắng.
                                                    </p>
                                                    <p>
                                                        <b>3 trúng 2：</b>
                                                        Chọn 3 con số tùy ý để đặt cược, Nếu số được bình chọn trùng với
                                                        3 số bất kỳ trong kết quả xổ số, thì đó là chiến thắng và tỷ lệ
                                                        cược là 3 được tính. Nếu không có 3 số, 2 số sẽ được giải quyết
                                                        với tỷ lệ cược là 2. Ví dụ, nếu bạn đặt cược vào 14/21/24, nếu
                                                        kết quả là 14/21/24, nó sẽ được giải quyết theo tỷ lệ cược là 3.
                                                        Nếu kết quả hòa là 14/21, sẽ được giải quyết theo tỷ lệ 2.
                                                    </p>
                                                    <p>
                                                        <b>Trúng 2 số：</b>
                                                        Chọn 2 số tùy ý để đặt cược, Nếu số được bình chọn trùng với 2
                                                        số bất kỳ trong kết quả xổ số thì đó là chiến thắng. Ví dụ bạn
                                                        đặt cược vào 14/21, nếu kết quả là 14/21 thì chiến thắng.
                                                    </p>
                                                    <h4>3､Lô trượt</h4>
                                                    <p>
                                                        <b>Trượt xiên 5：</b>
                                                        Chọn 5 số tùy ý để đặt cược, Nếu số được bình chọn không trùng
                                                        với bất kỳ số nào trong kết quả xổ số thì đó là chiến thắng. Ví
                                                        dụ bạn đặt cược vào 14/07/21/24/45, nếu kết quả xổ số không ra
                                                        14/07/21/24/45 thì đó là thắng.
                                                    </p>
                                                    <p>
                                                        <b>Trượt xiên 6：</b>
                                                        Chọn 6 số tùy ý để đặt cược, Nếu số được bình chọn không trùng
                                                        với bất kỳ số nào trong kết quả xổ số thì đó là chiến thắng. Ví
                                                        dụ bạn đặt cược vào 03/07/14/21/24/45, nếu kết quả xổ số không
                                                        ra 03/07/14/21/24/45 thì chiến thắng.
                                                    </p>
                                                    <p>
                                                        <b>Trượt xiên 7：</b>
                                                        Chọn 7 con số tùy ý để đặt cược, Nếu số được bình chọn không
                                                        trùng với bất kỳ số nào trong kết quả xổ số thì đó là chiến
                                                        thắng. Ví dụ, nếu bạn đặt cược vào 03/07/14/21/24/33/45, nếu kết
                                                        quả xổ số không được quay vào 03/07/14/21/24/33/45, bạn sẽ chiến
                                                        thắng
                                                    </p>
                                                    <p>
                                                        <b>Trượt xiên 8：</b>
                                                        Chọn 8 số tùy ý để đặt cược, Nếu số được bình chọn không trùng
                                                        với bất kỳ số nào trong kết quả xổ số thì đó là chiến thắng. Ví
                                                        dụ, nếu bạn đặt cược vào 03/07/14/21/24/33/39/45, nếu kết quả xổ
                                                        số không ra 03/07/14/21/24/33/39/45 thì chiến thắng.
                                                    </p>
                                                    <p>
                                                        <b>Trượt xiên 9：</b>
                                                        Chọn 9 con số tùy ý để đặt cược, Nếu số được bình chọn không
                                                        trùng với bất kỳ số nào trong kết quả xổ số thì đó là chiến
                                                        thắng. Ví dụ: nếu bạn đặt cược vào 03/07/14/21/24/33/39/42/45,
                                                        nếu kết quả xổ số không hiển thị 03/07/14/21/24/33/39/42/45, thì
                                                        chiến thắng.
                                                    </p>
                                                    <p>
                                                        <b>Trượt xiên 10：</b>
                                                        Chọn 9 con số tùy ý để đặt cược, Nếu số được bình chọn không
                                                        trùng với bất kỳ số nào trong kết quả xổ số thì đó là chiến
                                                        thắng. Ví dụ: nếu bạn đặt cược vào
                                                        03/07/14/21/24/33/39/42/44/45, nếu kết quả xổ số không quay vào
                                                        03/07/14/21/24/33/39/42/44/45, bạn sẽ thắng .
                                                    </p>
                                                    <h4>4､Chọn 1</h4>
                                                    <p>
                                                        <b>Chọn 5 ăn 1：</b>
                                                        Chọn 5 số tùy ý để đặt cược, Nếu chỉ có một con số trùng với con
                                                        số trong kết quả xổ số thì đó là chiến thắng. Ví dụ, nếu bạn đặt
                                                        cược vào 14/07/21/24/45, nếu kết quả chỉ có 45 trong 5 số, thì
                                                        đó là người chiến thắng.
                                                    </p>
                                                    <p>
                                                        <b>Chọn 6 ăn 1：</b>
                                                        Chọn 6 số tùy ý để đặt cược, Nếu chỉ có một con số trùng với con
                                                        số trong kết quả xổ số thì đó là chiến thắng. Ví dụ, nếu bạn đặt
                                                        cược vào 03/07/14/21/24/45, nếu kết quả chỉ có 45 trong 6 số thì
                                                        chiến thắng.
                                                    </p>
                                                    <p>
                                                        <b>Chọn 7 ăn 1：</b>
                                                        Chọn 7 con số tùy ý để đặt cược, Nếu chỉ có một con số trùng với
                                                        con số trong kết quả xổ số thì đó là chiến thắng. Ví dụ, nếu bạn
                                                        đặt cược vào 03/07/14/21/24/33/45, nếu kết quả chỉ có 45 trong 7
                                                        số, thì chiến thắng.
                                                    </p>
                                                    <p>
                                                        <b>Chọn 8 ăn 1：</b>
                                                        Chọn 8 số tùy ý để đặt cược, Nếu chỉ có một con số trùng với con
                                                        số trong kết quả xổ số thì đó là chiến thắng. Ví dụ, nếu bạn đặt
                                                        cược vào 03/07/14/21/24/33/39/45, nếu kết quả chỉ có 45 trong 8
                                                        số thì chiến thắng.
                                                    </p>
                                                    <p>
                                                        <b>Chọn 9 ăn 1：</b>
                                                        Chọn 9 con số tùy ý để đặt cược, Nếu chỉ có một con số trùng với
                                                        con số trong kết quả xổ số thì đó là chiến thắng. Ví dụ, nếu bạn
                                                        đặt cược vào 03/07/14/21/24/33/39/42/45, nếu kết quả chỉ có 45
                                                        trong số 9 số, thì chiến thắng.
                                                    </p>
                                                    <p>
                                                        <b>Chọn 10 ăn 1：</b>
                                                        Chọn ngẫu nhiên 10 số để đặt cược, Nếu chỉ có một con số trùng
                                                        với con số trong kết quả xổ số thì đó là chiến thắng. Ví dụ, nếu
                                                        bạn đặt cược vào 03/07/14/21/24/33/39/42/44/45, nếu kết quả chỉ
                                                        có 45 trên 10 số, thì chiến thắng.
                                                    </p>
                                                </div>
                                            </div>
                                        </>
                                    ) : tabRight === 'lsc' ? (
                                        <>
                                            <div className="header-main-right">
                                                <li className="active" onClick={handleTableRight} data-tab="lsc">
                                                    Toàn Bộ
                                                </li>
                                            </div>
                                            <div className="table-box-profile mx-1 border-l border-r border-gray-200">
                                                <div
                                                    style={{ backgroundColor: '#e7f0fc' }}
                                                    className="py-2 flex text-xs items-center font-thin border-t border-b border-gray-200"
                                                >
                                                    <div style={{ width: '15%' }} className="text-center">
                                                        Thời gian
                                                    </div>
                                                    <div style={{ width: '20%' }} className="text-center">
                                                        Game
                                                    </div>
                                                    <div style={{ width: '15%' }} className="text-center">
                                                        Số tiền
                                                    </div>
                                                    <div style={{ width: '20%' }} className="text-center">
                                                        Nôi dung cược
                                                    </div>
                                                    <div style={{ width: '15%' }} className="text-center">
                                                        Thắng / Thua
                                                    </div>
                                                    <div style={{ width: '15%' }} className="text-center">
                                                        Trạng thái
                                                    </div>
                                                </div>
                                                <div className="table-height border-b border-gray-200 flex">
                                                    <div className="flex-1 overflow-y-auto bet-scroll class-display-scoll">
                                                        {history.map((value, index) => (
                                                            <ul
                                                                key={index}
                                                                className="flex items-center text-xs font-thin py-2 hover:bg-gray-200"
                                                            >
                                                                <li style={{ width: '15%' }} className="text-center">
                                                                    {value.created_at}
                                                                </li>
                                                                <li style={{ width: '20%' }} className="text-center">
                                                                    {value.category}
                                                                </li>
                                                                <li style={{ width: '15%' }} className="text-center">
                                                                    {Intl.NumberFormat().format(value.money)}
                                                                </li>
                                                                <li
                                                                    style={{ width: '20%', overflow: 'auto' }}
                                                                    className="text-center"
                                                                >
                                                                    {value.infor_bet}
                                                                </li>
                                                                <li style={{ width: '15%' }} className="text-center">
                                                                    {value.thangthua}
                                                                </li>
                                                                <li style={{ width: '15%' }} className="text-center">
                                                                    {value.status === '0' ? 'Đã xử lý' : 'Chưa xử lý'}
                                                                </li>
                                                            </ul>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div className="pagination">
                                                    <button className="page" onClick={() => fetch(page.first_page_url)}>
                                                        {' '}
                                                        Trang đầu{' '}
                                                    </button>
                                                    {page.prev_page_url !== null && page.prev_page_url ? (
                                                        <button
                                                            className="page"
                                                            onClick={() => fetch(page.prev_page_url)}
                                                        >
                                                            {' '}
                                                            &laquo;{' '}
                                                        </button>
                                                    ) : (
                                                        <button className="page disable"> &laquo; </button>
                                                    )}

                                                    <button className="page active">{page.current_page}</button>
                                                    {page.next_page_url !== null && page.next_page_url ? (
                                                        <button
                                                            className="page"
                                                            onClick={() => fetch(page.next_page_url)}
                                                        >
                                                            {' '}
                                                            &raquo;{' '}
                                                        </button>
                                                    ) : (
                                                        <button className="page disable"> &raquo; </button>
                                                    )}

                                                    <button className="page" onClick={() => fetch(page.last_page_url)}>
                                                        {' '}
                                                        Trang cuối{' '}
                                                    </button>
                                                </div>
                                            </div>
                                        </>
                                    ) : tabRight === 'rt' ? (
                                        <>
                                            <div className="header-main-right">
                                                <li onClick={handleTableRight} data-tab="rt" className="active">
                                                    Rút tiền
                                                </li>
                                                <li onClick={handleTableRight} data-tab="hsrt">
                                                    Lịch sử rút tiền
                                                </li>
                                            </div>
                                            <div className="form-ruttien">
                                                <p>Thông tin rút tiền: </p>
                                                <hr />
                                                <form>
                                                    <div className="inputRutTien">
                                                        <span>Số tài khoản rút tiền: </span>
                                                        <input
                                                            type="text"
                                                            name="inputStkRutTien1"
                                                            id="input-4-4-1"
                                                            onChange={(e) => setSoTkR(e.target.value)}
                                                            placeholder="Nhập số tài khoản"
                                                        />
                                                    </div>
                                                    <div className="inputRutTien">
                                                        <span>Tên chủ tài khoản rút tiền: </span>
                                                        <input
                                                            type="text"
                                                            name="inputStkRutTien2"
                                                            id="input-4-4-2"
                                                            onChange={(e) => setChuTkR(e.target.value)}
                                                            placeholder="Nhập chủ tài khoản"
                                                        />
                                                    </div>
                                                    <div className="inputRutTien">
                                                        <span>Ngân hàng: </span>
                                                        <input
                                                            type="text"
                                                            name="inputStkRutTien3"
                                                            id="input-4-4-3"
                                                            onChange={(e) => setBankRut(e.target.value)}
                                                            placeholder="Nhập tên ngân hàng"
                                                        />
                                                    </div>
                                                    <div className="inputRutTien">
                                                        <span>Số tiền muốn rút: </span>
                                                        <input
                                                            type="text"
                                                            name="inputStkRutTien4"
                                                            id="input-4-4-4"
                                                            onChange={(e) =>
                                                                setMoneyR(
                                                                    e.target.value.replaceAll(
                                                                        /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/\D]/gi,
                                                                        '',
                                                                    ),
                                                                )
                                                            }
                                                            placeholder="Nhập số tiền muốn rút"
                                                            value={
                                                                moneyRut > 0 ? Intl.NumberFormat().format(moneyRut) : ''
                                                            }
                                                        />
                                                    </div>
                                                </form>
                                                <hr />
                                                <div className="group-buttom-post-form-rut-tien">
                                                    <button className="huy-rut">Huỷ bỏ rút tiền</button>
                                                    <button onClick={handleClickXNrt}>Xác nhận rút tiền</button>
                                                </div>
                                            </div>
                                        </>
                                    ) : tabRight === 'hsrt' ? (
                                        <>
                                            <div className="header-main-right">
                                                <li onClick={handleTableRight} data-tab="rt">
                                                    Rút tiền
                                                </li>
                                                <li onClick={handleTableRight} data-tab="hsrt" className="active">
                                                    Lịch sử rút tiền
                                                </li>
                                            </div>
                                            <div className="table-box-profile mx-1 border-l border-r border-gray-200">
                                                <div
                                                    style={{ backgroundColor: '#e7f0fc' }}
                                                    className="py-2 flex text-xs items-center font-thin border-t border-b border-gray-200"
                                                >
                                                    <div style={{ width: '15%' }} className="text-center">
                                                        Thời gian
                                                    </div>
                                                    <div style={{ width: '20%' }} className="text-center">
                                                        Phương thức
                                                    </div>
                                                    <div style={{ width: '15%' }} className="text-center">
                                                        Số tiền
                                                    </div>
                                                    <div style={{ width: '20%' }} className="text-center">
                                                        Ngân hàng
                                                    </div>
                                                    <div style={{ width: '15%' }} className="text-center">
                                                        Số tài khoản
                                                    </div>
                                                    <div style={{ width: '15%' }} className="text-center">
                                                        Trạng thái
                                                    </div>
                                                </div>
                                                <div className="table-height border-b border-gray-200 flex">
                                                    <div className="flex-1 overflow-y-auto bet-scroll">
                                                        {history.map((value, index) => (
                                                            <ul
                                                                key={index}
                                                                className="flex items-center text-xs font-thin py-2 hover:bg-gray-200"
                                                            >
                                                                <li style={{ width: '15%' }} className="text-center">
                                                                    {value.created_at}
                                                                </li>
                                                                <li style={{ width: '20%' }} className="text-center">
                                                                    {value.type}
                                                                </li>
                                                                <li style={{ width: '15%' }} className="text-center">
                                                                    {Intl.NumberFormat().format(value.money)}
                                                                </li>
                                                                <li style={{ width: '20%' }} className="text-center">
                                                                    {value.banker}
                                                                </li>
                                                                <li style={{ width: '15%' }} className="text-center">
                                                                    {value.bank_id}
                                                                </li>
                                                                <li style={{ width: '15%' }} className="text-center">
                                                                    {value.status === 1 ? (
                                                                        <span style={{ color: 'green' }}>Đã xử lý</span>
                                                                    ) : (
                                                                        <span style={{ color: 'red' }}>Chưa xử lý</span>
                                                                    )}
                                                                </li>
                                                            </ul>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div className="pagination">
                                                    <button
                                                        className="page"
                                                        onClick={() => fetch_history_payments(page.first_page_url)}
                                                    >
                                                        {' '}
                                                        Trang đầu{' '}
                                                    </button>
                                                    {page.prev_page_url !== null && page.prev_page_url ? (
                                                        <button
                                                            className="page"
                                                            onClick={() => fetch_history_payments(page.prev_page_url)}
                                                        >
                                                            {' '}
                                                            &laquo;{' '}
                                                        </button>
                                                    ) : (
                                                        <button className="page disable"> &laquo; </button>
                                                    )}

                                                    <button className="page active">{page.current_page}</button>
                                                    {page.next_page_url !== null && page.next_page_url ? (
                                                        <button
                                                            className="page"
                                                            onClick={() => fetch_history_payments(page.next_page_url)}
                                                        >
                                                            {' '}
                                                            &raquo;{' '}
                                                        </button>
                                                    ) : (
                                                        <button className="page disable"> &raquo; </button>
                                                    )}

                                                    <button
                                                        className="page"
                                                        onClick={() => fetch_history_payments(page.last_page_url)}
                                                    >
                                                        {' '}
                                                        Trang cuối{' '}
                                                    </button>
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <></>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
