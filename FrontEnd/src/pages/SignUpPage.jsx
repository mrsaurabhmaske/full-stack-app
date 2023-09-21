
function SignUpPage() {
    return (
        <div className='SignUpPage'>
            <form >
                <input type="text" placeholder='Enter Your Username'/>
                <input type="email" placeholder='Enter Your Email'/>
                <input type="password" placeholder='Enter a Strong Password' />
                <button type='submit'>Register</button>
            </form>
        </div>
        
    )
}

export default SignUpPage
