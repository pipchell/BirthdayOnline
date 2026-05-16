# Adding a card:

## Step Zero:
- Click Use this template
- Click create a new repository
- Give it a name

## Step One:
- Create a suitable A4 image for the from of your card
- Create a suitable icon for the browser window

## Step Two:
- Upload your icon (favicon) to /user/user-favicon
- Uplpad your A4 image to /user/user-img

You can also put these files at root.

## If you want to change the name of your images so you remember them:
1. Click on image
2. Click pencil icon
3. Rename file to anything
4. Save the file

## Step Three:
- Inside the user folder, find the recipients-name.html file
- Open it and click on the copy icon
- Create a new file inside the user folder called (recipients-name).html
- Paste the text into your new file

If you put your images at root, put your html at root as well.

## Step Four:
- Change details in your new html file

For example change: 
"<title>Happy Birthday, Name!</title>" 
To
"<title>Happy Birthday, Dave!</title>"

## Step Five:
- Click settings
- Navigate to pages section

Under Branch:
1. On dropdown select main
2. Click save

### If you don't have a custom domain
Your card is live at username.github.io/repo-name/user/recipient-name

OR if you put your files at root:

username.github.io/repo-name/recipient-name

### If you have a custom domain
- Enter your domain in the "Custom domain" box
- In your providers DNS settings:
  1. Create a CNAME record
  2. Put in a sub-domain or @ for root
  3. Point it to username.github.io
 
Your card is live at domain.com/user/recipient-name

OR if you put it at root:

domain.com/recipient-name
