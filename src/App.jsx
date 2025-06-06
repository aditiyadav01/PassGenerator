import { useCallback, useState,useEffect ,useRef} from 'react'
import './App.css'

function App() {

  const [length, setLength] = useState(0)
  const [numberAllowed,setNumberAllowed]=useState(false);
  const [charAllowed,setCharAllowed]=useState(false);
  const [password,setPassword]=useState("");

  const passwordRef = useRef(null)

  const passWordGenerator=useCallback(()=>{
    let pass=" ";
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnolpqrstuvwxyz";
    if(numberAllowed) str+="0123456789";
    if(charAllowed) str+="!@#$%^&*(){}";

    for (let i = 0; i <length; i++) {
        let char = Math.floor(Math.random()*str.length + 1);
        pass += str.charAt(char);
    }
    setPassword(pass)
  },
  [length,numberAllowed,charAllowed,setPassword])


  const copyPasswordToClipboard=useCallback(()=>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,6);
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(()=>{
    passWordGenerator()
  },[length,numberAllowed,charAllowed,passWordGenerator])

  

  return (
    
    <>
      <div></div>
      <div className='w-full max-w-md mx-auto shadow-md rounded-xl px-5 my-8 text-orange-500 bg-gray-400'>
        Password Generator
        <div className='flex shadow rounded-2xl overflow-hidden mb-4 py-3'>
          <input 
          type="text"
           value={password} 
           className='outline-none w-full py-1 px-2 rounded-sm'
            placeholder="Password"
            readOnly

            ref={passwordRef}
            />

          <button onClick={copyPasswordToClipboard} 
          className='outline-none bg-blue-700 text-white rounded-sm px-2 py-1'>
          Copy
          </button>

        </div>
        <div className='flex text-sm gap-x-2 text-black'>
          <div className='flex items-center gap-x-1'>
            <input 
            type="range"
            min={6}
            max={100}
            value={length}
            className='cursor-pointer'
            onChange={(e) => {setLength(e.target.value)}}
              />
              <label>Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
          <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={() => {
                  setNumberAllowed((prev) => !prev);
              }}
          />
          <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
              <input
                  type="checkbox"
                  defaultChecked={charAllowed}
                  id="characterInput"
                  onChange={() => {
                      setCharAllowed((prev) => !prev )
                  }}
              />
              <label htmlFor="characterInput">Characters</label>
          </div>
        </div>
      
      </div>
    </>
  )
}

export default App





















