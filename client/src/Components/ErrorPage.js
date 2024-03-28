import './css/ErrorPage.css'
const ErrorPage = () => {
  return (
    <div className="error_body">
      <div className="center_error">
        <h1>שגיאה!</h1>
        <h2>הגעת לדף זה באחת משלוש סיבות:</h2>
        <p>1. אינך מחובר</p>
        <p>2. רזולוציית המסך שלך הינה לא של מובייל</p>
        <p> לצערנו, האתר זמין כרגע רק למשתמשי מובייל</p>
        <p>3. אינך רשאי לצפות בדף זה  </p>
      </div>
    </div>
  );
}

export default ErrorPage;