import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-container">
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Shree Krishnna Enterprises.</p>
          <Link href="/#home">Back to top <span aria-hidden="true">↑</span></Link>
        </div>
      </div>
    </footer>
  );
}
