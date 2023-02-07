import Footer from '~/layouts/components/Footer';
function LayoutPhao({ children }) {
    return (
        <div>
            <div className="phaoPage">{children}</div>
            <Footer />
        </div>
    );
}

export default LayoutPhao;
