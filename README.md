Generate a fully functional responsive e-commerce landing website called "Bucks2Bar" with a shop and admin panel. Features required:

1. Project Structure:
   - root/
     - index.html (landing page + shop + login)
     - shop/
       - admin.html (admin dashboard)
       - products.json (store product data)
       - css/shop.css (all styles)
       - js/shop.js (shop & user login functionalities)
       - js/admin.js (admin login + product management)
     - src/
       - css/styles.css (general styles)
       - js/main.js (optional future scripts)
     - README.md

2. Landing Page Features (index.html):
   - Navbar with logo, categories, offers, and login dropdown (User/Admin).
   - Hero section or carousel with 3 banners (coffee, beverage, snacks).
   - Offers section: highlight first 4 products with discounts.
   - All products section: display approved products with images, name,   description, and price.
   - Login section: toggled for user/admin login.

3. Admin Panel (admin.html + admin.js):
   - Login form with dummy credentials (admin/adminpass).
   - Dashboard to view all products, approve/disapprove products.
   - Add new product form (updates only in memory for demo).
   - Products displayed as cards with approve/disapprove buttons.

4. Shop.js:
   - User login with dummy credentials (user1/password1, user2/password2).
   - Load approved products dynamically from products.json.
   - Show offer products in the offer section.
   - Add to cart / Buy Now buttons (alert for demo).

5. CSS (shop.css):
   - Modern design similar to Flipkart with card hover effects.
   - Hero section, offers, products, and buttons styled.
   - Compact hero section (20vh height, centered text).
   - Responsive design with Bootstrap 5.

6. Products.json:
   - Array of product objects with:
    - id, name, description, price, offer (true/false), offer Price, approved (true/false), image (direct URLs provided).

7. Additional Requirements:
   - Fully responsive using Bootstrap 5.
   - All images load properly.
   - Carousel images should maintain consistent height.
   - No broken JS or CSS references.
   - Admin and user functionalities fully working in memory.

8. Technologies Used:
   - HTML5, CSS3, JavaScript (Vanilla)
   - Bootstrap 5 for layout and responsive design
   - JSON for storing product data
   - Optional: Flexbox & Grid for card layouts






















