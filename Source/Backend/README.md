# Installation

**Prerequisite:** [Composer](https://getcomposer.org/download/)

**Step 1:** Install Composer references via `composer install`.

# Starting

`composer start`

# Testing
` composer test`

# API
The API-Base URL is the URL under which the directory [api](api/) is accessible. You can set up a HTTP-Basic-Authentication by uncommenting line 4 to 15 in the [middleware.php](src/middleware.php) file. Configure the number of users and passwords you need to in the 'users'-Array. Passwords should be base64 encoded.

See documentation for detailed API references.

# Database
You can set up the connection to the database in the file [settings.php](src/settings.php)

-----------------
Susanne Roos, Josua Sigwarth, Tobias Straub | SenVis