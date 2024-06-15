import 'assets/css/payment.css'
import payment from 'assets/images/paymentF.png'

const PaymentFail = () => {
  return (
    <div className='paymentfail'>
      <img src={payment} alt='payment' className='paymentfailImage'/>
      <h2 className='paymentfailHeader'>Thanh toán thất bại!</h2>
      <p className='paymentfailTitle'>Chỗ đỗ xe của bạn đã được đặt thất bại.</p>
    </div>
  )
}

export default PaymentFail
