# SosialKu - Media Sosial Sederhana

Website media sosial sederhana yang dibuat menggunakan **React JS** untuk belajar React Hooks.

## 📸 Fitur

- **Tampilkan User** — Data dari API JSONPlaceholder (nama, email, username)
- **Postingan User** — Setiap user memiliki postingan berbahasa Indonesia
- **Komentar** — Bisa komentar di postingan user lain
- **Tombol Like** — Like / unlike user (tidak disimpan ke localStorage)
- **Tombol Follow** — Follow / unfollow user (tidak disimpan ke localStorage)
- **Search User** — Cari user berdasarkan nama atau username
- **Responsive** — Tampilan menyesuaikan di HP dan desktop

## 🛠️ Teknologi

- React JS (Vite)
- Vanilla CSS (tanpa framework CSS)
- JSONPlaceholder API

## 📁 Struktur Folder

```
src/
├── components/
│   ├── Navbar.jsx          # Komponen navigasi + search bar
│   ├── UserCard.jsx        # Komponen kartu user + komentar
│   └── Footer.jsx          # Komponen footer
├── context/
│   └── UserContext.jsx      # Context untuk state global (users, search, like, follow, comment)
├── styles/
│   └── App.css             # Semua styling CSS
├── App.jsx                 # Komponen utama
└── main.jsx                # Entry point React
```

## 🚀 Cara Install & Jalankan

### 1. Clone / buka folder project

### 2. Install dependencies
```bash
npm install
```

### 3. Jalankan development server
```bash
npm run dev
```

### 4. Buka di browser
```
http://localhost:5173
```

## 📚 React Hooks yang Digunakan

| Hook | Digunakan Di | Fungsi |
|------|-------------|--------|
| `useState` | UserContext, UserCard | Menyimpan state (users, search, like, follow, showPosts, commentInputs) |
| `useEffect` | UserContext, Navbar | Fetch data API, auto-focus input search |
| `useContext` | App, Navbar | Mengakses data dari UserContext tanpa prop drilling |
| `useRef` | Navbar, UserCard | Referensi ke elemen input untuk auto-focus |

## 🎨 Tema Warna



## 💬 Fitur Komentar

- User bisa menambah komentar sendiri (muncul sebagai "Kamu")
- Tekan Enter atau klik "Kirim" untuk mengirim komentar

## 📝 Catatan

- Data user diambil dari: `https://jsonplaceholder.typicode.com/users`
- Postingan dan komentar bot adalah data statis (bulk data dalam array)
- Like, Follow, dan Komentar **tidak** disimpan ke penyimpanan lokal (localStorage)
- Project ini dibuat untuk belajar React Hooks dasar


DOKUMENTASI PROJEK :
 PENJELASAN FETCH/FETCHING API:yaitu proses mengambil data dari server melalui internet layaknya menggunakan sebuah jembatan , api sendiri memiliki kepanjangan (Aplication Programming Interface) jadi kita bisa mengambil data dari orang lain.

PENJELASAN COMPONENT DAN FUNGSINYA :
Footer.jsx : 
-menampilkan informasi pembuat website 
-kontak 
-service

Navbar.jsx : 
-menampilkan nama website 
-menampilkan fitur pencarian 

Profile.jsx : 
-tampilan lengkap user
-menampilkan semua postingan 
 

 Usercard.jsx :
 -preview user dan juga postingan terbarunya 
 - memiliki tombol "lihat profile"
 -card untuk feed/homepage 
 -tampilan lebih ringkas

 UseState: 
 const [commentInputs, setCommentInputs] = useState({}); 
 //fungsi nya untuk menyimpan isi komentar yang sedang diketik//

 useEffect :
 
  useEffect(() => {
    searchInputRef.current.focus();
  }, []);
//berfungsi untuk memberikan fokus otomatis (auto focus) ke sebuah input saat komponen pertama kali ditampilkan//

useContext :
function Navbar() {
  const { searchTerm, setSearchTerm } = useContext(UserContext);
  const searchInputRef = useRef(null);}
  Mengambil data dari UserContext tanpa perlu mengirim props secara berulang

  useRef :
    const commentRefs = useRef({});
  const replyRefs = useRef({});
  //Menyimpan referensi ke semua input komentar.
Karena setiap post memiliki input komentar sendiri, maka ref disimpan dalam bentuk object.//