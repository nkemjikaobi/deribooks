LIVE URL:  http://deribooks.herokuapp.com

<h1>Deribooks</h1>
<p>This is a project for users to create public and private stories</p>
<p>Only authenticated users can create stories as well as Update, Delete and Read</p>
<p>Authorization is also implemented so as to ensure that the rightful owner has privileges to perform the CRUD operation on stories</p>
<p>Stories can be made public or private</p>
<p>Only public stories would be made available for reading</p>


<p>PASSPORT-GOOGLE-OAUTH20 and PASSPORT is used for authentication and authorization</p>
<p>HANDLEBARS is the templating engine used</p>
<p>MOMENT is used to format time</p>
<p>MORGAN is used for logging only on developement mode</p>

<h1>Clone The Repository</h1>
<code><pre>git clone https://github.com/nkemjikaobi/deribooks.git</pre></code>

<h1>CD into the project</h1>
<code><pre>cd deribooks</pre></code>

<h1>Running the Project.</h1>
Install dependencies with <code><pre>npm install</pre></code>

* Add your database URI ,GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET in the config folder { **in the CONFIG.ENV** } file

* Run <code><pre>npm run dev</pre></code> { this will concurrently run the server and the client side }

* Routes for the API endpoints can be found in the **routes** folder 
* The models for the users can be found in the **models** folder 
* The helpers for the handlebars templating engine can be found in the **helpers** folder 

* CONFIG is used to store our environment variables

* Check all dependencies and devdependecies used in **package.json**

<h1>Next steps</h1>
Visit http://localhost:7002
<p>Sign in and start creating stories</p>
