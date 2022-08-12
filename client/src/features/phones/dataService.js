


const postPhoneNumber = async (phone_number) => {

   const res = await fetch('http://localhost:5000/phones', {
    method:'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
        phone_number
    })
   })
   const data = await res.json()
   console.log(data)

   return data;
}

const getAll = async () => {

    const res = await fetch('http://localhost:5000/phones')
    const data = await res.json()

    return data;
}

const dataService = {
   postPhoneNumber,
   getAll
}
export default dataService