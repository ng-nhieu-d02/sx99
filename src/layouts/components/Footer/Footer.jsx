import Image from '~/components/Image';
import Loadding from '~/components/Loadding';
import bankLogo from '~/assets/images/banks-logo.png';
import email_icon from '~/assets/images/icon-email.png';
import service_icon from '~/assets/images/icon-service.png';
import phone_icon from '~/assets/images/icon-phone.png';
import footerWork_icon from '~/assets/images/icon-footerWork.png';
import './Footer.scss';
function Footer() {
    return (
        <div>
            <Loadding />
            <div className="notification-waring">Vui lòng kiểm tra lại</div>
            <div style={{ backgroundColor: '#063a73' }}>
                <div className="max-w-screen-2xl 2xl:m-auto xl:max-w-screen-xl xl:m-auto">
                    <ul className="flex items-center text-xs h-full justify-around p-6 mx-24 class-footer-gird-pc">
                        <li className="flex items-center text-white space-x-2 ">
                            <Image src={phone_icon} alt="Support" />
                            <span>Hotline</span>
                        </li>
                        <li
                            style={{ backgroundColor: '#126691' }}
                            className="w-px h-12 relative top-1/2 -translate-y-0"
                        ></li>
                        <li className="flex items-center text-white space-x-2 ">
                            <Image src={email_icon} alt="Mail" />
                            <span>vn179@gmail.com</span>
                        </li>
                        <li
                            style={{ backgroundColor: '#126691' }}
                            className="w-px h-12 relative top-1/2 -translate-y-0"
                        ></li>
                        <li className="flex items-center text-white space-x-2 ">
                            <Image src={footerWork_icon} alt="DL" />
                            <span>Đại lý</span>
                        </li>
                        <li
                            style={{ backgroundColor: '#126691' }}
                            className="w-px h-12 relative top-1/2 -translate-y-0"
                        ></li>
                        <li className="flex items-center text-white space-x-2 ">
                            <Image src={service_icon} alt="Care" />
                            <span>Chăm sóc khách hàng</span>
                        </li>
                    </ul>
                    <ul className="flex items-center text-xs h-full justify-around p-6 mx-24 class-footer-gird">
                        <li className="flex items-center text-white space-x-2 ">
                            <Image src={phone_icon} alt="Support" />
                            <span>Hotline</span>
                        </li>

                        <li className="flex items-center text-white space-x-2 ">
                            <Image src={email_icon} alt="Mail" />
                            <span>vn179@gmail.com</span>
                        </li>

                        <li className="flex items-center text-white space-x-2 ">
                            <Image src={footerWork_icon} alt="DL" />
                            <span>Đại lý</span>
                        </li>

                        <li className="flex items-center text-white space-x-2 ">
                             <Image src={service_icon} alt="Care" />
                            <span>Chăm sóc khách hàng</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="middle">
                <div className="max-w-screen-2xl 2xl:m-auto xl:max-w-screen-xl xl:m-auto">
                    <div className="p-6 mx-20 img-footer">
                        <Image src={bankLogo} alt="pay" />
                    </div>
                </div>
            </div>

            <div style={{ backgroundColor: '#030c3b' }}>
                <div className="max-w-screen-2xl 2xl:m-auto xl:max-w-screen-xl xl:m-auto">
                    <p className="text-white text-sm font-light uppercase py-4 text-center text-footer">
                        Đã đăng ký bản quyền ©2017Cộng Đồng Sổ Xố Trực Tuyến
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Footer;
