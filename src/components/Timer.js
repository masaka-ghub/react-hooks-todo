import React, { useEffect, useState } from 'react';

function Timer() {
  const [now, setNow] = useState(new Date().toLocaleString());

  useEffect(() => {
    // 10秒毎にntpにfetchし、現在時刻を更新する
    const id = setInterval(async () => {
      console.log(`${id}:timer reflesh start`);
      const res = await (await fetch('https://ntp-a1.nict.go.jp/cgi-bin/json')).json();
      const current = new Date(res.st * 1000);
      setNow(current.toLocaleString());
      console.log(`${id}:timer reflesh end`);
    }, 10000);
  }, []);

  return <div>{now}</div>;
}

export default Timer;
