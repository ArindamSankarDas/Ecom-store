const Footer = () => {
  return (
    <footer className='mt-auto bg-black space-y-10 text-white'>
      <section className='px-10 py-8 footer-content-container footer-6:desk-footer-content-container lg:gap-40'>
        <div className='footer-grid-item'>
          <h1>Support</h1>

          <p>
            6, Hit Niketan, Kokan Nagar,
            <br /> J M Rd, Bhandup
          </p>
          <p>exclusive@gmail.com</p>
          <p>+88015-88888-9999</p>
        </div>
        <div className='footer-grid-item'>
          <h1>Account</h1>

          <p>My Account</p>
          <p>Login/Register</p>
          <p>Cart</p>
          <p>Shop</p>
        </div>
        <div className='footer-grid-item'>
          <h1>Quick Link</h1>

          <p>Privacy Policy</p>
          <p>Terms of use</p>
          <p>FAQ</p>
          <p>Contact</p>
        </div>
      </section>
      <p className='px-10 py-5 text-gray-200 text-center font-semibold relative before:copyright-pseudo-element'>
        &copy; Copyright Exclusive 2024. All rights reserved
      </p>
    </footer>
  );
};
export default Footer;
