import Image from '~/components/Image';
import './Header.scss';
import logo from '~/assets/images/logo-vn179.png';
import Clock from '~/components/Clock';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { getInfoUser, loginUser, logoutUser } from '~/Redux/apiRequest';
import { useDispatch, useSelector } from 'react-redux';
import { createAxios } from '../../../createInstance';
import { useEffect } from 'react';
import { function_loadding_create, function_loadding_delete } from '~/components/Loadding/Loadding';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import notification_new from '~/assets/images/navbg1.png';

function Header() {
    const user = useSelector((state) => state.auth.login.currentUser);
    const infoUser = useSelector((state) => state.auth.info?.infoUser);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const axiosJWT = createAxios(user, dispatch);
    const [menuB, setMenuB] = useState(false);
    const [formLogin, setFormLogin] = useState(false);

    useEffect(() => {
        getInfoUser(user, dispatch, axiosJWT);
    }, []);

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
                }, 6000);
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

    const handleLogin = async (e) => {
        e.preventDefault();
        await function_loadding_create();
        if (username === '' || password === '') {
            await function_loadding_delete();
            return notification('error', 'Vui lòng nhập đầy đủ tài khoản và mật khẩu !');
        }
        const data = {
            username: username,
            password: password,
        };
        const log = await loginUser(data, dispatch, navigate);
        await function_loadding_delete();
        if (log === 200) {
            const loginForm = document.querySelector('.container-login-mobile');
            loginForm.style.display = 'none';
            setFormLogin(false);
            return notification('success', 'Đăng nhập thành công');
        } else {
            return notification('error', 'Đăng nhập không thành công !! Vui lòng kiểm tra lại');
        }
    };
    const handleLogout = async () => {
        await function_loadding_create();
        await logoutUser(user, dispatch, navigate, axiosJWT);
        await function_loadding_delete();
        return notification('success', 'Đăng xuất thành công');
    };
    const handleMenu = () => {
        const menu = document.querySelector('.menu-hover-wagger21');
        if (menuB === false) {
            menu.style.display = 'block';
            setMenuB(true);
        } else {
            menu.style.display = 'none';
            setMenuB(false);
        }
    };
    const handleNoneFormLogin = () => {
        const loginForm = document.querySelector('.container-login-mobile');
        loginForm.style.display = 'none';
        setFormLogin(false);
    };
    const handleOpenLoginForm = (e) => {
        e.preventDefault();
        const loginForm = document.querySelector('.container-login-mobile');
        if (formLogin === false) {
            loginForm.style.display = 'flex';
            setFormLogin(true);
        } else {
            loginForm.style.display = 'none';
            setFormLogin(false);
        }
    };
    const handleOpenLoginFormN = (e) => {
        e.preventDefault();
        const loginForm = document.querySelector('.container-login-mobile');
        const menu = document.querySelector('.menu-hover-wagger21');
        if (formLogin === false) {
            loginForm.style.display = 'flex';
            menu.style.display = 'none';
            setFormLogin(true);
        } else {
            loginForm.style.display = 'none';
            menu.style.display = 'none';
            setFormLogin(false);
        }
    };
    return (
        <header className="fixed top-0 left-0 right-0 z-10 ">
            <div className="header-container">
                <div style={{ borderBottom: '1px solid #126691' }} className="bg h-24">
                    <div className="max-w-screen-2xl 2xl:m-auto xl:max-w-screen-xl xl:m-auto h-full">
                        <div className="flex items-center h-full">
                            <div className="grid grid-cols-6 h-full menu-top">
                                <div className="col-span-1 class-logo-display">
                                    <Link className="link-logo" to="/">
                                        <Image src={logo} alt="Logo" />
                                    </Link>
                                </div>

                                <div className="col-span-5 class-display-flex-menu">
                                    <ul
                                        style={{ fontSize: '11px' }}
                                        className="h-full text-white uppercase flex justify-start space-x-10 ml-10 menu-for-mobile"
                                    >
                                        <li className="filter-li h-full flex flex-col items-center justify-center space-y-1 menu-mobile">
                                            <FontAwesomeIcon onClick={handleMenu} icon={faBars} className="icon-menu" />
                                            <span onClick={handleMenu}>Menu</span>
                                            <div className="menu-hover-wagger21">
                                                {!user ? (
                                                    <ul>
                                                        <li>
                                                            <a href="/">Trang chủ</a>
                                                        </li>
                                                        <li>
                                                            <a href="http://fb.com">Liên hệ hỗ trợ</a>{' '}
                                                        </li>
                                                        <li>
                                                            <a href="/game/mien-bac">Xổ số miền bắc</a>
                                                        </li>
                                                        <li>
                                                            <a href="/phao">Hoàn trả</a>
                                                        </li>
                                                        <li
                                                            onClick={handleOpenLoginFormN}
                                                            style={{ marginTop: '20px' }}
                                                            className="logoutbuttonmenu"
                                                        >
                                                            Đăng nhập
                                                        </li>
                                                        <li className="logoutbuttonmenu">
                                                            <a href="/register">Đăng ký</a>{' '}
                                                        </li>
                                                    </ul>
                                                ) : (
                                                    <ul>
                                                        <li>
                                                            <a href="/">Trang chủ</a>
                                                        </li>
                                                        <li>
                                                            <a href="http://fb.com">Liên hệ hỗ trợ</a>{' '}
                                                        </li>
                                                        <li>
                                                            <a href="/game/mien-bac">Xổ số miền bắc</a>
                                                        </li>
                                                        <li>
                                                            <a href="/phao">Hoàn trả</a>
                                                        </li>
                                                        <li>
                                                            <a href="/profile-v2/nap-tien"> Nạp tiền </a>
                                                        </li>
                                                        <li>
                                                            {' '}
                                                            <a href="/profile-v2/rut-tien">Rút tiền </a>
                                                        </li>
                                                        <li>
                                                            {' '}
                                                            <a href="/profile-v2/lich-su-dat-cuoc"> Lịch sử cược </a>
                                                        </li>
                                                        <li className="sodutk">
                                                            <Link to="/profile">
                                                                {' '}
                                                                Số dư: {Intl.NumberFormat().format(
                                                                    infoUser?.money,
                                                                )} vnđ{' '}
                                                            </Link>
                                                        </li>
                                                        <li className="logoutbuttonmenu" onClick={handleLogout}>
                                                            Đăng xuất
                                                        </li>
                                                    </ul>
                                                )}
                                            </div>
                                        </li>
                                    </ul>

                                    <ul
                                        style={{ fontSize: '11px' }}
                                        className="h-full text-white uppercase flex justify-start space-x-10 ml-10 menu-for-pc"
                                    >
                                        <Link to="/">
                                            <li className="filter-li h-full flex flex-col items-center justify-center space-y-1">
                                                <span className="tc block w-7 h-7 "></span>
                                                <span>Trang chủ</span>
                                            </li>
                                        </Link>

                                        <li className="hover-item filter-li h-full flex flex-col items-center justify-center space-y-1">
                                            <div
                                                style={{ height: '190px' }}
                                                className="layer absolute z-50 w-24 bg-transparent top-24"
                                            ></div>
                                            <span className="xs block w-7 h-7 " style={{ marginTop: '0px' }}></span>
                                            <span>Trò chơi xổ số</span>
                                            <div className="hover-wrapper">
                                                <div className="max-w-screen-2xl 2xl:m-auto xl:max-w-screen-xl xl:m-auto h-full">
                                                    <ul className="grid grid-cols-6 pt-4 normal-case text-base">
                                                        <li className="col-span-1 flex flex-col px-4">
                                                            <div className="flex justify-between mb-4">
                                                                <h5 className="font-extrabold text-orange-500">
                                                                    Miền Bắc
                                                                </h5>
                                                                <select className="text-xs" name="" id="">
                                                                    <option value="">Toàn bộ</option>
                                                                    <option value="">Chủ nhật</option>
                                                                    <option value="">Thứ hai</option>
                                                                    <option value="">Thứ ba</option>
                                                                    <option value="">Thứ tư</option>
                                                                    <option value="">Thứ năm</option>
                                                                    <option value="">Thứ sáu</option>
                                                                    <option value="">Thứ bảy</option>
                                                                </select>
                                                            </div>
                                                            <div className="flex flex-col space-y-1 font-light text-sm">
                                                                <Link to="/game/mien-bac">
                                                                    <h6 className="day-select">Miền Bắc</h6>
                                                                </Link>
                                                                <Link to="/game/ha-noi">
                                                                    <h6 className="day-select">Hà Nội</h6>
                                                                </Link>
                                                            </div>
                                                        </li>
                                                        <li className="col-span-1 border-l border-slate-600 px-4">
                                                            <div className="flex justify-between mb-4">
                                                                <h5 className="font-extrabold text-orange-500">
                                                                    Xổ số VIP
                                                                </h5>
                                                            </div>
                                                            <div className="flex flex-col space-y-1 font-light text-sm">
                                                                <Link to="/game/ha-noi-vip">
                                                                    <h6 className="day-select">Hà Nội VIP</h6>
                                                                </Link>
                                                                <Link to="/game/ho-chi-minh-vip">
                                                                    <h6 className="day-select">Hồ Chí Minh VIP</h6>
                                                                </Link>
                                                            </div>
                                                        </li>
                                                        <li className="col-span-1 border-l border-slate-600 px-4">
                                                            <div className="flex justify-between mb-4">
                                                                <h5 className="font-extrabold text-orange-500">
                                                                    Siêu tốc
                                                                </h5>
                                                            </div>
                                                            <div className="flex flex-col space-y-1 font-light text-sm">
                                                                <Link to="/game/sieu-toc-45-giay">
                                                                    <h6 className="day-select">Siêu Tốc 45 Giây</h6>
                                                                </Link>
                                                                <Link to="/game/sieu-toc-1-phut">
                                                                    <h6 className="day-select">Siêu Tốc 1 Phút</h6>
                                                                </Link>
                                                                <Link to="/game/sieu-toc-90-giay">
                                                                    <h6 className="day-select">Siêu Tốc 1.5 Phút</h6>
                                                                </Link>
                                                                <Link to="/game/sieu-toc-2-phut">
                                                                    <h6 className="day-select">Siêu Tốc 2 Phút</h6>
                                                                </Link>
                                                                <Link to="/game/sieu-toc-5-phut">
                                                                    <h6 className="day-select">Siêu Tốc 5 Phút</h6>
                                                                </Link>
                                                                <Link to="/game/mien-bac-75-giay">
                                                                    <h6 className="day-select">M.Bắc 75 Giây</h6>
                                                                </Link>
                                                                <Link to="/game/mien-nam-sieu-toc-45-giay">
                                                                    <h6 className="day-select">
                                                                        M.Nam Siêu tốc 45 Giây
                                                                    </h6>
                                                                </Link>
                                                                <Link to="/game/mien-trung-75-giay">
                                                                    <h6 className="day-select">M.Trung 75 Giây</h6>
                                                                </Link>
                                                            </div>
                                                        </li>
                                                        <li className="col-span-1 border-l border-slate-600 px-4">
                                                            <div className="flex justify-between mb-4">
                                                                <h5 className="font-extrabold text-orange-500">
                                                                    Mega 6/45
                                                                </h5>
                                                            </div>
                                                            <div className="flex flex-col space-y-1 font-light text-sm">
                                                                <Link to="/game/mega-645-1-phut">
                                                                    <h6 className="day-select">Mega 6/45 1 Phút</h6>
                                                                </Link>
                                                            </div>
                                                        </li>
                                                        <li className="col-span-1 border-l border-slate-600 px-4">
                                                            <div className="flex justify-between mb-4">
                                                                <h5 className="font-extrabold text-orange-500">
                                                                    Miền Nam
                                                                </h5>
                                                                <select className="text-xs" name="" id="">
                                                                    <option value="">Toàn bộ</option>
                                                                    <option value="">Chủ nhật</option>
                                                                    <option value="">Thứ hai</option>
                                                                    <option value="">Thứ ba</option>
                                                                    <option value="">Thứ tư</option>
                                                                    <option value="">Thứ năm</option>
                                                                    <option value="">Thứ sáu</option>
                                                                    <option value="">Thứ bảy</option>
                                                                </select>
                                                            </div>
                                                            <div className="flex flex-col space-y-1 font-light text-sm">
                                                                <Link to="/game/can-tho">
                                                                    <h6 className="day-select">Cần Thơ</h6>
                                                                </Link>
                                                                <Link to="/game/can-tho">
                                                                    <h6 className="day-select">Sóc Trăng</h6>
                                                                </Link>
                                                                <Link to="/game/dong-nai">
                                                                    <h6 className="day-select">Đồng Nai</h6>
                                                                </Link>
                                                            </div>
                                                        </li>
                                                        <li className="col-span-1 border-l border-slate-600 px-4">
                                                            <div className="flex justify-between mb-4">
                                                                <h5 className="font-extrabold text-orange-500">
                                                                    Miền Trung
                                                                </h5>
                                                                <select className="text-xs" name="" id="">
                                                                    <option value="">Toàn bộ</option>
                                                                    <option value="">Chủ nhật</option>
                                                                    <option value="">Thứ hai</option>
                                                                    <option value="">Thứ ba</option>
                                                                    <option value="">Thứ tư</option>
                                                                    <option value="">Thứ năm</option>
                                                                    <option value="">Thứ sáu</option>
                                                                    <option value="">Thứ bảy</option>
                                                                </select>
                                                            </div>
                                                            <div className="flex flex-col space-y-1 font-light text-sm">
                                                                <Link to="/game/da-nang">
                                                                    <h6 className="day-select">Đà Nẵng</h6>
                                                                </Link>
                                                                <Link to="/game/khanh-hoa">
                                                                    <h6 className="day-select">Khánh Hòa</h6>
                                                                </Link>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </li>

                                        <a href="fb.com">
                                            <li className="filter-li h-full flex flex-col items-center justify-center space-y-1">
                                                <span className="chat block w-7 h-7 "></span>
                                                <span>Liên hệ hỗ trợ</span>
                                            </li>
                                        </a>
                                        <a href="/phao">
                                            <li className="filter-li h-full flex flex-col items-center justify-center space-y-1">
                                                <span className="hoanTra block w-7 h-7 ">
                                                    <span className="hot"></span>
                                                </span>
                                                <span>Hoàn trả</span>
                                            </li>
                                        </a>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{ backgroundColor: '#092648' }} className="h-20 h-display-none">
                    <div className="max-w-screen-2xl 2xl:m-auto xl:max-w-screen-xl xl:m-auto h-full">
                        <div className="h-full">
                            <ul style={{ color: '#faf8a1' }} className="text-xs h-full flex justify-between">
                                <li className="h-full flex flex-col justify-evenly">
                                    <a href="/about" className="flex items-center space-x-3">
                                        <h4 className="flex items-center space-x-2">
                                            <Image src="https://hr681.com/home/img/common/icon-brand.png" alt="About" />
                                            <span>Nhãn hiệu</span>
                                        </h4>
                                        <h4 className="text-white">Giới thiệu</h4>
                                    </a>
                                    <a href="/download" className="flex items-center space-x-3">
                                        <h4 className="flex items-center space-x-2">
                                            <Image
                                                src="https://hr681.com/home/img/common/icon-download.png"
                                                alt="Download"
                                            />
                                            <span>Tải xuống</span>
                                        </h4>
                                        <h4 className="text-white">Ứng dụng di động</h4>
                                    </a>
                                </li>
                                <li
                                    style={{ backgroundColor: '#126691' }}
                                    className="w-px h-10 relative top-1/2 -translate-y-1/2"
                                ></li>
                                <li className="h-full flex flex-col justify-evenly">
                                    <a href="/about" className="flex items-center space-x-3">
                                        <h4 className="flex items-center space-x-2">
                                            <Image src="https://hr681.com/home/img/common/icon-work.png" alt="Work" />
                                            <span>Hợp tác</span>
                                        </h4>
                                        <h4 className="text-white">Đại lý</h4>
                                    </a>
                                    <a href="/download" className="flex items-center space-x-3">
                                        <h4 className="flex items-center space-x-2">
                                            <Image
                                                src="https://hr681.com/home/img/common/icon-cphot.png"
                                                alt="Popular"
                                            />
                                            <span>Phổ biến</span>
                                        </h4>
                                        <h4 className="text-white">Trò chơi xổ số</h4>
                                    </a>
                                </li>
                                <li
                                    style={{ backgroundColor: '#126691' }}
                                    className="w-px h-10 relative top-1/2 -translate-y-1/2"
                                ></li>
                                <li className="h-full flex flex-col justify-evenly">
                                    <a href="/about" className="flex items-center space-x-3">
                                        <h4 className="flex items-center space-x-2">
                                            <Image src="https://hr681.com/home/img/common/icon-web.png" alt="Network" />
                                            <span>Trang mạng</span>
                                        </h4>
                                        <h4 className="text-white">Link dự phòng</h4>
                                    </a>
                                    <a href="/download" className="flex items-center space-x-3">
                                        <h4 className="flex items-center space-x-2">
                                            <Image
                                                src="https://hr681.com/home/img/common/icon-navServicer.png"
                                                alt="Service"
                                            />
                                            <span>Dịch vụ</span>
                                        </h4>
                                        <h4 className="text-white">Dịch vụ trực tuyến</h4>
                                    </a>
                                </li>
                                <li
                                    style={{ backgroundColor: '#126691' }}
                                    className="w-px h-10 relative top-1/2 -translate-y-1/2"
                                ></li>
                                <li className="h-full flex flex-col justify-evenly">
                                    <a href="/about" className="flex items-center space-x-3">
                                        <h4 className="flex items-center space-x-2">
                                            <Image
                                                src="https://hr681.com/home/img/common/icon-live2.png"
                                                alt="Unique"
                                            />
                                            <span>Độc quyền</span>
                                        </h4>
                                        <h4 className="text-white">Xổ số trực tiếp</h4>
                                    </a>
                                    <a href="/download" className="flex items-center space-x-3">
                                        <h4 className="flex items-center space-x-2">
                                            <Image src="https://hr681.com/home/img/common/icon-new.png" alt="Support" />
                                            <span>Tài trợ</span>
                                        </h4>
                                        <h4 className="text-white">Tài trợ thể thao</h4>
                                    </a>
                                </li>
                                <li
                                    style={{ backgroundColor: '#126691' }}
                                    className="w-px h-10 relative top-1/2 -translate-y-1/2"
                                ></li>
                                <li className="h-full flex flex-col justify-evenly">
                                    <div href="/about" className="flex items-center space-x-3">
                                        <h4 className="flex items-center space-x-2">Giờ Hà Nội</h4>
                                        <Clock />
                                    </div>
                                    <div href="/download" className="flex items-center space-x-3">
                                        <h4 className="flex items-center space-x-2">
                                            <span>Người dùng trực tuyến</span>
                                            <Image
                                                src="https://hr681.com/home/img/common/online-re.png"
                                                alt="users"
                                                className="hover:cursor-pointer"
                                            />
                                        </h4>
                                        <h4 className="text-white space-x-2">
                                            <span className="online">1</span>
                                            <span className="online">3</span>
                                            <span className="online">4</span>
                                            <span className="online">2</span>
                                            <span className="online">7</span>
                                            <span className="online">5</span>
                                        </h4>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div style={{ backgroundColor: '#2161b4' }} className="h-12 box-form-header">
                    <div className="max-w-screen-2xl 2xl:m-auto xl:max-w-screen-xl xl:m-auto h-full header-screen-pc">
                        {!user ? (
                            <form onSubmit={handleLogin} className="h-full flex items-center justify-around mx-20">
                                <div className="flex space-x-1 text-xs items-center px-2 border border-solid border-white">
                                    <span className="user w-6 h-6 block"></span>
                                    <input
                                        type="text"
                                        placeholder="Số tài khoản"
                                        onChange={(e) => setUsername(e.target.value)}
                                        className="input"
                                    />
                                </div>
                                <div className="flex space-x-1 text-xs items-center px-2 border border-solid border-white">
                                    <span className="pw w-6 h-6 block"></span>
                                    <input
                                        type="password"
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Mật khẩu"
                                        className="input"
                                    />
                                </div>
                                {/* <div className="flex space-x-1 text-xs items-center px-2 border border-solid border-white">
                                    <span className="confirm w-6 h-6 block"></span>
                                    <input type="text" placeholder="Mã xác nhận" className="input" />
                                    <Image
                                 src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAUCAIAAABeYcl+AAABoklEQVR42q2XvW3DMBCFbxAvkMaFgZQZIR4hU7jzSCnTZw43WSEzJICMw8P7OTGBgYMhURT56fH4jq6v2/dD4v3zIzXaR2mQFNit5ulX5us+D+Fe6Vy7rw1DNFCLYV/Ebv/mxpYJ+nB46hjW8fXliIFw28Xp8mbDLv35+oxhuSt9EBJ36BxETNyL0B1EnLhL9UPiftS3JORGSd9ACaOIOg5C0+0S9G+0rvgIxe4pB+huTLqqOSRoIim7sQbolNANrSgzNKqOKbFB21cmaOTGhKHJbEJj7KYyDkgJrRJE6LQRGxp//wqN6GqOugt1D9RQJohVDaSJSXJaCrpOknd6EL0O4t2D9rU1ELQOzfI5B9Sn1Tqsn9yhabclaHRAsg6b4itiWz56xSZJkU6YG9bvFBoRbV0kUTs9SCbKY2oxlqfc8xZsoKEikuWteIitiFrtyx4nlHs4Pc7uYbnVxVRdm83RPeailW7namf50jha5KlDpdNjqlv2YL4LOsuxe/CPFZFKhk6W1kTPBknIxD2023WoeZWTt8x/hxa/P02hSUh9fgAOk4YtmF7eEwAAAABJRU5ErkJggg=="
                                 alt="Code"
                             />
                                </div> */}
                                <button className="btn login" type="submit">
                                    Đăng nhập
                                </button>
                                <a className="btn register" href="/register">
                                    Đăng ký
                                </a>
                                {/* <a className="btn try" href="/try">
                             Chơi thử
                         </a> */}
                                {/* <a className="text-xs text-white underline tracking-wide" href="/forgotpassword">
                                    Quên mật khẩu?
                                </a> */}
                                <a className="text-xs text-white underline tracking-wide" href="/">
                                    Liên hệ hỗ trợ
                                </a>
                                <a className="text-xs text-white underline tracking-wide" href="/game/mien-bac">
                                    Xổ số miền bắc
                                </a>
                                <a className="text-xs text-white underline tracking-wide" href="/">
                                    <Clock />
                                </a>
                            </form>
                        ) : (
                            <div className="user-box-login-success">
                                <div className="login-username">
                                    <span className="login-username-icon"></span>
                                    <a
                                        href="/profile"
                                        style={{
                                            maxWidth: '105px',
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                        }}
                                    >
                                        <span className="login-username-name">{infoUser?.name}</span>
                                    </a>
                                </div>
                                <span className="chia">|</span>
                                <div className="login-username">
                                    <span>Số dư: &nbsp; </span>
                                    {/* <span>&nbsp; 100.000.000.000 VNĐ</span> */}
                                    <span>&nbsp; {Intl.NumberFormat().format(infoUser?.money)} VNĐ</span>
                                </div>
                                <span className="chia">|</span>
                                <div className="login-username">
                                    <Link to="/profile-v2/nap-tien">
                                        <span className="tien nap-tien">Nạp tiền</span>
                                    </Link>
                                    <Link to="/profile-v2/rut-tien">
                                        <span className="tien rut-tien">Rút tiền</span>
                                    </Link>
                                    {/* <span className="tien chuyen-tien">Chuyển tiền</span> */}
                                </div>
                                <span className="chia">|</span>
                                <div className="login-username">
                                    <Link to="/profile-v2/lich-su-dat-cuoc">
                                        <span>Lịch sử</span>
                                    </Link>
                                </div>
                                <span className="chia">|</span>
                                <div className="login-username">
                                    <Link to="/" style={{ width: '280px' }}>
                                        <span>
                                            <Clock />
                                        </span>
                                    </Link>
                                </div>
                                <span className="chia">|</span>
                                <div onClick={handleLogout} className="login-username">
                                    <span onClick={handleLogout} className="tien chuyen-tien">
                                        Đăng xuất
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="header-screen-mobile">
                        {!user ? (
                            <form className="form-header-responsive">
                                {/* <button className="btn login" onClick={handleOpenLoginForm}>
                                    Login
                                </button> */}

                                <a className="text-xs text-white underline tracking-wide" href="/">
                                    <Clock />
                                </a>
                            </form>
                        ) : (
                            <form className="form-header-responsive">
                                <a className="text-xs text-white underline tracking-wide" href="/">
                                    <Clock />
                                </a>
                                <br />
                                <a className="text-xs text-white tracking-wide" href="/profile">
                                    <span>Số dư: {Intl.NumberFormat().format(infoUser?.money)} VNĐ</span>
                                </a>
                            </form>
                        )}
                    </div>
                </div>
                <div className="container-login-mobile">
                    <div className="content-login-mobile">
                        <div className="close-login-form">
                            <FontAwesomeIcon
                                onClick={handleNoneFormLogin}
                                className="icon-Xmark"
                                icon={faCircleXmark}
                            />
                        </div>
                        <form className="form-login-mobile" onSubmit={handleLogin}>
                            <div className="flex space-x-1 text-xs items-center px-2 border border-solid border-white">
                                <span className="user w-6 h-6 block"></span>
                                <input
                                    type="text"
                                    placeholder="Số tài khoản"
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="input"
                                />
                            </div>
                            <div className="flex space-x-1 text-xs items-center px-2 border border-solid border-white">
                                <span className="pw w-6 h-6 block"></span>
                                <input
                                    type="password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Mật khẩu"
                                    className="input"
                                />
                            </div>
                            <div className="flex space-x-1 text-xs items-center border border-solid border-white no-margin">
                                <button className="btn login" type="submit">
                                    Đăng nhập
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                <div style={{ backgroundColor: '#000' }} className="h-12">
                    <div className="max-w-screen-2xl 2xl:m-auto xl:max-w-screen-xl xl:m-auto h-full">
                        <div className="flex h-full items-center">
                            <span className="notification-img">
                                <Image src={notification_new} alt="Notification" />
                            </span>
                            <div className="flex-1 notification-wrapper">
                                <p className="notification">
                                    KHUYẾN MÃI MỚI NHẤT： * Quý hội viên vui lòng chú ý từ nay cổng nạp của trang chủ
                                    VN179 sẽ thay đổi thông tin người thụ hưởng nhận tiền ! mong quý hội viên không thực
                                    hiện lưu giữ thông tin người thụ hưởng để tránh dẫn đến mất mát tiền bạc không đáng
                                    có ! !! Hội viên giao dịch tới tài khoản thụ hưởng trang chủ đã ngừng sử dụng thì
                                    nền tảng sẽ không chịu trách nghiệm với tất cả hình thức giao dịch sai dẫn đến thất
                                    thoát tiền bạc ạ ! Xin chân thành cảm ơn. LƯU Ý ： ✔️ Để đảm bảo an toàn và bảo mật,
                                    số tài khoản ngân hàng hệ thống thay đổi liên tục ...Vì vậy mỗi lần chuyển tiền quý
                                    khách vui lòng đăng nhập vào game để lấy số tài khoản.Nếu quý khách chuyển khoản vào
                                    ngân hàng đã đóng, hệ thống sẽ không hỗ trợ cho quý khách !
                                </p>
                            </div>

                            {/* <p className="notification">
                            KHUYẾN MÃI MỚI NHẤT：&nbsp;&nbsp;&nbsp;&nbsp; * Quý hội viên vui lòng chú ý từ nay cổng nạp
                            của trang chủ HR99 sẽ thay đổi thông tin người thụ hưởng nhận tiền ! mong quý hội viên không
                            thực hiện lưu giữ thông tin người thụ hưởng để tránh dẫn đến mất mát tiền bạc không đáng có
                            ! !! Hội viên giao dịch tới tài khoản thụ hưởng trang chủ đã ngừng sử dụng thì nền tảng sẽ
                            không chịu trách nghiệm với tất cả hình thức giao dịch sai dẫn đến thất thoát tiền bạc ạ !
                            Xin chân thành cảm ơn★ Lì xì mỗi ngày - Rinh quà liền tay Cơn mưa lì xì thời gian từ 12h00 -
                            21h00 mỗi ngày có giá trị lên đến 99.999.999 VND, mỗi ngày đều có một bao lì xì giá trị cao
                            nhất 9.999.999 chờ đón bạn. &nbsp;&nbsp;&nbsp;&nbsp;Tư Vấn &amp; Nhận
                            Thưởng：&nbsp;&nbsp;&nbsp;&nbsp;● HR99 Nhà cái đẳng cấp nhất châu á, thương hiệu lớn , nguồn
                            vốn dồi dào, ưu đãi liên tục 【Thành viên mới - Đăng ký 1 lần nhận thưởng 3 lần】 【Phao cứu
                            trợ đẳng cấp hồi sinh】 【Thưởng vượt ải Game bài】 【Thưởng vượt ải Live casino】 【Thưởng
                            vượt ải Slotgame】 【Thăng hạng VIP- Thưởng hàng tháng】 【Bất kể thắng thua hoàn trả cao
                            lên đến 1.2%】 【Giới thiệu thành viên cùng khiêng giải thưởng - Bao nhiêu bạn bấy nhiêu
                            quà】 【Like &amp; share facebook nhận thưởng】 【Sinh nhật vàng nhận quà sang】 【Gia nhập
                            đại lý lợi nhuận cao】 【Mỗi ngày đều có món quà bí mật】 【Thưởng cược xổ số hàng ngày,
                            hàng tuần】 【Bắn cá hăng say rinh quà mỗi ngày】 【Thưởng thể thao tuần + May mắn thể
                            thao】 【Thưởng Liên thắng Slotgame】 Nhiều chương trình khuyến mãi đang chờ bạn ~ Để biết
                            chi tiết, vui lòng nhấp vào " Khuyến mãi" trên Trang chủ ~ ● Nhận Thưởng : Để xác nhận tài
                            khoản của quý khách có đủ điều kiện nhận thưởng và nhận thưởng vui lòng liên hệ Chuyên Viên
                            Sự Kiện (CVSK) thông qua zalo : 0933250443&nbsp;&nbsp;&nbsp;&nbsp;
                        </p> */}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
