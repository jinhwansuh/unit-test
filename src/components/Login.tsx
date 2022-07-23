import axios from 'axios';
import { FormEvent, useState } from 'react';
import { PlaceHolderType } from '../types/placeholderTypes';

const Login = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [user, setUser] = useState<PlaceHolderType>();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmitClick = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        'https://jsonplaceholder.typicode.com/users/1'
      );
      setUser(data);
    } catch {
      setError(true);
    }
    setIsLoading(false);
  };
  return (
    <div className="container">
      {user?.name}
      <form>
        <input
          type="text"
          placeholder="username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button disabled={!userName || !password} onClick={handleSubmitClick}>
          {isLoading ? 'wait' : 'Login'}
        </button>
        {error ?? 'something is wrong'}
      </form>
    </div>
  );
};

export default Login;
