import 'assets/css/payment.css'
import payment from 'assets/images/paymentS.png'

const PaymentSuccess = () => {
  return (
    <div className='paymentsuccess'>
      <img src={payment} alt='payment' className='paymentsuccessImage'/>
      <h2 className='paymentsuccessHeader'>Thanh toán thành công!</h2>
      <p className='paymentsuccessTitle'>Chỗ đỗ xe của bạn đã được đặt thành công.</p>
    </div>
  )
}

export default PaymentSuccess
