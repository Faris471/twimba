# \# Twimba

# 

# A Twitter/X-inspired social feed built with Vanilla JavaScript as part of the Scrimba Frontend Career Path.

# 

# \## Features

# 

# \- Create new tweets

# \- Like tweets

# \- Retweet tweets

# \- Reply to tweets

# \- Delete tweets

# \- Persistent data using Local Storage

# \- Event Delegation

# \- Dynamic DOM rendering

# 

# \## Built With

# 

# \- HTML5

# \- CSS3

# \- JavaScript (ES6+)

# \- Local Storage API

# \- UUID

# 

# \## What I Learned

# 

# During this project I practiced:

# 

# \- DOM manipulation

# \- Event delegation

# \- Data attributes

# \- JavaScript array methods (`find`, `filter`, `forEach`)

# \- Local Storage

# \- Template literals

# \- ES Modules

# \- State management in Vanilla JavaScript

# 

# \## Improvements I Added

# 

# These features were implemented beyond the original Scrimba project:

# 

# \- ✅ Delete tweets

# \- ✅ Add replies to tweets

# \- ✅ Persist tweets using Local Storage

# \- ✅ Custom username input

# 



# \## Challenges

# 

# One of the biggest challenges I faced was keeping the user interface synchronized with the application's state while implementing the reply system and Local Storage persistence.

# 

# My initial approach used a separate `renderReplies()` function to update only the replies section. Although it worked, it introduced a second rendering path, making the application harder to maintain and increasing the risk of inconsistencies between the UI and the data.

# 

# After refactoring, I adopted a \*\*single source of truth\*\* approach by storing all application state inside the `tweetsData` array. Instead of updating parts of the DOM manually, every user action updates the data first, and the UI is then regenerated through a single `render()` function. This resulted in cleaner, more predictable, and easier-to-maintain code.

# 

# \## Future Improvements

# 

# \- Edit tweets

# \- Dark mode

# \- Character counter

# \- Image uploads

# \- Search tweets

# \- User authentication

# \- Backend integration





# \## Installation

# 

# Clone the repository

# 

# ```bash

# git clone https://github.com/Faris471/twimba.git

# ```

# 

# Open the project

# 

# ```bash

# cd twimba

# ```

# 

# Run using Live Server.

# 

# \## Project Structure

# 

# ```

# twimba/

# │

# ├── index.html

# ├── index.css

# ├── index.js

# ├── data.js

# └── images/

# ```

# 

# \## Author

# 

# Faris Essa

