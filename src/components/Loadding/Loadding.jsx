import './Loadding.scss';

export const function_loadding_create = () => {
    const element =
        '<div class="spinner"><div class="spinner-item"></div><div class="spinner-item"></div><div class="spinner-item"></div></div>';
    const loadding = document.createElement('div');
    loadding.classList.add('loadding-scss');
    loadding.innerHTML = element;
    document.querySelector('.loadding-html').append(loadding);
};

export const function_loadding_delete = () => {
    const element_loadding = document.querySelector('.loadding-scss');
    element_loadding.remove();
};

function Loadding() {
    return <div className="loadding-html"></div>;
}
export default Loadding;
