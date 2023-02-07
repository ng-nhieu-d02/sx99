import './2So.scss';

function HaiSo() {
    return (
        <div>
            <div style={{ backgroundColor: '#f5f5f5' }} className="flex px-2 py-4 items-center">
                {/* add class active */}
                <h6 className="chuc ">Chục</h6>
                <ul className="flex ul-2so">
                    <li className="active">
                        <h6>0</h6>
                    </li>
                    <li>
                        <h6>1</h6>
                    </li>
                    <li>
                        <h6>2</h6>
                    </li>
                    <li>
                        <h6>3</h6>
                    </li>
                    <li>
                        <h6>4</h6>
                    </li>
                    <li>
                        <h6>5</h6>
                    </li>
                    <li>
                        <h6>6</h6>
                    </li>
                    <li>
                        <h6>7</h6>
                    </li>
                    <li>
                        <h6>8</h6>
                    </li>
                    <li>
                        <h6>9</h6>
                    </li>
                </ul>
                <div className="ml-auto">
                    <button className="ul-btn active">Tất cả</button>
                    <button className="ul-btn">Tài</button>
                    <button className="ul-btn">Xỉu</button>
                    <button className="ul-btn">Lẽ</button>
                    <button className="ul-btn">Chẵn</button>
                    <button className="ul-btn">Xóa</button>
                </div>
            </div>
            <div className="flex px-2 py-4 items-center">
                <h6 className="chuc">Đơn vị</h6>
                <ul className="flex ul-2so">
                    <li className="active">
                        <h6>0</h6>
                    </li>
                    <li>
                        <h6>1</h6>
                    </li>
                    <li>
                        <h6>2</h6>
                    </li>
                    <li>
                        <h6>3</h6>
                    </li>
                    <li>
                        <h6>4</h6>
                    </li>
                    <li>
                        <h6>5</h6>
                    </li>
                    <li>
                        <h6>6</h6>
                    </li>
                    <li>
                        <h6>7</h6>
                    </li>
                    <li>
                        <h6>8</h6>
                    </li>
                    <li>
                        <h6>9</h6>
                    </li>
                </ul>
                <div className="ml-auto">
                    <button className="ul-btn active">Tất cả</button>
                    <button className="ul-btn">Tài</button>
                    <button className="ul-btn">Xỉu</button>
                    <button className="ul-btn">Lẽ</button>
                    <button className="ul-btn">Chẵn</button>
                    <button className="ul-btn">Xóa</button>
                </div>
            </div>
        </div>
    );
}

export default HaiSo;
