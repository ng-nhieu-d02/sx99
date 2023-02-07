import './Register.scss';
import Image from '~/components/Image';
import { useEffect } from 'react';
import { useState } from 'react';
import { registerUser } from '~/Redux/apiRequest';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import logo from '~/assets/images/logo-vn179.png';
import title from '~/assets/images/title.png';
import { function_loadding_create, function_loadding_delete } from '~/components/Loadding/Loadding';

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRepassword] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

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

    const handleRegister = async (e) => {
        e.preventDefault();
        if (password !== rePassword) {
            return notification('error', 'Mật khẩu không trùng nhau !!');
        }
        await function_loadding_create();
        const data = {
            username: username,
            password: password,
            name: name,
            email: email,
        };
        const register = await registerUser(data, dispatch, navigate);
        await function_loadding_delete();
        // console.log(register);
        if (register === 201) {
            notification('success', 'Đăng ký thành công - vui lòng đăng nhập để tiếp tục');
            setTimeout(() => {
                return navigate('/');
            }, 3000);
        } else if (register === 500) {
            return notification('error', 'Đăng ký thật bại !! Tài khoản or email đã có người sử dụng');
        } else {
            return notification('error', 'Đăng ký thật bại !! Vui lòng kiểm tra lại');
        }
    };

    useEffect(() => {
        const counters = document.querySelectorAll('.counter');

        counters.forEach((counter) => {
            const start = +counter.getAttribute('data-start');
            counter.innerText = start.toLocaleString('en-US');
            const updateCounter = () => {
                let c = counter.innerText;
                c = c.replace(/\,/g, '');
                const increment = counter.getAttribute('data-increment');
                counter.innerText = (+c + +increment).toLocaleString('en-US');
                setTimeout(updateCounter, 2000);
            };
            updateCounter();
        });
    }, []);
    return (
        <div>
            <div className="max-w-screen-2xl 2xl:m-auto  xl:m-auto ">
                <div className="body-register">
                    <div className="mx-12 container-body-register">
                        <div style={{ background: 'rgba(11,30,52,.9)' }} className="pt-6">
                            <div className="px-16  pb-12 text-white register-container">
                                <Image
                                    className="px-4 img-px-4"
                                    src={title}
                                    style={{ margin: 'auto' }}
                                    alt="Register"
                                />
                                <div className="flex mt-4 flex-register">
                                    <div className="flex-1 text-sm font-light space-y-6">
                                        <div>
                                            <h4>Số người đặt cược Thể Thao tại VN179</h4>
                                            <p
                                                style={{ color: '#fff698' }}
                                                className="counter text-lg font-medium py-2 inline-block"
                                                data-start="5000"
                                                data-increment="143"
                                            ></p>
                                            <span
                                                style={{ color: '#fff698' }}
                                                className="text-lg font-medium py-2 ml-4"
                                            >
                                                người
                                            </span>
                                        </div>
                                        <div>
                                            <h4>Số lượng người dùng đăng kí tại VN179</h4>
                                            <p
                                                style={{ color: '#fff698' }}
                                                className="counter text-lg font-medium py-2 inline-block"
                                                data-start="35000"
                                                data-increment="423"
                                            ></p>
                                            <span
                                                style={{ color: '#fff698' }}
                                                className="text-lg font-medium py-2 ml-4"
                                            >
                                                người
                                            </span>
                                        </div>
                                        <div>
                                            <h4>Tổng thưởng của giải độc đắc SLOT GAME đã đạt đến tại VN179</h4>
                                            <p
                                                style={{ color: '#fff698' }}
                                                className="counter text-lg font-medium py-2 inline-block"
                                                data-start="35000000"
                                                data-increment="103513"
                                            ></p>
                                            <span
                                                style={{ color: '#fff698' }}
                                                className="text-lg font-medium py-2 ml-4"
                                            >
                                                VND
                                            </span>
                                        </div>
                                        <div>
                                            <Image src={logo} alt="Download" />
                                            {/* <div className="flex">
                                                <div className="flex flex-col items-center">
                                                    <div
                                                        style={{ borderColor: '#fff100' }}
                                                        className="p-3 m-6 border rounded-lg"
                                                    >
                                                        <Image src="https://upload.hr134.com/p/20220204/lion/33/10943746/png/1643946959000.png" />
                                                    </div>
                                                    <p className="flex items-center space-x-4">
                                                        <Image src="https://hr681.com/home/img/reg/icon-ios.png" />
                                                        <span>IOS TẢI XUỐNG</span>
                                                    </p>
                                                </div>
                                                <div className="flex flex-col items-center">
                                                    <div
                                                        style={{ borderColor: '#fff100' }}
                                                        className="p-3 m-6 border rounded-lg"
                                                    >
                                                        <Image src="https://upload.hr134.com/p/20220404/lion/33/10943746/png/1649044754114.png" />
                                                    </div>
                                                    <p className="flex items-center space-x-4">
                                                        <Image src="https://hr681.com/home/img/reg/icon-android.png" />
                                                        <span>ANDROID TẢI XUỐNG</span>
                                                    </p>
                                                </div>
                                            </div> */}
                                        </div>
                                    </div>
                                    <div className="w-px mx-16 my-4 h-auto bg-white"></div>
                                    <div className="flex-1">
                                        <form
                                            onSubmit={handleRegister}
                                            action=""
                                            className="class-box-register h-full flex items-end flex-col space-y-4"
                                        >
                                            {/* <div className="flex space-x-2 text-xs items-center">
                                                <label>Mã tiến cử:</label>
                                                <input
                                                    style={{ minWidth: '300px' }}
                                                    type="text"
                                                    placeholder="Nhập mã giới thiệu"
                                                    className="input-register py-4 px-3 rounded-lg border border-solid border-white"
                                                />
                                            </div> */}
                                            <div className="flex space-x-2 text-xs items-center">
                                                <label>
                                                    <span style={{ color: 'red' }} className="mr-1 text-xs">
                                                        *
                                                    </span>
                                                    Tài khoản thành viên:
                                                </label>
                                                <input
                                                    onChange={(e) => setUsername(e.target.value)}
                                                    type="text"
                                                    placeholder="6 đến 15 chữ cái ở đầu, kết hợp chữ cái + số!"
                                                    className="input-register py-4 px-3 rounded-lg border border-solid border-white input-register-mobile"
                                                />
                                            </div>
                                            <div className="flex space-x-2 text-xs items-center">
                                                <label>
                                                    <span style={{ color: 'red' }} className="mr-1 text-xs">
                                                        *
                                                    </span>
                                                    Đặt mật khẩu:
                                                </label>
                                                <input
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    type="password"
                                                    placeholder="Mật khẩu 6 đến 20 chữ số, kết hợp chữ cái + số!"
                                                    className="input-register py-4 px-3 rounded-lg border border-solid border-white input-register-mobile"
                                                />
                                            </div>
                                            <div className="flex space-x-2 text-xs items-center">
                                                <label>
                                                    <span style={{ color: 'red' }} className="mr-1 text-xs">
                                                        *
                                                    </span>
                                                    Xác nhận mật khẩu:
                                                </label>
                                                <input
                                                    onChange={(e) => setRepassword(e.target.value)}
                                                    type="password"
                                                    placeholder="Xin vui lòng nhập mật khẩu!"
                                                    className="input-register py-4 px-3 rounded-lg border border-solid border-white input-register-mobile"
                                                />
                                            </div>
                                            {/* <div className="flex space-x-2 text-xs items-center relative">
                                                <label>
                                                    <span style={{ color: 'red' }} className="mr-1 text-xs">
                                                        *
                                                    </span>
                                                    Mã xác nhận:
                                                </label>
                                                <input
                                                    style={{ minWidth: '300px' }}
                                                    type="number"
                                                    placeholder="Vui lòng nhập mã xác nhận!"
                                                    className="input-register py-4 px-3 rounded-lg border border-solid border-white"
                                                />
                                                <Image
                                                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAUCAIAAABeYcl+AAABo0lEQVR42r2WvW0CQRCFpxIyOiBCTgidUYHLICFwT8RQg3P34B580krD8H5mDyEhTQB3u3vfzrx5u/H38/vOuF5uI/Jv89ZF9B94HXFKz9uYcodb7g3cMIa3kc9hcLhvjDkf59MIWcflx2G/qdFndLf9znDf/fo8ZnAdOuiKm9A8H4gd+phSiUcAyhKVOIOLH65YEhoyt/BBZQY0by+zW7MO1WPK/AvViEaFVSFScCy+zLSEhp2DXoG4csP46F3pKehMM6xWxQDlqk9Yx/VhnRVTP6qNyKygZulWCQ2Clnwsj7qTuzwah09omSTZi8zNLVglXteUjcg2EtLPOdNS7jDYcXN2V3Kn0KEm0dt72kizMeZ21gHuIUXiNK2hJQRk2uW4tzyArt3Z11kK+qERGWVqeekVLA9oFeCG8yWZwCikCWpoeSLKU0Yeh/La4BpRurJrQW15NdkOGoY5Ynl8sHVApvnuIb0h+rsiS9xpqbmmuVdyVg9j3aO/K/Y34DWD+ZCHLEyXDXepXXPZXZO55uH05u1ybxtxWnSXP1d0N3cKzWD/uvnVBDlQ9uUAAAAASUVORK5CYII="
                                                    alt="Confirm"
                                                    className="absolute top-1/2 -translate-y-1/2 right-4"
                                                />
                                            </div> */}
                                            <div className="flex space-x-2 text-xs items-center">
                                                <label>
                                                    <span style={{ color: 'red' }} className="mr-1 text-xs">
                                                        *
                                                    </span>
                                                    Họ và tên:
                                                </label>
                                                <input
                                                    onChange={(e) => setName(e.target.value)}
                                                    type="text"
                                                    placeholder="Vui lòng nhập họ và tên của bạn"
                                                    className="input-register py-4 px-3 rounded-lg border border-solid border-white input-register-mobile"
                                                />
                                            </div>
                                            {/* <div className="flex space-x-2  text-xs items-center">
                                                <label className="">
                                                    <span style={{ color: 'red' }} className="mr-1 text-xs">
                                                        *
                                                    </span>
                                                    Rút mật khẩu:
                                                </label>
                                                <div>
                                                    <div className="flex space-x-2" style={{ minWidth: '326px' }}>
                                                        <select
                                                            className="flex-1 input py-4 px-3 rounded-lg border border-solid border-white"
                                                            name=""
                                                            id=""
                                                        >
                                                            <option value="0">0</option>
                                                            <option value="1">1</option>
                                                            <option value="2">2</option>
                                                            <option value="3">3</option>
                                                            <option value="4">4</option>
                                                            <option value="5">5</option>
                                                            <option value="6">6</option>
                                                            <option value="7">7</option>
                                                            <option value="8">8</option>
                                                            <option value="9">9</option>
                                                        </select>
                                                        <select
                                                            className="flex-1 input py-4 px-3 rounded-lg border border-solid border-white"
                                                            name=""
                                                            id=""
                                                        >
                                                            <option value="0">0</option>
                                                            <option value="1">1</option>
                                                            <option value="2">2</option>
                                                            <option value="3">3</option>
                                                            <option value="4">4</option>
                                                            <option value="5">5</option>
                                                            <option value="6">6</option>
                                                            <option value="7">7</option>
                                                            <option value="8">8</option>
                                                            <option value="9">9</option>
                                                        </select>
                                                        <select
                                                            className="flex-1 input py-4 px-3 rounded-lg border border-solid border-white"
                                                            name=""
                                                            id=""
                                                        >
                                                            <option value="0">0</option>
                                                            <option value="1">1</option>
                                                            <option value="2">2</option>
                                                            <option value="3">3</option>
                                                            <option value="4">4</option>
                                                            <option value="5">5</option>
                                                            <option value="6">6</option>
                                                            <option value="7">7</option>
                                                            <option value="8">8</option>
                                                            <option value="9">9</option>
                                                        </select>
                                                        <select
                                                            className="flex-1 input py-4 px-3 rounded-lg border border-solid border-white"
                                                            name=""
                                                            id=""
                                                        >
                                                            <option value="0">0</option>
                                                            <option value="1">1</option>
                                                            <option value="2">2</option>
                                                            <option value="3">3</option>
                                                            <option value="4">4</option>
                                                            <option value="5">5</option>
                                                            <option value="6">6</option>
                                                            <option value="7">7</option>
                                                            <option value="8">8</option>
                                                            <option value="9">9</option>
                                                        </select>
                                                    </div>
                                                    <p className="text-gray-400 p-2">Vui lòng nhập mật khẩu rút tiền</p>
                                                </div>
                                            </div> */}

                                            <div className="flex space-x-2 text-xs items-center">
                                                <label>
                                                    <span style={{ color: 'red' }} className="mr-1 text-xs">
                                                        *
                                                    </span>
                                                    Email:
                                                </label>
                                                <input
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    type="email"
                                                    placeholder="Vui lòng nhập họ và tên của bạn"
                                                    className="input-register py-4 px-3 rounded-lg border border-solid border-white input-register-mobile"
                                                />
                                            </div>
                                            <div className="flex space-x-2 text-xs items-center">
                                                <label>
                                                    <span style={{ color: 'red' }} className="mr-1 text-xs">
                                                        *
                                                    </span>
                                                    Số điện thoại:
                                                </label>
                                                <input
                                                    onChange={(e) => setPhone(e.target.value)}
                                                    type="text"
                                                    placeholder="định dạng: 0999999999"
                                                    className="input-register py-4 px-3 rounded-lg border border-solid border-white input-register-mobile"
                                                />
                                            </div>
                                            {/* <div className="text-sm font-thin">
                                                <input type="checkbox" name="" id="" checked />
                                                <span className="ml-2">
                                                    Tôi đã qua tuổi hợp pháp và thống nhất tất cả các hiệp ước mở tài
                                                    khoản!
                                                </span>
                                            </div> */}
                                            <div className="flex space-x-4 justify-center">
                                                <button className="btn btn-submit">Hoàn tất Đăng ký</button>
                                                <button className="btn btn-reset">Cài lại</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
