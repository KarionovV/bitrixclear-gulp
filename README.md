# Clear template for CMS Bitrix with Gulp

**update 23 may 2022**

Clear site template for a CMS Bitrix. This template can help you crate a new project.
We use this template in IT-INFINITY company (https://itinfinity.ru).

## Install
1. **ssh:>** cd site_path
2. **ssh:>** cd /local/templates/
3. **ssh:>** git clone https://github.com/KarionovV/bitrixclear-gulp.git
4. Rename "bitrixclear-gulp", if you need
5. Select template in site settings.
6. Config .settings.php in template root path.

## Use Gulp
Move to /local/templates/your_template_name/src/ folder and run "gulp" in terminal.

Use .../src/css/ folder for your sass files
Use .../src/js/ folder for your js files
Use .../src/images/ folder for your template images files

Gulp combine all your js files and make /your_template_name/js/build(.min).js
Gulp combine all your sass files and make /your_template_name/css/build(.min).css


Enjoy