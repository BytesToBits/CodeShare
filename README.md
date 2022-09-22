# [CodeShare](https://bytestobits.dev/discord)
CodeShare is an open-source code sharing application, with similar features to other websites, such as [Pastebin](https://pastebin.com/) and [Hastebin](https://hastebin.com/about.md).

## Usage
You can either visit [The Official Instance](https://code.bytestobits.dev/), or host the website yourself!  
Afterwards, click on `Create a Document` to write and share your code!

## Self Hosting
1. Clone the repository and install the dependencies
```bash
$ git clone https://github.com/BytesToBits/CodeShare.git
$ cd CodeShare
# Run one of the following but make sure to use the same package manager on step 3 as well!
$ npm install
# or
$ yarn
```
2. Create a `.env` file and paste the following text, filling the variables with your settings
```env
MONGO_URI=<your_mongo_uri>
```
3. And you can now run the project!
```bash
$ npm run build
$ npm run start
# or
$ yarn build
$ yarn start
```
## Preparing the Database
You can get a free **500MB** Database from [MongoDB Atlas](https://www.mongodb.com/cloud/atlas). That will last for a really long time.

Head over to Atlas and create a new account. You will then be greeted with this panel.
![Panel View](https://user-images.githubusercontent.com/44692189/64170897-1297a600-ce73-11e9-910e-38b78c3ac315.jpg)

Select the `FREE` one and give it a name. Follow these steps;
- Go to `Database Access` section under the `Security` tab and click `+ ADD NEW USER`. Give it `Read and write to any database` permissions so the bot can properly store the data. Give it a username and a **secure** password. Save the password only.
![New User](https://i.imgur.com/zfhxyNX.png)
- To allow the bot to actually access the database, you should whitelist all IP's. Go to `Network Access` section under the `Security` tab and click `+ ADD IP ADDRESS`. Click the `Allow Access From Everywhere` and `0.0.0.0/0` should appear in the `Whitelist Entry`. If it doesn't, enter it manually. Lastly, click confirm.
![Whitelist All IP's](https://i.imgur.com/UgIYkoA.png)
- Time to connect to the Database! Go to `Cluster` under the `DATA STORAGE` tab. If your database is still setting up, please wait until it's done! Once it is, click the `CONNECT` button and `Connect Your Application`. Copy a link that **looks** like this; `mongodb+srv://<username>:<password>@cluster0.r4nd0m.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
- Lastly, remove the `myFirstDatabase?retryWrites=true&w=majority` part and replace `<username>` with your user's name (sometimes it is already replaced in if there's only one user), and `<password>` with your saved password.
- Your database is done!

## Contributing
All contibutions are welcome!
