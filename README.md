# This tool is to monitor gitlab pipelines

## Setup

### **Step 1**: Configure projects

- Create projects.json file in the root directory of the project
- Add project details in the given format

```
{
  "projects": [
      {
        "id": "<PROJECT-ID-1>",
        "name": "<Custom/PROJECT-NAME>",
        "branches": ["master", "branch1"]
    },
    {
        "id": "<PROJECT-ID-2>",
        "branches": ["branch1"]
    }
  ]
}
```

And You are done setting up the projects. 2 more steps to go...

### **Step 2**: Configure User and host

- Create user_info.json file in the root directory of the project
- Create a private gitlab token with read repos, branches and pipelines permissions
- Add project details in the given format

```
{
	"host": "<API-HOST>/api/v4/", //https://gitlab.com/api/v4/
	"private_token": "<PRIVATE-TOKEN>"
}
```

Good Job. You are almost done...One more tini tiny step pending

### **Step 3**: Running the application

- Start a python server in the root directory with port `3000`
    
    Type the below command to start python server
    
    ```
    python -m SimpleHTTPServer 3000
    ```

Enjoy the application !!!

## TODO
- Convert current application to chrome extension
- Able to configure project/pipelines/jobs dynamically from the application
- Show open MR count
