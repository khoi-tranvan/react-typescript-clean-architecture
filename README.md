# React Typescript Clean Architecture

## Folder structure
**src/**

  |	**presentation/**	-> *handling UI of the application*
  
  | ****** | **components/** -> *dumb and smart UI components*
	
  | ****** | **pages/** -> *full page which contains components*
	
  | ****** | **redux/**	-> *redux is used to help display data in multiple places*
	
  | ****** | **router/** -> *page navigation*
	
  | ****** | **App.tsx** -> *entry level of presentation*

  |	**application/**	-> *application specific use cause, acts as an intermediary layer between presentation and domain layer, helping to separate concern and maintain a clear architecture*
  
  | ****** | **repositories/**	-> *abstracting the data access layer by defining interface and abstract the data access operations required*
	
  | ****** | **usecases/** -> *containing implementation of use cases or application-specific bussiness logic and it's abstraction*

  | **domain/**	-> *Domain folder serves as the core of the application*
  
  | ****** | **entities/** -> *pepresent the core business objects or concepts in the application*
  
  | **infrastructure/**		-> *handling external data implementation*
  
  | ****** | **api/**	-> *implement repositoriees and make calls to external apis*
  
  | ****** | **storage/** -> *implement repositories and handles local storage in the browser*	
    
  | ****** | **config/** -> *config axios (interceptor for response and request) to make api calls*
  	
  | **asset/** -> *static contents*
	
  | **index.tsx/** -> *project entry level*

