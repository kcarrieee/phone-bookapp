import { useState, useEffect } from 'react'
import {  useDispatch, useSelector } from 'react-redux'
import { postNewNumber } from '../features/phones/dataSlice'
import { countryCodes } from '../config'

const Form = () => {

    const dispatch = useDispatch()
    const [code, setCode] = useState(7)
    const [phone, setPhone] = useState('')
    const [btnDisabled, setbtnDisabled] = useState(true);
    const [validation, setValidation] = useState('');
    const { 
        isError, message
       } = useSelector((state) => state.data)

    const phone_number = parseInt(phone)

    function handleText(e){
        if (phone === '' || null || undefined || phone.length<3 || phone.length>10){
            setbtnDisabled(true)
            setValidation('phone number should contain from 3 to 10 characters')
        }else if(phone !== '' && phone.trim().length>3 && phone.trim().length<10){
            setbtnDisabled(false)
        }else{
            setbtnDisabled(false)
            setValidation(null)
            
        }
        setPhone(e.target.value)
        
    }

    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(postNewNumber(
          { phone_number: phone_number,
            code: code }
        ))
        setPhone('')
    }

    useEffect(() => {
        if(isError){
        alert(message)
       }
    }, [isError, message]);
   

  return (
    <div>
        <form onSubmit={onSubmit} className="form">
            <select
                id="code"
                name="code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                >
                {countryCodes.map((code, index) => (
                    <option value={code.code} key={index}>+{code.code}</option>
                ))}
            </select>
            <div className="form-group">
                <input className="form-field" type="number" placeholder='9522336787' value={phone} onChange={(e) => handleText(e)}/>
                <button type="submit"
                 className={`btn btn-${btnDisabled}`}
                 disabled={btnDisabled === true ? true : null}
                >Submit</button>
            </div>
        </form>
        {validation && <div className="message">{validation}</div>}
    </div>
  )
}

export default Form