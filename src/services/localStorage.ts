const LocalStorageService = {
  getUserInfo: () => {
    if (!localStorage.getItem("user")) return null;
    return JSON.parse(localStorage.getItem("user") || "{}");
  },
};
export default LocalStorageService;
