import { useState } from "react"
import "assets/css/retroclock.css"
import { useEffect } from "react"

const Retroclock = () => {
    const [hours, setHours] = useState('')
    const [minute, setMinute] = useState('')
    const [second, setSecond] = useState('')

    useEffect(() => {
        const timerID = setInterval(
            () => tick(), 1000)

        return function cleanup() {
            clearInterval(timerID)
        }
    })

    function tick() {
        const d = new Date();
        let h = d.getHours();
        let m = d.getMinutes();
        let s = d.getSeconds();

        h = (h < 10) ? "0" + h : h
        m = (m < 10) ? "0" + m : m
        s = (s < 10) ? "0" + s : s

        setHours(h);
        setMinute(m);
        setSecond(s);
    }

    return (
        <div className="Retroclock">
            <h2>ĐỒNG HỒ KỸ THUẬT SỐ</h2>
            <div className="time">
                <div className="hrs">
                    <label>{hours}</label><label>Hours</label>
                </div>
                <div className="mint">
                    <label>{minute}</label><label>Minutes</label>
                </div>
                <div className="sec">
                    <label>{second}</label><label>Seconds</label>
                </div>
            </div>
        </div>
    )
}

export default Retroclock
