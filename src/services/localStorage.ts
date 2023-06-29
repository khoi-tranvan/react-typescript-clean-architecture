const LocalStorageService = {
  getUserInfo: () => {
    if (!localStorage.getItem("user")) return null;
    return JSON.parse(localStorage.getItem("user") || "{}");
  },
  setUserInfo: (user: any) => {
    localStorage.setItem("user", JSON.stringify(user));
  },
  removeUserInfo: () => {
    localStorage.removeItem("user");
  },
  getUserRoles: (): string[] => {
    if (!localStorage.getItem("user")) return [];
    const userLocal = JSON.parse(localStorage.getItem("user") || "{}");
    return userLocal?.user?.roles ?? [];
  },
};
export default LocalStorageService;
