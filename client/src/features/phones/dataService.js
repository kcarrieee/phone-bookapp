


const postPhoneNumber = async (phone_number, code) => {

   const res = await fetch('/phones', {
    method:'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      phone_number: phone_number,
      code: code
   })
   })
   const data = await res.json()

   return data;
}

const getAll = async () => {

    const res = await fetch('/phones')
    const data = await res.json()

    return data;
}

const dataService = {
   postPhoneNumber,
   getAll
}
export default dataService