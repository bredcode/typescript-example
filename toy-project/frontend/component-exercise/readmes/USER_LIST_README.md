## user list component 예제

이번에는 유저 리스트 컴포넌트를 구현해보고자합니다.

해당 링크를 통해 어떻게 구성되어있는지 확인해본 후  
https://jsonplaceholder.typicode.com/users

아래 코드에 User interface를 완성해주세요.

App.tsx

```tsx
import "./App.css";
import UserList from "./components/UserList";

function App() {
  return (
    <>
      <UserList />
    </>
  );
}

export default App;
```

src/components/UserList.tsx

```tsx
import React, { useEffect, useState } from "react";

/**
 * User interface를 완성시켜주세요
 */
function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data: User[]) => {
        setUsers(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <p>로딩 중...</p>;
  return (
    <div>
      {users.map((user) => (
        <p key={user.id}>
          {user.name} ({user.username}) - {user.email}
        </p>
      ))}
    </div>
  );
}

export default UserList;
```

### users map 결과

```text
Leanne Graham (Bret) - Sincere@april.biz

Ervin Howell (Antonette) - Shanna@melissa.tv

Clementine Bauch (Samantha) - Nathan@yesenia.net

Patricia Lebsack (Karianne) - Julianne.OConner@kory.org

Chelsey Dietrich (Kamren) - Lucio_Hettinger@annie.ca

Mrs. Dennis Schulist (Leopoldo_Corkery) - Karley_Dach@jasper.info

Kurtis Weissnat (Elwyn.Skiles) - Telly.Hoeger@billy.biz

Nicholas Runolfsdottir V (Maxime_Nienow) - Sherwood@rosamond.me

Glenna Reichert (Delphine) - Chaim_McDermott@dana.io

Clementina DuBuque (Moriah.Stanton) - Rey.Padberg@karina.biz
```
