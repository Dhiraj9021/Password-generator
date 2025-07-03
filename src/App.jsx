import { useState, useCallback, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState('');

  const passwordRef = useRef(null);

  const generatePassword = useCallback(() => {
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    if (numberAllowed) str += '0123456789';
    if (charAllowed) str += '!@#$%^&*()_+';

    for (let i = 1; i < length; i++) {
      const char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  const copyPasswordToClipboard = () => {
    window.navigator.clipboard.writeText(password);
    passwordRef.current?.select();
  };

  useEffect(() => {
    generatePassword();
  }, [length, numberAllowed, charAllowed]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-pink-100 to-rose-200 flex items-center justify-center px-6">
      <div className=" max-w-18                                           xl max-w-md bg-white/60 backdrop-blur-xl border border-white/40 shadow-lg rounded-xl p-6 text-gray-800">
        <h1 className="text-3xl font-bold text-center mb-6 text-pink-600 tracking-wide">  🔒  Password Generator</h1>

        <div className="flex rounded-md overflow-hidden mb-6 shadow-sm border border-gray-300">
          <input
            type="text"
            value={password}
            className="w-full  p-3 text-lg bg-white/20 text-gray-700 placeholder-gray-500 focus:outline-none"
            placeholder="Your Password"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyPasswordToClipboard}
            className="bg-green-400 hover:bg-green-500 transition px-4 text-white font-medium"
          >
            Copy
          </button>
        </div>

        <div className="space-y-4 text-sm">
          <div className="flex items-center justify-between">
            <label className="font-semibold text-gray-700">Length: <span className="text-pink-500 font-bold">{length}</span></label>
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className="accent-pink-400"
            />
          </div>

          <div className="flex items-center justify-between">
            <label htmlFor="number" className="text-gray-700 font-semibold">Include Numbers</label>
            <input
              type="checkbox"
              id="number"
              checked={numberAllowed}
              onChange={() => setNumberAllowed((prev) => !prev)}
              className="w-5 h-5 accent-teal-400"
            />
          </div>

          <div className="flex items-center justify-between">
            <label htmlFor="charInput" className="text-gray-700 font-semibold">Include Special Characters</label>
            <input
              type="checkbox"
              id="charInput"
              checked={charAllowed}
              onChange={() => setCharAllowed((prev) => !prev)}
              className="w-5 h-5 accent-purple-400"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
