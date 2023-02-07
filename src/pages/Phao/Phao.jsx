import './Phao.scss';
import Image from '~/components/Image';
import logo from '~/assets/images/logo-vn179.png';
import img1 from '~/assets/images/img.png';
import shenhe from '~/assets/images/shenhe1.png';
import ic1 from '~/assets/images/ic1.png';
import ic2 from '~/assets/images/ic2.png';
import ic3 from '~/assets/images/ic3.png';
import ic4 from '~/assets/images/ic4.png';

function Phao() {
    return (
        <div className="app-phao">
            <div className="header">
                <div className="head">
                    <div className="inner">
                        <div className="img1">
                            <a href="/phao">
                                <Image src={img1} alt="img1" />
                            </a>
                        </div>{' '}
                        <div className="logo">
                            <h1>
                                <a href="/">
                                    <Image className="img-logo-phao" src={logo} alt="Logo" />
                                </a>
                            </h1>
                        </div>
                        <div className="shenhebtn layerbtn">
                            <a href="/">
                                <Image src={shenhe} alt="layerbtn" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="navbxwa">
                <div className="psr">
                    <div className="newbox">
                        <div className=" ">
                            <div className="newin">
                                <p className="lunleft">
                                    "KHUYẾN MÃI MỚI NHẤT： * Quý hội viên vui lòng chú ý từ nay cổng nạp của trang chủ
                                    VN179 sẽ thay đổi thông tin người thụ hưởng nhận tiền ! mong quý hội viên không thực
                                    hiện lưu giữ thông tin người thụ hưởng để tránh dẫn đến mất mát tiền bạc không đáng
                                    có ! !! Hội viên giao dịch tới tài khoản thụ hưởng trang chủ đã ngừng sử dụng thì
                                    nền tảng sẽ không chịu trách nghiệm với tất cả hình thức giao dịch sai dẫn đến thất
                                    thoát tiền bạc ạ ! Xin chân thành cảm ơn. LƯU Ý ： ✔️ Để đảm bảo an toàn và bảo mật,
                                    số tài khoản ngân hàng hệ thống thay đổi liên tục ...Vì vậy mỗi lần chuyển tiền quý
                                    khách vui lòng đăng nhập vào game để lấy số tài khoản.Nếu quý khách chuyển khoản vào
                                    ngân hàng đã đóng, hệ thống sẽ không hỗ trợ cho quý khách !"
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="nav">
                    <div className="inner">
                        <ul>
                            {/* <li>
                                <a href="https://www.hr681.com/home/reg.html" target="_blank">
                                    <span className="icbx">
                                        <Image src={ic1} alt="" />
                                    </span>
                                    Miễn phí đăng ký
                                </a>
                            </li>
                            <li>
                                <a href="https://www.hr681.com/home/index.html" target="_blank">
                                    <span className="icbx">
                                        <Image src={ic2} alt="" />
                                    </span>
                                    Địa chỉ web
                                </a>
                            </li>
                            <li>
                                <a href="https://www.hr681.com/home/appdownload.html" target="_blank">
                                    <span className="icbx">
                                        <Image src={ic3} alt="" />
                                    </span>
                                    Tải APP
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://core.vchat.vn/service/chat?code=7653&amp;jwt=8e57d8fd77ca099cabcf0e1c523539c6"
                                    target="_blank"
                                >
                                    <span className="icbx">
                                        <Image src={ic4} alt="" />
                                    </span>
                                    CSKH
                                </a>
                            </li> */}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Phao;
