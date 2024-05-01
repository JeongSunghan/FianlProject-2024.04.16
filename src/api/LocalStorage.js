import { useNavigate } from "react-router-dom";

//로컬 스토리지 안에 들어온다ㅓ
export function SetWithExpiry(key, value, ttl) {
    const now = new Date();

    const item = {
        value: value,
        expiry: now.getTime() + ttl * 1000 * 60,
    }

    console.log(item);

    localStorage.setItem(key, JSON.stringify(item));
}

// 받아올 때 써야함
export function GetWithExpiry(key) {
    const itemStr = localStorage.getItem(key);
    const navigate = useNavigate();

    if (!itemStr) {
        return null;
    }

    const item = JSON.parse(itemStr);
    const now = new Date();

    if (now.getTime > item.expiry) {
        localStorage.removeItem(key)
        if (key == 'uid' || key == 'email')
        {
            alert('세션이 만료되었습니다. 로그인이 필요합니다')
            navigate('/login')
        }
        return null;
    }

    return item.value;
    // 반환할 때 uid 값으로
}