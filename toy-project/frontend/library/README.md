## 📝 문제: 간단한 도서관 관리 프로그램 만들기

### 요구사항

1.  **책(Book)** 인터페이스를 정의하라.

    - `title`: string
    - `author`: string
    - `publishedYear`: number
    - `isAvailable`: boolean

2.  새로운 책을 등록하는 함수 `addBook`을 작성하라.

    - 매개변수: `Book` 타입
    - 반환값: `void`
    - 함수 호출 마지막에 등록된 책 정보를 출력

3.  책을 대여하는 함수 `borrowBook`을 작성하라.

    - 매개변수: 책 제목(`string`)
    - 반환값: `void`
    - 책이 있으면 `isAvailable`을 `false`로 바꾸고, 대여 성공 메시지를 출력
    - 이미 대여 중이면, 이미 대여 중임을 출력
    - 책이 없는 경우, 책을 찾을 수 없음을 출력

4.  책을 반납하는 함수 `returnBook`을 작성하라.

    - 매개변수: 책 제목(`string`)
    - 반환값: `void`
    - 해당 책의 `isAvailable`을 `true`로 바꾸고, 반납 성공 메시지를 출력
    - 만약 해당 책이 없는 경우, 책을 찾을 수 없음을 출력

---

### 실행 예시

```typescript
addBook({ title: "TypeScript 입문", author: "홍길동", publishedYear: 2023, isAvailable: true });
addBook({ title: "자바스크립트 마스터", author: "이영희", publishedYear: 2021, isAvailable: true });

borrowBook("TypeScript 입문");
borrowBook("TypeScript 입문");
returnBook("TypeScript 입문");
```

```text
책 등록: TypeScript 입문, 저자: 홍길동, 발행년도: 2023
책 등록: 자바스크립트 마스터, 저자: 이영희, 발행년도: 2021
'TypeScript 입문' 책을 대여했습니다.
'TypeScript 입문' 책은 이미 대여 중입니다.
'TypeScript 입문' 책을 반납했습니다.
```

<details>
<summary>🎯 정답 확인 (스스로 풀어보고 확인해주세요)</summary>

```tsx
// 책 인터페이스
interface Book {
  title: string;
  author: string;
  publishedYear: number;
  isAvailable: boolean;
}

// 책 목록
let library: Book[] = [];

// 책 등록 함수
function addBook(book: Book): void {
  library.push(book);
  console.log(`책 등록: ${book.title}, 저자: ${book.author}, 발행년도: ${book.publishedYear}`);
}

// 책 대여 함수
function borrowBook(title: string): void {
  const book = library.find((b) => b.title === title);
  if (book) {
    if (book.isAvailable) {
      book.isAvailable = false;
      console.log(`'${title}' 책을 대여했습니다.`);
    } else {
      console.log(`'${title}' 책은 이미 대여 중입니다.`);
    }
  } else {
    console.log(`'${title}' 책을 찾을 수 없습니다.`);
  }
}

// 책 반납 함수
function returnBook(title: string): void {
  const book = library.find((b) => b.title === title);
  if (book) {
    book.isAvailable = true;
    console.log(`'${title}' 책을 반납했습니다.`);
  } else {
    console.log(`'${title}' 책을 찾을 수 없습니다.`);
  }
}

// 실행 예시
addBook({ title: "TypeScript 입문", author: "홍길동", publishedYear: 2023, isAvailable: true });
addBook({ title: "자바스크립트 마스터", author: "이영희", publishedYear: 2021, isAvailable: true });

borrowBook("TypeScript 입문");
borrowBook("TypeScript 입문");
returnBook("TypeScript 입문");
```

</details>
