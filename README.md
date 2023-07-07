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
  
  --------- | **apis/**	-> *implement repositoriees and make calls to external apis*
    
  --------- | **models/**	-> *implement repositoriees and make calls to external apis*
  
  --------- | **storages/** -> *implement repositories and handles local storage in the browser*	
    
  | **config/** -> *config project*
  	
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

## Convention
* Coding convention: https://basarat.gitbook.io/typescript/styleguide
* Git convention
1. Feature
	- Tạo MR: feature/[sprint + number]/[code của feature trên redmine]. Ví dụ feature/sprint1/202312
	- Trường hợp MR là các chức năng thêm của feature đó thì feature/sprint1/202312 nhưng commit sẽ là tên của chức năng thêm vào
	- Khi tạo MR của feature bắt buộc phải có evidence bằng hình ảnh, link hoặc mô tả cụ thể những gì đã làm
2. Bugs
	- Tạo branch: bug/[sprint + number]/[code của bug trên redmine]. Ví dụ bug/sprint1/414144
	- Trường hợp là bug cần merge gấp thì dùng hotfix ở đầu. Ví dụ hotfix/sprint1/414144
	- Khi tạo MR của bug bắt buộc phải có evidence bằng hình ảnh, link hoặc mô tả cụ thể những gì đã làm
* Redmine convention
- Khi hoàn thành task => assign task cho leader - status in-review - description để link git 


## Coding flow
1. Tạo model ở infrastructure/models.
```typescript
export type SignUpData = {
  username: string;
  fullname: string;
  password: string;
  address: string;
  email: string;
  phonenumber: string;
  dob: string;
  roles: number[];
};

export type SignInData = { username: string; password: string };

```
2. Tạo các hàm gọi dữ liệu từ bên ngoài như api hoặc localStorage ở trong folder infrastructure. Ví dụ infrastructure/AuthAPI.ts. Lưu ý: khai báo đầy đủ các kiểu dữ liệu, không sử dụng any làm param và data
```typescript
import { AuthRepository } from "../../application/repositories/AuthRepository";
import axiosConfig from "../../config/axios";
import { SignUpData, SignInData } from "../models/AuthModel";

export class AuthAPI implements AuthRepository {
  async signin(data: SignInData): Promise<any> {
    const API_URL = "/sign-in";
    const response = await axiosConfig.post(API_URL, data);
    return response.data;
  }
  async signup(data: SignUpData): Promise<any> {
    const API_URL = "/sign-up";
    const response = await axiosConfig.post(API_URL, data);
    return response.data;
  }
}
```

3. Tạo entities xử lý business logic (trong ví dụ thì models và entites giống nhau vì còn đơn giản, khi nghiệp vụ phức tạp, sẽ có trường hợp kết hợp nhiều api trả về để tạo thành 1 entities duy nhất để xử lý nghiệp vụ). domain/entities/AuthEntity.ts
```typescript
export type SignUpData = {
  username: string;
  fullname: string;
  password: string;
  address: string;
  email: string;
  phonenumber: string;
  dob: string;
  roles: number[];
};

export type SignInData = { username: string; password: string };

```

4. Tạo lớp trừu tượng ở application/repositoriees/AuthRepository
```typescript
// Define interfaces that present the contracts for data access and persistence operations related to the domain eities.
// The purpose of the repository pattern is to abstract away the details of how data is fetched, stored, or manipulated,
// and provide a clean and consistent API for the application to interact with data

import { SignInData, SignUpData } from "../../domain/entities/AuthEntity";

export interface AuthRepository {
  signin(data: SignInData): Promise<any>;
  signup(data: SignUpData): Promise<any>;
}

```

5. Tạo usecase và các trừu tượng của nó trong usecases. application/usecases/AuthUseCase
```typescript
import { SignInData, SignUpData } from "../../domain/entities/AuthEntity";
import { AuthRepository } from "../repositories/AuthRepository";

export class AuthUseCase {
  private authRepo: AuthRepository;

  constructor(authenRepo: AuthRepository) {
    this.authRepo = authenRepo;
  }

  async signin(data: SignInData): Promise<any> {
    return this.authRepo.signin(data);
  }
  async signup(data: SignUpData): Promise<any> {
    return this.authRepo.signup(data);
  }
}

export interface AuthUseCaseInterface {
  signin(data: SignInData): Promise<any>;
  signup(data: SignUpData): Promise<any>;
}
```

6. Tạo thư mục presentation để xử lý UI (do file quá dài nên mong bạn đọc xem ở trong code)
7. Khai báo toàn bộ infra -> usecase -> presentation ở trong index.ts
```typescript
const authRepository = new AuthAPI();
const userStorage = new UserStorage();
const testRepository = new TestAPI();

const testUseCase = new TestUseCase(testRepository);
const userStorageUseCase = new UserStorageUseCase(userStorage);
const authUseCase = new AuthUseCase(authRepository);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <App
            userStorageUseCase={userStorageUseCase}
            testUseCase={testUseCase}
            authUseCase={authUseCase}
          />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
```

