# React Typescript Clean Architecture

## Folder structure
**src/**

  |	**presentation/**	-> *handling UI of the application*
  
  --------- | **components/** -> *dumb and smart UI components*
	
  --------- | **pages/** -> *full page which contains components*
	
  --------- | **redux/**	-> *redux is used to help display data in multiple places*
	
  --------- | **router/** -> *page navigation*
	
  --------- | **App.tsx** -> *entry level of presentation*

  |	**application/**	-> *application specific use cause, acts as an intermediary layer between presentation and domain layer, helping to separate concern and maintain a clear architecture*
  
  --------- | **repositories/**	-> *abstracting the data access layer by defining interface and abstract the data access operations required*
	
  --------- | **usecases/** -> *containing implementation of use cases or application-specific bussiness logic and it's abstraction*

  | **domain/**	-> *Domain folder serves as the core of the application*
  
  --------- | **entities/** -> *pepresent the core business objects or concepts in the application*
  
  | **infrastructure/**		-> *handling external data implementation*
  
  --------- | **api/**	-> *implement repositoriees and make calls to external apis*
  
  --------- | **storage/** -> *implement repositories and handles local storage in the browser*	
    
  --------- | **config/** -> *config axios (interceptor for response and request) to make api calls*
  	
  | **asset/** -> *static contents*
	
  | **index.tsx/** -> *project entry level*

## ENV
```
REACT_APP_API_END_POINT=http://10.1.24.105:8080/api/
```

## User Guide
1. Homepage
![alt text](https://github.com/khoi-tranvan/react-typescript-clean-architecture/blob/f7d869ec2b48645e077ea48db64d348f5b6ebae3/images/home.png)

2. Admin
![alt text](https://github.com/khoi-tranvan/react-typescript-clean-architecture/blob/f7d869ec2b48645e077ea48db64d348f5b6ebae3/images/admin%20site.png)

3. Moderator
![alt text](https://github.com/khoi-tranvan/react-typescript-clean-architecture/blob/f7d869ec2b48645e077ea48db64d348f5b6ebae3/images/moderator.png)

4. User
![alt text](https://github.com/khoi-tranvan/react-typescript-clean-architecture/blob/f7d869ec2b48645e077ea48db64d348f5b6ebae3/images/user.png)

5. Sign in (khoitvhe130008 - 123456)
![alt text](https://github.com/khoi-tranvan/react-typescript-clean-architecture/blob/f7d869ec2b48645e077ea48db64d348f5b6ebae3/images/signin.png)

6. Sign up 
![alt text](https://github.com/khoi-tranvan/react-typescript-clean-architecture/blob/f7d869ec2b48645e077ea48db64d348f5b6ebae3/images/signup.png)

7. Not found
![alt text](https://github.com/khoi-tranvan/react-typescript-clean-architecture/blob/f7d869ec2b48645e077ea48db64d348f5b6ebae3/images/notfound.png)

8. Time sleep (test when call 3 apis which does not return at the same time)
![alt text](https://github.com/khoi-tranvan/react-typescript-clean-architecture/blob/f7d869ec2b48645e077ea48db64d348f5b6ebae3/images/timesleep.png)

9. Count page (test redux)
![alt text](https://github.com/khoi-tranvan/react-typescript-clean-architecture/blob/f7d869ec2b48645e077ea48db64d348f5b6ebae3/images/count.png)
