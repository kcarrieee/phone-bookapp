import {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getNumbers } from '../features/phones/dataSlice'
import Spinner from './Spinner'

const List = () => {
    const { 
        phones,
        isSuccess,
        isLoading
       } = useSelector((state) => state.data)

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getNumbers())

        return () =>{
            if(isSuccess){
                dispatch(getNumbers())
            }
        }
    },[dispatch,isSuccess])

    if(isLoading){
        return <Spinner/>
    }

  return (
    <>
    {phones.length === 0 ? (<div>No Phone Numbers yet</div>): null}
      <div className='list'>
            {phones.map((phone)=>(
               <div key={phone.pid} className="card">Phone Number:  <p>+{phone.phone_number}</p></div> 
            )).reverse()}
        </div>
    </>
  )
}

export default List