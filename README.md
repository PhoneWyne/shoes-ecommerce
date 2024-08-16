# Shoes E-commerce Website Project
- This is repo for a shoes e-commerce website done for Optimus Fox internship
- Users/Role: 
	- Customer
	- Admin
- Pages:
	- Checkout
	- Homepage
	- Marketplace
	- Profile
- Modals:
	- Add, Edit, Delete Shoe (admin)
	- Cart
	- Login
	- Sign up
- Backend is mock `db.json`
	- Two endpoints, with their variables
		- `users`
			- `name` for both customer, admin
			- `email` for both customer, admin			
			- `password`
			- `role` which is either `customer` or `admin`
		- `shoes`
			- `name`			
			- `price`
			- `quantity`
			
- Steps to run code
	- In root, open terminal, and run `npm server-json`
	- Open another terminal in root, run `npm run dev`, and paste the link created in browser

- Switched from props drilling to CONTEXT API for managing cart, and user

- Functionality implemented
	- Login, Signup as customer, admin
	- admin can edit, delete, or add shoes
	- Navbar with searchbar, Cart preview, Login button that switches to Account, 3 pages (Home, MarketPlace, Profile), and logo that leads to Home when clicked
	- Sort by pricing, low-high, or high-low
	- Searchbar by shoe's name
	- Account Details editing
	- Cart preview by use of context api 
	- Checkout (needs to be logged in as user, to be able to checkout)

- Need to be logged in as user with admin rights, i.e. user.role = "admin"
- Admin can delete, edit, or Add shoes
- when adding shoes, first have an image ready in `src/assets/shoes` folder, then write that path in the `Image` field, as such `src/assets/shoes/image.png`
- integers are saved as strings when entered via forms, remember to `parseInt(integer_property)`
- Potential new features
	- Create `size` and `gender` fields in `db.json/shoes`, to create more variety
