import React, { useState } from "react"

const SignUpForm = ({ setToken }) => {
    
  const [formData, setFormData] = useState({
      username: "",
      password: "",
      error: null,
  }) 

  const handleSubmitForm = async (e) => {
    e.preventDefault()

    try {
        const response = await fetch("https://fsa-jwt-practice.herokuapp.com/signup", {
            method: "POST",
            headers: {
                "Content-Type": "applicaiton/json"
            },
            body: JSON.stringify({
                username: formData.username,
                password: formData.password
            })
        })
        const result = await response.json()
        setToken(result.token)
        console.log(result)

    } catch (error) {
      setFormData({
        ...formData,
        ["error"]: error.message
      })
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  return (
    <>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmitForm}>
        <label>
          Username: 
            <input 
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
            />
        </label>
        <label>
          Password: 
            <input 
              type="text"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
        </label>
        <button type="submit">Submit</button>
      </form>
    </>
  )
}

export default SignUpForm