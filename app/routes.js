import { HomeScene } from "./scenes/home/home.scene";
import { LoginScene } from "./scenes/login/login.scene";
import { NotFoundScene } from "./scenes/not-found/not-found.scene";
import { RegisterScene } from "./scenes/register/register.scene";
import { TaskEditScene } from "./scenes/tasks/tasks-edit.scene";
import { TaskScene } from "./scenes/tasks/tasks.scene";
import { UsersScene } from "./scenes/users/users.scene";

export const routes = {
  public: [
    { path: "/home", scene: HomeScene },
    { path: "/login", scene: LoginScene },
    { path: "/not-found", scene: NotFoundScene },
    { path: "/register", scene: RegisterScene },
  ],
  private: [
    { path: "/tasks", scene: TaskScene },
    { path: "/tasks/edit", scene: TaskEditScene },
    { path: "/users", scene: UsersScene },
  ]
};
