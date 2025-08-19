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
