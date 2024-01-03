/**
 * The footer at the bottom of the app
 */
function Footer() {
  return (
    <footer className="footer px-4 py-6">
      <div className="footer-content">
        <p className="text-sm text-white text-center">
          © Cerees {new Date().getFullYear()}. All rights reserved. <a href="https://joeyui.com">by JoeyUI</a>
        </p>
      </div>
    </footer>
  );
}

export { Footer };
