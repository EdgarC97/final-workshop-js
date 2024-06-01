import { LoginScene } from "./scenes/login/login.scene";
import { NotFoundScene } from "./scenes/not-found/not-found-scene";

export const routes = {
  public: [
    { path: "/login", scene: LoginScene },
    { path: "/not-found", scene: NotFoundScene },
  ],
};
