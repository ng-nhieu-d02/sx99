import './Home.scss';
import { useState, useEffect } from 'react';
import GameHome from '~/layouts/components/gameHome/gameHome';

function Home() {
    const [content, setContent] = useState([]);
    const listContent = {
        north: [
            {
                img: 'https://hr681.com/static/img/gameicons/cp/miba.png',
                name: 'Miền Bắc',
                link: 'game/mien-bac',
                param: 'miba',
            },
            {
                img: 'https://hr681.com/static/img/gameicons/cp/hano.png',
                name: 'Hà Nội',
                link: 'game/ha-noi',
                param: 'hano',
            },
            {
                img: 'https://hr681.com/static/img/gameicons/cp/quni.png',
                name: 'Quảng Ninh',
                link: 'game/quang-ninh',
                param: 'quni',
            },
            {
                img: 'https://hr681.com/static/img/gameicons/cp/haph.png',
                name: 'Hải Phòng',
                link: 'game/hai-phong',
                param: 'haph',
            },
            {
                img: 'https://hr681.com/static/img/gameicons/cp/bani.png',
                name: 'Bắc Ninh',
                link: 'game/bac-ninh',
                param: 'bani',
            },
            {
                img: 'https://hr681.com/static/img/gameicons/cp/nadi.png',
                name: 'Nam Định',
                link: 'game/nam-dinh',
                param: 'nadi',
            },
            {
                img: 'https://hr681.com/static/img/gameicons/cp/thbi.png',
                name: 'Thái Bình',
                link: 'game/thai-binh',
                param: 'thbi',
            },
        ],
        // onLive: [
        //     {
        //         img: 'https://hr681.com/static/img/gameicons/cp/on5ppk10.png',
        //         name: 'PK10 5 Phút Live',
        //         link: 'game/pk-10-5-phut-live',
        //     },
        //     {
        //         img: 'https://hr681.com/static/img/gameicons/cp/on5pssc.png',
        //         name: 'Lô tô 5 Phút Live',
        //         link: 'game/lo-to-5-phut-live',
        //     },
        //     {
        //         img: 'https://hr681.com/static/img/gameicons/cp/on5plhc.png',
        //         name: 'Mark Six 5 Phút Live',
        //         link: 'game/mark-six-5-phut-live',
        //     },
        // ],
        soSoVip: [
            {
                img: 'https://hr681.com/static/img/gameicons/cp/hnvip.png',
                name: 'Hà Nội VIP',
                link: 'game/ha-noi-vip',
                param: 'hnvip',
            },
            {
                img: 'https://hr681.com/static/img/gameicons/cp/hcmvip.png',
                name: 'Hồ Chí Minh VIP',
                link: 'game/ho-chi-minh-vip',
                param: 'hcmvip',
            },
        ],
        sieuToc: [
            {
                img: 'https://hr681.com/static/img/gameicons/cp/st45g.png',
                name: 'Siêu tốc 45 giây',
                link: 'game/sieu-toc-45-giay',
                param: 'st45g',
            },
            {
                img: 'https://hr681.com/static/img/gameicons/cp/st1p.png',
                name: 'Siêu tốc 1 phút',
                link: 'game/sieu-toc-1-phut',
                param: 'st1p',
            },
            {
                img: 'https://hr681.com/static/img/gameicons/cp/st90p.png',
                name: 'Siêu tốc 1.5 phút',
                link: 'game/sieu-toc-90-giay',
                param: 'st90p',
            },
            {
                img: 'https://hr681.com/static/img/gameicons/cp/st2p.png',
                name: 'Siêu Tốc 2 Phút',
                link: 'game/sieu-toc-2-phut',
                param: 'st2p',
            },
            {
                img: 'https://hr681.com/static/img/gameicons/cp/st5p.png',
                name: 'Siêu Tốc 5 Phút',
                link: 'game/sieu-toc-5-phut',
                param: 'st5p',
            },
            {
                img: 'https://hr681.com/static/img/gameicons/cp/mbmg.png',
                name: 'M.Bắc 75 Giây',
                link: 'game/mien-bac-75-giay',
                param: 'mbmg',
            },
            {
                img: 'https://hr681.com/static/img/gameicons/cp/mnmg.png',
                name: 'M.Nam Siêu Tốc 45s',
                link: 'game/mien-nam-sieu-toc-45-giay',
                param: 'mnmg',
            },
            {
                img: 'https://hr681.com/static/img/gameicons/cp/mtmg.png',
                name: 'M.Trung 75 Giây',
                link: 'game/mien-trung-75-giay',
                param: 'mtmg',
            },
        ],
        meGa: [
            {
                img: 'https://hr681.com/static/img/gameicons/cp/mg1p.png',
                name: 'Mega 6/45 1 Phút',
                link: 'game/mega-645-1-phut',
                param: 'mg1p',
            },
        ],
        south: [
            {
                img: 'https://hr681.com/static/img/gameicons/cp/bali.png',
                name: 'Bạc Liêu',
                link: 'game/bac-lieu',
                param: 'bali',
            },
            {
                img: 'https://hr681.com/static/img/gameicons/cp/vuta.png',
                name: 'Vũng Tàu',
                link: 'game/vung-tau',
                param: 'vuta',
            },
            {
                img: 'https://hr681.com/static/img/gameicons/cp/tigi.png',
                name: 'Tiền Giang',
                link: 'game/tien-giang',
                param: 'tigi',
            },
            {
                img: 'https://hr681.com/static/img/gameicons/cp/kigi.png',
                name: 'Kiên Giang',
                link: 'game/kien-giang',
                param: 'kigi',
            },
            {
                img: 'https://hr681.com/static/img/gameicons/cp/dalat.png',
                name: 'Đà Lạt',
                link: 'game/da-lat',
                param: 'dalat',
            },
            {
                img: 'https://hr681.com/static/img/gameicons/cp/cama.png',
                name: 'Cà mau',
                link: 'game/ca-mau',
                param: 'cama',
            },
            {
                img: 'https://hr681.com/static/img/gameicons/cp/biph.png',
                name: 'Bình Phước',
                link: 'game/binh-phuoc',
                param: 'biph',
            },
            {
                img: 'https://hr681.com/static/img/gameicons/cp/bidu.png',
                name: 'Bình Dương',
                link: 'game/binh-duong',
                param: 'bidu',
            },
            {
                img: 'https://hr681.com/static/img/gameicons/cp/angi.png',
                name: 'An Giang',
                link: 'game/an-giang',
                param: 'angi',
            },
            {
                img: 'https://hr681.com/static/img/gameicons/cp/bith.png',
                name: 'Bình Thuận',
                link: 'game/binh-thuan',
                param: 'bith',
            },
            {
                img: 'https://hr681.com/static/img/gameicons/cp/cath.png',
                name: 'Cần Thơ',
                link: 'game/can-tho',
                param: 'cath',
            },
            {
                img: 'https://hr681.com/static/img/gameicons/cp/hagi.png',
                name: 'Hậu Giang',
                link: 'game/hau-giang',
                param: 'hagi',
            },
            {
                img: 'https://hr681.com/static/img/gameicons/cp/doth.png',
                name: 'Đồng Tháp',
                link: 'game/dong-thap',
                param: 'doth',
            },
            {
                img: 'https://hr681.com/static/img/gameicons/cp/tani.png',
                name: 'Tây Ninh',
                link: 'game/tay-ninh',
                param: 'tani',
            },
            {
                img: 'https://hr681.com/static/img/gameicons/cp/vilo.png',
                name: 'Vĩnh Long',
                link: 'game/vinh-long',
                param: 'vilo',
            },
            {
                img: 'https://hr681.com/static/img/gameicons/cp/trvi.png',
                name: 'Trà Vinh',
                link: 'game/tra-vinh',
                param: 'trvi',
            },
            {
                img: 'https://hr681.com/static/img/gameicons/cp/sotr.png',
                name: 'Sóc Trăng',
                link: 'game/soc-trang',
                param: 'sotr',
            },
            {
                img: 'https://hr681.com/static/img/gameicons/cp/tphc.png',
                name: 'TP. HCM',
                link: 'game/tp-ho-chi-minh',
                param: 'tphc',
            },
            {
                img: '	https://hr681.com/static/img/gameicons/cp/dona.png',
                name: 'Đồng Nai',
                link: 'game/dong-nai',
                param: 'dona',
            },
        ],
        east: [
            {
                img: 'https://hr681.com/static/img/gameicons/cp/dana.png',
                name: 'Đà Nẵng',
                link: 'game/da-nang',
                param: 'dana',
            },
            {
                img: 'https://hr681.com/static/img/gameicons/cp/thth.png',
                name: 'Thừa Thiên Huế',
                link: 'game/thua-thien-hue',
                param: 'thth',
            },
            {
                img: 'https://hr681.com/static/img/gameicons/cp/qutr.png',
                name: 'Quảng Trị',
                link: 'game/quang-tri',
                param: 'qutr',
            },
            {
                img: 'https://hr681.com/static/img/gameicons/cp/phye.png',
                name: 'Phú Yên',
                link: 'game/phu-yen',
                param: 'phye',
            },
            {
                img: 'https://hr681.com/static/img/gameicons/cp/qubi.png',
                name: 'Quảng Bình',
                link: 'game/quang-binh',
                param: 'qubi',
            },
            {
                img: 'https://hr681.com/static/img/gameicons/cp/quna.png',
                name: 'Quảng Nam',
                link: 'game/quang-nam',
                param: 'quna',
            },
            {
                img: 'https://hr681.com/static/img/gameicons/cp/qung.png',
                name: 'Quảng Ngãi',
                link: 'game/quang-ngai',
                param: 'qung',
            },
            {
                img: 'https://hr681.com/static/img/gameicons/cp/kotu.png',
                name: 'Kon Tum',
                link: 'game/kon-tum',
                param: 'kotu',
            },
            {
                img: 'https://hr681.com/static/img/gameicons/cp/khho.png',
                name: 'Khánh Hòa',
                link: 'game/khanh-hoa',
                param: 'khho',
            },
            {
                img: 'https://hr681.com/static/img/gameicons/cp/gila.png',
                name: 'Gia Lai',
                link: 'game/gia-lai',
                param: 'gila',
            },
            {
                img: 'https://hr681.com/static/img/gameicons/cp/bidi.png',
                name: 'Bình Định',
                link: 'game/binh-dinh',
                param: 'bidi',
            },
            {
                img: 'https://hr681.com/static/img/gameicons/cp/dalak.png',
                name: 'Đắk Lắk',
                link: 'game/dak-lak',
                param: 'dalak',
            },
            {
                img: 'https://hr681.com/static/img/gameicons/cp/dano.png',
                name: 'Đắk Nông',
                link: 'game/dak-nong',
                param: 'dano',
            },
        ],
    };
    useEffect(() => {
        setContent(listContent['north']);
    }, []);
    const handleClick = (e) => {
        const targetElement = e.target;
        if (targetElement.classList.contains('active')) {
            return;
        }
        const activeElement = document.querySelector('.body-li.active');
        activeElement.classList.remove('active');
        targetElement.classList.add('active');
        const content = targetElement.getAttribute('data-name');
        setContent(listContent[content]);
    };
    return (
        <div>
            <div className="body-bg">
                <div className="max-w-screen-2xl 2xl:m-auto xl:max-w-screen-xl xl:m-auto pb-12">
                    <div style={{ backgroundColor: 'rgba(18,43,71,.74)' }} className="text-white px-6 py-7">
                        <ul
                            style={{ borderColor: '#ebb663' }}
                            className="flex justify-between text-black border-b container-home-menu"
                        >
                            <li
                                onClick={handleClick}
                                data-name="north"
                                className="px-12 py-2 rounded-t-md body-li active"
                            >
                                Miền Bắc
                            </li>
                            {/* <li onClick={handleClick} data-name="onLive" className="px-12 py-2 rounded-t-md body-li">
                                ONLINE
                            </li> */}
                            <li onClick={handleClick} data-name="soSoVip" className="px-12 py-2 rounded-t-md body-li">
                                Xố số VIP
                            </li>
                            <li onClick={handleClick} data-name="sieuToc" className="px-12 py-2 rounded-t-md body-li">
                                Siêu tốc
                            </li>
                            <li onClick={handleClick} data-name="meGa" className="px-12 py-2 rounded-t-md body-li">
                                Mega 6/125
                            </li>
                            <li onClick={handleClick} data-name="south" className="px-12 py-2 rounded-t-md body-li">
                                Miền Nam
                            </li>
                            <li onClick={handleClick} data-name="east" className="px-12 py-2 rounded-t-md body-li">
                                Miền Trung
                            </li>
                        </ul>
                        <div className="mt-7 gird-box-content-game">
                            {content.map((item, index) => (
                                <GameHome data={item} key={index} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
