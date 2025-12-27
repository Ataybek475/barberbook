export default function SimpleTest() {
  return (
    <div style={{ padding: '40px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ fontSize: '32px', color: 'green' }}>✅ Тестовая страница работает!</h1>
      <p>Если вы видите этот текст, Next.js работает правильно.</p>
      <p style={{ marginTop: 12 }}>
        <a href="/booking" style={{ color: 'blue' }}>Перейти к бронированию</a>
      </p>
    </div>
  )
}
