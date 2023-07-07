# React Typescript Clean Architecture

## Design pattern
![alt text](https://blog.cleancoder.com/uncle-bob/images/2012-08-13-the-clean-architecture/CleanArchitecture.jpg)
Doc: https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html

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
REACT_APP_API_END_POINT=http://your_api_end_point
```

## Environment
* @ant-design/icons": 5.1.4
* @reduxjs/toolkit: 1.9.5
* @testing-library/jest-dom: 5.16.5
* @testing-library/react: 13.4.0
* @testing-library/user-event: 13.5.0
* @types/axios: 0.14.0
* @types/jest: 27.5.2
* @types/node: 16.18.35
* @types/query-string: 6.3.0
* @types/react: 18.2.11
* @types/react-dom: 18.2.4
* @types/react-redux: 7.1.25
* @types/redux-persist: 4.3.1
* @types/redux-thunk: 2.1.0
* antd: 5.6.1
* dayjs: 1.11.8
* fontsource-roboto: 4.0.0
* react: 18.2.0
* react-dom: 18.2.0
* react-redux: 8.1.1
* react-router-dom: 6.12.1
* react-scripts: 5.0.1
* redux-persist: 6.0.0
* redux-saga: 1.2.3
* redux-thunk: 2.4.2
* sass: 1.63.6
* typescript: 4.9.5
* web-vitals: 2.1.4

## Coding flow
