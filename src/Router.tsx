import { Routes, Route } from 'react-router-dom';
import Auth from './views/auth/Auth';
import Home from './views/home/Home';
import List from './views/list/List';

export default function Router() {
  const isMobile = window.innerWidth < 768;

  return (
    <div className="Router" style={{marginBottom: isMobile  ? '150px' : 0}}>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/list" element={<List />} />
        </Routes>
    </div>
  );
}