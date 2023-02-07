import Countdown, { zeroPad } from 'react-countdown';

const Completionist = () => <span>Đang quay số</span>;
function CountDown({ day, refresh, fetch, timeServe }) {
    if (day && timeServe) {
        const days = day.split(/[- :]/);
        const timeServes = timeServe.split(/[- :]/);
        const date = new Date(days[0], days[1], days[2], days[3], days[4], days[5]);
        const timeServer = new Date(
            timeServes[0],
            timeServes[1],
            timeServes[2],
            timeServes[3],
            timeServes[4],
            timeServes[5],
        );

        var time = Date.parse(date) - Date.parse(timeServer);
        var Rtime = Date.now() + time - 1500;
        if (!time || time === NaN) {
            Rtime = Date.now() + 2000;
        }
    } else {
        Rtime = Date.now() + 2000;
    }

    // console.log(Date.now(), time);
    const complete = () => {
        setTimeout(function () {
            refresh();
            fetch();
        }, 2000);
    };
    const renderer = ({ days, hours, minutes, seconds, completed }) => {
        if (completed) {
            // Render a completed state
            return <Completionist />;
        } else {
            // Render a countdown
            // console.log(Date.now() + time);
            hours = hours + days * 24;
            return (
                <span>
                    {zeroPad(hours)}:{zeroPad(minutes)}:{zeroPad(seconds)}
                </span>
            );
        }
    };
    return (
        <Countdown autoStart overtime date={Number(Rtime)} daysInHours renderer={renderer} onComplete={complete}>
            <Completionist />
        </Countdown>
    );
}

export default CountDown;
