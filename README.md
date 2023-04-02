# Authentication-Intro
Learn the importance of web application security and user data protection with this project. Implement encryption, hashing, passport.js, and cookies, while enabling users to register and log in via Google. Post and share secrets safely on the web with this secure and dynamic web application. Project was built with Node.js and MongoDB.

## Authentication and security

### Encrytion - require("mongoose-encryption")
Encryption is a process that turns readable data into unreadable data using a secret key. The idea is that only those who possess the secret key can decrypt the data and convert it into its original readable form. The problem with encryption is that if someone manages to get the secret key, they can decrypt the data.

### Hashing - require("md5")
Hashing is a one-way process that takes a data input of any size and converts it into a fixed-length string, known as a hash. The resulting hash is a unique value and cannot be converted back to the original data. The advantage of hashing is that even if someone gets the hash, they cannot discover the original entry, since there are many possible entries that can generate the same hash. However, hashing can be vulnerable to brute force attacks, as an attacker can generate common password hashes and compare them to stored hashes to find a match.

### Salt and hashing - require("bcrypt")
Salting-and-hashing is a technique that combines hashing with a random value called a "salt". Instead of storing the user's password, a random string (salt) is created for each password, which is added to the user's password before hashing. The result of the hashing function (including the salt) is stored in the database. The salt adds an additional layer of security, which means that even if two users have the same password, the resulting hash strings will be different due to the salt. 
The main disadvantage of salting-and-hashing is that it is a slower process than normal hashing, since the salt needs to be generated and stored for each password.
